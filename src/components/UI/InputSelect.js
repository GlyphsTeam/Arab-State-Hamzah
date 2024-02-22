import { memo } from "react";
import { useTranslation } from "react-i18next";

const InputSelect = memo(({ name, inputValue, handlerChange, optionsValue, classNameInput, selectName }) => {
  const { t } = useTranslation();
  return (
    <select
      name={name}
      required
      id={name}
      value={inputValue}
      onChange={(e) => handlerChange(e)}
      className={classNameInput}
    >
      <option>{selectName || t("Select")}</option>
      {optionsValue?.length !== 0 && optionsValue?.map((item) => {
        return (
          <option key={item?.id} value={item?.id}>
            {item?.name || item?.state_name || item || item?.city}
          </option>
        )
      })}

    </select>
  )
});

export default InputSelect;
