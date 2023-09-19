import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { ApiCreatedResponse, ApiTags, ApiBadRequestResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiOkResponse } from "@nestjs/swagger";
import { CustomRequest } from '../middlewares/jwt.middleware'


enum PostStatus {
    URGENTE = 'urgente',
    BACKLOG = 'backlog',
    PENDENTE = 'pendente',
    CONCLUIDA = 'concluida',
  }


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
    async createPost(@Body() createPostDTO: CreatePostDTO, @Req() req: CustomRequest): Promise<{ message: string, data: Posts}> {
        try {           
            const userId = req.userId;
            
            const newPost = await this.postService.createPost(userId ,createPostDTO)

            if (!newPost) {
                throw new HttpException('Failed to create post', HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return { message: 'Post has been successfully created.', data: newPost };
        } catch (err) {
            console.log(err);
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
    }

    @Post(':status')
    async createPostWithStatus(@Param('status') status: string,@Body() createPostDTO: CreatePostDTO, @Req() req: CustomRequest): Promise<Posts> {
        try {
            const userId = req.userId;
            const newPost = await this.postService.createPost(userId ,createPostDTO, status)
            return newPost;
        } catch (err) {
            console.log(err)
        }

    }
    
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiNoContentResponse({ description: 'Post has been successfully deleted' })
    @ApiNotFoundResponse({ description: 'Post not found' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async deletePost(@Param('id') id: number): Promise<void> {
        const result = await this.postService.deletePostById(id);

        if (result === 'not-found') {
            throw new NotFoundException('Post not found');
        } else if (result === 'deleted') {
            // O post foi excluído com sucesso, status 204 (No Content) será retornado automaticamente
        }
    }
    

    @Get()
    @ApiOkResponse({ description: 'Posts were received successfully' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
    async getPostByUserId( @Req() req: CustomRequest): Promise<Posts[]> {
        try {
            const userId = req.userId;
            const posts = await this.postService.getPostByUserId(userId);

            if(!posts || posts.length === 0) {
                return [];
            }

            return posts;
        } catch (err) {
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
         
    }    

    @Put(':id/:status')
    async updatePostStatus(@Param('id') userId: number, @Param('status') postStatus: PostStatus) {
        const updatedPost = await this.postService.updatePostStatus(userId, postStatus)
    }
}
