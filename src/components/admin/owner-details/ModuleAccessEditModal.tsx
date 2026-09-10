import Image from "../../common/image";
import Modal from "../../common/modal/Modal";
import excliMinate from "../../../assets/images/excliminate.png";
import ModuleDetailsCard from "../add-company/ModuleDetailsCard";
import { companyModules } from "../../../constants/constants";
import { useState } from "react";
import { ModulePriceFormData } from "./OwnerDetailCard";
import TextAreaField from "../../common/text-area/TextAreaField";

interface ModuleAccessEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formData: ModulePriceFormData;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
  handleSubmit: () => void;
  loading: boolean;
}

export default function ModuleAccessEditModal({
  isOpen,
  onClose,
  formData,
  errors,
  title,
  handleChange,
  handleSubmit,
  loading
}: ModuleAccessEditModalProps) {
  
  return (
    <Modal isOpen={isOpen} title={title} loading={loading} onClose={onClose} handleOnConfirm={handleSubmit}>
      <>
        <div className="mb-4 flex flex-col items-center gap-2 text-center">
          <Image
            src={excliMinate}
            fallbackSrc={excliMinate}
            alt="excliMinate"
            width={50}
          />

          <h3 className="text-lg font-medium">
            {`Are u sure want to update access and Price of this modules ?`}
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ModuleDetailsCard
            value={formData}
            errors={errors}
            onChange={handleChange}
            isEdit={true}
          />
          <TextAreaField
              required
              label="Remarks"
              placeholder="Enter Remarks"
              value={formData.remarks}
              error={errors.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              rows={4}
              name={"remarks"}
            />
        </div>
      </>
    </Modal>
  );
}
