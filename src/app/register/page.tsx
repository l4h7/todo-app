"use client"
import { register } from "@/src/actions/userController";
import { useActionState } from "react";
import Alert from "../../components/Alert";

export default function Page() {
  const initialState = {
    errors: {
      username: null,
      password: null
    },
    success: null
  }
  const [formState, formAction, pending] = useActionState(register, { initialState });


  return (
    <>
      <h1 className="text-3xl font-black text-center">Registrieren</h1>
      <form action={formAction} className="max-w-sm mx-auto py-6">
        <div className="mb-3">
          <input type="text" name="username" placeholder="Username" className="input input-bordered w-full max-w-sm" />
          {formState.errors?.username && (<Alert type="warning">{formState.errors?.username}</Alert>)}
        </div>
        <div className="mb-3">
          <input type="password" name="password" placeholder="Passwort" className="input input-bordered w-full max-w-sm" />
        </div>
        <div className="mb-3">
          <input type="password" name="password2" placeholder="Passwort wiederholen" className="input input-bordered w-full max-w-sm" />
          {formState.errors?.password && (<Alert type="warning">{formState.errors?.password}</Alert>)}
        </div>
        <div className="mb-3">
          <select name="role" className="select select-bordered w-full max-w-sm">
            <option disabled defaultValue={undefined}>Rolle</option>
            <option value={'user'}>User</option>
            <option value={'admin'}>Admin</option>
          </select>
          {formState.errors?.role && (<Alert type="warning">{formState.errors?.role}</Alert>)}

        </div>
        <div className="mt-6 text-center">
          <button disabled={pending} className="btn btn-primary">Registrieren</button>
        </div>
      </form>
    </>)
}