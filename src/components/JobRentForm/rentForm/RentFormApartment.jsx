import React, { useState } from "react";
import style from "../../../assets/style/formStyle/rentForm.module.css";
import Alert from "../../customAlert/Alert";
import useAxios from "../../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import contactStyle from "../../../assets/style/contactUs.module.css";
import { Link, useNavigate } from "react-router-dom";
import HeroNav from "../../common/HeroNav";
import { LazyLoadImage } from "react-lazy-load-image-component";

function ShowRentForm({ baseUrl, rentPageData }) {
  console.log("baseUrl>>>RentForm",baseUrl)
  const navigate = useNavigate();

  const [t, i18n] = useTranslation();
  const [title, setTitle] = useState("");
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
  const [showTitleWarn, setShowTitleWarn] = useState(false);
  const [showPlaceWarn, setShowPlaceWarn] = useState(false);
  const [showTypeWarn, setShowTypeWarn] = useState(false);
  const [count, setCount] = useState();
  const [showImageWarn, setShowImageWarn] = useState(false);
  const [descriptionWarning, setDescriptionWarning] = useState(false);
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

  // const options = rentPageData?.cities?.map((item) => ({
  //   value: item?.city,
  //   label: item?.city,
  //   name: "place",
  // }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowTitleWarn(false);
    setShowPlaceWarn(false);
    setShowTypeWarn(false);
    setShowImageWarn(false);
    setDescriptionWarning(false);

    if (
      title === "" ||
      type === "" ||
      place === "" ||
      (phone === "" && email === "")
    ) {
      if (title === "") {
        setShowTitleWarn(true);
      }
      if (type === "") {
        setShowTypeWarn(true);
      }
      if (place === "") {
        setShowPlaceWarn(true);
      }
      if (description === "") {
        setDescriptionWarning(true);
      }

      if (phone === "" && email === "") {
        setWarning(true);
        setShow(true);
        setCount(4);
      }
    } else {
      try {
        fetch(`${baseUrl}/rents/create`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then(console.log(Res));
      } catch (error) {
        console.log(error);
      }
      setShow(true);
      setSuccess(true);
      setCount(4);
      setTimeout(() => {
        navigate("/my-housing");
      }, 3000);
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
  console.log("dataR>>", dataR)

  return (
    <>
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
              {showImageWarn && (
                <p className={contactStyle.contactValidation}>
                  {t("Image is required")}
                </p>
              )}
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
          {showTitleWarn && (
            <p className={contactStyle.contactValidation}>
              {t("Title is required")}
            </p>
          )}

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
            {showPlaceWarn && (
              <p className={contactStyle.contactValidation}>
                {t("City is required")}
              </p>
            )}
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
          {descriptionWarning && (
            <p className={contactStyle.contactValidation}>
              {t("Description is required")}
            </p>
          )}
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
          {success ? (
            <Alert
              type="success"
              message={t("Your post submitted successfully and it's under review")}
              show={show}
              setShow={setShow}
              time="4000"
              count={count}
              setCount={setCount}
            />
          ) : (
            <Alert
              type="warning"
              message={t("Please fill phone number or email address")}
              show={show}
              setShow={setShow}
              time="4000"
              count={count}
              setCount={setCount}
            />
          )}
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
