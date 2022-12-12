import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addUsers1670746165733 implements MigrationInterface {
  name = 'addUsers1670746165733';

  private usersTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      { name: 'email', type: 'varchar', isNullable: false, isUnique: true },
      { name: 'password', type: 'varchar', isNullable: false },
      { name: 'name', type: 'varchar', isNullable: false },
      { name: 'created_at', type: 'timestamptz', default: 'now()' },
      { name: 'updated_at', type: 'timestamptz', isNullable: true },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.createTable(this.usersTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable(this.usersTable);
  }
}
