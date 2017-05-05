Template.ilendInfoModal.helpers({
   getModalTitle: function() {
      return Session.get(ilendbooks.public.modal.TITLE);
   },

   getModalBody: function() {
      return Session.get(ilendbooks.public.modal.BODY);
   },

})