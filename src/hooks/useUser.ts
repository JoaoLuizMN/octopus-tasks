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
  checkTodo: (todoIndex: number) => void;
  register: (username: string, password: string) => void
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
    set((state) => ({
      user: { ...state.user!, todos: [...state.user!.todos, todo] },
    }));
  },

  removeTodo(todoIndex) {
    set((state) => ({
      user: {
        ...state.user!,
        todos: state.user!.todos.filter((_, index) => index !== todoIndex),
      },
    }));
  },
  updateTodo(todoIndex, update) {
    set((state) => ({
      user: {
        ...state.user!,
        todos: [
          ...state.user!.todos.map((todo, index) =>
            index === todoIndex ? update : todo,
          ),
        ],
      },
    }));
  },
  checkTodo(todoIndex) {
    set((state) => ({
      user: {
        ...state.user!,
        todos: state.user!.todos.map((todo, index) =>
          index === todoIndex ? { ...todo, status: !todo.status } : todo,
        ),
      },
    }));
  },
  register(username, password) {
    users.push(
              {username: username ,
                password: password ,
                todos: []
              }
            )
  },
}));
