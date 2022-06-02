import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

@Exclude()
export class ReadRoleDto {
  @Expose({ name: 'identificador' })
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'This description es not valid' })
  readonly description: string;
}
