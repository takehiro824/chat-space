$(document).on('turbolinks:load', function() {
  $(function(){
    var search_list = $("#user-search-result");

  function appendList(user) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
  }
  function appendErrMsgToHTML(msg) {
    var html = `<p class='chat-group-user'>${ msg }</p>`
    search_list.append(html);
  }

  $("#user-search-field.chat-group-form__input").on("keyup", function() {
    var input = $("#user-search-field.chat-group-form__input").val();
   
    $.ajax({
      type: 'GET',
      url: '/users', 
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !==0) {
        users.forEach(function(user){
          appendList(user);
          });
        }
      else {
        appendErrMsgToHTML("一致するユーザーは見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});

$(function () {
  var selected_list = $("#chat-group-users");
  function appendUser(name,user_id) {
    var html =  `<div class='chat-group-user clearfix js-chat-member' id='${ user_id }'>
                  <input name='group[user_ids][]' type='hidden' value='${ user_id }'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove  js-remove-btn'>削除</div>
                </div>`
    selected_list.append(html);
  }

  $(document).on("click", '.user-search-add.chat-group-user__btn.chat-group-user__btn--add', function () {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      
      $(this).parent().remove();
      appendUser(name, user_id);
  });
  $(document).on("click", '.user-search-remove.chat-group-user__btn.chat-group-user__btn--remove.js-remove-btn', function () {
      $(this).parent().remove();
  });
});
});