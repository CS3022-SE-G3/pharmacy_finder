$(document).ready(function(){

    $('form').on('submit', function(){
  
        // var item = $('form input');
        // var todo = {item: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/',
          // data: todo,
          success: function(data){
            location.reload();
          }
        });
  
        return false;
  
    });
  });
  