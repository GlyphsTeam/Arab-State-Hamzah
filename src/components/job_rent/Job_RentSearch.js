import Col from 'react-bootstrap/Col';
import { useState } from "react";
import style from '../../assets/style/job_rent/search.module.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import Alert from '../customAlert/Alert';
function SearchForm({searchType,setShowPopModal, handleOpenRentModal, handleOpenModalForm, token}){
    const [t] = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const handleSearchInput = (event) => {
      setSearchQuery(event.target.value);
    };
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        handleSearchSubmit(event.target.value);
      }
    }
    let searchMethod = searchType === 'Rent' ? 'rent' : 'job';
    const handleSearchSubmit = (event) => {
      if(event !== ''){
      navigate(`/search-result/${event}/${searchMethod}`);
      setSearchQuery("");
      }
    }
    const [show, setShow] = useState(false);
    const [count, setCount] = useState();
    const showAlert = () => {
      setShow(true);
      setCount(4);
    }
    const showPostModal = () => {
      setShowPopModal(true)
    }
    return(
        <>
        <Col sm="12" md="12" lg="12" className='d-flex align-item-center'>
        <form className={`contact__form w-100 rounded-4 ${style.form}`}>
            <div className={`row w-100 ${style.paddingForm} ${style.jobSearchMargin}`}>
                <div className={`col-sm-6 col-md-2 col-lg-2 form-group  ${style.form_m} ${style.addBtnJobRent}`}>
                    <button type="button" className={`btn rounded-10 w-100  ${style.Add_btn}`} onClick={()=> token? showPostModal() : showAlert()}><i className="fas fa-plus px-2"></i> {t(`Add ${searchType}`)}</button>
                </div>
                <div className={`col-sm-12 col-md-8 col-lg-8 form-group ${style.search_div} ${style.form_m}`}>
                <i onClick={()=> {handleSearchSubmit(searchQuery)}} className={`${style.search_icon} fas fa-search`}></i>
                    <input
                            className={`${style.form_control} ${style.search_name}`}
                            id="name"
                            name="name"
                            placeholder={t("Search")}
                            type="text"
                            // value={formData.name}
                            // onChange={handleChange}
                            onChange={handleSearchInput}
                            onKeyDown={handleKeyDown}
                            value={searchQuery}
                        />
                </div>
                <div className={`col-sm-6 col-md-2 col-lg-2 form-group  ${style.form_m} ${style.formSearchButton}`}>
                    <button className={`btn rounded-10 w-100 ${style.job_btn}  ${searchQuery? '' :  style.disableSearch }`} type="submit" onClick={()=> handleSearchSubmit(searchQuery)}>{t("Search")}</button>
                </div>
           </div>
        </form>
        </Col>
        <Alert type="warning" message={t("Please login first.")} show = {show} setShow={setShow} time = '5000' count={count}
            setCount={setCount}/>
        </>
    );
}
export default SearchForm;







