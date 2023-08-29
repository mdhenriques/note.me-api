import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDTO } from "./dto/createItem.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('items')
export class ItemController {

    constructor(private readonly itemService: ItemService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createItem(@Body() createItemDTO: CreateItemDTO): Promise<any> {
        
        const newItem = await this.itemService.createItem(createItemDTO);
        return { status: 'success', data: newItem }
    }
}