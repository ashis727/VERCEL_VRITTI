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
          href: "/employer/requirements",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: " Check Requirements",
          href: "/employer/requirements/checkReq",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Notifications",
          href: "/employer/notifications",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "News Letter",
          href: "/employer/newsletter",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "FAQs",
          href: "/employer/faqs",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Support",
          href: "/employer/support",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "About Us",
          href: "/employer/about",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Privacy Policy",
          href: "/employer/privacypolicy",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Term & Conditions",
          href: "/employer/tnc",
          subMenu: [],
          icon: CgMenuLeftAlt,
        },
        {
          menuItem: "Blogs n More",
          href: "/employer/others",
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
