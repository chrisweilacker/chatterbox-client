var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB=null, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        if(successCB) {
          successCB(data);
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
        errorCB();
      }
    });
  },

  readAll: function(successCB=null, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Messages read');
        if(successCB) {
          successCB(data);
        }
      },
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  readRoom: function(roomName, successCB=null, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt',
              where: `{"roomname": "${roomName}"}` },
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        if(successCB) {
          successCB(data);
        }
      },
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};