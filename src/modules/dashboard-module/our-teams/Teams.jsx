import { useTranslation } from "react-i18next";
import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { SearchFilter } from "../../components/SearchFilter.jsx";
import { Image, Pagination } from "antd";
import { Status } from "../../components/Status.jsx";
// import {DeleteBlog} from "../blogs/DeleteBlog.jsx";
import { useTeamsHook } from "./hooks/useTeamsHook.js";
import { AddNewTeam } from "./AddNewTeam.jsx";
import { EditTeam } from "./EditTeam.jsx";
import { DeleteTeam } from "./DeleteTeam.jsx";

export const Teams = () => {
  const { t } = useTranslation();
  const { pageCount, setSearchTerm, setCurrentPage, teams } =
    useTeamsHook();
  const onChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 flex gap-2 items-center">
        <FileTextOutlined />
        {t("teams")}
      </h1>

      <div className="filter mb-6 shadow p-4 rounded-lg">
        <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
        <div className="flex items-center gap-4">
          <SearchFilter search={setSearchTerm} />
        </div>
      </div>

      <AddNewTeam />

      <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 capitalize bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("image")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("name")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("job title")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("isPublished")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("actions")}
              </th>
            </tr>
          </thead>
          <tbody>
            {teams &&
              teams.map((team, index) => (
                <tr className="bg-white border-b" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium w-20 text-gray-900 whitespace-nowrap"
                  >
                    {team.image ? (
                      <Image
                        className="w-full"
                        src={team.image}
                        alt={team.title}
                      />
                    ) : (
                      <UserOutlined />
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {team.name}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {team.jobTitle}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Status
                      value={team.isActive}
                      activeText={"active"}
                      inactiveText={"inActive"}
                    />
                  </th>
                  <td className="px-6 py-4 flex gap-3">
                    <EditTeam companyTeamId={team.companyTeamId} />
                    <DeleteTeam teamId={team.companyTeamId} />
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
