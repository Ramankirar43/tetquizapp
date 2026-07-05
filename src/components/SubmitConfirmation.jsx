import React from 'react';

export default function SubmitConfirmation({ 
  isOpen, 
  attemptedCount, 
  notAttemptedCount, 
  reviewCount,
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Submit Test?</h2>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to submit? You cannot change your answers after submission.</p>
          <div className="modal-stats">
            <p><strong>Attempted:</strong> {attemptedCount}</p>
            <p><strong>Not Attempted:</strong> {notAttemptedCount}</p>
            <p><strong>Marked for Review:</strong> {reviewCount}</p>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={onConfirm}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
