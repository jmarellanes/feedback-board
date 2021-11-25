function CreateFeedback({ onClick }) {
  return (
    <>
      <h1>Create Feedback</h1>
      <div className='buttons'>
        <button onClick={onClick}>Close</button>
      </div>
    </>
  );
}

export default CreateFeedback;
