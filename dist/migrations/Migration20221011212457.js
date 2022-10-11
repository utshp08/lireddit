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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20221011212457 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20221011212457 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "session" alter column "sid" type text using ("sid"::text);');
            this.addSql('alter table "session" alter column "sid" drop default;');
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql('alter table "session" alter column "sid" type int using ("sid"::int);');
            this.addSql('create sequence if not exists "session_sid_seq";');
            this.addSql('select setval(\'session_sid_seq\', (select max("sid") from "session"));');
            this.addSql('alter table "session" alter column "sid" set default nextval(\'session_sid_seq\');');
        });
    }
}
exports.Migration20221011212457 = Migration20221011212457;
//# sourceMappingURL=Migration20221011212457.js.map