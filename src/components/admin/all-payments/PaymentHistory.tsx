import { IPayment } from ".";
import Modal from "../../common/modal/Modal";
import { currency } from "../../../constants/constants";
import { getFloatValue } from "../../../utils/helper";
import { ColumnDef, CustomTable } from "../../common/table";
import { formatDate } from "../../../utils/date-format";
import { PaymentModeNames } from "../../../types/common-types";

interface PaymentHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  payments: IPayment[];
}

const PaymentHistory = ({
  isOpen,
  onClose,
  payments,
}: PaymentHistoryProps) => {
  /**
   * Close modal
   */
  const handleClose = () => {
    onClose();
  };

  // Define configuration structures with isolated column custom components
  const columns: ColumnDef<IPayment>[] = [
    {
      header: "Action Date",
      className: "",
      render: (row) => formatDate(row.date),
    },
    {
      header: "Payment Mode",
      className: "",
      render: (row) => PaymentModeNames[row.paymentMode],
    },

    {
      header: "Amount Received",
      className: "",
      render: (row) => `${currency.INR} ${getFloatValue(row.amount)}`,
    },
    {
      header: "Remarks",
      className: "",
      render: (row) => (row.remarks ? row.remarks : `-`),
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      title="Payment History"
      onClose={handleClose}
      showFooter={false}
    >
      <CustomTable columns={columns} data={payments} />
    </Modal>
  );
};

export default PaymentHistory;
