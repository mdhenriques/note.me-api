import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { UpdatePostDTO } from "./dto/updatePost.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class PostService {

    async createPost(userId: number, createPostDTO: CreatePostDTO, status?: string): Promise<Posts> {
               
        if (status) {
            const newPost = await Posts.create({...createPostDTO, userId, status})
            return newPost;
        } else {
            const newPost = await Posts.create({...createPostDTO, userId});            
            return newPost;
        }
        
    }


    async deletePostById(idToBeDeleted: number): Promise<string> {
        const PostToBeDeleted = await Posts.findOne({
            where: {
                id: idToBeDeleted
            }
        });
    
        if (!PostToBeDeleted) {
            return 'not-found';
        }
    
        await PostToBeDeleted.destroy();
        return 'deleted';
    }

    async updatePost(postId: number, updatePostDTO: UpdatePostDTO): Promise<Posts> {
        const postToUpdate = await Posts.findByPk(postId);
        await postToUpdate.update(updatePostDTO);
        return postToUpdate;
    }

    async getPostByUserId(userId: number): Promise<Posts[]> {
        const userPosts = Posts.findAll({
            where: {
                userId: userId
            }
        });

        return userPosts;
    }
}