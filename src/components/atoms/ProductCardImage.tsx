import Image from "next/image";

export function ProductCardImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt=""
      width={1080}
      height={1080}
      sizes="(max-width: 640px) 55vw, (max-width: 1024px) 28vw, 20vw"
      className="pointer-events-none absolute -right-[25%] top-1/2 -z-10 w-[100%] -translate-y-1/2 object-contain"
    />
  );
}
