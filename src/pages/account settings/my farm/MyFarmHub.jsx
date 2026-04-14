import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import TopbarModal from "../../../components/common components/TopbarModal";
import { getAllMyFarms } from "../../../reduxtoolkit/slices/account settings/myFarm";
import MyFarmList from "../../../components/account settings/my farm/MyFarmList";
import NoFarmList from "../../../components/account settings/my farm/NoFarmList";

function MyFarmHub() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { farms, loader, pagination } = useSelector((state) => state.services.myFarmMgmtSlice);

  useEffect(() => {
    dispatch(getAllMyFarms({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handlePageChange = (page) => {
    dispatch(getAllMyFarms({ page, limit: 10 }));
  };

  return (
    <div className="WrapperArea">
      <div className="WrapperBox">
        <TopbarModal titleBox={true} title={t("myFarm.title")} navigate="/dashboard" />

        {loader ? (
          <div className="add-field-card">
            <h4>{t("myFarm.loadingFarms")}</h4>
          </div>
        ) : farms.length > 0 ? (
          <MyFarmList farms={farms} pagination={pagination} onPageChange={handlePageChange} />
        ) : (
          <NoFarmList />
        )}
      </div>
    </div>
  );
}

export default MyFarmHub;

