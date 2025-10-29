import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";

export const DatabaseConfig = [
  ConfigModule.forRoot({
    isGlobal: true,
  }),
  
  MongooseModule.forRoot(((): string => {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI environment variable is required');
    }
    return uri;
  })()),
];