import LandManagementDetails from "../components/progress/service tracking details/LandManagementDetails";
import HarvesterDetails from "../components/progress/service tracking details/HarvesterDetails ";
import CattleDetails from "../components/progress/service tracking details/CattleDetails ";
import ExcavationDetails from "../components/progress/service tracking details/ExcavationDetails";
import AugerDetails from "../components/progress/service tracking details/AugerDetails";
import ElectrostaticDetails from "../components/progress/service tracking details/ElectrostaticDetails";
import LabourDetails from "../components/progress/service tracking details/LabourDetails";
import BorewellDetails from "../components/progress/service tracking details/BorewellDetails";
import DroneDetails from "../components/progress/service tracking details/DroneDetails";
import CompoundWallDetails from "../components/progress/service tracking details/CompoundWallDetails";
import CowDungDetails from "../components/progress/service tracking details/CowDungDetails";

export const bookingDetailRenderers = {
  land_management: LandManagementDetails,
  harvester: HarvesterDetails,
  cattle: CattleDetails,
  excavation: ExcavationDetails,
  auger: AugerDetails,
  electrostatic: ElectrostaticDetails,
  labour: LabourDetails,
  borewell: BorewellDetails,
  drone: DroneDetails,
  compoundWall: CompoundWallDetails,
  cowdung: CowDungDetails,
};
