export interface RabbitPeople {
    nume: string;
    numar_angajati: number;
}

export interface GrpcRequestDto {
    nume: string;
}

export interface GrpcResponseDto {
    valoare_estimata: number;
}

export interface GrpcServer {
    ValoareEstimata: (request: GrpcRequestDto) => GrpcResponseDto;
}