import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Query, Resolver, Ctx, Arg, Int, Mutation, InputType, Field, ObjectType } from "type-graphql";
import argon2 from 'argon2';

@InputType()
class UsernameAndPasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field(() => String)
    field: string
    @Field(() => String)
    message: string
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors: [FieldError]
    @Field(() => User, { nullable: true })
    user: User
}

// function TestDecorator() {
//     return function(target: any) {
//     }
// }

// @TestDecorator()
// class Test {

// }

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

    @Mutation(() => UserResponse)
    async Register(
        @Arg('options') options: UsernameAndPasswordInput,
        @Ctx() { em }: MyContext
    ) {
        if (options.username.length <= 3) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username is too short."
                    }
                ]
            }
        }
        if (options.password.length <= 3) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "password is too short."
                    }
                ]
            }
        }
        const hashPass = await argon2.hash(options.password);
        const user = await em.create("User", { username: options.username, password: hashPass });
        try {
            await em.persistAndFlush(user)
        } catch (error) {
            console.log(error)
            return {
                errors: [{
                    field: "username",
                    message: error.detail
                }]
            }
        }
        return {
            user
        }
    }

    @Mutation(() => UserResponse)
    async Login(
        @Arg('options') options: UsernameAndPasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const user = await em.findOne<User>("User", { username: options.username });
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "username not found."
                    }
                ]
            }
        }
        const match = await argon2.verify(user?.password, options.password)
        if (!match) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password."
                    }
                ]
            }
        }
        return {
            user
        }
    }
}