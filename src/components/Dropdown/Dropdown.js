import { useState } from "react";
import "../../styles.css";

function Dropdown({ selectedType, setSelectedType }) {
  const [isActive, setIsActive] = useState(false);
  const options = ["Movie", "Series", "Episode"];

  return (
    <div className="dropdown">
      <div className="dropdown-btn" onClick={() => setIsActive(!isActive)}>
        {selectedType}
        <span className="fas fa-caret-down"></span>
      </div>
      {isActive && (
        <div className="dropdown-content">
          {options.map((option) => (
            <div
              onClick={(e) => {
                setSelectedType(option);
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
