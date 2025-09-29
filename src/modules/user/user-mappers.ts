import { User } from '@prisma/client';
import { UserResponse } from './user-types';

/**
 * Convertit un User en UserResponse (sans mot de passe)
 */
export function toUserResponse(user: User): UserResponse {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Convertit plusieurs Users en UserResponses
 */
export function toUserResponses(users: User[]): UserResponse[] {
  return users.map(toUserResponse);
}
