const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
// messageOne.testContent = "From javascript";

weatherform.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    // console.log(location);
    if (!location) {
        messageOne.textContent = "Please Enter Loctaion";
    }

    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    const url = "http://localhost:3000/weather?address=" + location;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
