import React, { useState } from "react";
import style from "../../assets/style/postJob_rent.module.css";
import Alert from "../customAlert/Alert";
import useAxios from "../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import { LazyLoadImage } from 'react-lazy-load-image-component'

import contactStyle from "../../assets/style/contactUs.module.css";
function ShowRentForm({ setRentOpen, baseURL }) {
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
  const [rentType, setRentType] = useState(0);
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
  phone && formData.append("phone", phone);
  price && formData.append("price", price);
  bathrooms && formData.append("bathrooms", bathrooms);
  bedrooms && formData.append("bedrooms", bedrooms);
  type && formData.append("type", type);
  area && formData.append("area", area);
  place && formData.append("place", place);
  rentType && formData.append("looking", rentType);
  anonymous && formData.append("anonymous", anonymous);
  is_bathroom_shared &&
    formData.append("is_bathroom_shared", is_bathroom_shared);

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
        fetch(`${baseURL}/rents/create`, {
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
        handleOpenRentModal();
      }, 4000);
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
  const handleOpenRentModal = () => {
    document.body.style.overflow = "auto";
    setRentOpen(false);
  };
  const cityUrl = `cities`;
  const [Data] = useAxios(cityUrl);
  const city = Data?.data;
  return (
    <div className={style.formDiv}>
      <div className={style.btnCloseDiv}>
        <button className={style.closeBtnForm} onClick={handleOpenRentModal}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className={style.form}>
        {showImageInput && (
          <>
            <div className={style.requiredClass}>
              <div>
                <Dropzone onDrop={handleImageDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className={style.imageParagraph}>
                        <i className="fas fa-upload"></i>
                        {t("click to select images")}{" "}
                      </p>
                    </div>
                  )}
                </Dropzone>
                <div className={style.imageContainerDiv}>
                  {images.map((image, index) => (
                    <div key={image.name} className={style.imageContainer}>
                      <LazyLoadImage
                        src={URL.createObjectURL(image)}
                        className={style.image}
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
              <span className="req">*</span>
            </div>
            {showImageWarn && (
              <p className={contactStyle.contactValidation}>
                {t("Image is required")}
              </p>
            )}
          </>
        )}

        <div className={style.requiredClass}>
          <input
            name="title"
            type="text"
            id="title"
            placeholder={t("Title")}
            value={title}
            className={style.inputForm}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span className="req">*</span>
        </div>
        {showTitleWarn && (
          <p className={contactStyle.contactValidation}>
            {t("Title is required")}
          </p>
        )}

        <div className={`${style.typeField} ${style.requiredClass}`}>
          <div>
            <input
              type="radio"
              id="rent"
              name="accomodation-rent"
              checked={showImageInput}
              onChange={() => (setRentType(0), setShowImageInput(true))}
            />
            <label className="px-2" htmlFor="rent">
              {t("Accommodation for rent")}
            </label>
          </div>
        </div>
        <div className={`${style.typeField} ${style.requiredClass}`}>
          <div>
            <input
              type="radio"
              id="lookingFor"
              name="accomodation-rent"
              onChange={() => (
                setRentType(1), setShowImageInput(false), setImages([])
              )}
            />
            <label className="px-2" htmlFor="lookingFor">
              {t("Looking for accommodation")}
            </label>
          </div>
        </div>

        {city && (
          <>
            <div className={`${style.typeField} ${style.requiredClass}`}>
              <select
                name="place"
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              >
                <option value="">{t("City")}</option>
                {city.map((item) => {
                  return (
                    <option key={item.city} value={item.city}>
                      {item.city}
                    </option>
                  );
                })}
              </select>
              <span className="req">*</span>
            </div>
            {showPlaceWarn && (
              <p className={contactStyle.contactValidation}>
                {t("City is required")}
              </p>
            )}
          </>
        )}
        <div className={` ${style.mainDiv} ${style.selectMarginBtm} `}>
          <div className={style.subDiv}>
            <select
              name="gender"
              id="gender"
              className={`${style.fieldWidth} ${style.fieldHeight}`}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="choose one">{t("Gender")}</option>
              <option value="male">{t("Male")}</option>
              <option value="female">{t("Female")}</option>
              <option value="any">{t("Any")}</option>
            </select>
          </div>
        </div>
        <div className={style.requiredClass}>
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
          <span className="req">*</span>
        </div>

        {showTypeWarn && (
          <p className={contactStyle.contactValidation}>
            {t("Accommodation is required")}
          </p>
        )}
        <div className={` ${style.mainDiv} ${style.selectMarginBtm}`}>
          <div className={style.subDiv}>
            <select
              name="bedrooms"
              id="bedrooms"
              className={`${style.fieldWidth} ${style.fieldHeight}`}
              onChange={(e) => setBedrooms(e.target.value)}
            >
              <option value="">{t("Bedroom")}</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className={style.subDiv}>
            <select
              name="bathrooms"
              id="bathrooms"
              className={`${style.fieldWidth} ${style.fieldHeight}`}
              onChange={(e) => setBathrooms(e.target.value)}
            >
              <option value="">{t("Bathroom")}</option>
              <option value="0.5">0.5</option>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
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
        <div className={style.requiredClass}>
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
        <div className={style.requiredClass}>
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
        <div className={style.requiredClass}>
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
        <div className={style.requiredClass}>
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
        <div className={style.requiredClass}>
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
        <div className={style.formBtnContainer}>
          <button
            type="submit"
            className={style.formBtn}
            onClick={handleSubmit}
          >
            {t("Add")}
          </button>
        </div>
        {success ? (
          <Alert
            type="success"
            message={t("Your post published successfully")}
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
    </div>
  );
}
export default ShowRentForm;
