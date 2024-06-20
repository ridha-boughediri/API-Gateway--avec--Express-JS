import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config"

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from "./prisma/prisma.module";
import { MailerModule } from './mailer/mailer.module';
import { CartModule } from './Cart/cart.module';

@Module({

  imports: [ConfigModule.forRoot({isGlobal : true}),AuthModule,PrismaModule, MailerModule, CartModule ],
})
export class AppModule {}
