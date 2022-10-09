import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

    @PrimaryKey({autoincrement: true})
    id!: number;

    @Property({type: "date", nullable: true})
    createdAt = new Date();

    @Property({type: "date", nullable: true ,onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({type: "text"})
    title!: String;

}