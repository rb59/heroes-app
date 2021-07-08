import React from 'react';
import { HeroList } from '../heroes/HeroList';
// import PropTypes from 'prop-types';

const DcScreen = () => {
    return (
        <div>
            <h1>DC Screen</h1>
            <hr />
            <HeroList publisher="DC Comics"/>
        </div>
    );
};

// DcScreen.propTypes = {

// };

export default DcScreen;
