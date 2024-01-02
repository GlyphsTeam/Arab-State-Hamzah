import { memo } from "react";

const InputSelect = memo(({ name, inputValue, handlerChange, optionsValue, classNameInput, selectName }) => {
  return (
    <select
      name={name}
      required
      id={name}
      value={inputValue}
      onChange={(e) => handlerChange(e)}
      className={classNameInput}
    >
      <option>{selectName || "Select"}</option>
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
