export default function SuccessModal({ onClose }) {
  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        <h4>Request Created</h4>
        <p>
          Your booking order is created successfully, We will notify the response from the vendor
          soon in the Progress section.
        </p>
        <button className="btn btn-primary" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
