var Friends = {
  toggleStatus: function () {
    if ($(this).hasClass('friend')) {
      Friends.friendlist.splice(Friends.friendlist.indexOf($(this).text()),1);
    } else {
      Friends.friendlist.push($(this).text());
    }


    App.fetch();
  },
  friendlist: []

};