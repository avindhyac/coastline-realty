---
name: payload
description: Payload CMS 3 / Next.js project workflow. Use when modifying Payload collections, globals, blocks, fields, hooks, access control, plugins, migrations, generated types, admin UI, seed data, or Local API usage in this repository.
---

# Payload CMS Skill

Use this skill for Payload CMS work in this project.

## Project profile

- Framework: Next.js + Payload CMS 3.88.0
- Package manager: pnpm
- Config: `src/payload.config.ts`
- Generated types: `src/payload-types.ts`
- Collections: `src/collections/*`
- Globals: `src/Header/config.ts`, `src/Footer/config.ts`
- Blocks: `src/blocks/*/config.ts` with frontend components alongside them
- Rich text: Lexical, default config in `src/fields/defaultLexical.ts`
- Plugins: `src/plugins/index.ts`
- App routes: `src/app/(payload)` for admin/API, `src/app/(frontend)` for site

## Required workflow

1. Inspect existing nearby patterns before editing.
2. Keep Payload config changes strongly typed using Payload's exported types (`CollectionConfig`, `GlobalConfig`, `Block`, `Field`, etc.).
3. When adding or changing collections/globals/blocks/fields, update frontend renderers/components if needed.
4. After schema changes, run:
   ```bash
   pnpm run generate:types
   ```
5. If admin import map paths/components changed, run:
   ```bash
   pnpm run generate:importmap
   ```
6. Validate with:
   ```bash
   pnpm run lint
   ```
   and, when practical:
   ```bash
   pnpm run test:int
   ```

## Conventions

- Prefer project aliases/import patterns already in the touched files.
- Do not manually edit `src/payload-types.ts`; regenerate it.
- Put reusable fields in `src/fields/` when they match existing abstractions.
- Preserve access-control patterns from `src/access/`.
- Preserve revalidation hooks for published content and globals.
- For relationship/upload values in frontend code, handle both ID and populated object shapes.
- For localized/draft-aware queries, follow existing `draft`, `depth`, `overrideAccess`, and pagination patterns.

## Useful commands

```bash
pnpm payload --help
pnpm run generate:types
pnpm run generate:importmap
pnpm run lint
pnpm run test:int
pnpm dev
```
