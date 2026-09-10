import { CustomTable, ColumnDef } from "../../common/table";
import {
  currency,
  statusColor,
  statusEnum,
  statusMessage,
} from "../../../constants/constants";
import CompanyInfo from "../../common/company-info";
import OwnerInfo from "../../common/owner-info";
import { useNavigate } from "react-router-dom";
import { IInvoice } from ".";
import { getFloatValue } from "../../../utils/helper";
import Modal from "../../common/modal/Modal";
import { useState } from "react";
import { DateFormat, formatDate } from "../../../utils/date-format";
import StatusCell from "../../common/table-cell/StatusCell";

interface IInvoiceTableProps {
  invoices: IInvoice[];
}

interface IHistory {
  status: statusEnum;
  date: string;
  remarks: string;
}
export default function InvoiceTable({ invoices }: IInvoiceTableProps) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<IHistory[]>([]);

  // handle click on invoice
  const handleOnClick = (id: string, row: IInvoice) => {
    navigate(`/generated-invoice/${id}`, {
      state: {
        invoiceId: row._id,
        invoiceNo: row.invoiceNumber,
      },
    });
  };

  // handle click on owner info
  const handleShowHistory = (data: IInvoice | null) => {
    setIsOpen((prev) => !prev);
    const historyData: IHistory[] = [];
    if (data && data.generatedAt) {
      historyData.push({
        status: statusEnum.GENERATED,
        date: formatDate(data.generatedAt, DateFormat.DATE_TIME_24),
        remarks: "",
      });
    }
    if (data && data.mailSentAt) {
      historyData.push({
        status: statusEnum.SENDED,
        date: formatDate(data.mailSentAt, DateFormat.DATE_TIME_24),
        remarks: data.mailSentRemarks,
      });
    }
    setHistory(historyData);
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<IInvoice>[] = [
    {
      header: "#",
      className: "",
      render: (_, index) => index + 1,
    },
    {
      header: "Invoice No.",
      className: "",
      render: (row) => (
        <span
          className="font-medium text-primary cursor-pointer"
          onClick={() => handleOnClick(row.companyId._id, row)}
        >
          {row.invoiceNumber}
        </span>
      ),
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
          // onClick={() => navigate(`/owner-details/${row.companyId._id}`)}
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
          <StatusCell status={row.status} isEditable={false} onHistory={() => handleShowHistory(row)}/>
        );
      },
    },
  ];

  const historyColumns: ColumnDef<IHistory>[] = [
    {
      header: "Status",
      className: "",
      render: (row) => (
        <span
          className={`font-medium text-sm ${statusColor[row.status] ?? "text-secondary"}`}
        >
          {statusMessage[row.status]}
        </span>
      ),
    },
    {
      header: "Action Date",
      className: "",
      render: (row) => row.date,
    },
    {
      header: "Remarks",
      className: "",
      render: (row) => (
        <div className="line-clamp-2 truncate max-w-full overflow-hidden">
          {row.remarks || "-"}
        </div>
      ),
    },
  ];

  return (
    <>
      <CustomTable columns={columns} data={invoices} />
      <Modal
        isOpen={isOpen}
        title={"Invoice history"}
        width={"max-w-4xl"}
        onClose={() => handleShowHistory(null)}
        showFooter={false}
      >
        <>
          <CustomTable columns={historyColumns} data={history} />
        </>
      </Modal>
    </>
  );
}
