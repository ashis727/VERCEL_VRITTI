import { IconType } from "react-icons";
import { CgMenuLeftAlt, CgAbstract } from "react-icons/cg";

export type TSubMenu = {
  menuItem: string;
  href: string;
};

export type TMenu = {
  menuItem: string;
  href: string;
  subMenu: TSubMenu[];
  icon: IconType;
};

export type TMenuGroup = {
  title: string;
  menu: TMenu[];
  showGroupTitle: boolean;
};

export class Menu {
  static sideMenu: TMenuGroup[] = [
    {
      title: "Employer",
      showGroupTitle: true,
      menu: [
        {
          menuItem: "Home",
          href: "/employer",
          subMenu: [],
          icon: CgAbstract,
        },
        {
          menuItem: "Profile",
          href: "/employer/profile/form",
          subMenu: [],
          icon: CgAbstract,
        },
        {
          menuItem: "Requirements",
          href: "/employer/Requirements",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: " Check Requirements",
          href: "/employer/Requirements/CheckReq",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Notifications",
          href: "/employer/Notifications",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "News Letter",
          href: "/employer/Newsletter",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "FAQs",
          href: "/employer/Faqs",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Support",
          href: "/employer/Support",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "About Us",
          href: "/employer/About",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Privacy Policy",
          href: "/employer/PrivacyPolicy",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Term & Conditions",
          href: "/employer/TnC",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Blogs n More",
          href: "/employer/Others",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
      ],
    },
    // {
    //   title: "Analytics",
    //   showGroupTitle: true,
    //   menu: [
    //     {
    //       menuItem: "Employee",
    //       href: "/dashboard",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Charts",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgAbstract,
    //     },
    //     {
    //       menuItem: "Cards",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Interviews",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //     {
    //       menuItem: "Courses",
    //       href: "/",
    //       subMenu: [],
    //       icon: CgMenuLeftAlt,
    //     },
    //   ],
    // },
  ];
}
