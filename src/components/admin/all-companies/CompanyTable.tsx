import { useEffect, useState } from "react";
import { CustomTable, ColumnDef } from "../../common/table";
import { getCompanies } from "../../../apis/company/company.api";
import { statusColor, statusMessage } from "../../../constants/constants";
import Image from "../../common/image";
import PageLoader from "../../common/loader/PageLoader";
import Pagination from "../../common/pagination/Pagination";
import CompanyInfo from "../../common/company-info";
import OwnerInfo from "../../common/owner-info";

interface ICompanyListProps {
  activeCard: string;
}

export type Status = "ACTIVE" | "INACTIVE" | "DELETED";

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
  status: Status;
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  employeeStats: IEmployeeStats;
  createdAt: string;
  companyRepresentative: ICompanyRepresentative;
}

export default function CompanyList({activeCard}: ICompanyListProps) {

  const getTotal = (stats: IEmployeeStats) => {
    return Number(stats.active + stats.inactive + stats.deleted);
  }

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<ICompany>[] = [
    {
      header: 'Sr. No.',
      className: 'w-[80px] text-center text-gray-500',
      render: (_, index) => index + 1
    },
    {
      header: 'Company Name',
      className: 'w-[35%]',
      render: (row) => (
        <CompanyInfo companyInfo={row}/>
      )
    },
    {
      header: 'Owners Info',
      className: 'w-[20%]',
      render: (row) => (
        <OwnerInfo ownerInfo={row.companyRepresentative} />
      )
    },
    {
      header: 'User Info',
      className: 'w-[25%]',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-center text-xs font-medium">
          {/* Total */}
          <div className="bg-gray-50 border border-gray-100 rounded px-2.5 py-1 min-w-[50px]">
            <div className="text-[10px] text-gray-400 font-normal">Total</div>
            <div className="text-gray-700 text-sm font-semibold">{getTotal(row.employeeStats)}</div>
          </div>
          {/* Active */}
          <div className="bg-green-50/50 border border-green-100 rounded px-2.5 py-1 min-w-[50px]">
            <div className="text-[10px] text-green-500 font-normal">Active</div>
            <div className="text-green-600 text-sm font-semibold">{row.employeeStats.active}</div>
          </div>
          {/* Inactive */}
          <div className="bg-orange-50/50 border border-orange-100 rounded px-2.5 py-1 min-w-[50px]">
            <div className="text-[10px] text-orange-400 font-normal">Inactive</div>
            <div className="text-orange-500 text-sm font-semibold">{row.employeeStats.inactive}</div>
          </div>
          {/* Deleted */}
          <div className="bg-red-50/50 border border-red-100 rounded px-2.5 py-1 min-w-[50px]">
            <div className="text-[10px] text-red-400 font-normal">Deleted</div>
            <div className="text-red-500 text-sm font-semibold">{row.employeeStats.deleted}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Status',
      className: 'w-[12%]',
      render: (row) => {
        return (
          <div className="flex items-center gap-1.5">
            {/* Info SVG icon asset matching your design layout */}
            <svg className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`font-semibold text-sm ${statusColor[row.status]}`}>
              {statusMessage[row.status]}
            </span>
          </div>
        );
      }
    }
  ];

   const [page,setPage] = useState<number>(1);
  const [limit,setLimit] = useState<number>(10);
  const [search,setSearch] = useState<string>("");
  const [total,setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [companies,setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    getCompanyList({
      page,limit,search,status: activeCard
    })
  },[page,limit,search,activeCard]);

  const getCompanyList = async (payload: {
    search: string;
    status: string;
    page: number;
    limit: number;
  }) => {
    setLoading(true);
    const response = await getCompanies(payload)
    if(response?.success && response?.data?.companies?.length > 0){
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
  }

  return (
    <div className="">
      <PageLoader loading={loading}/>
      <CustomTable columns={columns} data={companies} />
      <Pagination totalRecords={total} currentPage={page} pageSize={limit} onPageChange={setPage} onPageSizeChange={setLimit} />
    </div>
  );
}