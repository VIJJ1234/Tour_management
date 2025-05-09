import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tour-details.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import Booking from "../components/Booking/Booking";
import avatar from "../assets/images/avatar.jpg";
import Newsletter from "../shared/Newsletter";
import useFetch from "../hooks/userFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!tour) {
    return (
      <Container>
        <h4 className="text-center pt-5">Tour Not Found</h4>
      </Container>
    );
  }

  const {
    photo,
    title,
    desc,
    price,
    reviews,
    city,
    address,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) {
        alert("Please sign in to submit a review.");
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important!
        body: JSON.stringify(reviewObj),
      });
      

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }

      alert(result.message);
      reviewMsgRef.current.value = "";
    } catch (err) {
      alert("Failed to submit review: " + err.message);
    }
  };

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt="Tour" />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="d-flex align-items-center gap-1">
                        <i
                          className="ri-star-s-fill"
                          style={{ color: "var(--secondary-color)" }}
                        ></i>
                        {avgRating === 0 ? "Not Rated" : `${avgRating} (${reviews?.length})`}
                      </span>
                      <span>
                        <i className="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>
                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line"></i> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line"></i> ${price}/per person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line"></i> {distance} km
                      </span>
                      <span>
                        <i className="ri-group-line"></i> {maxGroupSize} people
                      </span>
                    </div>

                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({reviews?.length} reviews)</h4>
                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            onClick={() => setTourRating(index + 1)}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="ri-star-s-fill"></i>
                          </span>
                        ))}
                      </div>
                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="Share your thoughts"
                          required
                        />
                        <button className="btn primary__btn text-white" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review, index) => (
                        <div className="review__item" key={index}>
                          <img src={avatar} alt="avatar" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <h5>{review.username || "Anonymous"}</h5>
                              <span className="d-flex align-items-center">
                                {review.rating} <i className="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <p>{new Date(review.createdAt || Date.now()).toLocaleDateString("en-US", options)}</p>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>
              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default TourDetails;
