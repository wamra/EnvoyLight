FROM golang:1.21-alpine

WORKDIR /app

# Install git and protoc compiler
RUN apk add --no-cache protobuf-dev git

# Copy proto files and service code
COPY services/proto /app/proto
COPY services/service2 /app/service2

# Generate protobuf code
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.31.0
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0
RUN protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    proto/service.proto

# Build and run the service
WORKDIR /app/service2
RUN mkdir -p proto
RUN cp ../proto/*.go proto/
RUN go mod init service2
RUN go get google.golang.org/grpc@v1.62.0
RUN go get google.golang.org/protobuf@v1.31.0
RUN go mod tidy
RUN go build -o main .

EXPOSE 50052
CMD ["./main"] 