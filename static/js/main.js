let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById("theme-switch")

const switchToLightMode =  () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem('darkmode',null);
}
const switchToDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem('darkmode','active');
}



if(darkmode === 'active'){
    switchToDarkMode();
}

themeSwitch.addEventListener('click',()=> {
    darkmode = localStorage.getItem('darkmode');
    darkmode === 'active' ? switchToLightMode() : switchToDarkMode();
})


