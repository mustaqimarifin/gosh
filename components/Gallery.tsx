import Image from "next/image";
export function Gallery(props) {
  return (
    <div className="mx-auto">
      <div className="mx-auto px-2 my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div className="flex justify-center text-6xl border-1 border-gray-300 rounded-sm p-2 bg-gray-500">
            <Image
              alt={props.title}
              className="rounded-lg"
              {...props}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
