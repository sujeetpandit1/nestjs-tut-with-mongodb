import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schema/book.schema';
import {Query as ExpressQuery} from 'express-serve-static-core'
// import { User } from 'src/auth/schema/user-auth.schema';


@Injectable()
export class BookService {
    
    constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<Book>){}

    async createBook(body: any, userId: string): Promise<Book>{

        // const id = req.user;
        console.log(userId);
        

        const data = Object.assign(body, {userId: userId})
        const bookData: any = await this.bookModel.create(data);

        return bookData
    }


    async findAll(): Promise<Book[]>{
        return await this.bookModel.find();
    }

    async findAllByQuery(query: ExpressQuery): Promise<Book[]> {
        // console.log(query);

        const resPerPage = 1;
        const currentpage = Number(query.page) || 1;
        const skip = resPerPage * (currentpage - 1)
        

        const keyword: any = query.keyword? {
            title:{
                $regex: query.keyword,
                $options: 'i'
            }
        }:{};

        // const keyword: any = query.keyword ? {
        //     $or: [
        //         {
        //             title:{
        //                 $regex: query.keyword,
        //                 $options: 'i'
        //             },
        //             description:{
        //                 $regex: query.keyword,
        //                 $options: 'i'
        //             },
        //             // Add more fields here if needed
        //         }
        //     ]
        // }:{};

        return await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip);
    }

    async findBookById(id: string): Promise<Book>{

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Invalid ID');
        }
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book
    }

    async updateBookById(id: string, body: any): Promise<Book>{


        const book = await this.bookModel.findByIdAndUpdate(id, body, { new: true, runValidators: true});
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book
    }


    async deleteBookById(id: string): Promise<Book>{

        const book = await this.bookModel.findByIdAndDelete(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return
    }
}
