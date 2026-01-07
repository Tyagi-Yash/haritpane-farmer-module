import { Route, Routes } from "react-router-dom";

import RootLayout from "./layout/RootLayout";
import {
  OtpVerify,
  Signup,
  LanguagePage,
  MyFarmAddLocation,
  MyFarmDetails,
  MyFarmHome,
  MyFarmMapImage,
  MyFarmAPIPage,
  MyFarmCardSection,
  Notification,
  MyProfile,
  MyProfileSaveContinue,
  ChatChatSection,
  ChatEnquirySection,
  ChatsReviewSection,
  Dashboard,
  ServiceTracking,
  ServiceTrackingVendorDetails,
  AugerBookYourService,
  AugerChangeAvailablity,
  AugerVendorDetails,
  BorwellBookYourService,
  BorwellChangeAvailablity,
  BorwellVendorDetails,
  CattleBookYourServices,
  CattleChangeAvailablity,
  CattleVendorDetails,
  CompoundWallBookYourService,
  CompoundWallChangeAvailablity,
  CompoundWallVendorDetails,
  CowDungBookYourService,
  DroneBookYourService,
  DroneChangeAvailablity,
  DroneVendorDetails,
  ElectrostaticBookYourService,
  ElectrostaticChangeAvailablity,
  ElectrostaticVendorDetails,
  ExcavationBookYourService,
  ExcavationChangeAvailablity,
  ExcavationVendorDetails,
  HarvestorChangeAvailablity,
  HarvestorSubServices,
  HarvestorVendorDetails,
  LaborBookYourService,
  LabourChangeAvailablity,
  LabourVendorDetails,
  LandManagementChangeAvailablity,
  LandManagementServicesSubServices,
  LandManagementVendorDetails,
  TransportationBookYourService,
  ServiceCategory,
  LocalProductsListingModule,
  LocalProductDetails,
  PrivacyPolicy,
  TermsOfService,
} from "./pages";

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common components/UserAuthProtect";
import PublicRoute from "./components/common components/PublicRoute";
import SyncLogout from "./components/common components/SyncLogout";
import RouteWatcher from "./components/common components/RouteWatcher";

function App() {
  return (
    <>
      <SyncLogout />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Signup />} />
          <Route path="signup" element={<Signup />} />
          <Route path="otp-verify" element={<OtpVerify />} />
        </Route>
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<RootLayout />}>
            <Route element={<RouteWatcher />}>
              <Route path="dashboard">
                <Route index element={<Dashboard />} />
                <Route path="local-shops">
                  <Route index element={<LocalProductsListingModule />} />
                  <Route path="product-details/:id" element={<LocalProductDetails />} />
                </Route>
                <Route path="local-manufacturers">
                  <Route index element={<LocalProductsListingModule />} />
                  <Route path="product-details/:id" element={<LocalProductDetails />} />
                </Route>
              </Route>
            </Route>

            <Route path="service-tracking">
              <Route index element={<ServiceTracking />} />
              <Route path=":serviceType/:bookingId" element={<ServiceTrackingVendorDetails />} />
            </Route>

            <Route element={<RouteWatcher />}>
              <Route path="service-category">
                <Route index element={<ServiceCategory />} />

                <Route path="land-management">
                  <Route index element={<LandManagementServicesSubServices />} />
                  <Route path="available-services">
                    <Route index element={<LandManagementChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<LandManagementVendorDetails />} />
                  </Route>
                </Route>

                <Route path="harvestor">
                  <Route index element={<HarvestorSubServices />} />
                  <Route path="available-services">
                    <Route index element={<HarvestorChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<HarvestorVendorDetails />} />
                  </Route>
                </Route>

                <Route path="cattle-purchase-sale">
                  <Route index element={<CattleBookYourServices />} />
                  <Route path="available-services">
                    <Route index element={<CattleChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<CattleVendorDetails />} />
                  </Route>
                </Route>

                <Route path="earth-movers">
                  <Route index element={<ExcavationBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<ExcavationChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<ExcavationVendorDetails />} />
                  </Route>
                </Route>

                <Route path="electrostatic-spraying">
                  <Route index element={<ElectrostaticBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<ElectrostaticChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<ElectrostaticVendorDetails />} />
                  </Route>
                </Route>

                <Route path="labour-requirement">
                  <Route index element={<LaborBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<LabourChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<LabourVendorDetails />} />
                  </Route>
                </Route>

                <Route path="transportation" element={<TransportationBookYourService />} />

                <Route path="borewell">
                  <Route index element={<BorwellBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<BorwellChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<BorwellVendorDetails />} />
                  </Route>
                </Route>

                <Route path="cow-dung-supply" element={<CowDungBookYourService />} />

                <Route path="compound-wall-builder">
                  <Route index element={<CompoundWallBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<CompoundWallChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<CompoundWallVendorDetails />} />
                  </Route>
                </Route>

                <Route path="drone-service">
                  <Route index element={<DroneBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<DroneChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<DroneVendorDetails />} />
                  </Route>
                </Route>

                <Route path="auger-service">
                  <Route index element={<AugerBookYourService />} />
                  <Route path="available-services">
                    <Route index element={<AugerChangeAvailablity />} />
                    <Route path="vendor-details/:id" element={<AugerVendorDetails />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            <Route path="chats">
              <Route index element={<ChatChatSection />} />
              <Route path="message-chat" element={<ChatChatSection />} />
              <Route path="enquiry-chat" element={<ChatEnquirySection />} />
              <Route path="review-chat" element={<ChatsReviewSection />} />
            </Route>

            <Route path="notification" element={<Notification />} />

            <Route path="language" element={<LanguagePage />} />

            <Route path="profile">
              <Route index element={<MyProfile />} />
              <Route path="profile-edit" element={<MyProfileSaveContinue />} />
            </Route>

            <Route path="farm-home">
              <Route index element={<MyFarmHome />} />
              <Route path="farm-api-page" element={<MyFarmAPIPage />} />
              <Route path="farm-add-location" element={<MyFarmAddLocation />} />
              <Route path="farm-map-image" element={<MyFarmMapImage />} />
              <Route path="farm-select-map" element={<MyFarmCardSection />} />
              <Route path="farm-details" element={<MyFarmDetails />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
