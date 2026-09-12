import { Injectable, NotFoundException } from '@nestjs/common';
import { LoggerService } from '../user.logger.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

interface User {
    id: number;
    name: string;
    email: string;
}

// - 'findOneUser(id : number)' -> returns a single user by ID'
// - 'createUser(dto : createUserDto)' -> creates a new user and returns the created user'
// - 'updateUser(id : number, dto : updateUserDto)' -> updates an existing user by ID and returns the updated user'
// - 'deleteUser(id : number)' -> deletes a user by ID and returns a success message'

@Injectable()
export class UserService {
    constructor(private readonly logger : LoggerService) {}
    private users: User[] = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
    ];

    findAllUsers(name: string = ''):  User[] {
        this.logger.log('Finding all users');
        return this.users.filter((user) =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );  
    }

    findOneUser(id: number) {
        const user = this.users.find((user) => user.id == id);

        if(!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    createUser(dto : CreateUserDto): User {
        this.logger.log(`Creating user`);
        const newUser: User = { id : this.users.length + 1, ...dto };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, dto : UpdateUserDto) {
        this.logger.log(`Updating user with ID: ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...dto };
            return this.users[index];
        }
        return undefined;
    }


    deleteUser(id: number): boolean {
        this.logger.log(`Deleting user with ID: ${id}`);
        const index = this.users.findIndex((user) => user.id === id);
        if (index !== -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}

// UserController -> needs UserService
// UserService -> needs LoggerService
// Nest -> creates and connects everything