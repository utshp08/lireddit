import { Migration } from '@mikro-orm/migrations';

export class Migration20221011212457 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "session" alter column "sid" type text using ("sid"::text);');
    this.addSql('alter table "session" alter column "sid" drop default;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "session" alter column "sid" type int using ("sid"::int);');
    this.addSql('create sequence if not exists "session_sid_seq";');
    this.addSql('select setval(\'session_sid_seq\', (select max("sid") from "session"));');
    this.addSql('alter table "session" alter column "sid" set default nextval(\'session_sid_seq\');');
  }

}
