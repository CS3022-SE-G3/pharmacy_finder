$(document).ready(function(){

  $('td').on('click', function(){

     var todo=document.getElementById("id");

      $.ajax({
        type: 'DELETE',
        url: '/pharmacy/drug/',
        data: todo,
        success: function(data){
          location.reload();
        }
      });

      return false;

  });
});


