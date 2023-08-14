"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('My-Places API')
    .setDescription('The My-Places API description')
    .setVersion('1.0')
    .addBearerAuth({
    description: 'Please enter token in following format: Bearer <JWT>',
    name: 'Authorization',
    scheme: 'Bearer',
    type: 'http',
    in: 'Header',
}, 'access-token')
    .build();
//# sourceMappingURL=swagger.config.js.map