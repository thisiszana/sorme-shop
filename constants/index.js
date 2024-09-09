import {
  PiBasketThin,
  PiCurrencyDollarSimpleThin,
  PiLayoutLight,
  PiPaperPlaneThin,
  PiPlusSquareThin,
  PiTextBLight,
  PiTextboxLight,
  PiUsersThin,
  PiPowerThin,
  PiTrashSimple,
  PiNewspaperLight,
  PiPencilSimpleLight,
  PiUploadLight,
  PiHeartLight,
  PiClockLight,
  PiLockSimpleOpenLight,
  PiArrowBendRightUpLight,
  PiArrowBendRightDownLight,
  PiBoundingBoxLight,
  PiQuestionLight,
  PiUserLight,
  PiCheckSquareLight,
  PiShieldCheckLight,
  PiHeadphonesLight,
  PiArrowDownLight,
  PiArrowRightLight,
  PiTwitterLogoLight,
  PiGoogleLogoLight,
  PiInstagramLogoLight,
  PiTelegramLogoLight,
  PiYoutubeLogoLight,
  PiEyeLight,
  PiArrowLeftLight,
  PiCreditCardLight,
  PiPaypalLogoLight,
  PiHandshakeLight,
  PiTruckLight,
} from "react-icons/pi";
import { GoHome, GoTasklist } from "react-icons/go";
import { IoIosNotificationsOutline, IoIosArrowDown } from "react-icons/io";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { GiShoppingCart } from "react-icons/gi";
import { FiGrid, FiShoppingBag, FiSettings } from "react-icons/fi";
import {
  MdSupportAgent,
  MdOutlineHealthAndSafety,
  MdProductionQuantityLimits,
  MdDeleteOutline,
} from "react-icons/md";
import {
  CiDark,
  CiDeliveryTruck,
  CiFilter,
  CiLocationOn,
  CiMenuBurger,
  CiSearch,
  CiSettings,
  CiTimer,
} from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { FcLike } from "react-icons/fc";
import { RiAdminLine } from "react-icons/ri";
import { TbCategory2, TbShoppingBagPlus } from "react-icons/tb";
import { AiOutlineProduct } from "react-icons/ai";

export const icons = {
  cart: <GiShoppingCart />,

  power: <PiPowerThin />,

  close: <TfiClose />,
  plus: <PiPlusSquareThin />,

  eyePassHiden: <IoEyeOffOutline />,
  eyePass: <IoEyeOutline />,
  time: <CiTimer />,

  dashboard: <FiGrid />,
  bagadmin: <FiShoppingBag />,
  setting: <FiSettings />,
  downArrowAd: <IoIosArrowDown />,
  dollar: <PiCurrencyDollarSimpleThin />,

  users: <PiUsersThin />,

  layout: <PiLayoutLight />,

  textBox: <PiTextboxLight />,
  tasks: <GoTasklist />,
  notification: <IoIosNotificationsOutline />,
  settings: <CiSettings />,
  power: <PiPowerThin />,
  search: <CiSearch />,

  moon: <CiDark />,
  trash: <PiTrashSimple />,
  pen: <PiPencilSimpleLight />,
  document: <PiNewspaperLight />,
  upload: <PiUploadLight />,

  clock: <PiClockLight />,
  lock: <PiLockSimpleOpenLight />,
  growArrow: <PiArrowBendRightUpLight />,
  downArrow: <PiArrowDownLight />,
  rightArrow: <PiArrowRightLight />,
  leftArrow: <PiArrowLeftLight />,
  fallingArrow: <PiArrowBendRightDownLight />,

  menu: <CiMenuBurger />,
  safe: <MdOutlineHealthAndSafety />,
  limit: <MdProductionQuantityLimits />,
  headphone: <MdSupportAgent />,
  filter: <CiFilter />,
  eye: <PiEyeLight />,
  location: <CiLocationOn />,
  creditCard: <PiCreditCardLight />,
  paypal: <PiPaypalLogoLight />,
  handShake: <PiHandshakeLight />,
  product: <AiOutlineProduct />,
  addToCart: <TbShoppingBagPlus />,
  delete: <MdDeleteOutline />,
  //
  twitter: <PiTwitterLogoLight />,
  google: <PiGoogleLogoLight />,
  instagram: <PiInstagramLogoLight />,
  telegram: <PiTelegramLogoLight />,
  youtube: <PiYoutubeLogoLight />,
  redHeart: <FcLike />,
  user: <PiUserLight />,
  deliveryTruck: <PiTruckLight />,
  paper: <PiPaperPlaneThin />,
  heart: <PiHeartLight />,
  category: <PiBoundingBoxLight />,
  question: <PiQuestionLight />,
  textB: <PiTextBLight />,
  basket: <PiBasketThin />,
  home: <GoHome />,
  admin: <RiAdminLine />,
  addToCart: <TbShoppingBagPlus />,
};

export const navLinks = [
  {
    title: "Home",
    icon: icons.home,
    link: "/",
  },
  {
    title: "Products",
    icon: icons.basket,
    link: "/products",
  },
  {
    title: "Categories",
    icon: icons.category,
    link: "/categories",
  },
  {
    title: "Blogs",
    icon: icons.textB,
    link: "/blogs",
  },
  {
    title: "About Us",
    icon: icons.question,
    link: "/about-us",
  },
];

export const profilePages = [
  {
    name: "Personal Information",
    route: "personal-information",
    icon: icons.user,
  },
  {
    name: "Orders",
    route: "orders",
    icon: icons.deliveryTruck,
  },
  {
    name: "Comments",
    route: "comments",
    icon: icons.paper,
  },
  {
    name: "Likes",
    route: "likes",
    icon: icons.heart,
  },
];

export const images = {
  logo: "/images/sorme-banner.png",
  signupimage: "/images/authSignup.jpg",
  signininage: "/images/authSignIn.jpg",
  forgotPass: "/images/authForgotPass.webp",
  manavatar: "/images/man-avatar.jpg",
  womanmanavatar: "/images/woman-avatar.jpg",
  heroimagebaner: "/images/banner.gif",
  banner: "/images/banner123456.png",
  iphone15: "/images/iphone15.png",
  downArrow: "/images/go-down-arrow.svg",
  airpods: "/images/airpods-pro.png",
  gamepad: "/images/gamepad.png",
  empty_cart: "/images/empty-cart.png",
};

export const footerLinks = [
  {
    isLink: true,
    title: "About Us",
    id: 1,
    links: [
      "Careers",
      "Our Stores",
      "Our Cares",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    isLink: true,
    title: "Customer Care",
    id: 2,
    links: [
      "Help Center",
      "Track Your Order",
      "Corporate & Bulk Purchasing",
      "Returns & Refunds",
    ],
  },
  {
    isLink: false,
    title: "Contact Us",
    id: 3,
    names: [
      "Help Center",
      "Track Your Order",
      "Corporate & Bulk Purchasing",
      "Returns & Refunds",
    ],
  },
];

export const socialMedia = [
  {
    icon: icons.youtube,
    link: "/",
    id: 1,
  },
  {
    icon: icons.twitter,
    link: "/",
    id: 2,
  },
  {
    icon: icons.google,
    link: "/",
    id: 3,
  },
  {
    icon: icons.instagram,
    link: "/",
    id: 4,
  },
  {
    icon: icons.telegram,
    link: "/",
    id: 5,
  },
];

export const categories = [
  {
    title: "Camera",
    query: "camera",
  },
  {
    title: "Gaming",
    query: "gaming",
  },
  {
    title: "Headphone",
    query: "headphone",
  },
  {
    title: "Laptop",
    query: "laptop",
  },
  {
    title: "Phone",
    query: "phone",
  },
  {
    title: "Printer",
    query: "printer",
  },
  {
    title: "Speaker",
    query: "speaker",
  },
  {
    title: "Tablet",
    query: "tablet",
  },
  {
    title: "TV",
    query: "tv",
  },
  {
    title: "Watch",
    query: "watch",
  },
];

export const sortProducts = [
  {
    sortName: "newest",
    sortId: 1,
  },
  {
    sortName: "oldest",
    sortId: 2,
  },
  {
    sortName: "most expensive",
    sortId: 3,
  },
  {
    sortName: "cheapest",
    sortId: 4,
  },
  {
    sortName: "bestselling",
    sortId: 5,
  },
];

export const orderColumn = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Ordered At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Total",
    dataIndex: "totalPayable",
    key: "totalPayable",
  },
  {
    dataIndex: "detail",
    key: "detail",
  },
];
