import { useEffect, useState } from "react";
import { CustomTable, ColumnDef } from "../../common/table";
import { getCompanies } from "../../../apis/company/company.api";
import { statusColor, statusEnum, statusMessage } from "../../../constants/constants";
import Image from "../../common/image";
import PageLoader from "../../common/loader/PageLoader";
import Pagination from "../../common/pagination/Pagination";
import CompanyInfo from "../../common/company-info";
import OwnerInfo from "../../common/owner-info";
import { useNavigate } from "react-router-dom";
import StatusCell from "../../common/table-cell/StatusCell";
import { HistoryPayload, initialHistory } from "../../../apis/company/history.api";
import { HistoryFieldEnum } from "../../../types/common-types";
import HistoryModal from "../../common/modal/HistoryModal";

interface ICompanyListProps {
  activeCard: string;
  search: string;
}

export interface ICompanyRepresentative {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface IEmployeeStats {
  active: number;
  inactive: number;
  deleted: number;
}

export interface ICompany {
  _id: string;
  status: statusEnum;
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  userStats: IEmployeeStats;
  createdAt: string;
  companyRepresentative: ICompanyRepresentative;
}

export default function CompanyList({ activeCard, search }: ICompanyListProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [companies, setCompanies] = useState<ICompany[]>([]);

  // history states
  const [historyOpen, setHistoryOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryPayload>(initialHistory);

  useEffect(() => {
    getCompanyList({
      page,
      limit,
      search,
      status: activeCard,
    });
  }, [page, limit, search, activeCard]);

  const getCompanyList = async (payload: {
    search: string;
    status: string;
    page: number;
    limit: number;
  }) => {
    setLoading(true);
    const response = await getCompanies(payload);
    if (response?.success && response?.data?.companies?.length > 0) {
      const companyData = response?.data?.companies;
      const count = response?.data?.total;
      setCompanies(companyData);
      setTotal(count);
      setLoading(false);
    } else {
      setCompanies([]);
      setTotal(0);
      setPage(1);
      setLoading(false);
    }
  };

  const getTotal = (stats: IEmployeeStats) => {
    return Number(stats.active + stats.inactive + stats.deleted);
  };
  // handle click on owner info
  const handleOnClick = () => {
    navigate("/owner-details");
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<ICompany>[] = [
    {
      header: "Sr. No.",
      className: "text-center text-gray-500",
      render: (_, index) => index + 1,
    },
    {
      header: "Company Name",
      className: "",
      render: (row) => <CompanyInfo companyInfo={row} />,
    },
    {
      header: "Owners Info",
      className: "",
      render: (row) => (
        <OwnerInfo
          ownerInfo={row.companyRepresentative}
          onClick={() => navigate(`/owner-details/${row?._id}`)}
        />
      ),
    },
    {
      header: "User Info",
      className: "",
      render: (row) => (
        <div className="flex items-center gap-1.5 text-center text-xs font-medium">
          {/* Total */}
          <div className="bg-[#f5f5f5] px-2.5 py-1 w-[calc((100%-40px)/4)]">
            <div className="text-xs text-info font-normal">Total</div>
            <div className="text-info text-sm font-semibold">
              {getTotal(row.userStats)}
            </div>
          </div>
          {/* Active */}
          <div className="bg-green-50/50 px-2.5 py-1 w-[calc((100%-40px)/4)]">
            <div className="text-xs text-success font-normal">Active</div>
            <div className="text-success text-sm font-semibold">
              {row.userStats.active}
            </div>
          </div>
          {/* Inactive */}
          <div className="bg-orange-50/50 px-2.5 py-1 w-[calc((100%-40px)/4)]">
            <div className="text-xs text-orange-500 font-normal">Inactive</div>
            <div className="text-orange-500 text-sm font-semibold">
              {row.userStats.inactive}
            </div>
          </div>
          {/* Deleted */}
          <div className="bg-red-50/50 px-2.5 py-1 w-[calc((100%-40px)/4)]">
            <div className="text-xs text-red-400 font-normal">Deleted</div>
            <div className="text-red-500 text-sm font-semibold">
              {row.userStats.deleted}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      className: "",
      render: (row) => {
        return (
          <StatusCell
            status={row.status}
            isEditable={false}
            onHistory={() => handleShowHistory(row.companyRepresentative)}
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
      <PageLoader loading={loading} />
      <CustomTable columns={columns} data={companies} />
      <Pagination
        totalRecords={total}
        currentPage={page}
        pageSize={limit}
        onPageChange={setPage}
        onPageSizeChange={setLimit}
      />
      <HistoryModal
        isOpen={historyOpen}
        handleOpenClose={handleHistoryOpenClose}
        history={history}
      />
    </>
  );
}
