$(document).on('turbolinks:load', function() {
  $(function() {      
        function buildHTML(message) {
        var body = message.body ? `${ message.body }` : "";
        var image = message.image ? `<img src= ${ message.image }>` : "";
        var html =  `<div class="pan" data-message-id="${message.id}"> 
                      <div class="upper-message">
                        <div class="upper-message__user-name">
                          ${message.user_name}
                        </div>
                        <div class="upper-message__date">
                          ${message.date}
                        </div>
                      </div>
                      <div class="lower-message">
                        <p class="lower-message__body">
                          ${body}
                        </p>  
                          ${image}
                      </div>
                    </div>`
              return html;
      
    }
    $('#new_message').on('submit', function(e) {
      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href 
    
      $.ajax({
        type: 'POST',
        url: href,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
      })
      .done(function(data) {
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#new_message.new_message')[0].reset();
        $(".new-message__submit-btn").attr('disabled', false);
        $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
      })  
      .fail(function() {
        alert('エラーが発生したためメッセージは送信できませんでした。');
      })
    })
  });
  
$(function() {
  function buildMessageHTML(message) {
    var body = message.body ? `${ message.body }` : "";
    var image = message.image ? `<img src=${message.image} >` : ""; 

    var html = `<div class="pan" data-message-id="${message.id}"> 
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                  </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__body">
                      ${body}
                    </p>
                      ${image}
                  </div>
                </div>`
  return html;
}
  var reloadMessages = function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.pan:last').data("message-id");
        
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id},
    
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function (message){
      insertHTML = buildMessageHTML(message);
      $(".messages").append(insertHTML);
    })
        
  $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight}, 'fast');
    })    
    .fail(function() {
    console.log('error');
    });
    }
  };
  setInterval(reloadMessages, 5000); 
  });
});

