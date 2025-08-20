import React, { ReactNode } from "react";
import { ReactComponent as AboutYouIcon } from "../assets/icons/aboutyou.svg";
import { ReactComponent as AutomotiveIcon } from "../assets/icons/automotive.svg";
import { ReactComponent as FoodAndDrinkIcon } from "../assets/icons/foodanddrink.svg";
import { ReactComponent as GamingIcon } from "../assets/icons/gaming.svg";
import { ReactComponent as HealthIcon } from "../assets/icons/health.svg";
import { ReactComponent as LeisureIcon } from "../assets/icons/leisure.svg";
import { ReactComponent as MediaIcon } from "../assets/icons/media.svg";
import { ReactComponent as ShoppingIcon } from "../assets/icons/shopping.svg";
import { ReactComponent as TechnologyIcon } from "../assets/icons/technology.svg";
import { ReactComponent as TravelIcon } from "../assets/icons/travel.svg";
import { ReactComponent as WorkIcon } from "../assets/icons/work.svg";
import { ReactComponent as HouseHoldIcon } from "../assets/icons/home.svg";
import { ReactComponent as General1Icon } from "../assets/icons/general1.svg";
import { ReactComponent as General2Icon } from "../assets/icons/general2.svg";

interface categoryIconsType {
  [key: string]: ReactNode
}

const categoryIcons: categoryIconsType = {
  "About You": <AboutYouIcon className="question-icon" />,
  Automotive: <AutomotiveIcon className="question-icon" />,
  "Food & Drinks": <FoodAndDrinkIcon className="question-icon" />,
  Gaming: <GamingIcon className="question-icon" />,
  "Computer and Video Gaming": <GamingIcon className="question-icon" />,
  Health: <HealthIcon className="question-icon" />,
  "Healthcare": <HealthIcon className="question-icon" />,
  Home: <HouseHoldIcon className="question-icon" />,
  Household: <HouseHoldIcon className="question-icon" />,
  Leisure: <LeisureIcon className="question-icon" />,
  "Hobbies and Interests": <LeisureIcon className="question-icon" />,
  Media: <MediaIcon className="question-icon" />,
  Shopping: <ShoppingIcon className="question-icon" />,
  Technology: <TechnologyIcon className="question-icon" />,
  Electronics: <TechnologyIcon className="question-icon" />,
  Travel: <TravelIcon className="question-icon" />,
  Auto: <TravelIcon className="question-icon" />,
  Work: <WorkIcon className="question-icon" />,
  Finance: <WorkIcon className="question-icon" />,
  Region: <General2Icon  className="question-icon" />,
};

const generalIcons = [
  <General1Icon  className="question-icon"  />,
  <General2Icon  className="question-icon" />
];

export function getCategoryIcon(category: string) {
  category = category || "Other";

  if (categoryIcons[category]) {
    return categoryIcons[category];
  }
  // Choose a random general icon if there is not a direct match

  return generalIcons[Math.floor(Math.random() * generalIcons.length)];
}
