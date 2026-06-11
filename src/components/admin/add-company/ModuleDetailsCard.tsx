import React, { ReactNode } from "react";
import { AddCompanyFormData } from ".";
import Image from "../../common/image";
import EmployeeManagementIcon from "../../../assets/images/employee_management.png";
import { ColumnDef, CustomTable } from "../../common/table";
import TextField from "../../common/text-field/TextField";
import { companyModules } from "../../../constants/constants";
import Checkbox from "../../common/checkbox/CheckBox";

interface ModuleDetailsCardProps {
  value: AddCompanyFormData;
  errors: Record<string, string>;
  onChange: (name: keyof AddCompanyFormData | string, value: any) => void;
}

interface ModuleData {
  id: number;
  moduleName: string;
  priceKey: string;
  accessKey: string;
  access: boolean;
  price: string;
  icon: ReactNode;
}

const ModuleDetailsCard: React.FC<ModuleDetailsCardProps> = ({
  value,
  errors,
  onChange,
}) => {

  const tableData: ModuleData[] = [
    {
      id: 1,
      moduleName: "Employee Management",
      priceKey: "employeePrice",
      accessKey: companyModules.employee,
      access: value.modules.includes(companyModules.employee),
      price: value.employeePrice,
      icon: (
        <Image
          className="w-6 h-6"
          fallbackSrc={EmployeeManagementIcon}
          alt="EmployeeManagementIcon"
        />
      ),
    },
    // {
    //   id: 2,
    //   moduleName: "Production Management",
    //   priceKey: "employeePrice",
    //   accessKey: companyModules.production,
    //   access: value.modules.includes(companyModules.production),
    //   price: value.employeePrice,
    //   icon: <Image className="w-6 h-6" fallbackSrc={EmployeeManagementIcon} alt="EmployeeManagementIcon"/>
    // },
  ];

  const columns: ColumnDef<ModuleData>[] = [
    {
      header: "#",
      className: "w-[80px] text-center font-normal text-gray-500",
      render: (row) => row?.id,
    },
    {
      header: "Module Name",
      className: "w-[50%]",
      render: (row) => (
        <div className="flex gap-4 items-center">
          {row?.icon}
          <span className="text-primary font-medium text-[15px] cursor-pointer hover:underline">
            {row.moduleName}
          </span>
        </div>
      ),
    },
    {
      header: "Access",
      className: "w-[20%]",
      render: (row) => (
        <Checkbox
          name={""}
          checked={row.access}
          onChange={(checked) => {
            if (checked) {
              onChange("modules", [...value.modules, row.accessKey]);
            } else {
              const newValue = value.modules.filter(
                (ele) => ele !== row.accessKey,
              );
              onChange("modules", newValue);
            }
          }}
        />
      ),
    },
    {
      header: "Price",
      className: "w-[25%]",
      render: (row) => (
        <TextField
          type="number"
          value={row.price}
          onChange={(e) => onChange(row.priceKey, e.target.value)}
        />
      ),
    },
  ];
  return (
    <div className="content-card p-5">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-400 pb-4 mb-8">
        <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-white">
          <i className="fa-solid fa-user-tie"></i>
        </div>

        <h3 className="text-[18px] font-medium text-gray-800">
          Module Access & Price Details
        </h3>
      </div>

      <div className="space-y-4">
        {/* Profile Image */}
        <div className="grid grid-cols-[200px_1fr] gap-6 items-start">
          <label className="font-medium text-[15px]">
            Module Access <span className="text-error">*</span>
          </label>

          <div className="max-w-[80%]">
            <CustomTable columns={columns} data={tableData} />
            {(errors.modules || errors.employeePrice) && (
              <span className="mt-1 text-xs text-error">
                {errors.modules || errors.employeePrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDetailsCard;
