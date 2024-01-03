import React, { useEffect, useState, useRef, useCallback } from "react";
import style from "../../assets/style/formStyle/addbuinsesFrom.module.css";
import useAxios from "../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AlertBussiness from "../common/alert/Alert";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Helmet } from 'react-helmet'
import SpinnerStatic from '../common/Spinner';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import LoadingSpiner from "../Button/LoadingSpiner";
import InputSelect from "../UI/InputSelect";
import BusinessTime from "./BusinessTime";
import ImageSelector from "../UI/ImageSelector";
import ButtonTwo from "../Button/ButtonTwo";
function ForRentForm() {

    const [t, i18n] = useTranslation();
    const navigation = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const titleBussines = "Business Form"
    const companyName = useRef(null);
    const street = useRef(null);
    const postalCode = useRef(null);
    const phone = useRef(null);
    const websiteUrl = useRef(null);
    const emailForm = useRef(null);
    const businessDes = useRef(null);
    const faceBook = useRef(null);
    const pinterestLine = useRef(null);
    const instagramRef = useRef(null);
    const twitterRef = useRef(null);
    const youtubeRef = useRef(null);
    const tikTokRef = useRef(null);
    const [businessType, setBusinessType] = useState("2");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [inputFields, setInputFields] = useState([{ id: 0, text: '' }]);
    const [nextId, setNextId] = useState(1);
    const [messageAlert, setMessageAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [images, setImages] = useState([]);
    const [images2, setImages2] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImage2, setUploadedImage2] = useState(null);
    const [cities, setCitys] = useState([]);
    const [subCategorys, setSubCategorys] = useState([]);
    const [isLoadingBusines, setLoadingBussines] = useState(false);
    const [branchIds, setBranchIds] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [LoadingSub, setLoadingSub] = useState(false);
    const [hiddenBussines, setHiddenBussines] = useState(false)
    const [work_times, setwork_times] = useState([{
        day_type: "Mon",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Monday"
    },
    {
        day_type: "Tue",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Tuseday"
    },
    {
        day_type: "Wed",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Wednesday"
    },
    {
        day_type: "Thu",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Thursday"
    },
    {
        day_type: "Fri",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Friday"
    },
    {
        day_type: "Sat",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Saturday"
    },
    {
        day_type: "Sun",
        time_from: "09:00 AM",
        time_to: "09:00 PM",
        day: "Sunday"
    },
    ]);
    const updateWorkTimeFrom = (updatedDay, newTimeFrom) => {
        setwork_times(prevWorkTimes => {
            return prevWorkTimes.map(day => {
                if (day.day_type === updatedDay) {
                    return {
                        ...day,
                        time_from: newTimeFrom,
                    };
                }
                return day;
            });
        });
    };

    const updateWorkTimeTo = (updatedDay, newTimeTo) => {
        setwork_times(prevWorkTimes => {
            return prevWorkTimes.map(day => {
                if (day.day_type === updatedDay) {
                    return {
                        ...day,
                        time_to: newTimeTo,
                    };
                }
                return day;
            });
        });
    };
    const handleInputChange = (id, event) => {
        const updatedFields = inputFields.map((field) =>
            field.id === id ? { ...field, text: event.target.value } : field
        );
        setInputFields(updatedFields);
    };

    const handleAddFields = () => {
        setInputFields([...inputFields, { id: nextId, text: '' }]);
        setNextId(nextId + 1);
    };
    const handleDeleteField = (id) => {
        const updatedFields = inputFields.filter((field) => field.id !== id);
        setInputFields(updatedFields);
    };

    const handleImageDropOne = useCallback((acceptedFiles) => {
        const isImage = acceptedFiles.every(file => file.type.startsWith('image/'));
        if (isImage) {
            const image = acceptedFiles[0]
            setUploadedImage(image);
        } else {
            setMessageAlert("Please upload only images.")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
        }
    }, [uploadedImage]);

    const handleImageDropTwo = useCallback((acceptedFiles) => {
        const isImage = acceptedFiles.every(file => file.type.startsWith('image/'));
        if (isImage) {
            const image = acceptedFiles[0];
            setUploadedImage2(image)
        }
        else {
            setMessageAlert("Please upload only images.")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
        }
    }, [uploadedImage2])



    const [count, setCount] = useState();

    let urlStates = 'state_page/business';
    let urlCategories = 'main-categories'


    const [mainCat] = useAxios(urlCategories);
    const mainCategories = mainCat?.data;
    const businessCategories = mainCategories?.business || [];
    const serviceCategories = mainCategories?.service || [];
    const mirgeCate = [...businessCategories, ...serviceCategories];
    const [Data] = useAxios(urlStates);
    const statesAndcityes = Data?.data;

    useEffect(() => {
        const getSubCategory = async () => {
            try {
                const token = localStorage.getItem('arab_user_token');
                let subCategoryUrl = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}/${process.env.REACT_APP_City_ID}/main-categories/${businessType}/sub-categories`;
                setLoadingSub(true)
                await axios.get(subCategoryUrl, {
                    headers: { "Authorization": `Bearer ${token}` }
                }).then((res) => {
                    setSubCategorys(res?.data?.data)
                    if (res?.data?.data?.length === 0) {
                        setHiddenBussines(true)
                    }
                    else {
                        setHiddenBussines(false)
                    }
                    setSelectedOptions([])
                    setLoadingSub(false)

                })
            }
            catch (err) {
                setLoadingSub(false)
                console.log(err)
            }
        }
        getSubCategory()
    }, [businessType])

    const handlerSetBusinessTest = useCallback((e) => {
        const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
        const resultIds = subCategorys
            .filter(item => selectedValues.includes(item.id.toString()))
            .map(item => ({ id: item.id, name: item.name }));
        resultIds.forEach((item) => {
            if (!branchIds.includes(String(item.id))) {
                setSelectedOptions([...selectedOptions, item]);
                setBranchIds([...branchIds, ...selectedValues]);
            }
        })
    }, [selectedOptions]);

    const handleChangeCity = (e) => {
        setState(e.target.value);
        let cityName = statesAndcityes?.find((item) => {
            return item?.id === parseInt(e.target.value);
        });
        let subCity = cityName?.city?.map((city) => {
            return city?.name;
        })
        setCity(subCity[0]);
        setCitys(subCity);
    }

    const handlerSetBusiness = useCallback((e) => {
        setBusinessType(e.target.value);
    }, [businessType]);

    const handlerCity = useCallback((e) => {
        setCity(e.target.value)
    }, [city]);

    const handlerDayChangeFrom = useCallback((newTime, day) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom(day, date)
    }, []);

    const handlerDayChangeTo = useCallback((newTime, day) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo(day, date)
    }, []);

    const handleImageDrop = useCallback((acceptedFiles) => {
        if (images.length + acceptedFiles?.length > 6) {
            setMessageAlert("You can upload only 6 images.")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
        }
        else {
            const isImage = acceptedFiles.every(file => file.type.startsWith('image/'));
            if (isImage) {
                setImages((prevImages) => [...prevImages, ...acceptedFiles]);
            }
            else {
                setMessageAlert("Please upload only images.")
                setTypeAlert("warning");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000)
            }
        }

    }, [images]);

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    const handleImageDrop2 = useCallback((acceptedFiles) => {
        if (images2.length + acceptedFiles?.length > 10) {
            setMessageAlert("You can upload only 10 images.")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000)
        }
        else {
            const isImage = acceptedFiles.every(file => file.type.startsWith('image/'));
            if (isImage) {
                setImages2((prevImages) => [...prevImages, ...acceptedFiles]);
            }
            else {
                setMessageAlert("Please upload only images.")
                setTypeAlert("warning");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000)
            }
        }
    }, [images2])

    const handleRemoveImage2 = (index) => {
        const updatedImages = [...images2];
        updatedImages.splice(index, 1);
        setImages2(updatedImages);
    };
    function convertToDateString(date) {
        date = new Date(date);
        date = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
        return date;
    }

    const handlerSubmitForm = async (e) => {
        e.preventDefault()

        if (businessType.length === "") {
            setBusinessType("2")
        }

        if (city === "") {
            setMessageAlert("please fill The  City")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }


        if (images.length < 3) {
            setMessageAlert("please Upload your Main Photos  at least three")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (images2.length < 3) {
            setMessageAlert("please Upload your gallery  at least three")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (inputFields.length < 1) {
            setMessageAlert("please fill The Services input at least one")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (businessDes.current?.value === "") {
            setMessageAlert("please fill The Business Description")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (emailForm.current?.value === "") {
            setMessageAlert("please fill Your Email")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (phone.current?.value === "") {
            setMessageAlert("please fill The Phone Number ")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (postalCode.current?.value === "") {
            setMessageAlert("please fill The  Postal Code")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (state === "") {
            setMessageAlert("please fill The State")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (street.current?.value === "") {
            setMessageAlert("please fill The Street Address")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (uploadedImage === null) {
            setMessageAlert("please Upload  Your Business Cover")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (uploadedImage2 === null) {
            setMessageAlert("please Upload Business Logo")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (companyName.current?.value === "") {
            setMessageAlert("please fill The Company Name")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (
            companyName.current?.value !== "" &&
            street.current?.value !== ""
            && city !== ""
            && state !== ""
            && postalCode.current?.value !== ""
            && phone.current?.value !== ""
            && emailForm.current?.value !== ""
            && businessDes.current?.value !== ""
            && inputFields.length > 0
            && images.length >= 2
            && images2.length >= 2
            && uploadedImage !== null
            && uploadedImage2 !== null) {
            let formData = new FormData();
            let baseURL = `https://glyphsmarketingbusiness.com/api/${process.env.REACT_APP_City}/en/${state}/business/create`;
            const token = localStorage.getItem('arab_user_token');
            formData.append('name', companyName.current?.value);
            formData.append('main_id', businessType);
            formData.append('state', state);
            formData.append("city", city);
            formData.append('zip_code', postalCode.current?.value);
            formData.append('address', street.current?.value);
            formData.append('phone_number', phone.current?.value);
            formData.append('email', emailForm.current?.value);
            formData.append('description', businessDes.current?.value);
            formData.append('website_url', websiteUrl.current?.value);
            formData.append('facebook', faceBook.current?.value);
            formData.append('twitter', twitterRef.current?.value);
            formData.append('instagram', instagramRef.current?.value);
            formData.append('youtube', youtubeRef.current?.value);
            formData.append('tiktok', tikTokRef.current?.value);
            formData.append('pinterest', pinterestLine.current?.value);
            formData.append('cover', uploadedImage)
            formData.append('logo', uploadedImage2);
            branchIds.forEach((brach) => {
                formData.append("branch_id[]", brach);
            })
            images?.forEach((image) => {
                formData.append("photos[]", image);
            });
            images2?.forEach((image) => {
                formData.append("gallerys[]", image)
            })
            inputFields?.forEach((offer, index) => {
                formData.append(`offers[${index}]`, offer.text)
            })
            work_times.forEach((work, index) => {
                formData.append(`work_times[${index}][day_type]`, work.day_type);
                formData.append(`work_times[${index}][time_from]`, work.time_from);
                formData.append(`work_times[${index}][time_to]`, work.time_to);
            });
            setLoadingBussines(true);
            try {
                await fetch(`${baseURL}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                    method: "POST",
                    body: formData,
                }).then((result) => {
                    console.log("resulty>>>>>>>>", result)
                    setMessageAlert("Your Post Has been Published successfully");
                    setTypeAlert("success");
                    setShowAlert(true);
                    companyName.current = null;
                    street.current = null;
                    postalCode.current = null;
                    phone.current = null;
                    emailForm.current = null;
                    businessDes.current = null;
                    youtubeRef.current = null;
                    tikTokRef.current = null;
                    instagramRef.current = null;
                    faceBook.current = null;
                    pinterestLine.current = null;
                    websiteUrl.current = null;
                    twitterRef.current = null;
                    setBusinessType("");
                    setCity("");
                    setState("");
                    setInputFields([{ id: 0, text: '' }]);
                    setImages([]);
                    setImages2([]);
                    setUploadedImage(null);
                    setUploadedImage2(null);
                    setwork_times([{
                        day_type: "Mon",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    {
                        day_type: "Tue",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    {
                        day_type: "Wed",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    {
                        day_type: "Thu",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    {
                        day_type: "Fri",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    {
                        day_type: "Sat",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    {
                        day_type: "Sun",
                        time_from: "09:00 AM",
                        time_to: "09:00 PM"
                    },
                    ])
                    setLoadingBussines(false);
                    navigation("/my-business")
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 3000)
                })
            } catch (error) {
                setLoadingBussines(false);
                setMessageAlert("There is a problem with the server; please try again later.")
                setTypeAlert("warning");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000)
                console.log("errorBusiness>>", error);
            }
        }
    }

    const handleRemoveFromBranchIds = (value) => {
        setBranchIds((prevBranchIds) => prevBranchIds.filter((id) => id !== String(value)));

        setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((sub) => sub?.id !== value));
    };
    return (
        <>
            {isLoadingBusines && <SpinnerStatic text={true} textForm="Please do not close the page. Business form submission may take a few minutes. Thank you for your patience!" />}
            <Helmet>
                <title>{titleBussines}</title>
                <meta name="description" content={titleBussines} />
            </Helmet>
            <h1 className={style.titleBussines} >{t("Your Business Form")}</h1>
            <form className={style.formDiv} >
                <div className={style.formFlex}>
                    <div>
                        <div className={style.inputDiv}>
                            <label style={{ color: "#05436B", fontWeight: "bold" }} className={style.labelStyle}>{t("Company Name")}</label>
                            <input
                                name="company"
                                type="text"
                                id="company"
                                placeholder={t("Company Name")}
                                className={style.inputForm}
                                ref={companyName}
                            />
                        </div>
                        <>
                            <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Your Business Type")}</label>
                            <div className={`${style.inputDiv}`}>
                                <InputSelect
                                    handlerChange={handlerSetBusiness}
                                    name="businessType"
                                    inputValue={businessType}
                                    optionsValue={mirgeCate}
                                />
                            </div>
                            {LoadingSub && <LoadingSpiner />}
                        </>
                        {!hiddenBussines && <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Business Subcategories(Select one or more)")}</label>}
                        {!hiddenBussines && <div className={`${style.inputDiv}`}>
                            <InputSelect
                                handlerChange={handlerSetBusinessTest}
                                name="SubbusinessType"
                                optionsValue={subCategorys}
                            />
                            {selectedOptions.length !== 0 && selectedOptions?.map((sub) => {
                                return <div className={style.optionsContainer} key={sub?.id}>
                                    <li>{sub?.name}</li>
                                    <i className="fas fa-times" onClick={() => handleRemoveFromBranchIds(sub?.id)} ></i>
                                </div>
                            })}
                        </div>}
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={`${style.labelStyle}`}>{t("Your Business Cover")}</label>
                        <div className={` ${style.uploadImageDiv} ${style.uploadBorder}`}>
                            <ImageSelector
                                handlerDrop={handleImageDropOne}
                                uploadStyle="postHousingUploadImage"
                                uploadedImage={uploadedImage}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Upload Business Logo")}</label>
                        <div className={` ${style.uploadImageDiv} ${style.uploadBorder}`}>
                            <ImageSelector
                                handlerDrop={handleImageDropTwo}
                                uploadStyle="postHousingUploadImage"
                                uploadedImage={uploadedImage2}
                            />
                        </div>
                        <div className={style.helpDiv}>
                            <h3 className={style.h3Help}>{t("Do You Need Any Help! Contact Us")}</h3>
                            <Link to='/Contact'><button className={style.buttonHelp}>{t("Contact Us")}</button></Link>
                        </div>
                    </div>
                </div>
                <label style={{ color: "#05436B", fontWeight: "600" }} className={style.labelStyle}>{t("Your Business Location")}</label><br></br>
                <div className={style.inputDiv}>
                    <label style={{ color: "rgba(190, 0, 64, 1)", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Street Address")}</label>
                    <input
                        required
                        name="Street Address"
                        type="text"
                        id="Street Address"
                        placeholder={t("Street Address")}
                        ref={street}
                        className={style.inputForm}
                    />
                </div>
                <div className={style.inputDiv}>

                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "rgba(190, 0, 64, 1)", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("State / Province")}</label>
                        <InputSelect
                            name="State"
                            inputValue={state}
                            handlerChange={handleChangeCity}
                            optionsValue={statesAndcityes}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "rgba(190, 0, 64, 1)", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("City")}</label>
                        <InputSelect
                            name="City"
                            inputValue={city}
                            handlerChange={handlerCity}
                            optionsValue={cities}
                        />
                    </div>
                </div>
                <div className={style.inputDiv}>
                    <label style={{ color: "rgba(190, 0, 64, 1)", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Postal Code")}</label>
                    <input
                        name="Code"
                        type="text"
                        required
                        id="Code"
                        placeholder={t("Postal / Zip Code")}
                        className={style.cityInput}
                        ref={postalCode}
                    />
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Phone Number")}</label>
                        <input
                            name="phoneNumber"
                            required
                            type="text"
                            id="phoneNumber"
                            placeholder={t("123-456-789")}
                            className={style.cityInput}
                            ref={phone}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Website Link (if Available)")}</label>
                        <input
                            name="webiste"
                            type="text"
                            id="website"
                            placeholder={t("www.domain.com")}
                            className={style.cityInput}
                            ref={websiteUrl}
                        />
                    </div>
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("E-Mail")}</label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            required
                            placeholder={t("example@example.com")}
                            className={style.cityInput}
                            ref={emailForm}
                        />
                    </div>
                    <div className={style.inputDiv}>

                    </div>
                </div>
                <div className={style.inputDiv}>
                    <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Describe Your Business (About 1-3 Lines)")}</label>
                    <textarea
                        name="businsesLine"
                        type="text"
                        required
                        id="businsesLine"
                        placeholder={t("Description")}
                        className={style.textAreayInput}
                        ref={businessDes}
                    />
                </div>
                <div className={style.inputDiv}>
                    <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("What Services Do you offer?(3-9)")}</label>
                    {inputFields.map((inputField, index) => (
                        <div key={inputField.id} className={style.inputContanierFileds}>
                            <input
                                className={style.servericeInput}
                                placeholder={`Service ${1 + index}`}
                                type="text"
                                value={inputField.text}
                                onChange={(event) => handleInputChange(inputField.id, event)}
                            />
                            <p onClick={() => handleDeleteField(inputField.id)} className={i18n.language === 'en' ? style.deleteInput : style.deleteInputAr}>{t("Delete")}</p>

                        </div>
                    ))}
                    <p onClick={handleAddFields} className={style.newInput}>{t("Add New Input")}</p>
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Facebook")} :</label>
                        <input
                            name="facebook"
                            type="email"
                            id="facebook"
                            className={style.cityInput}
                            ref={faceBook}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Instagram")} :</label>
                        <input
                            name="instagram"
                            type="email"
                            id="instagram"
                            ref={instagramRef}
                            className={style.cityInput}
                        />
                    </div>
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Twitter")} :</label>
                        <input
                            name="twitter"
                            type="email"
                            id="twitter"
                            ref={twitterRef}
                            className={style.cityInput}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("YouTube")} :</label>
                        <input
                            name="youtube"
                            type="email"
                            id="youtube"
                            ref={youtubeRef}
                            className={style.cityInput}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("TikTok")} :</label>
                        <input
                            name="tikTok"
                            type="email"
                            id="tiktok"
                            className={style.cityInput}
                            ref={tikTokRef}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Pinterest")} :</label>
                        <input
                            name="Pinterest"
                            type="email"
                            id="Pinterest"
                            className={style.cityInput}
                            ref={pinterestLine}
                        />
                    </div>
                </div>
                <div className={style.inputFlex}>
                    <div>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Main Photos of Your Business - 6 Pic")}</label>
                        <div className={` ${style.uploadImageDiv}`}>
                            <ImageSelector
                                handlerDrop={handleImageDrop}
                                textButton="Add Photos"
                                uploadStyle="mainPh"
                            />
                            <div className={style.imageContainerDiv}>
                                {images?.map((image, index) => (
                                    <div key={image.name} className={style.imageContainer}>
                                        <LazyLoadImage
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                            width='150'
                                            height='150'
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
                        <h2 className={style.jpgStyle}>Jpg, Jpeg, Png </h2>
                    </div>
                    <div>
                        <label style={{ color: "#05436B", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Extra 6-10 photos to gallery")}</label>
                        <div className={` ${style.uploadImageDiv}`}>
                            <ImageSelector
                                handlerDrop={handleImageDrop2}
                                textButton="Add Photos"
                                uploadStyle="mainPh"
                            />
                            <div className={style.imageContainerDiv}>
                                {images2?.map((image, index) => (
                                    <div key={image.name} className={style.imageContainer}>
                                        <LazyLoadImage
                                            src={URL.createObjectURL(image)}
                                            alt=""
                                            width='150'
                                            height='150'
                                        />
                                        <button
                                            className={style.removeButton}
                                            onClick={() => handleRemoveImage2(index)}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h2 className={style.jpgStyle}>Jpg, Jpeg, Png </h2>
                    </div>
                </div>
                <label style={{ color: "#05436B", fontWeight: "bold" }} className={style.labelStyle}>{t("Your Business Working Hours")}</label><br></br>
                {work_times.map((time) => {
                    return <>
                        <label style={{ color: "rgba(190, 0, 64, 1)", fontWeight: "bold" }} className={style.labelBussiness}>{t(`${time.day}`)}</label>
                        <div className={style.inputFlexWeek} key={time.day}>
                            <div className={style.inputFlexDays}>
                                <div className={style.inputDiv}>
                                    <BusinessTime day={time.day_type} handlerChange={handlerDayChangeFrom} />
                                </div>
                                <div className={style.inputDiv}>
                                    <h2 className={style.jpgStyle}>{t("Until")}</h2>
                                </div>
                                <div className={style.inputDiv}>
                                    <BusinessTime day={time.day_type} handlerChange={handlerDayChangeTo} />
                                </div>
                            </div>
                        </div>
                    </>
                })}
            </form>
            <div className={style.buttonTwoContainer}>
                <ButtonTwo handlerClick={handlerSubmitForm} buttonType="submit">
                    {t("Submit")}
                </ButtonTwo>
            </div>
            {showAlert && (
                <AlertBussiness
                    type={typeAlert}
                    message={messageAlert}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    count={count}
                    setCount={setCount}
                />
            )}
        </>
    );
}
export default ForRentForm;
