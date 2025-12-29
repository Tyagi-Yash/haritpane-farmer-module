import { landManagementAdapter } from "./landManagement.adapter";
import { harvesterAdapter } from "./harvester.adapter";
import { cattleAdapter } from "./cattleSales.adapter";
import { excavationAdapter } from "./excavation.adapter";

export const bookingAdapters = {
  land_management: landManagementAdapter,
  harvester: harvesterAdapter,
  cattle: cattleAdapter,
  excavation: excavationAdapter,
};
