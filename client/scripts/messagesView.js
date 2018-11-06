var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
  },

  render: function() {
  },

  renderMessage: function(message) {
    var $chat = $('#chats');
    if (message.text && message.username) {
      var html = MessageView.render(message);
      $chat.append(html);
      var $username = $('.username');
      $username.off();
      $username.on( "click", Friends.toggleStatus );
    }

  }
};