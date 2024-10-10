import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  AuthCredentialsDtoLogin,
  AuthCredentialsDtoSignUp,
} from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDtoSignUp): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/login')
  signIn(
    @Body() authCredentialsDto: AuthCredentialsDtoLogin,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/logout')
  logOut(): Promise<void> {
    return this.authService.logOut();
  }
}
