"use client";

import { redirect } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { ICON_SIZE } from "../utils/config";
import { GiOctopus } from "react-icons/gi";

export default function page() {
  const { user, addTodo, updateTodo, removeTodo, checkTodo } = useUser();

  if (!user) {
    redirect("/");
  }

  const [isEditing, setIsEditing] = useState(false);
  const [isInserting, setIsInserting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [seletectedTodoIndex, setSeletectedTodoIndex] = useState<number>();
  const todoContentInputRef = useRef<HTMLInputElement>(null);
  const todoEditInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-blue-200">
      <div
        className={`absolute left-0 flex h-[80%] w-[20%] justify-center rounded-lg bg-green-200 transition-all ${isInserting ? "" : "-translate-x-full"}`}
      >
        <div className="flex flex-col items-center justify-center gap-2 font-serif text-xl">
          <p>New Todo:</p>
          <input
            className="rounded-lg px-2"
            type="text"
            ref={todoContentInputRef}
          />
          <button
            className="w-full rounded-lg bg-blue-200"
            onClick={() => {
              addTodo({
                content: todoContentInputRef.current?.value!,
                status: false,
              });
              setIsInserting(false);
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex h-[90%] w-1/2 flex-col items-center justify-between gap-6 rounded-xl border bg-blue-300 p-4">
        <p className="font-serif text-6xl">Todos</p>
        {user.todos.length < 1 ? (
          <div className="flex w-full justify-center rounded-md py-2">
            <GiOctopus size={ICON_SIZE.large} />
          </div>
        ) : (
          <div className="flex w-full flex-1 flex-col gap-2">
            {user.todos.map((todo, todoIndex) => (
              <div
                className={`flex justify-center gap-2 rounded-md border py-2 shadow ${todo.status ? "line-through" : ""} ${seletectedTodoIndex === todoIndex ? "bg-blue-400" : ""}`}
                onClick={() => {
                  setSeletectedTodoIndex((seletectTodoIndex) =>
                    seletectTodoIndex === todoIndex ? undefined : todoIndex,
                  );
                }}
                key={`todo - ${todoIndex} - ${todo.content}`}
              >
                {todo.content} - {todo.status ? "yep" : "not"}
              </div>
            ))}
          </div>
        )}

        <div className="flex w-full items-center justify-center gap-6 font-serif">
          <button
            className="w-[20%] rounded-lg bg-green-200"
            onClick={() => setIsInserting((isInserting) => !isInserting)}
          >
            Add
          </button>
          <button
            className="onClick={() => setIsEditing((isEditing) !isEditing)} w-[20%] rounded-lg bg-yellow-200"
            onClick={() => setIsEditing((isEditing) => !isEditing)}
          >
            Edit
          </button>
          <button
            className="w-[20%] rounded-lg bg-red-200"
            onClick={() => {
              if (seletectedTodoIndex === undefined) return;
              if (!user.todos[seletectedTodoIndex].status) {
                setIsDeleting((isDeleting) => !isDeleting);
              } else {
                removeTodo(seletectedTodoIndex);
                setSeletectedTodoIndex(undefined);
              }
            }}
          >
            Delete
          </button>
          <button
            className="w-[20%] rounded-lg bg-orange-200"
            onClick={() => {
              if (seletectedTodoIndex === undefined) return;
              checkTodo(seletectedTodoIndex);
            }}
          >
            Check!
          </button>
        </div>
      </div>

      <div
        className={`absolute right-0 flex h-[80%] w-[20%] justify-center rounded-lg bg-yellow-200 transition-all ${isEditing ? "" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center justify-center gap-2 font-serif text-xl">
          <p>Update Todo:</p>
          <input
            className="rounded-lg px-2"
            type="text"
            ref={todoEditInputRef}
          />
          <button
            className="w-full rounded-lg bg-blue-200"
            onClick={() => {
              //if (!todoContentInputRef.current?.value) return;
              if (seletectedTodoIndex === undefined) return;

              updateTodo(seletectedTodoIndex, {
                content: todoEditInputRef.current?.value!,
                status: false,
              });

              setIsEditing(false);
            }}
          >
            Update
          </button>
        </div>
      </div>
      <div
        className={`absolute flex h-[20%] w-[40%] justify-center rounded-lg bg-red-200 transition-all ${isDeleting ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : "translate-y-[1000%]"}`}
      >
        <div className="flex flex-col items-center justify-center gap-2 font-serif text-xl">
          <p>Are you sure you want to delete:</p>

          {seletectedTodoIndex !== undefined && (
            <p>{user.todos[seletectedTodoIndex].content}?</p>
          )}
          <button
            className="w-full rounded-lg bg-blue-200"
            onClick={() => {
              if (seletectedTodoIndex === undefined) return;

              removeTodo(seletectedTodoIndex);

              setSeletectedTodoIndex(undefined);
              setIsDeleting(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
