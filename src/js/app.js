const USER_API_URL = "https://api.github.com/users/";

const main = document.querySelector(".main");
const searchBox = document.querySelector("#searchBox");

function getUserInfo(user) {
    fetch(USER_API_URL + user)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                userNotFound();
                return Promise.reject(`Error: ${res.status}`);
            }
        })
        .then(data => createUser(data))
        .catch(err => console.log(err));
}

function createUser(data) {
    const userCard = `
        <div class="userCard">
            <div class="image">
                <img src="${data.avatar_url}" alt="Image of user ${data.name}">
            </div>

            <div class="data">
                <h2>${validateData(data.name)}</h2>
                <p>${validateData(data.bio)}</p>
            </div>

            <div class="">
                <ul>
                    <li>${data.followers}</li>
                    <li>${data.following}</li>
                    <li>${data.public_repos}</li>
                </ul>
            </div>

            <button>Show more info</button>
        </div>
    `;

    main.innerHTML = userCard;
}

function userNotFound() {
    main.innerHTML = `
        <div class="userCard">
            <h2>User not found 😥</h2>
        </div>`;
}

function validateData(data) {
    return data === null ? "<i>No info </i>😥" : data;
}

searchBox.addEventListener("change", call => {
    call.preventDefault();

    if (searchBox.value) {
        getUserInfo(searchBox.value);
        searchBox.value = "";
    }
});