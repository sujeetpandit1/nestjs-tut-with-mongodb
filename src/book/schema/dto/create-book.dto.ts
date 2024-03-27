import { IsNotEmpty, IsString, IsNumber, IsEnum, IsEmpty } from 'class-validator';
import { Category } from '../book.schema';
import { User } from 'src/auth/schema/user-auth.schema';

export class CreateBooDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, { message: 'Invalid category' })
    readonly category: Category;

    @IsEmpty({message: 'You cannot pass user Id'})
    readonly userId: User; 
}
