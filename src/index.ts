import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, { title: "Sample post 3"}) // create a Post instance
    // await orm.em.persistAndFlush(post); // insert the instance to database table

    // const post = await orm.em.find(Post, {id: 4});
    // console.log(post)
    const app = express();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver],
            validate: false,
        }),
        context: () => ({ em: orm.em })
    })

    await apolloServer.start()
    await apolloServer.applyMiddleware({ app });

    app.listen("4000", () => {
        console.log("Server is now listening to port 4000")
    });
}

main().catch(err => {
    console.error(err)
});