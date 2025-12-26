// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import { lazy } from "react";
import Icon from "@mui/material/Icon";

// Authentication........
const SignIn = lazy(() =>
  import("./layouts/authentication/sign-in").then((module) => ({
    default: module.default,
  }))
);

//pages...............
const Banners = lazy(() =>
  import("./layouts/banners").then((module) => ({
    default: module.default,
  }))
);
const Users = lazy(() =>
  import("./layouts/users").then((module) => ({
    default: module.default,
  }))
);

const Campaigns = lazy(() =>
  import("./layouts/campaigns").then((module) => ({
    default: module.default,
  }))
);
const Events = lazy(() =>
  import("./layouts/events").then((module) => ({
    default: module.default,
  }))
);
const Enquiries = lazy(() =>
  import("./layouts/enquiries").then((module) => ({
    default: module.default,
  }))
);
const Donations = lazy(() =>
  import("./layouts/donations").then((module) => ({
    default: module.default,
  }))
);
const Quran = lazy(() =>
  import("./layouts/quran").then((module) => ({
    default: module.default,
  }))
);
const Registerations = lazy(() =>
  import("./layouts/registerations").then((module) => ({
    default: module.default,
  }))
);
const Feedbacks = lazy(() =>
  import("./layouts/feedbacks").then((module) => ({
    default: module.default,
  }))
);
const Programmes = lazy(() =>
  import("./layouts/programmes").then((module) => ({
    default: module.default,
  }))
);

//single pages........................
const SingleDonor = lazy(() =>
  import("./layouts/donations").then((module) => ({
    default: module.SingleDonor,
  }))
);
const SingleUser = lazy(() =>
  import("./layouts/users").then((module) => ({
    default: module.SingleUser,
  }))
);
const SingleProgramme = lazy(() =>
  import("./layouts/programmes").then((module) => ({
    default: module.SingleProgramme,
  }))
);

//create update pages.................
const CreateUpdateBanner = lazy(() =>
  import("./layouts/banners").then((module) => ({
    default: module.CreateUpdateBanner,
  }))
);
const CreateUpdateCampaign = lazy(() =>
  import("./layouts/campaigns").then((module) => ({
    default: module.CreateUpdateCampaign,
  }))
);
const CreateUpdateEvent = lazy(() =>
  import("./layouts/events").then((module) => ({
    default: module.CreateUpdateEvent,
  }))
);
const CreateUpdateEnquiry = lazy(() =>
  import("./layouts/enquiries").then((module) => ({
    default: module.CreateUpdateEnquiry,
  }))
);
const CreateUpdateQuran = lazy(() =>
  import("./layouts/quran").then((module) => ({
    default: module.CreateUpdateQuran,
  }))
);
const CreateUpdateRegisteration = lazy(() =>
  import("./layouts/registerations").then((module) => ({
    default: module.CreateUpdateRegisteration,
  }))
);

const CreateUpdateProgramme = lazy(() =>
  import("./layouts/programmes").then((module) => ({
    default: module.CreateUpdateProgramme,
  }))
);

const routes = [
  {
    type: "collapse",
    name: "Overview",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Banners",
    key: "banners",
    icon: <Icon fontSize="small">view_carousel</Icon>,
    route: "/banners",
    component: <Banners />,
  },
  {
    type: "collapse",
    name: "Campaigns",
    key: "campaigns",
    icon: <Icon fontSize="small">campaign</Icon>,
    route: "/campaigns",
    component: <Campaigns />,
  },
  {
    type: "collapse",
    name: "Events",
    key: "events",
    icon: <Icon fontSize="small">mosque</Icon>,
    route: "/events",
    component: <Events />,
  },
  {
    type: "collapse",
    name: "Enquiries",
    key: "enquiries",
    icon: <Icon fontSize="small">contact_support</Icon>,
    route: "/enquiries",
    component: <Enquiries />,
  },
  {
    type: "collapse",
    name: "Quran",
    key: "quran",
    icon: <Icon fontSize="small">auto_stories</Icon>,
    route: "/quran",
    component: <Quran />,
  },
  {
    type: "collapse",
    name: "Donations",
    key: "donations",
    icon: <Icon fontSize="small">volunteer_activism</Icon>,
    route: "/donations",
    component: <Donations />,
  },
  {
    type: "collapse",
    name: "Programmes",
    key: "programmes",
    icon: <Icon fontSize="small">event_note</Icon>,
    route: "/programmes",
    component: <Programmes />,
  },
  {
    type: "collapse",
    name: "Registerations",
    key: "registerations",
    icon: <Icon fontSize="small">how_to_reg</Icon>,
    route: "/registerations",
    component: <Registerations />,
  },
  {
    type: "collapse",
    name: "Feedbacks",
    key: "feedbacks",
    icon: <Icon fontSize="small">comment</Icon>,
    route: "/feedbacks",
    component: <Feedbacks />,
  },
];
export const authRoutes = [
  {
    type: "collapse",
    name: "Log In",
    key: "log-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },

];
export const singleroutes = [
  //pages
  {
    type: "collapse",
    name: "sigleDonor",
    key: "singleDonor",
    route: "/donations/:id",
    component: <SingleDonor />,
  },
  {
    type: "collapse",
    name: "single programme",
    key: "single_programme",
    route: "/programmes/:id",
    component: <SingleProgramme />,
  },
  {
    type: "collapse",
    name: "single user",
    key: "single_user",
    route: "/users/:id",
    component: <SingleUser />,
  },
  {
    type: "collapse",
    name: "updatecreatebanner",
    key: "updatecreatebanner",
    route: "/admin/createupdatebanner/:id",
    component: <CreateUpdateBanner />,
  },
  {
    type: "collapse",
    name: "updatecreatecampaign",
    key: "updatecreatecampaign",
    route: "/createupdatecampaign/:id",
    component: <CreateUpdateCampaign />,
  },
  {
    type: "collapse",
    name: "updatecreateprogramme",
    key: "updatecreateprogramme",
    route: "/createupdateprogramme/:id",
    component: <CreateUpdateProgramme />,
  },
  {
    type: "collapse",
    name: "updatecreateevent",
    key: "updatecreateevent",
    route: "/createupdateevent/:id",
    component: <CreateUpdateEvent />,
  },
  {
    type: "collapse",
    name: "updatecreateenquiry",
    key: "updatecreateenquiry",
    route: "/createupdateenquiry/:id",
    component: <CreateUpdateEnquiry />,
  },
  {
    type: "collapse",
    name: "updatecreatequran",
    key: "updatecreatequran",
    route: "/createupdatequran/:id",
    component: <CreateUpdateQuran />,
  },
  {
    type: "collapse",
    name: "updatecreateregisteration",
    key: "updatecreateregisteration",
    route: "/createupdateregisteration/:id",
    component: <CreateUpdateRegisteration />,
  },
];

export default routes;
