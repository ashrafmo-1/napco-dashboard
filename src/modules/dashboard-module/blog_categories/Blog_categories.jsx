import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useBlog_categoriesHook } from "./hooks/useBlog_categoriesHook";
import { AddNewBlog_categories } from "./AddNewBlog_categories";
import { EditBlogCategories } from "./EditBlog_categories";
import { DeleteBlogCategory } from "./DeleteBlogCategory";
import { AppstoreOutlined } from "@ant-design/icons";
import { SearchFilter } from "../../components/SearchFilter";

export const BlogCategories = () => {
  const { t } = useTranslation();
  const { setSearchTerm, pageCount, setCurrentPage, blogCategories } =
    useBlog_categoriesHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8">
        <AppstoreOutlined />
        {t("blogCategory.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewBlog_categories />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("blogCategory.table.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogCategory.table.isActive")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("globals.action")}
              </th>
            </tr>
          </thead>
          <tbody>
            {blogCategories.map((blogCategory, index) => (
              <tr className="bg-white border-b" key={index}>
                <td className="px-6 py-4">{blogCategory.name}</td>
                <td className="px-6 py-4">
                  {blogCategory.isActive === 1 ? (
                    <div className="bg-green-600 py-1 px-3 text-white w-fit rounded-full flex justify-center items-center">
                      {t("globals.status.active")}
                    </div>
                  ) : (
                    <div className="bg-red-600 py-1 px-3 text-white  w-fit rounded-full flex justify-center items-center">
                      {t("globals.status.inActive")}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 flex gap-3">
                  <DeleteBlogCategory
                    blogCategoryId={blogCategory.blogCategoryId}
                  />
                  <EditBlogCategories
                    blogCategoryId={blogCategory.blogCategoryId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          showQuickJumper
          current={pageCount["current_page"]}
          total={pageCount["total"]}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
