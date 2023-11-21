import React from "react";
import { useState } from "react";
import style from "../../assets/style/postProduct/postProduct.module.scss";
import { useTranslation } from "react-i18next";

function MarketPlacePostOption() {
  const [inputValue, setInputValue] = useState("");
  const [isInputVisible, setInputVisible] = useState(false);
  const [points, setPoints] = useState("");
  const [t, i18n] = useTranslation();


  let formData = new FormData();
  const [housingFormData, setHousingFormData] = useState({
    points: [],
  });
  housingFormData.points &&
    housingFormData.points.forEach((point, index) => {
      formData.append(`points[${index}]`, point);
    });




  const handleSaveMessage = (event) => {
    event.preventDefault();
    if (points !== "") {
      housingFormData.points.push(points);
      setPoints("");
      setInputVisible(false);
    } else {
      setInputVisible(false);
    }
  };

  const handleDeleteMessage = () => {
    setInputValue("");
    setInputVisible(false);
  };

  const handleToggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleDeleteMessageArray = (index) => {
    const updatedPoints = [...housingFormData.points];
    updatedPoints.splice(index, 1);
    setHousingFormData({ ...housingFormData, points: updatedPoints });
  };

  return (
    <>
      <div className={style.optionMainButton} onClick={handleToggleInput}>
        <p>{t("Option")}</p>
        <p className={style.plusButton}>+</p>
      </div>
      {isInputVisible && (
        <div className={style.inputDivOption}>
          <input
            type="text"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            id="option"
            name="option"
          />
          <div className={style.optionSaveDeleteButton}>
            <button className={style.checkClass} onClick={handleSaveMessage}>
              <i className="fas fa-check"></i>
            </button>
            <button className={style.deleteClass} onClick={handleDeleteMessage}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}
      {housingFormData?.points?.map((message, index) => (
        <div className={style.optionParagraphDiv} key={index}>
          <p className={style.optionParagraph} >
            {message}
          </p>
          <button
            className={style.deleteClass}
            type="button"
            onClick={() => handleDeleteMessageArray(index)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ))}
    </>
  );
}

export default MarketPlacePostOption;
