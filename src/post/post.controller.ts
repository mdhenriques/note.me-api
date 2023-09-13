import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { UpdatePostDTO } from "./dto/updatePost.dto";
import { ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse } from "@nestjs/swagger";

@ApiTags('posts')
@Controller('posts')
export class PostController {

    constructor(private readonly postService: PostService) {}    
    
    @HttpCode(HttpStatus.CREATED)
    @Post()
    @ApiCreatedResponse({ 
        description: 'Post has been successfully created.',
        type: Posts
    })
    @ApiBadRequestResponse({ description: 'Bad Request' })  
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })  
    async createPost(@Body() createPostDTO: CreatePostDTO): Promise<{ message: string, data: Posts}> {
        try {
            const newPost = await this.postService.createPost(createPostDTO)

            if (!newPost) {
                throw new HttpException('Failed to create post', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return { message: 'Post has been successfully created.', data: newPost };
        } catch (err) {
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'Post has been successfully deleted' })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async deletePost(@Param('id') id: number): Promise<void> {
        try {
            const deleted = await this.postService.deletePostById(id);
      
            if (!deleted) {
              throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
            }
        } catch (error) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }      
    }
    
    @Put(':id')
    @ApiOkResponse({ description: 'Post has been successfully updated' })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async updatePost(@Param('id') postId: number, @Body() updatePostDTO: UpdatePostDTO): Promise<{ status: string, data: Posts}> {
      try {
        const updatedPost = await this.postService.updatePost(postId, updatePostDTO);
  
        if (!updatedPost) {
          throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
        }  
        return { status: 'success', data: updatedPost };
      } catch (error) {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get(':userId')
    @ApiOkResponse({ description: 'Posts were received successfully' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getPostByUserId(@Param('userId') userId: number): Promise<Posts[]> {
        try {
            const posts = await this.postService.getPostByUserId(userId);

            if(!posts || posts.length === 0) {
                return [];
            }

            return posts;
        } catch (err) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
         
    }    
}
