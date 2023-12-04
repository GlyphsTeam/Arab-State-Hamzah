import ReactHtmlParser from "html-react-parser";
import style from "../../assets/style/showService/showService.module.css"

const RightSection = ({ data }) => {
  return (
    <div>
      <p className={`px-5 ${style.rigthParagraph}`}>
      {ReactHtmlParser(`${data?.web_description}`)}
      </p>
    </div>
  );
};

export default RightSection;
