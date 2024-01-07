import React, { useState } from "react";
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
import ButtonTwo from "../Button/ButtonTwo";
import LoadingSpiner from "../Button/LoadingSpiner";
import InputSelect from "../UI/InputSelect";
function MarketPlacePostSection() {
  const [t, i18n] = useTranslation();
  const navigation = useNavigate();
  const [isLoadingMarket, setLoadingMarket] = useState(false);
  const [LoadingSub, setLoadingSub] = useState(false);
 console.log("MarketPlacePostProduct>>>>", i18n.language==="en")
  const [marketFormData, setMarketFormData] = useState({
    title: "",
    price: "",
    email: "",
    phone_number: "",
    main_category: "",
    sub_category: "",
    year: "",
    color: "false",
    condition: "",
    anonymous: "",
    description: "",
    place: "",
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

  let formData = new FormData();
  marketFormData.title && formData.append("title", marketFormData?.title);

  marketFormData.description &&
    formData.append("description", marketFormData?.description.replace(/\n/g, "<br>"));

  marketFormData.email && formData.append("email", marketFormData?.email);
  marketFormData.phone_number &&
    formData.append("phone_number", marketFormData?.phone_number);
  marketFormData.price && formData.append("price", marketFormData?.price);
  marketFormData.condition &&
    formData.append("condition", marketFormData?.condition);


  marketFormData.category &&
    formData.append("sub_id", marketFormData?.category);
  marketFormData.color && formData.append("color", marketFormData?.color);
  marketFormData.sub_category &&
    formData.append("model_id", marketFormData?.sub_category);
  marketFormData.main_category &&
    formData.append("main_id", marketFormData?.main_category);
  marketFormData.place && formData.append("place", marketFormData?.place);
  lookingState && formData.append("looking", lookingState);

  marketFormData.anonymous &&
    formData.append("anonymous", marketFormData?.anonymous);

  marketFormData.images &&
    marketFormData?.images?.forEach((image) => {
      formData.append("images[]", image);
    });

  marketFormData.points &&
    marketFormData?.points?.forEach((point) => {
      formData.append("points[]", point);
    });

  let colorUrl = `color`;
  let yearUrl = `year`;
  let cityUrl = `cities`;
  const [Data] = useAxios(colorUrl, "false");
  const [colorData] = useAxios(yearUrl, "false");
  const [cityData] = useAxios(cityUrl, "false");
  const [categoryData] = useAxios(`main-market/categories`, "false");
  const [subCategoryData] = useAxios(
    `category-market?main_id=${selectedMainCategoryID}`, "false"
  );
  const [modelData] = useAxios(
    `product-model?sub_id=${selectedSubCategoryID}`, "false"

  );
  const color = Data?.data;
  const city = cityData?.data;
  const year = colorData?.data;
  const category = categoryData?.data?.main;
  const subCategory = subCategoryData?.data;
  const model = modelData?.data;

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
      marketFormData.title === "" ||
      marketFormData.place === "" ||
      marketFormData.type === "" ||
      (marketFormData.phone === "" && marketFormData.email === "") ||
      marketFormData.images.length === 0
    ) {
      if (marketFormData.title === "") {
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
      if (regex.test(marketFormData.email)) {
        setShowEmailRegexWarn(true);
      }
      if (marketFormData.phone_number === "" && marketFormData.email === "") {
        setRequireWarn(true);
      }
      if (marketFormData.description === "") {
        setDescriptionWarning(true);
      }
      if (marketFormData.price === "") {
        setShowPriceWarn(true);
      }
      if (marketFormData.year === "") {
        setYearWarn(true);
      }
      if (marketFormData.color === "") {
        setColorWarn(true);
      }
      if (marketFormData.condition === "") {
        setCondwationWarn(true);
      }
      if (marketFormData.place === "") {
        setPlaceWarn(true);
      }
      if (marketFormData.email === "") {
        setEmailWarn(true);
      }

    } else {
      const token = localStorage.getItem("arab_user_token");
      let baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${process.env.REACT_APP_City_ID}/market/create`;
      setLoadingMarket(true);
      try {
        await fetch(`${baseURL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          method: "POST",
          body: formData,
        }).then((result) => {
          console.log("result>>>", result)
          setSend(true);
          setTimeout(() => {
            setCount(4);
            setShowAlert(true);
            setTypeAlert("success")
            setMessageAlert("Your Post Has been Published successfully")
            setMarketFormData({
              title: "",
              price: "",
              email: "",
              phone_number: "",
              main_category: "",
              sub_category: "",
              year: "",
              color: "false",
              condition: "",
              anonymous: "",
              description: "",
              place: "",
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
                  <i className="fas fa-times"></i>
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
          selectName="main_category"
        />
        {showMainCategoryWarn && (
          <p className={jobStyle.required}>{t("main category is required")}</p>
        )}

        {marketFormData.main_category && (
          <InputSelect
            name="category"
            inputValue={marketFormData.category}
            handlerChange={handleSubCategoryChange}
            optionsValue={subCategory}
            classNameInput={'w-100'}
            selectName="category"

          />
        )}
        {marketFormData.main_category && showCategoryWarn && (
          <p className={jobStyle.required}>{t("sub category is required")}</p>
        )}

        {marketFormData?.category && marketFormData?.main_category && (
          <InputSelect
            name="sub_category"
            inputValue={marketFormData.sub_category}
            handlerChange={handleChange}
            optionsValue={model}
            classNameInput={'w-100'}
            selectName="sub_category"
          />
        )}
        {marketFormData.category &&
          marketFormData.main_category &&
          showSubCategoryWarn && (
            <p className={jobStyle.required}> {t("Type is required")}</p>
          )}

        <input
          className={`w-100`}
          name="title"
          type="text"
          placeholder={t("Title")}
          value={marketFormData.title}
          onChange={handleChange}
        />
        {showTitleWarn && (
          <p className={jobStyle.required}>{t("Title is required")}</p>
        )}
        <input
          className={`w-100`}
          name="price"
          type="text"
          placeholder={t("Price")}
          value={marketFormData.price}
          onChange={handleChange}
        />
        {showPriceWarn && (
          <p className={jobStyle.required}>Price is required</p>
        )}
        <InputSelect
          name="year"
          inputValue={marketFormData.year}
          handlerChange={handleChange}
          optionsValue={year}
          classNameInput={'w-100'}
          selectName="year"
        />
        {showYearWarn && (
          <p className={jobStyle.required}>Year is required</p>
        )}
        <InputSelect
          name="color"
          inputValue={marketFormData.color}
          handlerChange={handleChange}
          optionsValue={color}
          classNameInput={'w-100'}
          selectName="Color"

        />
        {showColorWarn && (
          <p className={jobStyle.required}>Color is required</p>
        )}
        {showLocationWarn && (
          <p className={jobStyle.required}>Location is required</p>
        )}

        <select
          id="condition"
          name="condition"
          value={marketFormData.condition}
          onChange={handleChange}
          className={`w-100 ${jobStyle.dropDownMain}`}
        >
          <option value="">{t("Condition")}</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
        {showConditionWarn && (
          <p className={jobStyle.required}>Condition is required</p>
        )}
        {/* <div className={`d-flex w-100`}> */}
        {city && (
          <select
            name="place"
            id="place"
            value={marketFormData.place}
            onChange={handleChange}
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
          onChange={handleChange}
          value={marketFormData.email}
          placeholder={t("Email")}
          className={`w-100`}
        />
        {showEmailWarn && (
          <p className={jobStyle.required}>Email is required</p>
        )}
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          onChange={handleChange}
          value={marketFormData.phone_number}
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
        />

        <textarea
          className={jobStyle.textArea}
          placeholder={t("Description")}
          name="description"
          onChange={handleChange}
          value={marketFormData.description}
        ></textarea>
        {descriptionWarning && (
          <p className={jobStyle.required}>{t("Description is required")}</p>
        )}
      </form>
      <div className={`d-flex justify-content-end align-items-center ${style.buttonTwoP}`}>

        <ButtonTwo handlerClick={handleSubmit} buttonType="submit">
          {t("Create")}
        </ButtonTwo>

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
