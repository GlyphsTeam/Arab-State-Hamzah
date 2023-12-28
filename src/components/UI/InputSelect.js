import { memo } from "react";

const InputSelect = memo(({ name, inputValue, handlerChange, optionsValue }) => {
  return (
    <select
      name={name}
      required
      id={name}
      value={inputValue}
      onChange={(e) => handlerChange(e)}
    >
      <option>Select</option>
      {optionsValue?.length !== 0 && optionsValue?.map((item) => {
        return (
          <option key={item?.id} value={item?.id}>
            {item?.name || item?.state_name || item}
          </option>
        )
      })}

    </select>
  )
});

export default InputSelect;
