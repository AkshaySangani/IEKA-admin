import React, { useState } from "react";
import CompanyLogo from "../../../assets/images/ieka_logo.jpg";
import Modal from "../../common/modal/Modal";
import ImageUpload from "../../common/image-upload";
import TextField from "../../common/text-field/TextField";
import { ICompanyDetails } from ".";

interface CompanyDetailsProps {
  companyDetails: ICompanyDetails;
}

const CompanyDetailsCard: React.FC<CompanyDetailsProps> = ({companyDetails}: CompanyDetailsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [companyDetail, setCompanyDetail] = useState({
    file: "",
  });
  const handleClose = () => {
    setIsOpen((prev) => !prev);
  };
  const handleChange = (value: any, name: string) => {
    setCompanyDetail((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <div className="companyDetailsCard content-card">
        <div className="companyHeader">
          <div className="employee_pic">
            <img src={CompanyLogo} alt="CompanyLogo" />
          </div>
          <div className="employee_name">{companyDetails?.companyName}</div>
        </div>
        <div className="employeedetail_parts">
          <div className="titlelabel">
            Company Details{" "}
            <div
              className="action_btn ml_10"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
          <div className="employee_detailsitems">
            <div className="employee_detail_single">
              <div className="label">Company Email</div>
              <div className="labelvalue">{companyDetails?.companyEmail}</div>
            </div>
            <div className="employee_detail_single">
              <div className="label">GST IN No.</div>
              <div className="labelvalue">{companyDetails?.gstin ? companyDetails?.gstin : "-"}</div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        title={"Sunny Sangani | 589845"}
        onClose={handleClose}
        handleOnConfirm={function (value?: any): void {
          throw new Error("Function not implemented.");
        }}
      >
        <div className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company Logo */}
            <ImageUpload
              label="Company Logo"
              required
              onChange={(file) => {
                handleChange(file, "file");
              }}
            />

            {/* Empty column for alignment */}
            <div></div>

            {/* Company Name */}
            <TextField label="Company Name" placeholder="Enter company name"/>

            {/* Company Email */}
            <TextField label="Company Email" placeholder="Enter company email"/>

            {/* GST Number */}
            <TextField label="GST Number" placeholder="Enter GST Number"/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CompanyDetailsCard;
