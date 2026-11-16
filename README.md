# Next.js Template

Project Next.js 16 (App Router, React 19, TypeScript, Tailwind CSS v4) dengan routing locale `id` (default) dan `en`.

## Menjalankan

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Template yang bisa dipakai ulang

- `src/app/[locales]/template-page/page.tsx` — halaman contoh (hero + section). Salin foldernya untuk membuat halaman baru.
- `src/components/layouts/PageTemplate.tsx` — shell halaman (Navbar + main + Footer), props `children`, `locale`, `bodyClassName`. Disalin persis dari project website `get-sgb`.
- `src/components/organisms/` — `Navbar`, `FooterSection`, `LocaleSwitcherDialog`, `PageHeroBanner`.
- Teks navbar/footer ada di `src/locales/{id,en}/content/`. Menu navbar menunjuk ke halaman project asal yang belum ada di sini (akan 404 sampai halamannya dibuat).
- Env opsional: `NEXT_PUBLIC_ENABLE_CLIENT_AREA` (default `false`, tombol Client Area di navbar), `NEXT_PUBLIC_CLIENT_SITE_URL`, `NEXT_PUBLIC_SOLID_GOLD_PLAY_STORE_URL`, `NEXT_PUBLIC_SOLID_GOLD_APP_STORE_URL`.
- `src/components/atoms/` — `ButtonLink`, `SectionContainer`, `SectionTitle`, `SectionEyebrow`.
- `src/locales/` — konfigurasi locale dan teks (`messages.ts`).
- `src/proxy.ts` — redirect path tanpa locale ke `/id/...`.
- `src/app/globals.css` — token tema Tailwind (warna, font).
