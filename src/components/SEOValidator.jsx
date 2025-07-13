import React, { useEffect } from 'react';

const SEOValidator = ({ title, description, keywords, showWarnings = false }) => {
  const validateSEO = () => {
    const warnings = [];
    
    // Title validation
    if (!title) {
      warnings.push('❌ Missing title tag');
    } else {
      if (title.length < 30) {
        warnings.push(`⚠️ Title too short: ${title.length} chars (recommend 50-60)`);
      } else if (title.length > 60) {
        warnings.push(`⚠️ Title too long: ${title.length} chars (recommend 50-60)`);
      } else {
        warnings.push(`✅ Title length optimal: ${title.length} chars`);
      }
    }
    
    // Description validation
    if (!description) {
      warnings.push('❌ Missing meta description');
    } else {
      if (description.length < 120) {
        warnings.push(`⚠️ Description too short: ${description.length} chars (recommend 120-158)`);
      } else if (description.length > 158) {
        warnings.push(`⚠️ Description too long: ${description.length} chars (recommend 120-158)`);
      } else {
        warnings.push(`✅ Description length optimal: ${description.length} chars`);
      }
    }
    
    // Keywords validation
    if (!keywords || keywords.length === 0) {
      warnings.push('⚠️ No keywords specified');
    } else {
      const keywordCount = keywords.split(',').length;
      if (keywordCount > 10) {
        warnings.push(`⚠️ Too many keywords: ${keywordCount} (recommend 5-10)`);
      } else if (keywordCount < 3) {
        warnings.push(`⚠️ Too few keywords: ${keywordCount} (recommend 5-10)`);
      } else {
        warnings.push(`✅ Keyword count optimal: ${keywordCount}`);
      }
    }
    
    return warnings;
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && showWarnings) {
      const warnings = validateSEO();
      console.group('🔍 SEO Validation');
      warnings.forEach(warning => console.log(warning));
      console.groupEnd();
    }
  }, [title, description, keywords, showWarnings]);

  // In production, return null (no visual output)
  if (process.env.NODE_ENV === 'production' || !showWarnings) {
    return null;
  }

  // In development, show warnings if enabled
  const warnings = validateSEO();
  const hasErrors = warnings.some(w => w.includes('❌'));
  const hasWarnings = warnings.some(w => w.includes('⚠️'));

  return (
    <div className={`fixed bottom-4 right-4 max-w-sm p-4 rounded-lg shadow-lg z-50 ${
      hasErrors ? 'bg-red-50 border border-red-200' :
      hasWarnings ? 'bg-yellow-50 border border-yellow-200' :
      'bg-green-50 border border-green-200'
    }`}>
      <div className="text-sm font-semibold mb-2">
        🔍 SEO Validation ({warnings.filter(w => w.includes('✅')).length} of {warnings.length} optimal)
      </div>
      <div className="text-xs space-y-1">
        {warnings.map((warning, index) => (
          <div key={index} className={
            warning.includes('❌') ? 'text-red-700' :
            warning.includes('⚠️') ? 'text-yellow-700' :
            'text-green-700'
          }>
            {warning}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SEOValidator;