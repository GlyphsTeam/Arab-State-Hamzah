import { LazyLoadImage } from 'react-lazy-load-image-component'
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import style from '../../assets/style/formStyle/addbuinsesFrom.module.css'
import uploadBlack from '../../assets/Images/uploadBlack.png'
import { memo } from "react";

const ImageSelector = memo(({ handlerDrop, textButton, uploadStyle, uploadedImage }) => {
    const [t] = useTranslation();
    return (
        <Dropzone onDrop={handlerDrop}>
            {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                    <input {...getInputProps()} required accept="image/*" />
                    <div className={style[uploadStyle]}>
                        <LazyLoadImage
                            src={!uploadedImage ? uploadBlack : URL.createObjectURL(uploadedImage)}
                            alt="uploadImageform"
                            style={{ marginTop: '-10px' }}
                        />
                        {textButton && <p>{t(`${textButton}`)}</p>}
                    </div>
                </div>
            )}
        </Dropzone>
    )
})

export default ImageSelector
