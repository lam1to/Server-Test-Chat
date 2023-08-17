declare class ValidationMessageDto {
    field: string;
    error: string;
}
export declare class ValidationExceptionDto {
    statusCode: number;
    message: ValidationMessageDto[];
    error: string;
}
export {};
