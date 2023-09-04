import { cx } from "lib/utils"
import { type LucideIcon, type LucideProps } from "lucide-react"
import type dynamicIconImports from "lucide-react/dynamicIconImports"
import { useSession } from "next-auth/react"

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}
export interface IconButtonProps {
  Icon: LucideIcon
  children?: React.ReactNode
  color: string
  hoverbg?: string
  isActive?: boolean
  onClick: () => void
}

const IconButton = (props: IconButtonProps) => {
  const { Icon, isActive, color, children, hoverbg } = props
  const { data: session } = useSession()

  return (
    <button
      className={cx(
        "flex items-center rounded bg-none p-1 focus:outline-slate-400",
        color,
        hoverbg,
        isActive && "bg-slate-200",
        session ? "cursor-pointer hover:bg-slate-400" : "cursor-default"
      )}
      {...props}
    >
      <Icon
        className={cx(
          "h-3 w-3",
          !isActive && color,
          isActive && "text-black",
          children?.toString() && "mr-1"
        )}
      />
      <span className="text-xs">{children}</span>
    </button>
  )
}

export default IconButton
/* import dynamic from 'next/dynamic'
import { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

const IconButton = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name])

  return <LucideIcon {...props} />
}

export default IconButton */
