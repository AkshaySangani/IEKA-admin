import React, { useState } from "react";
import UserProfile from "../../../assets/images/sunny.jpg";
import Modal from "../../common/modal/Modal";
import ImageUpload from "../../common/image-upload";
import TextField from "../../common/text-field/TextField";
import { useAuthStore } from "../../../store/auth-store";
import { IAdminProfile } from ".";

interface PersonalDetailsProps {
  profile: IAdminProfile;
}

const PersonalDetailsCard: React.FC<PersonalDetailsProps> = ({profile}: PersonalDetailsProps) => {
  const [isOpen,setIsOpen] = useState<boolean>(false);
  const [profileDetail, setProfileDetail] = useState({
      file: "",
    });

    const handleClose = () => {
      setIsOpen((prev) => !prev);
    };
    
    const handleChange = (value: any, name: string) => {
      setProfileDetail((prev) => ({ ...prev, [name]: value }));
    };

  return (
    <>
    <div className="companyDetailsCard secondcard content-card">
      <div className="employebody">
        <div className="employeedetail_parts">
          <div className="titlelabel">
            Personal Details{" "}
            <div
              className="action_btn ml_10"
              onClick={() => setIsOpen(prev => !prev)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
          </div>
          <div className="ownerdetailsdiv">
            <img src={UserProfile} alt="UserProfile" width="80" />
          </div>

          <div className="employee_detailsitems">
            <div className="employee_detail_single">
              <div className="label">User Id.</div>
              <div className="labelvalue curruntmultidiv">
                <div className="curruntvalue">589845</div>
              </div>
            </div>
            <div className="employee_detail_single">
              <div className="label">Name</div>
              <div className="labelvalue curruntmultidiv">
                <div className="curruntvalue">{profile?.firstName}{" "}{profile?.lastName}</div>
              </div>
            </div>
            <div className="employee_detail_single">
              <div className="label">Status</div>
              <div className="labelvalue curruntmultidiv">
                <div className="curruntvalue">
                  <span className="status active">Active</span>
                </div>
              </div>
            </div>
            <div className="employee_detail_single">
              <div className="label">Email</div>
              <div className="labelvalue">{profile?.email}</div>
            </div>
            <div className="employee_detail_single">
              <div className="label">Phone No.</div>
              <div className="labelvalue">{profile?.phone}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
        isOpen={isOpen}
        title={"Sunny Sangani | 589845"}
        onClose={handleClose}
        handleOnConfirm={function (value?: any): void {
          throw new Error("Function not implemented.");
        }}
      >
        <div className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Person Picture  */}
            <ImageUpload
              label="Person Picture "
              required
              onChange={(file) => {
                handleChange(file, "file");
              }}
            />

             {/* Empty column for alignment */}
            <div></div>

            {/* Email */}
            <TextField label="Email" placeholder="Enter your email"/>

            {/* Phone No. */}
            <TextField label="Phone No." placeholder="Phone No. xxxxx xxxxx"/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PersonalDetailsCard;
