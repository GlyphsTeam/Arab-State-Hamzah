import style from "../../assets/style/contactUs.module.css";
import LeftContact from "./LeftContact";
import RightContact from "./RightContact";

function MainContact({ data , baseURL}) {
  return (
    <>
      <div className={style.mainReachoutDiv}>
        <div className="container">
          {/* <div className="row">
          </div> */}
          <div className="row">
            <LeftContact image={data?.contact.image} desc = {data?.contact.web_description} title= {data?.contact?.title}/>
            <RightContact baseURL = {baseURL} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContact;
