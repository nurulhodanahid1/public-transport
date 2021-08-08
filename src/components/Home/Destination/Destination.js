import React from 'react';
import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import "./Destination.css";

const Destination = () => {
    const [search, setSearch] = useState("")
    const [field, setField] = useState({
        from : "",
        to : ""
    })
    const handleBlur = (e) => {
        const fieldInfo = {...field};
        fieldInfo[e.target.name] = e.target.value;
        setField(fieldInfo);
    }
    const handleSearch = (e) => {
        setSearch(`${field.from}to${field.to}`)
        document.getElementById("search-field").style.display = "none";
        document.getElementById("search-result").style.display = "block";
        e.preventDefault();
    }
    return (
        <div>
            <Container>
                <Row>
                    <Col sm={4} id="search-field">
                        <Form onSubmit={handleSearch}>
                            <p>Pick From</p>
                            <input type="text" onBlur={handleBlur} name="from" id="from" required/>
                            <p>Pick To</p>
                            <input type="text" onBlur={handleBlur} name="to" id="to" required/>
                            <br />
                            <input type="submit" value="Search" />
                        </Form>
                    </Col>
                    <Col sm={4} id="search-result">
                        <h3>{field.from} to {field.to}</h3>
                    </Col>
                    <Col sm={8}>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis laudantium cum sit voluptas tenetur, non commodi quibusdam rem itaque porro.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Destination;