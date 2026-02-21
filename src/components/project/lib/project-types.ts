export interface Task {
  _count: {
    subtasks: number;
  };
  assignees: {
    user: {
      id: string;
      name: string;
      image: string | null;
    };
    id: string;
    userId: string;
    taskId: string;
  }[];
  boardId: string;
  createdAt: string;
  deadline: string | null;
  description: string | null;
  id: string;
  parentId: string | null;
  position: number;
  title: string;
  updatedAt: string;
}

export interface Board {
  id: string;
  name: string;
  position: number;
  projectId: string;
  tasks: Task[];
}
