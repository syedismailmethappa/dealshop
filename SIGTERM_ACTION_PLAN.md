# SIGTERM Error - Action Plan

## Current Status ✅
- **Backend is responding**: `https://fullstack-dealshop2.onrender.com/products/` returns 200 OK
- **Service is running**: Workers are being restarted automatically
- **Issue**: Workers are being killed (SIGTERM) but service recovers

## Root Cause Analysis

The SIGTERM errors indicate workers are being terminated, likely due to:

1. **Memory Limits (Most Likely)**
   - Free tier: 512MB RAM
   - Multiple workers consuming too much memory
   - Solution: Reduce worker count to 2

2. **Health Check Timeouts**
   - Workers not responding to health checks in time
   - Solution: Add/fix health endpoint, reduce timeout

3. **Long-Running Requests**
   - Requests taking too long (> 30 seconds)
   - Solution: Optimize database queries, add timeouts

## Immediate Actions Required

### Step 1: Check Render Logs
1. Go to Render Dashboard
2. Select `fullstack-dealshop2` service
3. Click **Logs** tab
4. Look for errors **BEFORE** SIGTERM:
   - "Out of memory" messages
   - Stack traces
   - Database errors
   - Timeout errors

### Step 2: Check Service Metrics
1. Render Dashboard → Service → **Metrics**
2. Check:
   - Memory usage (should be < 80%)
   - CPU usage
   - Error rate
   - Request rate

### Step 3: Backend Configuration Changes

#### Option A: Reduce Worker Count (Quick Fix)
**Backend repository change needed:**
```python
# gunicorn_config.py or startup command
workers = 2  # Change from 4+ to 2
worker_class = "sync"
timeout = 30
graceful_timeout = 30
```

#### Option B: Add Health Endpoint (If Missing)
```python
# Django/Flask/FastAPI
@app.route('/health')
def health():
    return {'status': 'ok'}, 200
```

**Render Settings:**
- Health Check Path: `/health`
- Health Check Interval: 30 seconds
- Health Check Timeout: 10 seconds

#### Option C: Upgrade Render Plan
- Free tier: 512MB RAM (limited)
- Starter: $7/month - Better performance
- Standard: $25/month - 2GB RAM, more resources

## Testing Commands

```powershell
# Test backend health (PowerShell)
Invoke-WebRequest -Uri "https://fullstack-dealshop2.onrender.com/health" -Method GET

# Test products endpoint
Invoke-WebRequest -Uri "https://fullstack-dealshop2.onrender.com/products/" -Method GET

# Check response time
Measure-Command { Invoke-WebRequest -Uri "https://fullstack-dealshop2.onrender.com/products/" }
```

## Backend Repository Location

The backend code is in a **separate repository**. You need to:

1. **Find the backend repository**
2. **Check Gunicorn configuration**
3. **Apply fixes** (reduce workers, add health endpoint)
4. **Redeploy** to Render

## If You Don't Have Backend Access

1. **Contact backend developer** with:
   - Error logs from Render
   - Service metrics screenshot
   - This action plan

2. **Share these files**:
   - `BACKEND_SIGTERM_FIX.md` - Detailed fix guide
   - `BACKEND_TROUBLESHOOTING.md` - Complete troubleshooting guide

## Expected Outcome

After applying fixes:
- ✅ No SIGTERM errors in logs
- ✅ Stable worker processes
- ✅ Health checks passing
- ✅ Memory usage < 80%
- ✅ Fast response times

## Monitoring

After fixes are deployed:
1. Monitor Render logs for 24 hours
2. Check service metrics regularly
3. Verify no SIGTERM errors
4. Confirm stable performance

## Next Steps

1. ✅ **Check Render logs** for root cause
2. ✅ **Check service metrics** for memory/CPU usage
3. ⏳ **Apply backend fixes** (reduce workers, health endpoint)
4. ⏳ **Redeploy backend** to Render
5. ⏳ **Monitor** for 24 hours

## Files Created

- `BACKEND_SIGTERM_FIX.md` - Detailed SIGTERM fix guide
- `BACKEND_TROUBLESHOOTING.md` - Complete troubleshooting guide (updated)
- `SIGTERM_ACTION_PLAN.md` - This action plan

## Quick Reference

**Backend URL**: `https://fullstack-dealshop2.onrender.com`
**Frontend URL**: Your frontend Render URL
**Error**: `[ERROR] Worker (pid:XX) was sent SIGTERM!`
**Status**: Service running but workers being killed
**Priority**: Medium (service recovers, but needs optimization)

