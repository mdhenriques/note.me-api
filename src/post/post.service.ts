import { Injectable } from "@nestjs/common";
import { CreatePostDTO } from "./dto/createPost.dto";
import { Posts } from "./post.entity";
import { UpdatePostDTO } from "./dto/updatePost.dto";
import { Rating } from "../rating/rating.entity";

@Injectable()
export class PostService {

    async createPost(createPostDTO: CreatePostDTO): Promise<Posts> {
        const newPost = await Posts.create({...createPostDTO});
        return newPost;
    }

    async getAverageRatings(postId: number): Promise<number> {
        const ratings = await this.getPostRatings(postId);
        const totalRatings = (await ratings).length;
        const sumOfRatings = ratings.reduce((sum, rating) => sum + rating.value, 0);
        
        const average = sumOfRatings / totalRatings;
        return average;
    }

    async getPostRatings(postId: number): Promise<Rating[]> {
        const post = await Posts.findByPk(postId);

        const ratings = await Rating.findAll({
            where: {
                postId: post.id,
            },
        });

        return ratings;
    }

    async getAllPosts(): Promise<Posts[]> {
        return Posts.findAll({
            attributes: ['id', 'title', 'content']
        });
    }

    async getPostByName(wantedTitle: string): Promise<Posts> {
        return Posts.findOne({
            where: {
                title: wantedTitle
            },
            attributes: ['title', 'content']
        });
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

        //if (!postToUpdate) {
            // Lidar com o post não encontrado
        //}

        await postToUpdate.update(updatePostDTO);
        return postToUpdate;
    }
}