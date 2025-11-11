# Backend Troubleshooting Guide

## Quick Health Checks

### 1. Test Backend Health Endpoint
```bash
curl -i https://fullstack-dealshop2.onrender.com/health
```

### 2. Test API Endpoint
```bash
curl -v https://fullstack-dealshop2.onrender.com/products/
```

### 3. Check SSL Certificate
```bash
openssl s_client -showcerts -connect fullstack-dealshop2.onrender.com:443
```

## Common Issues & Fixes

### Mixed Content (HTTP vs HTTPS)
- **Problem**: Frontend served over HTTPS calls HTTP backend
- **Solution**: All API calls use HTTPS (already configured in `src/lib/api.ts`)
- **Verify**: Check browser console for "Mixed Content" warnings

### CORS Issues
- **Symptoms**: Network errors in browser console, "Access-Control-Allow-Origin" errors
- **Backend Fix**: Ensure backend sets:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "https://your-frontend.onrender.com",
      "https://dealshop.onrender.com",  # Add your frontend URL
  ]
  ```
- **Test**: Check Network tab in browser DevTools for CORS headers

### Backend Not Responding
- **Check Render Logs**: Render Dashboard → Your Service → Logs
- **Common Causes**:
  - Process crashes (check for stack traces)
  - Port binding errors (must use `process.env.PORT`)
  - Missing environment variables
  - Database connection issues

### SSL Certificate Issues
- **Verify**: Certificate should be valid and not expired
- **Test**: Use `openssl s_client` command above
- **Render**: Render provides SSL certificates automatically for `.onrender.com` domains

### Environment Variables
- **Frontend**: Check `render.yaml` for `VITE_API_BASE_URL`
- **Backend**: Verify all required env vars are set in Render dashboard
- **Common Missing**: Database URL, API keys, secret keys

## Debugging Steps

1. **Check Browser Console**
   - Open DevTools → Console
   - Look for errors, warnings, or network failures
   - Check for CORS, mixed content, or SSL errors

2. **Check Network Tab**
   - Open DevTools → Network
   - Reload page
   - Check failing requests:
     - Status code (4xx, 5xx)
     - Response body
     - Request headers
     - CORS headers

3. **Check Render Logs**
   - Render Dashboard → Service → Logs
   - Look for:
     - Stack traces
     - Error messages
     - Process restarts
     - Memory issues (OOM)

4. **Test Backend Directly**
   - Use `curl` commands above
   - Verify backend is accessible
   - Check response status and body

## Configuration Files

### Frontend (`render.yaml`)
```yaml
envVars:
  - key: VITE_API_BASE_URL
    value: https://fullstack-dealshop2.onrender.com
```

### API Client (`src/lib/api.ts`)
- Automatically converts HTTP to HTTPS
- Enhanced error logging
- Network error diagnostics

## Testing Commands

```bash
# Health check
curl -i https://fullstack-dealshop2.onrender.com/health

# Get products
curl https://fullstack-dealshop2.onrender.com/products/

# Check SSL
openssl s_client -showcerts -connect fullstack-dealshop2.onrender.com:443

# Verbose request
curl -v https://fullstack-dealshop2.onrender.com/products/
```

## Render Service Checklist

- [ ] Service is running (not crashed)
- [ ] Using `process.env.PORT` (not hardcoded port)
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] Database connection working
- [ ] SSL certificate valid
- [ ] Service logs show no errors
- [ ] Health endpoint returns 200 OK

## Frontend Checklist

- [ ] API URL uses HTTPS
- [ ] No HTTP URLs in API calls
- [ ] Environment variables set in `render.yaml`
- [ ] Browser console shows no errors
- [ ] Network tab shows successful requests
- [ ] No mixed content warnings
- [ ] No CORS errors

