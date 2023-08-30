import { Injectable } from "@nestjs/common";
import { CreateItemDTO } from "./dto/createItem.dto";
import { Item } from "./item.entity";
import { UpdateItemDTO } from "./dto/updateItem.dto";
import { Rating } from "../rating/rating.entity";

@Injectable()
export class ItemService {

    async createItem(createItemDTO: CreateItemDTO): Promise<Item> {
        const newItem = await Item.create({...createItemDTO});
        return newItem;
    }

    async getItemRatings(itemId: number): Promise<Rating[]> {
        const item = await Item.findByPk(itemId);

        const ratings = await Rating.findAll({
            where: {
                itemId: item.id,
            },
        });

        return ratings;
    }

    async getAllItems(): Promise<Item[]> {
        return Item.findAll({
            attributes: ['name', 'description']
        });
    }

    async getItemByName(wantedName: string): Promise<Item> {
        return Item.findOne({
            where: {
                name: wantedName
            },
            attributes: ['name', 'description']
        });
    }

    async deleteItemById(idToBeDeleted: number): Promise<any> {
        const itemToBeDeleted = Item.findOne({
            where: {
                id: idToBeDeleted
            }
        });
        (await itemToBeDeleted).destroy();
    }

    async updateItem(itemId: number, updateItemDTO: UpdateItemDTO): Promise<Item> {
        const itemToUpdate = await Item.findByPk(itemId);

        //if (!itemToUpdate) {
            // Lidar com o item não encontrado
        //}

        await itemToUpdate.update(updateItemDTO);
        return itemToUpdate;
    }
}