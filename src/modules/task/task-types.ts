export interface CreateTaskDto {
  dueDate?: string;
  title: string;
  content?: string;
}

export interface UpdateTaskDto {
  dueDate?: string;
  title?: string;
  content?: string;
  authorId?: string;
  completed?: boolean;
}
