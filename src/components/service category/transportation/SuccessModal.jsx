export default function SuccessModal({ onClose }) {
  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        <h4>Request Created</h4>
        <p>
          Your transportation service request has been generated, we will notify you with the
          driver’s offers, you can then select the best offer.
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
