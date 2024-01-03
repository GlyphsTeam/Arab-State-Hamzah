import React, { useState } from "react";
import style from "../../../assets/style/formStyle/rentForm.module.css";
import Alert from "../../customAlert/Alert";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import contactStyle from "../../../assets/style/contactUs.module.css";
import { useNavigate, Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SpinnerStatic from '../../common/Spinner';

function ForRentForm({ baseUrl, rentPageData }) {
  const navigate = useNavigate();
  const [messageAlert, setMessageAlert] = useState("");
  const [isLoadingRent, setLoadingRent] = useState(false);

  const [typeAlert, setTypeAlert] = useState("");

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
  formData.append("looking", 0);
  anonymous && formData.append("anonymous", anonymous);
  is_bathroom_shared &&
    formData.append("is_bathroom_shared", is_bathroom_shared);

  images && images.forEach((image) => {
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
      gender === "" ||
      email === "" ||
      bathrooms === "" ||
      bedrooms === "" ||
      area === ""
    ) {

      if (type === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Type is required")
      }

      if (description === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setShow(true)
        setCount(4)
        setMessageAlert("Description is required")
      }

      if (phone === "") {
        setWarning(true);
        setShow(true);
        setCount(4);
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Phone is required")
      }
      if (email === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Email is required")
      }
      if (area === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Area is required")
      }
      if (price === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Price is required")
      }
      if (bedrooms === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Bedrooms is required")
      }
      if (bathrooms === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Bathrooms is required")
      }
      if (gender === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Gender is required")
      }
      if (place === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Location is required")
      }
      if (title === "") {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Title is required")
      }
      if (images.length === 0) {
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("Image is required")
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
        }).then(() => {
          setLoadingRent(false);
          navigate("/my-housing")

        });
      } catch (error) {
        console.log(error);
        setLoadingRent(false);
        setSuccess(true);
        setTypeAlert("warning")
        setMessageAlert("There is a problem with the server; please try again later.")
      }
      setShow(true);
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

  return (
    <>
      {isLoadingRent && <SpinnerStatic text={true} textForm="Please do not close the page. Rent form submission may take a few minutes. Thank you for your patience!" />}
      <div className={style.titleDiv}>
        <h1>{t("Looking For Rent")}</h1>
        <p>{t("How would you like to post a Rent")}</p>
      </div>
      <h2 className={style.jobFormTitle}>{t("Looking For Rent")} </h2>
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
                          alt="UpldadImage"
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


          <>
            <div className={`${style.inputDiv}`}>
              <select
                name="place"
                id="place"
                // value={place}
                onChange={(e) => setPlace(e.target.value)}
              >
                <option value="">{t("Location")}</option>
                {rentPageData?.cities?.map((item) => {
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
              {rentPageData?.type?.map((item) => {
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
              {rentPageData?.gender?.map((item, index) => {
                return <option key={index} value={item?.value}>{item?.name}</option>;
              })}
            </select>
          </div>
          <p className={contactStyle.contactValidation}>
            {t("Please indicate the gender of the occupants: Male, Female, or Any (open to both or a Family)")}.
          </p>


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
              placeholder={t("bedrooms")}

              className={`${style.fieldWidth} ${style.fieldHeight}`}
              onChange={(e) => setBedrooms(e.target.value)}
            >
            </input>
            <input
              name="bathrooms"
              id="bathrooms"
              placeholder={t("bathrooms")}
              className={
                i18n.language === "en" ? style.secondSelect : style.secondSelectAr
              }
              onChange={(e) => setBathrooms(e.target.value)}
            >

            </input>
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
          <Link to='/Contact'><button className={style.buttonHelp}>{t("Contact Us")}</button></Link>
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
export default ForRentForm;
