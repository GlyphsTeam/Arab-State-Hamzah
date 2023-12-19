import React, { useState } from "react";
import style from "../../../assets/style/formStyle/rentForm.module.css";
import Alert from "../../customAlert/Alert";
import useAxios from "../../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import { Link, useNavigate } from "react-router-dom";
import HeroNav from "../../common/HeroNav";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SpinnerStatic from '../../common/Spinner';

function ShowRentForm({ baseUrl }) {
  const navigate = useNavigate();
  const [t, i18n] = useTranslation();
  const [title, setTitle] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [isLoadingRent, setLoadingRent] = useState(false);

  const [typeAlert, setTypeAlert] = useState("");
  const [area, setArea] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [place, setPlace] = useState("");
  const [anonymous, setAnonymous] = useState("");
  const [images, setImages] = useState([]);
  const [is_bathroom_shared, set_is_bathroom_shared] = useState("");
  const [showImageInput, setShowImageInput] = useState(true);
  let url = "en/rents/create";
  const token = localStorage.getItem("arab_user_token");
  const [show, setShow] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Res, setRes] = useState([]);

  const [count, setCount] = useState();
  const formData = new FormData();
  title && formData.append("title", title);
  description && formData.append("description", description);
  gender && formData.append("gender", gender);
  email && formData.append("email", email);
  phone && formData.append("phone_number", phone);
  price && formData.append("price", price);
  bathrooms && formData.append("bathrooms", bathrooms);
  bedrooms && formData.append("bedrooms", bedrooms);
  type && formData.append("types", type);
  area && formData.append("area", area);
  place && formData.append("place", place);
  formData.append("looking", 1);
  anonymous && formData.append("anonymous", anonymous);
  is_bathroom_shared &&
    formData.append("is_bathroom_shared", is_bathroom_shared);

  images &&
    images.forEach((image) => {
      formData.append("images[]", image);
    });

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
      title === "" ||
      type === "" ||
      place === "" ||
      phone === "" ||
      description === "" ||
      images.length === 0 ||
      email === ""||
      gender===""||
      bathrooms===""||
      bedrooms===""||
      area===""
    ) {

      if (type === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("type is required")
      }

      if (description === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("description is required")
        setShow(true)
        setCount(4)

      }

      if (phone === "") {
        setWarning(true);
        setShow(true);
        setCount(4);
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("phone is required")
      }
      if (email === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("email is required")
      }
      if(area===""){
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("area is required")
      }
      if(price===""){
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("price is required")
      }
      if(bedrooms===""){
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("bedrooms is required")
      }
      if(bathrooms===""){
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("bathrooms is required")
      }
      if(gender===""){
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("gender is required")
      }
      if (place === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("place is required")
      }
      if (title === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Title is required")
      }
      if (images.length === 0) {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("images is required")
      }

    } else {
      try {
        setLoadingRent(true);
        fetch(`${baseUrl}/rents/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then(()=>{
          setLoadingRent(false);
          navigate("/my-housing")
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
      {isLoadingRent && <SpinnerStatic />}
      <HeroNav
        mainData={dataR?.slider}
        subData={dataR?.slider?.model}
      />

      <div className={style.titleDiv}>
        <h1>{t("Apartment For Rent")}</h1>
        <p>{t("How would you like to post a Rent")}</p>
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
                        // className={style.image}
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
              value={title}
              className={style.inputForm}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>


          <>
            <div className={`${style.inputDiv}`}>
              <select
                name="place"
                id="place"
                // value={place}
                onChange={(e) => setPlace(e.target.value)}
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
              // value={place}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">{t("Type")}</option>
              {dataR?.type?.map((item) => {
                return (
                  <option key={item.value} value={item?.value}>
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
              className={`${style.fieldWidth} ${style.fieldHeight}`}
              onChange={(e) => setGender(e.target.value)}
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
          {/* <div className={style.requiredClass}>
          <div className={` ${style.mainDiv} ${style.selectMarginBtm}`}>
            <div className={style.subDiv}>
              <select
                name="type"
                id="type"
                className={`${style.fieldWidth} ${style.fieldHeight}`}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">{t("Accommodation type")}</option>
                <option value="apartment">{t("Apartment")}</option>
                <option value="house">{t("House")}</option>
                <option value="room">{t("Room")}</option>
                <option value="townhouse_type">{t("Townhouse")}</option>
              </select>
            </div>
          </div>
          
        </div> */}

          {/* {showTypeWarn && (
          <p className={contactStyle.contactValidation}>
            {t("Accommodation is required")}
          </p>
        )} */}
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
              placeholder="bedrooms"
              className={`${style.fieldWidth} ${style.fieldHeight}`}
              onChange={(e) => setBedrooms(e.target.value)}
            ></input>
            <input
              name="bathrooms"
              id="bathrooms"
              placeholder="bathrooms"
              className={
                i18n.language === "en" ? style.secondSelect : style.secondSelectAr
              }
              onChange={(e) => setBathrooms(e.target.value)}
            ></input>
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
              value={price}
              className={style.inputForm}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={style.inputDiv}>
            <input
              name="area"
              type="text"
              id="area"
              placeholder={t("Area square feet")}
              value={area}
              className={style.inputForm}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className={style.inputDiv}>
            <input
              name="phone"
              type="text"
              id="phone"
              placeholder={t("Phone number")}
              value={phone}
              className={style.inputForm}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className={style.inputDiv}>
            <input
              name="email"
              type="text"
              id="email"
              placeholder={t("Email Address")}
              value={email}
              className={style.inputForm}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={style.textAreaDiv}>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
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
        <button type="submit" className={style.formBtn} onClick={handleSubmit}>
          {t("submit")}
        </button>
      </div>
    </>
  );
}
export default ShowRentForm;
