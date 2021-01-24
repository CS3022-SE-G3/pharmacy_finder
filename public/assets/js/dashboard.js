$(document).ready(function () {
    $('.abc').on('click', function(){
        let request_id =  $(this).attr('id');
        $('#respond_dt_tbody').empty();
        $('#respond_bd_tbody').empty();
    
        function responseTable(info) {
            let tr = "";
            for(let i=0; i < info[1].length; i++){
                tr += '<tr>';
                tr += '<td>' + info[1][i].drug_type_name + '</td>';
                tr += '<td><input type="checkbox" id="drug_type" name="drug_type_ids" value="' + info[1][i].drug_type_id + '"></td>';
                tr += '</tr>';
            }
            $('#respond_dt_tbody').append(tr);
            tr = "";
            for(let i=0; i < info[2].length; i++){
                tr += '<tr>';
                tr += '<td>' + info[2][i].brand_name + '</td>';
                tr += '<td><input type="checkbox" id="branded_drug" name="branded_drug_ids" value="' + info[2][i].branded_drug_id + '"></td>';
                tr += '</tr>';
            }
            $('#respond_bd_tbody').append(tr);
        }
    
        $.ajax({
            type: 'GET',
            url:  '/pharmacy/response/respond/' + request_id,
            success:function(data)
            {
                let info = data.info;
                $('#c_name').html(info[0][0].full_name);
                $('#c_email').html(info[0][0].email);
                $('#c_address').html(info[0][0].address);
                $('#c_gender').html(info[0][0].gender);
                $('#c_contact').html(info[0][0].contact_no);
                responseTable(info);
            },
        });

  
    });

    $('.def').on('click', function(){
        console.log(222);
        let request_id =  $(this).attr('id');
        $('#edit_response_dt_tbody').empty();
        $('#edit_response_bd_tbody').empty();
    
        function editResponseTable(info) {
            let tr = "";
            let j = 0;
            for(let i=0; i < info[1].length; i++) {
                if ((j < info[3].length) && (info[1][i].drug_type_id === info[3][j].drug_type_id)){
                    tr += '<tr>';
                    tr += '<td>' + info[1][i].drug_type_name + '</td>';
                    tr += '<td><input type="checkbox" id="drug_type" name="drug_type_ids" value="' + info[1][i].drug_type_id + '" checked></td>';
                    tr += '</tr>';
                    j++;
                } else {
                    tr += '<tr>';
                    tr += '<td>' + info[1][i].drug_type_name + '</td>';
                    tr += '<td><input type="checkbox" id="drug_type" name="drug_type_ids" value="' + info[1][i].drug_type_id + '"></td>';
                    tr += '</tr>';
                }
            }
            $('#edit_response_dt_tbody').append(tr);
            tr = "";
            let k = 0;
            for(let i=0; i < info[2].length; i++){
                if ((k < info[4].length) && (info[2][i].branded_drug_id === info[4][k].branded_drug_id)){
                    tr += '<tr>';
                    tr += '<td>' + info[2][i].brand_name + '</td>';
                    tr += '<td><input type="checkbox" id="branded_drug" name="branded_drug_ids" value="' + info[2][i].branded_drug_id + '" checked></td>';
                    tr += '</tr>';
                    k++; 
                } else {
                    tr += '<tr>';
                    tr += '<td>' + info[2][i].brand_name + '</td>';
                    tr += '<td><input type="checkbox" id="branded_drug" name="branded_drug_ids" value="' + info[2][i].branded_drug_id + '"></td>';
                    tr += '</tr>';
                }
            }
            $('#edit_response_bd_tbody').append(tr);
        }
    
        $.ajax({
            type: 'GET',
            url: '/pharmacy/response/edit_response/' + request_id,
            success:function(data)
            {
                let info = data.info;
                $('#c_name1').html(info[0][0].full_name);
                $('#c_email1').html(info[0][0].email);
                $('#c_address1').html(info[0][0].address);
                $('#c_gender1').html(info[0][0].gender);
                $('#c_contact1').html(info[0][0].contact_no);
                editResponseTable(info);
            },
        });
    });
    
})


