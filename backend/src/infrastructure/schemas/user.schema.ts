import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class UserSchemaClass {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: Date.now })
    createdAt: Date;
}

export type UserDocument = UserSchemaClass & Document;
export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);