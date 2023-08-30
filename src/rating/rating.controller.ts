import { Body, Controller, Post } from "@nestjs/common";
import { ItemService } from "src/item/item.service";
import { RatingService } from "./rating.service";
import { CreateRatingDTO } from "./dto/createRating.dto";

@Controller('ratings')
export class RatingController {
    
    constructor(private readonly ratingService: RatingService) {}

    @Post()
    async createRating(@Body() createRatingDTO: CreateRatingDTO): Promise<any> {
        const newRating = await this.ratingService.createRating(createRatingDTO);
        return { status: 'success', data: newRating };
    }
}