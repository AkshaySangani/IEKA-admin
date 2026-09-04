import React from "react";

export interface IBillingParty {
  title: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
  gstin?: string;
}

interface BillingInfoProps {
  from: IBillingParty;
  to: IBillingParty;
}

const BillingCard: React.FC<{
  party: IBillingParty;
}> = ({ party }) => {
  return (
    <div className="flex-1 border border-slate-300 bg-white">
      <div className="border-b border-slate-300 px-2 py-1">
        <p className="text-[7px] font-medium uppercase text-blue-700">
          {party.title}
        </p>
      </div>

      <div className="px-2 py-1.5">
        <h3 className="text-[8px] font-medium text-slate-900">
          {party.name}
        </h3>

        <div className="mt-1 text-[6.5px] leading-[1.45] text-slate-600">
          <p>{party.address}</p>

          {party.phone && (
            <p>
              Phone: <span className="text-slate-800">{party.phone}</span>
            </p>
          )}

          {party.email && (
            <p>
              Email: <span className="text-slate-800">{party.email}</span>
            </p>
          )}

          {party.gstin && (
            <p>
              GSTIN: <span className="text-slate-800">{party.gstin}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const BillingInfo: React.FC<BillingInfoProps> = ({ from, to }) => {
  return (
    <div className="mt-2 flex gap-2">
      <BillingCard party={from} />
      <BillingCard party={to} />
    </div>
  );
};

export default BillingInfo;