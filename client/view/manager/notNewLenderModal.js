Template.notNewLenderModal.helpers({

  getTitle: function () {
    return Session.get('condition-lendBook-title');
  },

  getIlendbooksId: function (){
    return Session.get('condition-lendBook-ilendbooksId');
  }
})