#!/bin/bash

# Check if protoc is installed
if ! command -v protoc &> /dev/null; then
    echo "protoc is not installed. Please install it first:"
    echo "brew install protobuf"
    exit 1
fi

# Check if proto file exists
if [ ! -f "services/proto/service.proto" ]; then
    echo "Proto file not found at services/proto/service.proto"
    exit 1
fi

# Create proto directory if it doesn't exist
mkdir -p frontend/src/proto

# Generate JavaScript code from proto
echo "Generating JavaScript code from proto..."
protoc -I=services/proto \
  --js_out=import_style=commonjs:frontend/src/proto \
  --grpc-web_out=import_style=commonjs,mode=grpcwebtext:frontend/src/proto \
  services/proto/service.proto

echo "Done! Generated files are in frontend/src/proto/" 