var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$button.on('click', Rooms.add);
    if (App.room !== 'ALL') {
      RoomsView.renderRoom(App.room.trim().toUpperCase(), App.room);
    }
    RoomsView.renderRoom('ALL', 'ALL');
    RoomsView.$select.on('change', RoomsView.render);
  },

  render: function() {
    var newTab = $('#tab').prop('checked');
    if (newTab) {
      window.localStorage.setItem('room', RoomsView.$select.val());
      window.open(window.location.href,'_blank');
      RoomsView.$select.get(0).selectedIndex = 0;

    } else {
      App.room = RoomsView.$select.val();
      App.fetch();
    }

  },

  renderRoom: function(roomName, origRoomName) {
    RoomsView.$select.append(`<option value="${origRoomName}">${roomName}</option>`);
  }

};
