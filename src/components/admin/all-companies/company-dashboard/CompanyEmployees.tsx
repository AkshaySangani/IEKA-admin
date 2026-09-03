import { ColumnDef, CustomTable } from "../../../common/table";
import {
  statusEnum,
} from "../../../../constants/constants";
import { useEffect, useState } from "react";
import PersonInfo from "../../../common/person-info";
import {
  FilterCardItem,
  HistoryFieldEnum,
  RoleEnum,
  RoleNames,
} from "../../../../types/common-types";

import HistoryModal from "../../../common/modal/HistoryModal";
import {
  HistoryPayload,
  initialHistory,
} from "../../../../apis/company/history.api";
import BranchDepartmentInfo from "../../../common/branch-department";
import {
  getCompanyEmployees,
  ICompanyEmployeePayload,
} from "../../../../apis/company/company.api";
import Pagination from "../../../common/pagination/Pagination";
import PageLoader from "../../../common/loader/PageLoader";
import StatusCards, { EmployeeStats } from "./StatusCards";
import StatusCell from "../../../common/table-cell/StatusCell";
import { IDashboardEmployeeOverview } from ".";
import EmployeeActivityCard from "../../../common/statecard/EmployeeActivityCard";

export interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  role: RoleEnum;

  branchId: {
    _id: string;
    name: string;
  } | null;

  designationId: {
    _id: string;
    name: string;
  } | null;

  departmentId: {
    _id: string;
    name: string;
  } | null;

  shiftId: {
    _id: string;
    name: string;
    startTime: string;
    endTime: string;
  } | null;
  status: statusEnum;
}

interface IEmployeeListProps {
  companyId: string;
  workforce: IDashboardEmployeeOverview;
}

export default function CompanyEmployee({ companyId, workforce }: IEmployeeListProps) {
  // history states
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryPayload>(initialHistory);

  const [loading, setLoading] = useState<boolean>(false);
  const [allEmployees, setAllEmployees] = useState<IEmployee[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);

  const [cards, setCards] = useState<FilterCardItem[]>([
    {
      id: "",
      title: "Total",
      count: 0,
      activeColor: "bg-info",
      textColor: "text-info",
      icon: <i className="fa-solid fa-align-justify"></i>,
    },
    {
      id: "ACTIVE",
      title: "Active",
      count: 0,
      activeColor: "bg-success",
      textColor: "text-success",
      icon: <i className="fa-solid fa-user-check"></i>,
    },
    {
      id: "INACTIVE",
      title: "Inactive",
      count: 0,
      activeColor: "bg-warning",
      textColor: "text-warning",
      icon: <i className="fa-solid fa-user-xmark"></i>,
    },
  ]);
  const [activeCard, setActiveCard] = useState<string>("");

  useEffect(() => {
    if (companyId) {
      fetchEmployees({ companyId, page, limit, status: activeCard });
    }
    // eslint-disable-next-line
  }, [companyId, page, limit, activeCard]);

  // fetch company employees
  const fetchEmployees = async (payload: ICompanyEmployeePayload) => {
    setLoading(true);
    const response = await getCompanyEmployees(payload);
    if (response.success && response.data?.employee?.length > 0) {
      setAllEmployees(response.data?.employee);
      setTotal(response.data?.total);
      page === 1 && updateCards(response.data?.stats);
    } else {
      setAllEmployees([]);
      setTotal(0);
    }
    setLoading(false);
  };

  const handleOnClick = (row: IEmployee) => {};

  // update cards
  const updateCards = (stats: EmployeeStats) => {
    setCards((prev) =>
      prev.map((card) => {
        switch (card.id) {
          case "":
            return { ...card, count: stats.total };

          case statusEnum.ACTIVE:
            return { ...card, count: stats.active };

          case statusEnum.INACTIVE:
            return { ...card, count: stats.inactive };

          default:
            return card;
        }
      }),
    );
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<IEmployee>[] = [
    {
      header: "#",
      className: "w-[5%] text-center text-gray-500",
      render: (_, index) => index + 1,
    },
    {
      header: "Employee Name",
      className: "",
      render: (row) => (
        <PersonInfo
          personInfo={{
            profileImage: row?.profileImage,
            firstName: row?.firstName,
            lastName: row?.lastName,
            description: RoleNames[row?.role],
          }}
          onClick={() => handleOnClick(row)}
        />
      ),
    },
    {
      header: "Branch & Department",
      className: "",
      render: (row) =>
        row.role !== RoleEnum.OWNER ? (
          <BranchDepartmentInfo
            branch={{ name: row.branchId?.name ?? "" }}
            shift={{
              name: row.shiftId?.name ?? "",
              startTime: row.shiftId?.startTime ?? "",
              endTime: row.shiftId?.endTime ?? "",
            }}
            department={{ name: row?.departmentId?.name ?? "" }}
          />
        ) : (
          "-"
        ),
    },
    {
      header: "Status",
      className: "w-[15%]",
      render: (row) => {
        return (
          <StatusCell
            status={row.status}
            onHistory={() => handleShowHistory(row)}
            isEditable={false}
          />
        );
      },
    },
  ];

  // handle history open
  const handleHistoryOpenClose = () => {
    setHistoryOpen((prev) => !prev);
    setHistory(initialHistory);
  };

  // handle show history
  const handleShowHistory = (employee: IEmployee) => {
    handleHistoryOpenClose();
    setHistory({
      field: HistoryFieldEnum.UserStatus,
      fieldId: employee._id,
      title: `${employee.firstName} ${employee.lastName}`,
    });
  };

  return (
    <>
      <div className="content-card p-3 sm:p-4 flex flex-col gap-2 relative">
        <PageLoader loading={loading} />

        <div className="flex items-center pb-3 border-b">
          <i className="fa-solid fa-people-group"></i>
          <span className="px-2 text-md font-medium mr-2">Workforce</span>
        </div>

        <StatusCards
          cards={cards}
          activeCard={activeCard}
          setActiveCard={setActiveCard}
        />

        <CustomTable columns={columns} data={allEmployees} />
        <Pagination
          totalRecords={total}
          currentPage={page}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
          showVerticalBorder={true}
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 lg:gap-4">
          <EmployeeActivityCard
            title="Onboarding"
            icon={<i className="fa-solid fa-person-walking" />}
            count={workforce.onboarding.count}
            users={workforce.onboarding.list}
          />
          <EmployeeActivityCard
            title="Resigned"
            icon={<i className="fa-solid fa-user-gear"></i>}
            count={workforce.resignation.count}
            users={workforce.resignation.list}
          />

          <EmployeeActivityCard
            title="Termination"
            icon={<i className="fa-solid fa-user-slash"></i>}
            count={workforce.termination.count}
            users={workforce.termination.list}
          />

          <EmployeeActivityCard
            title="Promotion"
            icon={<i className="fa-solid fa-user-pen"></i>}
            count={workforce.promotion.count}
            users={workforce.promotion.list}
          />
        </div>
      </div>
      <HistoryModal
        isOpen={historyOpen}
        handleOpenClose={handleHistoryOpenClose}
        history={history}
      />
    </>
  );
}
