import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // convert the class to an object type to remove graphql error
@Entity()
export class Session {
    @Field(() => String) // we can also convert the field to graphql type -> @Field(() => Type)
    @PrimaryKey({ type: "text" })
    sid!: String;

    @Field(() => Object)
    @Property({ type: "json" })
    sess!: {};

    @Field(() => Date)
    @Property({ type: "date" })
    expire!: Date
}