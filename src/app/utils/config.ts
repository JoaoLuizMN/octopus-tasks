export type Todo = {
  content: string;
  status: boolean;
};

export type User = {
  username: string;
  password: string;
  todos: Todo[];
};

export const users: User[] = [
  {
    username: "joaoluiz",
    password: "senha1",
    todos: [],
  },
  {
    username: "luiz",
    password: "senha2",
    todos: [],
  },
  {
    username: "jl",
    password: "senha3",
    todos: [],
  },
];

export const ICON_SIZE = {
  small: 100,
  medium: 150,
  large: 200,
};
