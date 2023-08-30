import { BelongsTo, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Item } from "src/item/item.entity";
import { User } from "src/user/user.entity";

export class Rating extends Model {

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    })
    value: number;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Item)
    @Column
    itemId: number;

    @BelongsTo(() => Item)
    item: Item;
}