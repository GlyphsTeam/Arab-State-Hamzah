import Select from "react-select";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import style from "../../../assets/style/formStyle/jobForm.module.css";
import Alert from "../../customAlert/Alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SpinnerStatic from '../../common/Spinner';
import ButtonSeven from "../../Button/ButtonSeven";
// import { getNativeSelectUtilityClasses } from "@mui/material";

const JobForm = ({ setJobFormOpen, baseUrl, jobPageData }) => {
  const [t, i18n] = useTranslation();

  const [isLoadingJob, setLoadingJob] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem("arab_user_token");
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const companyRef = useRef(null);
  const salaryRef = useRef(null);
  const salary_typeRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const short_descRef = useRef(null);

  const [jobFormData, setJobFormData] = useState({
    anonymous: "false",
    type: "",
    place: "",
    experience_level: "",
    logo: "",
    company_name: "",
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




  const handleSubmit = (event) => {
    event.preventDefault();
    setCount(4);

    if (
      titleRef.current?.value === "" ||
      jobFormData.place === "" ||
      jobFormData.type === "" ||
      phoneRef.current?.value === "" ||
      emailRef.current?.value === "" ||
      companyRef.current?.value === "" ||
      salaryRef.current?.value === "" ||
      salary_typeRef.current?.value === "" ||
      short_descRef.current?.value === "" ||
      descriptionRef.current?.value === "" ||
      jobFormData.logo === ""
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
      if (jobFormData.logo === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Logo is required")
      }
      if (companyRef.current?.value === "") {
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("Company_name is required")
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
        jobFormData.type && formData.append("type", jobFormData?.type);
        formData.append("company", jobFormData.company_name);
        formData.append("email", emailRef.current?.value);
        formData.append("phone", phoneRef.current?.value);
        jobFormData.place && formData.append("place", jobFormData?.place);
        formData.append("looking", 0);
        formData.append("company_name", companyRef.current?.value);
        jobFormData.logo && formData.append("logo", jobFormData?.logo);

        fetch(`${baseUrl}/jobs/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then(() => {
          titleRef.current = null;
          descriptionRef.current = null;
          salaryRef.current = null;
          salary_typeRef.current = null;
          companyRef.current = null;
          emailRef.current = null;
          phoneRef.current = null;
    
          setLoadingJob(false);
        })
      } catch (error) {
        console.log(error);
        setLoadingJob(false);
        setSuccess(true)
        setShow(true);
        setTypeAlert("warning")
        setMessageAlert("There is a problem with the server; please try again later.")
      }

      setJobFormData({
        anonymous: "false",
        type: "",
        place: "",
        experience_level: "",
        logo: "",
      });
      setShow(true);
      setSuccess(true);
      setCount(4);
      setTimeout(() => {
        navigate("/my-job", {
          state: {
            stateLoading: true
          }
        });
      }, 3000);
    }
  };



  const filterChange = (event, type) => {
    const { name, value } = event;
    setJobFormData({ ...jobFormData, [name]: value });
  };

  function handleImageChange(event) {
    const selectedFile = event.target.files[0];
    setJobFormData({ ...jobFormData, logo: selectedFile });
  }

  return (
    <div>
      {isLoadingJob && <SpinnerStatic text={true} textForm={i18n.language === "en" ? "Please do not close the page. Job form submission may take a few minutes. Thank you for your patience!" : "فضلك لا تغلق الصفحة. قد يستغرق إرسال المعلومات بضع دقائق. شكرا لك على انتظارك"} />}
      <h2 className={style.jobFormTitle}>Post as A Company </h2>
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
              ref={titleRef}
              className={style.inputForm}
            />
          </div>
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

          <div className={style.inputDiv}>
            <label> {t("Company Name")}</label>
            <input
              name="company_name"
              type="text"
              id="company_name"
              placeholder={t("Company Name")}
              required
              ref={companyRef}
              className={style.inputForm}
            />
          </div>
          <div className={style.inputDivImage}>
            <div className={style.uploadTitle}>
              <h2>{t("upload logo of your company")}</h2>
            </div>
            <label
              className={
                i18n.language === "en" ? style.editLabel : style.editLabelAr
              }
              htmlFor="imageInput"
            >
              <div>
                <LazyLoadImage
                  id="previewImage"
                  src={
                    jobFormData?.logo instanceof Blob
                      ? URL.createObjectURL(jobFormData?.logo)
                      : require("../../../assets/Images/upload.png")
                  }
                  alt="Uploaded logo"
                />
              </div>
            </label>

            <input
              type="file"
              id="imageInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
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
                onChange={filterChange}
                isSearchable={true}
                placeholder={t("Select...")}
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
            ></input>

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
