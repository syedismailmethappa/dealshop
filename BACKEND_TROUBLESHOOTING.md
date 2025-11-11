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

### ⚠️ SIGTERM Errors (Workers Being Killed)
**Error**: `[ERROR] Worker (pid:XX) was sent SIGTERM!`

**What it means**: Gunicorn workers are being terminated, usually due to:
1. **Out of Memory (OOM)** - Most common cause
2. **Health check failures** - Workers not responding in time
3. **Application crashes** - Unhandled exceptions
4. **Resource limits** - Exceeding Render plan limits
5. **Long-running requests** - Timeouts

**Solutions**:

#### 1. Check Memory Usage
```bash
# In Render logs, look for:
# - "Out of memory" messages
# - Memory usage spikes
# - OOM killer messages
```

**Backend Fixes**:
- **Reduce worker count** in Gunicorn:
  ```python
  # gunicorn_config.py or command
  workers = 2  # Reduce from 4+ to 2
  worker_class = "sync"  # Use sync instead of async if memory is tight
  ```
- **Increase instance size** in Render (Free tier has 512MB RAM)
- **Add memory limits**:
  ```python
  # Limit request size
  limit_request_line = 4094
  limit_request_fields = 100
  ```

#### 2. Fix Health Check Issues
- **Add/Improve health endpoint**:
  ```python
  # Django/Flask health check
  @app.route('/health')
  def health():
      return {'status': 'ok'}, 200
  ```
- **Reduce health check timeout** in Render settings
- **Ensure health endpoint responds quickly** (< 1 second)

#### 3. Fix Application Crashes
- **Check logs for stack traces** before SIGTERM
- **Add error handling** for unhandled exceptions
- **Add request timeouts**:
  ```python
  # Gunicorn config
  timeout = 30  # seconds
  graceful_timeout = 30
  ```

#### 4. Optimize Database Queries
- **Reduce query complexity**
- **Add database connection pooling**
- **Use pagination** for large datasets
- **Cache frequently accessed data**

#### 5. Check Render Service Limits
- **Free tier**: 512MB RAM, 0.1 CPU
- **Upgrade plan** if consistently hitting limits
- **Check service metrics** in Render dashboard

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
  - Port binding errors (must use `process.env.PORT` or `$PORT`)
  - Missing environment variables
  - Database connection issues
  - SIGTERM errors (see above)

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

### General Checks
- [ ] Service is running (not crashed)
- [ ] Using `process.env.PORT` or `$PORT` (not hardcoded port)
- [ ] All environment variables set
- [ ] CORS configured correctly
- [ ] Database connection working
- [ ] SSL certificate valid
- [ ] Service logs show no errors
- [ ] Health endpoint returns 200 OK

### SIGTERM-Specific Checks
- [ ] No "Out of memory" errors in logs
- [ ] Worker count is appropriate for instance size (2 workers for 512MB)
- [ ] Health endpoint responds quickly (< 1 second)
- [ ] No unhandled exceptions in application logs
- [ ] Request timeouts are reasonable (30 seconds)
- [ ] Database queries are optimized
- [ ] Memory usage is below 80% of instance limit
- [ ] Instance size is appropriate (consider upgrading from Free tier)

## Frontend Checklist

- [ ] API URL uses HTTPS
- [ ] No HTTP URLs in API calls
- [ ] Environment variables set in `render.yaml`
- [ ] Browser console shows no errors
- [ ] Network tab shows successful requests
- [ ] No mixed content warnings
- [ ] No CORS errors

