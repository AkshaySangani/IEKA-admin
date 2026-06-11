interface IInfoProps {
  onClick?: () => void;
  className?: string;
}
export default function Info({ onClick = () => {} }: IInfoProps) {
  return (
    <svg
      onClick={onClick}
      className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
