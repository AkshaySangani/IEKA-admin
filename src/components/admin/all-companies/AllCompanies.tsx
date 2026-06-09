import { useState } from "react";
import Button from "../../common/button/Button";
import TopBar from "../../common/topbar/TopBar";
import "./AllCompanies.css";
import FilterCards from "./FilterCards";
import Modal from "../../common/modal/Modal";
import SelectField from "../../common/select/SelectField";
import DownloadModal from "../../common/download-modal/DownloadModal";

const AllCompanies = () => {
  const [activeCard, setActiveCard] = useState("total");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDownloadClick = () => {
    setIsOpen(true)
  }

  const handleCloseDownload = () => {
    setIsOpen(false)
  }
  return (
    <>
      <TopBar
        title="All Companies"
        actionButtons={
          <Button
            name="Add New"
            size="sm"
            className="buttoncommon"
            leftIcon={<i className="fa-solid fa-plus"></i>}
          />
        }
        handleSearchClick={() => setIsSearchOpen(true)}
        handleDownloadExcelClick={() => handleDownloadClick()}
      />
      <div className="content-area">
        <div className="content-area-inner">
          <FilterCards setActiveCard={setActiveCard} activeCard={activeCard} />
        </div>
      </div>
      <Modal
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
      </Modal>
      <DownloadModal isOpen={isOpen} type={"xlsx"} onClose={handleCloseDownload} dataToExport={[]} />
    </>
  );
};

export default AllCompanies;
