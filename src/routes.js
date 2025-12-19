// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import { lazy } from "react";
import Icon from "@mui/material/Icon";

// Authentication........
// const CheckEmail = lazy(() =>
//   import("./layouts/authentication/email").then((module) => ({
//     default: module.default,
//   }))
// );
const SignUp = lazy(() =>
  import("./layouts/authentication/sign-up").then((module) => ({
    default: module.default,
  }))
);
const SignIn = lazy(() =>
  import("./layouts/authentication/sign-in").then((module) => ({
    default: module.default,
  }))
);
const Cover = lazy(() =>
  import("./layouts/authentication/reset-password/cover").then((module) => ({
    default: module.default,
  }))
);
const ResetPassword = lazy(() =>
  import("./layouts/authentication/change-password").then((module) => ({
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
const Equipments = lazy(() =>
  import("./layouts/equipments").then((module) => ({
    default: module.default,
  }))
);
const Reports = lazy(() =>
  import("./layouts/reports").then((module) => ({
    default: module.default,
  }))
);
const Supplies = lazy(() =>
  import("./layouts/supplies").then((module) => ({
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
const Provisions = lazy(() =>
  import("./layouts/provisions").then((module) => ({
    default: module.default,
  }))
);
const Hunters = lazy(() =>
  import("./layouts/hunters").then((module) => ({
    default: module.default,
  }))
);
const Hives = lazy(() =>
  import("./layouts/hives").then((module) => ({
    default: module.default,
  }))
);
const Services = lazy(() =>
  import("./layouts/services").then((module) => ({
    default: module.default,
  }))
);
const Setup = lazy(() =>
  import("./layouts/setups").then((module) => ({
    default: module.default,
  }))
);
const Consultation = lazy(() =>
  import("./layouts/consultations").then((module) => ({
    default: module.default,
  }))
);
const Pollination = lazy(() =>
  import("./layouts/pollinations").then((module) => ({
    default: module.default,
  }))
);
const Programmes = lazy(() =>
  import("./layouts/programmes").then((module) => ({
    default: module.default,
  }))
);
const Orders = lazy(() =>
  import("./layouts/orders").then((module) => ({
    default: module.default,
  }))
);
const Reviews = lazy(() =>
  import("./layouts/reviews").then((module) => ({
    default: module.default,
  }))
);
//single pages........................
// const SingleEmployee = lazy(() =>
//   import("./layouts/banners").then((module) => ({
//     default: module.SingleEmployee,
//   }))
// );
// const SingleStation = lazy(() =>
//   import("./layouts/campaigns").then((module) => ({
//     default: module.SingleStation,
//   }))
// );
const SingleHunter = lazy(() =>
  import("./layouts/hunters").then((module) => ({
    default: module.SingleHunter,
  }))
);
const SingleHive = lazy(() =>
  import("./layouts/hives").then((module) => ({
    default: module.SingleHive,
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
const CreateUpdateSupply = lazy(() =>
  import("./layouts/supplies").then((module) => ({
    default: module.CreateUpdateSupply,
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
const CreateUpdateHunter = lazy(() =>
  import("./layouts/hunters").then((module) => ({
    default: module.CreateUpdateHunter,
  }))
);
const CreateUpdateHive = lazy(() =>
  import("./layouts/hives").then((module) => ({
    default: module.CreateUpdateHive,
  }))
);
const CreateUpdateReport = lazy(() =>
  import("./layouts/reports").then((module) => ({
    default: module.CreateUpdateReport,
  }))
);
const CreateUpdateService = lazy(() =>
  import("./layouts/services").then((module) => ({
    default: module.CreateUpdateService,
  }))
);
const CreateUpdateSetup = lazy(() =>
  import("./layouts/setups").then((module) => ({
    default: module.CreateUpdateSetup,
  }))
);
const CreateUpdateConsultation = lazy(() =>
  import("./layouts/consultations").then((module) => ({
    default: module.CreateUpdateConsultation,
  }))
);
const CreateUpdatePollination = lazy(() =>
  import("./layouts/pollinations").then((module) => ({
    default: module.CreateUpdatePollination,
  }))
);
const CreateUpdateProvision = lazy(() =>
  import("./layouts/provisions").then((module) => ({
    default: module.CreateUpdateProvision,
  }))
);
const CreateUpdateEquipment = lazy(() =>
  import("./layouts/equipments").then((module) => ({
    default: module.CreateUpdateEquipment,
  }))
);
const CreateUpdateProgramme = lazy(() =>
  import("./layouts/programmes").then((module) => ({
    default: module.CreateUpdateProgramme,
  }))
);
const UpdateOrder = lazy(() =>
  import("./layouts/orders").then((module) => ({
    default: module.UpdateOrder,
  }))
);
const UpdateReview = lazy(() =>
  import("./layouts/reviews").then((module) => ({
    default: module.UpdateReview,
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
    icon: <Icon fontSize="small">people</Icon>, // "people" icon better represents users
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
    name: "Orders",
    key: "orders",
    icon: <Icon fontSize="small">shopping_cart</Icon>, // Shopping cart icon for orders
    route: "/orders",
    component: <Orders />,
  },
  {
    type: "collapse",
    name: "Reviews",
    key: "reviews",
    icon: <Icon fontSize="small">rate_review</Icon>,
    route: "/reviews",
    component: <Reviews />,
  },
  {
    type: "collapse",
    name: "Consultations",
    key: "consultations",
    icon: <Icon fontSize="small">forum</Icon>, // Forum icon for consultations
    route: "/consultations",
    component: <Consultation />,
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
    name: "Hunters",
    key: "hunters",
    icon: <Icon fontSize="small">hiking</Icon>, // Hiking icon for hunters
    route: "/hunters",
    component: <Hunters />,
  },
  {
    type: "collapse",
    name: "Provisions",
    key: "provisions",
    icon: <Icon fontSize="small">inventory</Icon>,
    route: "/provisions",
    component: <Provisions />,
  },
  {
    type: "collapse",
    name: "Programmes",
    key: "programmes",
    icon: <Icon fontSize="small">storefront</Icon>,
    route: "/programmes",
    component: <Programmes />,
  },
  {
    type: "collapse",
    name: "Hives",
    key: "hives",
    icon: <Icon fontSize="small">hive</Icon>, // Hive icon for hives
    route: "/hives",
    component: <Hives />,
  },
  {
    type: "collapse",
    name: "Services",
    key: "services",
    icon: <Icon fontSize="small">miscellaneous_services</Icon>, // Services icon for services
    route: "/services",
    component: <Services />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">assessment</Icon>, // Assessment icon for reports
    route: "/reports",
    component: <Reports />,
  },
  {
    type: "collapse",
    name: "Setups",
    key: "setup",
    icon: <Icon fontSize="small">settings</Icon>, // Settings icon for setups
    route: "/setups",
    component: <Setup />,
  },
  {
    type: "collapse",
    name: "Pollinations",
    key: "pollination",
    icon: <Icon fontSize="small">nature</Icon>, // Nature icon for pollinations
    route: "/pollinations",
    component: <Pollination />,
  },
  {
    type: "collapse",
    name: "Equipments",
    key: "equipments",
    icon: <Icon fontSize="small">construction</Icon>,
    route: "/equipments",
    component: <Equipments />,
  },
  {
    type: "collapse",
    name: "Supplies",
    key: "supplies",
    icon: <Icon fontSize="small">local_shipping</Icon>, // Local shipping icon for Supplies
    route: "/supplies",
    component: <Supplies />,
  },
];
export const authRoutes = [
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   // icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/check",
  //   component: <CheckEmail />,
  // },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    // icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Log In",
    key: "log-in",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Forget-Password",
    key: "forget-password",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/forget-password",
    component: <Cover />,
  },
  {
    type: "collapse",
    name: "Reset-Password",
    key: "reset-password",
    // icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/reset-password",
    component: <ResetPassword />,
  },
];
export const singleroutes = [
  //pages
  // {
  //   type: "collapse",
  //   name: "single employee",
  //   key: "single_employee",
  //   route: "/employees/:id",
  //   component: <SingleEmployee />,
  // },
  {
    type: "collapse",
    name: "single programme",
    key: "single_programme",
    route: "/programmes/:id",
    component: <SingleProgramme />,
  },
  // {
  //   type: "collapse",
  //   name: "single station",
  //   key: "single_station",
  //   route: "/stations/:id",
  //   component: <SingleStation />,
  // },
  {
    type: "collapse",
    name: "single hunter",
    key: "single_hunter",
    route: "/hunters/:id",
    component: <SingleHunter />,
  },
  {
    type: "collapse",
    name: "single hive",
    key: "single_hive",
    route: "/hives/:id",
    component: <SingleHive />,
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
    name: "updateorder",
    key: "updateorder",
    route: "/updateorder/:id",
    component: <UpdateOrder />,
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
    name: "updatecreatehunter",
    key: "updatecreatehunter",
    route: "/createupdatehunter/:id",
    component: <CreateUpdateHunter />,
  },
  {
    type: "collapse",
    name: "updatecreatehive",
    key: "updatecreatehive",
    route: "/createupdatehive/:id",
    component: <CreateUpdateHive />,
  },
  {
    type: "collapse",
    name: "updatecreatereport",
    key: "updatecreatereport",
    route: "/createupdatereport/:id",
    component: <CreateUpdateReport />,
  },
  {
    type: "collapse",
    name: "updatecreatepollination",
    key: "updatecreatepollination",
    route: "/createupdatepollination/:id",
    component: <CreateUpdatePollination />,
  },
  {
    type: "collapse",
    name: "updatecreateservice",
    key: "updatecreateservice",
    route: "/createupdateservice/:id",
    component: <CreateUpdateService />,
  },
  {
    type: "collapse",
    name: "updatecreatesetup",
    key: "updatecreatesetup",
    route: "/createupdatesetup/:id",
    component: <CreateUpdateSetup />,
  },
  {
    type: "collapse",
    name: "updatecreateconsultations",
    key: "updatecreateconsultations",
    route: "/createupdateconsultation/:id",
    component: <CreateUpdateConsultation />,
  },
  {
    type: "collapse",
    name: "updatecreateprovision",
    key: "updatecreateprovision",
    route: "/createupdateprovision/:id",
    component: <CreateUpdateProvision />,
  },
  {
    type: "collapse",
    name: "updatecreateequipment",
    key: "updatecreateequipment",
    route: "/createupdateequipment/:id",
    component: <CreateUpdateEquipment />,
  },
  {
    type: "collapse",
    name: "updatecreatesupply",
    key: "updatecreatesupply",
    route: "/createupdatesupply/:id",
    component: <CreateUpdateSupply />,
  },
  {
    type: "collapse",
    name: "updatereview",
    key: "updatereview",
    route: "/updatereview/:id",
    component: <UpdateReview />,
  },
];

export default routes;
