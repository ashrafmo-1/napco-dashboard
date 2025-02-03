import { useShowPgaesHook } from "../hooks/useShowPgaesHook";
import { StatusModules } from "../../../../components/StatusModules";
import { PortfolioSections } from "./PortfolioSections";

export const PortfolioPages = () => {
  const { PortfolioPages, error, isLoading, setSearchTerm } = useShowPgaesHook();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="px-8 py-6 border border-1 border-solid border-gray-300 rounded-2xl shadow">
      <input type="text" placeholder="Search..." onChange={handleSearchChange}
        className="mt-4 border rounded outline-none py-1 px-3 w-full sm:w-[400px]"
      />
      {isLoading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      <div>
        {PortfolioPages.length === 0 ? (
          <div className="flex justify-center items-center h-12 mt-4 bg-red-100 rounded-lg shadow-md">
            <p className="text-red-500 text-lg font-semibold">4O4: No Portfolio Pages Found</p>
          </div>
        ) : (
          PortfolioPages.map((page, index) => (
            <section className="rounded-lg mt-2 flex flex-col sm:flex-row justify-between bg-gray-100 px-4 py-3" key={index}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <h2 className="text-xl font-bold">{page.title}</h2>
                <StatusModules value={page.isActive} activeText={"active"} inactiveText={"inActive"} />
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <PortfolioSections frontPageId={page.frontPageId} />
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
};