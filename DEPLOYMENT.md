# Backend Deployment Guide

## Vercel Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   Set in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `SESSION_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## Railway Deployment

1. **Connect Repository**
   - Link your GitHub repository to Railway

2. **Environment Variables**
   Set in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `SESSION_SECRET`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

## MongoDB Atlas Setup

1. **Create Cluster**
   - Go to MongoDB Atlas
   - Create new cluster
   - Get connection string

2. **Network Access**
   - Add `0.0.0.0/0` for all IPs (production)
   - Or specific deployment platform IPs

3. **Database User**
   - Create database user with read/write permissions