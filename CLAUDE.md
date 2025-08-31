# Claude Code Configuration

This file contains configuration and helpful information for Claude Code in this project.

## Project Information
- **Type**: Backend API for Innovastay (Lodging/Rental Management Platform)
- **Framework**: Node.js/Express with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Admin Panel**: AdminJS integrated with custom authentication
- **Port**: Development server runs on port 2500

## Useful Commands
```bash
# Development
npm run dev

# Install dependencies
npm install

# Create admin user
npm run create-admin

# Create demo data
npm run create-demo-data

# Linting and type checking
npm run lint
npm run lint:fix
```

## Project Structure
```
├── app.ts                          # Main Express application setup
├── server.ts                       # Server entry point
├── src/
│   ├── models/                     # Mongoose models
│   │   ├── administratorModel.ts   # Admin users
│   │   ├── landlordModel.ts        # Property owners
│   │   ├── lodgingModel.ts         # Properties/accommodations
│   │   ├── amenityModel.ts         # Property amenities
│   │   ├── lodgingServiceModel.ts  # Property services
│   │   └── articleModel.ts         # Lodging-related articles
│   ├── controllers/                # Business logic
│   │   ├── lodgingController.ts    # Lodging CRUD operations
│   │   ├── landlordsController.ts  # Landlord operations
│   │   ├── amenityController.ts    # Amenity operations
│   │   ├── lodgingServiceController.ts # Service operations
│   │   ├── articleController.ts    # Article operations
│   │   └── errorController.ts      # Global error handling
│   ├── routes/                     # API routes
│   │   ├── lodgingsRouter.ts       # /api/v1/lodgings
│   │   ├── landlordsRouter.ts      # /api/v1/landlords
│   │   ├── amenitiesRouter.ts      # /api/v1/amenities
│   │   ├── lodgingServicesRouter.ts # /api/v1/lodging-services
│   │   └── articlesRouter.ts       # /api/v1/articles
│   ├── middleware/                 # Custom middleware
│   │   ├── adminAuth.ts            # AdminJS authentication
│   │   └── errorHandler.ts         # Error handling middleware
│   ├── utils/                      # Utility functions
│   │   ├── appError.ts             # Custom error class
│   │   └── catchAsync.ts           # Async error wrapper
│   ├── config/                     # Configuration
│   │   ├── adminjs.ts              # AdminJS setup
│   │   └── database.ts             # MongoDB connection
│   └── admin/                      # AdminJS components
│       ├── components/             # Custom AdminJS components
│       └── handlers/               # AdminJS handlers
├── scripts/                        # Utility scripts
└── config.env                      # Environment variables
```

## Current Features & Implementation Status

### ✅ Completed Features

#### Core Models & APIs
1. **Lodgings Management**
   - Full CRUD operations via `/api/v1/lodgings`
   - Relationships with amenities and services
   - Population of related data (amenities, services show as objects with id, name, description)

2. **Amenities System**
   - Standalone amenities management via `/api/v1/amenities`
   - Referenced in lodgings as ObjectId array
   - Full CRUD operations

3. **Lodging Services System**  
   - Standalone services management via `/api/v1/lodging-services`
   - Referenced in lodgings as ObjectId array
   - Full CRUD operations

4. **Landlords Management**
   - Basic landlord operations via `/api/v1/landlords`
   - Password handling with bcrypt

5. **Administrator System**
   - Admin user management for AdminJS access
   - Authentication middleware

6. **Articles System**
   - Lodging-specific articles via `/api/v1/articles`
   - Multilingual content (title, subtitle, description in 7 languages)
   - Position-based ordering with automatic management
   - Coupled to lodgings with ObjectId references

#### AdminJS Integration
- Custom dashboard with authentication
- Resource management for all models
- Organized navigation structure:
  ```
  📊 Dashboard
  👤 Administrator Model  
  🏠 Landlord Model
  🏢 Lodgings
    └── 🏢 Lodgings
    └── ⭐ Amenities  
    └── ⚙️ LodgingServices
    └── 📄 Articles
  ```
- Reference relationships properly configured
- Password fields hidden in lists/filters
- German localization

#### Error Handling
- Global error handler middleware
- JSON responses for API routes (no HTML error pages)
- Proper HTTP status codes
- Development vs production error handling
- MongoDB error transformation (CastError, ValidationError, etc.)

### 🏗️ Architecture Patterns
- **MVC Pattern**: Models, Controllers, Routes separation
- **Error Handling**: Global error middleware with catchAsync wrapper
- **Database Relations**: Mongoose populate for referenced data
- **Type Safety**: Full TypeScript implementation
- **API Structure**: RESTful API design with consistent response format

### 📋 Data Models

#### Lodging Model (Multilingual)
```typescript
{
  name_de: String (required)
  name_en: String (required)
  name_fr: String (required)
  name_ru: String (required)
  name_cs: String (required)
  name_it: String (required)
  name_es: String (required)
  maxNumGuests: Number (required)
  pricePerNight: Number (required)
  description_de: String (required)
  description_en: String (required)
  description_fr: String (required)
  description_ru: String (required)
  description_cs: String (required)
  description_it: String (required)
  description_es: String (required)
  location: String (required)
  images: [String] (required)
  amenities: [ObjectId] (ref: "Amenities")
  services: [ObjectId] (ref: "LodgingServices")
  landlord: ObjectId (ref: "Landlord", required)
}
```

#### Amenities Model (Multilingual)
```typescript
{
  name_de: String (required, unique)
  name_en: String (required)
  name_fr: String (required)
  name_ru: String (required)
  name_cs: String (required)
  name_it: String (required)
  name_es: String (required)
  description_de: String (required)
  description_en: String (required)
  description_fr: String (required)
  description_ru: String (required)
  description_cs: String (required)
  description_it: String (required)
  description_es: String (required)
  icon: String (optional)
  timestamps: true
}
```

#### LodgingServices Model (Multilingual)
```typescript
{
  name_de: String (required, unique)
  name_en: String (required)
  name_fr: String (required)
  name_ru: String (required)
  name_cs: String (required)
  name_it: String (required)
  name_es: String (required)
  description_de: String (required)
  description_en: String (required)
  description_fr: String (required)
  description_ru: String (required)
  description_cs: String (required)
  description_it: String (required)
  description_es: String (required)
  icon: String (optional)
  timestamps: true
}
```

#### Administrator Model (Single Language)
```typescript
{
  name: String (required)
  email: String (required, unique, validated)
  password: String (required, bcrypt hashed)
  passwordConfirm: String (required for creation)
  role: String (enum: 'admin', 'superadmin', default: 'admin')
  isActive: Boolean (default: true)
  timestamps: true
}
```

#### Articles Model (Multilingual)
```typescript
{
  title_de: String (required)
  title_en: String (required)
  title_fr: String (required)
  title_ru: String (required)
  title_cs: String (required)
  title_it: String (required)
  title_es: String (required)
  subtitle_de: String (required)
  subtitle_en: String (required)
  subtitle_fr: String (required)
  subtitle_ru: String (required)
  subtitle_cs: String (required)
  subtitle_it: String (required)
  subtitle_es: String (required)
  description_de: String (required)
  description_en: String (required)
  description_fr: String (required)
  description_ru: String (required)
  description_cs: String (required)
  description_it: String (required)
  description_es: String (required)
  imageLink: String (required)
  position: Number (required, auto-generated)
  lodging: ObjectId (ref: "Lodgings", required)
  timestamps: true
}
```

### 🌍 Multilingual Support
All content models (Lodgings, Amenities, LodgingServices, Articles) support 7 languages:
- **German (de)** - Primary language (unique constraints)
- **English (en)** - Required
- **French (fr)** - Required  
- **Russian (ru)** - Required
- **Czech (cs)** - Required
- **Italian (it)** - Required
- **Spanish (es)** - Required

**Implementation Details:**
- All multilingual fields use `field_languageCode` format (e.g., `name_de`, `description_en`)
- All language variants are required fields
- Only German names have unique constraints
- Administrator model remains single-language (name only)

### 🔧 Recent Updates (Latest Session)
- Implemented Amenities system with full CRUD API
- Implemented LodgingServices system with full CRUD API  
- Updated Lodging model to use ObjectId references instead of string arrays
- Added population of amenities and services in lodging responses
- Configured AdminJS with proper reference relationships
- Organized AdminJS navigation with grouped resources under "Lodgings"
- Implemented global error handling for clean JSON API responses
- **Added comprehensive multilingual support** for all content models
- All multilingual fields made required (7 languages total)
- Reverted Administrator model to single-language name field
- **Implemented Articles system with advanced features**:
  - Multilingual title, subtitle, description fields (7 languages)
  - Position-based ordering with automatic management
  - Pre-save middleware for auto-position assignment
  - Intelligent position reordering on delete/update
  - Lodging-specific article filtering
  - AdminJS integration with FileText icon and readonly position
  - Created sample article about tourist tax ("Ortsübliche Kurtaxe")

### 📊 **API Endpoints Overview**
```
/api/v1/lodgings              # Lodging management
/api/v1/amenities             # Amenity management  
/api/v1/lodging-services      # Service management
/api/v1/articles              # Article management
  ├── GET /                   # All articles
  ├── POST /                  # Create article
  ├── GET /:id               # Single article
  ├── PATCH /:id             # Update article  
  ├── DELETE /:id            # Delete article
  ├── PATCH /:id/position    # Update position
  └── GET /lodging/:id       # Articles by lodging
/api/v1/landlords             # Landlord management
```

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
