import { useState } from "react";
import style from "../../assets/style/postProduct/postProduct.module.css";
import { useTranslation } from "react-i18next";

function MarketPlacePostOption({handleChange, setInputFields ,inputFields}) {
  // const [inputValue, setInputValue] = useState("");
  // const [isInputVisible, setInputVisible] = useState(false);
  // const [points, setPoints] = useState("");
  const [t, i18n] = useTranslation();
  const [nextId, setNextId] = useState(1);


  let formData = new FormData();
  const [housingFormData, setHousingFormData] = useState({
    points: [],
  });
  inputFields &&
    inputFields.forEach((point, index) => {
      formData.append(`points[${index}]`, point.point);
    });




  // const handleSaveMessage = (event) => {
  //   event.preventDefault();
  //   if (points !== "") {
  //     housingFormData.points.push(points);
  //     setPoints("");
  //     setInputVisible(false);
  //   } else {
  //     setInputVisible(false);
  //   }
  // };

  // const handleDeleteMessage = () => {
  //   setInputValue("");
  //   setInputVisible(false);
  // };

  // const handleToggleInput = () => {
  //   setInputVisible(!isInputVisible);
  // };

  const handleDeleteMessageArray = (index) => {
    const updatedPoints = [...housingFormData.points];
    updatedPoints.splice(index, 1);
    setHousingFormData({ ...housingFormData, points: updatedPoints });
  };
  const handleInputChange = (id, event) => {
    const updatedFields = inputFields.map((field) =>
      field.id === id ? { ...field, point: event.target.value } : field
    );
    setInputFields(updatedFields);
  };
  const handleAddFields = () => {
    setInputFields([...inputFields, { id: nextId, point: '' }]);
    setNextId(nextId + 1);
  };
  const handleDeleteField = (id) => {
    const updatedFields = inputFields.filter((field) => field.id !== id);
    setInputFields(updatedFields);
  };
  return (
    <>
      {/* <div className={style.optionMainButton} onClick={handleToggleInput}>
        <span>        Add Options
        </span>
        <p>{t("Option")}</p>
        <p className={style.plusButton}>+</p>
      </div> */}
      {/* {isInputVisible && (
        <div className={style.inputDivOption}>
          <input
            type="point"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            id="option"
            name="option"
            placeholder="Option"
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
      )} */}
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

      {
        inputFields.map((inputField, index) => (
          <div key={inputField.id} className={style.inputContanierFileds}>
            <input
              className={style.servericeInput}
              placeholder={`${t("Option")} ${index + 1}`}
              type="point"
              value={inputField.point}
              onChange={(event) => handleInputChange(inputField.id, event)}
            />
            <p onClick={() => handleDeleteField(inputField.id)} className={i18n.language === 'en' ? style.deleteInput : style.deleteInputAr}>{t("Delete")}</p>
          </div>
        ))
      }
      <p onClick={handleAddFields} className={style.newInput}>{t("Add New Input")}</p>

    </>
  );
}

export default MarketPlacePostOption;
