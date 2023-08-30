import { Module } from "@nestjs/common";
import { RatingController } from "./rating.controller";
import { RatingService } from "./rating.service";

@Module({
    controllers: [RatingController],
    imports: [],
    providers: [RatingService]
})
export class RatingModule {}