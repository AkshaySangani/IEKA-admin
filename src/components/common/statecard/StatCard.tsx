import React from "react";
import "./StatCard.css";

interface StatCardProps {
  count: number;
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  activeColor?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  count,
  title,
  icon,
  active = false,
  activeColor = "#007bff",
  onClick,
}) => {
  return (
    <div
      className={`stat-card content-card ${active ? "active" : ""}`}
      style={active ? { backgroundColor: activeColor } : {}}

      onClick={onClick}
    >
      <div className="stat-card-top">
        <div className="stat-card-count" style={{ color: activeColor }}>
          {count}
        </div>

        <div className="stat-card-icon">
          {icon}
        </div>
      </div>

      <div className="stat-card-title">
        {title}
      </div>
    </div>
  );
};

export default StatCard;