// blog/blog.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @Post()
  async create(
    @Request() req,
    @Body() body: { blogTitle: string; details: string },
  ) {
    return this.blogService.create(
      body.blogTitle,
      body.details,
      //   req.user.username,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'super_admin')
  async update(
    @Param('id') id: string,
    @Body() body: { blogTitle: string; details: string },
  ) {
    return this.blogService.update(id, body.blogTitle, body.details);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('super_admin')
  async remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
