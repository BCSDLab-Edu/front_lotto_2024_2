const open_popup = document.getElementById('buy-popup-open');
const popup = document.getElementById('floating-content');
const background = document.getElementById('popup-background');
const close_popup = document.getElementById('close-floating-content');

open_popup.addEventListener('click', ()=>{
    popup.style.display = 'flex';
    background.style.display = 'flex';
});

background.addEventListener('click', ()=>{
    popup.style.display = 'none';
    background.style.display = 'none';
})

close_popup.addEventListener('click', ()=>{
    popup.style.display = 'none';
    background.style.display = 'none';
})