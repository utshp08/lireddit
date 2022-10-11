import { Migration } from '@mikro-orm/migrations';

export class Migration20221011205115 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "session" add column "sess" jsonb not null, add column "expire" timestamptz(0) not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "session" drop column "sess";');
    this.addSql('alter table "session" drop column "expire";');
  }

}
