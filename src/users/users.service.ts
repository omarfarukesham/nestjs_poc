/* eslint-disable prettier/prettier */
// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const createdUser = new this.userModel({ name, email, password });
    return createdUser.save();
  }

  async updateUser(id: string, updateData: UpdateUserDto): Promise<User> {
    const udpateResult = await this.userModel.findByIdAndUpdate(id, updateData, {
     new: true,
     runValidators: true,
    }).exec();

    // If the user is not found, findByIdAndUpdate will return null
    if (!udpateResult) {
      throw new NotFoundException('User not found');
    }
    return udpateResult;
  }
  async deleteUser(id: string): Promise<void> {
    const deleteResult = await this.userModel.findByIdAndDelete(id).exec();
    if (!deleteResult) {
      throw new NotFoundException('User not found');
    }
  }

}
