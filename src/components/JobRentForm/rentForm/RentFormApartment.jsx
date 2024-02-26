import React, { useState, useRef } from "react";
import style from "../../../assets/style/formStyle/rentForm.module.css";
import Alert from "../../customAlert/Alert";
import useAxios from "../../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import HeroNav from "../../common/HeroNav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SpinnerStatic from '../../common/Spinner';
import ButtonSeven from "../../Button/ButtonSeven";

function ShowRentForm({ baseUrl }) {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const titleRef = useRef(null);
  const areaRef = useRef(null);
  const placeRef = useRef(null);
  const genderRef = useRef(null);
  const emailRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const bathroomsRef = useRef(null);
  const bedroomsRef = useRef(null);
  const phoneRef = useRef(null);
  const typeRef = useRef(null);


  


  const [messageAlert, setMessageAlert] = useState("");
  const [isLoadingRent, setLoadingRent] = useState(false);

  const [typeAlert, setTypeAlert] = useState("");
  const [anonymous, setAnonymous] = useState("");
  const [images, setImages] = useState([]);
  const [is_bathroom_shared, set_is_bathroom_shared] = useState("");
  const [showImageInput, setShowImageInput] = useState(true);
  const token = localStorage.getItem("arab_user_token");
  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);

  const [count, setCount] = useState();

  const handleImageDrop = (acceptedFiles) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      titleRef.current?.value === "" ||
      typeRef.current?.value === "" ||
      placeRef.current?.value === "" ||
      phoneRef.current?.value === "" ||
      descriptionRef.current?.value === "" ||
      images.length === 0 ||
      emailRef.current?.value === "" ||
      genderRef.current?.value === "" ||
      bathroomsRef.current?.value === "" ||
      bedroomsRef.current?.value === "" ||
      areaRef.current?.value === ""
    ) {

      if (typeRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("type is required")
      }

      if (descriptionRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Description is required")
        setShow(true)
        setCount(4)

      }

      if (phoneRef.current?.value === "") {
        setWarning(true);
        setShow(true);
        setCount(4);
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Phone is required")
      }
      if (emailRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Email is required")
      }
      if (areaRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Area is required")
      }
      if (priceRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Price is required")
      }
      if (bedroomsRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Bedrooms is required")
      }
      if (bathroomsRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Bathrooms is required")
      }
      if (genderRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Gender is required")
      }
      if (placeRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Location is required")
      }
      if (titleRef.current?.value === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Title is required")
      }
      if (images.length === 0) {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Image is required")
      }

    }
    else {
      try {

        const formData = new FormData();
        formData.append("title", titleRef.current?.value);
        formData.append("description", descriptionRef.current?.value);
        formData.append("gender", genderRef.current?.value);
        formData.append("email", emailRef.current?.value);
        formData.append("phone_number", phoneRef.current?.value);
        formData.append("price", priceRef.current?.value);
        formData.append("bathrooms", bathroomsRef.current?.value);
        formData.append("bedrooms", bedroomsRef.current?.value);
        formData.append("type", typeRef.current?.value);
        formData.append("area", areaRef.current?.value);
        formData.append("place", placeRef.current?.value);
        formData.append("looking", 0);
        anonymous && formData.append("anonymous", anonymous);
        is_bathroom_shared &&
          formData.append("is_bathroom_shared", is_bathroom_shared);

        images.forEach((image) => {
          formData.append("images[]", image);
        });

        setLoadingRent(true);
        fetch(`${baseUrl}/rents/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then(() => {
          titleRef.current = null;
          descriptionRef.current = null;
          genderRef.current = null;
          emailRef.current = null;
          phoneRef.current = null;
          priceRef.current = null;
          bathroomsRef.current = null;
          bedroomsRef.current = null;
          typeRef.current = null;
          areaRef.current = null;
          placeRef.current = null;
          setLoadingRent(false);
          // navigate("/my-housing", {
          //   state: {
          //     stateLoading: true
          //   }
          // })
        });
      } catch (error) {
        console.log(error);
        setLoadingRent(false)
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("There is a problem with the server; please try again later.")
      }
      setShow(true);
      setSuccess(true);
      setCount(4);
    }
  };
  const anonymousClick = () => {
    if (anonymous === "" || anonymous !== "true") {
      setAnonymous("true");
    } else {
      setAnonymous("");
    }
  };
  const sharedClick = () => {
    if (is_bathroom_shared === "" || is_bathroom_shared !== "true") {
      set_is_bathroom_shared("true");
    } else {
      set_is_bathroom_shared("");
    }
  };
  const cityUrl = `rents/web/create_page`;
  const [Data] = useAxios(cityUrl);
  const dataR = Data?.data;

  return (
    <>
      {isLoadingRent && <SpinnerStatic text={true} textForm={i18n.language === "en" ? "Please do not close the page. Rent form submission may take a few minutes. Thank you for your patience!" : "فضلك لا تغلق الصفحة. قد يستغرق إرسال المعلومات بضع دقائق. شكرا لك على انتظارك"} />}
      <HeroNav
        mainData={dataR?.slider}
        subData={dataR?.slider?.model}
      />

      <div className={style.titleDiv}>
        <h1>{t("Apartment For Rent")}</h1>
        {/* <p>{t("How would you like to post a Rent")}</p> */}
      </div>
      <h2 className={style.jobFormTitle}>{t("Apartment for rent")} </h2>
      <div className={style.jobContact}>
        <form className={style.formDiv}>
          {showImageInput && (
            <>
              <div className={` ${style.uploadImageDiv}`}>
                <Dropzone onDrop={handleImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className={style.postHousingUploadImage}>
                        <LazyLoadImage
                          src={require("../../../assets/Images/uploadImageForm.png")}
                        />
                        <p>{"Upload Your Images"}</p>
                      </div>
                    </div>
                  )}
                </Dropzone>
                <div className={style.imageContainerDiv}>
                  {images?.map((image, index) => (
                    <div key={image.name} className={style.imageContainer}>
                      <LazyLoadImage
                        src={URL.createObjectURL(image)}
                        alt=""
                      />
                      <button
                        className={style.removeButton}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          <div className={style.inputDiv}>
            <input
              name="title"
              type="text"
              id="title"
              placeholder={t("Title")}
              className={style.inputForm}
              ref={titleRef}
            />
          </div>


          <>
            <div className={`${style.inputDiv}`}>
              <select
                name="place"
                id="place"
                ref={placeRef}
              >
                <option value="">{t("Location")}</option>
                {dataR?.cities?.map((item) => {
                  return (
                    <option key={item.city} value={item?.city}>
                      {item?.city}
                    </option>
                  );
                })}
              </select>
            </div>

          </>

          <div className={`${style.inputDiv}`}>
            <select
              name="type"
              id="type"
              ref={typeRef}
            >
              <option value="">{t("Type")}</option>
              {dataR?.type?.map((item) => {
                return (
                  <option key={item.value} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={` ${style.mainDiv} ${style.inputDiv} `}>
            <select
              name="gender"
              id="gender"
              ref={genderRef}
              className={`${style.fieldWidth} ${style.fieldHeight}`}
            >
              <option value="choose one">{t("Gender")}</option>
              {dataR?.gender?.map((item, index) => {
                return (
                  <option key={index} value={item?.value}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div
            className={
              i18n.language === "en"
                ? style.multiInputDiv
                : style.selectOptionDivAr
            }
          >
            <input
              name="bedrooms"
              id="bedrooms"
              placeholder={t("bedrooms")}
              className={`${style.fieldWidth} ${style.fieldHeight}`}
              ref={bedroomsRef}
            />
            <input
              name="bathrooms"
              id="bathrooms"
              placeholder={t("bathrooms")}
              className={
                i18n.language === "en" ? style.secondSelect : style.secondSelectAr
              }
              ref={bathroomsRef}
            />
          </div>
          <div className={style.checkboxDiv}>
            <input
              id="bathroomShared"
              name="bathroomShared"
              type="checkbox"
              className={`col-1`}
              onClick={sharedClick}
            />
            <label htmlFor="bathroomShared" className={`col-11`}>
              {t("Bathroom Shared")}
            </label>
          </div>
          <div className={style.inputDiv}>
            <input
              name="price"
              type="text"
              id="price"
              placeholder={t("Price")}
              className={style.inputForm}
              ref={priceRef}
            />
          </div>
          <div className={style.inputDiv}>
            <input
              name="area"
              type="text"
              id="area"
              placeholder={t("Area square feet")}
              className={style.inputForm}
              ref={areaRef}
            />
          </div>
          <div className={style.inputDiv}>
            <input
              name="phone"
              type="text"
              id="phone"
              placeholder={t("Phone number")}
              className={style.inputForm}
              ref={phoneRef}
            />
          </div>
          <div className={style.inputDiv}>
            <input
              name="email"
              type="text"
              id="email"
              placeholder={t("Email Address")}
              className={style.inputForm}
              ref={emailRef}
            />
          </div>
          <div className={style.textAreaDiv}>
            <textarea
              id="description"
              name="description"
              ref={descriptionRef}
              placeholder={t("Description")}
              className={style.inputForm}
            />
          </div>
          <div className={style.checkboxDiv}>
            <input
              id="anonymous"
              name="anonymous"
              type="checkbox"
              className={`col-1`}
              onClick={anonymousClick}
            />
            <label htmlFor="anonymous" className={`col-11`}>
              {t("Anonymous post")}
            </label>
          </div>
          {/* "Your post submitted successfully and it's under review" */}
          {success &&
            <Alert
              type={typeAlert}
              message={messageAlert}
              show={show}
              setShow={setShow}
              time="4000"
              count={count}
              setCount={setCount}
            />}
        </form>
        <div className={i18n.language === "en" ? style.helpDiv : style.helpDivAr}>
          <h3 className={style.h3Help}>{t("Do You Need Any Help! Contact Us")}</h3>
          <Link to='/Contact'><button className={style.buttonHelp}>{t("Contact Us")}</button> </Link>
        </div>
      </div>
      <div className={style.formBtnContainer}>
    
        <ButtonSeven handlerClick={handleSubmit} buttonType="submit">
        {t("Submit")}

        </ButtonSeven>
      </div>
    </>
  );
}
export default ShowRentForm;
