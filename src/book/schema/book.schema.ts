import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schema/user-auth.schema";



export enum Category{
    ADVENTURE = 'Adventure',
    BIOGRAPHY = 'Biography',
    CHILDREN = 'Children',
    FICTION = 'Fiction',
    HISTORY = 'History'
}



@Schema({
    timestamps: true
})

export class Book{

    @Prop()
    title: string

    @Prop()
    description: string

    @Prop()
    price: number

    @Prop()
    category: Category


    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userId: User

}


export const BookSchema = SchemaFactory.createForClass(Book)