import images from "./scribble.json";
import { Metadata } from "next/types";
import Image from "next/legacy/image";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Scribbles",
  description: "Gallery of wolves",
};

export default async function ScribblesPage() {
  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">Scribbles</h1>
      <div className="container w-full max-w-3xl">
        <div className="mx-auto mb-8 mt-4 grid  md:grid-cols-2 ">
          {images.map((scribble) => (
            <div className="aspect-square relative" key={scribble.src}>
              <Image alt="drawing" placeholder="blur" {...scribble} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
