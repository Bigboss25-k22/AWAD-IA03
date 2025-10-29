import { Injectable, Inject, ConflictException } from '@nestjs/common';
import type { IUserRepository } from '../../core/repositories/user.repository';
import { User } from '../../core/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository
  ) {}

  async execute(email: string, password: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User(email, hashedPassword);

    return await this.userRepo.createUser(newUser);
  }
}