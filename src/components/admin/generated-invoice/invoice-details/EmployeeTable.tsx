

import { useNavigate } from "react-router-dom";
import { IEmployeeMonthlyStatus, IEmployeeStatusUser } from ".";
import { ColumnDef, CustomTable } from "../../../common/table";
import PersonInfo from "../../../common/person-info";
import { HistoryFieldEnum, RoleNames } from "../../../../types/common-types";
import StatusCell from "../../../common/table-cell/StatusCell";
import HistoryModal from "../../../common/modal/HistoryModal";
import { useState } from "react";
import { HistoryPayload, initialHistory } from "../../../../apis/company/history.api";

interface IEmployeeTableProps {
  employeeHistory: IEmployeeMonthlyStatus[];
}

export default function EmployeeTable({ employeeHistory }: IEmployeeTableProps) {
  const navigate = useNavigate();

  // history states
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryPayload>(initialHistory);

  // handle click on owner info
  const handleOnClick = () => {
    navigate("/owner-details");
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<IEmployeeMonthlyStatus>[] = [
    {
      header: "Sr. No.",
      className: "text-center text-gray-500",
      render: (_, index) => index + 1,
    },
    {
      header: "Employee Name",
      className: "",
      render: (row) => <PersonInfo personInfo={{
        firstName: row.userId.firstName,
        lastName: row.userId.lastName,
        profileImage: row.userId.profileImage,
        description: RoleNames[row.userId.role],
      }} />,
    },
    {
      header: "Current Status",
      className: "",
      render: (row) => <StatusCell status={row.userId.status} isEditable={false} onHistory={() => handleShowHistory(row.userId)} />,
    },
    {
      header: "Active Days",
      className: "",
      render: (row) => row.activeDays,
    },
    {
      header: "Inactive Days",
      className: "",
      render: (row) => row.inactiveDays,
    },
    {
      header: "Deleted Days",
      className: "",
      render: (row) => row.deletedDays,
    },
  ];

  // handle history open
  const handleHistoryOpenClose = () => {
    setHistoryOpen((prev) => !prev);
    setHistory(initialHistory);
  };

  // handle show history
  const handleShowHistory = (employee: IEmployeeStatusUser) => {
    handleHistoryOpenClose();
    setHistory({
      field: HistoryFieldEnum.UserStatus,
      fieldId: employee._id,
      title: `${employee.firstName} ${employee.lastName}`,
    });
  };

  return <><CustomTable columns={columns} data={employeeHistory} />
  <HistoryModal
        isOpen={historyOpen}
        handleOpenClose={handleHistoryOpenClose}
        history={history}
      />
  </>;
}
