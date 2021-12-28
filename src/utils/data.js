// Select Options
export const categoryOptions = [
  {
    label: 'Feature',
    value: 'Feature',
  },
  {
    label: 'Enhancement',
    value: 'Enhancement',
  },
  {
    label: 'Bug',
    value: 'Bug',
  },
];

export const statusOptions = [
  {
    label: 'Suggestion',
    value: 'Suggestion',
  },
  {
    label: 'Planned',
    value: 'Planned',
  },
  {
    label: 'In-Progress',
    value: 'In-Progress',
  },
  {
    label: 'Live',
    value: 'Live',
  },
];

// Validation messages
export const validationMessages = {
  type: {
    required: 'required',
    pattern: 'pattern',
    length: 'maxLength',
  },
  error: {
    empty: "Can't be empty",
    space: "Entered value can't start or contain only white spacing.",
    length: 'Max length exceeded.',
  },
};

// Status messages for Live Regions to allow assistive technologies to listen for changes and announce the updated messages when they happen.
export const operationStatus = {
  create: {
    running: 'Adding new feedback, please wait...',
    complete: 'New feedback added succesfully',
    failure:
      'We are having trouble trying to add your new feedback, please try again!',
  },
  edit: {
    running: 'Updating feedback, please wait...',
    complete: 'Feedback update successful',
    failure: ' er are having trouble updating your feedback, please try again!',
  },
  destroy: {
    running: 'Deleting feedback, please wait...',
    complete: 'Feedback delete successful',
    failure: ' are having trouble deleting your feedback, please try again!',
  },
};
