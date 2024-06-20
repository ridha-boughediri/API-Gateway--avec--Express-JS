import { Controller, Post, Get, Body } from '@nestjs/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    createUser(@Body() user: User) {
        return this.userService.create(user);
    }

    @Get()
    getAllUsers() {
        return this.userService.getAll();
    }
}
