import LandManagementDetails from "../components/service tracking details/LandManagementDetails";
import HarvesterDetails from "../components/service tracking details/HarvesterDetails ";
import CattleDetails from "../components/service tracking details/CattleDetails ";
import ExcavationDetails from "../components/service tracking details/ExcavationDetails";
import AugerDetails from "../components/service tracking details/service tracking details/AugerDetails";
import ElectrostaticDetails from "../components/service tracking details/ElectrostaticDetails";
import LabourDetails from "../components/service tracking details/LabourDetails";
import BorewellDetails from "../components/service tracking details/service tracking details/BorewellDetails";
import DroneDetails from "../components/service tracking details/DroneDetails";
import CompoundWallDetails from "../components/service tracking details/CompoundWallDetails";

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
};
