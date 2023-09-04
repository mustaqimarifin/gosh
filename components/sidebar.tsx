"use client"

import { LayoutGroup, motion } from "framer-motion"
import { cx } from "lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/post": {
    name: "post",
  },
  "/scribbles": {
    name: "scribbles",
  },
  "/hotline": {
    name: "guestbook",
  },
}

function Logo() {
  return (
    <Link aria-label="Lee Robinson" href="/">
      <motion.svg
        className="h-[25px] text-black dark:text-white md:h-[37px]"
        width="25"
        height="37"
        viewBox="0 0 232 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{
            opacity: 0,
            pathLength: 0,
          }}
          animate={{
            opacity: 1,
            pathLength: 1,
          }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          d="M39 316V0"
          stroke="currentColor"
          strokeWidth={78}
        />
        <motion.path
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          d="M232 314.998H129.852L232 232.887V314.998Z"
          fill="currentColor"
        />
      </motion.svg>
    </Link>
  )
}

export default function Navbar() {
  let pathname = usePathname() || "/"
  if (pathname.includes("/post/")) {
    pathname = "/post"
  }

  return (
    <aside className="-mx-4 font-serif md:mx-0 md:w-[150px] md:flex-shrink-0 md:px-0">
      <div className="lg:sticky lg:top-20">
        <div className="mb-2 ml-2 flex flex-col items-start space-y-10 px-4 md:mb-8 md:ml-[12px] md:flex-row md:px-0 ">
          <Logo />
        </div>
        <LayoutGroup>
          <nav
            className="fade relative flex scroll-pr-6 flex-row items-start px-4 pb-0 md:relative md:flex-col md:overflow-auto md:px-0"
            id="nav"
          >
            <div className="mb-2 mt-2 flex flex-row space-x-0 pr-10 md:mt-0 md:flex-col">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname
                return (
                  <Link
                    key={path}
                    href={path}
                    className={cx(
                      "flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                      {
                        "text-neutral-500": !isActive,
                        "font-bold": isActive,
                      }
                    )}
                  >
                    <span className="relative px-[10px] py-[5px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 z-[-1] rounded-md bg-neutral-100 dark:bg-neutral-800"
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                )
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  )
}
