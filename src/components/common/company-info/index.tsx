import Image from "../image";

export interface ICompanyInfo {
     companyName: string;
  companyAddress: string;
  companyLogo: string;
}

interface ICompanyInfoProps {
    companyInfo: ICompanyInfo;
    onClick?: () => void;
}
const CompanyInfo: React.FC<ICompanyInfoProps> = ({companyInfo, onClick}: ICompanyInfoProps) => {
    return (
        <div className="flex gap-4 items-center">
          <Image 
            src={companyInfo.companyLogo} 
            alt="logo" 
            className="w-12 h-12 object-contain rounded border p-1 border-gray-100"
          />
          <div className="flex flex-col gap-0.5">
            <span className="text-primary font-medium text-[15px] cursor-pointer" onClick={onClick}>
              {companyInfo.companyName}
            </span>
            <p className="text-grayText text-xs leading-relaxed max-w-[250px] text-wrap truncate line-clamp-2">
              {companyInfo.companyAddress}
            </p>
          </div>
        </div>
    );
}

export default CompanyInfo;