var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',
  rooms: {'ALL': 'ALL'},
  room: 'ALL',
  lastObjectID: null,
  outOfFocus: null,
  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();

    var setRoom = window.localStorage.getItem('room');
    if (setRoom) {
      App.room = setRoom;
      window.localStorage.removeItem('room');
      App.rooms[setRoom.trim().toUpperCase()] = setRoom.trim().toUpperCase();
    }

    RoomsView.initialize();
    MessagesView.initialize();
    $(window).blur(App.setOutOfFocus);


    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    //set timer to refetch messages every 10 seconds.
    setInterval(() => { App.fetch(); }, 10000);

  },
  setOutOfFocus: function() {
    //once Out of Focus set the last ObjectID in order to calculate unread Messages
    App.outOfFocus = App.lastObjectID;

  },
  fetch: function(callback = ()=>{}) {
    //Our readData function
    var readData = function (data) {
      // examine the response from the server request:

      //set the lastObjectID
      App.lastObjectID = data.results[0].objectId;

      //empty the chat div of old
      $('#chats').empty();
      console.log(data);
      //loop through the results
      for (var i = 0; i<data.results.length; i++) {
        //Add new rooms to dropdown
        var rm = data.results[i].roomname;
        if (rm) {
          rm = App.escape(rm.trim().toUpperCase());
          if (!App.rooms[rm]) {
            RoomsView.renderRoom(rm, data.results[i].roomname);
            App.rooms[rm] = rm;
          }
        }

        //get message and determine if user is friend
        var message = data.results[i];
        message.username = App.escape(message.username);
        message.text = App.escape(message.text);
        //check for mentions
        if (message.text && message.text.includes(`@${App.username}`)) {
          message.text = message.text.replace(`@${App.username}`, `<span class = "mention">@${App.username}</span>`);
        }
        if (Friends.friendlist.includes(message.username)) {
          message.isFriend = 'friend';
        } else {
          message.isFriend = 'notfriend';
        }
        MessagesView.renderMessage(message);

        //set Titlebar to include unread messages
        var unreadMessages = data.results.findIndex(object => object.objectId === App.outOfFocus);
        if (document.hasFocus() || unreadMessages === 0) {
          $('title').text(`A & C's Chatterbox`);
        } else {
          $('title').text(`(${unreadMessages}) A & C's Chatterbox`);
        }
      }

      callback();
    };

    //call read room or read all depending on the room
    if (App.room === 'ALL') {
      Parse.readAll(readData);
    }  else {
      Parse.readRoom(App.room, readData);
    }


  },

  startSpinner: function() {
    //Default spinner for first load.
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    //stop the spinner
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },
  escape : function(string) {
    //make sure data has no bad apples
    var result = string;
    if (result) {
      result = result.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
    }
    return result;
  }
};
