# Deployment Checklist

Complete this checklist before deploying your Random Name Picker to production.

## Pre-Deployment

### Code Quality
- [ ] Run tests (if any): `pnpm test`
- [ ] Check for linting errors: `pnpm lint`
- [ ] Build locally: `pnpm build`
- [ ] Test locally: `pnpm dev`
- [ ] Test admin panel: `/admin` page works
- [ ] Test picker: Can add names and pick them
- [ ] Mobile responsive: Tested on phone/tablet

### Content Check
- [ ] Initial names make sense (optional - can be updated in admin)
- [ ] All links work (home ↔ admin)
- [ ] No placeholder text remains
- [ ] No console errors in DevTools (F12)

### Configuration
- [ ] `package.json` has correct project name
- [ ] `vercel.json` is configured
- [ ] `app/layout.tsx` has correct metadata
- [ ] Environment variables (if any) are documented

## Deployment Options

### Option A: Vercel CLI (Fastest)
```bash
npm i -g vercel
vercel
# Follow prompts
```
- [ ] Vercel CLI installed
- [ ] Logged in to Vercel
- [ ] Confirmed project settings
- [ ] Deployment complete

### Option B: GitHub Integration (Recommended)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR/REPO
git push -u origin main
```
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Connected to Vercel at vercel.com
- [ ] Automatic deployments enabled
- [ ] Deployment complete

### Option C: Git (via SSH)
- [ ] SSH keys configured for GitHub
- [ ] Code committed and pushed
- [ ] Connected repository to Vercel
- [ ] Deployment complete

## Post-Deployment

### Verify Live Site
- [ ] App loads at your-domain.vercel.app
- [ ] Home page displays correctly
- [ ] Admin panel accessible at /admin
- [ ] Can add a test name in admin
- [ ] Can pick names on home page
- [ ] Mobile view works properly
- [ ] No console errors (F12)

### Test Functionality
- [ ] Add single name works
- [ ] Bulk upload works
- [ ] Delete name works
- [ ] Picker animation works
- [ ] Slider controls work
- [ ] Number input works
- [ ] Button states (disabled during pick)

### Performance
- [ ] Page loads in < 3 seconds
- [ ] No layout shift during load
- [ ] Animations are smooth
- [ ] Buttons respond immediately
- [ ] API calls complete quickly

### Security
- [ ] Admin panel is accessible (open for now)
- [ ] API endpoints work correctly
- [ ] No sensitive data in logs
- [ ] HTTPS is enabled (Vercel default)

## Custom Domain (Optional)

- [ ] Domain registered (GoDaddy, Namecheap, etc.)
- [ ] Domain added to Vercel project settings
- [ ] DNS records updated
- [ ] SSL certificate issued (auto)
- [ ] App accessible at custom domain

## Database Migration (Optional)

If migrating from JSON to a database:

### Supabase Setup
- [ ] Supabase account created
- [ ] Project created
- [ ] Database table created
- [ ] API keys generated
- [ ] Environment variables added to Vercel
- [ ] API routes updated to use database
- [ ] Existing names migrated

### Neon Setup
- [ ] Neon account created
- [ ] Database created
- [ ] Connection string copied
- [ ] DATABASE_URL added to Vercel
- [ ] API routes updated
- [ ] Tested with new database

## Monitoring & Maintenance

- [ ] Vercel Dashboard bookmarked
- [ ] Set up email notifications (optional)
- [ ] Review deployment logs
- [ ] Monitor error rate (should be 0%)
- [ ] Check performance metrics weekly

## Launch

- [ ] All checks passed ✓
- [ ] Share app link with users
- [ ] Update social media (if applicable)
- [ ] Get feedback from users
- [ ] Plan future enhancements

## After Launch

### Week 1
- [ ] Monitor for errors
- [ ] Check user feedback
- [ ] Track usage patterns
- [ ] Note any issues

### Week 2+
- [ ] Plan enhancements (authentication, database, etc.)
- [ ] Add new features based on feedback
- [ ] Optimize based on usage data
- [ ] Scale infrastructure if needed

## Rollback Plan

If something goes wrong:

1. [ ] Check Vercel Dashboard → Deployments
2. [ ] Find previous stable version
3. [ ] Click "Promote to Production"
4. [ ] Verify site is working
5. [ ] Investigate issue locally
6. [ ] Fix and redeploy

## Support Contacts

- **Vercel Support**: vercel.com/support
- **Next.js Community**: github.com/vercel/next.js/discussions
- **Your Domain Provider**: Support email
- **GitHub Issues**: If deploying from GitHub

## Deployment Statistics

After deployment, track these metrics:

| Metric | Target | Actual |
|--------|--------|--------|
| Build Time | < 60s | ___ |
| Deployment Time | < 5m | ___ |
| Page Load | < 2s | ___ |
| Error Rate | 0% | ___ |
| Uptime | 99.9% | ___ |

## Notes

Use this space for deployment-specific notes:

```
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
```

## Final Sign-Off

- [ ] **Developer**: Code reviewed and tested
- [ ] **Testing**: All functionality verified
- [ ] **Deployment**: Successfully deployed to production
- [ ] **Verification**: Live site working as expected

**Date Deployed**: ______________
**Deployed By**: ______________
**Vercel URL**: ______________
**Custom Domain**: ______________

---

**Congratulations!** Your Random Name Picker is now live! 🎉

For help with any issues, refer to:
- DEPLOYMENT.md - Detailed deployment guide
- README.md - Full documentation
- QUICKSTART.md - Quick reference
