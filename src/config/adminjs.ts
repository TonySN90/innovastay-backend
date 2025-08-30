import AdminJS from 'adminjs'
import LandlordModel from '../models/landlordModel'
import LodgingModel from '../models/lodgingModel'

const setupAdminJS = () => {
  try {
    // Use absolute paths to the modules
    const AdminJSExpress = require('/Users/tonyheider/Dev/innovastay-backend/node_modules/@adminjs/express/lib/index.js')
    const AdminJSMongoose = require('/Users/tonyheider/Dev/innovastay-backend/node_modules/@adminjs/mongoose/lib/index.js')

    AdminJS.registerAdapter({
      Resource: AdminJSMongoose.Resource,
      Database: AdminJSMongoose.Database,
    })

    const adminJs = new AdminJS({
      resources: [
        {
          resource: LandlordModel,
          options: {
            properties: {
              password: {
                isVisible: { list: false, filter: false, show: false, edit: true },
              },
              passwordConfirm: {
                isVisible: { list: false, filter: false, show: false, edit: true },
              },
            },
          },
        },
        {
          resource: LodgingModel,
          options: {
            properties: {
              images: {
                type: 'string',
                isArray: true,
              },
              amenities: {
                type: 'string', 
                isArray: true,
              },
              services: {
                type: 'string',
                isArray: true,
              },
            },
          },
        },
      ],
      rootPath: '/admin',
      branding: {
        companyName: 'Innovastay',
        theme: {},
      },
    })

    const adminRouter = AdminJSExpress.buildRouter(adminJs)
    return { adminJs, adminRouter }
  } catch (error) {
    console.error('AdminJS setup error:', error)
    throw error
  }
}

export { setupAdminJS }