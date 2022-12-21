import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ collection: "User" })
export class User {

    @Prop({ type: String })
    name: string

    @Prop({ type: String })
    email: string
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);