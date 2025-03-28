/**
 * @fileoverview gRPC-Web generated client stub for envoylight
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.29.3
// source: service.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as service_pb from './service_pb'; // proto import: "service.proto"


export class GreeterClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorSayHello = new grpcWeb.MethodDescriptor(
    '/envoylight.Greeter/SayHello',
    grpcWeb.MethodType.UNARY,
    service_pb.HelloRequest,
    service_pb.HelloReply,
    (request: service_pb.HelloRequest) => {
      return request.serializeBinary();
    },
    service_pb.HelloReply.deserializeBinary
  );

  sayHello(
    request: service_pb.HelloRequest,
    metadata?: grpcWeb.Metadata | null): Promise<service_pb.HelloReply>;

  sayHello(
    request: service_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: service_pb.HelloReply) => void): grpcWeb.ClientReadableStream<service_pb.HelloReply>;

  sayHello(
    request: service_pb.HelloRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: service_pb.HelloReply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/envoylight.Greeter/SayHello',
        request,
        metadata || {},
        this.methodDescriptorSayHello,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/envoylight.Greeter/SayHello',
    request,
    metadata || {},
    this.methodDescriptorSayHello);
  }

}

