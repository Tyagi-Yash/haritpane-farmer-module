import React from "react";

function TransportationBookYourService() {
  return (
    <>
      <div className="WrapperArea">
        <div className="WrapperBox">
          <div className="topbar">
            <div className="TitleBox">
              <div className="TitleBox-top-bar">
                <span>
                  <a className="back-circle-navbar" href="service-category.html">
                    <i className="fa-solid fa-arrow-left" />
                  </a>
                </span>
                <h4 className="book-heading d-flex align-items-center">
                  <span className="top-icon-image">
                    <img src="assets/images/Transportation-icon.png" alt />
                  </span>
                  Transportation
                </h4>
              </div>
            </div>
            <div className="right-section">
              <div className="search-box">
                <input className="form-control" type="text" placeholder="Search Services..." />
                <i className="fas fa-search search-icon" />
              </div>
              <i className="far fa-bell bell-icon" />
              <div className="profile">
                <img src="assets/images/profile.png" alt="Profile" />
                <span className="username">Ramesh</span>
              </div>
            </div>
          </div>
          <div className="dashboard">
            <form action>
              <div className="option-wrapper">
                <div className="form-section">
                  <h5 className="book-heading">Book your service</h5>
                  {/* <div class="row g-3">
    
            <div class="col-md-6">
              <select name="" id="" class="form-control">
                <option value="" disabled selected>
                  Select goods for your transport*
                </option>
                <option value="" class="form-control">Vegetable</option>
                <option value="" class="form-control">Cattle</option>
                <option value="" class="form-control">Equipment's</option>
                <option value="" class="form-control">Other</option>
              </select>
            </div>

            <div class="col-md-6">
              <select name="" id="" class="form-control">
                <option value="" disabled selected>
                  Select type of vegetable*
                </option>
                <option value="" class="form-control">
                  Leafy Vegetable- Stack
                </option>
                <option value="" class="form-control">
                  Tomato, Cucumber- Crate
                </option>
                <option value="" class="form-control">
                  Onion, Potato- Stack
                </option>
                <option value="" class="form-control">
                  Cabbage, Cauliflower- Mesh Sack
                </option>
                <option value="" class="form-control">
                  Grains- Sack
                </option>
              </select>
            </div>

            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Number of cattle*"
              />
            </div>
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Equipment Dimension*"
              />
            </div>
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Equipment Weight*"
              />
            </div>
            <div class="col-md-6">
              <input
                type="text"
                class="form-control"
                placeholder="Weight of Object*"
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                placeholder="Current location*"
                class="form-control"
              />
            </div>
            <div class="col-md-3">
              <input
                type="text"
                placeholder="Travel location*"
                class="form-control"
              />
            </div>

            <div class="col-md-6">
              <select name="" id="" class="form-control">
                <option value="" disabled selected>
                  Type of vehicle*
                </option>
                <option value="" class="form-control">
                  Tata Ace Mahindra Maximo
                </option>
                <option value="" class="form-control">
                  Tata Ace ZIP- Mahindra Jeeto
                </option>
                <option value="" class="form-control">
                  Tractor- Trolly
                </option>
                <option value="" class="form-control">
                  Bolero Pickup
                </option>
              </select>
            </div>
          </div> */}
                  <div className="row g-3">
                    {/* Goods Type Selector */}
                    <div className="col-md-6">
                      <select id="goodsType" className="form-control">
                        <option value disabled selected>
                          Select goods for your transport*
                        </option>
                        <option value="vegetable">Vegetable</option>
                        <option value="cattle">Cattle</option>
                        <option value="equipment">Equipment's</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {/* Vegetable: Type */}
                    <div className="col-md-6 hidden" id="vegetableTypeGroup">
                      <select className="form-control">
                        <option value disabled selected>
                          Select type of vegetable*
                        </option>
                        <option>Leafy Vegetable - Stack</option>
                        <option>Tomato, Cucumber - Crate</option>
                        <option>Onion, Potato - Stack</option>
                        <option>Cabbage, Cauliflower - Mesh Sack</option>
                        <option>Grains - Sack</option>
                      </select>
                    </div>
                    {/* Cattle */}
                    <div className="col-md-6 hidden" id="cattleCountGroup">
                      <input type="text" className="form-control" placeholder="Number of cattle*" />
                    </div>
                    {/* Equipment */}
                    <div className="col-md-6 hidden" id="equipDimGroup">
                      <input type="text" className="form-control" placeholder="Equipment Dimension*" />
                    </div>
                    <div className="col-md-6 hidden" id="equipWeightGroup">
                      <input type="text" className="form-control" placeholder="Equipment Weight*" />
                    </div>
                    {/* Other */}
                    <div className="col-md-6 hidden" id="objectWeightGroup">
                      <input type="text" className="form-control" placeholder="Weight of Object*" />
                    </div>
                    {/* Common: Location */}
                    <div className="col-md-6 hidden" id="currentLocationGroup">
                      <input type="text" className="form-control" placeholder="Current location*" />
                    </div>
                    <div className="col-md-6 hidden" id="travelLocationGroup">
                      <input type="text" className="form-control" placeholder="Travel location*" />
                    </div>
                    {/* Common: Vehicle Type */}
                    <div className="col-md-6 hidden" id="vehicleTypeGroup">
                      <select className="form-control">
                        <option value disabled selected>
                          Type of vehicle*
                        </option>
                        <option>Tata Ace Mahindra Maximo</option>
                        <option>Tata Ace ZIP - Mahindra Jeeto</option>
                        <option>Tractor - Trolly</option>
                        <option>Bolero Pickup</option>
                      </select>
                    </div>
                  </div>
                  <h5 className="book-heading">Book Services date &amp; time</h5>
                  <div className="row g-3">
                    {/* From Date */}
                    <div className="col-md-6">
                      <input type="date" className="form-control" required />
                    </div>
                    {/* Till Date */}
                    <div className="col-md-6">
                      <input type="date" className="form-control" required />
                    </div>
                    {/* From Time */}
                    <div className="col-md-6">
                      <input type="time" className="form-control" required />
                    </div>
                    {/* From Time */}
                    <div className="col-md-6">
                      <input type="time" className="form-control" required />
                    </div>
                  </div>
                </div>
              </div>
              <div className="available-service-btn">
                <a href="transportation-change-availablity.html">See Available Service</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransportationBookYourService;
