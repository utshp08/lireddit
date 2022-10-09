import { Resolver, Query, Ctx, Mutation } from 'type-graphql';
import { Post } from "../entities/Post";
import { MyContext } from 'src/types';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() ctx: MyContext
    ) {
        return ctx.em.find(Post, {});
    }

}