import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import bannerReducer from "./features/banners/bannerSlice";
import campaignReducer from "./features/campaigns/campaignSlice";
import equipmentReducer from "./features/equuipments/equipmentSlice";
import suppliesReducer from "./features/supplies/suppliesSlice";
import eventReducer from "./features/events/eventSlice";
import HarvestReducer from "./features/harvest/honey_harvestSlice";
import HunterReducer from "./features/hunters/huntersSlice";
import HiveReducer from "./features/hives/hiveSlice";
import ReportReducer from "./features/catch_reports/reportSlice";
import ServiceReducer from "./features/services/serviceSlice";
import SetupReducer from "./features/apiarySetup/setupCompSlice";
import ConsultationReducer from "./features/consultation/consultationSlice";
import PolServReducer from "./features/pollination/polservicesSlice";
import ProvisionReducer from "./features/supplyProvision/supplyProvSlice";
import ProductReducer from "./features/products/productsSlice";
import OrderReducer from "./features/orders/ordersSlice";
import ReviewReducer from "./features/reviews/reviewSlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    banners: bannerReducer,
    campaigns: campaignReducer,
    equipments: equipmentReducer,
    supplies: suppliesReducer,
    events: eventReducer,
    harvests: HarvestReducer,
    hunters: HunterReducer,
    hives: HiveReducer,
    reports: ReportReducer,
    services: ServiceReducer,
    setups: SetupReducer,
    consultations: ConsultationReducer,
    polservices: PolServReducer,
    provisions: ProvisionReducer,
    products: ProductReducer,
    orders: OrderReducer,
    reviews: ReviewReducer,
  },
});
export default store;
