/* eslint-disable */
import { ChannelCredentials, Client, makeGenericClientConstructor, Metadata } from "@grpc/grpc-js";
import type {
  CallOptions,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "service";

export interface RequestDto {
  nume: string;
}

export interface ResponseDto {
  valoareEstimata: number;
}

export interface SerachResponseDto {
  nume: string;
  functie: string;
  avere: number;
}

function createBaseRequestDto(): RequestDto {
  return { nume: "" };
}

export const RequestDto = {
  encode(message: RequestDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nume !== "") {
      writer.uint32(10).string(message.nume);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nume = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RequestDto {
    return { nume: isSet(object.nume) ? globalThis.String(object.nume) : "" };
  },

  toJSON(message: RequestDto): unknown {
    const obj: any = {};
    if (message.nume !== "") {
      obj.nume = message.nume;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RequestDto>, I>>(base?: I): RequestDto {
    return RequestDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RequestDto>, I>>(object: I): RequestDto {
    const message = createBaseRequestDto();
    message.nume = object.nume ?? "";
    return message;
  },
};

function createBaseResponseDto(): ResponseDto {
  return { valoareEstimata: 0 };
}

export const ResponseDto = {
  encode(message: ResponseDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.valoareEstimata !== 0) {
      writer.uint32(8).int32(message.valoareEstimata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.valoareEstimata = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ResponseDto {
    return { valoareEstimata: isSet(object.valoareEstimata) ? globalThis.Number(object.valoareEstimata) : 0 };
  },

  toJSON(message: ResponseDto): unknown {
    const obj: any = {};
    if (message.valoareEstimata !== 0) {
      obj.valoareEstimata = Math.round(message.valoareEstimata);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ResponseDto>, I>>(base?: I): ResponseDto {
    return ResponseDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ResponseDto>, I>>(object: I): ResponseDto {
    const message = createBaseResponseDto();
    message.valoareEstimata = object.valoareEstimata ?? 0;
    return message;
  },
};

function createBaseSerachResponseDto(): SerachResponseDto {
  return { nume: "", functie: "", avere: 0 };
}

export const SerachResponseDto = {
  encode(message: SerachResponseDto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nume !== "") {
      writer.uint32(10).string(message.nume);
    }
    if (message.functie !== "") {
      writer.uint32(18).string(message.functie);
    }
    if (message.avere !== 0) {
      writer.uint32(24).int32(message.avere);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SerachResponseDto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSerachResponseDto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nume = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.functie = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.avere = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SerachResponseDto {
    return {
      nume: isSet(object.nume) ? globalThis.String(object.nume) : "",
      functie: isSet(object.functie) ? globalThis.String(object.functie) : "",
      avere: isSet(object.avere) ? globalThis.Number(object.avere) : 0,
    };
  },

  toJSON(message: SerachResponseDto): unknown {
    const obj: any = {};
    if (message.nume !== "") {
      obj.nume = message.nume;
    }
    if (message.functie !== "") {
      obj.functie = message.functie;
    }
    if (message.avere !== 0) {
      obj.avere = Math.round(message.avere);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SerachResponseDto>, I>>(base?: I): SerachResponseDto {
    return SerachResponseDto.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SerachResponseDto>, I>>(object: I): SerachResponseDto {
    const message = createBaseSerachResponseDto();
    message.nume = object.nume ?? "";
    message.functie = object.functie ?? "";
    message.avere = object.avere ?? 0;
    return message;
  },
};

export type PeopleServiceService = typeof PeopleServiceService;
export const PeopleServiceService = {
  valoareEstimata: {
    path: "/service.PeopleService/ValoareEstimata",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RequestDto) => Buffer.from(RequestDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RequestDto.decode(value),
    responseSerialize: (value: ResponseDto) => Buffer.from(ResponseDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ResponseDto.decode(value),
  },
  search: {
    path: "/service.PeopleService/search",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: RequestDto) => Buffer.from(RequestDto.encode(value).finish()),
    requestDeserialize: (value: Buffer) => RequestDto.decode(value),
    responseSerialize: (value: SerachResponseDto) => Buffer.from(SerachResponseDto.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SerachResponseDto.decode(value),
  },
} as const;

export interface PeopleServiceServer extends UntypedServiceImplementation {
  valoareEstimata: handleUnaryCall<RequestDto, ResponseDto>;
  search: handleUnaryCall<RequestDto, SerachResponseDto>;
}

export interface PeopleServiceClient extends Client {
  valoareEstimata(
    request: RequestDto,
    callback: (error: ServiceError | null, response: ResponseDto) => void,
  ): ClientUnaryCall;
  valoareEstimata(
    request: RequestDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ResponseDto) => void,
  ): ClientUnaryCall;
  valoareEstimata(
    request: RequestDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ResponseDto) => void,
  ): ClientUnaryCall;
  search(
    request: RequestDto,
    callback: (error: ServiceError | null, response: SerachResponseDto) => void,
  ): ClientUnaryCall;
  search(
    request: RequestDto,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: SerachResponseDto) => void,
  ): ClientUnaryCall;
  search(
    request: RequestDto,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: SerachResponseDto) => void,
  ): ClientUnaryCall;
}

export const PeopleServiceClient = makeGenericClientConstructor(
  PeopleServiceService,
  "service.PeopleService",
) as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): PeopleServiceClient;
  service: typeof PeopleServiceService;
  serviceName: string;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
