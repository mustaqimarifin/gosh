import { redirect } from 'next/navigation'
import { Button } from './buttonVariants'
import { signIn, signOut } from 'next-auth/react'

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        const url = await signIn(provider, { redirect: false }) as unknown as string
        // TODO: fix in next-auth
        redirect(url)
      }}>
      <Button {...props}>Sign In</Button>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
      className="w-full">
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  )
}
