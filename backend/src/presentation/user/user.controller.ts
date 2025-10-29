import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '../../use-cases/user/register-user.usecase';
import { RegisterUserDto } from './register-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    // Temporary log to inspect incoming payload
    console.log('POST /user/register payload:', dto);

    const user = await this.registerUseCase.execute(dto.email, dto.password);
    return { message: 'User registered successfully'};
  }
}
