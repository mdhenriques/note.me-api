import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { UpdatePostDTO } from "./dto/updatePost.dto";

@Injectable()
export class PostService {

    async createPost(createPostDTO: CreatePostDTO): Promise<Posts> {
        const newPost = await Posts.create({...createPostDTO});
        return newPost;
    }

    async deletePostById(idToBeDeleted: number): Promise<any> {
        const PostToBeDeleted = Posts.findOne({
            where: {
                id: idToBeDeleted
            }
        });
        (await PostToBeDeleted).destroy();
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