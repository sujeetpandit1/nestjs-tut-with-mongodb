import { Body, Controller, Post, Get } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from './schema/user-auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto){
    const data = await this.authService.createUser(signUpDto);
    return {message: "User Registered Successfully" , data: data || ''}
  }

  @Get('/login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);

    return{
        messagge: "Logged in",
        token: data.token
    }
  }
}
