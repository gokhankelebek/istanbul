const fs = require('fs');
const path = require('path');

const postsData = require('../src/data/posts.json');
const blogDir = path.join(__dirname, '../public/content/blog');

function checkPosts() {
  let allOk = true;
  for (const post of postsData) {
    const mdPath = path.join(blogDir, `${post.slug}.md`);
    if (!fs.existsSync(mdPath)) {
      console.error(`❌ Missing markdown: ${mdPath}`);
      allOk = false;
    } else {
      const content = fs.readFileSync(mdPath, 'utf8');
      if (!content.trim()) {
        console.error(`❌ Empty markdown: ${mdPath}`);
        allOk = false;
      }
    }
  }
  if (allOk) {
    console.log('✅ All blog posts are present and non-empty!');
  }
}

checkPosts();
