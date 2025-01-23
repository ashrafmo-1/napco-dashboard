import { useTranslation } from "react-i18next";
import { Pagination, Select } from "antd";
import { AddNewUser } from "./addNewUser";
import { EditUser } from "./editUser";
import { DeleteUser } from "./DeleteUser";
import { useUsersHook } from "./Hooks/useUsersHook";
import { UserOutlined } from "@ant-design/icons";
import { SearchFilter } from "../../components/SearchFilter";
import {Status} from "../../components/Status.jsx";

export const Admins = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, setStatusTerm, users, setCurrentPage } =
    useUsersHook();

  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <UserOutlined />
        {t("modulesTitle.users")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex flex-wrap items-center gap-4">
          <SearchFilter search={setSearchTerm} />
          {/* <Select
            defaultValue="Select Admin"
            style={{ width: 150 }}
            onChange={(e) => setStatusTerm(e.target.value)}
          >
            {type.map((item) => (
              <Select.Option value={item.value}>{item.label}</Select.Option>
            ))}
          </Select> */}

          <Select
            defaultValue=""
            style={{ width: 150 }}
            onChange={(value) =>
              setStatusTerm(value === "" ? null : Number(value))
            }
          >
            <Select.Option disabled>{t("status")}</Select.Option>
            <Select.Option value="">
              <div className="flex gap-1 items-center">
                <span className="p-1 bg-blue-500 h-2 w-2 rounded-full inline-block"></span>
                <span>{t("globals.status.all")}</span>
              </div>
            </Select.Option>
            <Select.Option value="1">
              <div className="flex gap-1 items-center">
                <span className="p-1 bg-green-500 h-2 w-2 rounded-full inline-block"></span>
                <span>{t("globals.status.active")}</span>
              </div>
            </Select.Option>
            <Select.Option value="0">
              <div className="flex gap-1 items-center">
                <span className="p-1 bg-red-500 h-2 w-2 rounded-full inline-block"></span>
                <span>{t("globals.status.inActive")}</span>
              </div>
            </Select.Option>
          </Select>
        </div>
      </div>

      <AddNewUser />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("users.table.name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("users.table.phone")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("users.table.address")}
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
            {users &&
              users.map((user, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">
                    <Status value={user.status} inactiveText={"Inactive"} activeText={"Active"} />
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <DeleteUser userId={user.userId} />
                    <EditUser userId={user.userId} />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <Pagination
          showQuickJumper
          defaultCurrent={pageCount.current_page}
          total={pageCount.total}
          onChange={onChange}
          className="mb-4 mt-10 flex justify-center items-center"
        />
      </div>
    </div>
  );
};