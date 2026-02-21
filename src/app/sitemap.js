export default async function sitemap() {
  const baseUrl = 'https://ontimecoders.netlify.app';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/privacy',
    '/terms',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic routes (example: blog posts)
  // const posts = await fetchPosts();
  // const blogRoutes = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly',
  //   priority: 0.6,
  // }));

  return [...routes];
}