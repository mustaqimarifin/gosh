/* eslint-disable react/no-unescaped-entities */
import { ArrowIcon, GitHubIcon } from "components/lolicon"
import { TwitterIcon, YoutubeIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About",
  description: "VP of Developer Experience at Vercel.",
}

export default function AboutPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-bold">About Me</h1>
      <p className="my-5 text-neutral-800 dark:text-neutral-200">
        Hey, I'm Lee. Most folks know me as <b>leerob</b> online.
      </p>
      <div className="prose prose-neutral text-neutral-800 dark:prose-invert dark:text-neutral-200">
        <p>
          I'm currently the <b>VP of Developer Experience at Vercel</b>, where I
          lead our Developer Relations and Documentation teams. I focus on{" "}
          <b>educating and growing</b> the Vercel and Next.js communities.
        </p>
        <hr />
        <p>
          I'm passionate about many creative pursuits, including music,
          photography, videography, and of course, coding. This combination of
          interests is what ultimately led me to my current role in building
          developer communities.
        </p>
        <p>
          I <b>love</b> building for the web. From something as simple as a
          single HTML file – all the way to large Next.js applications. The web
          is incredible. Anyone can become a developer, writer, or creator – and
          no one has to ask for permission. You can just build.
        </p>
        <p className="mb-8">
          Outside of Vercel, I <b>angel invest</b> in developer tools companies
          and <b>advise early-stage startups</b>. I also do Developer Relations
          consulting work, helping companies take their DevRel function from 0
          to 1, or provide guidance on growing communities, content creation,
          and developer marketing.
        </p>
        <div className="flex flex-col gap-2 md:flex-row md:gap-2">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/vmprmyth"
            className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900"
          >
            <div className="flex items-center">
              <TwitterIcon />
              <div className="ml-3">Twitter</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/leerob"
            className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900"
          >
            <div className="flex items-center">
              <GitHubIcon />
              <div className="ml-3">GitHub</div>
            </div>
            <ArrowIcon />
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.youtube.com/@leerob"
            className="flex w-full items-center justify-between rounded-lg border border-neutral-200 p-4 text-neutral-800 no-underline transition-all hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900"
          >
            <div className="flex items-center">
              <YoutubeIcon />
              <div className="ml-3">YouTube</div>
            </div>
            <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  )
}
