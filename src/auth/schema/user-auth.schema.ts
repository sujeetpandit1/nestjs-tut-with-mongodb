import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class User extends Document{
    @Prop()
    name: string;

    @Prop({ unique: true, message: 'Email already exists' })
    email: string;

    @Prop()
    password: string;
    static _id: any;
}
export const UserSchema = SchemaFactory.createForClass(User);
