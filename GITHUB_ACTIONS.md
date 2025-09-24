# GitHub Actions Setup for Event Manager

This document explains how to set up and use GitHub Actions for the Event Manager application.

## 🚀 Quick Start

1. **Push your code to GitHub**
2. **Enable GitHub Actions** in your repository settings
3. **Workflows will run automatically** on push/PR events

## 📋 Available Workflows

### 1. **Build and Test** (`.github/workflows/build.yml`)
- **Triggers:** Push to any branch, Pull requests
- **Purpose:** Build and test the frontend application
- **Actions:**
  - Install dependencies
  - Run linter
  - Build application
  - Upload build artifacts

### 2. **Docker Build and Push** (`.github/workflows/docker.yml`)
- **Triggers:** Push to main branch, Tags, Pull requests
- **Purpose:** Build and push Docker images to GitHub Container Registry
- **Actions:**
  - Build Docker image
  - Push to `ghcr.io/YOUR_USERNAME/YOUR_REPO`
  - Cache layers for faster builds

### 3. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
- **Triggers:** Push to main/develop branches, Pull requests
- **Purpose:** Complete CI/CD pipeline with deployment
- **Actions:**
  - Build and test
  - Build and push Docker image
  - Deploy to staging (develop branch)
  - Deploy to production (main branch)

### 4. **Deploy** (`.github/workflows/deploy.yml`)
- **Triggers:** Push to main branch, Manual trigger
- **Purpose:** Deploy the application to various platforms
- **Actions:**
  - Deploy to cloud platforms (configurable)
  - Use Docker Compose for deployment

## 🔧 Configuration

### Required Secrets
No additional secrets are required! GitHub Actions uses the built-in `GITHUB_TOKEN` for container registry access.

### Environment Variables
- `REGISTRY`: GitHub Container Registry (`ghcr.io`)
- `IMAGE_NAME`: Your repository name

### Customization
Update the following in workflow files:
- **Repository name** in `IMAGE_NAME`
- **Branch names** in trigger conditions
- **Deployment targets** in deploy.yml

## 📦 Container Registry

Images are automatically pushed to:
```
ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
ghcr.io/YOUR_USERNAME/YOUR_REPO:main-abc1234
ghcr.io/YOUR_USERNAME/YOUR_REPO:v1.0.0
```

## 🚀 Deployment Options

### Option 1: Docker Compose
```bash
# Use the generated image
docker pull ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
docker run -p 3000:80 ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
```

### Option 2: Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: event-manager
spec:
  replicas: 3
  selector:
    matchLabels:
      app: event-manager
  template:
    metadata:
      labels:
        app: event-manager
    spec:
      containers:
      - name: event-manager
        image: ghcr.io/YOUR_USERNAME/YOUR_REPO:latest
        ports:
        - containerPort: 80
```

### Option 3: Cloud Platforms
- **AWS ECS**: Use the ECS deployment commands in deploy.yml
- **Google Cloud Run**: Use the Cloud Run deployment commands
- **Azure Container Instances**: Use the Azure deployment commands

## 🔍 Monitoring

### Workflow Status
- Check the **Actions** tab in your GitHub repository
- View logs for each workflow run
- Monitor build times and success rates

### Build Artifacts
- Frontend build files are uploaded as artifacts
- Available for download for 30 days
- Useful for debugging or manual deployment

## 🛠️ Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version compatibility
   - Verify package.json dependencies
   - Review build logs in Actions tab

2. **Docker Build Issues**
   - Ensure Dockerfile is correct
   - Check for missing files in build context
   - Verify Docker buildx is set up

3. **Deployment Issues**
   - Check environment variables
   - Verify deployment credentials
   - Review deployment logs

### Debug Commands
```bash
# Test build locally
cd "event-manager frontend"
npm ci
npm run build

# Test Docker build locally
docker build -t event-manager ./event-manager\ frontend
docker run -p 3000:80 event-manager
```

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Buildx Documentation](https://docs.docker.com/buildx/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)

## 🔄 Workflow Customization

To customize workflows for your specific needs:

1. **Modify trigger conditions** in workflow files
2. **Add environment-specific variables**
3. **Configure deployment targets**
4. **Add additional testing steps**
5. **Set up notifications** (Slack, email, etc.)

## 📈 Performance Optimization

- **Enable caching** for faster builds
- **Use multi-stage Docker builds**
- **Optimize Docker layers**
- **Parallel job execution**
- **Artifact retention policies**
