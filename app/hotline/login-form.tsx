import { type Session } from "next-auth"

import SignIN from "./Auth/Signin"
import SignOut from "./Auth/SignOut"
import Form from "./form"

export default function LoginForm({ session }: { session: Session | null }) {
  // for the `session` to be available on first SSR render, it must be
  // fetched in a Server Component and passed down as a prop
  return session ? (
    <>
      <Form />
      <SignOut />
    </>
  ) : (
    <>
      <SignIN />
    </>
  )
}
