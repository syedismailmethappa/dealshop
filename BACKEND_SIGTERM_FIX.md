# Backend SIGTERM Error - Quick Fix Guide

## Error Message
```
[ERROR] Worker (pid:42) was sent SIGTERM!
[ERROR] Worker (pid:43) was sent SIGTERM
```

## Immediate Actions

### 1. Check Render Logs (Priority)
1. Go to Render Dashboard → `fullstack-dealshop2` service → **Logs**
2. Look for errors **BEFORE** the SIGTERM:
   - Stack traces
   - "Out of memory" messages
   - Database connection errors
   - Unhandled exceptions
   - Timeout errors

### 2. Check Service Metrics
1. Render Dashboard → Service → **Metrics**
2. Check:
   - **Memory usage** (should be < 80% of limit)
   - **CPU usage**
   - **Request rate**
   - **Error rate**

### 3. Common Fixes

#### Fix 1: Reduce Gunicorn Workers (If Memory Issue)
**Backend code change needed:**
```python
# If using command line:
gunicorn app:app --workers 2 --worker-class sync --bind 0.0.0.0:$PORT

# If using gunicorn_config.py:
workers = 2  # Reduce from 4+ to 2 for 512MB RAM
worker_class = "sync"
bind = f"0.0.0.0:{os.environ.get('PORT', '8000')}"
timeout = 30
graceful_timeout = 30
keepalive = 5
```

#### Fix 2: Add Health Endpoint (If Health Check Failing)
**Backend code change needed:**
```python
# Django
# urls.py
from django.http import JsonResponse

def health(request):
    return JsonResponse({'status': 'ok'}, status=200)

# Flask
@app.route('/health')
def health():
    return {'status': 'ok'}, 200

# FastAPI
@app.get('/health')
def health():
    return {'status': 'ok'}
```

**Render Settings:**
- Health Check Path: `/health`
- Health Check Interval: 30 seconds
- Health Check Timeout: 10 seconds

#### Fix 3: Fix Memory Leaks
**Check for:**
- Unclosed database connections
- Large objects not being garbage collected
- Caching without limits
- Unbounded loops or recursive calls

**Add memory monitoring:**
```python
import psutil
import os

def get_memory_usage():
    process = psutil.Process(os.getpid())
    return process.memory_info().rss / 1024 / 1024  # MB

# Log memory usage periodically
logger.info(f"Memory usage: {get_memory_usage()} MB")
```

#### Fix 4: Optimize Database Queries
- Use `select_related()` or `prefetch_related()` in Django
- Use pagination for large datasets
- Add database indexes
- Use connection pooling
- Cache frequent queries

#### Fix 5: Upgrade Render Plan
- **Free tier**: 512MB RAM, 0.1 CPU (very limited)
- **Starter**: $7/month - 512MB RAM, better performance
- **Standard**: $25/month - 2GB RAM, more workers

## Diagnostic Commands

### Check Backend Health
```bash
curl -i https://fullstack-dealshop2.onrender.com/health
```

### Check Response Time
```bash
time curl https://fullstack-dealshop2.onrender.com/products/
```

### Check if Service is Up
```bash
curl -v https://fullstack-dealshop2.onrender.com/
```

## Backend Configuration Checklist

### Gunicorn Configuration
- [ ] Workers set to 2 (for 512MB RAM) or 4 (for 1GB+)
- [ ] Worker class is appropriate (sync for CPU-bound, gevent for I/O-bound)
- [ ] Timeout is set (30 seconds)
- [ ] Graceful timeout is set (30 seconds)
- [ ] Bind to `0.0.0.0:$PORT`

### Application Configuration
- [ ] Health endpoint exists and responds quickly
- [ ] Error handling for all routes
- [ ] Database connection pooling enabled
- [ ] Request size limits set
- [ ] Logging configured properly

### Environment Variables
- [ ] `PORT` is used (not hardcoded)
- [ ] Database URL is set
- [ ] All required secrets are set
- [ ] CORS origins are configured

## Next Steps

1. **Check backend repository** for Gunicorn configuration
2. **Review backend logs** for errors before SIGTERM
3. **Check Render metrics** for memory/CPU usage
4. **Apply fixes** based on root cause
5. **Monitor** after fixes are deployed

## Backend Repository Location
The backend code is in a separate repository. Check:
- Gunicorn configuration file
- Worker settings
- Health endpoint implementation
- Error handling
- Database query optimization

## Contact Backend Developer
If you don't have access to the backend repository, contact the backend developer with:
- Error logs from Render
- Service metrics screenshot
- This troubleshooting guide

