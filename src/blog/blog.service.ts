// blog/blog.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().exec();
  }

  async findOne(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async create(
    blogTitle: string,
    details: string,
    // author: string,
  ): Promise<Blog> {
    const createdBlog = new this.blogModel({ blogTitle, details });
    return createdBlog.save();
  }

  async update(id: string, blogTitle: string, details: string): Promise<Blog> {
    const blog = await this.blogModel.findByIdAndUpdate(
      id,
      { blogTitle, details },
      { new: true },
    );
    if (!blog) throw new NotFoundException('Blog not found');
    return blog;
  }

  async remove(id: string): Promise<string> {
    const result = await this.blogModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Blog not found');
    return 'Blog deleted successfully';
  }
}
