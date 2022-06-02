import { MigrationInterface, QueryRunner } from 'typeorm';

export class deletePasswordFromUserDetail1653786905417
  implements MigrationInterface
{
  name = 'deletePasswordFromUserDetail1653786905417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_details" DROP COLUMN "password"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_details" ADD "password" character varying NOT NULL`,
    );
  }
}
