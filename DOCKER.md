# Docker Setup for Event Manager

This document provides instructions for running the Event Manager frontend application using Docker.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (usually included with Docker Desktop)

## Project Structure

```
EVENT MANAGER/
├── docker-compose.yml          # Main orchestration file
├── DOCKER.md                   # This documentation
└── event-manager frontend/     # React frontend
    ├── Dockerfile
    ├── nginx.conf
    ├── .dockerignore
    └── src/                    # React source code
```

## Quick Start

1. **Navigate to the project directory:**
   ```bash
   cd "E:\EVENT MANAGER"
   ```

2. **Build and start the frontend:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000

## Services

### Frontend (React + Vite)
- **Port:** 3000
- **Technology:** React, Vite, Material-UI
- **Container:** event-manager-frontend
- **Features:** 
  - Multi-stage build for optimization
  - Nginx for serving static files
  - Mock authentication system
  - Standalone application (no backend required)

## Authentication

The application includes a mock authentication system with the following demo users:

- **Admin User:** `admin` / `admin123` (admin role)
- **Regular User:** `user` / `user123` (user role)
- **Demo User 1:** `gopi` / `babu` (user role)
- **Demo User 2:** `rakesh` / `password123` (user role)

## Common Commands

### Start the frontend
```bash
docker-compose up
```

### Start in background
```bash
docker-compose up -d
```

### Rebuild and start
```bash
docker-compose up --build
```

### Stop the application
```bash
docker-compose down
```

### View logs
```bash
# Frontend logs
docker-compose logs frontend
```

### Access container shell
```bash
# Frontend container
docker-compose exec frontend sh
```

## Development Workflow

### Making Changes

1. **Frontend changes:**
   - Modify files in `event-manager frontend/src/`
   - Rebuild: `docker-compose up --build frontend`

### Hot Reloading (Development)

For development with hot reloading, you can run the frontend locally:

```bash
# Run frontend locally for development
cd "event-manager frontend"
npm install
npm run dev
```

## Troubleshooting

### Common Issues

1. **Port conflicts:**
   - Change port in `docker-compose.yml` if 3000 is already in use

2. **Frontend not loading:**
   - Check nginx configuration in `event-manager frontend/nginx.conf`
   - Verify Docker container is running: `docker-compose ps`

3. **Build failures:**
   - Clear Docker cache: `docker system prune -a`
   - Rebuild without cache: `docker-compose build --no-cache`

4. **Authentication issues:**
   - Use the provided demo credentials listed above
   - Check browser console for any JavaScript errors

## Production Deployment

For production deployment:

1. **Security considerations:**
   - Update mock user credentials or implement real authentication
   - Enable SSL/TLS with proper certificates
   - Configure firewall rules
   - Regular security updates

2. **Performance optimization:**
   - Enable nginx caching
   - Optimize Docker image size
   - Use CDN for static assets

3. **Monitoring:**
   - Add logging aggregation
   - Set up health monitoring
   - Monitor container resource usage

## File Structure

```
├── docker-compose.yml                    # Main orchestration
├── DOCKER.md                            # This documentation
└── event-manager frontend/
    ├── Dockerfile                       # Frontend container config
    ├── nginx.conf                       # Nginx configuration
    ├── .dockerignore                    # Build optimization
    ├── package.json                     # Node.js dependencies
    └── src/                            # React source code
        ├── context/                    # Authentication context
        ├── components/                 # React components
        ├── pages/                      # Page components
        └── router/                     # Routing configuration
```

## Support

If you encounter issues:
1. Check the logs: `docker-compose logs frontend`
2. Verify the container is running: `docker-compose ps`
3. Ensure port 3000 is not in use by other applications
4. Try rebuilding: `docker-compose up --build`
5. For authentication issues, use the provided demo credentials
