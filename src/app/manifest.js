export default function manifest() {
  return {
    name: 'OntimeCoders',
    short_name: 'OntimeCoders',
    description: 'Premium software development services',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#06b6d4',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}