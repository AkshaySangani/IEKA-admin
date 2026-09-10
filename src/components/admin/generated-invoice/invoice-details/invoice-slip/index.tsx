import React from "react";
import { PaymentMode } from "../../../../../types/common-types";
import { statusEnum } from "../../../../../constants/constants";
import getPdfHtmlContent from "../invoice-pdf";
import EmptyPlaceholder from "../../../../common/empty-paceholder";

export interface ICompany {
  companyName: string;
  gstin: string;
  companyEmail: string;
  companyLogo: string;
  companyAddress?: string;
}

export interface IInvoice {
  _id: string;

  companyId: IInvoiceCompany;

  billingMonth: number;
  billingYear: number;

  cGST: number;
  sGST: number;

  createdAt: string;
  updatedAt: string;

  dueDate: string | null;
  generatedAt: string;
  invoiceDate: string;

  invoiceNumber: string;

  lineItems: IInvoiceLineItem[];

  notes: string;

  payments: IInvoicePayment[];

  status: statusEnum;
  paymentStatus: statusEnum;

  subtotal: number;
  totalAmount: number;

  invoicePdf: string;
  mailSentAt: string;
}

export interface IInvoiceCompany {
  _id: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyLogo: string;

  employeePrice: number;

  companyRepresentative: ICompanyRepresentative;

  assignedBankAccount: IAssignedBankAccount;

  gstin: string;
}

export interface ICompanyRepresentative {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  userId: string;
}

export interface IAssignedBankAccount {
  _id: string;
  accountNo: number;
  ifscCode: string;
  accountHolderName: string;
  accountType: string;
  status: string;
}

export interface IInvoiceLineItem {
  fromDate: string;
  toDate: string;
  days: number;
  employeeCount: number;
  employeeRate: number;
  totalAmount: number;
}

export interface IInvoicePayment {
  _id: string;
  paymentMode: PaymentMode;
  amount: number;
  transactionId: string | null;
  remarks: string | null;
  date: string;
}

interface InvoiceSlipProps {
  admin: ICompany | null;
  invoiceDetails: IInvoice | null;
}

const InvoiceSlip: React.FC<InvoiceSlipProps> = ({
  admin,
  invoiceDetails,
}) => {
  return (
    <>
      {admin && invoiceDetails ? (
        <div
          className="min-h-screen bg-dashboardBg py-6"
          dangerouslySetInnerHTML={{
            __html: getPdfHtmlContent(admin, invoiceDetails),
          }}
        />
      ) : (
        <EmptyPlaceholder
          title="Invoice not found. please check later."
          description="It seems there is not any invoice generated.please check later."
        />
      )}
    </>
  );
};

export default InvoiceSlip;
