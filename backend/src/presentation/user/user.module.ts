import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/presentation/user/user.controller';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { UserSchema } from '../../infrastructure/schemas/user.schema';
import { RegisterUserUseCase } from '../../use-cases/user/register-user.usecase';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    RegisterUserUseCase,
    { provide: 'IUserRepository', useClass: UserRepositoryImpl },
  ],
})
export class UserModule {}
