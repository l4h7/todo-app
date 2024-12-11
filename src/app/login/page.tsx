"use client"
import { login } from "@/src/actions/userController";
import { useActionState } from "react";
import Alert from "../../components/Alert";

export default function Page() {
  const [formState, formAction] = useActionState(login, {});

  
  return (
    <>
      <p className="text-center"><strong>Anmelden</strong></p>
      <form action={formAction} className="max-w-sm mx-auto py-6">
        <div className="mb-3">
          <input type="text" name="username" placeholder="Username" className="input input-bordered w-full max-w-sm" />
           {formState.errors?.username && (<Alert type="warning">{formState.errors?.username}</Alert>)} 
        </div>
        <div className="mb-3">
          <input type="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-sm" />
          {formState.errors?.password && (<Alert type="warning">{formState.errors?.password}</Alert>)} 
        </div>
        <div className="mb-3">
          <button className="btn btn-primary">Anmelden</button>
        </div>
      </form>
    </>)
}