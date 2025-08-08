# 📄 Prompt for AI Agent: Fix Modal Overflow and Add RichText Field to TestPackage

## 🧩 Project Context:

This is a **Next.js** project written in **TypeScript**, using **Prisma** for ORM, and there are multiple issues related to modals and rich text fields in the admin section.

---

## ✅ Task Requirements:

### 1. Fix Modal Overflow Issue in `components/AdminCRUD.tsx`

- **Problem**: When the modal opens and contains many or long fields, it overflows beyond the screen and the user cannot scroll or drag to see the rest of the content.
- **Expected Behavior**:
  - The modal should be scrollable vertically if content exceeds the screen height.
  - Ensure it is responsive on all screen sizes.
  - Dragging behavior (if any) should remain usable.
- **Steps**:
  - Locate the modal component in `components/AdminCRUD.tsx`.
  - Apply appropriate CSS (using Tailwind CSS if the project uses it) to limit the height (e.g. `max-h-screen`, `overflow-y-auto`, etc.).
  - Test on small and large screen resolutions.

### 2. Add `description` Field to `TestPackage` Model in `prisma/schema.prisma`

- **Purpose**: Add a rich text description to each test package.
- **Steps**:
  - Open `prisma/schema.prisma`.
  - Modify the `TestPackage` model to include a new field:
    ```prisma
    description String?
    ```
  - After saving changes, run:
    ```bash
    npx prisma generate
    ```
    to sync the Prisma client.

### 3. Update the Admin Page (`app/admin/testpackage`) to Support RichText Editing

- **Steps**:
  - In the page or component responsible for creating/editing test packages (likely inside `app/admin/testpackage`):
    - Add a new input for the `description` field.
    - Use a **rich text editor** like **TinyMCE**, **Quill**, or **React Draft WYSIWYG** for input.
    - Make sure to bind the value to the `description` field.
    - Submit the value as an HTML string.

### 4. Render RichText Fields with `dangerouslySetInnerHTML`

- **Scope**: Anywhere in the `app/admin/**` folder where a rich text field (like `description`) is displayed.
- **Expected Behavior**:
  - Instead of plain text rendering, HTML content should be interpreted and styled correctly.
  - Example usage:
    ```tsx
    <div dangerouslySetInnerHTML={{ __html: testPackage.description }} />
    ```
- **Note**: Sanitize inputs on the server side before saving (if security is a concern).

---

## 📌 Additional Notes:

- Ensure TypeScript types are updated where necessary.
- Test the full Create → Update → Display flow to confirm functionality.
- Optionally style the rendered HTML content (like `<p>`, `<ul>`, `<strong>`) using Tailwind classes or a global stylesheet.
