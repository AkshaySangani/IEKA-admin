import { useEffect, useState } from "react";
import { statusEnum } from "../../../../constants/constants";
import { useParams } from "react-router-dom";
import MonthPicker, {
  MonthPickerValue,
} from "../../../common/date-picker/MonthPicker";
import {
  EmployeeStatusHistoryPayload,
  getEmployeeStatusHistory,
} from "../../../../apis/company/invoice.api";
import TopBar from "../../../common/topbar/TopBar";
import PageLoader from "../../../common/loader/PageLoader";
import Pagination from "../../../common/pagination/Pagination";
import EmployeeTable from "./EmployeeTable";
import { RoleEnum } from "../../../../types/common-types";
import InvoiceSlip from "./invoice-slip";

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

  const [employeeHistory, setEmployeeHistory] = useState<
    IEmployeeMonthlyStatus[]
  >([]);

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

  const invoiceData = {
  company: {
    name: "Ieka Digital LLP",
    address:
      "308, Hilltown Landmark, Opp Das Khaman, Nikol-Naroda Rd, Nikol, Ahmedabad, 382350",
    phone: "+91 9548 69854",
    email: "info@iekadigital@gmail.com",
    gstin: "24AAAAA0000A1ZS",
  },

  invoiceNo: "INV-2026-001",
  invoiceDate: "05-05-2026",
  billingMonth: "04-2026",

  billFrom: {
    title: "Bill From (Supplier)",
    name: "Green Leaf Solar Pvt Ltd",
    address:
      "308, Hilltown Landmark, Opp Das Khaman, Nikol Naroda Rd, Nikol, Ahmedabad, 382350",
    gstin: "24AAAAA0000A1ZR",
  },

  billTo: {
    title: "Bill To (Recipient)",
    name: "Prashant Dave",
    address:
      "C.G. Road, Navrangpura, Ahmedabad, Gujarat - 380009",
    phone: "+91 98765 43210",
    gstin: "24BBBCC9989D1ZX",
  },

  days: [
    {
      daysPeriod: "01-09-2025 to 30-09-2025",
      activeDays: 30,
      employeeCount: 10,
      employeeRate: 300,
      totalAmount: 3000,
    },
    {
      daysPeriod: "11-09-2025 to 30-09-2025",
      activeDays: 20,
      employeeCount: 5,
      employeeRate: 200,
      totalAmount: 1000,
    },
    {
      daysPeriod: "26-09-2025 to 30-09-2025",
      activeDays: 5,
      employeeCount: 5,
      employeeRate: 60,
      totalAmount: 300,
    },
    {
      daysPeriod: "28-09-2025 to 30-09-2025",
      activeDays: 3,
      employeeCount: 1,
      employeeRate: 30,
      totalAmount: 30,
    },
  ],

  taxSummary: {
    hsnSac: "998313",
    productionManagement: 8000,
    subtotal: 15280,
    cgst: 1375.2,
    sgst: 1375.2,
    maintenance: 0,
    total: 18030,
  },

  amountInWords:
    "One Lakh Thirty Two Thousand Hundred Eighty Rupees Only",

  bankDetails: {
    bankName: "HDFC Bank",
    accountHolder: "Green Leaf Solar Pvt Ltd",
    accountNo: "5020012345678",
    ifscCode: "HDFC0001234",
    branch: "C.G. Road, Ahmedabad",
  },

  terms: [
    "Payment is due within the agreed timeframe mentioned on the invoice.",
    "Any additional work beyond the agreed scope will be charged separately.",
    "All deliverables and ownership rights will be transferred only after full payment is received.",
    "No refunds will be applicable once the work has commenced or services have been delivered.",
  ],

  customerSignature: "Customer's Signature",
  authorizedSignature: "Authorized Signatory",
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
      <div className="content-area flex-1 gap-4">
        <PageLoader loading={loading} />
        <EmployeeTable employeeHistory={employeeHistory} />
        <Pagination
          totalRecords={total}
          currentPage={page}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
        />
        <InvoiceSlip {...invoiceData} />
      </div>
    </>
  );
};

export default InvoiceDetails;
