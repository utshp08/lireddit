import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";

const main = async () => {
    const orm  = await MikroORM.init(mikroConfig);
    await orm.getMigrator().up();

    // const post = orm.em.create(Post, { title: "Sample post 3"}) // create a Post instance
    // await orm.em.persistAndFlush(post); // insert the instance to database table

    // const post = await orm.em.find(Post, {id: 4});
    // console.log(post)

}

main().catch(err => {
    console.error(err)
});