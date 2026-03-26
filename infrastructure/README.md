# Bulldocks — Docker Infrastructure Stack

n8n + PostgreSQL + Redis, containerisiert mit Docker Compose (OrbStack).

## Voraussetzungen

- OrbStack installiert und gestartet (`brew install --cask orbstack`)
- Docker CLI verfügbar (wird von OrbStack bereitgestellt)

## Secrets einrichten (einmalig)

```bash
mkdir -p secrets
chmod 700 secrets

# n8n Encryption Key (aus ~/.n8n/config migrieren):
python3 -c "import json,os; d=json.load(open(os.path.expanduser('~/.n8n/config'))); print(d['encryptionKey'])" \
  | tr -d '\n' > secrets/n8n_encryption_key

# PostgreSQL Passwort (neu generieren):
openssl rand -hex 32 | tr -d '\n' > secrets/postgres_password

chmod 600 secrets/*
```

## Stack starten

```bash
cd ~/projects/bulldocks/infrastructure
docker compose up -d
sleep 20 && docker compose ps
curl -s http://localhost:5678/healthz
```

## Stack stoppen

```bash
docker compose down
```

## Stack stoppen + Daten löschen (ACHTUNG: unwiderruflich)

```bash
docker compose down -v
```

## Logs

```bash
docker compose logs -f n8n
docker compose logs -f n8n-worker
docker compose logs -f postgres
```

## Services

| Service     | Port  | Beschreibung                      |
|-------------|-------|-----------------------------------|
| n8n         | 5678  | Web-UI + Webhook-Endpunkt         |
| n8n-worker  | —     | Queue-Worker (kein direkter Zugriff) |
| postgres    | —     | Internes DB-Backend               |
| redis       | —     | Queue/Cache (intern)              |

## Wichtige Hinweise

### Secrets — NIEMALS ins Git
Die Dateien `secrets/n8n_encryption_key` und `secrets/postgres_password` sind in
`.gitignore` eingetragen. Nie mit `git add secrets/` hinzufügen.

### Ollama — NIEMALS in Docker
Ollama läuft nativ auf dem Mac (Apple Silicon GPU). Nie in Docker containerisieren —
der Container hätte keinen Zugriff auf Metal/GPU und würde rein CPU-gebunden laufen.
Stattdessen `http://host.docker.internal:11434` als Ollama-URL in n8n verwenden.

### Encryption Key Migration
Der Key aus `~/.n8n/config` wurde in `secrets/n8n_encryption_key` migriert.
Damit sind alle vorhandenen n8n-Credentials weiterhin entschlüsselbar.

### Backup
Volumes befinden sich in OrbStacks Docker-VM. Backup via:
```bash
docker run --rm -v infrastructure_n8n_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/n8n_data_backup.tar.gz /data
```
