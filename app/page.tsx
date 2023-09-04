import { ArrowIcon } from "components/lolicon"
import { TotalViews } from "components/PageViews"
import { LoadingSpinner } from "components/spinner"
import { about, avatar, bio, name } from "lib/info"
//import { FullCounter } from "lib/metrics"
import { TwitterIcon } from "lucide-react"
import Image from "next/image"
import { Suspense } from "react"

export const revalidate= 3600

export default async function HomePage() {
  //const views = await getBlogViews()
  //const views = await apiRPC.post.totalViews.query()

  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">{name}</h1>
      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        {about()}
      </p>
      <div className="my-8 flex flex-col items-start md:flex-row md:items-center">
        <Image
          alt={name}
          className="rounded-full grayscale"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="ml-0 mt-8 space-y-2 text-neutral-500 dark:text-neutral-400 md:ml-6 md:mt-0">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/vmprmyth"
            className="flex items-center gap-2"
          >
            <TwitterIcon />
      <div className=" flex-none text-sm font-semibold tracking-tighter text-red-400 ">
          <TotalViews/>
      </div>
         
            {/*             <Suspense fallback={<LoadingSpinner />}>
              {`${views?.toLocaleString()} blog views all time`}
            </Suspense> */}
          </a>

          {/*           <Link href="/blog" className="flex items-center">
            <ViewsIcon />
            <Suspense fallback={<LoadingSpinner />}>
              {`${views?.toLocaleString()} blog views all time`}
            </Suspense>
          </Link> */}
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        {bio()}
      </p>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-500 dark:text-neutral-400 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/vmprmyth"
          >
            <ArrowIcon />
            <p className="h-7">follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://leerob.substack.com"
          >
            <ArrowIcon />
            <p className="h-7">get email updates</p>
          </a>
        </li>
      </ul>
    </section>
  )
}
