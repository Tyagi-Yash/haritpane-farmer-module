import profile from "../../assets/images/profile.png";
import RamPrasadSingh from "../../assets/images/RamPrasadSingh.svg";
import BhagwanSinghRathore from "../../assets/images/BhagwanSinghRathore.png";
import RameshYadav from "../../assets/images/RameshYadav.png";
import closeIcon from "../../assets/images/close-icon.svg";
import ChatsNavbar from "../../components/chats/ChatsNavbar";
import TopbarModal from "../../components/common components/TopbarModal";

function ChatsReviewSection() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <TopbarModal titleBox={false} profile={profile} />
          <div className="chat dashboard">
            <div className="TitleBox top-bar mb-0 mt-0">
              <h4 className="main-heading">Chats</h4>
              <div className="d-flex align-items-center">
                <select className="form-control w-100 me-3">
                  <option>Sort by</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
                <div className="yellow-btn">
                  <a href="#" data-bs-toggle="modal" data-bs-target="#myModal">
                    <span>
                      <i className="fa-solid fa-plus" />
                    </span>{" "}
                    Share Experience
                  </a>
                </div>
              </div>
            </div>
            <ChatsNavbar />
            <div className="tab-content">
              <div className="tab-pane active" id="review">
                <div className="row">
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Ram Prasad Singh</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={BhagwanSinghRathore} alt="User Photo" />
                          <strong>Bhagwan Singh Rathore</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RameshYadav} alt="User Photo" />
                          <strong>Ramesh Yadav</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Ram Prasad Singh</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Ram Prasad Singh</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={BhagwanSinghRathore} alt="User Photo" />
                          <strong>Bhagwan Singh Rathore</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RameshYadav} alt="User Photo" />
                          <strong>Ramesh Yadav</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <img src={RamPrasadSingh} alt="User Photo" />
                          <strong>Ram Prasad Singh</strong>
                        </div>
                        <div className="review-date">20/05/2025</div>
                      </div>
                      <div className="stars">★ ★ ★ ★ ★</div>
                      <div className="review-text">
                        “Booked a tractor through HaritPane for ploughing my field. The driver arrived on
                        time, and the work was done smoothly. Highly reliable service!”
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal share-experience" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <img src={closeIcon} data-bs-dismiss="modal" alt />
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <h4 className="modal-title text-center main-heading mb-4">How was the Service</h4>
              <div className="star-rating">
                <input type="radio" name="rating" id="star1" />
                <label htmlFor="star1">
                  <i className="fa-solid fa-star"> </i>
                  <br />
                  <small>Very Bad</small>
                </label>
                <input type="radio" name="rating" id="star2" />
                <label htmlFor="star2">
                  <i className="fa-solid fa-star" />
                  <br />
                  <small>Bad</small>
                </label>
                <input type="radio" name="rating" id="star3" />
                <label htmlFor="star3">
                  <i className="fa-solid fa-star" />
                  <br />
                  <small>Average</small>
                </label>
                <input type="radio" name="rating" id="star4" />
                <label htmlFor="star4">
                  <i className="fa-solid fa-star" />
                  <br />
                  <small>Good</small>
                </label>
                <input type="radio" name="rating" id="star5" />
                <label htmlFor="star5">
                  <i className="fa-solid fa-star" />
                  <br />
                  <small>Great</small>
                </label>
              </div>
              <select name id className="form-control">
                <option value selected disabled>
                  Select from Vendors*
                </option>
                <option value>Vendor 1</option>
                <option value>Vendor 2</option>
              </select>
            </div>
            <div className="m-3">
              <textarea
                className="form-control"
                rows={4}
                maxLength={100}
                placeholder="Write a Review..."
                defaultValue={""}
              />
              <div className="text-end small mt-1">
                <span id="charCount">0</span>/100
              </div>
            </div>
            {/* Modal footer */}
            <div className="modal-footer yellow-btn">
              <a href="#" data-bs-dismiss="modal">
                {" "}
                Post Rating &amp; Review{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatsReviewSection;
