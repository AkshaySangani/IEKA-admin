import { useEffect, useState } from "react";
import { statusEnum } from "../../../../constants/constants";
import { useParams } from "react-router-dom";
import MonthPicker, { MonthPickerValue } from "../../../common/date-picker/MonthPicker";
import { EmployeeStatusHistoryPayload, getEmployeeStatusHistory } from "../../../../apis/company/invoice.api";
import TopBar from "../../../common/topbar/TopBar";
import PageLoader from "../../../common/loader/PageLoader";
import Pagination from "../../../common/pagination/Pagination";
import EmployeeTable from "./EmployeeTable";
import { RoleEnum } from "../../../../types/common-types";

export interface IEmployeeMonthlyStatus {
  _id: string;
  userId: IEmployeeStatusUser;
  companyId: string;
  month: number;
  year: number;
  activeDays: number;
  deletedDays: number;
  inactiveDays: number;
  activeDates: string[];
  deletedDates: string[];
  inactiveDates: string[];
}

export interface IEmployeeStatusUser {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  status: statusEnum;
  role: RoleEnum;
}

const InvoiceDetails = () => {
  const params = useParams();
  const companyId = params.id as string;

  const initialMonth: MonthPickerValue = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  const [selectedMonth, setSelectedMonth] =
    useState<MonthPickerValue>(initialMonth);


  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [employeeHistory, setEmployeeHistory] = useState<IEmployeeMonthlyStatus[]>([]);

  useEffect(() => {
    getInvoiceTable({
      page,
      limit,
      companyId,
      ...selectedMonth,
    });
    // eslint-disable-next-line
  }, [page, limit, selectedMonth.month]);

  const getInvoiceTable = async (payload: EmployeeStatusHistoryPayload) => {
    setLoading(true);
    const response = await getEmployeeStatusHistory(payload);
    if (response?.success && response?.data?.list?.length > 0) {
      const companyData = response?.data?.list;
      const count = response?.data?.total;
      setEmployeeHistory(companyData);
      setTotal(count);
      setLoading(false);
    } else {
      setEmployeeHistory([]);
      setTotal(0);
      setPage(1);
      setLoading(false);
    }
  };
  return (
    <>
      <TopBar
        title="Invoice Details"
        actionButtons={
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
        }
        isExcel
        // handleDownloadExcelClick={() => handleDownloadClick()}
      />
      <div className="content-area flex flex-col gap-4">
        <PageLoader loading={loading} />
        <EmployeeTable employeeHistory={employeeHistory} />
        <Pagination
          totalRecords={total}
          currentPage={page}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
        />
      </div>
    </>
  );
};

export default InvoiceDetails;
