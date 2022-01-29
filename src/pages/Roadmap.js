import { useState, useEffect } from 'react';

function Roadmap() {
  const [feedbackPlanned, setFeedbackPlanned] = useState([]);
  const [feedbackInProgress, setFeedbackInProgress] = useState([]);
  const [feedbackLive, setFeedbackLive] = useState([]);

  const loadFeedback = async () => {
    try {
      const res = await fetch(`/api/getStatus`);
      const statusRes = await res.json();

      setFeedbackPlanned(statusRes.planned);
      setFeedbackInProgress(statusRes.inProgress);
      setFeedbackLive(statusRes.live);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return <div>Roadmap</div>;
}

export default Roadmap;
