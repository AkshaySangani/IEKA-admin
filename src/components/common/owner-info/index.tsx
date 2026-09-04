import Image from "../image";
import UserAvatar from "../../../assets/images/User-Image.png";

export interface IOwnerInfo {
  userId: string;
  profileImage: string;
  firstName: string;
  lastName: string;
}

interface IOwnerInfoProps {
  ownerInfo: IOwnerInfo;
  onClick?: () => void;
}

const OwnerInfo: React.FC<IOwnerInfoProps> = ({
  ownerInfo,
  onClick = () => {},
}: IOwnerInfoProps) => {
  return (
    <div className="flex gap-3 items-center" onClick={onClick}>
      <Image
        src={ownerInfo.profileImage}
        alt={ownerInfo.firstName}
        fallbackSrc={UserAvatar}
        className="w-9 h-9 object-cover rounded-full ring-1 ring-gray-200"
      />
      <div className="flex flex-col">
        <span className="text-primary font-medium text-sm cursor-pointer">
          {ownerInfo.firstName} {ownerInfo.lastName}
        </span>
        <span className="text-gray-400 text-xs">{ownerInfo.userId}</span>
      </div>
    </div>
  );
};

export default OwnerInfo;
