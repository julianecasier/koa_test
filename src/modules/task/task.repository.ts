import { Task } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './task-types';
import prisma from '../../../prisma/client.js';

export class TaskRepository {
  async create(data: CreateTaskDto): Promise<Task> {
    return prisma.task.create({ data });
  }

  async findById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      select: {
        id: false,
        dueDate: true,
        title: true,
        content: true,
        completed: true,
        createdAt: true,
        updatedAt: false,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: false,
        dueDate: true,
        title: true,
        content: true,
        completed: true,
        createdAt: true,
        updatedAt: false,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateTaskDto): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Task> {
    return prisma.task.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await prisma.task.count({ where: { id } });
    return count > 0;
  }
}
