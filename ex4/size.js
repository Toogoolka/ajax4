let url = "https://picsum.photos/";

const submit = document.querySelector(".btn");


submit.addEventListener('click', () => {
    const firstVar = parseInt(document.querySelector('#width').value);
    const secondVar = parseInt(document.querySelector("#height").value);
    let result = document.querySelector(".result");
    console.log(firstVar)

    if ((firstVar <= 300) && (firstVar >= 100) && (secondVar <= 300) && (secondVar >= 100)
    && (typeof firstVar == "number") && (typeof secondVar == "number")) {
        url += firstVar + "/";
        url += secondVar;
        fetch(url).then((response) => {
            console.log(response);
            let temp = "";
            temp += "<img src='" + response.url + "' alt='picture'>";
            result.innerHTML = temp;
        })
            .catch((error) => {
                result.innerHTML = "<p style='color: #8b0000;'>ERROR. Server is not available</p>";
            })
            .finally(() => {
                url = "https://picsum.photos/";
        });
    } else {
        result.innerHTML = "<p style='color: #8b0000;'>Одно из чисел вне диапазона от 100 до 300</p>";
    }
})


