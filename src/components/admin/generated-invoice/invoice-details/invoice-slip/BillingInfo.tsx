import React from "react";
import { ICompany, IInvoice } from ".";

export interface IBillingParty {
  title: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  gstin?: string;
}

interface BillingInfoProps {
  company: ICompany;
  invoice: IInvoice;
}

const BillingCard: React.FC<{
  party: IBillingParty;
}> = ({ party }) => {
  return (
    <div className="border border-inputBorder/50 bg-white" style={{
      flex: 1,
      padding: "8px 12px"
    }}>
      <div className="border-b border-inputBorder/50 py-1">
        <p className="text-xs font-medium uppercase text-primary">
          {party.title}
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-secondary">
          {party.name}
        </h3>

        <div className="flex flex-col justify-between gap-2 text-xs leading-[1.45] text-grayText">
          <p className="text-wrap line-clamp-2 truncate">{party.address}</p>

          {party.gstin && (
            <p className="text-secondary/80 font-medium">
              GSTIN: <span className="">{party.gstin}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const BillingInfo: React.FC<BillingInfoProps> = ({ company, invoice }) => {
  return (
    <div className="mt-2 flex gap-2">
      <BillingCard party={{
        title: "Bill From (Supplier)",
        name: company.companyName,
        address: "",
        gstin: (invoice.cGST > 0 && invoice.sGST > 0) ? company.gstin : ""
      }} />
      <BillingCard party={{
        title: "Bill To (Recipient)",
        name: invoice.companyId.companyName,
        address: invoice.companyId.companyAddress,
        gstin: ""
      }} />
    </div>
  );
};

export default BillingInfo;