import React from "react";
import style from "../assets/style/formStyle/jobFormPage.module.css";
import { useTranslation } from "react-i18next";
import JobFormCompany from "../components/JobRentForm/jobForm/JobFormCompany";
import HeroNav from "../components/common/HeroNav";
import useAxios from "../hooks/useAxiosGet";
function PostJobCompany({baseUrl}) {
    const [t] = useTranslation();


    const cityUrl = `jobs/web/create_page`;
    const [Data] = useAxios(cityUrl);
    const jobPageData = Data?.data;

    return (
        <div>
        <HeroNav
          mainData={jobPageData?.slider}
          subData={jobPageData?.slider?.model}
        />
        <div className={style.titleDiv}>
          <h1>{t("Add Job")}</h1>
          <p>{t("How would you like to post a job")}</p>
        </div>
  
        <div className={style.btnDiv}>
          <button >
            {t("As a Company")}
          </button>
  
        </div>
          <JobFormCompany baseUrl={baseUrl} jobPageData={jobPageData} />
      </div>
    )
}

export default PostJobCompany
