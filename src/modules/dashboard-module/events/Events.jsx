import {Image, Pagination} from "antd";
import {Status} from "../../components/Status.jsx";
import {useTranslation} from "react-i18next";
import {SearchFilter} from "../../components/SearchFilter.jsx";
import {CalendarOutlined} from "@ant-design/icons";
import {useEventsHook} from "./hooks/eventsHook.js";
import {AddNewEvent} from "./AddNewEvent.jsx";
import {DeleteEvent} from "./DeleteEvent.jsx";
import {EditEvent} from "./EditEvent.jsx";

export const Events = () => {
    const { t } = useTranslation();
    const {
        pageCount,
        setSearchTerm,
        events,
        setCurrentPage,
    } = useEventsHook()

    const onChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    } ;

    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-800 capitalize mb-8 flex gap-2 items-center">
                <CalendarOutlined />
                {t("events.title")}
            </h1>

            <div className="filter mb-6 shadow p-4 rounded-lg">
                <h4 className=" capitalize mb-2 text-2xl">{t("globals.filter")}</h4>
                <div className="flex items-center gap-4">
                    <SearchFilter search={setSearchTerm}/>
                </div>
            </div>

            <AddNewEvent />

            <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 capitalize bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.thumbnail")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.title")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.date")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.time")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.publishedAt")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.location")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.isPublished")}
                        </th>
                        <th scope="col" className="px-6 py-3">
                            {t("events.table.actions")}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {events &&
                        events.map((event, index) => (
                            <tr className="bg-white border-b" key={index}>
                                <td className="px-6 py-4 w-4 h-4">
                                    <Image src={event.thumbnail} className="w-full h-full" alt=""/>
                                </td>
                                <td className="px-6 py-4">{event.title}</td>
                                <td className="px-6 py-4">{event.date}</td>
                                <td className="px-6 py-4">{event.time}</td>
                                <td className="px-6 py-4">{event.publishedAt}</td>
                                <td className="px-6 py-4">{event.location}</td>
                                <td className="px-6 py-4">
                                    <Status
                                        value={event.isPublished}
                                        activeText={"done"}
                                        inactiveText={"no"}
                                    />
                                </td>
                                <td className="px-6 py-4 flex gap-3">
                                    <DeleteEvent eventId={event.eventId} />
                                    <EditEvent eventId={event.eventId}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    defaultCurrent={pageCount["current_page"]}
                    total={pageCount["total"]}
                    onChange={onChange}
                    className="mb-4 mt-10 flex justify-center items-center"
                />
            </div>
        </div>
    )
}