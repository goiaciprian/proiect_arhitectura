import { Logger } from "./logger"
import { RabbitMQConnection } from "./rabbitmq.connection"
import type { RabbitPeople,GrpcRequestDto, GrpcResponseDto, GrpcServer } from "./types"
import { proto as protoPackageDefinitions } from './proto';

export {
    Logger,
    RabbitMQConnection,
    protoPackageDefinitions
}

export type {
    RabbitPeople,
    GrpcRequestDto,
    GrpcResponseDto,
    GrpcServer
}
