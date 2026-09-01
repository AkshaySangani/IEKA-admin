import { CustomTable, ColumnDef } from "../../common/table";
import { currency } from "../../../constants/constants";
import CompanyInfo from "../../common/company-info";
import OwnerInfo from "../../common/owner-info";
import { useNavigate } from "react-router-dom";
import { IInvoice, IPayment } from ".";
import { getFloatValue } from "../../../utils/helper";
import StatusCell from "../../common/table-cell/StatusCell";
import PaymentModal from "./PaymentModal";
import { useState } from "react";
import PaymentHistory from "./PaymentHistory";

interface IPaymentTableProps {
  payments: IInvoice[];
  refreshData: () => void;
}

export default function PaymentTable({
  payments,
  refreshData,
}: IPaymentTableProps) {
  const navigate = useNavigate();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [selectedPayment, setSelectedPayment] = useState<IInvoice | null>(null);

  const [isPaymentHistoryOpen, setIsPaymentHistoryOpen] =
    useState<boolean>(false);
  const [selectedPaymentHistory, setSelectedPaymentHistory] = useState<
    IPayment[] | null
  >(null);

  // handle payment modal open
  const handlePaymentModalOpenClose = (payment: IInvoice | null) => {
    // Logic to open the payment modal
    setSelectedPayment(payment);
    setIsPaymentModalOpen((prev) => !prev);
  };

  // handle payment history open
  const handlePaymentHistoryOpenClose = (payments: IPayment[] | null) => {
    // Logic to open the payment history
    setSelectedPaymentHistory(payments);
    setIsPaymentHistoryOpen((prev) => !prev);
  };

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
      header: "Total Price / Received",
      className: "",
      render: (row) =>
        `${currency.INR} ${getFloatValue(row.totalAmount)} / ${currency.INR} ${getFloatValue(row.paidAmount)}`,
    },
    {
      header: "Status",
      className: "",
      render: (row) => {
        return (
          <StatusCell
            status={row.paymentStatus}
            onEdit={() => handlePaymentModalOpenClose(row)}
            onHistory={() => handlePaymentHistoryOpenClose(row.payments)}
          />
        );
      },
    },
  ];

  return (
    <>
      <CustomTable columns={columns} data={payments} />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => handlePaymentModalOpenClose(null)}
        payment={selectedPayment}
        refreshData={refreshData}
      />
      <PaymentHistory
        isOpen={isPaymentHistoryOpen}
        onClose={() => handlePaymentHistoryOpenClose(null)}
        payments={selectedPaymentHistory || []}
      />
    </>
  );
}
