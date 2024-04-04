import { Logger } from "./logger"
import { RabbitMQConnection } from "./rabbitmq.connection"
import * as grpc from '@grpc/grpc-js';
import type { RabbitPeople, GrpcRequestDto, GrpcResponseDto, GrpcServer, RabbitCompanies } from "./types"
import * as proto from './generated/service.server';

export class GrpcClientFactory {
    static createClient (host: string) {
        return new proto.PeopleServiceClient(host, grpc.ChannelCredentials.createInsecure());
    } 
}

export {
    proto
}
export {
    Logger,
    RabbitMQConnection,
}

export type {
    RabbitPeople,
    RabbitCompanies,
    GrpcRequestDto,
    GrpcResponseDto,
    GrpcServer
}
