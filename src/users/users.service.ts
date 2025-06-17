import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Args, Mutation } from '@nestjs/graphql';
import { CreateProfileInput } from './dto/create-profile.input';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    try {
      const newUser = new this.userModel({
        ...createUserInput,
        registrationDate: new Date(),
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          'El nombre de usuario ya está en uso, por favor elige otro.',
        );
      }
      throw error;
    }
  }

  async registerUser(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<User> {
    const { accessToken } = createProfileInput;

    // Verificar y decodificar el token
    let payload: any;
    try {
      payload = this.jwtService.verify(accessToken, { secret: process.env.JWT_SECRET });
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Token inválido');
    }

    const userId = payload.sub;

    // Verifica si ya tiene perfil
    const existing = await this.userModel.findOne({ userId });
    if (existing) {
      throw new BadRequestException('El perfil ya existe');
    }

    const newProfile = new this.userModel({
      userId
    });

    return newProfile.save();
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOneByUsernameOrEmail(identifier: string) {
    return this.userModel.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
  }

  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findUsersByIds(userIds: string[]): Promise<{ user: User }[]> {
    const users = await this.userModel.find({ _id: { $in: userIds } }).lean().exec();
    return users.map(user => ({ user }));
  }

  async findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserInput) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  async remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
