export const BlogHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img
              src="/sizzy-icon.png"
              alt="Sizzy"
              className="h-8 w-8 rounded-lg"
            />
            <span className="font-semibold text-white">Sizzy</span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="/blog"
              className="text-sm text-zinc-400 hover:text-white transition-colors hidden sm:block"
            >
              Blog
            </a>
            <a
              href="https://portal.sizzy.co"
              className="h-9 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-medium text-sm flex items-center transition-colors"
            >
              Get Sizzy
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
