import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { Session } from "./entities/Session";

export default {
    allowGlobalContext: true,
    migrations:{
        path: path.join(__dirname, "./migrations"),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User, Session], // database tables
    dbName: "lireddit",
    user: "postgres",
    password: "postgres",
    type: 'postgresql',
    debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];
//Convert object into an acceptable type of MikroOrm configuration