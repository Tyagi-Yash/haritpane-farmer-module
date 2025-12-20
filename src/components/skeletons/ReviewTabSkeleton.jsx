function ReviewTabSkeleton() {
  return (
    <div className="tab-pane active">
      <div className="row">
        <div className="col-6">
          <div className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div
                  className="skeleton me-3"
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                ></div>
                <strong className="skeleton" style={{ height: "25px", width: "200px" }}></strong>
              </div>
              <div className="review-date skeleton" style={{ height: "25px", width: "90px" }}></div>
            </div>
            <div className="stars skeleton" style={{ height: "25px", width: "140px" }}></div>
            <div className="review-text skeleton" style={{ height: "95px", width: "100%" }}></div>
          </div>
        </div>
        <div className="col-6">
          <div className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div
                  className="skeleton me-3"
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                ></div>
                <strong className="skeleton" style={{ height: "25px", width: "200px" }}></strong>
              </div>
              <div className="review-date skeleton" style={{ height: "25px", width: "90px" }}></div>
            </div>
            <div className="stars skeleton" style={{ height: "25px", width: "140px" }}></div>
            <div className="review-text skeleton" style={{ height: "95px", width: "100%" }}></div>
          </div>
        </div>
        <div className="col-6">
          <div className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div
                  className="skeleton me-3"
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                ></div>
                <strong className="skeleton" style={{ height: "25px", width: "200px" }}></strong>
              </div>
              <div className="review-date skeleton" style={{ height: "25px", width: "90px" }}></div>
            </div>
            <div className="stars skeleton" style={{ height: "25px", width: "140px" }}></div>
            <div className="review-text skeleton" style={{ height: "95px", width: "100%" }}></div>
          </div>
        </div>
        <div className="col-6">
          <div className="review-card">
            <div className="review-header">
              <div className="reviewer-info">
                <div
                  className="skeleton me-3"
                  style={{ height: "50px", width: "50px", borderRadius: "50%" }}
                ></div>
                <strong className="skeleton" style={{ height: "25px", width: "200px" }}></strong>
              </div>
              <div className="review-date skeleton" style={{ height: "25px", width: "90px" }}></div>
            </div>
            <div className="stars skeleton" style={{ height: "25px", width: "140px" }}></div>
            <div className="review-text skeleton" style={{ height: "95px", width: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewTabSkeleton;
