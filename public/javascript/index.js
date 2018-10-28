
function deleteUser(btn, _id){
    $.ajax({
        type : 'DELETE',
        data : {_id : _id},
        beforeSend : ()=>{
           $(btn).attr('disabled','disabled')  ;   
        },
        success : (result, status, xhr) =>{
            console.log(result);
            if(result.success){
                $(`#${result._id}`).fadeOut(700,function(){ $(this).remove(); countRows('usersTable'); });

            }

        },
        error : (xhr, status, error)=>{
            alert("Błąd: "+xhr.responseText);
        }
    });
}

function countRows(tableId){
    let i = 1;
    $(`#${tableId} .rowCount`).each(function(){
        $(this).text(i++);
    })
}