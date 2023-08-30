import { Injectable } from "@nestjs/common";
import { CreateRatingDTO } from "./dto/createRating.dto";
import { Rating } from "./rating.entity";

@Injectable()
export class RatingService {

    async createRating(createRating: CreateRatingDTO): Promise<Rating> {
        const newRating = await Rating.create({...createRating});
        return newRating;
    }
}