"use client"

import { cx } from "lib/utils"
import Image from "next/image"
import { useState } from "react"

export default function CoverImage(props: any) {
  const [isLoading, setLoading] = useState(true)

  return (
    <div className="mb-6  max-w-3xl content-center justify-center overflow-hidden md:rounded-lg   ">
      <Image
        alt={""}
        className={cx(
          " mx-auto flex w-full items-center justify-center object-cover  object-top duration-700 ease-in-out group-hover:opacity-75 lg:max-w-7xl",
          isLoading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoadingComplete={() => setLoading(false)}
        placeholder="blur"
        {...props}
      />
      {/*       <figcaption className="text-center ">
        {caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {caption}
          </span>
        )}
      </figcaption> */}
    </div>
  )
}
