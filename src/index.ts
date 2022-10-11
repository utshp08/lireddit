import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { UserResolver } from "./resolvers/users";
import { __prod__ } from "./constants";

const session = require('express-session');

const main = async () => {
    const orm = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, { title: "Sample post 3"}) // create a Post instance
    // await orm.em.persistAndFlush(post); // insert the instance to database table

    // const post = await orm.em.find(Post, {id: 4});
    // console.log(post)
    const app = express();

    app.use(session({
        store: new (require('connect-pg-simple')(session))({
            conString: "pg://postgres:postgres@localhost:5432/lireddit",
        }),
        secret: process.env.FOO_COOKIE_SECRET || "devsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
        }, // 30 day
        // Insert express-session options here
    }));

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver], //register the entity resolvers
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
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