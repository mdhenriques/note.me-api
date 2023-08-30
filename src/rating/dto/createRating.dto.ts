import { IsNotEmpty, Max, Min } from "class-validator";

export class CreateRatingDTO {

    @IsNotEmpty()
    @Min(1)
    @Max(5)
    value: number;

    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    itemId: number;
}