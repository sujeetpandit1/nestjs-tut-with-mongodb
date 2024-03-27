import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signUp.dto';
import { User } from './schema/user-auth.schema';
import { MongoError } from 'mongodb';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async createUser(signUpDto: SignUpDto): Promise<User>  {
        const { name, email, password } = signUpDto;

        try {
            // Hash password
            const hashedPass = await bcrypt.hash(password, 10);
    
            // const checkEmail
    
            const user: any = await this.userModel.create({
                name,
                email,
                password: hashedPass
            });
           
    
            return ;
            
        } catch (error: any) {
            // console.log(error.code);

            if(error.code === 11000){
                throw new ConflictException(`${email} already exists`);
            } else {
                throw new InternalServerErrorException();
            }

        }
    }

    async login(loginDto: LoginDto): Promise<{token: string}> {
        const { email, password } = loginDto;
        
        const user = await this.userModel.findOne({ email });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            throw new UnauthorizedException('Incorrect credentials');
        }

        const token = this.jwtService.sign({
            id: user.id
        })
        return { token };
    }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // getHello(@Request() req): string {
    //     return `Hello ${req.user.email}`;
    // }

}
