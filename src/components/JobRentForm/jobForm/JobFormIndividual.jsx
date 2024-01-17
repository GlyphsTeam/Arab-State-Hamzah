import Select from "react-select";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import style from "../../../assets/style/formStyle/jobForm.module.css";
import Alert from "../../customAlert/Alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import SpinnerStatic from '../../common/Spinner';
import ButtonSeven from "../../Button/ButtonSeven";

const JobForm = ({ setJobFormOpen, baseUrl, jobPageData }) => {
  const [t, i18n] = useTranslation();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  const [isLoadingJob, setLoadingJob] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");

  const token = localStorage.getItem("arab_user_token");
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const salaryRef = useRef(null);
  const salary_typeRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const short_descRef = useRef(null);
  const [jobFormData, setJobFormData] = useState({
    anonymous: "false",
    company: "",
    type: "",
    place: "",
    experience_level: "",


  });

  const options = jobPageData?.cities?.map((item) => ({
    value: item?.city,
    label: item?.city,
    name: "place",
  }));

  const typeOptions = jobPageData?.job_type?.map((item) => ({
    value: item?.value,
    label: item?.name,
    name: "type",
  }));

  const experienceOptions = jobPageData?.experience_level?.map((item) => ({
    value: item?.value,
    label: item?.name,
    name: "experience_level",

  }));

  const [success, setSuccess] = useState(false);
  const [showTitleWarn, setShowTitleWarn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCount(4);
    if (
      titleRef.current?.value === "" ||
      jobFormData.place === "" ||
      phoneRef.current?.value === "" ||
      descriptionRef.current?.value === "" ||
      salaryRef.current?.value === "" ||
      salary_typeRef.current?.value === "" ||
      short_descRef.current?.value === "" ||
      jobFormData.type === "" ||
      emailRef.current?.value === ""
    ) {
      if (descriptionRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Description is required")
      }
      if (short_descRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Short_desc is required")
      }
      if (emailRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Email is required")
      }
      if (phoneRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Phone is required")
      }
      if (salary_typeRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Salary_type is required")
      }
      if (salaryRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Salary is required")
      }
      if (jobFormData.type === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Type is required")
      }

      if (jobFormData.place === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("City is required")
      }
      if (jobFormData.experience_level === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Experience_level is required")
      }
      if (titleRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Title is required")
      }
    } else {
      setLoadingJob(true);
      try {
        const formData = new FormData();
        formData.append("title", titleRef.current?.value);
        jobFormData.anonymous && formData.append("anonymous", jobFormData?.anonymous);
        formData.append("description", descriptionRef.current?.value);
        formData.append("salary", salaryRef.current?.value);
        formData.append("salary_type", salary_typeRef.current?.value);
        formData.append("type", jobFormData.type);
        jobFormData.company && formData.append("company", jobFormData?.company);
        formData.append("email", emailRef.current?.value);
        formData.append("phone", phoneRef.current?.value);
        formData.append("place", jobFormData.place);
        formData.append("looking", 1);

        fetch(`${baseUrl}/jobs/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then((res) => {
          titleRef.current = null;
          descriptionRef.current = null;
          salaryRef.current = null;
          salary_typeRef.current = null;
          emailRef.current = null;
          phoneRef.current = null;
          
          setLoadingJob(false);
          navigate("/my-job", {
            state: {
              stateLoading: true
            }
          })
        })
      } catch (error) {
        console.log(error);
        setLoadingJob(false);
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("There is a problem with the server; please try again later.")
      }
      //commented to avoid re renders

      setJobFormData({
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
        short_desc: "",
        experience_level: "",
      });

      setCount(4);

    }
  };

  const anonymousClick = () => {
    if (jobFormData.anonymous === "false" || jobFormData.anonymous !== "true") {
      setJobFormData({ ...jobFormData, anonymous: "true" });
    } else {
      setJobFormData({ ...jobFormData, anonymous: "false" });
    }
  };
  const filterChange = (event, type) => {
    const { name, value } = event;
    setJobFormData({ ...jobFormData, [name]: value });
  };



  return (
    <div>
      {isLoadingJob && <SpinnerStatic text={true} textForm={i18n.language === "en" ? "Please do not close the page. Job form submission may take a few minutes. Thank you for your patience!" : "فضلك لا تغلق الصفحة. قد يستغرق إرسال المعلومات بضع دقائق. شكرا لك على انتظارك"} />}
      <h2 className={style.jobFormTitle}>Post as Individual </h2>
      <div className={style.jobContact}>
        <form className={style.formDiv}>
          <div className={style.inputDiv}>
            <label> {t("Job Title")}</label>
            <input
              name="title"
              type="text"
              id="title"
              placeholder={t("Job Title")}
              required
              onKeyUp={() => setShowTitleWarn(false)}
              className={style.inputForm}
              ref={titleRef}

            />
          </div>
          {showTitleWarn && (
            <p className={style.contactValidation}>{t("Title is required")}</p>
          )}

          <div
            className={
              i18n.language === "ar"
                ? `${style.singleSelectDivAr} ${style.inputDiv} postSelectForm`
                : `${style.singleSelectDiv} ${style.inputDiv} postSelectForm`
            }
          >
            <label>{t("Experience Level")}</label>
            <Select
              options={experienceOptions}
              onChange={filterChange}
              isSearchable={true}
              placeholder={t("Select...")}
            />
          </div>

          <div className={style.selectSearchDiv}>
            <div
              className={
                i18n.language === "ar"
                  ? `${style.selectDivAr} ${style.inputDiv} postSelectForm`
                  : `${style.selectDiv} ${style.inputDiv} postSelectForm`
              }
            >
              <label>{t("City")}</label>
              <Select
                options={options}
                onChange={filterChange}
                isSearchable={true}
                placeholder={t("Select...")}
              />
              
            </div>
            <div
              className={
                i18n.language === "ar"
                  ? `${style.selectDivAr} ${style.inputDiv} postSelectForm`
                  : `${style.selectDiv} ${style.inputDiv} postSelectForm`
              }
            >
              <label>{t("Job Type")}</label>
              <Select
                options={typeOptions}
                isSearchable={true}
                placeholder={t("Select...")}
                onChange={filterChange}
              />
         
            </div>
          </div>

          <div
            className={
              i18n.language === "en"
                ? style.selectOptionDiv
                : style.selectOptionDivAr
            }
          >
            <input
              type="text"
              id="salary"
              name="salary"
              ref={salaryRef}
              placeholder={t("Salary")}
              className={style.firstInput}
            />
            <select
              name="salary_type"
              id="salary_type"
              ref={salary_typeRef}
            >
              <option value="">{t("Salary Type")}</option>
              {jobPageData?.type_salary?.map((salaryType) => (
                <option key={salaryType.value} value={salaryType.value}>
                  {salaryType.name}
                </option>
              ))}
            </select>

          </div>

          <div className={style.inputDiv}>
            <label>{t("Phone Number")}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              ref={phoneRef}
              placeholder={t("Phone number")}
            />
          </div>

          <div className={style.inputDiv}>
            <label> {t("Email")} </label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              placeholder={t("Email Address")}
            />
          </div>

          <div className={style.inputDiv}>
            <label>{t("Short Description")} </label>
            <input
              type="text"
              id="short_desc"
              name="short_desc"
              ref={short_descRef}
              placeholder={t("Short Description")}
            />
          </div>

          <div className={style.txtAreaDiv}>
            <label>{t("Description")}</label>
            <textarea
              id="description"
              name="description"
              ref={descriptionRef}
              placeholder={t("Description")}
            ></textarea>
          </div>
        
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
          {success &&
            <Alert
              type={typeAlert}
              message={messageAlert}
              show={show}
              setShow={setShow}
              time="4000"
              count={count}
              setCount={setCount}
            />}
        </form>
        <div className={i18n.language === 'en' ? style.helpDiv : style.helpDivAr}>
          <h3 className={style.h3Help}>{t("Do You Need Any Help! Contact Us")}</h3>
          <Link to='/Contact'><button className={style.buttonHelp}>{t("Contact Us")}</button></Link>
        </div>
      </div>
      <div className={style.submitButton}>
        <ButtonSeven handlerClick={handleSubmit} buttonType="submit">
        {t("Post a Job")}

        </ButtonSeven>
      </div>
    </div>
  );
};

export default JobForm;
