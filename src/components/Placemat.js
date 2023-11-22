import React from 'react';
import styles from '../styles/Placemat.module.css';
import EmptyImage from '../images/empty.png';
import Shadow from '../images/Placemat_Shadow.png';

export default function Placemat ({ placemat }) {
    if(placemat?.metafields?.placemat_image !== undefined) {
        return (
            <div className={styles.container} id="placemat-container">
                <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 800 800" width="530px" height="530px">
                    <defs>
                        <path id="placemat-path" d="M755.2,361.9l-55.5,53.3l-299.7-16l78.4-51l19.7,0.3c0,0-16.3,10.5-18.9,12.4c-2.5,1.8-2.1,4.1-2.1,9.8 c0,0-1.4,0.3-1.5,1.5c-0.1,0.8,0.3,1.9,3.6,2.8c3.4,0.9,9.2,2.5,35.1,3.6c26.7,1.2,115.6,5.8,147.7,7.5c23,1.2,39.3,1.6,49.5-7.2 c8.4-7.2,20.5-18.4,20.5-18.4L755.2,361.9z"></path>
                        <image href="" x="0" y="0" width="1276" height="230"></image>

                        {/* Clipping path used to trim unwanted parts of the image */}
                        <clipPath id="placemat-clip">
                            <use xlinkHref="#placemat-path"></use>
                        </clipPath>
                    </defs>

                    {/* Draw the image clipped to the frame shape */}
                    <image xlinkHref={placemat.metafields.placemat_image_src} x="50%" y="44%" width="44%" height="8%" preserveAspectRatio="xMidYMid slice" clipPath="url(#placemat-clip)"></image>

                    {/* Draw the frame on top of the image */}
                    <use xlinkHref="#frame-path" className="frame"></use>
                    <img src={Shadow} alt="" className={styles.shadow} />
                </svg>
            </div>
        )
    }
    if(!placemat?.metafields?.placematcolor) {
        return null;
    }

    return (
        <div className={styles.container} id="placemat-container">
            <svg
                version="1.1"
                id="Layer_1"
                x="0px"
                y="0px"
                viewBox="0 0 800 800"
                width="530px"
                height="530px"
            >
                <path
                    fill={`rgb(${ placemat?.metafields?.placematcolor })`}
                    stroke={`rgb(${ placemat?.metafields?.placematcolor })`}
                    d="M755.2,361.9l-55.5,53.3l-299.7-16l78.4-51l19.7,0.3c0,0-16.3,10.5-18.9,12.4c-2.5,1.8-2.1,4.1-2.1,9.8
	c0,0-1.4,0.3-1.5,1.5c-0.1,0.8,0.3,1.9,3.6,2.8c3.4,0.9,9.2,2.5,35.1,3.6c26.7,1.2,115.6,5.8,147.7,7.5c23,1.2,39.3,1.6,49.5-7.2
	c8.4-7.2,20.5-18.4,20.5-18.4L755.2,361.9z"
                />
            </svg>
            <img src={Shadow} alt="" className={styles.shadow} />
        </div>
    );
}
