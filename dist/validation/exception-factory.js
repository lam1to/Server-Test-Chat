"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionFactory = void 0;
const common_1 = require("@nestjs/common");
const exceptionFactory = (validationErrors = []) => {
    throw new common_1.BadRequestException(validationErrors.map((error) => ({
        field: error.property,
        error: Object.values(error.constraints ?? []).join(', '),
    })));
};
exports.exceptionFactory = exceptionFactory;
//# sourceMappingURL=exception-factory.js.map