import React from "react";
import { IBranch } from "../../admin/all-companies/company-dashboard";

interface BranchCardProps {
  branch: IBranch;
}

const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  return (
    <div key={branch.name} className="w-full border border-dashed border-gray-300 bg-light p-3 sm:p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b">
        <h3 className="min-w-0 truncate text-sm font-medium text-primary sm:text-md">
          {branch.name}
        </h3>

        <div className="flex h-6 min-w-6 shrink-0 items-center justify-center bg-primary text-sm font-semibold text-white sm:h-7 sm:min-w-7 sm:text-base">
          {branch.count}
        </div>
      </div>

      {/* Address */}
      <p className="mt-1 break-words text-xs leading-5 text-grayText">
        {branch.address}
      </p>

      {/* Shifts */}
      {branch.shifts?.length > 0 ? (
        branch.shifts.map((shift) => (
          <div
            key={shift.name}
            className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2"
          >
            {/* Type */}
            <div className="shrink-0 text-sm font-medium text-secondary sm:w-[80px]">
              {shift.name}
            </div>

            {/* Department Tags */}
            <div className="flex min-w-0 flex-1 flex-wrap gap-1.5">
              {shift.departments.length > 0 ? (
                shift.departments.map((department) => (
                  <span
                    key={department.name}
                    className="inline-flex items-center bg-pendingLight px-2 py-1 text-xs font-normal text-grayText"
                  >
                    {department.name}
                  </span>
                ))
              ) : (
                <span className="text-grayText text-xs md:text-sm">No department(s) found</span>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="pt-4 text-grayText text-center text-xs md:text-sm">No shift(s) found</div>
      )}
    </div>
  );
};

export default BranchCard;
