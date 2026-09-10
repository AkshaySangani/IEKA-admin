import React from "react";
import Image from "../../../../common/image";
import IEkaLogo from "../../../../../assets/images/ieka_logo.png"
import { ICompany, IInvoice } from ".";
import { formatDate } from "../../../../../utils/date-format";

interface CompanyInfoProps {
  company: ICompany;
  invoice: IInvoice;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  company,
  invoice
}) => {
  return (
    <div className="border-b-2 border-primary pb-2">
      <div className="flex items-start justify-between gap-4">
        {/* Company */}
        <div className="flex flex-col items-start gap-2">
          <Image
            src={company.companyLogo}
            alt={company.companyName}
            className="h-14 w-24 object-contain"
          />

          <div className="pt-1">
            <h2 className="text-md font-medium text-secondary">
              {company.companyName}
            </h2>

            {/* <p className="mt-1 max-w-[260px] text-xs leading-[1.4] text-secondary">
              {company}
            </p> */}

            {/* {company.phone && (
              <p className="text-xs text-secondary">
                Phone : {company.phone}
              </p>
            )} */}

            {company.companyEmail && (
              <p className="text-xs text-secondary">
                Email: {company.companyEmail}
              </p>
            )}

            {company.gstin && (
              <p className="text-xs text-secondary">
                GSTIN : {company.gstin}
              </p>
            )}
          </div>
        </div>

        {/* Invoice Info */}
        <div className="min-w-[150px] text-right">
          <p className="text-[10px] uppercase text-secondary">
            Original for Recipient
          </p>

          <h1 className="mt-1 text-[36px] font-medium leading-none tracking-wide text-secondary">
            INVOICE
          </h1>

          <div className="mt-1 space-y-2 text-sm text-secondary">
            <p>
              Invoice No :{" "}
              <span className="font-medium text-secondary">{invoice.invoiceNumber}</span>
            </p>

            <p>
              Date :{" "}
              <span className="font-medium text-secondary">{formatDate(new Date())}</span>
            </p>

            <p>
              Billing Month :{" "}
              <span className="font-medium text-secondary">{invoice.billingMonth}-{invoice.billingYear}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
