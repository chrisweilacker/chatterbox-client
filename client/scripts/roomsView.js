var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', Rooms.add);
    RoomsView.renderRoom('ALL', 'ALL');
    RoomsView.$select.on('change', RoomsView.render);
  },

  render: function() {
    App.room = RoomsView.$select.val();
    App.fetch();
  },

  renderRoom: function(roomName, origRoomName) {
    RoomsView.$select.append(`<option value="${origRoomName}">${roomName}</option>`);
  }

};
