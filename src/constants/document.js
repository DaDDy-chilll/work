export const TYPES = {
  EXPENSE: 'EXPENSE',
  ADVANCED: 'ADVANCED',
};

export const ACTIONS = {
  APPROVE: 'approve',
  AUTHORIZE:'authorize',
  REJECT: 'reject',
  VERIFY: 'verify',
  COMMENT: 'comment',
  FORWARD: 'forward',
  RETURN: 'return',
  ADVANCE_RETURN: 'advance return',
};

export const DOCUMENT_STATUSES = {
  VERIFIED: 'VERIFIED',
  APPROVED: 'APPROVED',
  AUTHORIZE:'AUTHORIZE',
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
      key: 'caseStatus',
    },
    {
      text: 'All',
      value: '',
      key: 'caseStatus',
    },
    {
      text: 'Mention',
      value: true,
      key: 'mentioned',
    },
  ],
  PURCHASE_REQUEST: [
    {
      text: 'My Requests',
      value: 'my-purchase-request-request',
    },
    {
      text: 'All',
      value: '',
    },
  ],
  PURCHASE_ORDER: [
    {
      text: 'My Requests',
      value: 'my-purchase-order-request',
    },
    {
      text: 'All',
      value: '',
    },
  ],
};
