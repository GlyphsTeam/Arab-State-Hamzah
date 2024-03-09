import React, { useState, useEffect } from "react";
import style from "../../../assets/style/layout/navbar.module.scss";
import { Link } from "react-router-dom";
import MenuDropDown from "./MenuDropDown";
import Button from "../../common/Button";
import NavSearch from "../navbar/NavSearch";
import { useLocation } from "react-router-dom";
import btnStyle from "../../../assets/style/common/button.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAxios from "../../../hooks/useAxiosGet";
import NestedDropDown from "./NestedDropDown";
import AccordionMobile from "./AccordionMobile";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Alert from "../../common/alert/Alert";
import Advert from "../../Advertisement/Advertusments"
import { MdApps } from 'react-icons/md';
import { FaBars, FaRegUser } from "react-icons/fa6";
import { FaSignOutAlt, FaGlobe } from "react-icons/fa";


// import { HiMiniBars3CenterLeft } from "react-icons/hi2";



function NavBar({ logoImage }) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [count, setCount] = useState();

  const [navbar, setNavbar] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [statesDropDown, setStatesDropDown] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const pathName = location.pathname.toLocaleLowerCase();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let nestedUrl = "listings";
  const [Data] = useAxios(nestedUrl);
  const [general] = useAxios("general-setting");
  const statesData = general?.data?.navbar?.states;
  const serviceLinks = general?.data?.services;


  const initialState = {
    username: localStorage.getItem("arab_user_name")
      ? localStorage.getItem("arab_user_name")
      : t("Guest"),
    newField: null,
  };
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
    if (statesDropDown) {
      setStatesDropDown(!statesDropDown);
    }
  };

  const handleCloseModal = () => {
    setShowNavbar(false);
  };

  const changeBackground = () => {
    if (window.scrollY >= 1) {
      setNavbar(true);
    } else {
      if (
        pathName === "/profile" ||
        pathName === "/saved-blogs" ||
        pathName === "/saved-store" ||
        pathName === "/saved-accomodation" ||
        pathName === "/saved-product" ||
        pathName === "/saved-job" ||
        pathName === "/my-business" ||
        pathName === "/my-housing" ||
        pathName === "/my-job" ||
        pathName === "/my-product" ||
        pathName === "/changepassword" ||
        pathName === "/delete-account" ||
        pathName === "/add-business" ||
        pathName === "/login" ||
        pathName === "/register" ||
        pathName.includes("show-product") ||
        pathName.includes('/show-user-guide')
      ) {
        setNavbar(true)
      }
      else {
        setNavbar(false);
      }
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handlerBussines = () => {
    const token = localStorage.getItem("arab_user_token");
    if (token) {
      navigate("/add-business");
    }
    else {
      setMessageAlert("Please Login First")
      setTypeAlert("warning");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false)
      }, 3000)
    }
  }

  const ltrDir = () => {
    document.getElementById("root").style.direction = "ltr";
  };
  const rtlDir = () => {
    document.getElementById("root").style.direction = "rtl";
  };

  window.addEventListener("scroll", changeBackground);

  const hideNavbar =
    location.pathname.toLocaleLowerCase() === "/privacy-policy" ||
    location.pathname.toLocaleLowerCase() === "/terms-conditions";


  useEffect(() => {
    setDropDown(false);
  }, [pathName]);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
  }, [])
  const urlChangeLang = (lang, type) => {
    const { pathname } = location;
    const params = window.location.pathname.split("/");
    const langUrl = params[1];
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(lang);
    langDir(lang);

    const newPath = pathname.replace(`/${langUrl}`, "");

    window.location.replace(`/${i18n.language}${newPath}`);

  };
  var nav = "one";
  const isSmallScreen = windowWidth === 500;

  if (
    pathName === "/my-housing" ||
    pathName === "/my-job" ||
    pathName === "/edit-profile" ||
    pathName === "/change-password" ||
    pathName === "/forgot-password" ||
    pathName === "/reset-password" ||
    pathName === "/privacy-policy" ||
    pathName === "/terms-conditions" ||
    pathName === "/saved-store" ||
    pathName === "/favourite-store" ||
    pathName === "my-favourite-store" ||
    pathName === "my-saved-store" ||
    pathName === "/store-detail" ||
    pathName === "/product-detail" ||
    pathName === "/changepassword" ||
    pathName === "/my-product" ||
    pathName === "/delete-account" ||
    pathName === "/saved-accomodation" ||
    pathName === "/saved-job" ||
    pathName === "/saved-product" ||
    pathName === "/search-result/{keyword}" ||
    pathName === "/add-business" ||
    pathName === "/saved-blogs" ||
    pathName === "/add-business" ||
    pathName === "/forget-password" ||
    isSmallScreen & pathName.includes('/Marketprofile')
  ) {
    nav = "two";
  }
  useEffect(() => {
    if (
      pathName === "/profile" ||
      pathName === "/saved-blogs" ||
      pathName === "/saved-store" ||
      pathName === "/saved-accomodation" ||
      pathName === "/saved-product" ||
      pathName === "/saved-job" ||
      pathName === "/my-business" ||
      pathName === "/my-housing" ||
      pathName === "/my-job" ||
      pathName === "/my-product" ||
      pathName === "/changepassword" ||
      pathName === "/delete-account" ||
      pathName === "/add-business" ||
      pathName === "/login" ||
      pathName === "/register" ||
      pathName.includes("show-product") ||
      pathName.includes("/show-user-guide")
    ) {
      setNavbar(true)
    }
  }, [pathName])

  const langDir = (newLang) => {
    if (newLang === "ar") {
      document.getElementById("root").style.direction = "rtl";
    } else {
      document.getElementById("root").style.direction = "ltr";
    }
  };

  const disableScroll = (bool) => {
    if (bool) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };


  return (
    <>
      <Advert />
      {!hideNavbar && (
        <header
          className={`${nav === "one" ? style.headerContainer : style.headerContainer2
            } ${navbar ? style.activeNav : ""} `}
        >
          <div className={i18n.language === "ar" ? style.logoDivAr : ""}>
            <Link to={`/`}>
              <LazyLoadImage
                className={style.LogoImage}
                alt="Logo"
                src={
                  logoImage
                  // : require("../../assets/images/common/Logo.png")
                }
              />
            </Link>
          </div>
          <nav className={style.navigationBarContainer}>
            <ul className={style.navigationBarUnorderedList}>
              <Link to={`/`}>
                <li className={pathName === "/" ? style.activePath : ""}>
                  {t("Home")}{" "}
                </li>
              </Link>

              <Link to={`/about`}>
                <li className={pathName === "/about" ? style.activePath : ""}>
                  {t("about us")}
                </li>
              </Link>
              <Link to="/Our-Service">
                <li
                  onMouseEnter={() => setDropDown(!dropDown)}
                  onMouseLeave={() => setDropDown(!dropDown)}
                  className={
                    pathName === "/Our-Service" ? style.activePath : ""
                  }
                >
                  {t("Our Services")}
                  {dropDown && (
                    <NestedDropDown
                      data={Data?.data}
                      serviceLinks={serviceLinks}
                    />
                  )}

                  {/* <MenuDropDown
                  data={Data?.data}
                  dropDownInfo={t("Our Services")}
                  handleCloseModal={handleCloseModal}
                  menuElements={[
                    {
                      path: "/Category/services",
                      title: t("Service Provider"),
                      type: "dropdown",
                      categoryType:"service"
                      
                    },
                    {
                      path: "/Category/shops",
                      title: t("Shops"),
                      type: "dropdown",
                      categoryType:"business"
                      
                    },
                    { path: "/Jobs/Rent", title: t("Rent"), type: "click" },
                    { path: "/Jobs/Job", title: t("Jobs"), type: "click" },
                  ]}
                /> */}
                </li>
              </Link>
              <Link to="/Contact">
                <li className={pathName === "/contact" ? style.activePath : ""}>
                  {t("contact us")}
                </li>
              </Link>
              <Link to="/Blog">
                <li className={pathName === "/blog" ? style.activePath : ""}>
                  {t("BlogNav")}
                </li>
              </Link>
              <button onClick={handlerBussines} className={style.buttonBussines}>
                <li className={pathName === "/add-business" ? style.activePath : ""}>
                  {t("Add Business")}
                </li>
              </button>
            </ul>
          </nav>
          <div className={style.rightSubContainer}>
            <div className={style.navBarSearchMainDiv}>
              <NavSearch />
            </div>

            <div>
              <button
                className={style.statesBtn}
                onClick={() => {
                  setStatesDropDown(!statesDropDown);
                }}
              >
                <MdApps className={style.stateIcon} />
                {/* <i className={`fas fa-th ${style.stateIcon}`}></i> */}
              </button>

              {statesDropDown && (
                <div className={`row ${i18n.language === 'en' ? style.statesDropDownDiv : style.statesDropDownDivAR}`}>
                  {statesData?.map((item, index) => (
                    <a
                      key={index}
                      className={`col-4 ${style.statesImg}`}
                      href={`${item.url}`}
                      target="blank"
                    >
                      {" "}
                      <div className={`${style.imageContainerSpan}`}>
                        <LazyLoadImage src={item.image} height={50} width={50} alt={`${item.title}`} />{" "}
                        <span style={{ fontSize: "11px", fontWeight: "bold", marginTop: '10px' }} >{item.title}</span >
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div>
              {i18n.language === "en" && (
                <button
                  className={style.languageBtn}
                  onClick={() => {
                    i18n.changeLanguage("ar");
                    rtlDir();
                    setShowNavbar(false);
                    urlChangeLang("ar");
                  }}
                >
                  <FaGlobe className={style.languageIcon}/>AR
                </button>
              )}
              {i18n.language === "ar" && (
                <button
                  className={style.languageBtn}
                  onClick={() => {
                    i18n.changeLanguage("en");
                    ltrDir();
                    setShowNavbar(false);
                    urlChangeLang("en");
                  }}
                >
                  <FaGlobe className={style.languageIcon}/> EN
                </button>
              )}
            </div>

            <div>
              {initialState && initialState.username === "Guest" || initialState.username === "زائر" ? (
                <Link to="/login">
                  <Button
                    handleCloseModal={handleCloseModal}
                    btnInfo={
                      <div className={btnStyle.iconUserDiv}>
                        <FaRegUser className={style.userIcon} />
                        {/* <i className={`far fa-user  ${style.userIcon}`}></i> */}
                      </div>
                    }
                  />
                </Link>
              ) : (
                <MenuDropDown
                  dropDownInfo={
                    <div className={btnStyle.userloggedinBtn}>
                      <FaRegUser className={style.userIcon} />
                      {/* <i className={`far fa-user  ${style.userIcon}`}></i> */}
                      {initialState.username.split(" ")[0]}
                    </div>
                  }
                  handleCloseModal={handleCloseModal}
                  menuElements={[
                    {
                      path: "/Profile",
                      title: (
                        <div >
                          <FaSignOutAlt> </FaSignOutAlt>{" "}
                          <span>{t("Profile")}</span>
                        </div>
                      ),
                    },
                    {
                      path: "/",
                      title: (
                        <div onClick={logout}>
                          <FaSignOutAlt> </FaSignOutAlt>{" "}
                          {t("LogOut")} {" "}
                        </div>
                      ),
                    },
                  ]}
                />
              )}
            </div>
          </div>
          <div
            className={
              i18n.language === "en"
                ? style.searchMenuDivMobile
                : style.searchMenuDivMobileAr
            }
          >
            <div
              className={`${style.navBarSearchMainDiv} ${style.navMobileMargin}`}
            >
              <NavSearch />
            </div>

            <div>
              <button
                className={style.statesBtn}
                onClick={() => {
                  setStatesDropDown(!statesDropDown);
                  disableScroll(!statesDropDown);
                }}
              >
                <MdApps className={style.stateIcon} />
                {/* <i className={`fas fa-th ${style.stateIcon}`}></i> */}
              </button>
            </div>

            <div className={`${style.burgerMenu}`} onClick={handleShowNavbar}>
              <FaBars className={style.bars} />
            </div>
          </div>
          {showNavbar && (
            <div className={style.showNavBarMainContainerMobile}>
              <div
                className={`${showNavbar ? style.showNavigationBarMobile : ""}`}
              >
                <div className={style.showNavBarMainMobile}>
                  <nav className={style.navigationBarContainerMobile}>
                    <ul className={style.navigationBarUnorderedList}>
                      <Link to="/" onClick={handleCloseModal}>
                        <li> {t("Home")} </li>
                      </Link>
                      <Link to="/About" onClick={handleCloseModal}>
                        <li> {t("about us")}</li>
                      </Link>

                      {/* <Link to="/Category/all" onClick={handleCloseModal}>
                        <li> {t("Categories")} </li>
                      </Link> */}

                      <li>
                        {/* {t("Our Services")}
                            {dropDown && (
                              <NestedDropDown data={Data?.data} />
                            )} */}
                        <AccordionMobile
                          data={Data?.data}
                          serviceLinks={serviceLinks}
                          handleCloseModal={handleCloseModal}
                        />
                      </li>

                      <Link to="/Contact" onClick={handleCloseModal}>
                        <li> {t("Contact")} </li>
                      </Link>
                      <Link to="/Blog" onClick={handleCloseModal}>
                        <li> {t("Blog")} </li>
                      </Link>
                      <button onClick={handlerBussines} className={style.buttonBussines}>
                        <li> {t("Add Business")} </li>
                      </button>
                      <Link to={initialState.username === "Guest" || initialState.username === "زائر" ? `/login` : `/Profile`} onClick={handleCloseModal} className={style.profileNav}>
                        <FaRegUser className={style.userIcon} />
                        <i
                        // className={`far fa-user  ${style.userIcon}`}
                        ></i>
                        <li>{initialState.username.split(" ")[0]}
                        </li>
                      </Link>
                    </ul>
                  </nav>
                  <div className={i18n.language === "en" ? style.rightSubContainerMobile : style.rightSubContainerMobileAr}>
                    <div>
                      {initialState && initialState.username === "Guest" || initialState.username === "زائر" ? (
                        <Link to="/login">
                          <Button
                            handleCloseModal={handleCloseModal}
                            btnInfo={
                              <div className={`${btnStyle.iconUserDiv} ${style.loginButton}`}>
                                {t("Login")}
                              </div>
                            }
                          />
                        </Link>
                      ) : (
                        <MenuDropDown
                          handleCloseModal={handleCloseModal}
                          dropDownInfo={
                            <div className={`${btnStyle.userloggedinBtn} ${style.logoutButton}`} onClick={logout}>
                              <FaSignOutAlt> </FaSignOutAlt>{" "}
                              {t("LogOut")}

                            </div>
                          }
                          menuElements={[

                            {
                              path: "/",
                              title: (
                                <div onClick={logout}>
                                  <FaSignOutAlt> </FaSignOutAlt>{" "}
                                  {t("LogOut")}
                                </div>
                              ),
                            },
                          ]}
                        />
                      )}
                    </div>
                    <div>
                      {i18n.language === "en" && (
                        <button
                          className={style.languageBtn}
                          onClick={() => {
                            i18n.changeLanguage("ar");
                            rtlDir();
                            setShowNavbar(false);
                            urlChangeLang("ar");
                          }}
                        >
                         <FaGlobe className={style.languageIcon}/>{" "}
                          AR
                        </button>
                      )}
                      {i18n.language === "ar" && (
                        <button
                          className={style.languageBtn}
                          onClick={() => {
                            i18n.changeLanguage("en");
                            ltrDir();
                            setShowNavbar(false);
                            urlChangeLang("en");
                          }}
                        >
                          <FaGlobe className={style.languageIcon}/>{" "}
                          EN
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </header >
      )
      }

      {
        statesDropDown && (
          <div className={style.mainStateDiv}>
            <div className={`row ${style.statesDropDownDivMobile}`}>
              <div className={style.mobilestateHeight}>
                {statesData?.map((item, index) => (
                  <a
                    key={index}
                    className={`col-4 ${style.statesImg}`}
                    href={`${item.url}`}
                    target="blank"
                  >
                    {" "}
                    <div className={`${style.imageContainerSpan}`}>
                      <LazyLoadImage
                        className={`mt-3`}
                        src={item.image}
                        height={50}
                        width={50}
                        alt="img-countery"
                      />{" "}
                      <span style={{ fontSize: "11px", fontWeight: "bold", marginTop: '10px' }} >{item.title}</span >
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )
      }
      {
        showAlert && <Alert
          message={messageAlert}
          show={showAlert}
          type={typeAlert}
          count={count}
          setCount={setCount}
        />
      }
    </>
  );
}

export default NavBar;
