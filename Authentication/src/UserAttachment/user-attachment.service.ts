import { Injectable } from '@nestjs/common';

@Injectable()
export class UserAttachmentService {
  private attachments: { [userId: string]: string[] } = {};

  addAttachment(userId: string, attachment: string) {
    if (!this.attachments[userId]) {
      this.attachments[userId] = [];
    }
    this.attachments[userId].push(attachment);
  }

  getAttachments(userId: string): string[] {
    return this.attachments[userId] || [];
  }

  removeAttachment(userId: string, attachment: string) {
    if (this.attachments[userId]) {
      this.attachments[userId] = this.attachments[userId].filter(att => att !== attachment);
    }
  }
}
