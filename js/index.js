var quantJogos = 10;

function somarJogos (quantJogos){
	quantJogos = quantJogos + 10;
}

function Mostjogos(jogos) {
	document.getElementById("containerJogo").innerHTML = ''
	for (i = 0; i < quantJogos; i++) {
		document.getElementById("containerJogo").innerHTML += `<div id="game"> 
		<h2> Titulo: ${jogos[i].title} </h2> <p> Genre: ${jogos[i].genre} </p>
		 <img src="${jogos[i].thumbnail}"> </div>`;;

		//console.log(jogos[i]);
	}
}


const verJogos = (category) => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0c67e168ddmshf8b4ef8bed5ff13p141ca2jsn943ceb9c73c3',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};
	console.log(category)

	fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
		.then(response => response.json())
		.then(response => {
			
			Mostjogos(response);
		})
		.catch(err => console.error(err));

}






let buttonFantasy = document.getElementById("fantasy");
buttonFantasy.addEventListener('click',() => verJogos("fantasy"));

let buttonShooter = document.getElementById("shooter");
buttonShooter.addEventListener('click',() => verJogos("Shooter"));

let buttonSocial = document.getElementById("social");
buttonSocial.addEventListener('click',() => verJogos("Social"));

let buttonMMORPG = document.getElementById("MMORPG");
buttonMMORPG.addEventListener('click',() => verJogos("MMORPG"));

let buttonStrategy = document.getElementById("Strategy");
buttonStrategy.addEventListener('click',() => verJogos("Strategy"));

let buttonFighting = document.getElementById("Fighting");
buttonFighting.addEventListener('click',() => verJogos("Fighting"));

let buttonSports = document.getElementById("Sports");
buttonSports.addEventListener('click',() => verJogos("Sports"));

//let buttonMostrarMais = document.getElementById("mostrarMais");
//buttonMostrarMais.addEventListener('click',somarJogos(quantJogos));