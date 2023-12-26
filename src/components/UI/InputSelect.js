

function InputSelect ({ name, inputValue, handlerChange, optionsValue }) {

  return (
    <select
      name={name}
      required
      id={name}
      value={inputValue}
      onChange={(e) => handlerChange(e)}
    >
      {optionsValue?.length!==0&&optionsValue?.map((item) => {
        return (
          <option key={item?.id} value={item?.id}>
            {item?.name || item?.state_name || item} 
          </option>
        )
      })}

    </select>
  )
}

export default InputSelect;
