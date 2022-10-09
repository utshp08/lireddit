import { Migration } from '@mikro-orm/migrations';

export class Migration20221009024149 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "title" text not null);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "post" cascade;');
  }

}
