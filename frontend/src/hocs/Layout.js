import React from 'react';
import Navbar from '../desing-system/components/Navbar';

const layout = (props) => (
    <div>
        <Navbar />
        {props.children}
    </div>
);

export default layout;