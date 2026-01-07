import { landManagementAdapter } from "./landManagement.adapter";
import { harvesterAdapter } from "./harvester.adapter";
import { cattleAdapter } from "./cattleSales.adapter";
import { excavationAdapter } from "./excavation.adapter";
import { electrostaticAdapter } from "./electrostatic.adapter";
import { augerAdapter } from "./auger.adapter";
import { labourAdapter } from "./labour.adapter";
import { borewellAdapter } from "./borewell.adapter";
import { droneAdapter } from "./drone.adapter";
import { compoundWallAdapter } from "./compoundWall.adapter";

export const bookingAdapters = {
  land_management: landManagementAdapter,
  harvester: harvesterAdapter,
  cattle: cattleAdapter,
  excavation: excavationAdapter,
  electrostatic: electrostaticAdapter,
  auger: augerAdapter,
  labour: labourAdapter,
  borewell: borewellAdapter,
  drone: droneAdapter,
  compoundWall: compoundWallAdapter,
};
