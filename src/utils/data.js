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
};
