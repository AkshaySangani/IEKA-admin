import { useState } from "react";
import Button from "../../common/button/Button";
import TopBar from "../../common/topbar/TopBar";
import FilterCards from "./FilterCards";
// import Modal from "../../common/modal/Modal";
// import SelectField from "../../common/select/SelectField";
import DownloadModal from "../../common/download-modal/DownloadModal";
import { useNavigate } from "react-router-dom";
import CompanyList from "./CompanyTable";

const AllCompanies = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
 

  // const handleDownloadClick = () => {
  //   setIsOpen(true)
  // }

  const handleCloseDownload = () => {
    setIsOpen(false)
  }

  // redirect to add company page
  const handleOnAdd = () => {
    navigate("/add-company")
  }

  // handle search employeeDetails
  const handleOnSearch = (value: string) => {
    setSearch(value);
  };
  return (
    <>
      <TopBar
        title="All Companies"
        actionButtons={
          <Button
            name="Add New"
            size="sm"
            onClick={handleOnAdd}
            leftIcon={<i className="fa-solid fa-plus"></i>}
          />
        }
        isExcel
        isSearch
        onSearch={handleOnSearch}
      />
      <div className="content-area flex flex-col gap-4">
        <div className="content-area-inner">
          <FilterCards setActiveCard={setActiveCard} activeCard={activeCard} />
        </div>
        <CompanyList activeCard={activeCard} search={search}/>
      </div>
      
      {/* <Modal
        isOpen={isSearchOpen}
        title="Search"
        onClose={() => setIsSearchOpen(false)}
        confirmButtonName={"Search"}
        handleOnConfirm={() => {}}
      >
        <div className="flex items-center gap-5">
          <SelectField
            label="Company Name"
            value={undefined}
            name={""}
            options={[]}
            onChange={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />
          <SelectField
            label="Owner Name"
            value={undefined}
            name={""}
            options={[]}
            onChange={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </Modal> */}
      <DownloadModal isOpen={isOpen} type={"xlsx"} onClose={handleCloseDownload} dataToExport={[]} />
    </>
  );
};

export default AllCompanies;
