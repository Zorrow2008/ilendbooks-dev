Meteor.startup(function() {

        if(Meteor.isServer) {
            /********************* start ****************************/
            var statusMeta=  [{
                        "next-status": ilendbooks.public.status.REMOVED,
                        "prompt": "Remove from shelf?",
                        "option": ilendbooks.public.option.ONE,
                        "actionModalNext": true,
                        "modalTitle": "Remove from Shelf",
                        "modalBody": "Are you sure to remove from shelf?",
                        "modalFeedBackFlag": true,
                        "modalFeedBackLabel": "Let us know why are you removing from shelf",
                        "modalDisplay": "Yes",
                        "modalClass": ilendbooks.public.status.REMOVED

                    }]
                
            
             ILendMetaData.upsert({
               "status": ilendbooks.public.status.AVAILABLE,
               "forWho": ilendbooks.public.userType.LENDER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             });
            /********************************************************/
            var statusMeta=  [{
                        "nextStatus": ilendbooks.public.status.AVAILABLE,
                        "prompt": "Add back to shelf?",
                        "option": ilendbooks.public.option.ONE,
                        "actionModalNext": false
                    },
                    {
                        "nextStatus": ilendbooks.public.status.DELETE,
                        "prompt": "Delete?",
                        "option": ilendbooks.public.option.TWO,
                        "actionModalNext": true,
                        "modalTitle": "Delete",
                        "modalBody": "Are you sure you want to delete from shelf?",
                        "modalFeedBackFlag": true,
                        "modalFeedBackLabel": "Let us know why are you deleting from shelf",
                        "modalDisplay": "Yes",
                        "modalClass": ilendbooks.public.status.DELETE
                    }]
                
            
             ILendMetaData.upsert({
               "status": ilendbooks.public.status.REMOVED,
               "forWho": ilendbooks.public.userType.LENDER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             });
            /********************************************************/
            var statusMeta=  [{
                        "nextStatus": ilendbooks.public.status.MATCHED_ACCEPTED,
                        "prompt": "Accept?",
                        "option": ilendbooks.public.option.ONE
                    },
                    {
                        "nextStatus": ilendbooks.public.status.AVAILABLE,
                        "prompt": "Decline?",
                        "option": ilendbooks.public.option.TWO,
                        "actionModalNext": true,
                        "modalTitle": "Decline request",
                        "modalBody": "Are you sure you want to decline?",
                        "modalFeedBackFlag": true,
                        "modalFeedBackLabel": "Let us know why are you declining the request.",
                        "modalDisplay": "Yes",
                        "modalClass": ilendbooks.public.status.MATCHED_DECLINED
                    }
            ]
                
            
             ILendMetaData.upsert({
               "status": ilendbooks.public.status.MATCHED_NOTIFIED,
               "forWho": ilendbooks.public.userType.LENDER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             });
             /********************************************************/

             // Lender's point of view
             var statusMeta = [{
                    "nextStatus": ilendbooks.public.status.LENDER_LENT_DECLARED,
                    "prompt": "Did you lend your book to the borrower?",
                    "actionModalNext": true,
                    "option": ilendbooks.public.option.ONE,
                    "modalTitle": "You successfully lent the book! ",
                    "modalBody": "Click yes to confirm you have lent your book.",
                    "modalFeedBackFlag": false,
                    "modalDisplay": "Yes",
                    "modalClass": ilendbooks.public.status.LENDER_LENT_DECLARED
             }]

             ILendMetaData.upsert({
               "status": ilendbooks.public.status.MATCHED_ACCEPTED,
               "forWho": ilendbooks.public.userType.LENDER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             });

             // Borrower's point of view
              var statusMeta = [{
                    "nextStatus": ilendbooks.public.status.BORROWER_LENT_RECEIVED,
                    "prompt": "Did you receive the book from the lender?",
                    "actionModalNext": true,
                    "option": ilendbooks.public.option.ONE,
                    "modalTitle": "You successfully borrowed a book! ",
                    "modalBody": "Click yes to confirm you have received the book.",
                    "modalFeedBackFlag": false,
                    "modalDisplay": "Yes",
                    "modalClass": ilendbooks.public.status.BORROWER_LENT_RECEIVED
             }]

             ILendMetaData.upsert({
               "status": ilendbooks.public.status.MATCHED_ACCEPTED,
               "forWho": ilendbooks.public.userType.BORROWER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             });
             /********************************************************/
             //Now the book is with the borrower.

             //Lender's point of view
             var statusMeta = [{
                    "nextStatus": ilendbooks.public.status.LENDER_RETURN_RECEIVED,
                    "prompt": "Confirm that you have received your book back.",
                    "actionModalNext": true,
                    "option": ilendbooks.public.option.ONE,
                    "modalTitle": "Congratulations!",
                    "modalBody": "You confirmed that your book has been returned. Your transaction is complete!",
                    "modalFeedBackFlag": false,
                    "modalDisplay": "Yes",
                    "modalClass": ilendbooks.public.status.LENDER_RETURN_RECEIVED
             }]

              ILendMetaData.upsert({
               "status": ilendbooks.public.status.WITH_BORROWER,
               "forWho": ilendbooks.public.userType.LENDER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             }); 

             //Borrower's point of view           
              var statusMeta = [{
                    "nextStatus": ilendbooks.public.status.BORROWER_RETURN_DECLARED,
                    "prompt": "Confirm that you have received your book back.",
                    "actionModalNext": true,
                    "option": ilendbooks.public.option.ONE,
                    "modalTitle": "Congratulations!",
                    "modalBody": "You confirmed that your book has been returned. Your transaction is complete!",
                    "modalFeedBackFlag": false,
                    "modalDisplay": "Yes",
                    "modalClass": ilendbooks.public.status.BORROWER_RETURN_DECLARED
             }]

              ILendMetaData.upsert({
               "status": ilendbooks.public.status.BORROWED ,
               "forWho": ilendbooks.public.userType.BORROWER
             }, {
                $set: {
                  statusMeta :   statusMeta
                }
             });    
    }
});


