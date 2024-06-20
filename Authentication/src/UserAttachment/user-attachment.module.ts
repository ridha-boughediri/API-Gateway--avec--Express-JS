import { Module } from '@nestjs/common';
import { UserAttachmentService } from './user-attachment.service';

@Module({
  providers: [UserAttachmentService],
  exports: [UserAttachmentService],
})
export class UserAttachmentModule {}
