import TopBar from "../../common/topbar/TopBar";
import "./DetailsCards.css";
import CompanyDetailsCard from "./CompanyDetailsCard";
import PersonalDetailsCard from "./PersonalDetailsCard";
import { useEffect, useState } from "react";
import { getProfile } from "../../../apis/auth/auth.api";

export interface ICompanyDetails {
  companyName: string;
  gstin: string;
  companyEmail: string;
  companyLogo: string;
}

export interface IAdminProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
  passwordChangedAt: string | null;
}

const MyProfile = () => {
  const [profile, setProfile] = useState<IAdminProfile>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    profileImage: "",
    status: "ACTIVE",
    lastLoginAt: "",
    passwordChangedAt: null,
    createdAt: "",
    updatedAt: "",
  });

  const [companyDetails, setCompanyDetails] = useState<ICompanyDetails>({
    companyName: "",
    gstin: "",
    companyEmail: "",
    companyLogo: ""
})

  useEffect(() => {
    getAdminProfile();
  }, []);

  const getAdminProfile = async () => {
    const response = await getProfile();
    if (response?.data) {
      setProfile(response?.data);
      setCompanyDetails(response?.data?.company)
    }
  };
  return (
    <>
      <TopBar title="Green Leaf Solar" />
      <div className="content-area grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CompanyDetailsCard companyDetails={companyDetails}/>

        <PersonalDetailsCard profile={profile} />
      </div>
    </>
  );
};

export default MyProfile;
