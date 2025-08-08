# Task: Render richtext fields with `dangerouslySetInnerHTML` in Next.js (TypeScript)

## Context

* Tech stack: **Next.js (App Router), TypeScript**
* Project structure includes:

  * `app/admin/**` — files that define arrays of **field configs** used to render content
  * `app/components/**` — React components that **display** those fields on the website
* Some fields are of **type `richtext`**. Their values contain HTML (e.g., `<strong>`, `<em>`, links) and must be rendered as raw HTML to preserve styling.

## Objective

Find every field defined as **type `richtext`** in `app/admin/**` and update the **corresponding render points** in `app/components/**` to use:

```tsx
<div dangerouslySetInnerHTML={{ __html: String(value ?? "") }} />
```

instead of interpolating raw values like `{value}`.

> **Scope rule:** Only change the **display** sites in `app/components/**`. Do **not** alter data models, Prisma schema, or admin config semantics, except to reliably detect `richtext`.

---

## Requirements

### 1) Discover all richtext fields

* Search in `app/admin/**` for field config arrays that define objects like:

  * `type: 'richtext'` or `type: "richtext"`
  * `fieldType: 'richtext'`
  * `input: 'richtext'`
* A typical field config may look like:

  ```ts
  export const postFields = [
    { name: "title", type: "text" },
    { name: "description", type: "richtext" },
  ] as const;
  ```
* **Collect a mapping** of `richtext` field **names** to their **declaring module**:

  * Example mapping item: `{ name: "description", source: "app/admin/post/fields.ts" }`

### 2) Locate render points in components

* For each discovered `richtext` field name, find where it is rendered in `app/components/**` (and any pages/components that consume these fields). Common patterns:

  * Direct prop usage: `{item.description}`
  * Nested usage: `{post?.content?.description}`
  * Mapped lists: `{items.map(x => <p>{x.description}</p>)}`
* **Do not** alter non-richtext fields.

### 3) Replace interpolation with safe HTML rendering

* Replace JSX interpolation with a wrapper that renders HTML:

  ```tsx
  // BEFORE
  <p>{item.description}</p>

  // AFTER
  <div
    className="prose max-w-none"
    dangerouslySetInnerHTML={{ __html: String(item?.description ?? "") }}
  />
  ```
* If the component relies on a specific tag (e.g., `<p>`), switch to a `<div>` container. Styling (like `prose`) is optional—preserve existing classes where possible.
* When the value might not be a string, force it with `String(...)`.
* When the value can be `null/undefined`, default to `""`.

> **Note on security:** This project intentionally stores *trusted* rich text from admin. If the agent encounters untrusted sources, it must **not** perform this replacement. (If needed later, we’ll integrate a sanitizer like DOMPurify.)

### 4) TypeScript friendliness

* Ensure no new TS errors. Where the type of the field is unknown/union, narrow or cast minimally:

  ```ts
  const html = String(props?.value ?? "");
  <div dangerouslySetInnerHTML={{ __html: html }} />
  ```
* Do **not** change public prop types unless necessary. Prefer local narrowing.

### 5) Edge cases the agent must handle

* **Arrays of richtext** (e.g., bullet points): render each item with its own `dangerouslySetInnerHTML`.
* **Nested objects**: support paths like `item.details.longDescription`.
* **Conditional blocks**: if the field is optional, keep conditions but render with `dangerouslySetInnerHTML` inside them.
* **Fallbacks**: empty string if missing to avoid React warnings.

---

## Deliverables

1. **Code changes** in `app/components/**` (and pages within `app/**` that directly render richtext) implementing `dangerouslySetInnerHTML` for all `richtext` fields discovered.
2. A short **report** (`richtext-migration.md`) listing:

   * Each `richtext` field found: `name`, `declared in`
   * Each component updated: `path`, `field rendered`, brief note if any special handling was needed
3. **No functional regressions** for non-richtext fields.

---

## Acceptance Criteria

* All `richtext` fields from `app/admin/**` render with preserved HTML styling on the website.
* Plain text fields remain unchanged.
* No TypeScript or ESLint errors introduced.
* Pages build and run successfully (`next build`, `next dev`).
* Visual spot-check shows tags like `<strong>`, `<em>`, `<a>` are rendered as styled HTML (not as plain text).

---

## Implementation Hints (Agent-friendly)

* **Search patterns** (regex examples):

  * In `app/admin/**`:

    * `type:\\s*['"]richtext['"]`
    * `fieldType:\\s*['"]richtext['"]`
    * `input:\\s*['"]richtext['"]`
  * Capture the **`name`** property near each match:

    * `name:\\s*['"]([a-zA-Z0-9_\\.\\[\\]]+)['"]`
* **Component update pattern**:

  * Replace `{X}` (where X is a discovered field reference) with:

    ```tsx
    <div dangerouslySetInnerHTML={{ __html: String(X ?? "") }} />
    ```
* **Safe replacement heuristics**:

  * Only replace when the JSX child is a direct interpolation of the richtext field (no further formatting functions applied).
  * If it’s wrapped in a tag with important classes, keep those classes on the `<div>` replacement.

---

## Commands (if applicable)

* Install prose styling (optional): `npm i @tailwindcss/typography` and enable in Tailwind config.
* Run checks:

  * `npm run lint`
  * `npm run type-check`
  * `npm run build`

---

## Out of Scope

* Changing admin editors or field definitions
* Data migrations
* Adding sanitization (can be a separate task)

---

## Example Before/After

**Before**

```tsx
// app/components/PostDetail.tsx
export function PostDetail({ post }: { post: { title: string; description?: string } }) {
  return (
    <section>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </section>
  );
}
```

**After**

```tsx
// app/components/PostDetail.tsx
export function PostDetail({ post }: { post: { title: string; description?: string } }) {
  return (
    <section>
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: String(post?.description ?? "") }}
      />
    </section>
  );
}
```

---

## Final Check

* Confirm every `richtext` field discovered in `app/admin/**` has a corresponding updated render in `app/components/**` (or pages) using `dangerouslySetInnerHTML`.
* Ship changes behind a PR titled **“Render richtext with dangerouslySetInnerHTML”** with the `richtext-migration.md` report attached.
