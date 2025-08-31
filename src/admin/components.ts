import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Dashboard: componentLoader.add("Dashboard", "../admin/dashboard.tsx"),
};

export { componentLoader, Components };
