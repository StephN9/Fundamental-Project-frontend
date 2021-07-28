'use strict';

const baseURL = "http://localhost:8081"

const getAllOutput = document.querySelector("#getAllOutput");
const getByIdOutput = document.querySelector("#getByIdOutput");

const gameId = document.querySelector("#gameId");


const getAllGames = () => {
    axios.get(`${baseURL}/getAllGames`)
    .then(res => {
            const games = res.data;

            getAllOutput.innerHTML = "";

            games.forEach(game => renderGame(game, getAllOutput));
    }).catch(err => console.log(err));
}

const renderGame = (game, outputDiv) => {
        const newGame = document.createElement("div");

        const gameName = document.createElement("h4"); 
        gameName.innerText =game.name;
        newGame.appendChild(gameName);

        const gamePlatform = document.createElement("p");
        gamePlatform.innerText = `Preferred Platform: ${game.platform}`;
        newGame.appendChild(gamePlatform);

        const gameGenre = document.createElement("p");
        gameGenre.innerText =`Genre: ${game.genre}`;
        newGame.appendChild(gameGenre);

        const gamePlayerType = document.createElement("p");
        gamePlayerType.innerText =`Single or Multiplayer: ${game.playerType}`;
        newGame.appendChild(gamePlayerType);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "DELETE";
        deleteButton.classList.add("btn", "btn-primary");
        deleteButton.addEventListener('click', () => deleteGame(game.id));

        newGame.appendChild(deleteButton);


        const updateButton = document.createElement(`button`);
        updateButton.innerText = "UPDATE";
        updateButton.classList.add("btn", "btn-primary", "mx-1");
        updateButton.addEventListener('click', () => updateGame(game.id));

        newGame.appendChild(updateButton);

        outputDiv.appendChild(newGame);
}

document.querySelector("section#postSection > form").addEventListener('submit', function (e) {
    e.preventDefault();
    
    const form = e.target;

    const data = {
        name: form.name.value,
        platform: form.platform.value,
        genre: form.genre.value,
        playerType: form.playerType.value

    }
    console.log(data);
    
    axios.post(`${baseURL}/createGame`, data).then((res) => {
        console.log(res);
        getAllGames();


        form.reset();
        form.name.focus();
    }).catch(err => console.log(err));

    alert(`${form.gameName.value} has been added :)`);
});

const deleteGame = id => {
   
    axios.delete(`${baseURL}/deleteGame/${id}`)
    .then(res => {
        console.log(res);
        getAllGames();

        alert(`This game has been deleted from your library`);
    }).catch(err => console.log(err));
    
}


const getGameById = () => {
    axios.get(`${baseURL}/getGame/${gameId.value}`)
    .then( res => {
        const game = res.data;

        getByIdOutput.innerHTML = "";
        
        renderGame(game, getByIdOutput);       
    }).catch(err => console.log(err));
}

document.querySelector("section#getById > button").addEventListener('click', getGameById);

const updateGame = (id) => {

    //gets each of the elements on the form and updates them
    const data = {
        name: document.getElementById("gameName").value,
        platform: document.getElementById("gamePlatform").value,
        genre: document.getElementById("gameGenre").value,
        playerType: document.getElementById("gamePlayerType").value
    }
    
    axios.put(`${baseURL}/replaceGame/${id}`, data)
        .then(res => {
            console.log(res);
            getAllGames();

            alert(`${document.getElementById("gameName").value} has been updated`);
            createGameForm.reset();

        }).catch(err => console.log(err));

};
getAllGames();


