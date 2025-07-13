# Blog Content Backup Documentation
*Generated: 2025-07-13*

## Critical Data Protection Notice
⚠️ **NEVER DELETE ANY BLOG FILES WITHOUT READING THIS DOCUMENT FIRST**

This document catalogs all blog content sources to prevent accidental data loss.

## Content Inventory Summary

### Source Markdown Files (14 files in /content/blog/):
- baklava-unwrapped.md
- best-halal-baklava-las-vegas-strip.md
- best-mediterranean-food-near-caesars-palace-las-vegas.md
- explore-the-mediterranean-cuisine.md
- greek-gyro-answering-top-7-questions.md
- halal-what-does-it-mean.md
- history-and-variations-of-gyros.md
- mediterranean-delivery-food-las-vegas.md
- shawarma-vs-doner-kebab.md
- the-ultimate-guide-to-savoring-the-perfect-gyro.md
- top-5-halal-food-las-vegas.md
- what-is-falafel-what-is-it-made-from-which-cuisine.md
- what-makes-real-baklava-a-guide-to-its-essential-components.md
- where-to-eat-near-the-sphere-las-vegas.md

### Additional Content Sources:
- `/src/data/blogPosts.js` - Rich content with embedded markdown (13 posts)
- `/src/data/posts.json` - Metadata for 14 posts
- `/data/blogPosts.js` - Legacy format (5 posts)
- `/data/posts.json` - Legacy metadata

### Generated/Copied Files:
- `/public/content/blog/*.md` - Public copies (13 files)
- `/build/content/blog/*.md` - Build outputs (13 files)

## Data Redundancy Map

### Primary Sources (DO NOT DELETE):
1. **MASTER SOURCE**: `/content/blog/*.md` (14 files) - Full markdown with frontmatter
2. **RICH CONTENT**: `/src/data/blogPosts.js` - JavaScript objects with embedded content
3. **METADATA**: `/src/data/posts.json` - Post metadata and excerpts

### Generated Files (Safe to regenerate):
- All files in `/public/content/blog/`
- All files in `/build/content/blog/`
- Static HTML files in `/public/blog-posts/`

## Content Differences Identified

### Missing from `/public/content/blog/`:
- `where-to-eat-near-the-sphere-las-vegas.md` (exists in source but not copied)

### Inconsistencies:
- Source has 14 markdown files
- Public copy has 13 files (missing Sphere article)
- `blogPosts.js` has 13 posts with rich content
- Build process may not be copying all files correctly

## Recovery Procedures

### If Markdown Files Lost:
1. Check git history: `git log --follow content/blog/`
2. Restore from `src/data/blogPosts.js` using `scripts/restore-blog-content.js`
3. Manual recovery from public copies if needed

### If JavaScript Data Lost:
1. Regenerate from markdown using custom script
2. Check git history for `src/data/blogPosts.js`
3. Manual reconstruction from markdown frontmatter + content

### If All Content Lost:
1. **STOP IMMEDIATELY** - Do not continue build process
2. Check git history: `git reflog` and `git log --oneline --graph`
3. Restore from most recent working commit
4. Contact technical support with this documentation

## Safe Modification Guidelines

### Before Making Changes:
1. **Create backup**: `cp -r content/blog content/blog_backup_$(date +%Y%m%d)`
2. **Commit current state**: `git add . && git commit -m "Backup before blog changes"`
3. **Test in isolation**: Make changes to copies first

### After Making Changes:
1. **Verify content integrity**: Run `node scripts/check_blog_posts.js`
2. **Test build process**: `npm run build:posts`
3. **Validate all posts load**: Check each blog post URL manually

## Emergency Contacts

If you lose blog content:
1. **STOP ALL WORK** immediately
2. **DO NOT RUN BUILD SCRIPTS**
3. **CHECK GIT STATUS**: `git status` and `git diff`
4. **RESTORE FROM GIT**: `git checkout HEAD~1` to previous working state
5. **DOCUMENT THE INCIDENT** for future prevention

## File Change Detection

Use this command to monitor for unauthorized changes:
```bash
find content/blog src/data -name "*.md" -o -name "*.js" -o -name "*.json" | xargs ls -la
```

Last known good state: 2025-07-13 (after critical fixes)

---
**Remember: Blog content is business-critical. When in doubt, make backups.**