import React from 'react';
import styles from '../styles/Container.module.css';
import ChairViewer from './ChairViewer';
import OptionsContainer from './OptionsContainer';
import Cart from './Cart';
import { clearCart } from '../utils/api';

export const CUSHION_TYPE = 'IKEA Cushion Cover';
export const VEGAN_CUSHION_TYPE = 'Vegan Leather Cushion Cover';
export const PATTERN_VEGAN_COVER_TYPE = 'Pattern Vegan Leather Cover';
export const FOOTREST_TYPE = 'IKEA Footrest';
export const LEG_WRAPS_TYPE = 'IKEA Leg Wraps';
export const PLACEMAT_TYPE = 'IKEA Placemat';
export const FLOORMAT_TYPE = 'Floor Mat';
export const CUSHION_INSERT = 'IKEA Cushion';

export default function Container () {
    const [options, setOptions] = React.useState({
        footrest: {},
        cushion: {},
        legs: {},
        placemat: {},
        floormat: {},
        insert: {}
    });

    const products = window._collection.products;
    const cushions = [];
    const placemats = [];
    const legwraps = [];
    const footrests = [];
    const floormats = [];

    for(const id in products) {
        switch(products[id].type) {
            case CUSHION_TYPE:
                cushions.push(products[id]);
                break;
            case FOOTREST_TYPE:
                footrests.push(products[id]);
                break;
            case LEG_WRAPS_TYPE:
                if(!products[id].title.includes('Older')) {
                    legwraps.push(products[id]);
                }
                break;
            case PLACEMAT_TYPE:
                placemats.push(products[id]);
                break;
            case FLOORMAT_TYPE:
                floormats.push(products[id]);
                break;
        }
    }

    const veganCushions = []
    for(const id in products) {
        switch(products[id].type) {
            case VEGAN_CUSHION_TYPE:
                veganCushions.push(products[id]);
                break;
        }
    }

    const veganPatterns = []
    for(const id in products) {
        switch(products[id].type) {
            case PATTERN_VEGAN_COVER_TYPE:
                veganPatterns.push(products[id]);
                break;
        }
    }

    cushions.push(...veganCushions);

    cushions.push(...veganPatterns);

    const shopifyData = {
        cushions,
        placemats,
        legwraps,
        footrests,
        floormats
    };

    // console.log('shopifyData', shopifyData.cushions)

    const cushionInsert = shopifyData?.cushions.filter(
        item => item.title === 'Cushion Insert' && item.available === true
    );

    return (
        <div>
            {/* <button onClick={clearCart}>Dev: clear cart</button> */}
            <div className={styles.container}>
                <OptionsContainer
                    shopifyData={shopifyData}
                    options={options}
                    setOptions={setOptions}
                ></OptionsContainer>
                <ChairViewer options={options}></ChairViewer>
            </div>
            <Cart
                options={options}
                cushionInsert={cushionInsert.length ? cushionInsert[0] : null}
                setOptions={setOptions}
            ></Cart>
            <div className={styles.notification}>
                *IKEA highchair not included
            </div>
        </div>
    );
}
