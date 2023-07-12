"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBlockUserDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_block_user_dto_1 = require("./create-block-user.dto");
class UpdateBlockUserDto extends (0, mapped_types_1.PartialType)(create_block_user_dto_1.CreateBlockUserDto) {
}
exports.UpdateBlockUserDto = UpdateBlockUserDto;
//# sourceMappingURL=update-block-user.dto.js.map