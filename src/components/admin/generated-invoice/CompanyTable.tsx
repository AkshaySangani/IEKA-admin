import { CustomTable, ColumnDef } from "../../common/table";
import {
  currency,
  statusColor,
  statusMessage,
} from "../../../constants/constants"; 
import CompanyInfo from "../../common/company-info";
import OwnerInfo from "../../common/owner-info";
import { useNavigate } from "react-router-dom";
import { IInvoice } from ".";
import { getFloatValue } from "../../../utils/helper";

interface IInvoiceTableProps {
  invoices: IInvoice[];
}

export default function InvoiceTable({ invoices }: IInvoiceTableProps) {
  const navigate = useNavigate();

  // handle click on owner info
  const handleOnClick = () => {
    navigate("/owner-details");
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<IInvoice>[] = [
    {
      header: "Sr. No.",
      className: "text-center text-gray-500",
      render: (_, index) => index + 1,
    },
    {
      header: "Invoice No.",
      className: "",
      render: (row) => row.invoiceNumber,
    },
    {
      header: "Company Payment History",
      className: "",
      render: (row) => <CompanyInfo companyInfo={row.companyId} />,
    },
    {
      header: "Owners Name",
      className: "",
      render: (row) => (
        <OwnerInfo
          ownerInfo={row.companyId.companyRepresentative}
          onClick={() => navigate(`/owner-details/${row.companyId._id}`)}
        />
      ),
    },
    {
      header: "Account",
      className: "",
      render: (row) => row.companyId.assignedBankAccount.ifscCode,
    },
    {
      header: "Total Price",
      className: "",
      render: (row) => `${currency.INR} ${getFloatValue(row.totalAmount)}`,
    },
    {
      header: "Status",
      className: "",
      render: (row) => {
        return (
          <div className="flex items-center gap-1.5">
            {/* Info SVG icon asset matching your design layout */}
            <svg
              className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span
              className={`font-semibold text-sm ${statusColor[row.status]}`}
            >
              {statusMessage[row.status]}
            </span>
          </div>
        );
      },
    },
  ];

  return <CustomTable columns={columns} data={invoices} />;
}
