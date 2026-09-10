import React from "react";
import CompanyInfo from "./CompanyInfo";
import BillingInfo from "./BillingInfo";
import DaysTable from "./DaysTable";
import { PaymentMode } from "../../../../../types/common-types";
import { statusEnum } from "../../../../../constants/constants";
import { numberToWords } from "../../../../../utils/helper";

export interface ICompany {
  companyName: string;
  gstin: string;
  companyEmail: string;
  companyLogo: string;
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
  ref: any;
  admin: ICompany | null;
  invoiceDetails: IInvoice | null;
}

const formatAmount = (amount: number) => {
  return `₹ ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const customerSignature = "Customer's Signature";
const authorizedSignature = "Authorized Signatory";

const terms: string[] = [
  "Payment is due within the agreed timeframe mentioned on the invoice.",
  "Any additional work beyond the agreed scope will be charged separately.",
  "All deliverables and ownership rights will be transferred only after full payment is received.",
  "No refunds will be applicable once the work has commenced or services have been delivered.",
];

const InvoiceSlip: React.FC<InvoiceSlipProps> = ({ ref, admin, invoiceDetails  }) => {

 
  return (
    <div className="min-h-screen bg-dashboardBg py-6">
      {/* A4 */}
      <div
        ref={ref}
        id="invoice-slip"
        className="
          mx-auto
          min-h-[1123px]
          w-[794px]
          bg-white
          px-[52px]
          py-[48px]
          text-secondary
          shadow-md
          flex flex-col justify-between
        "
      >
        {/* =====================================
            COMPANY + INVOICE INFO
        ====================================== */}
        <div>
          {admin && invoiceDetails && (
            <CompanyInfo company={admin} invoice={invoiceDetails} />
          )}

          {/* =====================================
            BILLING INFO
        ====================================== */}
          {admin && invoiceDetails && (
            <BillingInfo company={admin} invoice={invoiceDetails} />
          )}

          {/* =====================================
            DAYS TABLE
        ====================================== */}
          {invoiceDetails?.lineItems && (
            <DaysTable rows={invoiceDetails?.lineItems} />
          )}

          {/* =====================================
            SUMMARY
        ====================================== */}
          {invoiceDetails && (
            <div className="mt-2 flex justify-end">
              <div className="w-[350px] border border-slate-300">
                {/* HSN */}
                <SummaryRow label="HSN/SAC" value={""} />

                {/* Production */}
                {/* <SummaryRow
              label="Production Management"
              value={formatAmount(taxSummary.productionManagement)}
            /> */}

                {/* Subtotal */}
                <SummaryRow
                  label="Subtotal (Taxable)"
                  value={formatAmount(invoiceDetails.subtotal)}
                />

                {/* CGST */}
                {invoiceDetails.cGST > 0 && (
                  <SummaryRow
                    label="CGST @ 9%"
                    value={formatAmount(invoiceDetails.cGST)}
                  />
                )}

                {/* SGST */}
                {invoiceDetails.sGST > 0 && (
                  <SummaryRow
                    label="SGST @ 9%"
                    value={formatAmount(invoiceDetails.cGST)}
                  />
                )}

                {/* Maintenance */}
                <SummaryRow label="Maintenance" value={""} />

                {/* Total */}
                <div className="flex items-center justify-between border-t border-slate-300 px-2 py-1.5">
                  <span className="text-sm font-bold text-secondary">
                    Total{" "}
                    {invoiceDetails.cGST > 0 && invoiceDetails.sGST > 0
                      ? "(Incl. GST)"
                      : ""}
                  </span>

                  <span className="text-sm font-bold text-secondary">
                    {formatAmount(invoiceDetails.totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =====================================
            AMOUNT IN WORDS
        ====================================== */}
          {invoiceDetails && invoiceDetails.totalAmount && (
            <div className="mt-3 border border-dashed border-warning bg-warningLight px-2 py-2">
              <p className="text-xs">
                <span className="text-warning">Amount in words:</span>{" "}
                <span className="font-medium text-secondary">
                  {numberToWords(invoiceDetails?.totalAmount)} Only
                </span>
              </p>
            </div>
          )}

          {/* =====================================
            BANK + TERMS
        ====================================== */}
          <div className="mt-3 flex gap-2">
            {/* Bank Details */}
            {invoiceDetails?.companyId?.assignedBankAccount && (
              <div className="w-[42%] border border-inputBorder/50">
                <SectionHeader title="BANK DETAILS" />

                <div className="px-2 py-2">
                  {/* <BankRow
                label="Bank Name"
                value={invoiceDetails.companyId.assignedBankAccount.accountHolderName}
              /> */}

                  <BankRow
                    label="Account Holder"
                    value={
                      invoiceDetails.companyId.assignedBankAccount
                        .accountHolderName
                    }
                  />

                  <BankRow
                    label="Account No."
                    value={
                      invoiceDetails.companyId.assignedBankAccount.accountNo
                    }
                  />

                  <BankRow
                    label="IFSC Code"
                    value={
                      invoiceDetails.companyId.assignedBankAccount.ifscCode
                    }
                  />

                  <BankRow
                    label="Account Type"
                    value={
                      invoiceDetails.companyId.assignedBankAccount.accountType
                    }
                  />
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="flex-1 border border-slate-300">
              <SectionHeader title="TERMS & CONDITIONS" />

              <div className="px-2 py-2">
                <ul className="list-decimal space-y-1 pl-3 text-xs leading-[1.45] text-grayText">
                  {terms.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* =====================================
            SIGNATURES
        ====================================== */}
          <div className="mt-12 flex items-end justify-between">
            {/* Customer */}
            <div className="w-[180px]">
              <div className="h-8" />

              <p className="border-t border-transparent pt-1 text-xs text-primary">
                {customerSignature}
              </p>
            </div>

            {/* Company */}
            <div className="w-[150px] text-center">
              <div className="h-8 border-b border-secondary" />

              <p className="mt-1 text-xs font-medium text-secondary">
                For {admin?.companyName}
              </p>

              <p className="mt-0.5 text-xs text-grayText">
                {authorizedSignature}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =====================================
   COMMON COMPONENTS
====================================== */

interface SummaryRowProps {
  label: string;
  value: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between border-b border-inputBorder/60 px-2 py-1.5">
      <span className="text-xs font-medium text-secondary">{label}</span>

      <span className="text-xs font-medium text-slate-700">{value}</span>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="border-b border-slate-300 px-2 py-1.5">
      <h3 className="text-xs font-medium text-slate-700">{title}</h3>
    </div>
  );
};

interface BankRowProps {
  label: string;
  value: string | number;
}

const BankRow: React.FC<BankRowProps> = ({ label, value }) => {
  return (
    <div className="grid grid-cols-[1.5fr_2fr] py-0.5 text-xs">
      <span className="text-grayText">{label}</span>

      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
};

export default InvoiceSlip;
