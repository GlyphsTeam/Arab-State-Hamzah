import HeroNav from "../components/common/HeroNav";
import LookingFor from "../components/common/lookingFor/LookingFor";
import { Helmet } from 'react-helmet';
import { rentState, setJobData } from '../redux/Rent/rent';
import { setLoading } from '../redux/slices/login';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { useEffect } from "react";
function JobPage() {
  const url = `jobs/web/looking_for`;


  const dispatch = useDispatch();
  const jobLooking = useSelector(rentState);

  const [t] = useTranslation();
  const getJobLooking = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (jobLooking.jobData === null) {
      dispatch(setLoading(true));

    await axios.get(`${baseURL}/${url}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
      dispatch(setJobData(res.data?.data));

      dispatch(setLoading(false));

    }).catch((err) => {
      console.log(err);

      dispatch(setLoading(false));
    })
  }
  }
  useEffect(() => {
    getJobLooking();
  }, []);

  return (
    <div>
      <Helmet>
        <title>{jobLooking.jobData?.slider?.main?.title}</title>
        <meta name="description" content={jobLooking.jobData?.slider?.main?.description} />
      </Helmet>
      <HeroNav
        mainData={jobLooking.jobData?.slider}
        subData={jobLooking.jobData?.slider?.model}
      />
      <LookingFor pageType='job' />
    </div>
  );
}

export default JobPage;
