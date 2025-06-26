# Markdown Blog System

This directory contains the markdown files for blog posts used in the Next.js application.

## Directory Structure

```
content/
  └── blog/
      ├── images/           # Place blog post images here
      ├── post-slug-1.md    # Individual blog post
      ├── post-slug-2.md
      └── ...
```

## Blog Post Format

Each blog post is a markdown file with YAML frontmatter containing metadata, followed by the markdown content.

### Frontmatter Fields

```yaml
---
id: "unique-post-id"
title: "Post Title"
excerpt: "A brief summary of the post"
author: "Author Name"
publishedAt: "YYYY-MM-DD"
readTime: 5                 # Reading time in minutes
category: "Category Name"
tags:
  - "tag1"
  - "tag2"
featuredImage: "/path/to/image.jpg"
featured: true              # Whether this post is featured
---
```

- `id`: Unique identifier for the post (used in URLs)
- `title`: Post title
- `excerpt`: Brief summary displayed in listings
- `author`: Post author
- `publishedAt`: Publication date in YYYY-MM-DD format
- `readTime`: Estimated reading time in minutes
- `category`: Main category for the post
- `tags`: Array of relevant tags
- `featuredImage`: Path to the main image (absolute path from public directory)
- `featured`: Boolean indicating if post should be featured

### Content

After the frontmatter section, write your blog post using standard Markdown syntax.

```markdown
## Heading 2

This is a paragraph of text.

### Heading 3

- List item 1
- List item 2

[Link text](https://example.com)

![Alt text](/content/blog/images/image.jpg "Image title")

```

## Markdown Features Supported

- Headers (h1-h6)
- Paragraphs and line breaks
- Bold and italic text
- Lists (ordered and unordered)
- Links
- Images
- Blockquotes
- Code blocks with syntax highlighting
- Tables
- Task lists
- Footnotes

## Image Handling

Place images in the `/public/content/blog/images/` directory. In your markdown file, reference them using either:

1. Absolute path from the public directory:
   ```markdown
   ![Alt text](/content/blog/images/image.jpg "Optional title")
   ```

2. Relative path (processed by the custom image component):
   ```markdown
   ![Alt text](image.jpg "Optional title")
   ```

## Table of Contents

A table of contents is automatically generated for posts based on h2, h3, and h4 headings.

## Code Syntax Highlighting

Code blocks with language specification will have syntax highlighting:

````markdown
```javascript
const greeting = "Hello, world!";
console.log(greeting);
```
````

## Working with the Blog in Development

When adding new blog posts:

1. Create a new .md file in this directory
2. Add the required frontmatter metadata
3. Write your content using markdown
4. Images should be placed in the images directory
5. The post will be automatically available at `/blog/[id]`
