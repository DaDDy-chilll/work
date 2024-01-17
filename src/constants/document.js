export const TYPES = {
  EXPENSE: 'EXPENSE',
  ADVANCED: 'ADVANCED',
};

export const ACTIONS = {
  APPROVE: 'approve',
  REJECT: 'reject',
  VERIFY: 'verify',
  COMMENT: 'comment',
  FORWARD: 'forward',
};

export const DOCUMENT_STATUSES = {
  VERIFIED: 'VERIFIED',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ACKNOWLEDGED: 'ACKNOWLEDGED',
  PREPARED: 'PREPARED',
  EDITED: 'EDITED',
  SUBMITTED: 'SUBMITTED',
  REQUESTED_REVISION: 'REQUESTED_REVISION', // Higher level department requests for more info
  REVISED: 'REVISED',
  COMMENTED: 'COMMENTED',
  FORWARDED: 'FORWARDED',
};

export const FILTER_OPTIONS = {
  ALL_REQUESTS: [
    {
      text: 'All',
      value: '',
    },
    {
      text: 'Open',
      value: 'open',
      key: 'caseStatus',
    },
    {
      text: 'Close',
      value: 'closed',
      key: 'caseStatus',
    },
    {
      text: 'Rejected',
      value: DOCUMENT_STATUSES.REJECTED,
      key: 'status',
    },
  ],
  INBOX: [
    {
      text: 'To Check',
      value: 'open',
    },
    {
      text: 'All',
      value: '',
    },
  ],
};
