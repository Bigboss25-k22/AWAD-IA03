import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUserRepository } from "../../core/repositories/user.repository";
import { User } from "../../core/entities/user.entity";
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async createUser(user: User): Promise<User> {
        const created = new this.userModel(user);
        return created.save();
    }
}

