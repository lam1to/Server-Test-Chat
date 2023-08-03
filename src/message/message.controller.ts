import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageCreateDto } from './dto/messageCreateDto.dto';
import { MessageUpdateDto } from './dto/messageUpdateDto.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GatewayGateway } from 'src/gateway/gateway.gateway';
import { StorageService } from 'src/storage/storage.service';
import { ContentImgService } from 'src/content-img/content-img.service';

@Controller('message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private gateway: GatewayGateway,
    private storage: StorageService,
    private contentImg: ContentImgService,
  ) {}

  @Post('create')
  async createMessage(@Body() dto: MessageCreateDto) {
    return this.messageService.createMessage(dto);
  }

  @Get('getAllForChat/:id')
  @UseGuards(AuthGuard)
  async getAllForChat(@Param('id') id: string, @Req() req: Request) {
    const idUser = req['user'].id;
    return this.messageService.getAllForChat(id, idUser);
  }
  @Patch('update')
  async updateMessage(@Body() dto: MessageUpdateDto) {
    return this.messageService.updateMessage(dto);
  }

  @Post('createWithImg')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: memoryStorage(),
      limits: { fileSize: 15728640 }, // 15MB --- 15*2^20
      fileFilter: (req, file, callback) => {
        return file.mimetype.match(/image\/(jpg|jpeg|png|gif|webp)$/)
          ? callback(null, true)
          : callback(
              new BadRequestException(
                'Invalid file type or maximum size limit exceeded',
              ),
              false,
            );
      },
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: MessageCreateDto,
  ): Promise<void> {
    return this.messageService.createMessageWithImg(
      dto,
      files,
      this.gateway,
      this.storage,
      this.contentImg,
    );
  }
}
