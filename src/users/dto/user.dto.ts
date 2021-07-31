import { Exclude, Expose, Type } from 'class-transformer';
import { IsBoolean, IsDate, IsObject, IsString } from 'class-validator';
import { UserDetailEntity } from '../entities/user-detail.entity';

@Exclude()
export class UserDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  userName: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  password: string;

  @Expose()
  @IsBoolean()
  activo: boolean;

  @Expose()
  @IsDate()
  createAt: Date;

  @Expose()
  @IsDate()
  updateAt: Date;

  @Expose()
  @IsObject()
  @Type(() => UserDetailEntity)
  userDetail: UserDetailEntity;
}
