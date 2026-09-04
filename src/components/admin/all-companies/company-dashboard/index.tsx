import { useEffect, useState } from "react";
import PageLoader from "../../../common/loader/PageLoader";
import ExpenseSummaryCard from "./ExpenseSummaryCard";
import { ExpenseCardItem } from "../../../../types/common-types";
import { DateRangeValue } from "../../../common/date-picker/DateRangePicker";
import { toastMessage } from "../../../../utils/toast-message";
import {
  getCompaniesExpense,
  getCompanyBranchDepartments,
  getCompanyWorkforce,
} from "../../../../apis/company/company.api";
import { useLocation, useParams } from "react-router-dom";
import { DateFormat, formatDate } from "../../../../utils/date-format";
import { getTrend } from "../../../../utils/helper";
import BranchDepartments from "./BranchAndDepartments";
import CompanyEmployee from "./CompanyEmployees";
import TopBar from "../../../common/topbar/TopBar";
import { ICompany } from "../CompanyTable";
import Image from "../../../common/image";

export interface OverallExpenseStats {
  total: number;
  officeExpense: number;
  reimbursement: number;
  salary: number;
  past: Omit<OverallExpenseStats, "amount">;
}

export interface IEmployeeStats {
  total: number;
  active: number;
  inactive: number;
  deleted: number;
}

export interface IUserSummary {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

export interface IUserListStats {
  count: number;
  list: IUserSummary[];
}

export interface IDashboardEmployeeOverview {
  employee: IEmployeeStats;
  onboarding: IUserListStats;
  resignation: IUserListStats;
  termination: IUserListStats;
  promotion: IUserListStats;
}

export interface IDepartment {
  _id: string;
  name: string;
}

export interface IShift {
  _id: string;
  name: string;
  departments: IDepartment[];
}

export interface IBranch {
  _id: string;
  name: string;
  address: string;
  shifts: IShift[];
  count: number;
}

export const initialDashboardEmployeeOverview: IDashboardEmployeeOverview = {
  employee: {
    total: 0,
    active: 0,
    inactive: 0,
    deleted: 0,
  },

  onboarding: {
    count: 0,
    list: [],
  },

  resignation: {
    count: 0,
    list: [],
  },

  termination: {
    count: 0,
    list: [],
  },

  promotion: {
    count: 0,
    list: [],
  },
};

export default function CompanyDashboard() {
  const params = useParams();
  const location = useLocation();
  const company = location.state?.company as ICompany;
  const companyId = params.id as string;
  const [loading, setLoading] = useState<boolean>(false);
  const [expenseLoading, setExpenseLoading] = useState<boolean>(false);

  const [workforce, setWorkforce] = useState<IDashboardEmployeeOverview>(
    initialDashboardEmployeeOverview,
  );

  // branches
  const [branches, setBranches] = useState<IBranch[]>([]);

  // start and end date for expense data
  const [selected, setSelected] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });
  const [cards, setCards] = useState<ExpenseCardItem[]>([
    {
      id: "total",
      title: "Total Expense",
      count: 0,
      amount: 0,
      activeColor: "#fff0f0",
      textColor: "bg-pending",
      trendDetails: null,
    },
    {
      id: "reimbursement",
      title: "Reimbursement",
      count: 0,
      amount: 0,
      activeColor: "#fff0f0",
      textColor: "bg-danger",
      trendDetails: null,
    },
    {
      id: "officeExpense",
      title: "Office Expense",
      count: 0,
      amount: 0,
      activeColor: "#ecffeb",
      textColor: "bg-success",
      trendDetails: null,
    },
  ]);

  useEffect(() => {
    if (companyId) {
      fetchDashboardData();
    }
    // eslint-disable-next-line
  }, [companyId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [branchShiftResponse, expenseResponse, workforceResponse] =
        await Promise.all([
          getCompanyBranchDepartments(companyId),
          getCompaniesExpense({
            companyId,
            startDate: formatDate(selected.startDate, DateFormat.ISO_DATE),
            endDate: formatDate(selected.endDate, DateFormat.ISO_DATE),
          }),
          getCompanyWorkforce(companyId),
        ]);

      // branch shift department response
      if (branchShiftResponse) {
        setBranches(branchShiftResponse.data?.list);
      } else {
        setBranches([]);
      }
      // expense response
      if (expenseResponse?.success) {
        updateCards(expenseResponse.data);
      }

      // workforce
      if (workforceResponse?.success) {
        setWorkforce(workforceResponse.data);
      }
    } catch (error) {
      console.log("dashboard error", error);
    }
    setLoading(false);
  };

  // fetch expense data by start date and end date
  const fetchExpenseData = async (selected: DateRangeValue) => {
    if (!selected.startDate || !selected.endDate) {
      toastMessage.error("Please select date range");
      return;
    }
    setExpenseLoading(true);
    const response = await getCompaniesExpense({
      companyId,
      startDate: formatDate(selected.startDate, DateFormat.ISO_DATE),
      endDate: formatDate(selected.endDate, DateFormat.ISO_DATE),
    });

    if (response?.success) {
      updateCards(response.data);
    }

    setExpenseLoading(false);
  };

  // update expense cards
  const updateCards = (stats: OverallExpenseStats) => {
    setCards((prev) =>
      prev.map((card) => {
        switch (card.id) {
          case "total":
            const total = getTrend(stats.total, stats.past.total);
            return { ...card, amount: stats.total, trendDetails: total };

          case "reimbursement":
            const reimbursement = getTrend(
              stats.reimbursement,
              stats.past.reimbursement,
            );
            return {
              ...card,
              amount: stats.reimbursement,
              trendDetails: reimbursement,
            };

          case "officeExpense":
            const officeExpense = getTrend(
              stats.officeExpense,
              stats.past.officeExpense,
            );
            return {
              ...card,
              trendDetails: officeExpense,
              amount: stats.officeExpense,
            };

          default:
            return card;
        }
      }),
    );
  };

  // handle select date range for expense
  const handleSelectDateRange = (value: DateRangeValue) => {
    setSelected(value);
    fetchExpenseData(value);
  };
  return (
    <>
      <TopBar
        title={
          <div className="flex items-center gap-2">
            <Image src={company.companyLogo} className="h-11 w-11"/>
            <span className="text-lg text-black font-medium">
              {company.companyName}
            </span>
          </div>
        }
      />
      <div className="content-area bg-dashboardBg flex flex-col gap-3">
        <PageLoader loading={loading} />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-4">
          <BranchDepartments branches={branches} />
          <ExpenseSummaryCard
            cards={cards}
            selected={selected}
            setSelected={handleSelectDateRange}
            loading={expenseLoading}
          />
        </div>
        <div className="grid grid-cols-1">
          <CompanyEmployee companyId={companyId} workforce={workforce} />
        </div>
      </div>
    </>
  );
}
