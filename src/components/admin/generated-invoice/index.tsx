import { useEffect, useState } from "react";
import TopBar from "../../common/topbar/TopBar";
import FilterCards from "./FilterCards";
import Modal from "../../common/modal/Modal";
import SelectField from "../../common/select/SelectField";
import DownloadModal from "../../common/download-modal/DownloadModal";
import { useNavigate } from "react-router-dom";
import CompanyList from "./InvoiceTable";
import { statusEnum } from "../../../constants/constants";
import { FilterCardItem } from "../../../types/common-types";
import { getInvoices } from "../../../apis/company/invoice.api";
import MonthPicker, {
  MonthPickerValue,
} from "../../common/date-picker/MonthPicker";
import Pagination from "../../common/pagination/Pagination";
import PageLoader from "../../common/loader/PageLoader";
import { getFloatValue } from "../../../utils/helper";

export interface IInvoice {
  _id: string;
  companyId: IInvoiceCompany;
  invoiceNumber: string;
  status: statusEnum;
  totalAmount: number;
}

export interface IInvoiceCompany {
  _id: string;
  companyName: string;
  companyAddress: string;
  companyLogo: string;
  companyRepresentative: ICompanyRepresentative;
  assignedBankAccount: IAssignedBankAccount;
}

export interface ICompanyRepresentative {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface IAssignedBankAccount {
  _id: string;
  accountNo: number;
  ifscCode: string;
  accountHolderName: string;
}

export interface IInvoiceSummary {
  generated: number;
  sended: number;
  total: number;
}

const GeneratedInvoice = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initialMonth: MonthPickerValue = {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  };
  const [selectedMonth, setSelectedMonth] =
    useState<MonthPickerValue>(initialMonth);

  const [cards, setCards] = useState<FilterCardItem[]>([
    {
      id: "",
      title: "Total",
      count: 0,
      amount: 0,
      activeColor: "bg-info",
      textColor: "text-info",
      icon: <i className="fa-solid fa-users"></i>,
    },
    {
      id: statusEnum.GENERATED,
      title: "Generated",
      count: 0,
      amount: 0,
      activeColor: "bg-pending",
      textColor: "text-pending",
      icon: <i className="fa-solid fa-file-arrow-up"></i>,
    },
    {
      id: statusEnum.SENDED,
      title: "Sended",
      count: 0,
      amount: 0,
      activeColor: "bg-success",
      textColor: "text-success",
      icon: <i className="fa-solid fa-square-arrow-up-right"></i>,
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [invoices, setInvoices] = useState<IInvoice[]>([]);

  useEffect(() => {
    getInvoiceTable({
      page,
      limit,
      search,
      status: activeCard,
      ...selectedMonth,
    });
    // eslint-disable-next-line
  }, [page, limit, search, activeCard, selectedMonth.month]);

  const getInvoiceTable = async (payload: {
    search: string;
    status: string;
    page: number;
    limit: number;
    year: number;
    month: number;
  }) => {
    setLoading(true);
    const response = await getInvoices(payload);
    if (response?.success && response?.data?.list?.length > 0) {
      const companyData = response?.data?.list;
      const count = response?.data?.total;
      updateCards(response?.data?.stats);
      setInvoices(companyData);
      setTotal(count);
      setLoading(false);
    } else {
      setInvoices([]);
      setTotal(0);
      setPage(1);
      setLoading(false);
    }
  };

  // update cards
  const updateCards = (stats: IInvoiceSummary) => {
    setCards((prev) =>
      prev.map((card) => {
        switch (card.id) {
          case "":
            return {
              ...card,
              amount: getFloatValue(stats.total),
              // amount: stats.amount.total
            };

          case statusEnum.GENERATED:
            return {
              ...card,
              amount: getFloatValue(stats.generated),
              // amount: stats.amount.approved,
            };

          case statusEnum.SENDED:
            return {
              ...card,
              amount: getFloatValue(stats.sended),
              // amount: stats.amount.pending,
            };

          default:
            return card;
        }
      }),
    );
  };

  const handleDownloadClick = () => {
    setIsOpen(true);
  };

  const handleCloseDownload = () => {
    setIsOpen(false);
  };
  return (
    <>
      <TopBar
        title="Generated Invoices"
        actionButtons={
          <MonthPicker value={selectedMonth} onChange={setSelectedMonth} />
        }
        isSearch
        isExcel
        handleSearchClick={() => setIsSearchOpen(true)}
        handleDownloadExcelClick={() => handleDownloadClick()}
      />
      <div className="content-area flex flex-col gap-4">
        <PageLoader loading={loading} />
        <FilterCards
          cards={cards}
          setActiveCard={setActiveCard}
          activeCard={activeCard}
        />
        <CompanyList invoices={invoices} />
        <Pagination
          totalRecords={total}
          currentPage={page}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={setLimit}
        />
      </div>

      <Modal
        isOpen={isSearchOpen}
        title="Search"
        onClose={() => setIsSearchOpen(false)}
        confirmButtonName={"Search"}
        handleOnConfirm={() => {}}
      >
        <div className="flex items-center gap-5">
          <SelectField
            label="Company Name"
            value={undefined}
            name={""}
            options={[]}
            onChange={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />
          <SelectField
            label="Owner Name"
            value={undefined}
            name={""}
            options={[]}
            onChange={function (value: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </Modal>
      <DownloadModal
        isOpen={isOpen}
        type={"xlsx"}
        onClose={handleCloseDownload}
        dataToExport={[]}
      />
    </>
  );
};

export default GeneratedInvoice;
