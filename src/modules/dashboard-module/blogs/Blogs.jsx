import { EditFilled, FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Image, Pagination } from "antd";
import { useTranslation } from "react-i18next";
import { useBlogHook } from "./hooks/useBlogHook";
import { DeleteBlog } from "./DeleteBlog";
import { SearchFilter } from "../../components/SearchFilter";
import { Link } from "react-router-dom";
import { Status } from "../../components/Status";
import {MAINPATH} from "../../../constant/MAINPATH.js";

export const Blogs = () => {
  const { t, i18n } = useTranslation();
  const { pageCount, setSearchTerm, setCurrentPage, blogs } = useBlogHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <FileTextOutlined />
        {t("blogs.title")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <Button type="primary">
        <Link to={`/${MAINPATH}/${i18n.language}/add-new-blog`}>add</Link>
      </Button>

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableThumbnail")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableTitle")}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableCategoryName")}{" "}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableIsPublished")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("blogs.add.TableAction")}
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs &&
              blogs.map((blog, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium w-20 text-gray-900 whitespace-nowrap"
                  >
                    {blog.thumbnail ? (
                      <Image
                        className="w-full"
                        src={blog.thumbnail}
                        alt={blog.title}
                      />
                    ) : (
                      <UserOutlined />
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {blog.title}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {blog.categoryName}
                  </th>
                  <td className="px-6 py-4">
                    <Status
                      value={blog.isPublished}
                      activeText={"active"}
                      inactiveText={"inActive"}
                    />
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteBlog BlogId={blog.blogId} />
                    <Link
                      to={`/${MAINPATH}/${i18n.language}/blog/edit/${blog.blogId}`}
                    >
                      <Button className="" type="primary">
                        <EditFilled />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          showQuickJumper
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};
