export interface RabbitPeople {
    nume: string;
    functie: string;
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

export interface RabbitCompanies {
    nume: string;
    numarAngajati: number;
}