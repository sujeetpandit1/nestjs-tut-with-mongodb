import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Category } from "../book.schema"
import { User } from "src/auth/schema/user-auth.schema"



export class UpdateBooDto{

    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category, { message: 'Invalid category' })
    readonly category: Category

    @IsNotEmpty({message: 'You cannot pass user Id'})
    readonly user: User;
}