import React from "react";

export interface IDayRow {
  daysPeriod: string;
  activeDays: number;
  employeeCount: number;
  employeeRate: number;
  totalAmount: number;
}

interface DaysTableProps {
  rows: IDayRow[];
}

const formatAmount = (amount: number) => {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const DaysTable: React.FC<DaysTableProps> = ({ rows }) => {
  return (
    <div className="mt-2 overflow-hidden border border-slate-300">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="border-r border-blue-400 px-1 py-1.5 text-left text-[7px] font-medium">
              DAYS PERIOD
            </th>

            <th className="border-r border-blue-400 px-1 py-1.5 text-center text-[7px] font-medium">
              ACTIVE DAYS
            </th>

            <th className="border-r border-blue-400 px-1 py-1.5 text-center text-[7px] font-medium">
              EMP COUNT
            </th>

            <th className="border-r border-blue-400 px-1 py-1.5 text-center text-[7px] font-medium">
              EMP RATE/MO
            </th>

            <th className="px-1 py-1.5 text-right text-[7px] font-medium">
              TOTAL AMOUNT (₹)
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="text-slate-700">
              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-[6.5px]">
                {row.daysPeriod}
              </td>

              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-right text-[6.5px]">
                {row.activeDays}
              </td>

              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-right text-[6.5px]">
                {row.employeeCount}
              </td>

              <td className="border-t border-r border-slate-300 px-1.5 py-1 text-right text-[6.5px]">
                {formatAmount(row.employeeRate)}
              </td>

              <td className="border-t border-slate-300 px-1.5 py-1 text-right text-[6.5px]">
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