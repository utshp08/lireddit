import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // convert the class to an object type to remove graphql error
@Entity()
export class User {

    @Field() // we can also convert the field to graphql type -> @Field(() => Type)
    @PrimaryKey({ autoincrement: true })
    id!: number;

    @Field(() => Date)
    @Property({ type: "date", nullable: true })
    createdAt = new Date();

    @Field(() => Date)
    @Property({ type: "date", nullable: true, onUpdate: () => new Date() })
    updatedAt = new Date();

    @Field()
    @Property({ type: "text", unique: true })
    username!: String;
    
    @Field()
    @Property({ type: "text"})
    password!: String;
}