import style from "../assets/style/404PageStyle.module.css";
import { Link } from "react-router-dom";
export default function Page404 () {
  return (
    <div className={style.colorDiv}>
      {" "}
      <div className={style.mainbox}>
        <div className={style.err2}>
          4<span className={style.errZero}>0</span>4
        </div>
        <div className={style.msg}>
          oops page not found
          <p>
            Let's go{" "}
            <Link className={style.homeButton} to="/">
              home
            </Link>{" "}
            and try from there.
          </p>
          <Link  to="/">
            <button class={style.pageNotFoundButton} role="button">
              Back To HomePage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
