import { useEffect, useRef, useState } from "react";
import { statusEnum } from "../../../../constants/constants";
import { useLocation, useParams } from "react-router-dom";
import MonthPicker, {
  MonthPickerValue,
} from "../../../common/date-picker/MonthPicker";
import {
  EmployeeStatusHistoryPayload,
  getEmployeeStatusHistory,
  getInvoiceById,
  sendInvoice,
} from "../../../../apis/company/invoice.api";
import TopBar from "../../../common/topbar/TopBar";
import PageLoader from "../../../common/loader/PageLoader";
import Pagination from "../../../common/pagination/Pagination";
import EmployeeTable from "./EmployeeTable";
import { RoleEnum } from "../../../../types/common-types";
import InvoiceSlip, { ICompany, IInvoice } from "./invoice-slip";
import Button from "../../../common/button/Button";
import Modal from "../../../common/modal/Modal";
import TextAreaField from "../../../common/text-area/TextAreaField";
import Image from "../../../common/image";
import excliMinate from "../../../../assets/images/excliminate.png";
import { toastMessage } from "../../../../utils/toast-message";
import { getApiErrorMessage } from "../../../../services/api";
import getPdfHtmlContent from "./invoice-pdf";
import { downloadFile } from "../../../../utils/helper";
import { config } from "../../../../utils/config";

export interface IEmployeeMonthlyStatus {
  _id: string;
  userId: IEmployeeStatusUser;
  companyId: string;
  month: number;
  year: number;
  activeDays: number;
  deletedDays: number;
  inactiveDays: number;
  activeDates: string[];
  deletedDates: string[];
  inactiveDates: string[];
}

export interface IEmployeeStatusUser {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  status: statusEnum;
  role: RoleEnum;
}

const InvoiceDetails = () => {
  const params = useParams();
  const location = useLocation();
  const companyId = params?.id??"" as string;
  const invoiceId = location?.state?.invoiceId??"" as string;

  const initialMonth: MonthPickerValue = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  const [selectedMonth, setSelectedMonth] =
    useState<MonthPickerValue>(initialMonth);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // invoice send state
  const [invoiceSendOpen, setInvoiceSendOpen] = useState<boolean>(false);
  const [remarks, setRemarks] = useState<string>("");
  const [remarksError, setRemarksError] = useState<string>("");
  const [invoiceLoading, setInvoiceLoading] = useState<boolean>(false);

  const [employeeHistory, setEmployeeHistory] = useState<
    IEmployeeMonthlyStatus[]
  >([]);

   const [admin, setAdmin] = useState<ICompany | null>(null);
  const [invoiceDetails, setInvoiceDetails] = useState<IInvoice | null>(null);
  useEffect(() => {
    if (invoiceId) {
      fetchInvoiceDetails();
    }
  }, []);

  useEffect(() => {
    getInvoiceTable({
      page,
      limit,
      companyId,
      ...selectedMonth,
    });
    // eslint-disable-next-line
  }, [page, limit, selectedMonth.month]);

  const getInvoiceTable = async (payload: EmployeeStatusHistoryPayload) => {
    setLoading(true);
    const response = await getEmployeeStatusHistory(payload);
    if (response?.success && response?.data?.list?.length > 0) {
      const companyData = response?.data?.list;
      const count = response?.data?.total;
      setEmployeeHistory(companyData);
      setTotal(count);
      setLoading(false);
    } else {
      setEmployeeHistory([]);
      setTotal(0);
      setPage(1);
      setLoading(false);
    }
  };

   // fetch invoice details
  const fetchInvoiceDetails = async () => {
    const response = await getInvoiceById(invoiceId);
    if (response.success) {
      const adminData = response?.data?.admin;
      const invoice = response?.data?.invoice;
      setAdmin(adminData);
      setInvoiceDetails(invoice);
    } else {
      setAdmin(null);
      setInvoiceDetails(null);
    }
  };

  // handleActionOpenClose
  const handleActionOpenClose = () => {
    setInvoiceSendOpen((prev) => !prev);
  };

  const handleChange = (value: string) => {
    setRemarks(value);
  };

  // validate remark field
  const validate = () => {
    let error: string = "";
    if (!remarks.trim()) {
      error = "Remarks is required";
    }

    setRemarksError(error);
    return !error;
  };

  const handleSendInvoice = async () => {
    if (!validate()) {
      return;
    }
    setInvoiceLoading(true);
    const pdfFile = (admin && invoiceDetails) ? getPdfHtmlContent(admin, invoiceDetails) : null;
    if (pdfFile) {
      const response = await sendInvoice({
        invoicePdf: pdfFile,
        remarks
      }, invoiceId);
      if (response.success) {
        setRemarks("");
        handleActionOpenClose();
        fetchInvoiceDetails();
      }
    } else {
      toastMessage.error("Pdf file not generated. please try again.")
    }

    setInvoiceLoading(false);
  };

  // handle download pdf invoice
  const handleDownloadInvoice = async () => {
    try {
      invoiceDetails && downloadFile(`${config.BACKEND_API_URL}${invoiceDetails.invoicePdf}`, `${invoiceDetails.invoiceNumber}-${invoiceDetails.billingMonth}-${invoiceDetails.billingYear}`)
    } catch (error) {
      console.log("error", error);
      toastMessage.error(getApiErrorMessage(error));
    }
  };
  return (
    <>
      <TopBar
        title="Invoice Details"
        actionButtons={
          <div className="flex items-center gap-2">
            <MonthPicker
              value={selectedMonth}
              onChange={setSelectedMonth}
              position={"bottomCenter"}
            />
            {!invoiceDetails?.invoicePdf && <Button name="Action" size="sm" onClick={handleActionOpenClose} />}
          </div>
        }
        isPdf={invoiceDetails?.invoicePdf !== null}
        handleDownloadPdfClick={handleDownloadInvoice}
        isExcel
        // handleDownloadExcelClick={() => handleDownloadClick()}
      />
      <div className="content-area flex-1 space-y-3">
        <PageLoader loading={loading} />
        <EmployeeTable employeeHistory={employeeHistory} />
        <Pagination
          totalRecords={total}
          currentPage={page}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
        />
        <InvoiceSlip admin={admin} invoiceDetails={invoiceDetails}/>
      </div>

      <Modal
        isOpen={invoiceSendOpen}
        title={"Invoice Send"}
        onClose={handleActionOpenClose}
        handleOnConfirm={handleSendInvoice}
        confirmButtonName="Send"
        width="max-w-xl"
        loading={invoiceLoading}
      >
        <>
          <div className="mb-4 flex flex-col items-center gap-2 text-center">
            <Image
              src={excliMinate}
              fallbackSrc={excliMinate}
              alt="excliMinate"
              className={`
            w-16
            h-16
            min-w-12
            min-h-12
            shrink-0
            object-cover
            rounded-full
          `}
            />

            <h3 className="text-lg font-medium">
              {`Are you sure you want to send invoice?`}
            </h3>
          </div>
          <TextAreaField
            label="Remarks"
            required
            name={"remarks"}
            value={remarks}
            error={remarksError}
            onChange={(e) => handleChange(e.target.value)}
          />
        </>
      </Modal>
    </>
  );
};

export default InvoiceDetails;
