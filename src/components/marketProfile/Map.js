/* eslint-disable jsx-a11y/iframe-has-title */
// import '../../Firebase.js'
import style from "../../assets/style/marketProfile.module.css";

function Map({ lat, lng }) {
  
  return (
    <div className={style.mapDiv}>
      <div className="mapouter">
        <div className="gmap_canvas">
          {lat && lng ? (
            <iframe
              src={`https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          ) : (
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3438896.9110684074!2d-83.17829695!3d32.6781266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f136c51d5f8157%3A0x6684bc10ec4f10e7!2sGeorgia%2C%20USA!5e0!3m2!1sen!2sjo!4v1680526343121!5m2!1sen!2sjo"></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
export default Map;


