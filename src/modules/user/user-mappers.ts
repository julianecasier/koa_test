import { User } from '@prisma/client';
import { UserResponse } from './user-types';

export function toUserResponse(user: User): UserResponse {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
export function toUserResponses(users: User[]): UserResponse[] {
  return users.map(toUserResponse);
}
