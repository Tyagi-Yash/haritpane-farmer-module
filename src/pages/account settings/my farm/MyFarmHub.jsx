import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllMyFarms } from "../../../reduxtoolkit/slices/account settings/myFarm";
import MyFarmList from "../../../components/account settings/my farm/MyFarmList";
import NoFarmList from "../../../components/account settings/my farm/NoFarmList";

function MyFarmHub() {
  const dispatch = useDispatch();
  const { farms, loader } = useSelector((state) => state.services.myFarmMgmtSlice);

  useEffect(() => {
    dispatch(getAllMyFarms());
  }, [dispatch]);

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title="My Farm" navigate="/dashboard" />

        {loader ? (
          <div className="add-field-card">
            <h4>Loading farms...</h4>
          </div>
        ) : farms.length > 0 ? (
          <MyFarmList farms={farms} />
        ) : (
          <NoFarmList />
        )}
      </div>
    </div>
  );
}

export default MyFarmHub;
