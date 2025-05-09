import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";

import useFetch from '../hooks/userFetch';
import { BASE_URL } from "../utils/config";

const Tours = () => {
  const [page, setPage] = useState(0); // Backend page index (0-based)
  const [pageCount, setPageCount] = useState(0); // Total pages

  // Fetch tours for current page
  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);

  // Fetch total tour count once
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    if (tourCount) {
      const totalPages = Math.ceil(tourCount / 8); // Assuming backend returns 8 items per page
      setPageCount(totalPages);
    }
    window.scrollTo(0, 0); // Scroll to top on page change
  }, [tourCount, page,tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md='6' sm='6'className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={`pagination-item ${page === number ? "active" : ""}`}
                      style={{ cursor: "pointer" }}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
