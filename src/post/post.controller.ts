import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { UpdatePostDTO } from "./dto/updatePost.dto";

@Controller('posts')
export class PostController {

    constructor(private readonly postService: PostService) {}

    //@UseGuards(AuthGuard)
    @Post()
    async createPost(@Body() createPostDTO: CreatePostDTO): Promise<any> {
        
        const newPost = await this.postService.createPost(createPostDTO);
        return { status: 'success', data: newPost }        
    }

    //@UseGuards(AuthGuard)
    @Delete(':id')
    async deletePost(@Param('id') id: number): Promise<any> {
        await this.postService.deletePostById(id);
        return 'Post deleted successfully';
    }

    //@UseGuards(AuthGuard)
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