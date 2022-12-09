import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import MapsNew from "views/Maps/MapsNew.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import Symptoms from "views/Symptoms/Symptoms";
import Reviews from "views/Reviews/Reviews";
import DoctorProfile from "views/DoctorProfile/DoctorProfile";
import ProFeature from "views/ProFeature/ProFeature";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/user",
  },
  {
    path: "/profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/user",
  },
  {
    path: "/appointments",
    name: "Appointments",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/user",
  },
  {
    path: "/bookAppointment/:docId",
    name: "Book Appointment",
    rtlName: "طباعة",
    icon: "book_online",
    component: Typography,
    layout: "/user",
  },
  {
    path: "/scheduled",
    name: "Scheduled",
    rtlName: "الرموز",
    icon: "video_camera_front",
    component: Icons,
    layout: "/user",
  },
  {
    path: "/doctors",
    name: "Doctors",
    rtlName: "خرائط",
    icon: "person_search",
    component: MapsNew,
    layout: "/user",
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    rtlName: "خرائط",
    icon: "person_search",
    component: Symptoms,
    layout: "/user",
  },
  {
    path: "/profeature",
    name: "Pro Feature",
    rtlName: "خرائط",
    icon: "person_search",
    component: ProFeature,
    layout: "/user",
  },
  {
    path: "/reviews",
    name: "",
    rtlName: "خرائط",
    icon: "",
    component: Reviews,
    layout: "/user",
  },
  {
    path: "/doctor-profile/:id",
    name: "",
    rtlName: "خرائط",
    icon: "",
    component: DoctorProfile,
    layout: "/user",
  },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/user"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Donate for Good",
  //   rtlName: "التطور للاحترافية",
  //   icon: "support",
  //   component: UpgradeToPro,
  //   layout: "/user"
  // }
];

export default dashboardRoutes;
