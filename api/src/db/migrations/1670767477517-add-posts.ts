import {
  Table,
  QueryRunner,
  TableForeignKey,
  MigrationInterface,
} from 'typeorm';

export class addPosts1670767477517 implements MigrationInterface {
  name = 'addPosts1670767477517';

  private usersTable = new Table({
    name: 'posts',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      { name: 'title', type: 'varchar', isNullable: false },
      { name: 'slug', type: 'varchar', isNullable: false },
      { name: 'content', type: 'varchar', isNullable: false },
      { name: 'user_id', type: 'int', isNullable: false },
      { name: 'published', type: 'boolean', default: false },
      { name: 'created_at', type: 'timestamptz', default: 'now()' },
      { name: 'updated_at', type: 'timestamptz', isNullable: true },
    ],
  });

  private foreignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
    referencedTableName: 'users',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.usersTable);
    await queryRunner.createForeignKey('posts', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.usersTable);
  }
}
