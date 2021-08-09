import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";
import fakeData from '../../fakeData/index';
import { useState } from 'react';
import Vehicle from '../Vehicle/Vehicle';
import { useHistory } from 'react-router-dom';

const Header = () => {
    const [vehicles, setVehicles] = useState(fakeData);
    const history = useHistory()
    const handleVehicleSelect = (id) => {
        history.push("/destination/"+id);
    }

    return (
        <div className="header-bg">
            {
                vehicles.map(vehicle => <Vehicle vehicle={vehicle} handleVehicleSelect={handleVehicleSelect} key={vehicle.id}></Vehicle>)
            }
        </div>
    );
};

export default Header;