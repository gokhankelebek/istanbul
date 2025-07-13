#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

console.log('🔧 GitHub Integration Setup for Istanbul Mediterranean Blog');
console.log('==========================================\n');

async function setupGitHubIntegration() {
  try {
    // Check if we're in a git repository
    const gitExists = await fs.access('.git').then(() => true).catch(() => false);
    if (!gitExists) {
      console.log('❌ This is not a git repository. Please run this script from the project root.');
      process.exit(1);
    }

    // Get remote URL
    const { spawn } = require('child_process');
    const gitRemote = spawn('git', ['remote', 'get-url', 'origin']);
    
    let remoteUrl = '';
    gitRemote.stdout.on('data', (data) => {
      remoteUrl += data.toString();
    });

    gitRemote.on('close', (code) => {
      if (code === 0) {
        remoteUrl = remoteUrl.trim();
        console.log(`📍 Git repository: ${remoteUrl}`);
        
        // Extract owner/repo from URL
        let repoInfo = '';
        if (remoteUrl.includes('github.com')) {
          const match = remoteUrl.match(/github\.com[\/:]([^\/]+)\/([^\/]+)(?:\.git)?$/);
          if (match) {
            repoInfo = `${match[1]}/${match[2]}`;
            console.log(`🏠 Repository: ${repoInfo}\n`);
          }
        }

        console.log('📋 To set up GitHub integration for your team:');
        console.log('==========================================\n');

        console.log('1. 🔑 Create a GitHub Personal Access Token:');
        console.log('   • Go to: https://github.com/settings/tokens');
        console.log('   • Click "Generate new token" → "Generate new token (classic)"');
        console.log('   • Name: "Istanbul Blog Editor"');
        console.log('   • Expiration: 1 year (or as needed)');
        console.log('   • Scopes: Check "repo" (Full control of private repositories)');
        console.log('   • Click "Generate token"');
        console.log('   • ⚠️  COPY THE TOKEN IMMEDIATELY (it won\'t be shown again)\n');

        console.log('2. 📝 Update BlogEditor.jsx:');
        console.log(`   • Open: src/pages/BlogEditor.jsx`);
        console.log(`   • Find line: 'YOUR_USERNAME/istanbul'`);
        console.log(`   • Replace with: '${repoInfo || 'your-username/your-repo'}'`);
        console.log('   • Save the file\n');

        console.log('3. 🌐 Share with your team:');
        console.log('   • URL: https://yourdomain.com/admin/blog-editor');
        console.log('   • They need the GitHub token from step 1');
        console.log('   • Token is stored securely in their browser only\n');

        console.log('4. 🔒 Security Notes:');
        console.log('   • Tokens are stored locally in each team member\'s browser');
        console.log('   • No tokens are sent to your server');
        console.log('   • Team members need GitHub write access to the repo');
        console.log('   • Consider creating a dedicated GitHub user for blog posts\n');

        console.log('5. 🚀 Workflow:');
        console.log('   • Team visits /admin/blog-editor');
        console.log('   • Enters GitHub token (one time)');
        console.log('   • Creates blog posts through web interface');
        console.log('   • Posts are committed directly to GitHub');
        console.log('   • Website rebuilds automatically (if auto-deploy is set up)\n');

        console.log('✅ Setup complete! Your team can now create blog posts remotely.');
        
      } else {
        console.log('❌ Could not get git remote URL. Make sure you\'re in a git repository.');
      }
    });

  } catch (error) {
    console.error('❌ Error during setup:', error.message);
    process.exit(1);
  }
}

setupGitHubIntegration();