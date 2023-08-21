"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReplyMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_reply_message_dto_1 = require("./create-reply-message.dto");
class UpdateReplyMessageDto extends (0, swagger_1.PartialType)(create_reply_message_dto_1.CreateReplyMessageDto) {
}
exports.UpdateReplyMessageDto = UpdateReplyMessageDto;
//# sourceMappingURL=update-reply-message.dto.js.map