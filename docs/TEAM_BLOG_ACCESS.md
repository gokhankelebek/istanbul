# Team Blog Access Guide

This guide explains how your team can remotely create blog posts for the Istanbul Mediterranean website without any technical setup.

## 🌐 Access the Blog Editor

**URL:** `https://yourdomain.com/admin/blog-editor`

## 🔑 One-Time Setup (Per Team Member)

### Step 1: Get a GitHub Token
1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Fill out the form:
   - **Note:** `Istanbul Blog Editor`
   - **Expiration:** `1 year` (or as needed)
   - **Scopes:** Check `repo` (Full control of repositories)
4. Click **"Generate token"**
5. **⚠️ COPY THE TOKEN IMMEDIATELY** (it won't be shown again)

### Step 2: Enter Token in Editor
1. Visit the blog editor URL
2. Paste your token in the "GitHub Personal Access Token" field
3. Click **"Save Token"** - it's stored securely in your browser only

**You're done!** The token is saved and you won't need to enter it again.

## ✍️ Creating Blog Posts

### Quick Start
1. **Title** - Enter your blog post title (slug generates automatically)
2. **Excerpt** - Brief description under 160 characters for SEO
3. **Cover Image** - Choose from common options or add custom path
4. **Tags** - Use relevant keywords (comma-separated)
5. **Content** - Write using Markdown format
6. **Publish** - Click "Publish Blog Post"

### Content Tips

#### Use Markdown Formatting
```markdown
# Main Header
## Section Header
### Subsection

**Bold text** and *italic text*

- Bullet point lists
- Another item

1. Numbered lists
2. Second item

[Link text](https://example.com)
```

#### Common Cover Images
- `/menu/gyros.png` - For gyro-related posts
- `/menu/desserts/baklava.webp` - For dessert posts
- `/istanbul-hero.png` - General restaurant image
- `/hero_chef_wide.jpg` - Chef/cooking image

#### Recommended Tags
- `mediterranean` - For Mediterranean cuisine
- `food` - General food content
- `las vegas` - Location-based posts
- `halal` - Halal food topics
- `gyro`, `baklava`, `falafel` - Specific menu items
- `sphere`, `caesars palace` - Vegas landmarks

### Content Structure Template
```markdown
# Your Blog Post Title

Brief introduction paragraph explaining what the post is about.

## Main Section

Content here with helpful information.

### Subsection

More detailed information.

## Call-to-Action

End with something like: "At Istanbul Mediterranean, we bring you authentic [topic] with traditional techniques and the finest ingredients. Visit us at Grand Bazaar Shops or order online at [orderdoner.com](https://orderdoner.com)!"
```

## 🛡️ Security & Access

### Token Security
- **Tokens are stored locally** in your browser only
- **Never shared** with servers or other team members
- **GitHub permissions** - you need write access to the repository
- **Revoke anytime** at [GitHub Settings](https://github.com/settings/tokens)

### Who Can Access
- Team members with GitHub repository write access
- Anyone with a valid GitHub token for the `gokhankelebek/istanbul` repo

## 🚀 What Happens After Publishing

1. **Immediate:** Blog post is committed to GitHub
2. **Within minutes:** Website rebuilds automatically (if auto-deploy is configured)
3. **Live:** Your post appears on the website at `/blog-posts/your-slug`

## 📱 Mobile Friendly

The blog editor works great on:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Any modern web browser

## 🆘 Troubleshooting

### "Failed to create blog post"
- **Check your token** - Make sure it's valid and has `repo` permissions
- **Check the slug** - Make sure it's unique (no spaces or special characters)
- **Internet connection** - Ensure you have a stable connection

### "Token invalid"
- **Generate a new token** following Step 1 above
- **Check permissions** - Make sure the token has `repo` scope
- **Repository access** - Ensure you have write access to the repository

### "Posts not showing on website"
- **Wait a few minutes** - Auto-deployment takes time
- **Check the main website** - Look at `/blog-posts` page
- **Contact admin** - If posts still don't appear after 10+ minutes

### "Can't access the editor"
- **Check URL** - Make sure you're going to the right domain
- **Browser compatibility** - Use a modern browser (Chrome, Firefox, Safari, Edge)
- **JavaScript enabled** - The editor requires JavaScript

## 🎯 Best Practices

### Content Guidelines
1. **Keep it authentic** - Write in Istanbul Mediterranean's voice
2. **Include food imagery** - Use appetizing cover images
3. **End with CTA** - Always mention the restaurant/ordering
4. **SEO friendly** - Use relevant keywords naturally
5. **Mobile readable** - Short paragraphs, clear headers

### Technical Guidelines
1. **Unique slugs** - Each post needs a unique URL slug
2. **Image paths** - Use existing images from `/menu/` when possible
3. **Tag consistency** - Use the recommended tag list
4. **Date format** - Use YYYY-MM-DD format for dates

## 📞 Need Help?

- **Technical issues** - Contact your admin or developer
- **Content guidance** - Follow existing blog posts as examples
- **GitHub problems** - Check [GitHub's help docs](https://docs.github.com)

## 🎉 You're Ready!

Your team can now create professional blog posts remotely without any technical setup. Just visit the editor, enter your GitHub token once, and start writing!

**Remember:** Every post helps boost Istanbul Mediterranean's online presence and brings in more customers. Happy blogging!