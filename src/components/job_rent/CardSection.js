import style from "../../assets/style/job_rent/card.module.css";
import JobSection from "./JobSection";
import RentSection from "./RentSection";
import { useState } from "react";
import JobForm from "../JobRentForm/JobForm";
import RentForm from "../JobRentForm/RentForm";
import Alert from '../customAlert/Alert';
import { useTranslation } from "react-i18next";
function CardSection({
  token,
  index,
  setFilters,
  // rentData,
  showModal,
  setShowModal,
  rentPopUp,
  jobPopUp,
  setJobPopUp,
  setRentPopUp,
  jobs_api,
  rents_api,
  setJobFormOpen,
  setRentOpen,
  jobForm,
  rentForm,
  baseURL,
  jobsData,
  setPage,
  page,
  filterChange,
  filters,
  rentsData,
  setShowPopModal,
  showPopUp
}) {
  const [t] = useTranslation();
  const jobData = {id: 0, name: '', company:'' , created_at:'', description:'', email:'', phone:'', place:'', salary:'', type:'', title:'', user_image:'' };
  const [popRentInfo, setPopRentInfo] = useState();
  const [popJobInfo, setPopJobInfo] = useState(jobData);
  const [show, setShow] = useState(false);
  const [count, setCount] = useState();
  function closeModal() {
    document.body.style.overflow = "auto";
    setRentPopUp(false);
    setJobPopUp(false);
    setShowModal(false);
  }

  const handleShareClick = (e) => {
    const { protocol, host } = window.location;
    let targetPath = index === 'Rent' ? `/rent/${e}`: `/job/${e}`;
    const sharedUrl = `${protocol}//${host}${targetPath}`;
    navigator.share({
      title: 'Shared title',
      text: 'Shared text',
      url: sharedUrl,
    })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Sharing failed:', error));
  };
  const [formSave, setFormSave] = useState();
  const formData = new FormData();
  formData.append('id', formSave)
  return (
    <>
      <div className="">
          
            {jobForm && <JobForm setJobFormOpen={setJobFormOpen} baseURL = {baseURL}/>}
            {rentForm && <RentForm setRentOpen={setRentOpen} baseURL = {baseURL}/>}
        <div className={`row pb-5 ${style.main_card_section}`}>
          {index === "Rent"
            ?
            < RentSection
            rents_api={rents_api}
            token = {token}
            setShowModal={setShowModal}
             setRentPopUp={setRentPopUp}
             popRentInfo={popRentInfo}
             setPopRentInfo={setPopRentInfo}
             handleShareClick = {handleShareClick}
             setShow = {setShow}
             setFormSave = {setFormSave}
             setCount={setCount}
             rentsData={rentsData}
            setPage = {setPage}
            page = {page}
            filterChange = {filterChange}
            filters = {filters}
            setShowPopModal={setShowPopModal}
            showPopUp={showPopUp}
            setFilters={setFilters}
             />
            :
           < JobSection
           jobs_api={jobs_api}
           token = {token}
           setShowModal={setShowModal}
            setJobPopUp={setJobPopUp}
            popJobInfo={popJobInfo}
            setPopJobInfo={setPopJobInfo}
            handleShareClick = {handleShareClick}
            setShow = {setShow}
            setFormSave = {setFormSave}
            setCount={setCount}
            jobsData={jobsData}
            setPage = {setPage}
            page = {page}
            filterChange = {filterChange}
            filters = {filters}
            setShowPopModal={setShowPopModal}
            showPopUp={showPopUp}
            setFilters={setFilters}
            />
              }
          {showModal && (
            <div className={style.modalSection}>
              <div className={style.closeModalDiv}>
                <button className={`closeBtnModal`} onClick={closeModal}>
                  <i className={`fas fa-times ${style.closeModalBtn}`}></i>
                </button>
              </div>
          
            </div>
          )}
              <Alert type="warning" message={t("Please login first.")} show = {show} setShow={setShow} time = '5000' count={count}
            setCount={setCount}/>
        </div>
      </div>
    </>
  );
}
export default CardSection;