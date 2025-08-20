import Popover from "@mui/material/Popover";
import { useTranslation } from "react-i18next";
import { useNamespace } from "./TranslationWrapper";
import { ListItemButton, ListItemText } from "@mui/material";
import "./MonthDropdown.scss";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MonthDropdown = ({
  anchorEl,
  open,
  ownerState = {},
  updateMonth,
  activeMonthIndex,
  className,
  onKeyDown,
}: any) => {
  const namespace = useNamespace();
  const { t } = useTranslation(namespace);

  return (
    <Popover
      className={className}
      onKeyDown={onKeyDown}
      onClick={ownerState?.onCancel}
      open={open}
      anchorEl={anchorEl}
      onClose={ownerState?.onCancel}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <div style={{ minWidth: "200px" }}>
        {MONTHS.map((month, index) => {
          const active =
            typeof activeMonthIndex == "number"
              ? index === activeMonthIndex
              : false;
          return (
            <ListItemButton
              key={month}
              className={active ? "active-dropdown-list-item" : ""}
              onClick={() => updateMonth(index + 1)}
            >
              <ListItemText>
                <span key={t(month)}>{t(month)}</span>
              </ListItemText>
            </ListItemButton>
          );
        })}
      </div>
    </Popover>
  );
};

export default MonthDropdown;
