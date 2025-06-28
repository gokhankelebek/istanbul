# Structured Data Report for /turkishfood

Generated on: 6/29/2025, 2:11:34 AM

## Expected Schema Types

The following schema types are expected for this route:

- Article
- BreadcrumbList

## Missing Schema Types

⚠️ The following expected schema types were not found:

- Article
- BreadcrumbList

## Found 1 JSON-LD block(s)

### JSON-LD Block 1

**Type**: Restaurant

**Validation**: ✅ Valid

**Warnings**:

- ⚠️ Schema type 'Restaurant' is not expected for route '/turkishfood'. Expected types: Article, BreadcrumbList

**Recommendations**:

- ℹ️ Restaurant: Adding aggregateRating can improve rich results display
- ℹ️ Restaurant: Adding reviews can improve rich results display

**JSON-LD Content**:

```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Istanbul Mediterranean Doner",
  "image": "/doner-og.jpg",
  "servesCuisine": "Turkish, Mediterranean",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Doner St",
    "addressLocality": "Las Vegas",
    "addressRegion": "NV",
    "postalCode": "89109"
  },
  "url": "https://www.istanbullv.com",
  "telephone": "+1-702-555-1234",
  "priceRange": "$",
  "sameAs": [
    "https://www.instagram.com/istanbulmedlv",
    "https://www.facebook.com/istanbulmedlv"
  ]
}
```

## Summary

- Total JSON-LD blocks: 1
- Schema types found: Restaurant
- Total errors: 0
- Total warnings: 1

⚠️ **Structured data is valid but has warnings to address.**
