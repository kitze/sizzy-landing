export function Head() {
  const pageUrl = "https://sizzy.co/apps";
  const title = "More Apps by Kitze | Sizzy";
  const description =
    "Explore the full family of apps by Kitze for developers, makers, and creators.";
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
