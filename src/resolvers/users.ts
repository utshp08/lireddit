import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Query, Resolver, Ctx, Arg, Int, Mutation, InputType, Field } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class UsernameAndPasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users(
        @Ctx() { em }: MyContext
    ) {
        const users = em.find("User", {});
        return users;
    }

    @Query(() => [User])
    user(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ) {
        const user = em.findOne("User", { id });
        return user;
    }

    @Mutation(() => User)
    async Register(
        @Arg('options') options: UsernameAndPasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hashPass = await argon2.hash(options.password);
        const user = await em.create("User", { username: options.username, password: hashPass });
        await em.persistAndFlush(user)
        return user
    }

    @Query(() => User, { nullable: true })
    async Login(
        @Arg('options') options: UsernameAndPasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const user = await em.findOne<User>("User", { username: options.username });
        if (!user) {
            return null
        }
        const match = await argon2.verify(user?.password, options.password)
        if (match) {
            return user
        } else {
            return null
        }
    }
}