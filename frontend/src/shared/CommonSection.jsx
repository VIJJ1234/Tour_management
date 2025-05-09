import React from "react";
import PropTypes from "prop-types";
import "./common-section.css";

import { Container, Row, Col } from "reactstrap";

const CommonSection = ({ title = "Default Title" }) => {
  return (
    <section className="common__section">
      <Container>
        <Row>
          <Col lg="12">
            <h1 className="common__section-title">{title}</h1>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

CommonSection.propTypes = {
  title: PropTypes.string.isRequired,
};

CommonSection.defaultProps = {
  title: "Default Title",
};

export default CommonSection;
