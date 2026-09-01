import { useRef, useState } from "react";
import { IInvoice } from ".";
import Modal from "../../common/modal/Modal";
import RadioButton from "../../common/radio-button";
import TextField from "../../common/text-field/TextField";
import TextAreaField from "../../common/text-area/TextAreaField";
import { IOption, PaymentMode } from "../../../types/common-types";
import { statusEnum } from "../../../constants/constants";
import Image from "../../common/image";
import UserImage from "../../../assets/images/User-Image.png";
import {
  PaymentPayload,
  updatePaymentStatus,
} from "../../../apis/company/payments.api";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: IInvoice | null;
  refreshData: () => void;
}

interface PaymentForm {
  paymentMode: PaymentMode;
  amount: string;
  transactionId: string;
  remarks: string;
}

interface PaymentErrors {
  amount?: string;
  transactionId?: string;
}

const paymentModeOptions: IOption[] = [
  { label: "Online", value: PaymentMode.BANK_TRANSFER },
  { label: "Cash", value: PaymentMode.CASH },
];

const PaymentModal = ({
  isOpen,
  onClose,
  payment,
  refreshData,
}: PaymentModalProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const representative = payment?.companyId?.companyRepresentative;

  const user = representative
    ? `${representative.firstName} ${representative.lastName}`
    : "";

  const [formData, setFormData] = useState<PaymentForm>({
    paymentMode: PaymentMode.BANK_TRANSFER,
    amount: "",
    transactionId: "",
    remarks: "",
  });

  const [errors, setErrors] = useState<PaymentErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Handle input changes
   */
  const handleChange = (field: keyof PaymentForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  /**
   * Validation
   */
  const validate = (): boolean => {
    const newErrors: PaymentErrors = {};

    const amount = Number(formData.amount);

    if (!formData.amount.trim()) {
      newErrors.amount = "Amount is required";
    } else if (Number.isNaN(amount) || amount <= 0) {
      newErrors.amount = "Enter a valid amount";
    } else if (payment && amount > payment.pendingAmount) {
      newErrors.amount = `Amount cannot be greater than ${payment.pendingAmount.toFixed(
        2,
      )}`;
    }

    if (
      formData.paymentMode === PaymentMode.BANK_TRANSFER &&
      !formData.transactionId.trim()
    ) {
      newErrors.transactionId = "Transaction ID is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Submit
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);

    const payload: PaymentPayload = {
      paymentMode: formData.paymentMode,
      amount: Number(formData.amount),
      transactionId: formData.transactionId.trim(),
      remarks: formData.remarks.trim(),
    };

    const response = payment
      ? await updatePaymentStatus(payload, payment._id)
      : false;
    if (response && response.success) {
      handleClose();
      refreshData();
    }
    setLoading(false);
  };

  /**
   * Close modal
   */
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  // handle confirm submit
  const handleConfirm = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={user}
      onClose={handleClose}
      handleOnConfirm={handleConfirm}
      loading={loading}
    >
      <div className="flex flex-col gap-3">
        {/* Representative */}
        <div className="flex justify-center">
          <Image
            src={representative?.profileImage}
            alt={user}
            fallbackSrc={UserImage}
            className="
                h-24
                w-24
                rounded-md
                object-cover
              "
          />
        </div>

        {/* Confirmation Text */}
        <p
          className="
            text-center
            text-base
            font-medium
            text-slate-900
            sm:text-lg
          "
        >
          Are you sure want to update payment status of this company?
        </p>
        <form
          ref={formRef}
          method="post"
          className="flex flex-col gap-3"
          onSubmit={handleSubmit}
        >
          {/* Payment Mode */}
          <RadioButton
            required
            label="Payment Mode"
            name="paymentMode"
            value={formData.paymentMode}
            options={paymentModeOptions}
            onChange={(option) => handleChange("paymentMode", option)}
          />

          {/* Amount + Transaction */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <TextField
              label="Amount Received"
              required
              type="number"
              placeholder="Enter Amount Received"
              value={formData.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              error={errors.amount}
            />

            <TextField
              label="Transaction Id"
              required={formData.paymentMode === PaymentMode.BANK_TRANSFER}
              placeholder="Enter Transaction Id"
              value={formData.transactionId}
              onChange={(e) => handleChange("transactionId", e.target.value)}
              error={errors.transactionId}
            />
          </div>

          {/* Remarks */}
          <div className="grid grid-cols-1">
            <TextAreaField
              label="Remarks"
              placeholder="Enter Remarks"
              value={formData.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              rows={4}
              name={"remarks"}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PaymentModal;
