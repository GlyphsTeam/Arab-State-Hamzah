import React, { useState } from "react";
import style from "../../assets/style/formStyle/addbuinsesFrom.module.css";
import Alert from "../customAlert/Alert";
import useAxios from "../../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import contactStyle from "../../assets/style/contactUs.module.css";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Link } from "react-router-dom";
import AlertBussiness from "../common/alert/Alert";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function ForRentForm({ baseUrl, rentPageData }) {

    const [t, i18n] = useTranslation();
    const [showAlert, setShowAlert] = useState(false);

    const [company, setCompany] = useState("");
    const [businessType, setBusinessType] = useState("2");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [code, setCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [website, setWebsite] = useState("");
    const [email, setEmail] = useState("");
    const [pinterest, setPinterest] = useState("");
    const [businsesLine, setbusinsesLine] = useState("");
    const [facebook, setFaceBook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [youtube, setYoutube] = useState("");
    const [tikTok, setTikTok] = useState("");
    const [inputFields, setInputFields] = useState([{ id: 0, text: '' }]);
    const [nextId, setNextId] = useState(1);
    const [messageAlert, setMessageAlert] = useState("");
    const [typeAlert, setTypeAlert] = useState("");
    const [images, setImages] = useState([]);
    const [images2, setImages2] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImage2, setUploadedImage2] = useState(null);
    const [cities, setCitys] = useState([]);
    const [work_times, setwork_times] = useState([{
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
    const handleMondayTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Mon', date);
    };
    const handleMondayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Mon', date)
    };
    const handleTusedayTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Tue', date);

    };
    const handleTusedayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Tue', date)

    };
    const handleWednesdayTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Wed', date);

    };
    const handleWednesdayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Wed', date)

    };
    const handleThursdayTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Thu', date);

    };
    const handleThursdayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Thu', date)

    };
    const handleFridayTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Fri', date);

    };
    const handleFridayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Fri', date)

    };
    const handleSaturdayTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Sat', date);

    };
    const handleSaturdayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Sat', date)

    };
    const handleSundayyTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeFrom('Sun', date);

    };
    const handleSundayEndTimeChange = (newTime) => {
        let date = convertToDateString(newTime);
        updateWorkTimeTo('Sun', date)

    };
    const handleImageDropOne = (acceptedFiles) => {
        const image = acceptedFiles[0]
        setUploadedImage(image);
    };

    const handleImageDropTwo = (acceptedFiles) => {
        const image = acceptedFiles[0];
        setUploadedImage2(image)
    }


    const [showImageInput, setShowImageInput] = useState(true);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showTitleWarn, setShowTitleWarn] = useState(false);
    const [showPlaceWarn, setShowPlaceWarn] = useState(false);
    const [count, setCount] = useState();
    const [showImageWarn, setShowImageWarn] = useState(false);
    const [descriptionWarning, setDescriptionWarning] = useState(false);


    let urlStates = 'state_page/business';
    let urlCategories = 'main-categories'
    const [mainCat] = useAxios(urlCategories);
    const mainCategories = mainCat?.data;
    const businessCategories = mainCategories?.business || [];
    const serviceCategories = mainCategories?.service || [];

    const mirgeCate = [...businessCategories, ...serviceCategories];

    const [Data] = useAxios(urlStates);
    const statesAndcityes = Data?.data;

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
    const handleImageDrop = (acceptedFiles) => {
        setImages((prevImages) => [...prevImages, ...acceptedFiles]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };
    const handleImageDrop2 = (acceptedFiles) => {
        setImages2((prevImages) => [...prevImages, ...acceptedFiles]);
    };
   
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
        if (company.length === 0) {
            setMessageAlert("please fill The Company Name")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (businessType.length === "") {
             setBusinessType("2")
        }
        if (streetAddress === "") {
            setMessageAlert("please fill The Street Address")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (city === "") {
            setMessageAlert("please fill The  City")
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
        if (code === "") {
            setMessageAlert("please fill The  Postal Code")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (phoneNumber === "") {
            setMessageAlert("please fill The Phone Number ")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (email === "") {
            setMessageAlert("please fill Your Email")
            setTypeAlert("warning");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);

            }, 2000)
        }
        if (businsesLine === "") {
            setMessageAlert("please fill The Business Description")
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
        if (company !== ""
            && streetAddress !== ""
            && city !== ""
            && state !== ""
            && code !== ""
            && phoneNumber !== ""
            && email !== ""
            && businsesLine !== ""
            && inputFields.length > 0
            && images.length >= 2
            && images2.length >= 2
            && uploadedImage !== null
            && uploadedImage2 !== null){
            let formData = new FormData();
        let baseURL = `https://glyphsmarketingbusiness.com/api/GA/en/${state}/business/create`;
        const token = localStorage.getItem('arab_user_token');
       
        formData.append('name', company);
        formData.append('main_id', businessType);
        formData.append('state', state);
        formData.append("city", city);
        formData.append('zip_code', code);
        formData.append('address', streetAddress);
        formData.append('phone_number', phoneNumber);
        formData.append('email', email);
        formData.append('description', businsesLine);
        formData.append('website_url', website);
        formData.append('facebook', facebook);
        formData.append('twitter', twitter);
        formData.append('instagram', instagram);
        formData.append('youtube', youtube);
        formData.append('tiktok', tikTok);
        formData.append('pinterest', pinterest);
        formData.append('cover', uploadedImage)
        formData.append('logo', uploadedImage2);
        
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
        try {
            await fetch(`${baseURL}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                method: "POST",
                body: formData,
            }).then((result) => {
                console.log("resultBussines", result);
                setMessageAlert("Your Post Has been Published successfully");
                setTypeAlert("success");
                setShowAlert(true);
                setCompany("");
                setBusinessType("");
                setStreetAddress("");
                setCity("");
                setState("");
                setCode("");
                setPhoneNumber("");
                setWebsite("");
                setEmail("");
                setPinterest("");
                setbusinsesLine("");
                setFaceBook("");
                setInstagram("");
                setTwitter("");
                setYoutube("");
                setTikTok("");
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

                setTimeout(() => {
                    setShowAlert(false);
                }, 3000)
            })
        } catch (error) {
            console.log("errorBusiness>>", error);
        }
    }
    }

    return (
        <>
            <h1 className={style.titleBussines} >Your Business Form</h1>

            <form className={style.formDiv} >
                <div className={style.formFlex}>
                    <div>
                        {showImageInput && (
                            <>
                                {showImageWarn && (
                                    <p className={contactStyle.contactValidation}>
                                        {t("Image is required")}
                                    </p>
                                )}
                            </>
                        )}
                        <div className={style.inputDiv}>
                            <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold" }} className={style.labelStyle}>{t("Company Name")}</label>
                            <input
                                name="company"
                                type="text"
                                id="company"
                                placeholder={t("Company Name")}
                                value={company}
                                className={style.inputForm}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        {showTitleWarn && (
                            <p className={contactStyle.contactValidation}>
                                {t("Company Name is required")}
                            </p>
                        )}

                        <>
                            <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }} className={style.labelStyle}>{t("Your Business Type")}</label>
                            <div className={`${style.inputDiv}`}>
                                <select
                                    name="businessType"
                                    required
                                    id="businessType"
                                    value={businessType}
                                    onChange={(e) => setBusinessType(e.target.value)}
                                >
                                    {mirgeCate && mirgeCate?.map((item) => {
                                        return (
                                            <option key={item?.id} value={item?.id}>
                                                {item?.name}
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

                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }} className={`${style.labelStyle}`}>{t("Your Business Cover")}</label>
                        <div className={` ${style.uploadImageDiv} ${style.uploadBorder}`}>
                            <Dropzone onDrop={handleImageDropOne}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} required />
                                        <div className={style.postHousingUploadImage}>
                                            <LazyLoadImage
                                                src={!uploadedImage ? require("../../assets/Images/uploadBlack.png") :URL.createObjectURL(uploadedImage)}
                                                alt="uploadImageform"
                                                style={{ marginTop: "-36px", marginRight: '10px' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Dropzone>

                        </div>
                    </div>

                    <div>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Upload Business Logo")}</label>
                        <div className={` ${style.uploadImageDiv} ${style.uploadBorder}`}>
                            <Dropzone onDrop={handleImageDropTwo}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} required />
                                        <div className={style.postHousingUploadImage}>
                                            <LazyLoadImage
                                                src={!uploadedImage2 ? require("../../assets/Images/uploadBlack.png") :URL.createObjectURL(uploadedImage2)}
                                                alt="uploadImageform"
                                                style={{ marginTop: '-40px' }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Dropzone>

                        </div>
                        <div className={style.helpDiv}>
                            <h3 className={style.h3Help}>{t("Do You Need Any Help! Contact Us")}</h3>
                            <Link to='/Contact'><button className={style.buttonHelp}>{t("Contact Us")}</button></Link>
                        </div>
                    </div>
                </div>
                <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "600" }}>{t("Your Business Location")}</label><br></br>
                <div className={style.inputDiv}>
                    <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Street Address")}</label>
                    <input
                        required
                        name="Street Address"
                        type="text"
                        id="Street Address"
                        placeholder={t("Street Address")}
                        value={streetAddress}
                        className={style.inputForm}
                        onChange={(e) => setStreetAddress(e.target.value)}
                    />
                </div>
                <div className={style.inputDiv}>

                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("State / Province")}</label>
                        <select
                            placeholder="select a city"
                            name="State"
                            required
                            id="State"
                            className={style.cityInput}
                            value={state}
                            onChange={(e) => handleChangeCity(e)}
                            style={{ width: '322px' }}
                        >
                            <option>Select</option>
                            {statesAndcityes?.map((item) => {
                                return (
                                    <option key={item?.id} value={item?.id}>
                                        {item?.state_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("City")}</label>
                        <select
                            name="City"
                            id="City"
                            required
                            className={style.cityInput}
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            style={{ width: '322px' }}
                        >
                            {cities?.map((item) => {
                                return (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className={style.inputDiv}>
                    <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Postal Code")}</label>
                    <input
                        name="Code"
                        type="text"
                        required
                        id="Code"
                        placeholder={t("Postal / Zip Code")}
                        value={code}
                        className={style.cityInput}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Phone Number")}</label>
                        <input
                            name="phoneNumber"
                            required
                            type="text"
                            id="phoneNumber"
                            placeholder={t("123-456-789")}
                            value={phoneNumber}
                            className={style.cityInput}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Website Link (if Available)")}</label>
                        <input
                            name="webiste"
                            type="text"
                            id="website"
                            placeholder={t("www.domain.com")}
                            value={website}
                            className={style.cityInput}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("E-Mail")}</label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            required
                            placeholder={t("example@example.com")}
                            value={email}
                            className={style.cityInput}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>

                    </div>
                </div>
                <div className={style.inputDiv}>
                    <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Describe Your Business (About 1-3 Lines)")}</label>
                    <textarea
                        name="businsesLine"
                        type="text"
                        required
                        id="businsesLine"
                        placeholder={t("Description")}
                        value={businsesLine}
                        className={style.textAreayInput}
                        onChange={(e) => setbusinsesLine(e.target.value)}
                    />
                </div>
                <div className={style.inputDiv}>
                    <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("What Services Do you offer?(3-9)")}</label>
                    {inputFields.map((inputField, index) => (
                        <div key={inputField.id} className={style.inputContanierFileds}>
                            <input
                                className={style.servericeInput}
                                placeholder={`Service ${index}`}
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
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Facebook")} :</label>
                        <input
                            name="facebook"
                            type="email"
                            id="facebook"
                            value={facebook}
                            className={style.cityInput}
                            onChange={(e) => setFaceBook(e.target.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Instagram")} :</label>
                        <input
                            name="instagram"
                            type="email"
                            id="instagram"
                            value={instagram}
                            className={style.cityInput}
                            onChange={(e) => setInstagram(e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputFlex}>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Twitter")} :</label>
                        <input
                            name="twitter"
                            type="email"
                            id="twitter"
                            value={twitter}
                            className={style.cityInput}
                            onChange={(e) => setTwitter(e.target.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("YouTube")} :</label>
                        <input
                            name="youtube"
                            type="email"
                            id="youtube"
                            value={youtube}
                            className={style.cityInput}
                            onChange={(e) => setYoutube(e.target.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("TikTok")} :</label>
                        <input
                            name="tikTok"
                            type="email"
                            id="tiktok"
                            value={tikTok}
                            className={style.cityInput}
                            onChange={(e) => setTikTok(e.target.value)}
                        />
                    </div>
                    <div className={style.inputDiv}>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Pinterest")} :</label>
                        <input
                            name="Pinterest"
                            type="email"
                            id="Pinterest"
                            value={pinterest}
                            className={style.cityInput}
                            onChange={(e) => setPinterest(e.target.value)}
                        />
                    </div>
                </div>
                <div className={style.inputFlex}>
                    <div>
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Main Photos of Your Business - 6 Pic")}</label>
                        <div className={` ${style.uploadImageDiv}`}>
                            <Dropzone onDrop={handleImageDrop}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} required />
                                        <div className={style.mainPh}>
                                            <LazyLoadImage
                                                src={require("../../assets/Images/uploadBlack.png")}
                                                alt="uploadImageform"
                                                style={{ marginTop: '-10px' }}
                                            />
                                            <p>Add Photos</p>
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
                        <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold", marginTop: '10px' }}>{t("Extra 6-10 photos to gallery")}</label>
                        <div className={` ${style.uploadImageDiv}`}>
                            <Dropzone onDrop={handleImageDrop2}>
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className={style.mainPh}>
                                            <LazyLoadImage
                                                src={require("../../assets/Images/uploadBlack.png")}
                                                alt="uploadImageform"
                                                style={{ marginTop: '-10px' }}

                                            />
                                            <p>Add Photos</p>

                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                            <div className={style.imageContainerDiv}>
                                {images2?.map((image, index) => (
                                    <div key={image.name} className={style.imageContainer}>
                                        <LazyLoadImage
                                            src={URL.createObjectURL(image)}
                                            // className={style.image}
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
                <label style={{ color: "#05436B", fontSize: "25px", fontWeight: "bold" }}>{t("Your Business Working Hours")}</label><br></br>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Monday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleMondayTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleMondayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Tuseday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleTusedayTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleTusedayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Wednesday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleWednesdayTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleWednesdayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Thursday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleThursdayTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleThursdayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Friday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleFridayTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleFridayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Saturday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleSaturdayTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleSaturdayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>
                <label style={{ color: "rgba(190, 0, 64, 1)", fontSize: "25px", fontWeight: "bold" }}>{t("Sunday")}</label>
                <div className={style.inputFlexWeek}>
                    <div className={style.inputFlexDays}>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} >
                                <DemoContainer components={['TimePicker']} >
                                    <TimePicker onChange={handleSundayyTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className={style.inputDiv}>
                            <h2 className={style.jpgStyle}>{t("Until")}</h2>
                        </div>
                        <div className={style.inputDiv}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['TimePicker']}>
                                    <TimePicker onChange={handleSundayEndTimeChange} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                </div>

                {descriptionWarning && (
                    <p className={contactStyle.contactValidation}>
                        {t("Description is required")}
                    </p>
                )}
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
            <div className={style.formBtnContainer}>
                <button type="submit" className={style.formBtn} onClick={handlerSubmitForm}>
                    {t("Submit")}
                </button>
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
