# Instagram Feed Setup Guide

## Overview
This guide will help you set up Instagram Graph API integration for your professional Instagram account to display posts on your website.

## Prerequisites
- Instagram Professional Account (Business or Creator)
- Facebook Developer Account
- Facebook Page connected to your Instagram account

## Step 1: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App" 
3. Choose "Consumer" as app type
4. Fill in app details:
   - App Name: "Istanbul Mediterranean Website"
   - App Contact Email: your email
5. Click "Create App"

## Step 2: Add Instagram Basic Display Product

1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display → Basic Display

## Step 3: Create Instagram App

1. In Instagram Basic Display settings
2. Click "Create New App"
3. Fill in details:
   - Display Name: "Istanbul Mediterranean Website"
   - Valid OAuth Redirect URIs: `https://your-domain.com/auth/callback`
   - Deauthorize Callback URL: `https://your-domain.com/auth/deauthorize`
   - Data Deletion Request URL: `https://your-domain.com/auth/delete`

## Step 4: Get Access Token

### Method 1: Using Graph API Explorer (Recommended)
1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from dropdown
3. Click "Generate Access Token"
4. Select permissions: `instagram_basic`, `pages_show_list`
5. Click "Generate Access Token"
6. Copy the short-lived token

### Method 2: Manual OAuth Flow
1. Visit this URL (replace YOUR_APP_ID and YOUR_REDIRECT_URI):
```
https://api.instagram.com/oauth/authorize?client_id=YOUR_APP_ID&redirect_uri=YOUR_REDIRECT_URI&scope=user_profile,user_media&response_type=code
```

### Quick Setup for @istanbulinvegas
Since your Instagram is https://www.instagram.com/istanbulinvegas/, make sure to:
1. Use the Instagram account connected to this profile
2. Ensure it's converted to a Professional (Business/Creator) account
3. Connect it to a Facebook Page if not already done
2. Authorize the app
3. Get authorization code from redirect
4. Exchange for access token using:
```bash
curl -X POST https://api.instagram.com/oauth/access_token \
  -F client_id=YOUR_APP_ID \
  -F client_secret=YOUR_APP_SECRET \
  -F grant_type=authorization_code \
  -F redirect_uri=YOUR_REDIRECT_URI \
  -F code=AUTHORIZATION_CODE
```

## Step 5: Get Long-Lived Access Token

Exchange short-lived token for long-lived (60 days):

```bash
curl -i -X GET "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=YOUR_APP_SECRET&access_token=SHORT_LIVED_TOKEN"
```

## Step 6: Get User ID

Get your Instagram User ID:

```bash
curl -i -X GET "https://graph.instagram.com/me?fields=id,username&access_token=YOUR_ACCESS_TOKEN"
```

## Step 7: Environment Variables

Add these to your `.env` file:

```env
REACT_APP_INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
REACT_APP_INSTAGRAM_USER_ID=your_instagram_user_id_here
```

## Step 8: Test the Integration

Test your API access:

```bash
curl -i -X GET "https://graph.instagram.com/YOUR_USER_ID/media?fields=id,caption,media_type,media_url,permalink&access_token=YOUR_ACCESS_TOKEN"
```

## Step 9: Token Refresh (Important!)

Long-lived tokens expire after 60 days. Set up automatic refresh:

```bash
curl -i -X GET "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=YOUR_ACCESS_TOKEN"
```

## Security Best Practices

1. **Never commit tokens to git** - use environment variables
2. **Implement token refresh** - tokens expire every 60 days
3. **Add error handling** - API can be rate limited
4. **Use HTTPS only** - for production deployments
5. **Validate API responses** - check for errors before processing

## Common Issues & Solutions

### "Invalid Access Token"
- Token may have expired (60 day limit)
- Refresh the token or generate a new one
- Ensure account is still connected to Facebook page

### "User not found" 
- Verify Instagram account is Professional (Business/Creator)
- Check if account is connected to Facebook page
- Confirm User ID is correct

### Rate Limiting
- Instagram allows 200 requests per hour per user
- Implement caching to reduce API calls
- Add exponential backoff for failed requests

### CORS Issues
- Instagram Graph API supports CORS for browser requests
- No server proxy needed for basic requests

## Monitoring & Maintenance

1. **Monitor API usage** in Facebook Developer Console
2. **Set up alerts** for token expiration
3. **Log errors** for debugging
4. **Test regularly** to catch issues early

## Support

- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api/)
- [Facebook Developer Community](https://developers.facebook.com/community/)
- [Instagram API Status](https://developers.facebook.com/status/)

## Implementation Notes

The InstagramFeed component is already set up to:
- ✅ Handle loading states with skeleton UI
- ✅ Show graceful error messages
- ✅ Display engagement metrics (likes, comments)
- ✅ Support both images and videos
- ✅ Responsive grid layout
- ✅ Hover effects and animations
- ✅ Direct links to Instagram posts
- ✅ Automatic image optimization