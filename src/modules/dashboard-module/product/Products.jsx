import {useTranslation} from "react-i18next";
import {Status} from "../../components/Status";
import {Button, Image, Pagination} from "antd";
import {useProductsHook} from "./hook/useProductsHook";
import DeleteProduct from "./DeleteProduct";
import {AppstoreOutlined, EditOutlined, PlusSquareFilled} from "@ant-design/icons";
import {SearchFilter} from "../../components/SearchFilter";
import {Link} from "react-router-dom";
import {MAINPATH} from "../../../constant/MAINPATH.js";

export const Products = () => {
    const {t, i18n} = useTranslation();
    const {products, pageCount, setSearchTerm, setCurrentPage} = useProductsHook();

    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8 flex gap-2 items-center">
                <AppstoreOutlined/>
                {t("products.title")}
            </h1>

            <div className="filter mb-6 shadow p-4 rounded-lg">
                <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
                <div className="flex items-center gap-4">
                    <SearchFilter search={setSearchTerm}/>
                </div>
            </div>

            {/* {hasCreateUserPermission && ( */}
            <Link to={`/${MAINPATH}/${i18n.language}/add-new-product`} type="primary">
                <Button type="primary">
                    <PlusSquareFilled/>
                    {t("products.add.title")}
                </Button>
            </Link>
            {/* )} */}

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 capitalize bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {t("products.name")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("photo")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("globals.status.title")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("globals.action")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {products &&
                        products.map((product, index) => (
                            <tr className="bg-white border-b" key={index}>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <Image
                                        src={product.image}
                                        width={50}
                                        alt={product.name}
                                        loading="lazy"
                                    />
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    {product.name}
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                >
                                    <Status
                                        value={product.isActive}
                                        activeText={t("globals.status.active")}
                                        inactiveText={t("globals.status.inActive")}
                                    />
                                </th>
                                <td className="px-6 py-4 flex gap-3">
                                    <DeleteProduct productId={product.productId}/>
                                    <Button className="edit">
                                        <Link
                                            to={`/${MAINPATH}/${i18n.language}/products/edit/${product.productId}`}
                                        >
                                            <EditOutlined/>
                                        </Link>
                                    </Button>
                                    {/* <EditProduct productId= /> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    showQuickJumper
                    onChange={onChange}
                    total={pageCount.total}
                    current={pageCount.current_page}
                    className="mb-4 mt-10 flex justify-center items-center"
                />
            </div>
        </div>
    );
};
