import { Pagination } from "antd";
import React from "react";
import { Status } from "../../components/Status";
import { useTranslation } from "react-i18next";
import { useProductsCategoryHook } from "./hooks/useProductsCategoryHook";
import { AddNewProductCategeory } from "./AddNewProductCategeory";
import { DeleteProductCategory } from "./DeleteProductCategory";
import { EditProductCategory } from "./EditProductCategory";
import { AppstoreOutlined } from "@ant-design/icons";
import { SearchFilter } from "../../components/SearchFilter";

export const ProductCategory = () => {
  const { t } = useTranslation();
  const { productCategories, pageCount, setSearchTerm, setCurrentPage } =
    useProductsCategoryHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <AppstoreOutlined />
        {t("productCategory.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className="capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewProductCategeory />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("productCategory.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.status.checkActive")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {productCategories && productCategories.length > 0 ? (
              productCategories.map((productCategory, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {productCategory.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={productCategory.isActive}
                      activeText={t("globals.status.active")}
                      inactiveText={t("globals.status.inActive")}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteProductCategory
                      productCategoryId={productCategory.productCategoryId}
                    />
                    <EditProductCategory
                      productCategoryId={productCategory.productCategoryId}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500 bg-gray-100">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 mb-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 14l2-2 4 4m0 0l4-4m-4 4V3"
                      ></path>
                    </svg>
                    <span>{t("Product category noData")}</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          current={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
