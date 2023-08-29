import { Body, Controller, Post } from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDTO } from "./dto/createItem.dto";

@Controller('items')
export class ItemController {

    constructor(private readonly itemService: ItemService) {}

    @Post()
    async createItem(@Body() createItemDTO: CreateItemDTO): Promise<any> {
        console.log(createItemDTO);
        const newItem = await this.itemService.createItem(createItemDTO);
        return { status: 'success', data: newItem }
    }
}