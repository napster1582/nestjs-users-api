import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { AdvanceResult } from 'src/common/AdvanceResult';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users-repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly _usersRepository: UsersRepository,
  ) {}

  async getAllUsers(): Promise<AdvanceResult<GetUserDto[]>> {
    const [users, total] = await this._usersRepository.findAndCount();
    return {
      data: users.map((entity) => plainToClass(GetUserDto, entity)),
      meta: { count: total },
    };
  }

  async getUserById(idUser: string): Promise<AdvanceResult<GetUserDto>> {
    const user = await this._usersRepository.findOne({ id: idUser });
    return {
      data: plainToClass(GetUserDto, user),
    };
  }

  async createUser(createUserDto: CreateUserDto): Promise<GetUserDto> {
    const userSave = await this._usersRepository.create(createUserDto);
    await this._usersRepository.save(userSave);
    await userSave.reload();
    return plainToClass(GetUserDto, userSave);
  }

  async updateUserWithRelated(
    idUser: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const user = await this._usersRepository.findOne(idUser, {
      where: { activo: true },
      loadEagerRelations: false,
    });

    if (!user) {
      throw new NotFoundException(`User whith ID ${idUser} no found`);
    }
    await this._usersRepository.merge(user, updateUserDto).save();
    await user.reload();
    return plainToClass(GetUserDto, user);
  }

  async updateUser(
    idUser: string,
    updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    const user = await this._usersRepository.findOne(idUser, {
      where: { activo: true },
      loadEagerRelations: true,
    });

    if (!user) {
      throw new NotFoundException(`User whith ID ${idUser} no found`);
    }
    await this._usersRepository.save(updateUserDto);
    await user.reload();
    return plainToClass(GetUserDto, user);
  }

  async updateUserStatus(idUser: string, activo: boolean): Promise<GetUserDto> {
    const user = await this._usersRepository.findOne(idUser, {
      where: { activo: true },
    });

    if (!user) {
      throw new NotFoundException(`User whith ID ${idUser} no found`);
    }

    await this._usersRepository.update(idUser, { activo: activo });
    await user.reload();
    return plainToClass(GetUserDto, user);
  }

  async deleteUser(idUser: string): Promise<AdvanceResult<DeleteResult>> {
    const user = await this._usersRepository.findOne({ id: idUser });

    if (!user) {
      throw new NotFoundException(`User whith ID ${idUser} no found`);
    }

    const response = this._usersRepository.delete(user.id);

    (await response).raw.message = 'Usuario eliminado correctamente';
    return { data: (await response).raw };
  }
}
