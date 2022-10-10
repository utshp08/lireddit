import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { Post } from "../entities/Post";
import { MyContext } from 'src/types';

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() { em }: MyContext
    ) {
        return em.find(Post, {}, { orderBy: { updatedAt: 'ASC' } });
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ) {
        return em.findOne(Post, { id });
    }

    @Mutation(() => Post)
    async CreatePost(
        @Arg('title', () => String) title: String,
        @Ctx() { em }: MyContext
    ) {
        const post = em.create("Post", { title });
        await em.persistAndFlush(post)
        return post;
    }

    @Mutation(() => Post, { nullable: true })
    async UpdatePost(
        @Arg('id', () => Int) id: number,
        @Arg('title', () => String, { nullable: true }) title: String,
        @Ctx() { em }: MyContext
    ) {
        const post = await em.findOne<Post>("Post", { id });
        if (!post) {
            return null;
        }
        if (typeof title !== 'undefined') {
            post.title = title;
            await em.persistAndFlush(post)
        }
        return post;
    }
    
    @Mutation(() => Boolean, {nullable: true})
    async DeletePost(
        @Arg('id', () => Int) id: number,
        @Ctx() { em }: MyContext
    ) {
        const post = await em.findOne("Post", { id });
        if(!post) {
            return null;
        }
        await em.removeAndFlush(post)
        return true;
    }
}