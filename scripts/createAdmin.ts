import dotenv from "dotenv";
import { connectDB } from "../src/config/database";
import AdministratorModel from "../src/models/administratorModel";

dotenv.config({ path: "./config.env" });

const createInitialAdmin = async () => {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await AdministratorModel.findOne({
      email: "admin@innovastay.com",
    });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      process.exit(0);
    }

    // Create initial admin user
    const admin = await AdministratorModel.create({
      name: "Super Administrator",
      email: "tony@co-ding.de",
      password: "Lorem-12345",
      passwordConfirm: "Lorem-12345",
      role: "superadmin",
      isActive: true,
    });

    console.log("Initial admin user created successfully!");
    console.log("Email: tony@co-ding.de");
    console.log("Password: Lorem-12345");
    console.log("IMPORTANT: Please change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createInitialAdmin();
