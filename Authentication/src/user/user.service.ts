import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
    private users: User[] = [];

    create(user: User): User {
        this.users.push(user);
        return user;
    }

    getAll(): User[] {
        return this.users;
    }
}
