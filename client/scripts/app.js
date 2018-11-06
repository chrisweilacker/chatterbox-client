var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',
  rooms: {'ALL': 'ALL'},
  room: 'ALL',
  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    setInterval(() => {App.fetch();}, 10000);
    Parse.readRoom();

  },

  fetch: function(callback = ()=>{}) {
    var readData = function (data) {
        // examine the response from the server request:
        $('#chats').empty();
        console.log(data);
        for (var i = 0; i<data.results.length; i++) {
          var rm = data.results[i].roomname;

          if (rm) {
            rm = App.escape(rm.trim().toUpperCase());
            if (!App.rooms[rm]) {
              RoomsView.renderRoom(rm, data.results[i].roomname);
              App.rooms[rm] = rm;
            }
          }
            var message = data.results[i];
            message.username = App.escape(message.username);
            message.text = App.escape(message.text);
            if (Friends.friendlist.includes(message.username)) {
              message.isFriend = 'friend';
            } else {
              message.isFriend = 'notfriend';
            }

            MessagesView.renderMessage(message);

        }

        callback();
      };

    if (App.room === 'ALL') {
      Parse.readAll(readData);
    }  else {
      Parse.readRoom(App.room, readData);
    }


  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },
  escape : function(string) {
    var result = string;
    if (result) {
      result = result.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
    }
    return result;
  }
};
