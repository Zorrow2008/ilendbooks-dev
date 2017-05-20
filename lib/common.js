ilendbooks = 
{
  'public': 
  {

      contactPreference: 
      {
          
          EMAIL : 'email',
          CELL  : 'cell',
          PHONE : 'phone'
      },
      status :
      {
          PENDING     : 'pending',
          FAILED      : 'failed',
          SUCCESS     : 'success',
          AVAILABLE   : 'available',
          MATCHED_NOTIFIED     : 'matched-notified',
          MATCHED_ACCEPTED     : 'matched-accepted',
          MATCHED_DELINED      : 'matched-declined',
          NO_LENDER   : 'no-lender',
          TRANSACTION_COMPLETE: 'transaction-complete',
          BORROWER_LENT_RECEIVED: 'borrower-lent-received',
          LENDER_LENT_DECLARED: 'lender-lent-declared',
          LENDER_RETURN_RECEIVED: 'lender-return-received',
          BORROWER_RETURN_DECLARED: 'borrower-return-declared',
          WITH_BORROWER : 'with-borrower',
          BORROWED      : 'borrowed'
      },
      modal :
      {
        TITLE : 'ilend-info-modal-title',
        BODY  : 'ilend-info-modal-body',
        action: 
        {
          TITLE : 'ilend-action-modal-title',
          BODY  : 'ilend-action-modal-body',
          CLASS : 'ilend-action-modal-class',
          DISPLAY: 'ilend-action-modal-display',
          FEED_BACK_FLAG: 'ilend-action-modal-feed-back-flag',
          FEED_BACK_LABEL: 'ilend-action-modal-feed-back-label'
        }
      }
  },

  'private' :
  {

      generic:

      {
        FROM_EMAIL  : 'ilendbooks<admin@ilendbooks.com>',

      } 
  }

}