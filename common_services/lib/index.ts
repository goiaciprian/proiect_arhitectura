import { Logger } from "./logger"
import { RabbitMQConnection } from "./rabbitmq.connection"
import type { RabbitPeople, GrpcRequestDto, GrpcResponseDto, GrpcServer } from "./types"

export * as proto from './generated/service';

export {
    Logger,
    RabbitMQConnection,
}

export type {
    RabbitPeople,
    GrpcRequestDto,
    GrpcResponseDto,
    GrpcServer
}
