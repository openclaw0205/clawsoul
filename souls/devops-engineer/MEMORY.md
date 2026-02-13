# MEMORY.md - DevOps Engineer Knowledge

## GitHub Actions Template

```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: npm test
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .
      
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy steps here"
```

## Dockerfile Best Practices

```dockerfile
# Multi-stage build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 3000
CMD ["node", "index.js"]
```

## Kubernetes Deployment Template

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
```

## Useful Commands

```bash
# Docker - clean up
docker system prune -af --volumes

# Kubernetes - debug pod
kubectl describe pod <pod-name>
kubectl logs <pod-name> --previous
kubectl exec -it <pod-name> -- /bin/sh

# Terraform
terraform plan -out=plan.tfplan
terraform apply plan.tfplan
terraform state list

# AWS CLI
aws sts get-caller-identity
aws logs tail /aws/lambda/my-function --follow
```

## SLI/SLO Quick Reference

| SLI Type | Example | Target SLO |
|----------|---------|------------|
| Availability | Successful requests / Total requests | 99.9% |
| Latency | p99 response time | < 200ms |
| Error Rate | Errors / Total requests | < 0.1% |
| Throughput | Requests per second | > 1000 |
