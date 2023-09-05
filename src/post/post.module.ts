import { Module } from "@nestjs/common";
import { ItemService } from "./post.service";
import { ItemController } from "./post.controller";

@Module({
    controllers: [ItemController],
    imports: [],
    providers: [ItemService]
})
export class ItemModule {}