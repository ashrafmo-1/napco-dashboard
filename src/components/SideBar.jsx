import {useLocation} from "react-router-dom";
import logo from "../assets/logo.png";
import {checkPermission} from "../helpers/check-permission";
import { UserOutlined, ShoppingOutlined, AppstoreOutlined, HomeOutlined, FileTextOutlined, CalendarOutlined, QuestionCircleOutlined, MailOutlined, UserAddOutlined, WechatWorkOutlined, SettingOutlined } from "@ant-design/icons";
import SideBarLink from "../common/SideBarLink";
// import { AdminProfile } from "../auth/AdminProfile";
import React from "react";
import {useTranslation} from "react-i18next";

export const SideBar = () => {
    const {t} = useTranslation();
    const location = useLocation();

    const links = [
        {
            title: `${t("modulesTitle.users")}`,
            path: `users`,
            icon: <UserOutlined/>,
            permissionName: "all_users",
        },
        {
            title: `${t("modulesTitle.customers")}`,
            path: `customers`,
            icon: <ShoppingOutlined/>,
            permissionName: "all_customers",
        },
        {
            title: `${t("modulesTitle.productCategory")}`,
            path: `product_categories`,
            icon: <AppstoreOutlined/>,
            permissionName: "all_product_categories",
        },
        {
            title: `${t("modulesTitle.products")}`,
            path: `products`,
            icon: <AppstoreOutlined/>,
            permissionName: "all_products",
        },
        {
            title: `${t("modulesTitle.bolgsCategory")}`,
            path: `blog_categories`,
            icon: <AppstoreOutlined/>,
            permissionName: "all_blog_categories",
        },
        {
            title: `${t("modulesTitle.blogs")}`,
            path: `blogs`,
            icon: <FileTextOutlined/>,
            permissionName: "all_blogs",
        },
        {
            title: `${t("modulesTitle.faq")}`,
            path: `faq`,
            icon: <QuestionCircleOutlined/>,
            permissionName: "all_faqs",
        },
        {
            title: `${t("modulesTitle.events")}`,
            path: `events`,
            icon: <CalendarOutlined/>,
            permissionName: "all_events",
        },
        {
            title: `${t("modulesTitle.newsLetter")}`,
            path: `newsletter`,
            icon: <MailOutlined/>,
            permissionName: "all_newsletters",
        },
    ];

    const isActive = (path) => location.pathname.includes(path);

    return (
        <section
            className="side-bar bg-[#151515] size-full m-1 rounded-lg text-white shadow-md border-[.4px] border-black sticky top-0 py-4 pb-20 transition-all left-0 px-4">
            <img src={logo} alt="logo" width={100} className="mb-5"/>
            <div className="side-links px-1 mb-10 flex flex-col gap-1">
                <SideBarLink
                    content={t("modulesTitle.dashboard")}
                    endPoint={`home`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("modulesTitle.users")}
                    endPoint={`users`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("modulesTitle.customers")}
                    endPoint={`customers`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("modulesTitle.bolgsCategory")}
                    endPoint={`bolg-category`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("modulesTitle.blogs")}
                    endPoint={`blogs`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("modulesTitle.productCategory")}
                    endPoint={`products_category`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("modulesTitle.products")}
                    endPoint={`products`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />
                <SideBarLink
                    content={t("certifications")}
                    endPoint={`certifications`}
                    iconComp={<HomeOutlined/>}
                    className={isActive("Dashboard") ? "active-class" : ""}
                />


                {links.map((link) => {
                    const hasPermission = checkPermission(link.permissionName);
                    return hasPermission ? (
                        <React.Fragment key={link.path}>
                            <SideBarLink
                                content={link.title}
                                endPoint={`${link.path}`}
                                iconComp={link.icon}
                                className={isActive(link.path) ? "active-class" : ""}
                            />
                        </React.Fragment>
                    ) : null;
                })}

                <SideBarLink
                    content={t("modulesTitle.newsLetter")}
                    endPoint={`Newsletter`}
                    iconComp={<MailOutlined/>}
                    className={isActive("Newsletter") ? "active-class" : ""}
                />

                <SideBarLink
                    content={t("modulesTitle.subscribers")}
                    endPoint={`subscribers`}
                    iconComp={<UserAddOutlined/>}
                    className={isActive("subscribers") ? "active-class" : ""}
                />

                <SideBarLink
                    content={t("modulesTitle.careers")}
                    endPoint={`careers`}
                    iconComp={<WechatWorkOutlined/>}
                    className={isActive("careers") ? "active-class" : ""}
                />

                <SideBarLink
                    content={t("modulesTitle.candidates")}
                    endPoint={`candidates`}
                    iconComp={<UserOutlined/>}
                    className={isActive("candidates") ? "active-class" : ""}
                />

                <SideBarLink
                    content={t("modulesTitle.contactUs")}
                    endPoint={`contact-us`}
                    iconComp={<MailOutlined/>}
                    className={isActive("contact-us") ? "active-class" : ""}
                />

                <SideBarLink
                    content={t("modulesTitle.siteSettings")}
                    endPoint={`portfolio-settings`}
                    iconComp={<SettingOutlined/>}
                    className={isActive("portfolio-settings") ? "active-class" : ""}
                />
            </div>
            {/* <AdminProfile /> */}
        </section>
    );
};