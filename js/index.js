var quantJogos = 10;
let generos = document.getElementsByClassName("container_filtro");
let plataforma = document.getElementsByClassName("slc_plataforma");

let slc_gen;
let slc_plat;


function somarJogos() {
	quantJogos += 10;
}

function Mostjogos(jogos) {
	document.getElementById("containerBanner").innerHTML = `<a href="${jogos[0].freetogame_profile_url}" id="freetogame_profile_url">

	<div id="img_banner"><img src="${jogos[0].thumbnail}" id="thumbnail" alt=""></div>
	<h4 id="title">${jogos[0].title}</h4></a>`

	document.getElementById("containerJogo").innerHTML = '';
	let buttonMostrarMais = document.getElementById("div_btn");
	buttonMostrarMais.addEventListener('click', somarJogos);
	for (var i = 1; i < quantJogos; i++) {
		document.getElementById("containerJogo").innerHTML += `
		<a href="${jogos[i].freetogame_profile_url}" id="freetogame_profile_url"> <div class="game" > <div><img src="${jogos[i].thumbnail}" id="thumbnail" alt=""></div>
		<div id="alinhar_text_botao">
			<h4 id="title">${jogos[i].title}</h4>
			<button id="btn_favoritar"><span class="material-symbols-outlined">star</span></button>
		</div>
		<h4 id="genre"></h4>
		<h4 id="platform"></h4>
		</div>
		</div></a>`;
	}
}


const verJogos = (category)  => {
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

const jogosFavoritos = () =>{
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0c67e168ddmshf8b4ef8bed5ff13p141ca2jsn943ceb9c73c3',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};
	
	fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity', options)
		.then(response => response.json())
		.then(response => {

			Mostjogos(response)
		})
		.catch(err => console.error(err));
}

jogosFavoritos();

for(var i=0; i < generos.length; i++)
{
	generos[i].addEventListener('click', function(){filtros(generos[i].id)});
}


function filtros(genero){
	slc_gen = genero;
}

/*
let buttonFantasy = document.getElementById("fantasy");
buttonFantasy.addEventListener('click',verJogos("fantasy"));

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

let buttonPc = document.getElementById("pc");
buttonPc.addEventListener('click', () => verJogos("sports", "pc"));

let buttonBrowser = document.getElementById("browser");
buttonBrowser.addEventListener('click', () => verJogos("shooter", "browser"));

let buttonAll = document.getElementById("all");
buttonAll.addEventListener('click', () => verJogos("shooter", "all"));*/