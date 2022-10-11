import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core"
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
export interface MyContext {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request & { session: Session & { userId: number } };
    res: Response;
}