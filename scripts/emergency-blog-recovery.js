#!/usr/bin/env node
/**
 * Emergency Blog Content Recovery System
 * CRITICAL: Use only when blog content is corrupted or missing
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚨 EMERGENCY BLOG RECOVERY SYSTEM');
console.log('================================\n');

// Recovery source paths (in order of preference)
const RECOVERY_SOURCES = [
  {
    name: 'Git History (most recent commit)',
    check: () => {
      try {
        execSync('git log --oneline -1', { stdio: 'pipe' });
        return true;
      } catch {
        return false;
      }
    },
    recover: () => {
      console.log('📋 Available recent commits:');
      const commits = execSync('git log --oneline -10', { encoding: 'utf8' });
      console.log(commits);
      
      console.log('\n🔄 Restoring from previous commit...');
      execSync('git checkout HEAD~1 -- content/blog/', { stdio: 'inherit' });
      console.log('✅ Restored from git history');
    }
  },
  {
    name: 'Backup Directory',
    check: () => {
      const backupDirs = fs.readdirSync('.')
        .filter(dir => dir.startsWith('content/blog_backup_'))
        .sort()
        .reverse();
      return backupDirs.length > 0;
    },
    recover: () => {
      const backupDirs = fs.readdirSync('.')
        .filter(dir => dir.startsWith('content/blog_backup_'))
        .sort()
        .reverse();
      
      const latestBackup = backupDirs[0];
      console.log(`🔄 Restoring from backup: ${latestBackup}`);
      
      // Remove current content and restore from backup
      if (fs.existsSync('content/blog')) {
        fs.rmSync('content/blog', { recursive: true });
      }
      
      fs.cpSync(latestBackup, 'content/blog', { recursive: true });
      console.log('✅ Restored from backup directory');
    }
  },
  {
    name: 'Public Directory Copy',
    check: () => {
      return fs.existsSync('public/content/blog') && 
             fs.readdirSync('public/content/blog').filter(f => f.endsWith('.md')).length > 0;
    },
    recover: () => {
      console.log('🔄 Restoring from public directory...');
      
      if (!fs.existsSync('content')) {
        fs.mkdirSync('content');
      }
      
      if (fs.existsSync('content/blog')) {
        fs.rmSync('content/blog', { recursive: true });
      }
      
      fs.cpSync('public/content/blog', 'content/blog', { recursive: true });
      console.log('✅ Restored from public directory');
    }
  },
  {
    name: 'JavaScript Data Restoration',
    check: () => {
      return fs.existsSync('src/data/blogPosts.js');
    },
    recover: () => {
      console.log('🔄 Restoring from JavaScript data...');
      console.log('⚠️  This will restore limited content - some data may be lost');
      
      try {
        execSync('node scripts/restore-blog-content.js', { stdio: 'inherit' });
        console.log('✅ Restored from JavaScript data');
      } catch (error) {
        console.error('❌ Failed to restore from JavaScript data:', error.message);
        throw error;
      }
    }
  }
];

// Recovery options
const RECOVERY_OPTIONS = {
  '--auto': 'Automatically try all recovery methods in order',
  '--git': 'Restore from git history only',
  '--backup': 'Restore from backup directory only',
  '--public': 'Restore from public directory only',
  '--js': 'Restore from JavaScript data only',
  '--list': 'List available recovery options',
  '--verify': 'Verify current content integrity'
};

function showUsage() {
  console.log('📖 Usage: node scripts/emergency-blog-recovery.js [option]');
  console.log('\nOptions:');
  Object.entries(RECOVERY_OPTIONS).forEach(([option, description]) => {
    console.log(`  ${option.padEnd(12)} ${description}`);
  });
  console.log('\n⚠️  WARNING: This will overwrite existing content!');
  console.log('💡 Always check git status before running recovery.');
}

function verifyContent() {
  console.log('🔍 Verifying current content...\n');
  
  if (!fs.existsSync('content/blog')) {
    console.log('❌ Content directory does not exist');
    return false;
  }
  
  const files = fs.readdirSync('content/blog').filter(f => f.endsWith('.md'));
  console.log(`📄 Found ${files.length} markdown files`);
  
  if (files.length === 0) {
    console.log('❌ No content files found');
    return false;
  }
  
  if (files.length < 10) {
    console.log('⚠️  Content count seems low (expected ~14 files)');
  }
  
  // Check a few files for valid content
  let validFiles = 0;
  files.slice(0, 3).forEach(file => {
    const content = fs.readFileSync(path.join('content/blog', file), 'utf8');
    if (content.length > 100) {
      validFiles++;
    }
  });
  
  if (validFiles === 0) {
    console.log('❌ Files appear to be empty or corrupted');
    return false;
  }
  
  console.log('✅ Content appears to be valid');
  return true;
}

function listRecoveryOptions() {
  console.log('🔍 Checking available recovery sources...\n');
  
  RECOVERY_SOURCES.forEach((source, index) => {
    const available = source.check();
    const status = available ? '✅' : '❌';
    console.log(`${status} ${index + 1}. ${source.name}`);
  });
  
  console.log('\n💡 Use --auto to try all available sources in order');
}

function performRecovery(method = 'auto') {
  console.log(`\n🚨 STARTING EMERGENCY RECOVERY (method: ${method})`);
  console.log('==========================================\n');
  
  // Create emergency backup of current state
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const emergencyBackup = `content/blog_emergency_${timestamp}`;
  
  if (fs.existsSync('content/blog')) {
    console.log('💾 Creating emergency backup of current state...');
    fs.cpSync('content/blog', emergencyBackup, { recursive: true });
    console.log(`📁 Emergency backup: ${emergencyBackup}`);
  }
  
  let recovered = false;
  
  if (method === 'auto') {
    // Try each recovery method in order
    for (const source of RECOVERY_SOURCES) {
      console.log(`\n🔄 Trying: ${source.name}`);
      
      if (source.check()) {
        try {
          source.recover();
          
          // Verify recovery worked
          if (verifyContent()) {
            console.log(`\n🎉 Successfully recovered using: ${source.name}`);
            recovered = true;
            break;
          } else {
            console.log(`❌ Recovery verification failed for: ${source.name}`);
          }
        } catch (error) {
          console.error(`❌ Recovery failed for ${source.name}:`, error.message);
          continue;
        }
      } else {
        console.log(`⚠️  ${source.name} not available`);
      }
    }
  } else {
    // Try specific recovery method
    const sourceMap = {
      'git': RECOVERY_SOURCES[0],
      'backup': RECOVERY_SOURCES[1],
      'public': RECOVERY_SOURCES[2],
      'js': RECOVERY_SOURCES[3]
    };
    
    const source = sourceMap[method];
    if (!source) {
      console.error(`❌ Unknown recovery method: ${method}`);
      process.exit(1);
    }
    
    if (!source.check()) {
      console.error(`❌ Recovery source not available: ${source.name}`);
      process.exit(1);
    }
    
    try {
      source.recover();
      recovered = verifyContent();
    } catch (error) {
      console.error(`❌ Recovery failed:`, error.message);
      process.exit(1);
    }
  }
  
  if (recovered) {
    console.log('\n🎉 EMERGENCY RECOVERY COMPLETED SUCCESSFULLY');
    console.log('✅ Blog content has been restored');
    console.log('🔄 Run npm run validate:blog to verify integrity');
    console.log('💾 Emergency backup available at:', emergencyBackup);
    
    // Run sync to update public directories
    console.log('\n🔄 Syncing restored content...');
    try {
      execSync('npm run sync:blog', { stdio: 'inherit' });
      console.log('✅ Content synchronized');
    } catch (error) {
      console.warn('⚠️  Sync failed, run manually: npm run sync:blog');
    }
  } else {
    console.log('\n💥 EMERGENCY RECOVERY FAILED');
    console.log('❌ Unable to restore content from any source');
    console.log('🆘 Manual intervention required');
    console.log('\n📞 Emergency procedures:');
    console.log('1. Check git reflog: git reflog');
    console.log('2. Contact technical support');
    console.log('3. Restore from external backups');
    
    if (fs.existsSync(emergencyBackup)) {
      console.log(`4. Emergency backup available: ${emergencyBackup}`);
    }
    
    process.exit(1);
  }
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const option = args[0];
  
  if (!option || option === '--help') {
    showUsage();
    return;
  }
  
  switch (option) {
    case '--list':
      listRecoveryOptions();
      break;
    case '--verify':
      verifyContent();
      break;
    case '--auto':
      performRecovery('auto');
      break;
    case '--git':
      performRecovery('git');
      break;
    case '--backup':
      performRecovery('backup');
      break;
    case '--public':
      performRecovery('public');
      break;
    case '--js':
      performRecovery('js');
      break;
    default:
      console.error(`❌ Unknown option: ${option}`);
      showUsage();
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}