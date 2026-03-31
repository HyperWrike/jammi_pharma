/**
 * Build createFederationPost args that match deployed Convex validators
 * (some deployments only accept poster_name, poster_designation, content, image_url, tags).
 * Title and category are folded into content and tags so older backends still accept the payload.
 */
export function buildLegacyCreateFederationPostArgs(body: Record<string, any>) {
  const poster_name = String(body.poster_name ?? body.author ?? 'Anonymous').trim();
  const poster_designation =
    body.poster_designation != null || body.specialty != null
      ? String(body.poster_designation ?? body.specialty).trim()
      : undefined;
  const baseContent = String(body.content ?? body.body ?? '').trim();
  const title = body.title != null ? String(body.title).trim() : '';
  const category = body.category != null ? String(body.category).trim() : '';

  const content = title ? `${title}\n\n${baseContent}` : baseContent;

  const tags: string[] = [];
  if (category) tags.push(category);
  if (Array.isArray(body.tags)) {
    for (const t of body.tags) {
      if (t != null && String(t).trim()) tags.push(String(t).trim());
    }
  }

  return {
    poster_name,
    poster_designation,
    content,
    image_url: body.image_url ? String(body.image_url) : undefined,
    tags: tags.length ? tags : undefined,
  };
}
