import React from 'react';
import { HeroList } from '../heroes/HeroList';
// import PropTypes from 'prop-types';
// cd
const MarvelScreen = () => {
    return (
        <div>
            <h1>Marvel Screen</h1>
            <hr />
            <HeroList publisher="Marvel Comics"/>
        </div>
    );
};

// MarvelScreen.propTypes = {

// };

export default MarvelScreen;
