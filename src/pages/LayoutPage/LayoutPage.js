import React from 'react';
import Nav from '../../components/misc/Nav';
import { Outlet } from 'react-router-dom';

const LayoutPage = () => {
    return (
        <div>
            <Nav />
            <Outlet />
        </div>
    );
};

export default LayoutPage;
