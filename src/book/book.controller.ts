import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/book.schema';
import { CreateBooDto } from './schema/dto/create-book.dto';
import {Query as ExpressQuery} from 'express-serve-static-core'
import { AuthGuard } from '@nestjs/passport';

@Controller('books') //changes route
export class BookController {
    constructor(
        private bookService: BookService
    ){}


    @Post('/addbook')
    @UseGuards(AuthGuard())
    async createBook(
        @Body() body: CreateBooDto,
        @Req() req,
        ): Promise<Book>{
            const userId = req.user._id; 
            // console.log(userId);
            
        return await this.bookService.createBook(body, userId);
    }


    @Get()
    async getAllBooks(): Promise<Book[]>{
        return await this.bookService.findAll();   
    }

    @Get('/search')
    async getBooksByQuery(@Query() query: ExpressQuery): Promise<Book[]>{
        // console.log('Query:', query)
        return await this.bookService.findAllByQuery(query);   
    }

    @Get(':id')
    async findBookById(@Param('id') id: string): Promise<Book>{
        return await this.bookService.findBookById(id);   
    }

    @Patch(':id')
    async updateBook(@Param('id') id: string, @Body() bookUpdateDto: any): Promise<Book> {
        return await this.bookService.updateBookById(id, bookUpdateDto);
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: string): Promise<Book>{
        return await this.bookService.deleteBookById(id);   
    }
}
