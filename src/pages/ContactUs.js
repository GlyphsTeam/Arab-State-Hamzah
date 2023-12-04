import MainContact from "../components/contactUs/MainContact";
import useAxios from "../hooks/useAxiosGet";
import HeroBanner from '../components/common/banner/HeroBanner'
import { Helmet } from "react-helmet";
function ContactUs({baseURL}) {
  let contactUrl = "contact-page";
 let [Data] = useAxios(contactUrl);
  return (
    <>
    <Helmet>
      <title>{Data?.data?.contact?.title}</title>
      <meta name="description" content={Data?.data?.contact?.description}/>
    </Helmet>
    <HeroBanner data={Data?.data?.slider}/>
      <MainContact data={Data?.data} baseURL ={baseURL} />
    </>
  );
}

export default ContactUs;
