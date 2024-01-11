import MainContact from "../components/contactUs/MainContact";
import HeroBanner from '../components/common/banner/HeroBanner'
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from 'react-redux';
import { contactState, setContactData } from '../redux/ContactUs/contact';
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { setLoading } from '../redux/slices/login';
import axios from 'axios';
function ContactUs({ baseURL }) {
  const [t] = useTranslation();
  const dispatch = useDispatch();

  const contactData = useSelector(contactState);

  let contactUrl = "contact-page";

  const getContactData = async () => {
    const token = localStorage.getItem("arab_user_token");
    const city_ID = process.env.REACT_APP_City_ID;
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${city_ID}`;
    if (contactData?.contactData === null) { 
    dispatch(setLoading(true));
    await axios.get(`${baseURL}/${contactUrl}`, {
      headers: { "Authorization": `Bearer ${token}` }
    }).then((res) => {
      dispatch(setContactData(res.data?.data));
      dispatch(setLoading(false))
    }).catch((err) => {
      console.log(err);
    })
  }
  }
  useEffect(() => {
    getContactData();
  }, [])

  return (
    <>
      <Helmet>
        <title>{contactData?.contactData?.contact?.title}</title>
        <meta name="description" content={contactData?.contactData?.contact?.description} />
      </Helmet>
      <HeroBanner data={contactData?.contactData?.slider} />
      <MainContact data={contactData?.contactData} baseURL={baseURL} />
    </>
  );
}

export default ContactUs;
