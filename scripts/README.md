# Development Scripts

This directory contains development and deployment scripts for the ProductHub project.

## Scripts

- `dev-server.sh` - Development server startup script
- `simple-server.py` - Simple Python HTTP server for testing
- `start.sh` - Main startup script
- `wsl-server.sh` - WSL-specific server startup script

## Usage

Make sure scripts are executable:
```bash
chmod +x *.sh
```

For development:
```bash
npm run dev
```

For production build:
```bash
npm run build
npm run start
```