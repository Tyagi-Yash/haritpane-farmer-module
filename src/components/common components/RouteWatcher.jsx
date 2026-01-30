import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearAugerServicesFilters } from "../../reduxtoolkit/slices/service category/augerServices";
import { clearBorewellServicesFilters } from "../../reduxtoolkit/slices/service category/borewellServices";
import { clearCattleServicesFilters } from "../../reduxtoolkit/slices/service category/cattlePurchaseServices";
import { clearCompoundWallServicesFilters } from "../../reduxtoolkit/slices/service category/compoundWallServices";
import { clearCowDungServicesFilters } from "../../reduxtoolkit/slices/service category/cowDunkServices";
import { clearDroneServicesFilters } from "../../reduxtoolkit/slices/service category/droneServices";
import { clearElectroStaticSprayingServicesFilters } from "../../reduxtoolkit/slices/service category/electrostaticSprayingServices";
import { clearExcavationServicesFilters } from "../../reduxtoolkit/slices/service category/excavationServices";
import { clearHarvestorServicesFilters } from "../../reduxtoolkit/slices/service category/harvestorServices";
import { clearLabourServicesFilters } from "../../reduxtoolkit/slices/service category/labourServices";
import { clearLandServicesFilters } from "../../reduxtoolkit/slices/service category/landManagementServices";
import { clearTransportServicesFilters } from "../../reduxtoolkit/slices/service category/transportationService";
import { clearClassifiedData } from "../../reduxtoolkit/slices/dashboard/classifiedSection";

const serviceResetMap = {
  "land-management": clearLandServicesFilters,
  harvestor: clearHarvestorServicesFilters,
  "cattle-purchase-sale": clearCattleServicesFilters,
  "earth-movers": clearExcavationServicesFilters,
  "electrostatic-spraying": clearElectroStaticSprayingServicesFilters,
  "labour-requirement": clearLabourServicesFilters,
  transportation: clearTransportServicesFilters,
  borewell: clearBorewellServicesFilters,
  "cow-dung-supply": clearCowDungServicesFilters,
  "compound-wall-builder": clearCompoundWallServicesFilters,
  "drone-service": clearDroneServicesFilters,
  "auger-service": clearAugerServicesFilters,
};

function RouteWatcher() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    Object.entries(serviceResetMap).forEach(([serviceName, resetAction]) => {
      const isInsideThisServiceFlow = currentPath.startsWith(`/service-category/${serviceName}`);

      if (!isInsideThisServiceFlow) {
        dispatch(resetAction());
      }
    });
  }, [location.pathname, dispatch]);

  useEffect(() => {
    const currentPath = location.pathname;

    const isInsideClassifiedFlow =
      currentPath.startsWith("/dashboard/local-shops") ||
      currentPath.startsWith("/dashboard/local-manufacturers");

    if (!isInsideClassifiedFlow) {
      dispatch(clearClassifiedData());
    }
  }, [location.pathname, dispatch]);

  return <Outlet />;
}

export default RouteWatcher;
