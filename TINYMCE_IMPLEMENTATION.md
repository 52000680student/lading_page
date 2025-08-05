# TinyMCE Rich Text Editor Implementation

This document describes the implementation of TinyMCE rich text editing functionality in the Next.js admin panel.

## Overview

The admin panel now supports rich text editing using TinyMCE for fields that contain descriptive content. This allows admin users to format text with bold, italic, links, lists, and other formatting options.

## Features Implemented

### 1. TinyMCE Integration
- **Package**: `@tinymce/tinymce-react`
- **Configuration**: Cloud-based TinyMCE with API key
- **Toolbar**: Common formatting options (bold, italic, lists, links, etc.)
- **Height**: Configurable editor height (default: 300px)

### 2. Rich Text Editor Component
- **File**: `components/RichTextEditor.tsx`
- **Props**: 
  - `value`: Current HTML content
  - `onChange`: Callback for content changes
  - `placeholder`: Placeholder text
  - `height`: Editor height in pixels

### 3. AdminCRUD Integration
- **Automatic Detection**: Fields with type `'richtext'` or containing keywords like 'description', 'content', 'detail' automatically use the rich text editor
- **Modal Size**: Increased modal width to accommodate the editor
- **HTML Storage**: Content is saved as HTML in the database
- **Display**: HTML tags are stripped for table display with truncation

## Configuration

### Environment Variables
Add your TinyMCE API key to `.env.local`:
```
NEXT_PUBLIC_TINY_CLOUD_KEY=your_tinymce_api_key_here
```

### Field Configuration
To use rich text editing for a field, either:

1. **Set field type to 'richtext'**:
```javascript
{ key: 'description', label: 'Description', type: 'richtext', required: true }
```

2. **Use automatic detection** (field names containing 'description', 'content', or 'detail'):
```javascript
{ key: 'description', label: 'Description', type: 'string', required: true }
```

## Usage Examples

### Demo Page
A demo page has been created at `/admin/demo` to showcase the rich text editing capabilities:
- Multiple rich text fields
- Sample content with formatting
- Full CRUD operations

### Process Page
The existing process page (`/admin/process`) has been updated to use rich text editing for the description field.

## Technical Details

### Editor Configuration
```javascript
{
  height: 300,
  menubar: false,
  plugins: [
    'advlist autolink lists link image charmap preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount'
  ],
  toolbar:
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
  branding: false,
  promotion: false
}
```

### Data Flow
1. **Input**: User types in TinyMCE editor
2. **Processing**: Content is converted to HTML
3. **Storage**: HTML content is saved to database via API
4. **Display**: 
   - In editor: Full HTML with formatting
   - In table: Plain text (HTML stripped) with truncation

## Files Modified/Created

### New Files
- `components/RichTextEditor.tsx` - Main rich text editor component
- `app/admin/demo/page.tsx` - Demo page showcasing rich text editing
- `app/api/admin/demo/route.ts` - API routes for demo page
- `.env.local` - Environment configuration

### Modified Files
- `components/AdminCRUD.tsx` - Integrated rich text editor
- `app/admin/page.tsx` - Added demo page link
- `app/admin/process/page.tsx` - Updated description field to use rich text
- `package.json` - Added TinyMCE dependency

## Getting Your TinyMCE API Key

1. Visit [TinyMCE Cloud](https://www.tiny.cloud/)
2. Sign up for a free account
3. Create a new project
4. Copy your API key
5. Add it to `.env.local` as `NEXT_PUBLIC_TINY_CLOUD_KEY`

## Testing

1. Start the development server: `npm run dev`
2. Navigate to `/admin`
3. Click on "Demo Rich Text" to test the implementation
4. Try creating/editing entries with rich text content
5. Verify that formatting is preserved and displayed correctly

## Future Enhancements

- Image upload functionality
- Custom toolbar configurations per field
- Content templates
- Advanced formatting options
- Integration with media library