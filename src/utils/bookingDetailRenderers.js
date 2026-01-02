import LandManagementDetails from "../components/progress/LandManagementDetails";
import HarvesterDetails from "../components/progress/HarvesterDetails ";
import CattleDetails from "../components/progress/CattleDetails ";
import ExcavationDetails from "../components/progress/ExcavationDetails";
import AugerDetails from "../components/progress/AugerDetails";
import ElectrostaticDetails from "../components/progress/ElectrostaticDetails";

export const bookingDetailRenderers = {
  land_management: LandManagementDetails,
  harvester: HarvesterDetails,
  cattle: CattleDetails,
  excavation: ExcavationDetails,
  auger: AugerDetails,
  electrostatic: ElectrostaticDetails,
};
