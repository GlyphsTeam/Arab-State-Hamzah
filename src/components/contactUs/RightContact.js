import React, { useState } from "react";
import style from "../../assets/style/contactUs.module.css";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Alert from "../customAlert/Alert";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

function RightContact({baseURL}) {
  const [t] = useTranslation();
  const [show, setShow] = useState(false);
  const [showEmailWarn, setShowEmailWarn] = useState(false);
  const [showMessageWarn, setShowMessageWarn] = useState(false);
  const [showEmailRegexWarn, setShowEmailRegexWarn] = useState(false);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [formData, setFormData] = useState({
    subject: "",
    email: "",
    phone: "",
    message: "",
  });
  const [count, setCount] = useState();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleClick = (e) => {
    let userInfo = formData;
    setShowEmailWarn(false);
    setShowMessageWarn(false);
    e.preventDefault();
    if (!regex.test(userInfo.email)) {
      setShowEmailRegexWarn(true);
    } else {
      setShowEmailRegexWarn(false);
    }
    if (
      userInfo.message !== "" &&
      userInfo.email !== "" &&
      regex.test(userInfo.email)
    ) {
      axios
        .post(`${baseURL}/contact-us`, userInfo)
        .then((response) => {
          setFormData({ subject: "", email: "", phone: "", message: "" });
          setShow(true);
          setShowEmailRegexWarn(false);
          setCount(4);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (userInfo.email === "") {
      setShowEmailWarn(true);
    } else if (userInfo.message === "") {
      setShowMessageWarn(true);
    } else {
      setShowEmailRegexWarn(true);
    }
  };
  return (
    <>
      <div className={`col-sm-12 col-md-5 col-lg-5 ${style.rightReachout}`}>
        <form>
          <div className={`row mt-4 d-flex ${style.formDiv}`}>
            <label htmlFor="email" className={`col-1 `}>
              <MdEmail className={style.icon}/>
            </label>
            <input
              className={`col-11 ${style.formControl}`}
              id="email"
              name="email"
              placeholder={t("Email")}
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {showEmailRegexWarn && (
            <p className={style.contactValidation}>{t("Email is not valid")}</p>
          )}
          <div className={`row mt-4 d-flex ${style.formDiv}`}>
            <label htmlFor="name" className={`col-1 `}>
              {/* <i className={`fas fa-phone-alt ${style.icon}`}></i> */}
              <FaPhone className={style.icon}/>
            </label>
            <input
              className={`col-11 ${style.formControl}`}
              id="phone"
              name="phone"
              placeholder={t("Phone number")}
              type="text"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className={`row mt-4 d-flex ${style.formDiv}`}>
            <label htmlFor="subject" className={`col-1 `}>
             <FaPen className={style.icon}/>
            </label>
            <input
              className={`col-11 ${style.formControl}`}
              id="subject"
              name="subject"
              placeholder={t("Subject")}
              type="text"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className={`row mt-4 d-flex ${style.formMessage}`}>
            <textarea
              value={formData.message}
              placeholder={t("M_F")}
              name="message"
              onChange={handleChange}
            >
              {formData.message}
            </textarea>
          </div>
          {showMessageWarn && (
            <p className={style.contactValidation}>
              {t("Message cant be empty.")}
            </p>
          )}
          <div className="row">
            <button
              className={`mt-4 btn rounded-10 w-10 ${style.reachoutBtn}`}
              type="submit"
              onClick={handleClick}
            >
              {t("Send")}
            </button>
          </div>
        </form>
      </div>
      <Alert
        type="success"
        message={t("Thank you for your time.")}
        show={show}
        setShow={setShow}
        time="5000"
        count={count}
        setCount={setCount}
      />
    </>
  );
}
export default RightContact;
