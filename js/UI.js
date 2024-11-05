export class UI {
    open_popup = document.getElementById('checkResult');
    popup = document.getElementById('floating-content');
    background = document.getElementById('popup-background');
    close_popup = document.getElementById('close-floating-content');
    buy_lottery=  document.getElementById('buy-button');
    restart = document.getElementById('restart');

    showPopup(){
        this.popup.style.display = 'flex';
        this.background.style.display = 'flex';
    };

    hidePopup() {
        this.popup.style.display = 'none';
        this.background.style.display = 'none';
    };
}