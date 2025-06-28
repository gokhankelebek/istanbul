/**
 * Schema Validator Utility
 * 
 * This utility validates JSON-LD structured data against common requirements
 * and best practices for search engines.
 */

/**
 * Validates a schema object against common requirements
 * @param {Object} schema - The schema object to validate
 * @returns {Object} - Validation results with errors and warnings
 */
// Configuration for expected schema types per route
const EXPECTED_SCHEMAS = {
  '/': ['Restaurant', 'LocalBusiness', 'WebSite', 'FAQPage'],
  '/menu': ['Menu', 'ItemList', 'Restaurant'],
  '/turkishfood': ['Article', 'BreadcrumbList'],
  '/halal': ['Article', 'BreadcrumbList'],
  '/about': ['AboutPage', 'Organization', 'BreadcrumbList'],
  '/contact': ['LocalBusiness', 'BreadcrumbList'],
  '/delivery': ['Service', 'BreadcrumbList'],
  '/faq': ['FAQPage', 'BreadcrumbList'],
  '/catering': ['Service', 'BreadcrumbList'],
  '/blog': ['Blog', 'ItemList', 'BreadcrumbList']
};

// Required properties for each schema type
const REQUIRED_PROPERTIES = {
  'Restaurant': ['name', 'image', 'address', 'servesCuisine', 'priceRange', 'telephone'],
  'LocalBusiness': ['name', 'address', 'telephone', 'openingHours'],
  'FAQPage': ['mainEntity'],
  'Menu': ['hasMenuSection'],
  'Article': ['headline', 'author', 'datePublished', 'image'],
  'Service': ['name', 'description', 'provider'],
  'ItemList': ['itemListElement'],
  'BreadcrumbList': ['itemListElement']
};

/**
 * Validates a schema object against common requirements
 * @param {Object} schema - The schema object to validate
 * @param {string} [pathname] - Current page pathname for route-specific validation
 * @returns {Object} - Validation results with errors and warnings
 */
export const validateSchema = (schema, pathname) => {
  const result = {
    valid: true,
    errors: [],
    warnings: [],
    info: [],
    schemaType: null
  };

  // Check basic schema structure
  if (!schema) {
    result.valid = false;
    result.errors.push('Schema is empty or undefined');
    return result;
  }

  // Check for required properties
  if (!schema['@context']) {
    result.valid = false;
    result.errors.push('Missing @context property');
  } else if (schema['@context'] !== 'https://schema.org' && 
             !schema['@context'].includes('schema.org')) {
    result.warnings.push('@context does not reference schema.org');
  }

  if (!schema['@type']) {
    result.valid = false;
    result.errors.push('Missing @type property');
    return result;
  }

  // Store the schema type
  const type = schema['@type'];
  result.schemaType = type;
  
  // Check if this schema type is expected for this route
  if (pathname && EXPECTED_SCHEMAS[pathname]) {
    if (!EXPECTED_SCHEMAS[pathname].includes(type)) {
      result.warnings.push(`Schema type '${type}' is not expected for route '${pathname}'. Expected types: ${EXPECTED_SCHEMAS[pathname].join(', ')}`);
    } else {
      result.info.push(`Schema type '${type}' is correctly implemented for route '${pathname}'`);
    }
  }
  
  // Check for required properties based on schema type
  if (REQUIRED_PROPERTIES[type]) {
    for (const prop of REQUIRED_PROPERTIES[type]) {
      if (!schema[prop]) {
        result.warnings.push(`${type}: Missing required property '${prop}'`);
      }
    }
  }
  
  // Type-specific validation
  if (type === 'Restaurant' || type === 'LocalBusiness') {
    validateLocalBusinessSchema(schema, result);
  } else if (type === 'Article' || type === 'BlogPosting') {
    validateArticleSchema(schema, result);
  } else if (type === 'FAQPage') {
    validateFAQSchema(schema, result);
  } else if (type === 'Product') {
    validateProductSchema(schema, result);
  } else if (type === 'Recipe') {
    validateRecipeSchema(schema, result);
  } else if (type === 'Event') {
    validateEventSchema(schema, result);
  } else if (type === 'WebSite') {
    validateWebsiteSchema(schema, result);
  } else if (type === 'Organization') {
    validateOrganizationSchema(schema, result);
  } else if (type === 'BreadcrumbList') {
    validateBreadcrumbListSchema(schema, result);
  } else if (type === 'Menu' || type === 'MenuSection') {
    validateMenuSchema(schema, result);
  } else if (type === 'ItemList') {
    validateItemListSchema(schema, result);
  } else if (type === 'Service') {
    validateServiceSchema(schema, result);
  }

  return result;
};

/**
 * Validates a Restaurant or LocalBusiness schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateLocalBusinessSchema = (schema, result) => {
  // Required properties
  if (!schema.name) {
    result.valid = false;
    result.errors.push('Missing name property');
  }

  if (!schema.address) {
    result.valid = false;
    result.errors.push('Missing address property');
  } else if (typeof schema.address === 'object') {
    if (!schema.address['@type']) {
      result.warnings.push('Address is missing @type property');
    }
    if (!schema.address.streetAddress) {
      result.warnings.push('Address is missing streetAddress property');
    }
  }

  // Recommended properties
  if (!schema.telephone) {
    result.warnings.push('Missing telephone property');
  }

  if (!schema.url) {
    result.warnings.push('Missing url property');
  }

  if (!schema.image) {
    result.warnings.push('Missing image property');
  }

  // Restaurant-specific properties
  if (schema['@type'] === 'Restaurant') {
    if (!schema.servesCuisine) {
      result.warnings.push('Restaurant is missing servesCuisine property');
    }

    if (!schema.priceRange) {
      result.warnings.push('Restaurant is missing priceRange property');
    }
  }

  // Check for opening hours
  if (!schema.openingHoursSpecification) {
    result.warnings.push('Missing openingHoursSpecification property');
  }

  // Check for geo coordinates
  if (!schema.geo) {
    result.warnings.push('Missing geo property for map integration');
  }
};

/**
 * Validates an Article or BlogPosting schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateArticleSchema = (schema, result) => {
  // Required properties
  if (!schema.headline) {
    result.valid = false;
    result.errors.push('Missing headline property');
  } else if (schema.headline.length > 110) {
    result.warnings.push('Headline exceeds 110 characters, Google may truncate it');
  }

  if (!schema.author) {
    result.warnings.push('Missing author property');
  } else if (typeof schema.author === 'object') {
    if (!schema.author['@type']) {
      result.warnings.push('Author is missing @type property');
    }
    if (!schema.author.name) {
      result.warnings.push('Author is missing name property');
    }
  }

  // Dates
  if (!schema.datePublished) {
    result.warnings.push('Missing datePublished property');
  }

  if (!schema.dateModified) {
    result.warnings.push('Missing dateModified property');
  }

  // Images
  if (!schema.image) {
    result.warnings.push('Missing image property');
  }

  // Publisher
  if (!schema.publisher) {
    result.warnings.push('Missing publisher property');
  }
};

/**
 * Validates a FAQ schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateFAQSchema = (schema, result) => {
  if (!schema.mainEntity || !Array.isArray(schema.mainEntity)) {
    result.valid = false;
    result.errors.push('FAQPage is missing mainEntity array');
    return;
  }

  schema.mainEntity.forEach((item, index) => {
    if (!item['@type'] || item['@type'] !== 'Question') {
      result.valid = false;
      result.errors.push(`FAQ item ${index} is missing @type: Question`);
    }

    if (!item.name) {
      result.valid = false;
      result.errors.push(`FAQ item ${index} is missing name (question text)`);
    }

    if (!item.acceptedAnswer) {
      result.valid = false;
      result.errors.push(`FAQ item ${index} is missing acceptedAnswer`);
    } else if (typeof item.acceptedAnswer === 'object') {
      if (!item.acceptedAnswer['@type'] || item.acceptedAnswer['@type'] !== 'Answer') {
        result.warnings.push(`FAQ item ${index} answer is missing @type: Answer`);
      }

      if (!item.acceptedAnswer.text) {
        result.warnings.push(`FAQ item ${index} answer is missing text property`);
      }
    }
  });
};

/**
 * Validates a Product schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateProductSchema = (schema, result) => {
  if (!schema.name) {
    result.valid = false;
    result.errors.push('Product is missing name property');
  }

  if (!schema.image) {
    result.warnings.push('Product is missing image property');
  }

  if (!schema.description) {
    result.warnings.push('Product is missing description property');
  }

  // Check offers
  if (!schema.offers) {
    result.warnings.push('Product is missing offers property');
  } else if (typeof schema.offers === 'object') {
    if (!schema.offers.price) {
      result.warnings.push('Product offers is missing price property');
    }

    if (!schema.offers.priceCurrency) {
      result.warnings.push('Product offers is missing priceCurrency property');
    }

    if (!schema.offers.availability) {
      result.warnings.push('Product offers is missing availability property');
    }
  }

  // Check ratings
  if (schema.aggregateRating && typeof schema.aggregateRating === 'object') {
    if (!schema.aggregateRating.ratingValue) {
      result.warnings.push('Product aggregateRating is missing ratingValue property');
    }

    if (!schema.aggregateRating.reviewCount) {
      result.warnings.push('Product aggregateRating is missing reviewCount property');
    }
  }
};

/**
 * Validates a Recipe schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateRecipeSchema = (schema, result) => {
  if (!schema.name) {
    result.valid = false;
    result.errors.push('Recipe is missing name property');
  }

  if (!schema.image) {
    result.warnings.push('Recipe is missing image property');
  }

  if (!schema.recipeIngredient || !Array.isArray(schema.recipeIngredient)) {
    result.warnings.push('Recipe is missing recipeIngredient array');
  }

  if (!schema.recipeInstructions) {
    result.warnings.push('Recipe is missing recipeInstructions');
  }

  if (!schema.cookTime) {
    result.warnings.push('Recipe is missing cookTime property');
  }

  if (!schema.prepTime) {
    result.warnings.push('Recipe is missing prepTime property');
  }

  if (!schema.totalTime) {
    result.warnings.push('Recipe is missing totalTime property');
  }
};

/**
 * Validates an Event schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateEventSchema = (schema, result) => {
  if (!schema.name) {
    result.valid = false;
    result.errors.push('Event is missing name property');
  }

  if (!schema.startDate) {
    result.valid = false;
    result.errors.push('Event is missing startDate property');
  }

  if (!schema.location) {
    result.warnings.push('Event is missing location property');
  } else if (typeof schema.location === 'object') {
    if (!schema.location['@type']) {
      result.warnings.push('Event location is missing @type property');
    }
    if (!schema.location.name) {
      result.warnings.push('Event location is missing name property');
    }
    if (!schema.location.address) {
      result.warnings.push('Event location is missing address property');
    }
  }

  if (!schema.image) {
    result.warnings.push('Event is missing image property');
  }

  if (!schema.description) {
    result.warnings.push('Event is missing description property');
  }

  if (!schema.endDate) {
    result.warnings.push('Event is missing endDate property');
  }

  if (!schema.offers) {
    result.warnings.push('Event is missing offers property');
  }
};

/**
 * Validates a Website schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateWebsiteSchema = (schema, result) => {
  if (!schema.name) {
    result.valid = false;
    result.errors.push('WebSite is missing name property');
  }

  if (!schema.url) {
    result.valid = false;
    result.errors.push('WebSite is missing url property');
  }

  if (!schema.potentialAction) {
    result.warnings.push('WebSite is missing potentialAction (SearchAction) property');
  } else if (Array.isArray(schema.potentialAction)) {
    const hasSearchAction = schema.potentialAction.some(
      action => action['@type'] === 'SearchAction'
    );
    if (!hasSearchAction) {
      result.warnings.push('WebSite should have a SearchAction in potentialAction');
    }
  } else if (schema.potentialAction['@type'] !== 'SearchAction') {
    result.warnings.push('WebSite should have a SearchAction in potentialAction');
  }
};

/**
 * Validates an Organization schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateOrganizationSchema = (schema, result) => {
  if (!schema.name) {
    result.valid = false;
    result.errors.push('Organization is missing name property');
  }

  if (!schema.url) {
    result.warnings.push('Organization is missing url property');
  }

  if (!schema.logo) {
    result.warnings.push('Organization is missing logo property');
  }

  if (!schema.contactPoint) {
    result.warnings.push('Organization is missing contactPoint property');
  }

  if (!schema.sameAs || !Array.isArray(schema.sameAs) || schema.sameAs.length === 0) {
    result.warnings.push('Organization should have sameAs array with social profiles');
  }
};

/**
 * Validates all schemas on the current page
 * @returns {Promise<Array>} - Array of validation results
 */
export const validateCurrentPageSchemas = async () => {
  // Find all script tags with type="application/ld+json"
  const scripts = document.querySelectorAll('script[type="application/ld+json"]');
  const results = [];

  // Validate each schema
  scripts.forEach((script) => {
    try {
      const schema = JSON.parse(script.textContent);
      const result = validateSchema(schema);
      results.push({
        schema,
        result
      });
    } catch (error) {
      results.push({
        schema: null,
        result: {
          valid: false,
          errors: [`Failed to parse schema: ${error.message}`],
          warnings: []
        }
      });
    }
  });

  return results;
};

/**
 * Validates a BreadcrumbList schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateBreadcrumbListSchema = (schema, result) => {
  // Check for itemListElement
  if (!schema.itemListElement) {
    result.valid = false;
    result.errors.push('BreadcrumbList is missing itemListElement property');
    return;
  }
  
  // Check if itemListElement is an array
  if (!Array.isArray(schema.itemListElement)) {
    result.valid = false;
    result.errors.push('BreadcrumbList itemListElement should be an array');
    return;
  }
  
  // Check each breadcrumb item
  schema.itemListElement.forEach((item, index) => {
    if (!item['@type'] || item['@type'] !== 'ListItem') {
      result.warnings.push(`BreadcrumbList item ${index} is not of type ListItem`);
    }
    
    if (!item.position) {
      result.warnings.push(`BreadcrumbList item ${index} is missing position property`);
    } else if (typeof item.position !== 'number') {
      result.warnings.push(`BreadcrumbList item ${index} position should be a number`);
    }
    
    // Check for name (either directly or in item.item)
    if (!item.name && !(item.item && item.item.name)) {
      result.warnings.push(`BreadcrumbList item ${index} is missing name property`);
    }
    
    // Check for URL (either as @id or url in item.item)
    if (!item.item) {
      result.warnings.push(`BreadcrumbList item ${index} is missing item property`);
    } else if (!item.item['@id'] && !item.item.url) {
      result.warnings.push(`BreadcrumbList item ${index} is missing URL (@id or url property)`);
    }
  });
};

/**
 * Validates a Menu or MenuSection schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateMenuSchema = (schema, result) => {
  // Check for name
  if (!schema.name) {
    result.warnings.push('Menu is missing name property');
  }
  
  // Check for hasMenuSection
  if (schema['@type'] === 'Menu' && !schema.hasMenuSection) {
    result.warnings.push('Menu is missing hasMenuSection property');
  }
  
  // Check for hasMenuItem
  if (schema['@type'] === 'MenuSection' && !schema.hasMenuItem) {
    result.warnings.push('MenuSection is missing hasMenuItem property');
  }
  
  // Validate menu sections
  if (schema.hasMenuSection) {
    if (!Array.isArray(schema.hasMenuSection)) {
      result.warnings.push('Menu hasMenuSection should be an array');
    } else {
      schema.hasMenuSection.forEach((section, index) => {
        if (!section['@type'] || section['@type'] !== 'MenuSection') {
          result.warnings.push(`Menu section ${index} is not of type MenuSection`);
        }
        
        if (!section.name) {
          result.warnings.push(`Menu section ${index} is missing name property`);
        }
      });
    }
  }
  
  // Validate menu items
  if (schema.hasMenuItem) {
    if (!Array.isArray(schema.hasMenuItem)) {
      result.warnings.push('MenuSection hasMenuItem should be an array');
    } else {
      schema.hasMenuItem.forEach((item, index) => {
        if (!item['@type'] || item['@type'] !== 'MenuItem') {
          result.warnings.push(`Menu item ${index} is not of type MenuItem`);
        }
        
        if (!item.name) {
          result.warnings.push(`Menu item ${index} is missing name property`);
        }
        
        if (!item.offers) {
          result.warnings.push(`Menu item ${index} is missing offers property`);
        } else if (!item.offers.price) {
          result.warnings.push(`Menu item ${index} offers is missing price property`);
        }
      });
    }
  }
};

/**
 * Validates an ItemList schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateItemListSchema = (schema, result) => {
  // Check for itemListElement
  if (!schema.itemListElement) {
    result.valid = false;
    result.errors.push('ItemList is missing itemListElement property');
    return;
  }
  
  // Check if itemListElement is an array
  if (!Array.isArray(schema.itemListElement)) {
    result.valid = false;
    result.errors.push('ItemList itemListElement should be an array');
    return;
  }
  
  // Check each list item
  schema.itemListElement.forEach((item, index) => {
    if (!item['@type']) {
      result.warnings.push(`ItemList item ${index} is missing @type property`);
    }
    
    // Different validation based on item type
    if (item['@type'] === 'ListItem') {
      if (!item.position) {
        result.warnings.push(`ItemList item ${index} is missing position property`);
      }
      
      if (!item.item) {
        result.warnings.push(`ItemList item ${index} is missing item property`);
      }
    } else {
      // For other types of items, check for common properties
      if (!item.name) {
        result.warnings.push(`ItemList item ${index} is missing name property`);
      }
      
      if (!item.url && !item['@id']) {
        result.warnings.push(`ItemList item ${index} is missing URL (url or @id property)`);
      }
    }
  });
};

/**
 * Validates a Service schema
 * @param {Object} schema - The schema to validate
 * @param {Object} result - The validation result object
 */
const validateServiceSchema = (schema, result) => {
  // Check for name
  if (!schema.name) {
    result.valid = false;
    result.errors.push('Service is missing name property');
  }
  
  // Check for description
  if (!schema.description) {
    result.warnings.push('Service is missing description property');
  }
  
  // Check for provider
  if (!schema.provider) {
    result.warnings.push('Service is missing provider property');
  } else if (typeof schema.provider === 'object') {
    if (!schema.provider['@type']) {
      result.warnings.push('Service provider is missing @type property');
    }
    
    if (!schema.provider.name) {
      result.warnings.push('Service provider is missing name property');
    }
  }
  
  // Check for service area
  if (!schema.areaServed) {
    result.info.push('Consider adding areaServed property to specify service coverage area');
  }
  
  // Check for offers
  if (!schema.offers) {
    result.info.push('Consider adding offers property with pricing information');
  }
};

/**
 * Updates the validateCurrentPageSchemas function to include pathname
 * @returns {Promise<Array>} - Array of validation results
 */
const validateCurrentPageSchemas = async () => {
  try {
    // Extract all JSON-LD scripts from the page
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    const results = [];
    
    // Get current pathname
    const pathname = window.location.pathname;
    
    // Parse and validate each script
    for (const script of scripts) {
      try {
        const schema = JSON.parse(script.textContent);
        const result = validateSchema(schema, pathname);
        results.push({
          schema,
          result
        });
      } catch (error) {
        results.push({
          schema: null,
          result: {
            valid: false,
            errors: [`Parse error: ${error.message}`],
            warnings: [],
            info: [],
            schemaType: null
          }
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error validating schemas:', error);
    return [];
  }
};

export default {
  validateSchema,
  validateCurrentPageSchemas
};
