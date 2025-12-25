import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import bannerReducer from "./features/banners/bannerSlice";
import campaignReducer from "./features/campaigns/campaignSlice";
import equipmentReducer from "./features/equuipments/equipmentSlice";
import suppliesReducer from "./features/supplies/suppliesSlice";
import eventReducer from "./features/events/eventSlice";
import EnquiryReducer from "./features/enquiries/enquirySlice";
import QuranReducer from "./features/quran/quranSlice";
import RegisterationReducer from "./features/registerations/registerationSlice";
import ReportReducer from "./features/donors/donorSlice";
import feedbackReducer from "./features/feedbacks/feedbackSlice";
import SetupReducer from "./features/apiarySetup/setupCompSlice";
import ConsultationReducer from "./features/consultation/consultationSlice";
import PolServReducer from "./features/pollination/polservicesSlice";
import DonationReducer from "./features/donations/donationSlice";
import ProgrammeReducer from "./features/programmes/programmeSlice";
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
    enquiries: EnquiryReducer,
    quran: QuranReducer,
    registerations: RegisterationReducer,
    reports: ReportReducer,
    feedbacks: feedbackReducer,
    setups: SetupReducer,
    consultations: ConsultationReducer,
    polservices: PolServReducer,
    donations: DonationReducer,
    programmes: ProgrammeReducer,
    orders: OrderReducer,
    reviews: ReviewReducer,
  },
});
export default store;
