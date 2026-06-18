export function Head() {
  const pageUrl = "https://sizzy.co/gallery";
  const title = "Gallery | Sizzy";
  const description =
    "Screenshots and videos from Sizzy.";
  return (
    <>
      <title>{title}</title>
      <link rel="canonical" href={pageUrl} />
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
}
