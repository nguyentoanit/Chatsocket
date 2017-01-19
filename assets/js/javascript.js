var socket = io.connect();
$('.message_input').keyup(function (e) {
    if (e.which === 13) {
        send_data();
    }
});
$(function(){
  socket.on('new messages', function (data) {
      $(".messages").append(make_html("left",data.msg));
      $(".messages").scrollTop($(".messages")[0].scrollHeight);
  });
  socket.on('online', function (data) {
      $(".user-online").text("Online: "+data.count);
  });
  $("#send-button").click(function(){
      send_data();
  });
});

function make_html(possition, content){
  return '<li class="message '+possition+' appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">'+content+'</div></div></li>';
}

function send_data(){
    $(".messages").append(make_html("right", $(".message_input").val()));
    socket.emit('send messages', { msg: $(".message_input").val()});
    $(".message_input").val("");
    $(".messages").scrollTop($(".messages")[0].scrollHeight);
}


(function () {
var Message;
Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.draw = function (_this) {
        return function () {
            var $message;
            $message = $($('.message_template').clone().html());
            $message.addClass(_this.message_side).find('.text').html(_this.text);
            $('.messages').append($message);
            return setTimeout(function () {
                return $message.addClass('appeared');
            }, 0);
        };
    }(this);
    return this;
};
}.call(this));
//sendMessage('Welcome to join Chat channel!');


/*
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        
        sendMessage('Welcome to join Chat channel!');
    });
}.call(this));
*/