import { landManagementAdapter } from "./landManagement.adapter";
import { harvesterAdapter } from "./harvester.adapter";
import { cattleAdapter } from "./cattleSales.adapter";

export const bookingAdapters = {
  land_management: landManagementAdapter,
  harvester: harvesterAdapter,
  cattle: cattleAdapter,
};
