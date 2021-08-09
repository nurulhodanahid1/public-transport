import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import fakeData from '../../../fakeData';
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
                    <Col sm={4} id="search-field">
                    {search === false ?
                        <Form onSubmit={handleSearch}>
                            <p>Pick From ss</p>
                            <input type="text" onBlur={handleBlur} name="from" id="from" required />
                            <p>Pick To</p>
                            <input type="text" onBlur={handleBlur} name="to" id="to" required />
                            <br />
                            <input type="submit" value="Search" />
                        </Form>
                        :
                        <div className="search-result">
                            <h3>{field.from} to {field.to}</h3>
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight"><img width="50" src={img} alt={name} /></div>
                                <div className="p-2 bd-highlight">{name}</div>
                                <div className="p-2 bd-highlight"><FontAwesomeIcon icon={faUsers} /> {people}</div>
                                <div className="p-2 bd-highlight">${price}</div>
                            </div>
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight"><img width="50" src={img} alt={name} /></div>
                                <div className="p-2 bd-highlight">{name}</div>
                                <div className="p-2 bd-highlight"><FontAwesomeIcon icon={faUsers} /> {people}</div>
                                <div className="p-2 bd-highlight">${price}</div>
                            </div>
                            <div className="d-flex flex-row bd-highlight mb-3">
                                <div className="p-2 bd-highlight"><img width="50" src={img} alt={name} /></div>
                                <div className="p-2 bd-highlight">{name}</div>
                                <div className="p-2 bd-highlight"><FontAwesomeIcon icon={faUsers} /> {people}</div>
                                <div className="p-2 bd-highlight">${price}</div>
                            </div>
                        </div>}
                    </Col>
                    
                    <Col sm={8}>
                        <div className="map">
                            <iframe width="700" height="600" frameborder="0" scrolling="no" marginheight="0"        marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=900&amp;height=600&amp;hl=en&amp;q=%20Dhaka+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                            </iframe> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=664a6ce7caceb938169480d719e9ac094c9b589d'></script>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Destination;