import React from 'react';
import styles from '../styles/OptionsContainer.module.css';
import OptionSelector from './OptionSelector';
import {
    getCushionList,
    getLegList,
    getFootrestList,
    getPlacematList,
    getFloormatList
} from '../options';
import ThemeSelect from './ThemeSelect';

import Title from './Title';

export default function OptionsContainer ({ options, setOptions, shopifyData }) {

    // Update the selected option for a given property
    function updateSelection (property, value) {
        const newOptions = { ...options, [property]: value };
        setOptions(newOptions);
    }

    // Get the list of items for each option
    const cushionList = getCushionList(shopifyData.cushions);
    const legList = getLegList(shopifyData.legwraps);
    const footrestList = getFootrestList(shopifyData.footrests);
    const placematList = getPlacematList(shopifyData.placemats);
    const floormatList = getFloormatList(shopifyData.floormats);

    // Get the lowest and highest price from a list of items
    function getPriceRange (list) {
        const priceRange = list.reduce((acc, item) => {
            const price = item.price / 100
            if(price < acc.lowest) {
                acc.lowest = price;
            }
            if(price > acc.highest) {
                acc.highest = price;
            }
            return acc;
        }
            , { lowest: Infinity, highest: 0 });
        return priceRange;
    }

    // Check the placematList Prices for the lowest price and the hiest price
    const placematPriceRange = getPriceRange(placematList);
    const cushionPriceRange = getPriceRange(cushionList);
    const legsPriceRange = getPriceRange(legList);
    const footrestPriceRange = getPriceRange(footrestList);
    const floormatPriceRange = getPriceRange(floormatList);

    // Prices are displayed as a range if the lowest price is not equal to the highest price
    const cushion_price = cushionPriceRange.lowest !== cushionPriceRange.highest ? `+ $${ cushionPriceRange.lowest } - $${ cushionPriceRange.highest }` : `+ $${ cushionPriceRange.lowest }`;
    const placemat_price = placematPriceRange.lowest !== placematPriceRange.highest ? `+ $${ placematPriceRange.lowest } - $${ placematPriceRange.highest }` : `+ $${ placematPriceRange.lowest }`;
    const legs_price = legsPriceRange.lowest !== legsPriceRange.highest ? `+ $${ legsPriceRange.lowest } - $${ legsPriceRange.highest }` : `+ $${ legsPriceRange.lowest }`;
    const footrest_price = footrestPriceRange.lowest !== footrestPriceRange.highest ? `+ $${ footrestPriceRange.lowest } - $${ footrestPriceRange.highest }` : `+ $${ footrestPriceRange.lowest }`;
    const floormat_price = floormatPriceRange.lowest !== floormatPriceRange.highest ? `+ $${ floormatPriceRange.lowest } - $${ floormatPriceRange.highest }` : `+ $${ floormatPriceRange.lowest }`;

    return (
        <div className={styles.container}>
            <Title></Title>
            <OptionSelector
                title="select your cover"
                options={cushionList}
                selectedOption={options.cushion}
                changeSelection={updateSelection}
                property="cushion"
                search={true}
                thumbStyle="cropped"
                displayPrice={cushion_price}
            ></OptionSelector>
            <OptionSelector
                title="select your placemat"
                options={placematList}
                selectedOption={options.placemat}
                changeSelection={updateSelection}
                property="placemat"
                thumbStyle="fill"
                displayPrice={placemat_price}
            ></OptionSelector>

            <OptionSelector
                title="select your leg wraps"
                options={legList}
                selectedOption={options.legs}
                changeSelection={updateSelection}
                property="legs"
                thumbStyle="cropped-local"
                displayPrice={legs_price}
            ></OptionSelector>

            <OptionSelector
                title="select your footrest"
                options={footrestList}
                selectedOption={options.footrest}
                changeSelection={updateSelection}
                property="footrest"
                displayPrice={footrest_price}
            ></OptionSelector>

            <OptionSelector
                title="select your floormat"
                options={floormatList}
                selectedOption={options.floormat}
                changeSelection={updateSelection}
                property="floormat"
                thumbStyle="fill"
                displayPrice={floormat_price}
            ></OptionSelector>
        </div>
    );
}
