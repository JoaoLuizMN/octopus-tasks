export type Todo = {
  content: string;
  status: boolean;
};

export type User = {
  username: string;
  password: string;
  todos: Todo[];
};

export const users: User[] = [];

export const ICON_SIZE = {
  xxsmall: 25,
  xsmall: 50,
  small: 100,
  medium: 150,
  large: 200,
};
