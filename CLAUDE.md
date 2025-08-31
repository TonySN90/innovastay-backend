# Claude Code Configuration

This file contains configuration and helpful information for Claude Code in this project.

## Project Information
- **Type**: Backend API
- **Framework**: Node.js/Express (inferred from package.json)
- **Database**: (to be determined)
- **Admin Panel**: AdminJS integrated

## Useful Commands
```bash
# Development
npm run dev

# Install dependencies
npm install

# Linting and type checking
# (Add specific commands once identified)
```

## Project Structure
- `app.ts` - Main application file
- `src/` - Source code directory
- `scripts/` - Utility scripts
- `src/config/` - Configuration files

## Notes
- Recent work includes AdminJS integration and login functionality
- Project includes guests, landlords, and lodging management features

## Known Issues & Solutions

### AdminJS Custom Dashboard Not Loading
**Problem**: Custom dashboard components are not displayed, showing default AdminJS dashboard instead.

**Solution**: 
1. Delete the `.adminjs` folder to force recompilation:
   ```bash
   rm -rf .adminjs
   ```
2. Add `adminJs.watch()` after AdminJS instance creation in config:
   ```typescript
   const adminJs = new AdminJS({...});
   adminJs.watch(); // Add this line
   const adminRouter = AdminJSExpress.buildRouter(adminJs);
   ```

**Root Cause**: AdminJS needs to bundle custom components and the `.adminjs` cache folder can prevent updates from being recognized. The `watch()` method enables component bundling.

**References**: 
- [GitHub Issue #1671](https://github.com/SoftwareBrothers/adminjs/issues/1671)
- [Stack Overflow Discussion](https://stackoverflow.com/questions/75290441/custom-dashboard-for-adminjs-not-working-in-production)

## AdminJS - Docs
- [AdminJS](https://adminjs.io/)
- [AdminJS - Writing your own components](https://docs.adminjs.co/ui-customization/writing-your-own-components)
- [AdminJS - Dashboard Customization](https://docs.adminjs.co/ui-customization/dashboard-customization)
- [AdminJS - Changing the form view](https://docs.adminjs.co/ui-customization/changing-the-form-view)
- [AdminJS - Designsystem](https://storybook.adminjs.co/?path=/docs/designsystem-atoms-avatar--docs)

## Node.js - Docs
- [Node.js](https://nodejs.org/en/)

## Express - Docs
- [Express.js](https://expressjs.com/)

## Mongoose - Docs
- [Mongoose](https://mongoosejs.com/docs/guide.html)
