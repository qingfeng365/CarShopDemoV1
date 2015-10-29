'use strict';

$(function() {
  $('.replylink').click(function(event) {
    var target = $(event.target);
    var commentId = target.attr('data-commentid');
    var toId = target.attr('data-toid');

    if ($('#inputCommentId').length > 0) {
      $('#inputCommentId').attr('value', commentId);
    } else {
      $('<input>')
        .attr({
          type: 'hidden',
          id: 'inputCommentId',
          name: 'comment[commentid]',
          value: commentId
        })
        .appendTo('#commentform');
    }

    if ($('#inputToId').length > 0) {
    	$('#inputToId').attr('value', toId);
    } else {
      $('<input>')
        .attr({
          type: 'hidden',
          id: 'inputToId',
          name: 'comment[toid]',
          value: toId
        })
        .appendTo('#commentform');
    }
  });

});
