import { GiHelp } from "react-icons/gi";

import { TbReportAnalytics } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import { FcRating } from "react-icons/fc";
import { MdCreditScore } from "react-icons/md";
import { TbFileReport } from "react-icons/tb";


export const menuItems = [
    // {
    //     page: "Home",
    //     list: [
    //         {
    //             title: "Dashboard",
    //             link: "/dashboard",
    //             icon: <TfiWrite />
    //         }
    //     ]
    // },
    {
        page: "Scripts",
        list: [
            {
                title: "Scripts",
                link: "/dashboard/scripts",
                icon: <TfiWrite />
            },
            {
                title: "Scripts Intrigue Rating",
                link: "/dashboard/rating",
                icon: <FcRating />
            },
            {
                title: "Scripts Score",
                link: "/dashboard/score",
                icon: <MdCreditScore />
            },
            {
                title: "PPO Report",
                link: "/dashboard/report",
                icon: <TbFileReport />
            }
        ]
    },
    {
        page: "Analytics",
        list: [
            {
                title: "Reports",
                link: "/reports",
                icon: <TbReportAnalytics />
            }
        ]
    },
    {
        page: "User",
        list: [
            {
                title: "Help",
                link: "/help",
                icon: <GiHelp />
            }
        ]
    }

]