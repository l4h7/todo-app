"use client"
import { login } from "@/src/actions/userController";
import { useActionState } from "react";
import Alert from "../../components/Alert";

export default function Page() {
  const [formState, formAction, pending] = useActionState(login, {});

  return (
    <>
      <h1 className="text-3xl font-black text-center mt-8">Anmelden</h1>

      <form action={formAction} className="max-w-sm mx-auto p-10">
        <div className="mb-3">
          <input type="text" name="username" placeholder="Username" className="input input-bordered w-full max-w-sm" />
          {formState.errors?.username && (<Alert type="warning">{formState.errors?.username}</Alert>)}
        </div>
        <div className="mb-3">
          <input type="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-sm" />
          {formState.errors?.password && (<Alert type="warning">{formState.errors?.password}</Alert>)}
        </div>
        <div className="mt-6 text-center">
          <button disabled={pending} className="btn btn-primary">Anmelden</button>
        </div>
      </form>
    </>)
}