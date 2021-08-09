import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import "./Destination.css";

const Destination = () => {
    const { vehicleId } = useParams();
    const vehicleDetail = fakeData.find(vehicle => vehicle.id === parseInt(vehicleId));
    const { name, img, price, people } = vehicleDetail;

    const [search, setSearch] = useState(false);
    const [field, setField] = useState({
        from: "",
        to: ""
    })
    const handleBlur = (e) => {
        const fieldInfo = { ...field };
        fieldInfo[e.target.name] = e.target.value;
        setField(fieldInfo);
    }
    const handleSearch = (e) => {
        setSearch(true);
        e.preventDefault();
    }
    return (
        <div>

            <Container>
                <Row>
                    <Col  className="search-field">
                        {search === false ?
                            <Form onSubmit={handleSearch} className="search-form">
                                <p>Pick From</p>
                                <input type="text" onBlur={handleBlur} name="from" id="from" required />
                                <p>Pick To</p>
                                <input type="text" onBlur={handleBlur} name="to" id="to" required />
                                <br />
                                <input style={{marginTop:"20px"}} type="time" id="time" name="time"></input>
                                <br />
                                <input style={{marginTop:"20px"}} type="date" id="date" name="date"></input>
                                <input className="login-button" type="submit" value="Search" />
                            </Form>
                            :
                            <div className="search-result">
                                <div className="d-flex">
                                    <div id="from-to-line"></div>
                                    <div>
                                        <p>{field.from}</p>
                                        <p>{field.to}</p>
                                    </div>
                                </div>
                                <div className="d-flex bg flex-row bd-highlight mb-3">
                                    <div className="p-2 bd-highlight"><img width="50" src={img} alt={name} /></div>
                                    <div className="p-2 bd-highlight">{name}</div>
                                    <div className="p-2 bd-highlight"><FontAwesomeIcon icon={faUsers} /> {people}</div>
                                    <div className="p-2 price bd-highlight">${price}</div>
                                </div>
                                <div className="d-flex bg flex-row bd-highlight mb-3">
                                    <div className="p-2 bd-highlight"><img width="50" src={img} alt={name} /></div>
                                    <div className="p-2 bd-highlight">{name}</div>
                                    <div className="p-2 bd-highlight"><FontAwesomeIcon icon={faUsers} /> {people}</div>
                                    <div className="p-2 price bd-highlight">${price}</div>
                                </div>
                                <div className="d-flex bg flex-row bd-highlight mb-3">
                                    <div className="p-2 bd-highlight"><img width="50" src={img} alt={name} /></div>
                                    <div className="p-2 bd-highlight">{name}</div>
                                    <div className="p-2 bd-highlight"><FontAwesomeIcon icon={faUsers} /> {people}</div>
                                    <div className="p-2 price bd-highlight">${price}</div>
                                </div>
                            </div>}
                    </Col>

                    <Col >
                        <div className="map-area">
                        <div className="map">
                            <iframe width="700" height="550" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=900&amp;height=600&amp;hl=en&amp;q=%20Dhaka+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            </iframe> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=664a6ce7caceb938169480d719e9ac094c9b589d'></script>
                        </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Destination;