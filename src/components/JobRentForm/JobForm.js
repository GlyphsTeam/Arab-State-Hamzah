import React, { useState } from "react";
import style from "../../assets/style/postJob_rent.module.css";
import Alert from "../customAlert/Alert";
import useAxios from "../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import contactStyle from "../../assets/style/contactUs.module.css";
function JobForm({ setJobFormOpen, baseURL }) {
  const [t] = useTranslation();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  const cityUrl = `cities`;
  const [Data] = useAxios(cityUrl);
  const city = Data?.data;
  const token = localStorage.getItem("arab_user_token");
  const [jobFormData, setJobFormData] = useState({
    title: "",
    anonymous: "false",
    description: "",
    salary: "",
    salary_type: "",
    type: "",
    company: "",
    email: "",
    phone: "",
    place: "",
    jobType: 0,
  });
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showTitleWarn, setShowTitleWarn] = useState(false);
  const [showLocationWarn, setShowLocationWarn] = useState(false);
  const [showTypeWarn, setShowTypeWarn] = useState(false);
  const [descriptionWarning, setDescriptionWarning] = useState(false);

  const formData = new FormData();
  jobFormData.title && formData.append("title", jobFormData?.title);
  jobFormData.anonymous && formData.append("anonymous", jobFormData?.anonymous);
  jobFormData.description &&
    formData.append("description", jobFormData?.description);
  jobFormData.salary && formData.append("salary", jobFormData?.salary);
  jobFormData.salary_type &&
    formData.append("salary_type", jobFormData?.salary_type);
  jobFormData.type && formData.append("type", jobFormData?.type);
  jobFormData.company && formData.append("company", jobFormData?.company);
  jobFormData.email && formData.append("email", jobFormData?.email);
  jobFormData.phone && formData.append("phone", jobFormData?.phone);
  jobFormData.place && formData.append("place", jobFormData?.place);
  jobFormData.jobType && formData.append("looking", jobFormData?.jobType);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobFormData({ ...jobFormData, [name]: value });
    if (name === "place" && value !== "") {
      setShowLocationWarn(false);
    }
    if (name === "type" && value !== "") {
      setShowTypeWarn(false);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTitleWarn(false);
    setShowLocationWarn(false);
    setShowTypeWarn(false);
    setDescriptionWarning(false);
    if (
      jobFormData.title === "" ||
      jobFormData.place === "" ||
      jobFormData.type === "" ||
      (jobFormData.phone === "" && jobFormData.email === "")
    ) {
      if (jobFormData.title === "") {
        setShowTitleWarn(true);
      }
      if (jobFormData.place === "") {
        setShowLocationWarn(true);
      }
      if (jobFormData.type === "") {
        setShowTypeWarn(true);
      }
      if (jobFormData.description === "") {
        setDescriptionWarning(true);
      }
      if (jobFormData.phone === "" && jobFormData.email === "") {
        setWarning(true);
        setShow(true);
        setCount(4);
      }
    } else {
      try {
        fetch(`${baseURL}/jobs/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.log(error);
      }
      //commented to avoid re renders

      setJobFormData({});
      setShow(true);
      setSuccess(true);
      setCount(4);

      setTimeout(() => {
        handleOpenModalForm();
      }, 4000);
    }
  };
  const handleOpenModalForm = () => {
    document.body.style.overflow = "auto";
    setJobFormOpen(false);
  };

  const anonymousClick = () => {
    if (jobFormData.anonymous === "false" || jobFormData.anonymous !== "true") {
      setJobFormData({ ...jobFormData, anonymous: "true" });
    } else {
      setJobFormData({ ...jobFormData, anonymous: "false" });
    }
  };
  return (
    <>
      <div className={style.formDiv}>
        <div className={style.btnCloseDiv}>
          <button className={style.closeBtnForm} onClick={handleOpenModalForm}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form className={style.form}>
          <div className={style.requiredClass}>
            <input
              name="title"
              type="text"
              id="title"
              placeholder={t("Job Title")}
              required
              onChange={handleChange}
              onKeyUp={() => setShowTitleWarn(false)}
              value={jobFormData.title}
              className={style.inputForm}
            />
            <span className="req">*</span>
          </div>
          {showTitleWarn && (
            <p className={contactStyle.contactValidation}>
              {t("Title is required")}
            </p>
          )}

          <div className={`${style.typeField} ${style.requiredClass}`}>
            <div>
              <input
                type="radio"
                id="employee"
                name="job-employee"
                checked={jobFormData.jobType === 0}
                onChange={() => setJobFormData({ ...jobFormData, jobType: 0 })}
              />
              <label className="px-1" htmlFor="employee">
                {t("Looking for an employee")}
              </label>
            </div>
          </div>

          <div className={`${style.typeField} ${style.requiredClass}`}>
            <div>
              <input
                type="radio"
                id="job"
                name="job-employee"
                onChange={() => setJobFormData({ ...jobFormData, jobType: 1 })}
              />
              <label className="px-1" htmlFor="job">
                {t("Looking for a job")}
              </label>
            </div>
          </div>

          {city && (
            <>
              <div className={`${style.typeField} ${style.requiredClass}`}>
                <select
                  name="place"
                  id="place"
                  value={jobFormData.place}
                  onChange={handleChange}
                >
                  <option value="">{t("City")}</option>
                  {city.map((item) => {
                    return (
                      <option key={item.city} value={item.city}>
                        {item.city}
                      </option>
                    );
                  })}
                </select>
                <span className="req">*</span>
              </div>
              {showLocationWarn && (
                <p className={contactStyle.contactValidation}>
                  {t("City is required")}
                </p>
              )}
            </>
          )}

          <div className={`${style.typeField} ${style.requiredClass}`}>
            <select id="type" name="type" onChange={handleChange}>
              <option value="">{t("Job Type")}</option>
              <option value="full"> {t("Full time")}</option>
              <option value="part">{t("Part time")}</option>
              <option value="both">{t("Both")}</option>
            </select>
            <span className="req">*</span>
          </div>
          {showTypeWarn && (
            <p className={contactStyle.contactValidation}>
              {t("Job Type is required")}
            </p>
          )}
          <div className={style.mainDiv}>
            <div className={style.requiredClass}>
              <div className={style.subDiv}>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  onChange={handleChange}
                  value={jobFormData.salary}
                  placeholder={t("Salary")}
                  className={style.inputForm}
                  jobFormData
                />
              </div>
            </div>
            <div className={style.subDiv}>
              <div className={style.requiredClass}>
                <select
                  name="salary_type"
                  id="salary_type"
                  className={style.fieldWidth}
                  onChange={handleChange}
                >
                  <option value="">{t("Salary Type")}</option>
                  <option value="h">{t("Hour")}</option>
                  <option value="d">{t("Day")}</option>
                  <option value="w">{t("Week")}</option>
                  <option value="m">{t("Month")}</option>
                </select>
              </div>
            </div>
          </div>

          <div className={style.requiredClass}>
            <input
              type="tel"
              id="phone"
              name="phone"
              onChange={handleChange}
              value={jobFormData.phone}
              placeholder={t("Phone number")}
              className={style.inputForm}
            />
          </div>
          <div className={style.requiredClass}>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              value={jobFormData.email}
              placeholder={t("Email Address")}
              className={style.inputForm}
            />
          </div>
          <div className={style.requiredClass}>
            <input
              type="text"
              id="company"
              name="company"
              onChange={handleChange}
              value={jobFormData.company}
              placeholder={t("Company")}
              className={style.inputForm}
            />
          </div>
          <div className={style.requiredClass}>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              value={jobFormData.description}
              placeholder={t("Description")}
              className={style.inputForm}
            />
          </div>
          {descriptionWarning && (
            <p className={contactStyle.contactValidation}>
              {t("Description is required")}
            </p>
          )}
          <div className={style.checkboxDiv}>
            <input
              id="remember"
              name="anonymous"
              type="checkbox"
              className={`col-1`}
              onClick={anonymousClick}
            />
            <label htmlFor="remember" className={`col-11`}>
              {t("Anonymous post")}
            </label>
          </div>
          <div className={style.formBtnContainer}>
            <button
              type="submit"
              className={style.formBtn}
              onClick={handleSubmit}
            >
              {t("Add")}
            </button>
          </div>
          {success ? (
            <Alert
              type="success"
              message={t("Your post published successfully")}
              show={show}
              setShow={setShow}
              time="4000"
              count={count}
              setCount={setCount}
            />
          ) : (
            <Alert
              type="warning"
              message={t("Please fill phone number or email address")}
              show={show}
              setShow={setShow}
              time="4000"
              count={count}
              setCount={setCount}
            />
          )}
        </form>
      </div>
    </>
  );
}
export default JobForm;
