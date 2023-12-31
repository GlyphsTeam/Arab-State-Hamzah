import LeftSection from "../components/showService/LeftSection";
import RightSection from "../components/showService/RightSection";
import useAxios from "../hooks/useAxiosGet";
import { Link, useLocation } from "react-router-dom";
import HeroBanner from '../components/common/banner/HeroBanner'
import style from "../assets/style/showService/showService.module.css";
import { Helmet } from 'react-helmet'
const ShowServicePage = () => {

  const location = useLocation();
  const id = location.pathname.split('/')[location.pathname.split('/').length - 1];
  let url = `our_services/show/${id}`
  const [Data] = useAxios(url);
  const data = Data?.data;
  return (
    <>
    <Helmet>
      <title>{data?.service?.title}</title>
      <meta name="description" content={data?.service?.description}/>
    </Helmet>
      <HeroBanner data={data?.slider} />

      <div className="container mb-2 mt-5">
        <div className="row">
          <div className="col-lg-6">
            <LeftSection data={data?.service} />
            <div className={style.providerDiv}>

              {<p>{ }</p>}
              <Link to={data?.service?.link}>
                <button className={style.linkBtn}>{data?.service?.title}</button>
              </Link>
            </div>
          </div>

          <div className="col-lg-6 d-flex align-items-center ">
            <RightSection data={data?.service} />
          </div>
        </div>
        <div className="row">
          <div className={style.providerDiv}>
            {<p>{ }</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowServicePage;
