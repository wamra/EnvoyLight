# EnvoyLight - gRPC Routing POC

This project demonstrates the use of Envoy Proxy for routing gRPC traffic between multiple services.

## Project Structure
- `frontend/` - React application
- `services/` - Two gRPC services
- `envoy/` - Envoy proxy configuration
- `docker/` - Docker configuration files

## Prerequisites
- Node.js (v14 or later)
- Go (v1.16 or later)
- Docker and Docker Compose
- Protocol Buffers compiler (protoc)

## Setup Instructions

1. Start the services and Envoy:
```bash
docker-compose up -d
```

2. Start the frontend:
```bash
cd frontend
npm install
npm start
```

3. Access the application at http://localhost:3000

## Architecture
- Frontend: React application running on port 3000
- Envoy Proxy: Running on port 8080
- Service 1: Running on port 50051
- Service 2: Running on port 50052

## How it Works
The React frontend connects to the Envoy proxy, which routes requests to either Service 1 or Service 2 based on the request path. This allows different teams to run their respective services independently while sharing the same Envoy proxy instance. 