import { Module } from '@nestjs/common';
import { DatabaseConfig } from './shared/config/database.config';
import { UserModule } from 'src/presentation/user/user.module';

@Module({
  imports: [
    ...DatabaseConfig,
    UserModule,
  ],
})
export class AppModule {}
