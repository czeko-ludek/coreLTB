/**
 * Cloudflare Pages Middleware
 * Adds X-Robots-Tag: noindex on *.pages.dev to prevent indexing of preview deployments.
 * Production (coreltb.pl) is unaffected.
 */
export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  const host = new URL(context.request.url).hostname;

  if (host.endsWith('.pages.dev')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
};
