import { CreateGatewayDto } from './create-gateway.dto';
declare const UpdateGatewayDto_base: import("@nestjs/mapped-types").MappedType<import("@nestjs/mapped-types/dist/types/remove-fields-with-type.type").RemoveFieldsWithType<Partial<CreateGatewayDto>, Function>>;
export declare class UpdateGatewayDto extends UpdateGatewayDto_base {
    id: number;
}
export {};
