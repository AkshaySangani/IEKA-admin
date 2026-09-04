import { useRef, useState } from "react";
import Button from "../../common/button/Button";
import TopBar from "../../common/topbar/TopBar";
import PersonDetailsCard from "./PersonDetailsCard";
import CompanyDetailsCard from "./CompanyDetailsCard";
import { regex } from "../../../constants/validation-regex";
import { addCompany } from "../../../apis/company/company.api";
import { companyModules } from "../../../constants/constants";
import Modal from "../../common/modal/Modal";
import Check from "../../../assets/images/check.png";
import Image from "../../common/image";
import ModuleDetailsCard from "./ModuleDetailsCard";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../common/loader/PageLoader";
import TextAreaField from "../../common/text-area/TextAreaField";

export interface AddCompanyFormData {
  companyName: string;
  gstin: string;
  companyEmail: string;
  invoiceEmail: string;
  companyPhone: string;
  companyAddress: string;
  modules: string[];

  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;

  profileImage: File | null;
  companyLogo: File | null;

  employeePrice: string;
  //   productionPrice: string;

  assignedBankAccount: string;

  remarks: string;
}

const AddCompany = () => {
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const initialFormData = {
    companyName: "",
    gstin: "",
    companyEmail: "",
    invoiceEmail: "",
    companyPhone: "",
    companyAddress: "",
    modules: [companyModules.employee],
    assignedBankAccount: "",

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    address: "",

    profileImage: null,
    companyLogo: null,

    employeePrice: "",
    remarks: ""
  };
  const [formData, setFormData] = useState<AddCompanyFormData>(initialFormData);

  const [errors, setErrors] = useState<
    Partial<Record<keyof AddCompanyFormData, string>>
  >({});

  // handle action
  const handleAction = () => {
    if (!validateForm()) {
      return;
    }
    setIsOpen((prev) => !prev);
  };

  // handle field values when change
  const handleChange = (
    name: keyof AddCompanyFormData | string,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // handle validation for required fields
  const validateForm = () => {
    const newErrors: Partial<Record<keyof AddCompanyFormData, string>> = {};

    const emailRegex = regex.email;

    const phoneRegex = regex.phone;

    
    if (!formData.companyLogo) {
      newErrors.companyLogo = "Company logo is required";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.invoiceEmail.trim()) {
      newErrors.invoiceEmail = "Invoice email is required";
    } else if (!emailRegex.test(formData.companyEmail)) {
      newErrors.invoiceEmail = "Invalid invoice email";
    }

    // if (!formData.companyPhone.trim()) {
    //   newErrors.companyPhone = "Company phone is required";
    // } else if (!phoneRegex.test(formData.companyPhone)) {
    //   newErrors.companyPhone = "Invalid company phone";
    // }

    if (!formData.companyAddress.trim()) {
      newErrors.companyAddress = "Company address is required";
    }

    if(!formData.assignedBankAccount) {
      newErrors.assignedBankAccount = "Bank Account is required";
    }

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile image is required";
    }

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
    }

    if (!formData.employeePrice.trim()) {
      newErrors.employeePrice = "Employee price is required";
    } else if (Number(formData.employeePrice) <= 0) {
      newErrors.employeePrice = "Employee price must be greater than 0";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors);
      return false;
    }

    return true;
  };

  //scroll to focus error field
  const scrollToFirstError = (
    errors: Partial<Record<keyof AddCompanyFormData, string>>,
  ) => {
    const firstErrorKey = Object.keys(errors)[0];

    if (!firstErrorKey || !formRef.current) return;

    const field =
      formRef.current.querySelector(`[name="${firstErrorKey}"]`) || formRef.current.querySelector(
    `[data-field="${firstErrorKey}"]`
  )
      || (document.getElementById(`field-${firstErrorKey}`) as HTMLElement | null);
      console.log("field", field);

    if (field) {
      field.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        if ("focus" in field) {
          (field as HTMLElement).focus();
        }
      }, 300);
    }
  };

  // handle submit for add company
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setIsOpen(false);
      return;
    }
    setLoading(true);
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        payload.append(key, value as any);
      }
    });

    const response = await addCompany(payload);
    if (response?.success) {
      setIsOpen(false);
      setLoading(false)
      handleNavigate();
    } else {
      setLoading(false)
    }
  };

  // handle navigate to companies
  const handleNavigate = () => {
    navigate("/");
    setFormData(initialFormData);
  };

  const handleOnSubmit = () => {
    formRef.current?.requestSubmit();
  }
  return (
    <>
      <TopBar
        title="Add Company"
        actionButtons={
          <div className="flex items-center gap-2">
            <Button
              name="Action"
              size="sm"
              onClick={handleAction}
            />

            <Button
              size="sm"
              onClick={handleNavigate}
              variant="danger"
              leftIcon={<i className="fa-solid fa-xmark fa-xl text-danger"></i>}
            />
          </div>
        }
      />
      <div className="content-area flex flex-col gap-4">
        <PageLoader loading={loading}/>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className=" flex flex-col gap-4"
          method="POST"
        >
          <CompanyDetailsCard
            errors={errors}
            value={formData}
            onChange={handleChange}
          />
          <PersonDetailsCard
            errors={errors}
            value={formData}
            onChange={handleChange}
          />
          <ModuleDetailsCard
            value={formData}
            errors={errors}
            onChange={handleChange}
          />
        </form>
      </div>
      <Modal
        title="Add Company"
        confirmButtonName="Save"
        isOpen={isOpen}
        onClose={handleAction}
        handleOnConfirm={handleOnSubmit}
        loading={loading}
        width="max-w-xl"
      >
        <div className="flex justify-center flex-col">
          <div className="flex flex-col items-center gap-4">
            <div className="w-[60px]">
              <Image src={""} alt="Check" fallbackSrc={Check} />
            </div>
            <div className="text-lg font-medium">
              Are u sure want to add this company ?
            </div>
          </div>
          <TextAreaField
                value={formData?.remarks}
                onChange={(e) => handleChange("remarks", e.target.value)} name={"remarks"} label="Remarks"
              />
        </div>
      </Modal>
    </>
  );
};

export default AddCompany;
