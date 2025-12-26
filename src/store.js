import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import bannerReducer from "./features/banners/bannerSlice";
import campaignReducer from "./features/campaigns/campaignSlice";
import eventReducer from "./features/events/eventSlice";
import EnquiryReducer from "./features/enquiries/enquirySlice";
import QuranReducer from "./features/quran/quranSlice";
import RegisterationReducer from "./features/registerations/registerationSlice";
import feedbackReducer from "./features/feedbacks/feedbackSlice";
import DonationReducer from "./features/donations/donationSlice";
import ProgrammeReducer from "./features/programmes/programmeSlice";
const store = configureStore({
  reducer: {
    users: userReducer,
    banners: bannerReducer,
    campaigns: campaignReducer,
    events: eventReducer,
    enquiries: EnquiryReducer,
    quran: QuranReducer,
    registerations: RegisterationReducer,
    feedbacks: feedbackReducer,
    donations: DonationReducer,
    programmes: ProgrammeReducer,
  },
});
export default store;
