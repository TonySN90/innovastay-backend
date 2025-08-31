import AdminJS from "adminjs";
import LandlordModel from "../models/landlordModel";
import LodgingModel from "../models/lodgingModel";
import AdministratorModel from "../models/administratorModel";
import AmenityModel from "../models/amenityModel";
import { componentLoader, Components } from "../admin/components";
import { dashboardHandler } from "../admin/handlers/dashboardHandler";

const setupAdminJS = () => {
  try {
    // Use absolute paths to the modules
    const AdminJSExpress = require("/Users/tonyheider/Dev/innovastay-backend/node_modules/@adminjs/express/lib/index.js");
    const AdminJSMongoose = require("/Users/tonyheider/Dev/innovastay-backend/node_modules/@adminjs/mongoose/lib/index.js");

    AdminJS.registerAdapter({
      Resource: AdminJSMongoose.Resource,
      Database: AdminJSMongoose.Database,
    });

    const adminJs = new AdminJS({
      dashboard: {
        component: Components.Dashboard,
        handler: dashboardHandler,
      },
      componentLoader,
      resources: [
        {
          resource: AdministratorModel,
          options: {
            navigation: {
              icon: "User",
            },
            properties: {
              password: {
                isVisible: {
                  list: false,
                  filter: false,
                  show: false,
                  edit: true,
                },
              },
              passwordConfirm: {
                isVisible: {
                  list: false,
                  filter: false,
                  show: false,
                  edit: true,
                },
              },
              isActive: {
                isVisible: {
                  list: false,
                  filter: false,
                  show: false,
                  edit: true,
                },
              },
            },
          },
        },
        {
          resource: LandlordModel,
          options: {
            navigation: {
              icon: "Home",
            },
            properties: {
              password: {
                isVisible: {
                  list: false,
                  filter: false,
                  show: false,
                  edit: true,
                },
              },
              passwordConfirm: {
                isVisible: {
                  list: false,
                  filter: false,
                  show: false,
                  edit: true,
                },
              },
            },
          },
        },
        {
          resource: AmenityModel,
          options: {
            navigation: {
              icon: "Star",
            },
          },
        },
        {
          resource: LodgingModel,
          options: {
            navigation: {
              icon: "Building",
            },
            properties: {
              images: {
                type: "string",
                isArray: true,
              },
              amenities: {
                type: "reference",
                reference: "Amenities",
                isArray: true,
              },
              services: {
                type: "string",
                isArray: true,
              },
            },
          },
        },
      ],
      rootPath: "/admin",
      branding: {
        companyName: "Innovastay - Admin Panel",
        theme: {},
        logo: false,
        withMadeWithLove: false,
        favicon: "/favicon.ico",
      },
      locale: {
        language: "de",
        translations: {
          messages: {
            loginWelcome: "Willkommen im Innovastay Admin-Bereich",
          },
          labels: {
            logout: "Abmelden",
          },
        },
      },
    });

    console.log("Setting up AdminJS with custom authentication...");
    adminJs.watch();
    const adminRouter = AdminJSExpress.buildRouter(adminJs);

    return { adminJs, adminRouter };
  } catch (error) {
    console.error("AdminJS setup error:", error);
    throw error;
  }
};

export { setupAdminJS };
