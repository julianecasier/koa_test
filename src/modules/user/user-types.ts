import { User } from '@prisma/client';

/**
 * DTO pour la création d'un utilisateur
 */
export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

/**
 * DTO pour la mise à jour d'un utilisateur
 */
export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

/**
 * Utilisateur sans le mot de passe (pour les réponses API)
 */
export type UserResponse = Omit<User, 'password'>;

