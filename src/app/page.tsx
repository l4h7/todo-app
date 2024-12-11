"use client"
import { register } from "@/src/actions/userController";
import { createPostponedAbortSignal } from "next/dist/server/app-render/dynamic-rendering";
import { useActionState } from "react";

export default function Page() {
  const [formState, formAction] = useActionState(register, {});


  return (
    <>
      <h1 className="text-2xl">Startseite</h1>
    </>)
}