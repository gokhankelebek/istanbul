import React from "react";
import { Helmet } from "react-helmet";

/**
 * StructuredDataManager Component
 *
 * A centralized component for managing all structured data (JSON-LD) across the site.
 * This component makes it easy to implement and maintain complex structured data
 * that helps search engines better understand your content.
 *
 * @param {Object} props - Component props
 * @param {string} props.type - Type of structured data to render (restaurant, article, faq, etc.)
 * @param {Object} props.data - Data to use for the structured data
 * @param {boolean} props.aggregate - Whether to aggregate multiple schema types
 * @returns {JSX.Element} - Helmet component with JSON-LD script
 */
const StructuredDataManager = ({ type, data, aggregate = false }) => {
  // Generate the appropriate structured data based on type
  const generateStructuredData = () => {
    switch (type) {
      case "restaurant":
        return generateRestaurantData(data);
      case "localBusiness":
        return generateLocalBusinessData(data);
      case "article":
        return generateArticleData(data);
      case "aboutPage":
        return generateAboutPageData(data);
      case "blog":
        return generateBlogData(data);
      case "itemList":
        return generateItemListData(data);
      case "breadcrumb":
        return generateBreadcrumbData(data);
      case "faq":
        return generateFAQData(data);
      case "service":
        return generateServiceData(data);
      case "product":
        return generateProductData(data);
      case "event":
        return generateEventData(data);
      case "recipe":
        return generateRecipeData(data);
      case "organization":
        return generateOrganizationData(data);
      case "website":
        return generateWebsiteData(data);
      case "aggregate":
        return generateAggregateData(data);
      default:
        return {};
    }
  };

  // Restaurant structured data
  const generateRestaurantData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: data.name || "Istanbul Mediterranean Restaurant",
      image:
        data.image ||
        "https://www.istanbullv.com/images/restaurant-exterior.jpg",
      "@id": data.url || "https://www.istanbullv.com/#restaurant",
      url: data.url || "https://www.istanbullv.com",
      telephone: data.telephone || "+17259008844",
      priceRange: data.priceRange || "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          data.address?.streetAddress || "3615 S Las Vegas Blvd #101",
        addressLocality: data.address?.addressLocality || "Las Vegas",
        addressRegion: data.address?.addressRegion || "NV",
        postalCode: data.address?.postalCode || "89109",
        addressCountry: data.address?.addressCountry || "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.geo?.latitude || 36.0944,
        longitude: data.geo?.longitude || -115.1745,
      },
      openingHoursSpecification: data.openingHours || [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "11:00",
          closes: "05:00",
        },
      ],
      servesCuisine: data.servesCuisine || [
        "Turkish",
        "Mediterranean",
        "Middle Eastern",
        "Halal",
      ],
      menu: data.menu || "https://www.istanbullv.com/menu",
      acceptsReservations: data.acceptsReservations || "True",
      hasMap: data.hasMap || "https://www.google.com/maps?cid=123456789",
      aggregateRating: data.aggregateRating || {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "350",
      },
      review: data.reviews || [
        {
          "@type": "Review",
          author: {
            "@type": "Person",
            name: "John Smith",
          },
          datePublished: "2023-04-15",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
          },
          reviewBody:
            "Best Turkish food in Las Vegas! The döner kebab is amazing.",
        },
      ],
    };
  };

  // Local Business structured data
  const generateLocalBusinessData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: data.name || "Istanbul Mediterranean Restaurant",
      image:
        data.image ||
        "https://www.istanbullv.com/images/restaurant-exterior.jpg",
      "@id": data.url || "https://www.istanbullv.com/#localbusiness",
      url: data.url || "https://www.istanbullv.com",
      telephone: data.telephone || "+17259008844",
      priceRange: data.priceRange || "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress:
          data.address?.streetAddress || "3615 S Las Vegas Blvd #101",
        addressLocality: data.address?.addressLocality || "Las Vegas",
        addressRegion: data.address?.addressRegion || "NV",
        postalCode: data.address?.postalCode || "89109",
        addressCountry: data.address?.addressCountry || "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.geo?.latitude || 36.0944,
        longitude: data.geo?.longitude || -115.1745,
      },
      openingHoursSpecification: data.openingHours || [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "11:00",
          closes: "05:00",
        },
      ],
      sameAs: data.socialLinks || [
        "https://www.facebook.com/istanbulmediterranean",
        "https://www.instagram.com/istanbulmediterranean",
        "https://twitter.com/istanbulmedlv",
      ],
    };
  };

  // Article structured data
  const generateArticleData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: data.headline || "Default Article Title",
      image: data.image || [
        "https://www.istanbullv.com/images/blog/article-main.jpg",
      ],
      datePublished: data.datePublished || "2023-01-01T08:00:00+08:00",
      dateModified: data.dateModified || "2023-01-02T08:00:00+08:00",
      author: {
        "@type": "Person",
        name: data.author?.name || "Istanbul Mediterranean",
        url: data.author?.url || "https://www.istanbullv.com/about",
      },
      publisher: {
        "@type": "Organization",
        name: data.publisher?.name || "Istanbul Mediterranean Restaurant",
        logo: {
          "@type": "ImageObject",
          url: data.publisher?.logo || "https://www.istanbullv.com/logo.png",
        },
      },
      description: data.description || "Default article description",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url || "https://www.istanbullv.com/blog/article",
      },
    };
  };

  // AboutPage structured data
  const generateAboutPageData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: data.name || "About Istanbul Mediterranean",
      description:
        data.description ||
        "Learn about Istanbul Mediterranean—our story, mission, and commitment to serving the best Turkish and Mediterranean cuisine in Las Vegas.",
      url: data.url || "https://www.istanbullv.com/about",
      mainEntity: data.mainEntity || {
        "@type": "Organization",
        name: "Istanbul Mediterranean Restaurant",
      },
    };
  };

  // Blog structured data
  const generateBlogData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: data.name || "Istanbul Mediterranean Blog",
      description:
        data.description ||
        "Stories, flavors, and Mediterranean inspiration from Las Vegas",
      url: data.url || "https://www.istanbullv.com/blog",
      author: {
        "@type": "Person",
        name: data.author?.name || "Istanbul Mediterranean Team",
        url: data.author?.url || "https://www.istanbullv.com/about",
      },
      publisher: {
        "@type": "Organization",
        name: data.publisher?.name || "Istanbul Mediterranean Restaurant",
        logo: {
          "@type": "ImageObject",
          url: data.publisher?.logo || "https://www.istanbullv.com/logo.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": data.url || "https://www.istanbullv.com/blog",
      },
    };
  };

  // ItemList structured data
  const generateItemListData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: data.name || "Blog Posts",
      description:
        data.description ||
        "Latest articles about Turkish food, Mediterranean cuisine, and halal dining in Las Vegas",
      numberOfItems: data.numberOfItems || 0,
      itemListElement: data.itemListElement || [],
    };
  };

  // Breadcrumb structured data
  const generateBreadcrumbData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: data.itemListElement || [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.istanbullv.com",
        },
      ],
    };
  };

  // FAQ structured data
  const generateFAQData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.questions?.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: q.answer,
        },
      })) || [
        {
          "@type": "Question",
          name: "What are your opening hours?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We are open daily from 11:00 AM to 5:00 AM.",
          },
        },
      ],
    };
  };

  // Service structured data
  const generateServiceData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.name || "Turkish Food Delivery Service",
      description:
        data.description || "Vegas most-craved döner delivered till 4:30 AM",
      provider: data.provider || {
        "@type": "Restaurant",
        name: "Istanbul Mediterranean Restaurant",
      },
      areaServed: data.areaServed || {
        "@type": "City",
        name: "Las Vegas",
        addressRegion: "NV",
        addressCountry: "US",
      },
      serviceType: data.serviceType || "Food Delivery",
      availableChannel: data.availableChannel || {
        "@type": "ServiceChannel",
        serviceUrl: "https://www.orderdoner.com",
      },
      hoursAvailable: data.hoursAvailable || [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "10:00",
          closes: "04:30",
        },
      ],
    };
  };

  // Product structured data
  const generateProductData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.name || "Döner Kebab",
      image:
        data.image || "https://www.istanbullv.com/images/menu/doner-kebab.jpg",
      description:
        data.description ||
        "Traditional Turkish döner kebab with fresh vegetables and special sauce.",
      sku: data.sku || "DONER001",
      mpn: data.mpn || "DONER001",
      brand: {
        "@type": "Brand",
        name: data.brand?.name || "Istanbul Mediterranean",
      },
      offers: {
        "@type": "Offer",
        url: data.url || "https://www.istanbullv.com/menu/doner-kebab",
        priceCurrency: data.offers?.priceCurrency || "USD",
        price: data.offers?.price || "12.99",
        availability: data.offers?.availability || "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
      aggregateRating: data.aggregateRating || {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "250",
      },
    };
  };

  // Event structured data
  const generateEventData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Event",
      name: data.name || "Turkish Night at Istanbul Mediterranean",
      startDate: data.startDate || "2023-07-15T19:00",
      endDate: data.endDate || "2023-07-15T23:00",
      location: {
        "@type": "Place",
        name: data.location?.name || "Istanbul Mediterranean Restaurant",
        address: {
          "@type": "PostalAddress",
          streetAddress:
            data.location?.address?.streetAddress ||
            "3615 S Las Vegas Blvd #101",
          addressLocality:
            data.location?.address?.addressLocality || "Las Vegas",
          addressRegion: data.location?.address?.addressRegion || "NV",
          postalCode: data.location?.address?.postalCode || "89109",
          addressCountry: data.location?.address?.addressCountry || "US",
        },
      },
      image:
        data.image ||
        "https://www.istanbullv.com/images/events/turkish-night.jpg",
      description:
        data.description ||
        "Join us for a special Turkish Night featuring live music, traditional dance performances, and a special menu.",
      offers: {
        "@type": "Offer",
        url:
          data.offers?.url || "https://www.istanbullv.com/events/turkish-night",
        price: data.offers?.price || "25",
        priceCurrency: data.offers?.priceCurrency || "USD",
        availability: "https://schema.org/InStock",
        validFrom: data.offers?.validFrom || "2023-06-01T00:00",
      },
      performer: {
        "@type": "PerformingGroup",
        name: data.performer?.name || "Traditional Turkish Music Ensemble",
      },
    };
  };

  // Recipe structured data
  const generateRecipeData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: data.name || "Authentic Turkish Baklava",
      image:
        data.image || "https://www.istanbullv.com/images/recipes/baklava.jpg",
      author: {
        "@type": "Person",
        name: data.author?.name || "Chef Mehmet",
      },
      datePublished: data.datePublished || "2023-02-15",
      description:
        data.description ||
        "Learn how to make authentic Turkish baklava with this traditional recipe.",
      prepTime: data.prepTime || "PT30M",
      cookTime: data.cookTime || "PT45M",
      totalTime: data.totalTime || "PT75M",
      recipeYield: data.recipeYield || "8 servings",
      recipeCategory: data.recipeCategory || "Dessert",
      recipeCuisine: data.recipeCuisine || "Turkish",
      recipeIngredient: data.recipeIngredient || [
        "1 package phyllo dough",
        "2 cups chopped nuts",
        "1 cup butter",
        "1 cup sugar",
        "1 cup water",
        "1/2 cup honey",
        "1 teaspoon vanilla extract",
        "1 teaspoon ground cinnamon",
      ],
      recipeInstructions: data.recipeInstructions?.map((step) => ({
        "@type": "HowToStep",
        text: step,
      })) || [
        {
          "@type": "HowToStep",
          text: "Preheat oven to 350 degrees F (175 degrees C).",
        },
        {
          "@type": "HowToStep",
          text: "Butter the bottoms and sides of a 9x13 inch pan.",
        },
      ],
      nutrition: {
        "@type": "NutritionInformation",
        calories: data.nutrition?.calories || "450 calories",
        fatContent: data.nutrition?.fatContent || "25 g",
        carbohydrateContent: data.nutrition?.carbohydrateContent || "50 g",
        proteinContent: data.nutrition?.proteinContent || "8 g",
      },
    };
  };

  // Organization structured data
  const generateOrganizationData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: data.name || "Istanbul Mediterranean Restaurant",
      url: data.url || "https://www.istanbullv.com",
      logo: data.logo || "https://www.istanbullv.com/logo.png",
      sameAs: data.socialLinks || [
        "https://www.facebook.com/istanbulmediterranean",
        "https://www.instagram.com/istanbulmediterranean",
        "https://twitter.com/istanbulmedlv",
      ],
      contactPoint: data.contactPoints || [
        {
          "@type": "ContactPoint",
          telephone: "+17259008844",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: ["English", "Turkish"],
        },
      ],
    };
  };

  // Website structured data
  const generateWebsiteData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: data.name || "Istanbul Mediterranean Restaurant",
      url: data.url || "https://www.istanbullv.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            data.searchUrlTemplate ||
            "https://www.istanbullv.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    };
  };

  // Review structured data
  const generateReviewData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "Restaurant",
        name: data.restaurantName || "Istanbul Mediterranean",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3615 S Las Vegas Blvd #101",
          addressLocality: "Las Vegas",
          addressRegion: "NV",
          postalCode: "89109",
          addressCountry: "US",
        },
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: data.ratingValue || "5",
        bestRating: data.bestRating || "5",
      },
      author: {
        "@type": "Person",
        name: data.authorName || "Verified Customer",
      },
      reviewBody:
        data.reviewBody ||
        "Authentic Turkish and Mediterranean food with excellent service. The gyros and baklava are outstanding!",
      datePublished:
        data.datePublished || new Date().toISOString().split("T")[0],
    };
  };

  // Aggregate Rating structured data
  const generateAggregateRatingData = (data) => {
    return {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: data.name || "Istanbul Mediterranean",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3615 S Las Vegas Blvd #101",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89109",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: data.ratingValue || "4.8",
        reviewCount: data.reviewCount || "2000",
        bestRating: data.bestRating || "5",
        worstRating: data.worstRating || "1",
      },
      priceRange: data.priceRange || "$$",
      telephone: "+17259008844",
      url: "https://www.istanbullv.com",
    };
  };

  // Aggregate multiple schema types
  const generateAggregateData = (dataArray) => {
    return {
      "@context": "https://schema.org",
      "@graph": dataArray.map((item) => {
        switch (item.type) {
          case "restaurant":
            return generateRestaurantData(item.data);
          case "localBusiness":
            return generateLocalBusinessData(item.data);
          case "article":
            return generateArticleData(item.data);
          case "aboutPage":
            return generateAboutPageData(item.data);
          case "blog":
            return generateBlogData(item.data);
          case "itemList":
            return generateItemListData(item.data);
          case "breadcrumb":
            return generateBreadcrumbData(item.data);
          case "faq":
            return generateFAQData(item.data);
          case "service":
            return generateServiceData(item.data);
          case "product":
            return generateProductData(item.data);
          case "event":
            return generateEventData(item.data);
          case "recipe":
            return generateRecipeData(item.data);
          case "organization":
            return generateOrganizationData(item.data);
          case "website":
            return generateWebsiteData(item.data);
          case "review":
            return generateReviewData(item.data);
          case "aggregateRating":
            return generateAggregateRatingData(item.data);
          default:
            return {};
        }
      }),
    };
  };

  // Generate the structured data
  const structuredData = generateStructuredData();

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredDataManager;
