const USER_API_URL = "https://api.github.com/users/";

const main = document.querySelector(".main");
const searchBox = document.querySelector("#search-box");

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
        <div id="card" class="user-card">
            <div class="image-container">
                <a href="${data.html_url}" target="_blank" rel="noopener">
                    <img src="${data.avatar_url}" alt="User image">
                </a>
            </div>

            <div class="wrapper">
                <div class="data">
                    <h2>${validateData(data.name)}</h2>
                    <span class="nickname">${data.login}</span>
                    <p>${validateData(data.bio)}</p>
                </div>

                <div class="stats container">
                    <ul>
                        <li title="Followers">👀 ${data.followers}</li>
                        <li title="Following">👍 ${data.following}</li>
                        <li title="Public Repos">📂 ${data.public_repos}</li>
                    </ul>
                </div>

                <button id="more-info-btn" class="more-info">Show more info</button>
            </div>
        </div>
    `;

    main.innerHTML = userCard;

    document.querySelector("#card").focus();
}

function userNotFound() {
    main.innerHTML = `
        <div id="card" class="userCard">
            <h2>User not found 😥</h2>
        </div>`;

    document.querySelector("#card").focus();
}

function validateData(data) {
    return data === null ? "<i>No info </i>😥" : data;
}

function validateEmail(data) {
    return;
}

searchBox.addEventListener("change", call => {
    call.preventDefault();

    if (searchBox.value) {
        getUserInfo(searchBox.value);
        searchBox.value = "";
    }
});