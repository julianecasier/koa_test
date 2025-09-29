import { User } from '@prisma/client';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './user-types';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDto): Promise<User> {
    // Vérifier si l'email existe déjà
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // TODO: Hasher le mot de passe avec bcrypt
    // const hashedPassword = await bcrypt.hash(data.password, 10);
    // data.password = hashedPassword;

    return this.userRepository.create(data);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    // Vérifier que l'utilisateur existe
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Si l'email change, vérifier qu'il n'existe pas déjà
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new Error('Un utilisateur avec cet email existe déjà');
      }
    }

    // TODO: Si le mot de passe change, le hasher
    // if (data.password) {
    //   data.password = await bcrypt.hash(data.password, 10);
    // }

    return this.userRepository.update(id, data);
  }

  async delete(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    return this.userRepository.delete(id);
  }
}
