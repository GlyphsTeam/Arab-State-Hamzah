import React, { useState, useEffect } from 'react'
import style from '../../assets/style/userProfile/userProfile.module.css';
import { useTranslation } from "react-i18next";
// import editing from '../../assets/images/userProfile/editing.png'
import editing from '../../assets/Images/editing.png'
import moment from 'moment';
import { Link } from "react-router-dom";
import { LazyLoadImage } from 'react-lazy-load-image-component'

function UserProfile({ userData }) {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const todaysDate = moment(currentDate).format('YYYY-MM-DD');
  const [send, setSend] = useState(false);

  const [data, setData] = useState({ image: '', user_name: '', email: '', phone_number: '', gender: '', birth_date: '' });
  const [cancelData, setCancelData] = useState({ image: '', user_name: '', email: '', phone_number: '', gender: '', birth_date: '' });
  const [editProfile, setEditProfile] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState();

  let formData = new FormData();
  data.image && formData.append('photo', data.image);
  data.user_name && formData.append('name', data.user_name);
  data.email && formData.append('email', data.email);
  data.phone_number && formData.append('phone_number', data.phone_number);
  data.gender && formData.append('gender', data.gender);
  data.birth_date && formData.append('birth_date', data.birth_date);



  useEffect(() => {
    setData({
      image: userData?.photo || '',
      user_name: userData?.name || '',
      email: userData?.email || '',
      phone_number: userData?.phone_number || '',
      gender: userData?.gender || '',
      birth_date: userData?.birth_date || ''
    });
    setCancelData({
      image: userData?.photo || '',
      user_name: userData?.name || '',
      email: userData?.email || '',
      phone_number: userData?.phone_number || '',
      gender: userData?.gender || '',
      birth_date: userData?.birth_date || ''
    });
  }, [userData]);


  function handleImageChange(event) {
    setData({ ...data, image: event.target.files[0] });
    setEditedPhoto(event.target.files[0]);
    setEditProfile(true)
  }

  const handleChange = (e) => {
    const { value, name } = e.target;

    setData({ ...data, [name]: value });

  }

  const genderClick = (e) => {
    setData({ ...data, gender: e });
  }

  const editClick = () => {
    setEditProfile(true)
  }
  const cancelClick = () => {
    setData({
      image: cancelData.image,
      user_name: cancelData.name,
      email: cancelData.email,
      phone_number: cancelData.phone_number,
      gender: cancelData.gender,
      birth_date: cancelData.birth_date
    });
    setEditProfile(false)
    setEditedPhoto('')
  }
  const saveClick = () => {
    setSend(true);

    setTimeout(() => {
      setSend(false);
    }, 100);

    setEditProfile(false)
  }


  return (
    <>
      <div className={`container ${style.userContainer}`}>
        <div className={`row ${style.userProfileRow}`}>
          <div className={`col-lg-4 col-md-6 col-sm-12  ${style.userProfileImageDiv}`} >
            <LazyLoadImage className={style.userImage} src={editedPhoto ? URL.createObjectURL(editedPhoto) : data.image} alt='UserImage' />

            <div className={style.editIconContainer}>
              <label
                className={
                  i18n.language === "en" ? style.editLabel : style.editLabelAr
                }
                htmlFor="imageInput"
              >
                <LazyLoadImage src={editing} alt="Edit" className={style.editIcon} />
              </label>

              <input
                type="file"
                id="imageInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

            </div>
          </div>
          <div className='col-lg-8 col-md-6 col-sm-12'>
            <form>
              <input readOnly={editProfile ? false : true} className={style.userProfileInput} type='text' name='user_name' placeholder='User Name' value={data.user_name} onChange={handleChange} />

              <input readOnly className={style.userProfileInput} type='text' name='email' placeholder='Email' value={data.email} onChange={handleChange} />

              <input readOnly={editProfile ? false : true} className={style.userProfileInput} type='text' name='phone_number' placeholder='Phone Number' value={data.phone_number} onChange={handleChange} />

              <input readOnly={editProfile ? false : true} className={style.userProfileInput} type='date' name='birth_date' placeholder='User Name' value={data.birth_date} max={todaysDate} onChange={handleChange} />

              <p className={style.userProfileGender}>{t('Gender')}</p>
              <div className={style.genderDiv}>
                <span className={`${style.genderMenu} ${data.gender === 'female' ? style.activeGender : ''} ${editProfile ? '' : style.mouseNotActive}`} onClick={() => genderClick('female')}>{t('Female')}</span>
                <span className={`${style.genderMenu} ${data.gender === 'male' ? style.activeGender : ''} ${editProfile ? '' : style.mouseNotActive}`} onClick={() => genderClick('male')}>{t('Male')}</span>
              </div>

              {!editProfile && (
                <button className={style.editBtn} onClick={() => editClick()}>{t('Edit Profile')}</button>
              )}
              <Link className={style.editBtn} to="/add-business" >
                Add Business              </Link>
              {editProfile && (
                <div className={style.saveDiv}>
                  <span className={`${style.saveMenu}`} onClick={() => saveClick()}>{t('Save')}</span>

                  <span className={`${style.cancelMenu}`} onClick={() => cancelClick()}>{t('Cancel')}</span>
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </>
  )
}

export default UserProfile