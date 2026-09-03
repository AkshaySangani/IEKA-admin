import InfoIcon from "../../../assets/icons/Info";
import { statusColor, statusEnum, statusMessage } from "../../../constants/constants";


interface StatusCellProps {
  status: statusEnum;
  isEditable?: boolean;

  onEdit?: () => void;
  onHistory?: () => void;

  showHistory?: boolean;
}

const StatusCell = ({
  status,
  isEditable = true,
  onEdit,
  onHistory,
  showHistory = true,
}: StatusCellProps) => {
  return (
    <div className="flex min-w-min justify-around items-center">
      {/* Status */}
      <span
        className={`
          whitespace-nowrap
          text-sm font-medium
          ${statusColor[status] ?? "text-gray-600"}
        `}
      >
        {statusMessage[status] ?? status}
      </span>

      {/* History - fixed width */}
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        {showHistory && (
          <button
            type="button"
            onClick={onHistory}
            className="
              flex h-5 w-5 items-center justify-center
            "
          >
            <InfoIcon />
          </button>
        )}
      </div>

      {/* Edit - fixed width */}
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        {isEditable && (
          <button
            type="button"
            onClick={onEdit}
            className="
              flex h-5 w-5 items-center justify-center
              text-gray-400
              transition-colors
              hover:text-grayText
            "
          >
            <i className="fa-solid fa-pen-to-square text-sm" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusCell;
