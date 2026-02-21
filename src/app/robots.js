export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/private/'],
      },
    ],
    sitemap: 'https://ontimecoders.netlify.app/sitemap.xml',
    host: 'https://ontimecoders.netlify.app',
  };
}