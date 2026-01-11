// creating new submit button within popover
submit_btn = document.createElement('button')
submit_btn.setAttribute('id','submit-form')
submit_btn.setAttribute('class','btn btn-outline-info')
submit_btn.textContent = 'Save data'
submit_btn.setAttribute('onclick','save_data()')

//creating another btn to close popover and continue editing
cancel_btn = document.createElement('button')
cancel_btn.setAttribute('id','cancel-popover')
cancel_btn.setAttribute('class','btn btn-outline-info')
cancel_btn.textContent = 'Continue Editing'
cancel_btn.setAttribute('onclick','remove_popover()')




// fuction showing popover
function show_popover() {
  // change display to block in manual backdrop
  document.getElementById('manual-backdrop').style.display = 'block';

  // creating my customized popover
  let my_popover = document.createElement("div")
  let my_attrs = document.createAttribute('popover')
  my_popover.setAttributeNode(my_attrs)
  my_popover.setAttribute('id','my-popover')

  // declaring all input elements within form
  all_forms_data = document.getElementsByClassName('form-control-lg');
  console.log(all_forms_data);
  // getting PMH values as a comma-separated string
  const pmhElement = document.getElementById('id_pmh');
  console.log(pmhElement);
  const pmhValues = Array.from(pmhElement.selectedOptions).map(option => option.innerText).join(", ")
  // adding data into p in popover
  pt_hx = `Name : ${document.getElementById('id_name').value}.;;\
  For : ${document.getElementById('id_operation').value}.;;\
  A ${document.getElementById('id_age').value} y o ${document.getElementById('id_gender').value} presented with ${document.getElementById('id_complaint').value}.;;\
  pt has ${document.getElementById('id_pmh').value == 'free' ? 'no med hx of importance' : `${pmhValues}`}.;;\
  ${(document.getElementById('id_gender')).value == 'male' ? 'he' : 'she'} ${(document.getElementById('id_psh')).value == 'irr' ? ('had no surgical hx of importance') : `had ${document.getElementById('id_psh').value}`}.;;\
  Relevant Labs : ${document.getElementById('id_labs').value}.;;\
  Relevant Rads : ${document.getElementById('id_rads').value}.;;`
  console.log(pt_hx);
  //splitting hx to add to ps
  const p_list = pt_hx.split(";;")
  for (let i=0;i<p_list.length;i++) {
  let p = document.createElement('p')
  p.textContent = p_list[i]
  my_popover.appendChild(p)
  }
  // adding buttons to bottom of popover
  my_popover.appendChild(submit_btn)
  my_popover.appendChild(cancel_btn)
  console.log(my_popover);
  // adding popover to body when add patient file is clicked
  document.body.appendChild(my_popover)
}

// function to submit form after reviewing
function save_data() {
  //targeting form element and submit
  let my_form = document.querySelector('#my-form')
  my_form.submit()
}

// fuction to remove popover
function remove_popover() {
  let my_popover = document.querySelector('#my-popover')
  my_popover.remove()

  // return backdrop to invisible mode
  document.getElementById('manual-backdrop').style.display = 'none'
}