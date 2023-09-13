import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { UpdatePostDTO } from "./dto/updatePost.dto";

@Controller('posts')
export class PostController {

    constructor(private readonly postService: PostService) {}    
    
    @Post()    
    async createPost(@Body() createPostDTO: CreatePostDTO): Promise<Posts> {
        return await this.postService.createPost(createPostDTO);                    
    }
    
    @HttpCode(204)
    @Delete(':id')
    async deletePost(@Param('id') id: number): Promise<void> {
        await this.postService.deletePostById(id);        
    }
    
    @Put(':id')
    async updatePost(@Param('id') postId: number, @Body() updatePostDTO: UpdatePostDTO): Promise<any> {
        const updatedPost = await this.postService.updatePost(postId, updatePostDTO);
        return { status: 'success', data: updatedPost };
    }

    @Get('user/:userId')
    async getPostByUserId(@Param('userId') userId: number): Promise<Posts[]> {
        return await this.postService.getPostByUserId(userId);   
    }    
}
