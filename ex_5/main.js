const submitBtn = document.querySelector('.btn');
const pageWarn = document.querySelector('.page__warn');
const limitWarn = document.querySelector('.limit__warn');
const resultDiv = document.querySelector('.result');
const linkToLorem = "https://ru.wikipedia.org/w/index.php?go=%D0%9F%D0%B5%D1%80%D0%B5%D0%B9%D1%82%D0%B8&search=lorem+ipsum&title=%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F%3A%D0%9F%D0%BE%D0%B8%D1%81%D0%BA&ns0=1";
//url to fetching
let url = "https://picsum.photos/v2/list?";
const myRes = localStorage.getItem("myResult");
if(myRes) {
    resultDiv.innerHTML = myRes;
}

submitBtn.addEventListener('click', () => {
    const pageNumber = parseInt(document.querySelector('#page').value);
    const limitNumber = parseInt(document.querySelector('#limit').value);

    if(validNumbers(pageNumber, limitNumber)) {
        url += "page=" + pageNumber + "&";
        url += "limit=" + limitNumber;
        typeof pageNumber
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                let temp = "";
                data.forEach((elem) => {
                    temp += "<div class='card'>" +
                        "<h2>"+ elem.author + "</h2>" +
                        "<img src='" + elem.download_url + "'alt='image' width='250'>" +
                        "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, voluptatibus. <a href='" + linkToLorem + "'target='_blank' title='learn more..'>learn more..</a></p></div>";
                })
                localStorage.setItem("myResult", temp);
                resultDiv.innerHTML = temp;
            })
        url = "https://picsum.photos/v2/list?";
    }

})
function rangeOfNumbers(num) {
    return num > 10 || num < 1;
}

function validNumbers(firstVar, secondVar) {
    let warnCounter = 0;
    if((isNaN(firstVar)) || rangeOfNumbers(firstVar)) {
        document.querySelector("#page").style.border = "1px solid #8b0000";
        pageWarn.style.display = "block";
        pageWarn.innerText = "*Номер страницы вне диапазона от 1 до 10";
        warnCounter++;
    } else {
        pageWarn.style.display = "none";
        document.querySelector(".input__page").style.border = "1px solid #16b60a";
    }

    if((isNaN(secondVar)) || rangeOfNumbers(secondVar)) {
        document.querySelector("#limit").style.border = "1px solid #8b0000";
        limitWarn.style.display = "block";
        limitWarn.innerText = "*Лимит вне диапазона от 1 до 10";
        warnCounter++;
    } else {
        limitWarn.style.display = "none";
        document.querySelector("#limit").style.border = "1px solid #16b60a";
    }
    if(warnCounter == 2) {
        pageWarn.style.display = "none";
        limitWarn.style.display = "block";
        limitWarn.innerText = "*Номер страницы и лимит вне диапазона от 1 до 10";
        return false;
    }else if(warnCounter == 1) {
        return false;
    }else {
        return true;
    }
}
