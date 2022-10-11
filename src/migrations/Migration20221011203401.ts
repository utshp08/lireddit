import { Migration } from '@mikro-orm/migrations';

export class Migration20221011203401 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "session" ("sid" serial primary key);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "session" cascade;');
  }

}
