import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader"

const PROTO_SERVICE_PATH = './proto/service.proto'

const packageDefinition = protoLoader.loadSync(PROTO_SERVICE_PATH);
export const proto = grpc.loadPackageDefinition(packageDefinition).CompanieValoare;

