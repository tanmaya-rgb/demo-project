import { Controller, Body, Delete, Param, Get, Put, Query, Post, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserService } from './user.service.js';
import { RoleGuard } from '../guards/role.guard.js';
//@Get('/all')
//@Get(':id')
//Post()


@Controller('user')
@UseGuards(RoleGuard) // Apply the RoleGuard to all routes in this controller
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    getUsers(@Query('name') name: string): unknown {
        return this.userService.findAllUsers(name);
        // const users = [
        //     { id: 1, name: 'John Doe' },
        //     { id: 2, name: 'Jane Smith' }
        // ];

        // if (!name) {
        //     return users;
        // }

        // return users.filter((user) =>
        //     user.name.toLowerCase().includes(name.toLowerCase())
        // );
    }
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: string): unknown {
        return this.userService.findOneUser(Number(id));
    }

    @Post() // Post request to create a new user
    createUser(@Body() createUserDto: CreateUserDto): unknown {
        // Implementation for creating a new user
        return this.userService.createUser(createUserDto);
    }

    @Put(':id') // Put request to update an existing user by ID
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): unknown {
        // Implementation for updating a user by ID
        return this.userService.updateUser(Number(id), updateUserDto);
    }
    
    @Delete(':id') // Delete request to delete a user by ID
    @UseGuards(RoleGuard) // Apply the RoleGuard to this route
    deleteUser(@Param('id') id: string) {
        // Implementation for deleting a user by ID
        return this.userService.deleteUser(Number(id));
    }
}
