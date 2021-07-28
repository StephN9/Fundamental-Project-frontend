'use strict';

const baseURL = "http://localhost:8081"

const getAllOutput = document.querySelector("#getAllOutput");
const getByIdOutput = document.querySelector("#getByIdOutput");
const getByNameOutput = document.querySelector("#getByNameOutput");
const getByPlatformOutput = document.querySelector("#getByPlatformOutput");

const gameId = document.querySelector("#gameId");
const findGameByName = document.querySelector("#findGameByName");
const findGameByPlatform = document.querySelector("#findGameByPlatform");


const getAllGames = () => {
    axios.get(`${baseURL}/getAllGames`)
    .then(res => {
            const games = res.data;

            getAllOutput.innerHTML = "";

            games.forEach(game => renderGame(game, getAllOutput));
    }).catch(err => console.log(err));
}

const renderGame = (game, outputDiv) => {
        const gameColumn = document.createElement('div');
        gameColumn.classList.add("col");

        const gameCard = document.createElement("div");
        gameCard.classList.add("card");
        gameColumn.appendChild(gameCard);

        const newGame = document.createElement("div");
        newGame.classList.add("card-body");

        const gameName = document.createElement("h4"); 
        gameName.innerText =game.name;
        gameName.classList.add("card-title");
        newGame.appendChild(gameName);

        const gamePlatform = document.createElement("p");
        gamePlatform.innerText = `Preferred Platform: ${game.platform}`;
        gamePlatform.classList.add("card-text");
        newGame.appendChild(gamePlatform);

        const gameGenre = document.createElement("p");
        gameGenre.innerText =`Genre: ${game.genre}`;
        gameGenre.classList.add("card-text");
        newGame.appendChild(gameGenre);

        const gamePlayerType = document.createElement("p");
        gamePlayerType.innerText =`Single or Multiplayer: ${game.playerType}`;
        gamePlayerType.classList.add("card-text")
        newGame.appendChild(gamePlayerType);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = "DELETE";
        deleteButton.classList.add("btn", "btn-secondary");
        deleteButton.addEventListener('click', () => deleteGame(game.id));

        newGame.appendChild(deleteButton);


        const updateButton = document.createElement(`button`);
        updateButton.innerText = "UPDATE";
        updateButton.classList.add("btn", "btn-secondary", "mx-1");
        updateButton.addEventListener('click', () => updateGame(game.id));

        newGame.appendChild(updateButton);
        
        gameCard.appendChild(newGame);

       
        outputDiv.appendChild(gameColumn);
}

document.querySelector("#createGameForm").addEventListener('submit', function (e) {
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

const getGameByName = () => {
    axios.get(`${baseURL}/getByName/${findGameByName.value}`)
    .then( res => {
        console.log(res);
        const games = res.data;
      console.log(games);
        getByNameOutput.innerHTML = "";
        
        games.forEach(game => renderGame(game, getByNameOutput));       
    }).catch(err => console.log(err));
}

const getGameByPlatform = () => {
    axios.get(`${baseURL}/getByPlatform/${findGameByPlatform.value}`)
    .then( res => {
        console.log(res);
        const games = res.data;
      console.log(games);
        getByNameOutput.innerHTML = "";
        
        games.forEach(game => renderGame(game, getByPlatformOutput));       
    }).catch(err => console.log(err));
}



document.querySelector("div#getById > button").addEventListener('click', getGameById);
document.querySelector("div#getGameByName > button").addEventListener('click', getGameByName);
document.querySelector("div#getGameByPlatform > button").addEventListener('click', getGameByPlatform);

const updateGame = (id) => {

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



