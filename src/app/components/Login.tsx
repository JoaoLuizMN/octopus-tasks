"use client";

import React, { useRef } from "react";
import { ICON_SIZE, User } from "../utils/config";
import { useUser } from "@/hooks/useUser";

import { GiOctopus } from "react-icons/gi";

export default function Login() {
  const { login } = useUser();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-blue-200">
      <p className="font-serif text-8xl">Octopus Tasks</p>
      <GiOctopus size={ICON_SIZE.large} />
      <div className="flex flex-col items-center gap-4 rounded-lg border bg-blue-300 p-2 text-2xl">
        <p>Log In</p>
        <div className="flex h-44 flex-col items-center justify-center gap-2 text-xl">
          <input
            type="text"
            placeholder="user"
            ref={usernameInputRef}
            className="rounded-lg border p-2 placeholder:text-center"
          />
          <input
            type="password"
            placeholder="password"
            ref={passwordInputRef}
            className="rounded-lg border p-2 placeholder:text-center"
          />
        </div>
        <button
          onClick={() =>
            login(
              usernameInputRef.current?.value!,
              passwordInputRef.current?.value!,
            )
          }
          className="onc duration-250 w-full rounded-lg border bg-blue-400 transition ease-in-out active:bg-blue-300"
        >
          Log in
        </button>
      </div>
      <p>
        "Eight arms to solve your problems... <span>- mesmo, eu</span>"
      </p>
    </div>
  );
}
