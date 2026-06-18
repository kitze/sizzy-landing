import { SizzyFooter } from "@/app/(landing)/home/_components/SizzyFooter";
import { Gallery, type GalleryItem } from "@/components/Gallery";

const items: GalleryItem[] = [];

export function Page() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 pb-8 pt-24 sm:px-6 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-6xl">
          <a
            href="/"
            className="text-sm text-zinc-500 transition-colors hover:text-white"
          >
            &larr; Back to home
          </a>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Sizzy in pictures.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            Screenshots and videos from the app.
          </p>
          <Gallery items={items} className="mt-12" />
        </div>
      </section>
      <SizzyFooter />
    </main>
  );
}
