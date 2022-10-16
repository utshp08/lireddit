"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const posts_1 = require("./resolvers/posts");
const users_1 = require("./resolvers/users");
const constants_1 = require("./constants");
const session = require('express-session');
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const orm = yield core_1.MikroORM.init(mikro_orm_config_1.default);
    yield orm.getMigrator().up();
    // const post = orm.em.create(Post, { title: "Sample post 3"}) // create a Post instance
    // await orm.em.persistAndFlush(post); // insert the instance to database table
    // const post = await orm.em.find(Post, {id: 4});
    // console.log(post)
    const app = (0, express_1.default)();
    app.use(session({
        store: new (require('connect-pg-simple')(session))({
            conString: "pg://postgres:postgres@localhost:5432/lireddit",
        }),
        secret: process.env.FOO_COOKIE_SECRET || "devsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: constants_1.__prod__,
        }, // 30 day
        // Insert express-session options here
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [hello_1.HelloResolver, posts_1.PostResolver, users_1.UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ em: orm.em, req, res })
    });
    yield apolloServer.start();
    yield apolloServer.applyMiddleware({ app });
    app.listen("4000", () => {
        console.log("Server is now listening to port 4000");
    });
});
main().catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map