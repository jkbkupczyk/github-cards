const USER_API_URL = "https://api.github.com/users/";

const main = document.querySelector(".main");
const search = document.querySelector("#searchBox");

function getUserInfo(user) {
    fetch(USER_API_URL + user)
        .then(resp => resp.json())
        .then(user => createUser(user))
        .catch(err => console.error(err));
}

function createUser(data) {
    const userCard = `
        <div class="userCard">
            <div class="image">
                <img src="${data.avatar_url}" alt="Image of user ${data.name}">
            </div>

            <div class="data">
                <h2>${validate(data.name)}</h2>
                <p>${validate(data.bio)}</p>
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

function validate(text) {
    return text === null ? "<i>No info </i>😥" : text;
}

search.addEventListener("change", call => {
    call.preventDefault();

    if (search.value) {
        getUserInfo(search.value);
        search.value = "";
    }
});