import { useState, useEffect } from 'react';

import FeedbackItem from '../components/FeedbackItem';
import Upvotes from '../components/Upvotes';
import FeedbackListRoadmap from '../components/FeedbackListRoadmap';
import Loader from '../components/Loader';

function Roadmap() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFeedback = async (abortCont) => {
    try {
      const res = await fetch(`/api/getStatus`, { signal: abortCont.signal });
      const statusRes = await res.json();

      setFeedback(() => [
        statusRes.planned,
        statusRes.inProgress,
        statusRes.live,
      ]);
    } catch (error) {
      console.log(error);
    }

    if (!abortCont.signal.aborted) setLoading(false);
  };

  useEffect(() => {
    const abortCont = new AbortController();

    loadFeedback(abortCont);

    return () => {
      abortCont.abort();
    };
  }, []);

  const Feedback = (feedbackData) =>
    feedbackData.map((data) => {
      const fb = data.fields;

      return (
        <FeedbackItem
          title={fb.Title}
          description={fb.Description}
          category={fb.Category}
          comments={fb.TotalComments}
          key={fb.FeedbackId}
          id={fb.FeedbackId}
          status={fb.Status}
          link
          categoryActive
          roadmapFeedback
        >
          <Upvotes
            upvotedBy={fb.UpvotedBy ? fb.UpvotedBy : []}
            id={fb.FeedbackId}
            // updateUpvotesParentState={updateUpvotesParentState}
          >
            {fb.TotalUpvotes}
          </Upvotes>
        </FeedbackItem>
      );
    });

  const feedbackList = feedback.map((data, index) => {
    const info = [
      { status: 'Planned', description: 'Ideas prioritized for research' },
      { status: 'In-Progress', description: 'Currently being developed' },
      { status: 'Live', description: 'Released features' },
    ];

    return (
      <FeedbackListRoadmap
        status={info[index]['status']}
        desc={info[index]['description']}
        length={data.length}
        key={info[index]['status']}
      >
        {Feedback(data)}
      </FeedbackListRoadmap>
    );
  });

  return (
    <div id='roadmap-page__wrapper'>
      <span>Placeholder for Top Bar</span>
      <main className='roadmap-page roadmap-page__content'>
        {loading ? <Loader type='feedback-roadmap' /> : feedbackList}
      </main>
    </div>
  );
}

export default Roadmap;
