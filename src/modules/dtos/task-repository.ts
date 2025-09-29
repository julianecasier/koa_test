import { CreateTask, Task, UpdateTask } from "./task";

export interface ITaskRepository {
  create(task: CreateTask): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findByUserId(userId: number): Promise<Task[]>;
  findAll(): Promise<Task[]>;
  update(id: number, task: UpdateTask): Promise<Task>;
  delete(id: number): Promise<boolean>;
}
