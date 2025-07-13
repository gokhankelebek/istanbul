# Blog Creation Guide

This guide explains how to easily create and add new blog posts to the Istanbul Mediterranean website.

## Quick Start

### Method 1: Interactive Script (Recommended)
```bash
npm run create:post
```

This will launch an interactive wizard that guides you through:
1. **Title** - The blog post title
2. **Slug** - URL-friendly version (auto-generated from title)
3. **Excerpt** - Brief description for previews
4. **Cover Image** - Path to hero image
5. **Author** - Defaults to "Istanbul Mediterranean Team"
6. **Tags** - Comma-separated keywords
7. **Content** - Optional immediate content entry
8. **Build** - Auto-run build script to update website

### Method 2: Manual Creation
1. Copy the template: `cp templates/blog-post-template.md content/blog/your-slug.md`
2. Edit the frontmatter and content
3. Run: `npm run build:posts`
4. Run: `npm run sync:blog` (if needed)

## File Structure

```
content/blog/
├── your-post-slug.md          # Source markdown file
└── ...

public/content/blog/           # Synced copies (auto-generated)
├── your-post-slug.md
└── ...

src/data/
└── posts.json                 # Generated from markdown (auto-generated)
```

## Frontmatter Fields

All blog posts must include this frontmatter at the top:

```yaml
---
title: "Your Post Title"              # Required - displayed everywhere
slug: "your-post-slug"                # Required - URL path (/blog-posts/slug)
date: "2025-07-13"                    # Required - YYYY-MM-DD format
excerpt: "Brief description..."        # Required - used in previews/SEO
cover: "/path/to/image.jpg"           # Optional - hero image
author: "Istanbul Mediterranean Team"  # Optional - defaults to team
tags: ["mediterranean", "food"]        # Optional - array of keywords
---
```

## Content Guidelines

### Structure
- Use `# Title` for the main heading (matches frontmatter title)
- Use `##` for main sections, `###` for subsections
- Keep paragraphs short (2-3 sentences)
- Break up content with headers and lists

### Istanbul Mediterranean Branding
- End posts with a call-to-action mentioning the restaurant
- Reference menu items consistently: `**Item Name:** Description`
- Include location: `Grand Bazaar Shops at Horseshoe Hotel`
- Mention ordering: `orderdoner.com`

### Common Elements

#### Call-out Boxes
```html
<div style="background-color:#f0fdf4;border-left:6px solid #22c55e;padding:1em 1.5em;border-radius:0.8em;margin:2em 0 2em 0;">
<strong>Pro Tip:</strong> Your helpful tip goes here!
</div>
```

#### Menu Items
```markdown
- **Beef & Lamb Gyro Pita:** Savory, juicy, and packed with flavor
- **Chicken Shawarma Rice Bowl:** A hearty, healthy option
- **Falafel Wrap:** Crispy and vegetarian-friendly
```

#### Location Info
```markdown
## Getting to Istanbul Mediterranean from [Landmark]
1. Exit [landmark] onto [street]
2. Head [direction] toward Las Vegas Blvd
3. Take a short drive to Grand Bazaar Shops at Horseshoe Hotel
4. Istanbul Mediterranean is inside—look for the red awning!
```

## SEO Best Practices

### Tags
Use consistent, relevant tags:
- `mediterranean` - for Mediterranean cuisine posts
- `food` - for food-related content
- `las vegas` - for location-based content
- `halal` - when discussing halal options
- Specific items: `gyro`, `baklava`, `falafel`, etc.
- Landmarks: `sphere`, `caesars palace`, etc.

### Excerpts
- Keep under 160 characters for SEO
- Make it compelling and descriptive
- Include key terms naturally

### Cover Images
- Use high-quality images from `/menu/` or `/public/`
- Prefer `.webp` format for performance
- Common options:
  - `/menu/gyros.png`
  - `/menu/desserts/baklava.webp`
  - `/istanbul-hero.png`
  - `/hero_chef_wide.jpg`

## Workflow

### Standard Workflow
1. `npm run create:post` - Create new post
2. Edit content in your preferred editor
3. `npm run build:posts` - Update website data
4. Test locally with `npm start`
5. Commit and deploy

### Development Workflow
1. Create post with script
2. `npm start` - Starts dev server (auto-syncs and builds)
3. Edit content - changes reflect automatically
4. Commit when satisfied

## Scripts Reference

| Command | Purpose |
|---------|---------|
| `npm run create:post` | Interactive blog post creator |
| `npm run build:posts` | Generate posts.json from markdown |
| `npm run sync:blog` | Copy markdown to public folder |
| `npm run validate:blog` | Check blog integrity |
| `npm start` | Dev server (auto-syncs blog) |
| `npm run build` | Full production build |

## Troubleshooting

### "File already exists"
The creation script will ask if you want to overwrite. Choose 'y' to replace or 'n' to cancel.

### "Posts not showing"
1. Check frontmatter syntax (YAML format)
2. Run `npm run build:posts`
3. Check browser console for errors
4. Verify slug is unique

### "Images not loading"
1. Ensure image exists in `/public/` folder
2. Use absolute paths starting with `/`
3. Check image file extension matches

### "Build fails"
1. Validate YAML frontmatter syntax
2. Check for special characters in title/content
3. Run `npm run validate:blog` for diagnostics

## Tips for Success

1. **Be Consistent** - Follow the established patterns
2. **Test Locally** - Always preview before deploying
3. **Keep Backups** - Your markdown files are backed up in git
4. **Use Templates** - Start with the provided template
5. **Follow SEO** - Good excerpts and tags help discoverability

Need help? Check existing posts in `content/blog/` for examples!