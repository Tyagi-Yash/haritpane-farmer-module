import LandManagementDetails from "../components/progress/LandManagementDetails";
import HarvesterDetails from "../components/progress/HarvesterDetails ";
import CattleDetails from "../components/progress/CattleDetails ";
import ExcavationDetails from "../components/progress/ExcavationDetails";

export const bookingDetailRenderers = {
  land_management: LandManagementDetails,
  harvester: HarvesterDetails,
  cattle: CattleDetails,
  excavation: ExcavationDetails,
};
