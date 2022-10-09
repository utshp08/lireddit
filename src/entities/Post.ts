import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // convert the class to graphql type
@Entity()
export class Post {

    @Field() // convert the field to graphql type
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Field(() => String)
    @Property({ type: "date", nullable: true })
    createdAt = new Date();

    @Field(() => String)
    @Property({ type: "date", nullable: true, onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({ type: "text" })
    title!: String;

}