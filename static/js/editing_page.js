// adjusted function to search for pt in db and view its data as editable text inputs
document.getElementById('editing-input').addEventListener("change",function(e){
    let name = {'name_to_update':this.value};
    console.log(name);
    const csrfToken = document.getElementById("csrf").value;
    $.ajax({
        url:'/editing_page/',
        type:'POST',
        contentType:'application/json; charset=UTF-8',
        headers: {
            'Content-Type':'application/json',
            'X-CSRFTOKEN':csrfToken,
        },
        data: JSON.stringify(name),
        success:function(response){ // response == string 
            // converting string into html
            const parser = new DOMParser();
            const doc = parser.parseFromString(response,'text/html');
            const responseElement = doc.body.children[0]; // targets my element within body html returned
            document.querySelector('.editing-container').replaceChildren(responseElement);
        },
        error:function() {
            document.querySelector('.editing-container').replaceChildren();
            const failed_alert = `<div class="alert alert-danger" role="alert">Error with process ,No such pt in db!! </div>`;
            const my_container = document.querySelector('.editing-container');
            my_container.insertAdjacentHTML('afterbegin',failed_alert);
        },

    })
})

// adjusted function to submit updates in db
function submit_edit() {
    let pmh = document.querySelector('#pmh');
    var pmh_options = Array.from(pmh.selectedOptions).map(option=>option.value);
    console.log(pmh_options);
    var csrfToken = document.querySelector('#csrf').value;
    let data_to_send = {
            'name_to_edit':document.querySelector(".name_to_edit").textContent,
            'operation':document.querySelector('.operation').value,
            'name':document.querySelector('.name').value,
            'age':document.querySelector('.age').value,
            'gender':document.querySelector('.gender').value,
            'complaint':document.querySelector('.complaint').value,
            'pmh':pmh_options,
            'psh':document.querySelector('.psh').value,
            'labs':document.querySelector('.labs').value,
            'rads':document.querySelector('.rads').value,
        };
    $.ajax({
        url:'/save_update',
        type:'POST',
        contentType:'application/json; charset=UTF-8',
        headers :{
            'Content-Type':'application/json; charset=UTF-8',
            'X-CSRFTOKEN':csrfToken,
        },
        data:JSON.stringify(data_to_send),
        success:function(response) {
            const success_alert = `<div class="alert alert-success" role="alert">Patient data has been updated successfully</div>`;
            let alert_container = document.querySelector('.editing-container');
            alert_container.insertAdjacentHTML('afterbegin',success_alert);
            document.querySelector('.editing-content-container').replaceChildren();
            document.getElementById('editing-input').value = '';
            
        },
        error:function() {
            const failed_alert = `<div class="alert alert-danger" role="alert">Error with process ,please check data carefully!! </div>`;
            const my_container = document.querySelector('.editing-content-container');
            
            my_container.insertAdjacentHTML('afterbegin',failed_alert);
    }
})
}
