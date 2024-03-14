import React, { useState, useRef, useEffect } from "react";
import style from "../../assets/style/postProduct/postProduct.module.css";
import Alert from "../common/alert/Alert";
import jobStyle from "../../assets/style/postProduct/postProduct.module.css";
import useAxios from "../../hooks/useAxiosGet";
import Dropzone from "react-dropzone";
import productStyle from "../../assets/style/postProduct/rightPost.module.css";
import { useTranslation } from "react-i18next";
import MarketPlacePostOption from "./MarketPlacePostOption";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import SpinnerStatic from '../common/Spinner';
import { useNavigate } from "react-router-dom";
import LoadingSpiner from "../Button/LoadingSpiner";
import InputSelect from "../UI/InputSelect";
import InputSelectValue from "../UI/InputSelectValue";
import ButtonSeven from "../Button/ButtonSeven";
import axios from 'axios';
import { IoClose } from "react-icons/io5";

function MarketPlacePostSection() {
  const [t, i18n] = useTranslation();
  const navigation = useNavigate();
  const [isLoadingMarket, setLoadingMarket] = useState(false);
  const [LoadingSub, setLoadingSub] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingModale, setLoadingModale] = useState(false);
  const [showSubCat, setShowSub] = useState(false);
  const [inputFields, setInputFields] = useState([{ id: 0, point: '' }]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [modaleOptions, setModaleOptions] = useState([]);

  const token = localStorage.getItem('arab_user_token');
  let baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${process.env.REACT_APP_City_ID}`;

  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const condationRef = useRef(null);
  const placeRef = useRef(null);
  const emailRef = useRef(null);
  const descriptionRef = useRef(null);
  const phone_numberRef = useRef(null);
  const portfolioRef = useRef(null);


  const [marketFormData, setMarketFormData] = useState({
    main_category: "",
    sub_category: "",
    year: "",
    color: "false",
    anonymous: "",
    category: "",
    looking: "",
    images: [],
  });

  const [send, setSend] = useState(false);

  const [count, setCount] = useState(4);
  const [showAlert, setShowAlert] = useState(false);

  const [showTitleWarn, setShowTitleWarn] = useState(false);
  const [showLocationWarn, setShowLocationWarn] = useState(false);
  const [showPriceWarn, setShowPriceWarn] = useState(false);
  const [showYearWarn, setYearWarn] = useState(false);
  const [showColorWarn, setColorWarn] = useState(false);
  const [showConditionWarn, setCondwationWarn] = useState(false);
  const [showPlaceWarn, setPlaceWarn] = useState(false);
  const [showEmailWarn, setEmailWarn] = useState(false);
  const [showTypeWarn, setShowTypeWarn] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [requireWarn, setRequireWarn] = useState(false);
  const [showEmailRegexWarn, setShowEmailRegexWarn] = useState(false);
  const [showImageWarn, setShowImageWarn] = useState(false);
  const [showCategoryWarn, setShowCategoryWarn] = useState(false);
  const [showSubCategoryWarn, setShowSubCategoryWarn] = useState(false);
  const [showMainCategoryWarn, setShowMainCategoryWarn] = useState(false);
  const [showLooking, setShowLooking] = useState(false);

  const [selectedMainCategoryID, setSelectedMainCategoryID] = useState("");
  const [selectedSubCategoryID, setSelectedSubCategoryID] = useState("");
  const [lookingState, setLooking] = useState(0);
  const [descriptionWarning, setDescriptionWarning] = useState(false);


  let colorUrl = `color`;
  let yearUrl = `year`;
  let cityUrl = `cities`;
  const [Data] = useAxios(colorUrl, "false");
  const [colorData] = useAxios(yearUrl, "false");
  const [cityData] = useAxios(cityUrl, "false");
  const [categoryData] = useAxios(`main-market/categories`, "false");


  useEffect(() => {
    const getSubCategory = async () => {
      let url = `category-market?main_id=${selectedMainCategoryID}`;
      setLoadingCategory(true)
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        setSubCategoryOptions(res.data.data);
        setLoadingCategory(false)
      }).catch((err) => console.log(err))

    }
    getSubCategory();
  }, [selectedMainCategoryID]);


  useEffect(() => {
    const getDataModale = async () => {
      let url = `product-model?sub_id=${selectedSubCategoryID}`;

      setLoadingModale(true)
      await axios.get(`${baseURL}/${url}`, {
        headers: { "Authorization": `Bearer ${token}` }
      }).then((res) => {
        setModaleOptions(res.data.data);
        if (res.data?.data?.length === 0) {
          setShowSub(false);
          setMarketFormData({
            ...marketFormData,
            sub_category:""
          });
        }
        else{
          setShowSub(true);
        }
        setLoadingModale(false);
      }).catch((err) => console.log(err))
    }

    getDataModale();
  }, [selectedSubCategoryID]);

  const color = Data?.data;
  const city = cityData?.data;
  const year = colorData?.data;
  const category = categoryData?.data?.main;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMarketFormData({ ...marketFormData, [name]: value });
  };

  const handleSubmit = async () => {
    setShowTitleWarn(false);
    setShowEmailRegexWarn(false);
    setRequireWarn(false);
    setShowLocationWarn(false);
    setShowTypeWarn(false);
    setShowCategoryWarn(false);
    setShowSubCategoryWarn(false);
    setShowMainCategoryWarn(false);
    setShowLooking(false);
    setDescriptionWarning(false);

    if (
      titleRef.current?.value === "" ||
      placeRef.current?.value === "" ||
      marketFormData.type === "" ||
      (phone_numberRef.current?.value === "" && emailRef.current?.value === "") ||
      marketFormData.images.length === 0
    ) {
      if (titleRef.current?.value === "") {
        setShowTitleWarn(true);
      }
      if (marketFormData.category === "") {
        setShowCategoryWarn(true);
      }
      if (marketFormData.sub_category === "") {
        setShowSubCategoryWarn(true);
      }
      if (marketFormData.main_category === "") {
        setShowMainCategoryWarn(true);
      }
      if (lookingState === 0) {
        setShowLooking(true);
      }

      if (marketFormData.images.length === 0) {
        setShowImageWarn(true);
      }
      if (regex.test(emailRef.current?.value)) {
        setShowEmailRegexWarn(true);
      }
      if (phone_numberRef.current?.value === "" && emailRef.current?.value === "") {
        setRequireWarn(true);
      }
      if (descriptionRef.current?.value === "") {
        setDescriptionWarning(true);
      }
      if (priceRef.current?.value === "") {
        setShowPriceWarn(true);
      }
      if (marketFormData.year === "") {
        setYearWarn(true);
      }
      if (marketFormData.color === "") {
        setColorWarn(true);
      }
      if (condationRef.current?.value === "") {
        setCondwationWarn(true);
      }
      if (placeRef.current?.value === "") {
        setPlaceWarn(true);
      }
      if (emailRef.current?.value === "") {
        setEmailWarn(true);
      }

    } else {
      const token = localStorage.getItem("arab_user_token");
      let baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${process.env.REACT_APP_City_ID}/market/create`;
      setLoadingMarket(true);
      try {
        let formData = new FormData();
        formData.append("title", titleRef.current?.value);
        formData.append("description", descriptionRef.current?.value?.replace(/\n/g, "<br>"));

        formData.append("email", emailRef.current?.value);
        formData.append("phone_number", phone_numberRef.current?.value);
        formData.append("price", priceRef.current?.value);
        formData.append("year", marketFormData.year)
        formData.append("profile_url", portfolioRef.current?.value);

        formData.append("condition", condationRef.current?.value);
        marketFormData.category &&
          formData.append("sub_id", marketFormData?.category);
        marketFormData.color && formData.append("color", marketFormData?.color);
        marketFormData.sub_category &&
          formData.append("model_id", marketFormData?.sub_category);
        marketFormData.main_category &&
          formData.append("main_id", marketFormData?.main_category);
       formData.append("place", placeRef.current?.value);
        lookingState && formData.append("looking", lookingState);

        marketFormData.anonymous &&
          formData.append("anonymous", marketFormData?.anonymous);

        marketFormData.images &&
          marketFormData?.images?.forEach((image) => {
            formData.append("images[]", image);
          });
        inputFields &&
          inputFields?.forEach((field) => {
            formData.append("details[]", field.point);
          });

        await fetch(`${baseURL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then((result) => {
          titleRef.current = null;
          descriptionRef.current = null;
          emailRef.current = null;
          phone_numberRef.current = null;
          priceRef.current = null;
          condationRef.current = null;
          placeRef.current = null;
          portfolioRef.current=null;
          setSend(true);
          setTimeout(() => {
            setCount(4);
            setShowAlert(true);
            setTypeAlert("success")
            setMessageAlert("Your Post Has been Published successfully")
            setMarketFormData({
              main_category: "",
              sub_category: "",
              year: "",
              color: "false",
              anonymous: "",
              images: []
            });
            setSend(false);
            setLoadingMarket(false);
            navigation('/my-product')
          }, 100);
        })
      } catch (error) {
        setLoadingMarket(false);
        setShowAlert(true);
        setMessageAlert("There is a problem with the server; please try again later.")
        setTypeAlert("warning");
        console.log("errorBusiness>>", error);
      }
    }
  };

  const handleCategoryChange = (e) => {
    const selectedMainCategory = e.target.value;
    setSelectedMainCategoryID(selectedMainCategory);
    setMarketFormData({
      ...marketFormData,
      main_category: selectedMainCategory,
    });

    // Update the sub-category selection based on the selected main category
    const selectedSubCategory = setSelectedSubCategoryID(selectedMainCategory);
    setSelectedSubCategoryID(selectedSubCategory);

    handleChange(e);
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategoryID(e.target.value);
    setMarketFormData({ ...marketFormData, category: e.target.value });
    handleChange(e);
  };

  const handleImageDrop = async (acceptedFiles) => {
    if (marketFormData.images?.length + acceptedFiles?.length > 9) {
      setMessageAlert("You can upload just 9 images");
      setShowAlert(true);
      setTypeAlert("warning")
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    else {
      setLoadingSub(true)
      const editedImages = [];

      for (const file of acceptedFiles) {
        const editedImage = await convertToWebP(file);
        editedImages.push(editedImage);
      }

      setMarketFormData({
        ...marketFormData,
        images: [...marketFormData?.images, ...editedImages],
      });
      setLoadingSub(false)
    }
  };

  const convertToWebP = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert the image to WebP
          canvas.toBlob(
            (blob) => {
              const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
                type: 'image/webp',
                lastModified: Date.now(),
              });

              resolve(webpFile);
            },
            'image/webp',
            0.8 // Quality parameter (adjust as needed)
          );
        };
      };

      reader.readAsDataURL(file);
    });
  };


  const handleRemoveImage = (index) => {
    const updatedImages = [...marketFormData.images];
    updatedImages.splice(index, 1);
    setMarketFormData({
      ...marketFormData,
      images: updatedImages,
    });
  };

  return (
    <div className={`${style.registerFormDiv}`}>
      {isLoadingMarket && <SpinnerStatic text={true} textForm={i18n.language === "en" ? "Please do not close the page. Market form submission may take a few minutes. Thank you for your patience!" : "فضلك لا تغلق الصفحة. قد يستغرق إرسال المعلومات بضع دقائق. شكرا لك على انتظارك"} />}
      <form>
        {LoadingSub && <LoadingSpiner />}

        <div className={`w-100 ${productStyle.uploadImageDiv}`}>
          <Dropzone onDrop={handleImageDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={productStyle.postHousingUploadImage}>
                  <LazyLoadImage src={require("../../assets/Images/uploadImage.png")} alt="uuploadIage" />
                  <p>{t("Upload Your Images")}</p>
                </div>
              </div>
            )}
          </Dropzone>
          <div className={productStyle.imageContainerDiv}>
            {marketFormData?.images?.map((image, index) => (
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
                  <IoClose/>
                </button>
              </div>
            ))}
          </div>
        </div>
        {showImageWarn && (
          <p className={jobStyle.required}>{t("images are required")}</p>
        )}
        <InputSelect
          name="main_category"
          inputValue={marketFormData.main_category}
          handlerChange={handleCategoryChange}
          optionsValue={category}
          classNameInput={'w-100'}
          selectName={t("main_category")}
        />
        {showMainCategoryWarn && (
          <p className={jobStyle.required}>{t("main category is required")}</p>
        )}

        {marketFormData.main_category && (
          <InputSelect
            name="category"
            inputValue={marketFormData.category}
            handlerChange={handleSubCategoryChange}
            optionsValue={subCategoryOptions}
            classNameInput={'w-100'}
            selectName={t("category")}

          />
        )}
        {marketFormData.main_category && showCategoryWarn && (
          <p className={jobStyle.required}>{t("sub category is required")}</p>
        )}
        {loadingCategory && <LoadingSpiner />}

        {marketFormData?.category && marketFormData?.main_category && (
          showSubCat?<InputSelect
            name="sub_category"
            inputValue={marketFormData.sub_category}
            handlerChange={handleChange}
            optionsValue={modaleOptions}
            classNameInput={'w-100'}
            selectName={t("sub_category")}
          />:""
        )}
        {marketFormData.category &&
          marketFormData.main_category &&
          showSubCategoryWarn && (
            <p className={jobStyle.required}> {t("Type is required")}</p>
          )}
        {loadingModale && <LoadingSpiner />}

        <input
          className={`w-100`}
          name="title"
          type="text"
          placeholder={t("Title")}
          ref={titleRef}
        />
        {showTitleWarn && (
          <p className={jobStyle.required}>{t("Title is required")}</p>
        )}
        <input
          className={`w-100`}
          name="price"
          type="text"
          placeholder={t("Price")}
          ref={priceRef}
        />
        {showPriceWarn && (
          <p className={jobStyle.required}>Price is required</p>
        )}
        <InputSelectValue
          name="year"
          inputValue={marketFormData.year}
          handlerChange={handleChange}
          optionsValue={year}
          classNameInput={'w-100'}
          selectName={t("year")}
        />
        {showYearWarn && (
          <p className={jobStyle.required}>Year is required</p>
        )}

        {/* <InputSelect
          name="color"
          inputValue={marketFormData.color}
          handlerChange={handleChange}
          optionsValue={color}
          classNameInput={'w-100'}
          selectName="Color"

        /> */}
        <select
          name="color"
          required
          id="color"
          value={marketFormData.color}
          onChange={handleChange}
          className={'w-100'}
        >
          <option>{t("Color")}</option>
          {color?.length !== 0 && color?.map((item) => {
            return (
              <option key={item?.id} value={item?.id}>
                {i18n.language === "en" ? item?.name_en : item?.name_ar}
              </option>
            )
          })}

        </select>
        {showColorWarn && (
          <p className={jobStyle.required}>Color is required</p>
        )}
        {showLocationWarn && (
          <p className={jobStyle.required}>Location is required</p>
        )}

        <select
          id="condition"
          name="condition"
          ref={condationRef}
          className={`w-100 ${jobStyle.dropDownMain}`}
        >
          <option value="">{t("Condition")}</option>
          <option value="new">{t("New")}</option>
          <option value="used">{t("Used")}</option>
        </select>
        {showConditionWarn && (
          <p className={jobStyle.required}>Condition is required</p>
        )}
        {/* <div className={`d-flex w-100`}> */}
        {city && (
          <select
            name="place"
            id="place"
            ref={placeRef}
            className={`w-100 ${jobStyle.dropDownMain}`}
          >
            <option value="">{t("Place")}</option>
            {city?.map((item) => {
              return (
                <option key={item?.city} value={item?.city}>
                  {item?.city}
                </option>
              );
            })}
          </select>
        )}
        {showPlaceWarn && (
          <p className={jobStyle.required}>Place is required</p>
        )}
        <input
          type="email"
          id="email"
          name="email"
          ref={emailRef}
          placeholder={t("Email")}
          className={`w-100`}
        />
        {showEmailWarn && (
          <p className={jobStyle.required}>Email is required</p>
        )}
         <input
          type="text"
          id="portfolio"
          name="portfolio"
          ref={portfolioRef}
          placeholder={t("Portfolio Url")}
          className={i18n.language === "en" ? style.phoneNumberclasEn : style.phoneNumberclasAr}
        />
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          ref={phone_numberRef}
          placeholder={t("Phone number")}
          className={i18n.language === "en" ? style.phoneNumberclasEn : style.phoneNumberclasAr}
        />
        {requireWarn && (
          <p className={jobStyle.required}>
            {t("Please fill phone number or email address")}
          </p>
        )}

        <MarketPlacePostOption
          handleChange={handleChange}
          value={marketFormData.points}
          marketFormData={marketFormData}
          setMarketFormData={marketFormData}
          inputFields={inputFields}
          setInputFields={setInputFields}
        />

        <textarea
          className={jobStyle.textArea}
          placeholder={t("Description")}
          name="description"
          ref={descriptionRef}
        ></textarea>
        {descriptionWarning && (
          <p className={jobStyle.required}>{t("Description is required")}</p>
        )}
      </form>
      <div className={`d-flex justify-content-end align-items-center ${style.buttonTwoP}`}>

        <ButtonSeven handlerClick={handleSubmit} buttonType="submit">
          {t("Create")}
        </ButtonSeven>

      </div>
      {showAlert && (
        <Alert
          type={typeAlert}
          message={messageAlert}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          count={count}
          setCount={setCount}
        />
      )}
    </div>
  );
}

export default MarketPlacePostSection;
