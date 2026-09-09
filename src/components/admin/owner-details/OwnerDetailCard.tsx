import React, { useState } from "react";
import Image from "../../common/image";
import {
  companyModules,
  moduleEnum,
  statusColor,
  statusEnum,
  statusMessage,
  statusOptions,
} from "../../../constants/constants";
import { ICompanyDetails, ICompanyRepresentative } from ".";
import EmployeeManagementIcon from "../../../assets/images/employee_management.png";
import ProductionManagementIcon from "../../../assets/images/production.png";
import UserAvatar from "../../../assets/images/User-Image.png";
import {
  HistoryFieldEnum,
  ObjectType,
} from "../../../types/common-types";
import StatusUpdateModal from "../../common/modal/StatusModal";
import {
  HistoryPayload,
  initialHistory,
} from "../../../apis/company/history.api";
import InfoIcon from "../../../assets/icons/Info";
import HistoryModal from "../../common/modal/HistoryModal";
import ModuleAccessEditModal from "./ModuleAccessEditModal";
import { StatusUpdatePayload, updateOwnerStatus } from "../../../apis/company/company.api";

export const modules: ObjectType = {
  [moduleEnum.EMPLOYEE]: {
    imageUrl: EmployeeManagementIcon,
    name: "Employee Management",
  },
  [moduleEnum.PRODUCTION]: {
    imageUrl: ProductionManagementIcon,
    name: "Production Management",
  },
};

export interface ModulePriceFormData {
  modules: string[];
  employeePrice: string;
  remarks: string;
}

interface Props {
  data: ICompanyRepresentative;
  companyDetails: ICompanyDetails;
  moduleAccess: string[];
  handleOwnerOpen: () => void;
  fetchCompanyDetails: () => void;
}

const OwnerDetailCard: React.FC<Props> = ({
  data,
  companyDetails,
  moduleAccess,
  handleOwnerOpen,
  fetchCompanyDetails
}) => {
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  // history states
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryPayload>(initialHistory);

  // module edit
  const [moduleEditOpen, setModuleEditOpen] = useState<boolean>(false);
  const initialFormData: ModulePriceFormData = {
    modules: [companyModules.employee],
    employeePrice: "",
    remarks: "",
  };

  const [formData, setFormData] =
    useState<ModulePriceFormData>(initialFormData);

  // handle open close module edit modal
  const handleModuleUpdateOpenClose = (data: ModulePriceFormData) => {
    setModuleEditOpen(prev => !prev);
  }

  // handle open close status modal
  const handleOpenCloseStatus = () => {
    setIsStatusOpen((prev) => !prev);
  };

  //handle Status Submit
  const handleStatusSubmit = async (payload: StatusUpdatePayload) => {
    setStatusLoading(true);
    const response = await updateOwnerStatus(payload, data._id);
    if(response.success){
      fetchCompanyDetails();
    }
    setStatusLoading(false);
  };

  // handle history open
  const handleHistoryOpenClose = () => {
    setHistoryOpen((prev) => !prev);
    setHistory(initialHistory);
  };

  // handle show history
  const handleShowHistory = (owner: ICompanyRepresentative) => {
    handleHistoryOpenClose();
    setHistory({
      field: HistoryFieldEnum.UserStatus,
      fieldId: owner._id,
      title: `${owner.firstName} ${owner.lastName}`,
    });
  };
  return (
    <>
      <div className="content-card bg-white border border-gray-200 p-5">
        <div className="flex items-center justify-between border-b-2 pb-2 mb-2">
          <h3 className="text-md text-gray-600 font-medium">
            {data.firstName} {data.lastName}
          </h3>

          <button onClick={handleOwnerOpen}>
            <i className="fa-solid fa-pen-to-square text-gray-500 text-lg" />
          </button>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center py-[10px] bg-gray-200">
          <Image
            src={data.profileImage}
            alt={data.firstName}
            fallbackSrc={UserAvatar}
           className={`
            w-20
            h-20
            min-w-12
            min-h-12
            shrink-0
            object-cover
            rounded-full
            ring-1
            ring-gray-200
          `}
          />
        </div>

        <div className="mt-4 space-y-4">
          <Row label="Owner Id." value={data.userId} />

          <Row
            label="Person Name"
            value={`${data.firstName} ${data.lastName}`}
          />

          <Row
            label="Status"
            value={
              <div className="flex items-center gap-2">
                <span className={`${statusColor[data.status]} font-medium`}>
                  {statusMessage[data.status]}
                </span>
                <button onClick={handleOpenCloseStatus}>
                  <i className="fa-solid fa-pen-to-square text-gray-400 text-sm hover:text-gray-500" />
                </button>
                <button onClick={() => handleShowHistory(data)}>
                  <InfoIcon />
                </button>
              </div>
            }
          />

          <Row
            label="Modules Access & Price"
            value={
              <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2">
                {moduleAccess.map((module) => (
                  <div
                    key={module}
                    className="bg-primary text-white px-2 py-1 rounded-md flex items-center gap-2"
                  >
                    <div className="p-1 bg-white rounded-md">
                      <Image src={modules[module].imageUrl} width={30} />
                    </div>
                    {modules[module].name}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleModuleUpdateOpenClose({
                  ...formData,
                  employeePrice: String(companyDetails.employeePrice),
                })}>
                  <i className="fa-solid fa-pen-to-square text-gray-400 text-sm hover:text-gray-500" />
                </button>
                <button onClick={() => handleShowHistory(data)}>
                  <InfoIcon />
                </button>
              </div>
              </div>
            }
          />

          <Row
            label="Email Sent"
            value={<div className="flex items-center gap-2">{"Yes"}</div>}
          />

          <Row label="Person Email" value={data.email} />

          <Row label="Phone No." value={data.phone} />
        </div>
      </div>
      <StatusUpdateModal
        title={`Are u sure want to change status of this person ?`}
        showFullTitle={true}
        isOpen={isStatusOpen}
        status={data.status}
        profileImage={data.profileImage}
        handleOpenClose={handleOpenCloseStatus}
        handleSubmit={handleStatusSubmit}
        loading={statusLoading}
        deleteWarning={
          "After inactive or delete this person & their employee can not accessible portal."
        }
        options={statusOptions.filter(ele => ele.value !== statusEnum.DELETED)}
      />
      <ModuleAccessEditModal isOpen={moduleEditOpen} onClose={() => handleModuleUpdateOpenClose(initialFormData)} title={""} formData={formData}/>
      <HistoryModal
        isOpen={historyOpen}
        handleOpenClose={handleHistoryOpenClose}
        history={history}
      />
    </>
  );
};

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex text-sm justify-between gap-5 border-b border-gray-200 pb-3">
    <div className="text-gray-700">{label}</div>

    <div className="font-normal text-right">{value ? value : "-"}</div>
  </div>
);

export default OwnerDetailCard;
