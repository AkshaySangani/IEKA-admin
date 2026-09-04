import React from "react";
import CompanyInfo, {
  ICompanyInfo,
} from "./CompanyInfo";
import BillingInfo, {
  IBillingParty,
} from "./BillingInfo";
import DaysTable, {
  IDayRow,
} from "./DaysTable";

interface ITaxSummary {
  hsnSac: string;
  productionManagement: number;
  subtotal: number;
  cgst: number;
  sgst: number;
  maintenance: number;
  total: number;
}

interface IBankDetails {
  bankName: string;
  accountHolder: string;
  accountNo: string;
  ifscCode: string;
  branch: string;
}

interface InvoiceSlipProps {
  company: ICompanyInfo;

  invoiceNo: string;
  invoiceDate: string;
  billingMonth: string;

  billFrom: IBillingParty;
  billTo: IBillingParty;

  days: IDayRow[];

  taxSummary: ITaxSummary;

  amountInWords: string;

  bankDetails: IBankDetails;

  terms?: string[];

  customerSignature?: string;
  authorizedSignature?: string;
}

const formatAmount = (amount: number) => {
  return `₹ ${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const InvoiceSlip: React.FC<InvoiceSlipProps> = ({
  company,
  invoiceNo,
  invoiceDate,
  billingMonth,
  billFrom,
  billTo,
  days,
  taxSummary,
  amountInWords,
  bankDetails,
  terms = [],
  customerSignature = "Customer's Signature",
  authorizedSignature = "Authorized Signatory",
}) => {
  return (
    <div className="min-h-screen bg-dashboardBg py-6">
      {/* A4 */}
      <div
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
        "
      >
        {/* =====================================
            COMPANY + INVOICE INFO
        ====================================== */}
        <CompanyInfo
          company={company}
          invoiceNo={invoiceNo}
          invoiceDate={invoiceDate}
          billingMonth={billingMonth}
        />

        {/* =====================================
            BILLING INFO
        ====================================== */}
        <BillingInfo from={billFrom} to={billTo} />

        {/* =====================================
            DAYS TABLE
        ====================================== */}
        <DaysTable rows={days} />

        {/* =====================================
            SUMMARY
        ====================================== */}
        <div className="mt-2 flex justify-end">
          <div className="w-[350px] border border-slate-300">
            {/* HSN */}
            <SummaryRow
              label="HSN/SAC"
              value={taxSummary.hsnSac}
            />

            {/* Production */}
            <SummaryRow
              label="Production Management"
              value={formatAmount(taxSummary.productionManagement)}
            />

            {/* Subtotal */}
            <SummaryRow
              label="Subtotal (Taxable)"
              value={formatAmount(taxSummary.subtotal)}
            />

            {/* CGST */}
            <SummaryRow
              label="CGST @ 9%"
              value={formatAmount(taxSummary.cgst)}
            />

            {/* SGST */}
            <SummaryRow
              label="SGST @ 9%"
              value={formatAmount(taxSummary.sgst)}
            />

            {/* Maintenance */}
            <SummaryRow
              label="Maintenance"
              value={formatAmount(taxSummary.maintenance)}
            />

            {/* Total */}
            <div className="flex items-center justify-between border-t border-slate-300 px-2 py-1.5">
              <span className="text-[8px] font-bold text-slate-900">
                Total (Incl. GST)
              </span>

              <span className="text-[8px] font-bold text-slate-900">
                {formatAmount(taxSummary.total)}
              </span>
            </div>
          </div>
        </div>

        {/* =====================================
            AMOUNT IN WORDS
        ====================================== */}
        <div className="mt-3 border border-dashed border-amber-500 bg-amber-50 px-2 py-2">
          <p className="text-[7px]">
            <span className="font-medium text-slate-700">
              Amount in words:
            </span>{" "}
            <span className="font-medium text-slate-900">
              {amountInWords}
            </span>
          </p>
        </div>

        {/* =====================================
            BANK + TERMS
        ====================================== */}
        <div className="mt-3 flex gap-2">
          {/* Bank Details */}
          <div className="w-[42%] border border-slate-300">
            <SectionHeader title="BANK DETAILS" />

            <div className="px-2 py-2">
              <BankRow
                label="Bank Name"
                value={bankDetails.bankName}
              />

              <BankRow
                label="Account Holder"
                value={bankDetails.accountHolder}
              />

              <BankRow
                label="Account No."
                value={bankDetails.accountNo}
              />

              <BankRow
                label="IFSC Code"
                value={bankDetails.ifscCode}
              />

              <BankRow
                label="Branch"
                value={bankDetails.branch}
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex-1 border border-slate-300">
            <SectionHeader title="TERMS & CONDITIONS" />

            <div className="px-2 py-2">
              <ol className="list-decimal space-y-1 pl-3 text-[6px] leading-[1.45] text-slate-600">
                {terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* =====================================
            SIGNATURES
        ====================================== */}
        <div className="mt-12 flex items-end justify-between">
          {/* Customer */}
          <div className="w-[180px]">
            <div className="h-8" />

            <p className="border-t border-transparent pt-1 text-[6px] text-blue-700">
              {customerSignature}
            </p>
          </div>

          {/* Company */}
          <div className="w-[150px] text-center">
            <div className="h-8 border-b border-slate-800" />

            <p className="mt-1 text-[6px] font-medium text-slate-800">
              For {company.name}
            </p>

            <p className="mt-0.5 text-[6px] text-slate-600">
              {authorizedSignature}
            </p>
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

const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-slate-300 px-2 py-1.5">
      <span className="text-[7px] text-slate-700">
        {label}
      </span>

      <span className="text-[7px] font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
};

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
}) => {
  return (
    <div className="border-b border-slate-300 px-2 py-1.5">
      <h3 className="text-[7px] font-medium text-slate-700">
        {title}
      </h3>
    </div>
  );
};

interface BankRowProps {
  label: string;
  value: string;
}

const BankRow: React.FC<BankRowProps> = ({
  label,
  value,
}) => {
  return (
    <div className="grid grid-cols-[70px_1fr] py-0.5 text-[6px]">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-medium text-slate-700">
        {value}
      </span>
    </div>
  );
};

export default InvoiceSlip;