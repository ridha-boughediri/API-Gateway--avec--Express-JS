import { Test, TestingModule } from '@nestjs/testing';
import { UserAttachmentService } from './user-attachment.service';

describe('UserAttachmentService', () => {
  let service: UserAttachmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAttachmentService],
    }).compile();

    service = module.get<UserAttachmentService>(UserAttachmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add and get attachments', () => {
    service.addAttachment('user1', 'attachment1');
    const attachments = service.getAttachments('user1');
    expect(attachments).toEqual(['attachment1']);
  });

  it('should remove attachments', () => {
    service.addAttachment('user1', 'attachment1');
    service.removeAttachment('user1', 'attachment1');
    const attachments = service.getAttachments('user1');
    expect(attachments).toEqual([]);
  });
});
