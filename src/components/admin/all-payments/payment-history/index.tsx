import { useLocation, useNavigate, useParams } from "react-router-dom";
import Image from "../../../common/image";
import TopBar from "../../../common/topbar/TopBar";
import Button from "../../../common/button/Button";
import { useEffect, useState } from "react";
import { getPaymentHistory } from "../../../../apis/company/payments.api";
import PageLoader from "../../../common/loader/PageLoader";
import {
  currency,
  pathNames,
  statusEnum,
} from "../../../../constants/constants";
import { getFloatValue } from "../../../../utils/helper";
import { ColumnDef, CustomTable } from "../../../common/table";
import { IPayment } from "..";
import { formatDate } from "../../../../utils/date-format";
import StatusCell from "../../../common/table-cell/StatusCell";
import PaymentHistory from "../PaymentHistory";
import YearPicker from "../../../common/date-picker/YearPicker";
import PDF from "../../../../assets/images/pdf_icon.png";
import { Link } from "react-router-dom";
import { config } from "../../../../utils/config";

export interface IInvoice {
  _id: string;
  billingMonth: number;
  cGST: number;
  sGST: number;
  totalAmount: number;
  generatedAt: string;
  payments: IPayment[];
  paymentStatus: statusEnum;
  invoicePdf: string;
  mailSentAt: string | null;
  mailSentRemarks: string;
}

export default function Payments() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const companyId = params.id as string;
  const companyDetails = location.state.company;

  const [year, setYear] = useState<number>(new Date().getFullYear());

  const [loading, setLoading] = useState<boolean>(false);
  const [paymentHistory, setPaymentHistory] = useState<IInvoice[]>([]);

  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] =
    useState<boolean>(false);
  const [selectedPaymentHistory, setSelectedPaymentHistory] = useState<
    IPayment[] | null
  >(null);

  // handle payment history open
  const handlePaymentHistoryOpenClose = (payments: IPayment[] | null) => {
    // Logic to open the payment history
    setSelectedPaymentHistory(payments);
    setIsPaymentHistoryOpen((prev) => !prev);
  };

  useEffect(() => {
    if (companyId) {
      fetchPaymentHistory();
    }
  }, [companyId, year]);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    const response = await getPaymentHistory(companyId, year);
    if (response.success) {
      setPaymentHistory(response.data);
    } else {
      setPaymentHistory([]);
    }
    setLoading(false);
  };

  const handleDownloadPdfClick = () => {};

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<IInvoice>[] = [
    {
      header: "#",
      className: "",
      render: (_, index) => index + 1,
    },
    {
      header: "Month",
      className: "",
      render: (row) => row.billingMonth,
    },
    {
      header: "Total Amount",
      className: "",
      render: (row) => `${currency.INR} ${getFloatValue(row.totalAmount)}`,
    },
    {
      header: "Invoice Mail Date",
      className: "",
      render: (row) => formatDate(row.mailSentAt),
    },
    {
      header: "Invoice",
      className: "",
      render: (row) => (
        <>
          <Link
            to={`${config.BACKEND_API_URL}${row.invoicePdf}.pdf`}
            target="_"
            download
            className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center`}
          >
            <img src={PDF} alt="Pdf" className="h-full w-full object-contain" />
          </Link>
        </>
      ),
    },
    {
      header: "Payment Status",
      className: "",
      render: (row) => (
        <StatusCell
          status={row.paymentStatus}
          onHistory={() => handlePaymentHistoryOpenClose(row.payments)}
          isEditable={false}
        />
      ),
    },
  ];
  return (
    <>
      <TopBar
        title={
          <div className="flex items-center gap-2">
            <Image
              src={companyDetails.companyLogo}
              className="h-11 w-11 object-contain"
            />
            <span className="text-lg text-black font-medium">
              {companyDetails.companyName}
            </span>
          </div>
        }
        actionButtons={
          <div className="flex items-center gap-2">
            <YearPicker
              required
              value={year}
              onChange={(year) => setYear(year)}
            />
            <Button
              size="sm"
              variant={"danger"}
              onClick={() => navigate(pathNames.ALL_PAYMENTS)}
              leftIcon={<i className="fa-solid fa-xmark fa-xl text-danger"></i>}
            />
          </div>
        }
      />
      <div className="content-area">
        <PageLoader loading={loading} />
        <CustomTable columns={columns} data={paymentHistory} />
      </div>
      <PaymentHistory
        isOpen={isPaymentHistoryOpen}
        onClose={() => handlePaymentHistoryOpenClose(null)}
        payments={selectedPaymentHistory || []}
      />
    </>
  );
}
