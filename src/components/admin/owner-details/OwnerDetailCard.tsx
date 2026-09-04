import React, { useState } from "react";
import Image from "../../common/image";
import {
  moduleEnum,
  statusMessage,
  statusOptions,
} from "../../../constants/constants";
import { ICompanyRepresentative } from ".";
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

interface Props {
  data: ICompanyRepresentative;
  moduleAccess: string[];
  handleOwnerOpen: () => void;
}

const OwnerDetailCard: React.FC<Props> = ({
  data,
  moduleAccess,
  handleOwnerOpen,
}) => {
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);

  // history states
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryPayload>(initialHistory);

  // handle open close status modal
  const handleOpenCloseStatus = () => {
    setIsStatusOpen((prev) => !prev);
  };

  //handle Status Submit
  const handleStatusSubmit = () => {
    setStatusLoading(true);
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
            width="80"
            alt={data.firstName}
            fallbackSrc={UserAvatar}
            className="rounded-full"
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
                <span className="text-green-600 font-medium">
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
        options={statusOptions}
      />
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

    <div className="font-normal text-right">{value}</div>
  </div>
);

export default OwnerDetailCard;
