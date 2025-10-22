// src/components/FeedbackForm.js
import React, { useState } from 'react';
import { submitFeedback } from '../utils/submitFeedback';

const FeedbackForm = ({ group, user }) => {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      user: user.displayName,
      email: user.email,
      groupMembers: group.names,
      theme: group.title,
      section: group.block,
      teacher: group.teachers,
      feedback: feedback,
      timestamp: new Date(),
    };

    try {
      await submitFeedback(data);
      setFeedback('');
      alert('Feedback submitted successfully!');
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert('Failed to submit feedback.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-3">
      <h5>Leave Feedback</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback here..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
