const xhr = new XMLHttpRequest();
const warnText = document.querySelector(".warn");
const input = document.querySelector(".input-1");
const btn = document.querySelector(".btn-1");
const loadVal = document.querySelector(".loading_value");
const loadLine = document.querySelector(".line_loading");

function cssChange() {
    input.style.border = "2px solid forestgreen";
    warnText.style.display = "block";
    warnText.textContent = "Successfully!";
    warnText.setAttribute("class", "warn success");
    btn.setAttribute('disabled', true);
}

function ifBigger() {
    if (input.value > 10 || input.value < 1) {
        warnText.style.display = "block";
    } else {
        const value = input.value;
        cssChange();
        xhr.open("GET", `https://picsum.photos/v2/list?limit=${value}`, true);
        xhr.onload = function () {
            if (xhr.status != 200) {
                console.log(`Статус: ${xhr.status}`)
            } else {
                console.log('Результат запроса: ', JSON.parse(xhr.response));
            }
        }
        xhr.onprogress = function (event) {
            loadingLine(event.loaded, event.total);
        }
        xhr.send()
        counterSec(4);
        setTimeout(switchOnButton, 5000);
    }
}

function switchOnButton() {
    btn.disabled = false;
}

function counterSec(second) {
    let timer = setInterval(function () {
        if (second > 0) {
            second--;
            btn.textContent = `waiting(${second})`;
        } else {
            clearInterval(timer);
            btn.textContent = "run"
        }
    }, 1000);
}

function loadingLine(loadingVal, loadingTotal) {
    document.querySelector(".loading_bar").style.display = "block";
    let percentVal = 0;
    let percentTimer = setInterval(function (){
        if (percentVal < 100) {
            loadLine.style.width = `${percentVal}%`;
            loadVal.textContent = `${percentVal}%`;
            percentVal++;
        } else {
            clearInterval(percentTimer);
            loadLine.style.borderTop = "2px solid forestgreen";
            loadVal.textContent = `Loaded ${loadingVal} of ${loadingTotal} byte..`;
        }
    }, 10);
}

btn.addEventListener("click", ifBigger);