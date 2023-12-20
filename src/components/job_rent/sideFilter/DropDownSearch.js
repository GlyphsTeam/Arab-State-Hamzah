import Select from "react-select";
import style from "../../../assets/style/job_rent/jobRentFilter.module.css";
import { useTranslation } from "react-i18next";

function DropDownSearch({
  title,
  name,
  nameTo,
  subData,
  filterChange,
  fields_num,
  filter_type,
  filters,
}) {
  const [t] = useTranslation();


  const options = subData.map((item) => ({
    value: item.value,
    label: item.name,
    name: name,
  }));
  return (
    <>
      <p className={style.productFilterTitle}>{title}</p>
      {fields_num === "1" ? (
        <div className={`${style.searchableSelect} jobRentSelect`}>
          {filter_type === "1" ? (
            <Select
              options={options}
              onChange={filterChange}
              isSearchable={true}
              placeholder={t("Select...")}
            />
          ) : (
            <input
              className={style.filterInputDouble}
              onChange={(event) => filterChange(event, 2)}
              type="text"
              name={name}
              value={filters.name}
              placeholder={`${title}`}
            />
          )}
        </div>
      ) : (
        <div className={style.mainDoubleElementDiv}>
          <div className={`${style.searchableSelectDouble} jobRentSelect`}>
            {filter_type === "1" ? (
              <Select
                options={options}
                //   value={selectedOption}
                onChange={filterChange}
                isSearchable={true}
                placeholder={t("Select...")}
              />
            ) : (
              <input
                className={style.filterInputDouble}
                onChange={(event) => filterChange(event, 2)}
                type="text"
                name={name}
                value={filters.name}
                placeholder={`${title} ${t("from")}`}
              />
            )}
          </div>

          <div className={`${style.searchableSelectDouble} jobRentSelect `}>
            {filter_type === "1" ? (
              <Select
                options={options}
                //   value={selectedOption}
                onChange={filterChange}
                isSearchable={true}
                placeholder={t("Select...")}
              />
            ) : (
              <input
                className={style.filterInputDouble}
                onChange={(event) => filterChange(event, 2)}
                type="text"
                name={nameTo}
                value={filters.nameTo}
                placeholder={`${title} ${t("to")}`}
              />
            )}
          </div>
        </div>
      )}

      <hr />
    </>
  );
}

export default DropDownSearch;
