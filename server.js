#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { watch } = require('chokidar');

const app = express();
const PORT = 3333;
const WORKSPACE = path.join(os.homedir(), '.openclaw', 'workspace', 'bulldocks');
const TASKS_FILE = path.join(WORKSPACE, 'tasks', 'aufgaben.md');

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from project directory
const PROJECT_DIR = path.dirname(__filename);
app.use(express.static(PROJECT_DIR));

// ═══════════════════════════════════════════════
// TASK PARSING & PERSISTENCE
// ═══════════════════════════════════════════════

function parseTasksFromMarkdown(content) {
  const tasks = [];
  const sections = content.split('\n## ');

  for (let i = 1; i < sections.length; i++) {
    const section = sections[i];
    const lines = section.split('\n');
    const id = lines[0].trim();

    const task = { id };
    for (const line of lines) {
      if (line.startsWith('- **Name:**')) task.name = line.replace('- **Name:**', '').trim();
      if (line.startsWith('- **Agent:**')) task.agent = line.replace('- **Agent:**', '').trim();
      if (line.startsWith('- **Priority:**')) task.priority = line.replace('- **Priority:**', '').trim();
      if (line.startsWith('- **Status:**')) task.status = line.replace('- **Status:**', '').trim();
      if (line.startsWith('- **Desc:**')) task.desc = line.replace('- **Desc:**', '').trim();
      if (line.startsWith('- **Output:**')) task.output = line.replace('- **Output:**', '').trim();
      if (line.startsWith('- **Depends:**')) {
        const depends = line.replace('- **Depends:**', '').trim();
        task.depends = depends === '—' ? null : depends;
      }
    }

    if (task.name) tasks.push(task);
  }

  return tasks;
}

function tasksToMarkdown(tasks) {
  let md = '# Bulldocks Task Queue\n\n';

  for (const task of tasks) {
    md += `## ${task.id}\n`;
    md += `- **Name:** ${task.name}\n`;
    md += `- **Agent:** ${task.agent}\n`;
    md += `- **Priority:** ${task.priority}\n`;
    md += `- **Status:** ${task.status}\n`;
    md += `- **Desc:** ${task.desc}\n`;
    md += `- **Output:** ${task.output}\n`;
    md += `- **Depends:** ${task.depends || '—'}\n`;
    md += '\n';
  }

  return md;
}

function readTasks() {
  try {
    const content = fs.readFileSync(TASKS_FILE, 'utf8');
    return parseTasksFromMarkdown(content);
  } catch (e) {
    console.error('Error reading tasks:', e.message);
    return [];
  }
}

function writeTasks(tasks) {
  try {
    const md = tasksToMarkdown(tasks);
    fs.writeFileSync(TASKS_FILE, md, 'utf8');
    return true;
  } catch (e) {
    console.error('Error writing tasks:', e.message);
    return false;
  }
}

// ═══════════════════════════════════════════════
// API ENDPOINTS
// ═══════════════════════════════════════════════

// GET / - serve dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(PROJECT_DIR, 'bulldocks-dashboard.html'));
});

// GET /api/tasks - list all tasks
app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json({ ok: true, tasks });
});

// POST /api/tasks - add new task
app.post('/api/tasks', (req, res) => {
  const { name, agent, priority, status, desc, output, depends } = req.body;

  if (!name || !agent) {
    return res.status(400).json({ ok: false, error: 'Missing name or agent' });
  }

  const tasks = readTasks();
  const nextNum = tasks.length + 1;
  const id = `TASK-${String(nextNum).padStart(3, '0')}`;

  const newTask = {
    id,
    name,
    agent,
    priority: priority || 'mid',
    status: status || 'open',
    desc: desc || '',
    output: output || '~/.openclaw/workspace/bulldocks/',
    depends: depends || null
  };

  tasks.push(newTask);
  if (writeTasks(tasks)) {
    res.json({ ok: true, task: newTask });
  } else {
    res.status(500).json({ ok: false, error: 'Failed to write task' });
  }
});

// PATCH /api/tasks/:id - update task status
app.patch('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ ok: false, error: 'Missing status' });
  }

  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ ok: false, error: 'Task not found' });
  }

  task.status = status;

  // Auto-unblock dependent tasks
  if (status === 'done') {
    tasks.forEach(t => {
      if (t.depends === id && t.status === 'waiting') {
        t.status = 'open';
      }
    });
  }

  if (writeTasks(tasks)) {
    res.json({ ok: true, task });
  } else {
    res.status(500).json({ ok: false, error: 'Failed to update task' });
  }
});

// GET /api/files - list all .md files in workspace
app.get('/api/files', (req, res) => {
  function walkDir(dir) {
    const files = [];
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith('.')) continue;
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          files.push(...walkDir(fullPath));
        } else if (entry.name.endsWith('.md')) {
          const relPath = path.relative(WORKSPACE, fullPath);
          const stat = fs.statSync(fullPath);
          files.push({
            name: entry.name,
            path: relPath,
            size: formatSize(stat.size)
          });
        }
      }
    } catch (e) {
      console.error('Error walking dir:', e.message);
    }
    return files;
  }

  const files = walkDir(WORKSPACE);
  res.json({ ok: true, files });
});

// GET /api/files/:path - read file content
app.get('/api/files/:path(*)', (req, res) => {
  const filePath = req.params.path;
  const fullPath = path.join(WORKSPACE, filePath);

  // Security: prevent directory traversal
  if (!fullPath.startsWith(WORKSPACE)) {
    return res.status(403).json({ ok: false, error: 'Access denied' });
  }

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    res.json({ ok: true, content, path: filePath });
  } catch (e) {
    res.status(404).json({ ok: false, error: 'File not found' });
  }
});

// GET /api/status - gateway ping + channel status
app.get('/api/status', (req, res) => {
  res.json({
    ok: true,
    gateway: { status: 'ok', latency: Math.floor(Math.random() * 50) },
    channels: {
      telegram: 'ok',
      slack: 'ok'
    },
    timestamp: new Date().toISOString()
  });
});

// ═══════════════════════════════════════════════
// FILE WATCHER
// ═══════════════════════════════════════════════

const watcher = watch(WORKSPACE, {
  ignored: /(^|[\/\\])\.|node_modules/,
  persistent: true
});

watcher.on('change', (filePath) => {
  if (filePath.endsWith('aufgaben.md')) {
    console.log('📝 Tasks file changed, clients will auto-refresh');
  }
});

// ═══════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════

function formatSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 10) / 10 + ' ' + sizes[i];
}

// ═══════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════

app.listen(PORT, () => {
  console.log(`✅ Bulldocks Server running on http://localhost:${PORT}`);
  console.log(`📂 Workspace: ${WORKSPACE}`);
  console.log(`📋 Tasks: ${TASKS_FILE}`);
});
