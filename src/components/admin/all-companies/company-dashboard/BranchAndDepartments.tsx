import { IBranch } from ".";
import BranchCard from "../../../common/branch-card";

interface BranchDepartmentsProps {
  branches: IBranch[];
}

export default function BranchDepartments({
  branches,
}: BranchDepartmentsProps) {
  
  return (
    <div className="content-card p-3 sm:p-4 flex flex-col gap-2">
      <div className="flex items-center pb-3 border-b">
        <i className="fa-solid fa-users"></i>
        <span className="px-2 text-md font-medium mr-2">
          Branch & Departments
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-4">
        {branches.length > 0 ? (
          branches.map((branch) => (
            <BranchCard branch={branch} key={branch._id}/>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
