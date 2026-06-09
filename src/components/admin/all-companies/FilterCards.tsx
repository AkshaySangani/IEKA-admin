import { useState } from "react";
import "../../../styles/variables.css";

import StatCard from "../../common/statecard/StatCard";

interface CardItem {
  id: string;
  title: string;
  count: number;
  activeColor?: string;
  icon: React.ReactNode;
}
interface FilterCardsProps {
    activeCard: string;
  setActiveCard: (id: string) => void;
}

const FilterCards = ({ setActiveCard, activeCard }: FilterCardsProps) => {

  const cards: CardItem[] = [
    {
      id: "total",
      title: "Total",
      count: 6,
      activeColor: "var(--status-info)",
      icon: <i className="fa-solid fa-align-justify"></i>,
    },
    {
      id: "active",
      title: "Active",
      count: 4,
      activeColor: "var(--status-active)",
      icon: <i className="fa-solid fa-user-check"></i>,
    },
    {
      id: "inactive",
      title: "Inactive",
      count: 1,
      activeColor: "var(--status-inactive)",
      icon: <i className="fa-solid fa-user-xmark"></i>,
    },
    {
      id: "deleted",
      title: "Deleted",
      count: 1,
      activeColor: "var(--status-deleted)",
      icon: <i className="fa-solid fa-trash-can"></i>,
    },
  ];

  const handleCardClick = (
    card: CardItem
  ) => {
    setActiveCard(card.id);
  };

  return (
    <div className="stats-cards">
      {cards.map((card) => (
        <StatCard
          key={card.id}
          count={card.count}
          title={card.title}
          icon={card.icon}
          active={activeCard === card.id}
          activeColor={card.activeColor}
          onClick={() => handleCardClick(card)}
        />
      ))}
    </div>
  );
};

export default FilterCards;