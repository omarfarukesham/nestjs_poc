import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user with the provided name, email, and password.
   * @param name - The name of the user.
   * @param email - The email of the user.
   * @param password - The password for the user.
   * @returns The created user object.
   */

  @Get()
  async getUsers() {
    const result = await this.userService.getUsers();
    return result;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const getResult = await this.userService.findById(id);
    return getResult;
  }

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.createUser(name, email, password);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const getResult = await this.userService.updateUser(id, updateUserDto);
    if (!getResult) {
      return { message: 'User not found' };
    }
    return getResult;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const getResult = await this.userService.findById(id);
    if (!getResult) {
      return { message: 'User not found' };
    }
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
