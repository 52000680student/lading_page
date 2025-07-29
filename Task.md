# Prompt for AI Agent – Dynamic Page Titles in Next.js

## Overview

I am working on a multi-page landing website built with Next.js. Each page represents a specific service or product section (e.g., cancer screening for women, liver tests, general health checkups, etc.). I want you to help me generate dynamic and SEO-optimized `<title>` tags for each page in the project. The titles should appear in the browser tab (next to the favicon) and be customized per page.

## Requirements

Please follow these instructions:

1. **Page Purpose Detection**

   * Detect the page’s unique purpose based on its route, file name, or content.

2. **SEO-Optimized Titles**

   * Generate a meaningful, short, and SEO-friendly `<title>` tag for that page.

3. **Branding**

   * Make sure the title includes both the service name and the brand (e.g., MedNova).

4. **Avoid Duplication**

   * Each page should have a unique title, no reuse of generic titles like "Home" or "Landing Page".

5. **Output Format**

   * Format the final output so that it can be used directly inside a Next.js component using the `Head` component from `next/head`.

## Style Guide

* Use the format: `[Service Name] | MedNova`
* Titles should be clear, relevant, and encourage click-through from search results.

## Example Outputs

### For `/test-package/general-female-basic`

```tsx
import Head from 'next/head';

export default function GeneralFemaleBasicPage() {
  return (
    <>
      <Head>
        <title>Women's Cancer Screening Package | MedNova</title>
      </Head>
      {/* Page content here */}
    </>
  );
}
```

### For `/test-package/liver-test`

```tsx
import Head from 'next/head';

export default function LiverTestPage() {
  return (
    <>
      <Head>
        <title>Liver Health Check Package | MedNova</title>
      </Head>
      {/* Page content here */}
    </>
  );
}
```

## Task

Now generate titles for the rest of the site based on their routes and content. Use a consistent naming style: `[Service Name] | MedNova`.

If possible, return a list of pages with their respective titles formatted for copy-pasting into the Next.js page components.
