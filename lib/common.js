ilendbooks = 
{
  'public': 
  {

      contactPreference: 
      {
          
          EMAIL : 'email',
          CELL  : 'cell',
      },
      status :
      {
          FAILED      : 'failed',
          SUCCESS     : 'success',
          AVAILABLE   : 'available',
         // MATCHED     : 'matched',
          MATCHED_NOTIFIED     : 'matched-notified',
          MATCHED_ACCEPTED      : 'matched-accepted',
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
        BODY  : 'ilend-info-modal-body'
      }
  },

  'private' :
  {

      generic:

      {
        FROM_EMAIL  : 'admin@ilendbooks.com',

      } 
  }

}