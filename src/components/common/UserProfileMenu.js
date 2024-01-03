import React, { useState } from 'react';
import style from '../../assets/style/userProfile/userProfile.module.css'
import '../../assets/style/userProfile/userProfile.css'
import Accordion from 'react-bootstrap/Accordion';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUsername } from "../../redux/slices/login.js";

function UserProfileMenu({ activeList }) {
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation();

  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false);

  const handleLogOut = () => {
    dispatch(setUsername("Guest"));
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className={i18n.language === "en" ? style.userFilter : style.userFilterAr}>
        <button
          onClick={() => setMobile(!mobile)}
          className={`col-lg-1 col-md-1 col-sm-1 ${style.filterShow}`}
        >
          {" "}
          <i className="fas fa-user-cog" style={{ fontSize: '34px', color: "#153866" }}></i>
        </button>
      </div>

      {mobile && (
        <div className={`${style.menu}`}>
          <h2 className={style.menuTitle}>{t('Account Settings')}</h2>

          <Accordion defaultActiveKey={activeList}>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={style.accordionHeader} ><p className={`${style.accordionTitle} ${activeList === '0' ? style.activeP : ''}`}>{t('Profile')}</p></Accordion.Header>
              <Accordion.Body>
                <ul className={style.menuList}>
                  <li>     <Link to='/Profile' >{t('edit')}</Link></li>

                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '1' ? style.activeP : ''}`}>{t('Saved')}</p></Accordion.Header>
              <Accordion.Body>
                <ul className={style.menuList}>
                  <li><Link to='/saved-blogs'>{t('Blogs')}</Link></li>
                  <li><Link to='/saved-store'>{t('Shops and Services')}</Link></li>
                  <li><Link to='/saved-accomodation'>{t('Rent')}</Link></li>
                  <li><Link to='/saved-job'>{t('Jobs')}</Link></li>
                  <li><Link to='/saved-product'>{t('Marketplace')}</Link></li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '2' ? style.activeP : ''}`}>{t('My posts')}</p></Accordion.Header>
              <Accordion.Body>
                <ul className={style.menuList}>
                  <li><Link to='/my-business'>{t('My business')}</Link></li>
                  <li><Link to='/my-housing'>{t('Rent')}</Link></li>
                  <li><Link to='/my-job'>{t('Jobs')}</Link></li>
                  <li><Link to='/my-product'>{t('Marketplace')}</Link></li>
                  {/* <li><Link to='/my-product'>{t('Product')}</Link></li> */}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '3' ? style.activeP : ''}`}>{t('Settings')}</p></Accordion.Header>
              <Accordion.Body>
                <ul className={style.menuList}>
                  <li><Link to='/changePassword'>{t('Change password')}</Link></li>
                  <li><Link to='/delete-account' className={style.menuDeleteAccount}>{t('Delete account')}</Link></li>
                  <li className={style.menuSignOut} onClick={handleLogOut}>{t('Sign out')} </li>
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

        </div>

      )}

      <div className={`${style.menu} ${style.menuWeb}`}>
        <h2 className={style.menuTitle}>{t('Account Settings')}</h2>

        <Accordion defaultActiveKey={activeList}>
          <Accordion.Item eventKey="0">
            <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '0' ? style.activeP : ''}`}>{t('Profile')}</p></Accordion.Header>
            <Accordion.Body>
              {/* <p className={style.menuBody}>Setting</p> */}
              <ul className={style.menuList}>
                <li>     <Link to='/Profile' >{t('edit')}</Link></li>
                <li>  <Link to='/User-Guide' >{t('User Guide')}</Link></li>

              </ul>

            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '1' ? style.activeP : ''}`}>{t('Saved')}</p></Accordion.Header>
            <Accordion.Body>
              <ul className={style.menuList}>
                <li><Link to='/saved-blogs'>{t('Blogs')}</Link></li>

                <li><Link to='/saved-store'>{t('Shops and Services')}</Link></li>
                <li><Link to='/saved-accomodation'>{t('Rent')}</Link></li>
                <li><Link to='/saved-job'>{t('Jobs')}</Link></li>
                <li><Link to='/saved-product'>{t('Marketplace')}</Link></li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '2' ? style.activeP : ''}`}>{t('My posts')}</p></Accordion.Header>
            <Accordion.Body>
              <ul className={style.menuList}>
                <li><Link to='/my-business'>{t('My business')}</Link></li>
                <li><Link to='/my-housing'>{t('Rent')}</Link></li>
                <li><Link to='/my-job'>{t('Jobs')}</Link></li>
                <li><Link to='/my-product'>{t('Marketplace')}</Link></li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header className={style.accordionHeader}><p className={`${style.accordionTitle} ${activeList === '3' ? style.activeP : ''}`}>{t('Settings')}</p></Accordion.Header>
            <Accordion.Body>
              <ul className={style.menuList}>
                <li><Link to='/changePassword'>{t('Change password')}</Link></li>
                <li><Link to='/delete-account' className={style.menuDeleteAccount}>{t('Delete account')}</Link></li>
                <li className={style.menuSignOut} onClick={handleLogOut}>{t('Sign out')} </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

      </div>
    </>

  )
}

export default UserProfileMenu