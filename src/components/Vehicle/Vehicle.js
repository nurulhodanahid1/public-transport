import React from 'react';
import { Container } from 'react-bootstrap';
import "./Vehicle.css"

const Vehicle = (props) => {
    const { name, img } = props.vehicle;
    const handleVehicleSelect = props.handleVehicleSelect;
    
    return (
        <Container>
            <div onClick={() => handleVehicleSelect()} className="vehicle-container">
                <div className="vehicle">
                    <p><img src={img} alt={name} /></p>
                    <h3>{name}</h3>
                </div>
            </div>
        </Container>
    );
};

export default Vehicle;