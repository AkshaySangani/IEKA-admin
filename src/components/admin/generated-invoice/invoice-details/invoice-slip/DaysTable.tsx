import React from "react";
import { IInvoiceLineItem } from ".";
import { formatDate } from "../../../../../utils/date-format";

interface DaysTableProps {
  rows: IInvoiceLineItem[];
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const DaysTable: React.FC<DaysTableProps> = ({ rows }) => {
  return (
    <div className="mt-2 overflow-hidden border border-inputBorder/50">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary text-white">
            <th className="border-r  px-1 py-1.5 text-left text-xs font-medium">
              DAYS PERIOD
            </th>

            <th className="border-r  px-1 py-1.5 text-center text-xs font-medium">
              ACTIVE DAYS
            </th>

            <th className="border-r  px-1 py-1.5 text-center text-xs font-medium">
              EMP COUNT
            </th>

            <th className="border-r  px-1 py-1.5 text-center text-xs font-medium">
              EMP RATE/MO
            </th>

            <th className="px-1 py-1.5 text-right text-xs font-medium">
              TOTAL AMOUNT (₹)
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="text-slate-700">
              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-xs">
                {formatDate(row.fromDate)}{" to "}{formatDate(row.toDate)}
              </td>

              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-right text-xs">
                {row.days}
              </td>

              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-right text-xs">
                {row.employeeCount}
              </td>

              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-right text-xs">
                {formatAmount(row.employeeRate)}
              </td>

              <td className="border-t border-slate-300 px-1.5 py-1 text-right text-xs">
                {formatAmount(row.totalAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DaysTable;