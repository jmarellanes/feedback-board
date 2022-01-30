import { useState, useEffect } from 'react';

import Loader from '../components/Loader';
import FeedbackItem from '../components/FeedbackItem';
import Upvotes from '../components/Upvotes';

function Roadmap() {
  const [feedbackPlanned, setFeedbackPlanned] = useState([]);
  const [feedbackInProgress, setFeedbackInProgress] = useState([]);
  const [feedbackLive, setFeedbackLive] = useState([]);

  const loadFeedback = async (abortCont) => {
    try {
      const res = await fetch(`/api/getStatus`, { signal: abortCont.signal });
      const statusRes = await res.json();

      setFeedbackPlanned(statusRes.planned);
      setFeedbackInProgress(statusRes.inProgress);
      setFeedbackLive(statusRes.live);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const abortCont = new AbortController();

    loadFeedback(abortCont);

    return () => {
      abortCont.abort();
    };
  }, []);

  return (
    <div id='roadmap-page__wrapper'>
      <span>Placeholder for Top Bar</span>
      <main className='roadmap-page roadmap-page__content'>
        {!feedbackPlanned?.length ? (
          <Loader />
        ) : (
          <>
            <section className='roadmap-page__feedback-planned'>
              <h3 id='section-feedback-planned'>
                Planned ({feedbackPlanned.length})
              </h3>
              <p>Ideas prioritized for research</p>

              {feedbackPlanned.map((data) => {
                const fb = data.fields;

                return (
                  <FeedbackItem
                    title={fb.Title}
                    description={fb.Description}
                    category={fb.Category}
                    comments={fb.TotalComments}
                    key={fb.FeedbackId}
                    id={fb.FeedbackId}
                    link
                    categoryActive
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
              })}
            </section>
            <section className='roadmap-page__feedback-progress'>
              <h3 id='section-feedback-progress'>
                In-Progress ({feedbackInProgress.length})
              </h3>
              <p>Currently being developed</p>

              {feedbackInProgress.map((data) => {
                const fb = data.fields;

                return (
                  <FeedbackItem
                    title={fb.Title}
                    description={fb.Description}
                    category={fb.Category}
                    comments={fb.TotalComments}
                    key={fb.FeedbackId}
                    id={fb.FeedbackId}
                    link
                    categoryActive
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
              })}
            </section>
            <section className='roadmap-page__feedback-live'>
              <h3 id='section-feedback-live'>
                Live ({feedbackLive.length || 0})
              </h3>
              <p>Released features</p>

              {feedbackLive.map((data) => {
                const fb = data.fields;

                return (
                  <FeedbackItem
                    title={fb.Title}
                    description={fb.Description}
                    category={fb.Category}
                    comments={fb.TotalComments}
                    key={fb.FeedbackId}
                    id={fb.FeedbackId}
                    link
                    categoryActive
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
              })}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default Roadmap;
