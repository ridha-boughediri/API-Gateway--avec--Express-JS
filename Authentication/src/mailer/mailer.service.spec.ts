import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';

describe('MailerService', () => {
  let service: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService],
    }).compile();

    service = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send signup confirmation email', async () => {
    const userEmail = 'test@example.com';
    await expect(service.sendSignupConfirmation(userEmail)).resolves.not.toThrow();
  });

  it('should send reset confirmation email', async () => {
    const userEmail = 'test@example.com';
    await expect(service.sendResetConfirmation(userEmail)).resolves.not.toThrow();
  });
});
