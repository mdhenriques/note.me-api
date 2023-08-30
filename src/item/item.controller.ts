import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDTO } from "./dto/createItem.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Item } from "./item.entity";

@Controller('items')
export class ItemController {

    constructor(private readonly itemService: ItemService) {}

    @UseGuards(AuthGuard)
    @Post()
    async createItem(@Body() createItemDTO: CreateItemDTO): Promise<any> {
        
        const newItem = await this.itemService.createItem(createItemDTO);
        return { status: 'success', data: newItem }
    }

    @Get('all')
    async getAll(): Promise<Item[]> {
        return await this.itemService.getAllItems();        
    }

    @Get(':name')
    async getItemByName(@Param('name') name: string): Promise<Item> {
        return await this.itemService.getItemByName(name);
    }
}