import React from "react";
import Image from "../../../../common/image";

export interface ICompanyInfo {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  gstin?: string;
  logo?: string;
}

interface CompanyInfoProps {
  company: ICompanyInfo;
  invoiceNo: string;
  invoiceDate: string;
  billingMonth: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  company,
  invoiceNo,
  invoiceDate,
  billingMonth,
}) => {
  return (
    <div className="border-b border-primary pb-2">
      <div className="flex items-start justify-between gap-4">
        {/* Company */}
        <div className="flex items-start gap-3">
          {company.logo ? (
            <Image
              src={company.logo}
              alt={company.name}
              className="h-14 w-24 object-contain"
            />
          ) : (
            <div className="flex h-14 w-24 items-center justify-center">
              <div className="text-center">
                <div className="text-xl font-black leading-none tracking-tighter text-secondary">
                  NX
                </div>
                <div className="text-[5px] font-bold tracking-[0.25em] text-slate-500">
                  DIGITAL
                </div>
              </div>
            </div>
          )}

          <div className="pt-1">
            <h2 className="text-[12px] font-semibold text-secondary">
              {company.name}
            </h2>

            <p className="mt-1 max-w-[260px] text-[6.5px] leading-[1.4] text-grayText">
              {company.address}
            </p>

            {company.phone && (
              <p className="text-[6.5px] text-grayText">
                Phone : {company.phone}
              </p>
            )}

            {company.email && (
              <p className="text-[6.5px] text-secondary/50">
                Email: {company.email}
              </p>
            )}

            {company.gstin && (
              <p className="text-[6.5px] text-grayText">
                GSTIN : {company.gstin}
              </p>
            )}
          </div>
        </div>

        {/* Invoice Info */}
        <div className="min-w-[150px] text-right">
          <p className="text-xs uppercase text-grayText">
            Original for Recipient
          </p>

          <h1 className="mt-1 text-lg font-medium leading-none tracking-wide text-secondary">
            INVOICE
          </h1>

          <div className="mt-1 space-y-0.5 text-sm text-grayText">
            <p>
              Invoice No :{" "}
              <span className="font-medium text-secondary">
                {invoiceNo}
              </span>
            </p>

            <p>
              Date :{" "}
              <span className="font-medium text-secondary">
                {invoiceDate}
              </span>
            </p>

            <p>
              Billing Month :{" "}
              <span className="font-medium text-secondary">
                {billingMonth}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;