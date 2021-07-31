import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AdvanceResult } from 'src/common/AdvanceResult';
import { DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this._usersService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<AdvanceResult<GetUserDto>> {
    return await this._usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return await this._usersService.createUser(createUserDto);
  }

  @Put('withDetails/:idUser')
  async updateUserWithRelated(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return await this._usersService.updateUserWithRelated(
      idUser,
      updateUserDto,
    );
  }

  @Put('/:idUser')
  async updateUser(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<GetUserDto> {
    return await this._usersService.updateUser(idUser, updateUserDto);
  }

  @Patch('estado/:idUser')
  async updateUserStatus(
    @Param('idUser') idUser: string,
    @Body() activo: boolean,
  ): Promise<GetUserDto> {
    return await this._usersService.updateUserStatus(idUser, activo);
  }

  @Delete('/:id')
  async deleteUser(
    @Param('id') id: string,
  ): Promise<AdvanceResult<DeleteResult>> {
    return await this._usersService.deleteUser(id);
  }

  // @Get(':id')
  // getOneUser(@Param('id', ParseIntPipe) id: number) {
  //   console.log(
  //     '🚀 ~ file: users.controller.ts ~ line 12 ~ UsersController ~ getOneUser ~ id',
  //     typeof id,
  //   );

  //   return {
  //     message: 'getOneUser',
  //   };
  // }

  // @Post()
  // //   @UsePipes(ValidationPipe)
  // createUser(@Body() userDto: UserDto) {
  //   return userDto;
  // }

  // @Put()
  // UpdateUser(@Body() updateUserDto: UpdateUserDto) {
  //   console.log(
  //     '🚀 ~ file: users.controller.ts ~ line 41 ~ UsersController ~ UpdateUser ~ updateUserDto',
  //     updateUserDto,
  //   );
  // }

  @Delete()
  DeleteUser(@Param('id') id: string) {}
}
