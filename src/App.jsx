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
  LocalManufacturerModule,
  LocalManufacturerProductDetails,
  LocalShopsModule,
  LocalShopsProductDetails,
  Dashboard,
  ServiceTracking,
  ServiceTrackingVendorDetails,
  AugerBookYourService,
  AugerChangeAvailablity,
  AugerVendorDetailsAccepted,
  AugerVendorDetailsPending,
  BorwellBookYourService,
  BorwellChangeAvailablity,
  BorwellVendorDetailsAccepted,
  BorwellVendorDetailsPending,
  CattleBookYourServices,
  CattleChangeAvailablity,
  CattleVendorDetailsAccepted,
  CattleVendorDetailsPending,
  CompoundWallBookYourService,
  CompoundWallChangeAvailablity,
  CompoundWallVendorDetailsAccepted,
  CompoundWallVendorDetailsPending,
  CowDungAwaitingQuote,
  CowDungBookYourService,
  CowDungChangeAvailablity,
  CowDungVendorDetailsAccepted,
  CowDungVendorDetailsPending,
  DroneBookYourService,
  DroneChangeAvailablity,
  DroneVendorDetailsAccepted,
  DroneVendorDetailsPending,
  ElectrostaticBookYourService,
  ElectrostaticChangeAvailablity,
  ElectrostaticVendorDetailsAccepted,
  ElectrostaticVendorDetailsPending,
  ExcavationBookYourService,
  ExcavationChangeAvailablity,
  ExcavationVendorDetailsAccepted,
  ExcavationVendorDetailsPending,
  HarvestorChangeAvailablity,
  HarvestorSubServices,
  HarvestorVendorDetailsPending,
  HarvestorsVendorDetailsAccepted,
  LaborBookYourService,
  LabourChangeAvailablity,
  LabourVendorDetailsAccepted,
  LabourVendorDetailsPending,
  LandManagementChangeAvailablity,
  LandManagementServicesSubServices,
  LandManagementVendorDetailsAccepted,
  LandManagementVendorDetailsPending,
  TransportationAwaitingQuote,
  TransportationBookYourService,
  TransportationChangeAvailablity,
  TransportationVendorDetailsAccepted,
  TransportationVendorDetailsPending,
  ServiceCategory,
} from "./pages";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="signup" element={<Signup />} />
        <Route path="otp-verify" element={<OtpVerify />} />

        <Route element={<RootLayout />}>
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="local-shops">
              <Route index element={<LocalShopsModule />} />
              <Route path="product-details" element={<LocalShopsProductDetails />} />
            </Route>
            <Route path="local-manufacturers">
              <Route index element={<LocalManufacturerModule />} />
              <Route path="product-details" element={<LocalManufacturerProductDetails />} />
            </Route>
          </Route>

          <Route path="service-tracking">
            <Route index element={<ServiceTracking />} />
            <Route path="vendor-details" element={<ServiceTrackingVendorDetails />} />
          </Route>

          <Route path="service-category" element={<ServiceCategory />} />
          <Route path="land-management">
            <Route index element={<LandManagementServicesSubServices />} />
            <Route path="available-services" element={<LandManagementChangeAvailablity />} />
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
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
