import { Todo, User, users } from "@/app/utils/config";
import { create } from "zustand";

type UserState = {
  user?: User;
};

type UserActions = {
  login: (username: string, password: string) => boolean;
  addTodo: (todo: Todo) => void;
  removeTodo: (todoIndex: number) => void;
  updateTodo: (todoIndex: number, updatedTodo: Todo) => void;
};

export const useUser = create<UserState & UserActions>((set) => ({
  user: undefined,
  login(username, password) {
    const user = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) return false;

    set({ user: user });
    console.log(user);
    return true;
  },

  addTodo(todo) {
    if (!this.user) return;

    set((state) => ({
      user: { ...state.user!, todos: [...state.user!.todos, todo] },
    }));
  },

  removeTodo(todoIndex) {
    set((state) => ({
      user: {
        ...state.user!,
        todos: [...state.user!.todos.splice(todoIndex, 1)],
      },
    }));
  },
  updateTodo(todoIndex, update) {
    set((state) => ({
      user: {
        ...state.user!,
        todos: [(state.user!.todos[todoIndex] = update)],
      },
    }));
  },
}));
