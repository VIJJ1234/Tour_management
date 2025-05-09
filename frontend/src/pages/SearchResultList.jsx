import React, { useEffect, useState } from "react";
import CommonSection from "./../shared/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import TourCard from "./../shared/TourCard";

import Newsletter from "../shared/Newsletter";

const SearchResultList = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");
  const distance = queryParams.get("distance");
  const maxGroupSize = queryParams.get("maxGroupSize");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/tours/search/getTourBySearch?city=${city}&distance=${distance}&maxGroupSize=${maxGroupSize}`
        );
        const result = await res.json();

        if (res.ok) {
          setData(result.data);
        } else {
          alert("Something went wrong: " + result.message);
        }
      } catch (err) {
        alert("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [city, distance, maxGroupSize]);

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {loading && <h4>Loading...</h4>}
            {!loading && data.length === 0 && <h4>No tours found.</h4>}
            {!loading &&
              data.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
          </Row>
        </Container>
      </section>
      <Newsletter/>
    </>
  );
};

export default SearchResultList;
