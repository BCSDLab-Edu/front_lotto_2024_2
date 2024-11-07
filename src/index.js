import { handlePurchaseButton } from './handler/purchaseHandler.js';
import { calculateResult } from './handler/resultHandler.js';
import { openModal, closeModal } from './modules/modal.js';

document.querySelector('.purchase-button').addEventListener('click', handlePurchaseButton);

document.querySelector('.result-button').addEventListener('click', () => {
    calculateResult();
    openModal();
});

document.querySelector('.close-button').addEventListener('click', closeModal);

document.querySelector('.restart-button').addEventListener('click', closeModal);
