# EnvoyLight - gRPC Routing Demo

This project demonstrates the use of Envoy Proxy for routing gRPC traffic between multiple services. It showcases how different teams can run their own services while sharing a common Envoy proxy instance.

## Project Structure
```
.
├── frontend/               # React frontend application
├── services/              # gRPC services
│   ├── proto/            # Protocol buffer definitions
│   ├── service1/         # First gRPC service
│   └── service2/         # Second gRPC service
└── envoy/                # Envoy proxy configuration
```

## Prerequisites

- Docker and Docker Compose
- Node.js (v14 or later)
- Go (v1.21 or later)
- Protocol Buffers compiler (protoc)
- protoc-gen-go and protoc-gen-grpc-web plugins

### Installing Prerequisites

1. Install Protocol Buffers compiler:
```bash
# macOS
brew install protobuf

# Linux
apt-get install protobuf-compiler
```

2. Install protoc plugins:
```bash
# Install protoc-gen-js
npm install -g protoc-gen-js

# Install protoc-gen-grpc-web
npm install -g protoc-gen-grpc-web
```

## Setup Instructions

1. Generate the gRPC-Web code for the frontend:
```bash
chmod +x frontend/generate-proto.sh
./frontend/generate-proto.sh
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
cd ..
```

3. Start the backend services and Envoy proxy:
```bash
docker-compose up -d
```

4. Start the frontend application:
```bash
cd frontend
npm start
```

## Usage

1. Access the application at http://localhost:3000
2. Use the buttons to test both services:
   - "Call Service 1" button will route to the first gRPC service
   - "Call Service 2" button will route to the second gRPC service

![](service1-click.png)

![](service2-click.png)


## Architecture

- Frontend: React application (port 3000)
- Envoy Proxy: Routes gRPC-Web traffic (port 8080)
- Service 1: First gRPC service (port 50051)
- Service 2: Second gRPC service (port 50052)


## How It Works

1. The React frontend makes gRPC-Web calls to Envoy proxy
2. Envoy routes the requests to the appropriate service based on headers
3. Services process the requests and return responses
4. Responses are forwarded back through Envoy to the frontend

This setup allows:
- Independent service deployment
- Shared proxy configuration
- Centralized routing logic
- Service isolation

## Development

To rebuild and restart services after making changes:

```bash
# Rebuild and restart all services
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Restart a specific service
docker-compose restart service1
```

## Troubleshooting

1. If you see "no healthy upstream" errors:
   - Ensure all services are running: `docker-compose ps`
   - Check service logs: `docker-compose logs service1`
   - Verify Envoy configuration: `docker-compose logs envoy`

2. If frontend fails to connect:
   - Check if Envoy is running and accessible
   - Verify the gRPC-Web code was generated correctly
   - Check browser console for CORS errors 