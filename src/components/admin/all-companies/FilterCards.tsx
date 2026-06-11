import { useEffect, useState } from "react";
import "../../../styles/variables.css";

import StatCard from "../../common/statecard/StatCard";
import { getCompaniesCount } from "../../../apis/company/company.api";

interface CardItem {
  id: string;
  title: string;
  count: number;
  activeColor?: string;
  icon: React.ReactNode;
}

export interface CompanyStats {
  total: number;
  active: number;
  inactive: number;
  deleted: number;
}
interface FilterCardsProps {
    activeCard: string;
  setActiveCard: (id: string) => void;
}

const FilterCards = ({ setActiveCard, activeCard }: FilterCardsProps) => {

  const [cards,setCards] = useState<CardItem[]>([
    {
      id: "",
      title: "Total",
      count: 0,
      activeColor: "var(--status-info)",
      icon: <i className="fa-solid fa-align-justify"></i>,
    },
    {
      id: "ACTIVE",
      title: "Active",
      count: 0,
      activeColor: "var(--status-active)",
      icon: <i className="fa-solid fa-user-check"></i>,
    },
    {
      id: "INACTIVE",
      title: "Inactive",
      count: 0,
      activeColor: "var(--status-inactive)",
      icon: <i className="fa-solid fa-user-xmark"></i>,
    },
    {
      id: "DELETED",
      title: "Deleted",
      count: 0,
      activeColor: "var(--status-deleted)",
      icon: <i className="fa-solid fa-trash-can"></i>,
    },
  ]);

  useEffect(() => {
    getCompanyCounts();
  },[]);
  
  const getCompanyCounts = async () => {
    const response = await getCompaniesCount();
    if(response?.success){
      updateCards(response?.data);
    }
  }

  // update cards
  const updateCards = (stats: CompanyStats) => {
  setCards((prev) =>
    prev.map((card) => {
      switch (card.id) {
        case "":
          return { ...card, count: stats.total };

        case "ACTIVE":
          return { ...card, count: stats.active };

        case "INACTIVE":
          return { ...card, count: stats.inactive };

        case "DELETED":
          return { ...card, count: stats.deleted };

        default:
          return card;
      }
    })
  );
};

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