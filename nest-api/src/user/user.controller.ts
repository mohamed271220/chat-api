import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get users
  @Get()
  @UseGuards(JwtAuthGuard)
  async createUser() {
    // return await this.userService.createUser();
  }
}
