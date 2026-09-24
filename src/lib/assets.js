/**
 * Asset resolution helpers.
 *
 * Files under src/assets/* are picked up at build time via import.meta.glob,
 * so the app starts cleanly even before images are added. Each helper returns
 * a runtime URL string when the file exists and null otherwise — the calling
 * components fall back to designed placeholders (monogram / document tiles).
 */

export const profileAssets = import.meta.glob('../assets/profile/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const certificateAssets = import.meta.glob(
  '../assets/certificates/*.{png,jpg,jpeg,webp,avif,pdf}',
  { eager: true, query: '?url', import: 'default' }
);

export const resumeAssets = import.meta.glob('../assets/resume/*.{pdf}', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function certificateUrl(filename) {
  const key = Object.keys(certificateAssets).find((k) => k.endsWith(`/${filename}`));
  return key ? certificateAssets[key] : null;
}

export function profilePhotoUrl() {
  const key = Object.keys(profileAssets).find((k) => k.includes('rajapandu-profile'));
  return key ? profileAssets[key] : null;
}

export function resumeUrl() {
  const keys = Object.keys(resumeAssets);
  return keys.length ? resumeAssets[keys[0]] : null;
}