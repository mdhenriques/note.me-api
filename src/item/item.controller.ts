import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ItemService } from "./item.service";
import { CreateItemDTO } from "./dto/createItem.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Item } from "./item.entity";
import { UpdateItemDTO } from "./dto/updateItem.dto";

@Controller('items')
export class ItemController {

    constructor(private readonly itemService: ItemService) {}

    //@UseGuards(AuthGuard)
    @Post()
    async createItem(@Body() createItemDTO: CreateItemDTO): Promise<any> {
        
        const newItem = await this.itemService.createItem(createItemDTO);
        return { status: 'success', data: newItem }
    }

    @Get(':itemId/average-rating')
    async getAverageItemRatings(@Param('itemId') itemId: number): Promise<any> {
        return this.itemService.getAverageRatings(itemId);
    }

    @Get(':itemId/ratings')
    async getItemRatings(@Param('itemId') itemId: number) {
        return this.itemService.getItemRatings(itemId);
    }

    //@UseGuards(AuthGuard)
    @Delete(':id')
    async deleteItem(@Param('id') id: number): Promise<any> {
        await this.itemService.deleteItemById(id);
        return 'Item deleted successfully';
    }

    //@UseGuards(AuthGuard)
    @Put(':id')
    async updateItem(@Param('id') itemId: number, @Body() updateItemDTO: UpdateItemDTO): Promise<any> {
        const updatedItem = await this.itemService.updateItem(itemId, updateItemDTO);
        return { status: 'success', data: updatedItem };
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