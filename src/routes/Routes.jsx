import {Navigate, Route, Routes as RouterRoutes} from "react-router-dom";
import {MAINPATH} from "../constant/MAINPATH";
import {useTranslation} from "react-i18next";
import {AuthGuard, LoginProdect} from "../hooks";
import {NotFound} from "../common/NotFound";
import LoginPage from "../modules/auth-module/page/LoginPage";
import {
    AddBlog, AddProduct,
    Admins,
    AllCareers, BlogCategories, Blogs,
    Candidates,
    ContactUs,
    Customers, EditBlog, EditProduct,
    NewsLetter, ProductCategory, Products,
    Subscribers
} from "../modules/dashboard-module/index.js";


export const AppRoutes = () => {
    const { i18n } = useTranslation();

    return (
        <RouterRoutes>
            <Route path="/" element={<Navigate to={`/${MAINPATH}/${i18n.language}/Dashboard`}/>} />
            {/* login, sign in */}
            <Route element={<AuthGuard/>}>
                <Route path={`/${MAINPATH}/authentication`} element={<LoginPage/>} />
            </Route>
            {/* modules routes pages */}
            <Route element={<LoginProdect/>}>
                <Route path={`/${MAINPATH}/${i18n.language}`}>
                    <Route path="home" element={<div>home page</div>} />
                    <Route path="users" element={<Admins />} />
                    <Route path="customers" element={<Customers />} />

                    <Route path="bolg-category" element={<BlogCategories />} />
                    <Route path="add-new-blog" element={<AddBlog />} />
                    <Route path="blogs" element={<Blogs />} />
                    <Route path={`blog/edit/:blogId`} element={<EditBlog />} />

                    <Route path={`products_category`} element={<ProductCategory />} />
                    <Route path={`add-new-product`} element={<AddProduct />} />
                    <Route path={`products`} element={<Products />} />
                    <Route path={`products/edit/:productId`} element={<EditProduct />} />


                    <Route path="careers" element={<AllCareers />} />
                    <Route path="subscribers" element={<Subscribers />} />
                    <Route path="Newsletter" element={<NewsLetter />} />
                    <Route path="contact-us" element={<ContactUs />} />
                    <Route path="candidates" element={<Candidates />} />
                </Route>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </RouterRoutes>
    );
};