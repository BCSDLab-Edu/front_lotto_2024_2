import './css/reset.css';
import './css/lotto.css';
import './css/modal.css';




function loadScript(src) {
    var script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    document.head.appendChild(script);
}

loadScript('./src/event/event.js');