# 🌾 Haritpane — Farmer Module

A feature-rich React web application built for farmers to access agricultural services, manage their farms, communicate with vendors, and track service bookings — all in one platform.

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

---

## 📖 About the Project

**Haritpane** is a digital platform for farmers that connects them with agricultural service providers. The Farmer Module allows users to sign up via OTP, browse a wide range of farming services, manage their farm locations on a map, chat with vendors, track ongoing services, view local products, and manage their profile — all with multilingual support (English, Hindi, Marathi).

---

## 🛠️ Tech Stack

| Category         | Technology                                      |
|------------------|-------------------------------------------------|
| Framework        | React 19 + Vite 7                               |
| State Management | Redux Toolkit + Redux Persist                   |
| Routing          | React Router DOM v7                             |
| Authentication   | Firebase (Phone OTP Auth + Push Notifications)  |
| Maps             | Google Maps API (`@react-google-maps/api`)      |
| Places           | React Places Autocomplete                       |
| HTTP Client      | Axios                                           |
| Forms            | React Hook Form + Yup Validation                |
| Real-time        | Socket.IO Client                                |
| i18n             | i18next + react-i18next (EN / HI / MR)          |
| UI Components    | React Bootstrap + Swiper + React Modal          |
| Notifications    | React Toastify                                  |
| Date Picker      | React Datepicker                                |
| Pagination       | React Paginate                                  |
| Linting          | ESLint 9                                        |

---

## ✨ Features

### 🔐 Authentication
- Phone number-based OTP login/signup via Firebase
- Protected routes with auth guards
- Profile completion guard (`ProfileGuard`)
- Sync logout across tabs (`SyncLogout`)

### 🏠 Dashboard
- Overview of available services
- Local shops and manufacturer product listings
- Product detail views

### 🌿 Agricultural Services (Service Category)
Farmers can browse and book the following services:
- **Land Management** — Tractor/ploughing services
- **Harvester** — Crop harvesting sub-services
- **Drone Service** — Aerial crop spraying
- **Electrostatic Spraying** — Precision pesticide application
- **Borewell** — Borewell drilling services
- **Earth Movers / Excavation** — Earthwork and digging
- **Auger Service** — Hole-drilling machinery
- **Cattle Purchase & Sale** — Livestock marketplace
- **Labour Requirement** — Hiring farm labour
- **Transportation** — Farm produce transport
- **Cow Dung Supply** — Organic fertilizer supply
- **Compound Wall Builder** — Farm boundary construction

Each service supports:
- Service booking forms
- Vendor availability listing
- Vendor detail page

### 🗺️ My Farm Management
- Add new farms by picking a location on Google Maps
- Draw geofencing boundaries for farm plots
- Fill in detailed farm information (name, area, crop type, etc.)
- View and manage saved farms
- Edit farm location and details
- Delete farms with confirmation modal
- Assign farm images with rotating farm previews

### 💬 Chats
- Message chat with vendors
- Enquiry chat section
- Reviews chat section
- Real-time messaging via Socket.IO

### 📦 Service Tracking
- Track ongoing service bookings
- View vendor details per booking
- View job order / quotation details
- Reschedule transportation and cow dung services

### 👤 Profile
- View and edit personal profile
- Complete profile setup flow

### 🌐 Internationalization (i18n)
- Supports **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**
- Language selection page
- Automatic browser language detection

### 🔔 Notifications
- Push notification support via Firebase Cloud Messaging (FCM)
- In-app notification page

### 📄 Static Content
- Privacy Policy page
- Terms of Service page

---

## 📁 Project Structure

```
src/
├── App.jsx                  # Root component with all route definitions
├── main.jsx                 # Application entry point
├── i18n.js                  # i18next configuration and translations
│
├── assets/                  # Static assets (images, icons, fonts)
├── config/                  # App-level configuration files
├── constants/               # Shared constants
├── firebase/                # Firebase initialization & FCM setup
├── hooks/                   # Custom React hooks
├── socket/                  # Socket.IO client setup
├── utils/                   # Utility/helper functions
│
├── layout/
│   └── RootLayout.jsx       # Shared layout (navbar, sidebar, etc.)
│
├── components/
│   ├── account settings/    # Profile, My Farm, Language, Notification components
│   ├── chats/               # Chat UI components
│   ├── common components/   # Shared components (guards, loaders, etc.)
│   ├── dashboard/           # Dashboard UI components
│   ├── otpverify/           # OTP input component
│   ├── progress/            # Service tracking components
│   ├── service category/    # Per-service booking components
│   └── skeletons/           # Loading skeleton components
│
├── pages/
│   ├── auth/                # Signup, OTP Verify pages
│   ├── dashboard/           # Dashboard, Local Products pages
│   ├── chats/               # Chat pages
│   ├── progress/            # Service Tracking pages
│   ├── account settings/
│   │   ├── my farm/         # MyFarmHub, FarmForm, AddFarmMap, FarmDetails, FarmGeofencing
│   │   ├── profile/         # MyProfile, MyProfileSaveContinue
│   │   ├── language/        # LanguagePage
│   │   └── notification/    # Notification page
│   ├── service category/    # All service-specific booking pages
│   └── static content/      # Privacy Policy, Terms of Service
│
└── reduxtoolkit/
    ├── store.js             # Redux store with persistence
    ├── rootReducers.js      # Root reducer combining all slices
    └── slices/
        ├── auth/            # Authentication state
        ├── account settings/ # Profile, My Farm state
        ├── chats/           # Chat state
        ├── dashboard/       # Dashboard state
        ├── progress/        # Service tracking state
        ├── service category/ # Booking state per service
        ├── rate and reviews/ # Ratings state
        └── static content/  # Static page state
```

---

## 🗺️ Application Routes

| Route | Description |
|-------|-------------|
| `/` or `/signup` | Signup / Login page (OTP) |
| `/otp-verify` | OTP verification |
| `/dashboard` | Main dashboard |
| `/dashboard/local-shops` | Local shops listing |
| `/dashboard/local-manufacturers` | Local manufacturers listing |
| `/service-category` | Service category listing |
| `/service-category/land-management` | Land management services |
| `/service-category/harvestor` | Harvester services |
| `/service-category/drone-service` | Drone spraying service |
| `/service-category/electrostatic-spraying` | Electrostatic spraying |
| `/service-category/borewell` | Borewell services |
| `/service-category/earth-movers` | Excavation services |
| `/service-category/auger-service` | Auger drilling service |
| `/service-category/cattle-purchase-sale` | Cattle marketplace |
| `/service-category/labour-requirement` | Labour hiring |
| `/service-category/transportation` | Transportation booking |
| `/service-category/cow-dung-supply` | Cow dung supply |
| `/service-category/compound-wall-builder` | Compound wall service |
| `/service-tracking` | Service tracking overview |
| `/service-tracking/:serviceType/:bookingId` | Vendor details for a booking |
| `/my-farms` | My Farm list |
| `/my-farms/map` | Add/Edit farm location on map |
| `/my-farms/form` | Farm details form |
| `/my-farms/details` | Farm detail view |
| `/my-farms/geofencing` | Farm geofencing / boundary |
| `/chats/message-chat` | Message chat |
| `/chats/enquiry-chat` | Enquiry chat |
| `/chats/review-chat` | Review chat |
| `/notification` | Notifications |
| `/language` | Language selection |
| `/profile` | Farmer profile |
| `/profile/profile-edit` | Edit profile |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A valid [Firebase project](https://console.firebase.google.com/)
- A valid [Google Cloud project](https://console.cloud.google.com/) with **Maps JavaScript API** and **Places API** enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd haritpane-farmer-module
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#environment-variables) section below).

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Backend API
VITE_BACKEND_URL=http://your-backend-server:port
```

> ⚠️ **Never commit your `.env` file to version control.** It is already listed in `.gitignore`.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## 📄 License

This project is private and proprietary. All rights reserved © Haritpane.
