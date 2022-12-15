var quantJogos = 10;
let generos = document.getElementsByClassName("container_filtro");
let plataforma = document.getElementsByClassName("slc_plataforma");
let section_favoritos = document.getElementsByClassName("main_games");
let click_favoritos = document.getElementById("fav");
let btnFavoritar = document.getElementsByClassName("material-symbols-outlined");
const TODOS_JOGOS = [];


let slc_gen = "";
let slc_plat = "all";
const FAVORITOS = [];

console.log(FAVORITOS);

const favo = (idJogo) => {
	// Verifica se o elemento já está no array
	if (!!FAVORITOS.find(element => element.id === idJogo)) {
		FAVORITOS.splice(FAVORITOS.indexOf(element => element.id === idJogo), 1); // Remove caso já exista
		console.log("Removeu: ", FAVORITOS);
		return;
	}

	// Adiciona um novo elemento no array
	let jogoFavorito = TODOS_JOGOS[0].find(element => element.id === idJogo);
	FAVORITOS.push(jogoFavorito);
	// Todo: Manipudar classe com taggleClass, addClass e RemoveClass

	// todo: Persistir dados em localStorage

	console.log("inseriu: ", FAVORITOS);
}


const ver_favorito = () => {
	for (var i = 0; i < FAVORITOS.length; i++) {
		section_favoritos.innerHTML += `<a href="${FAVORITOS[i].freetogame_profile_url}" id="freetogame_profile_url">
		<div class="thumbnail"><img src="${FAVORITOS[i].thumbnail}" class="thumbnail" alt=""></div>
		<h4 id="title">${FAVORITOS[i].title}</h4></a>`
	}
}


const selecao_genero = (gen) => {
	if (quantJogos > 10) {
		quantJogos = 10;
	}

	if (gen == "home") {
		slc_gen = "";
	}
	else {
		slc_gen = gen;
	}

	verJogos(slc_gen, slc_plat);
}

const selecao_plataforma = (plat) => {
	if (quantJogos > 10) {
		quantJogos = 10;
	}
	slc_plat = plat;
	verJogos(slc_gen, slc_plat);
}

function somarJogos() {
	quantJogos += 10;
	verJogos(slc_gen, slc_plat);
}

let buttonMostrarMais = document.getElementById("btn_carregar_mais");
buttonMostrarMais.addEventListener('click', somarJogos);

function Mostjogos(jogos) {
	document.getElementById("containerBanner").innerHTML = `<a href="${jogos[0].freetogame_profile_url}" id="freetogame_profile_url">

	<div id="img_banner"><img src="${jogos[0].thumbnail}" class="thumbnail" alt=""></div>
	<h4 id="title">${jogos[0].title}</h4></a>`

	document.getElementById("containerJogo").innerHTML = '';

	for (var i = 1; i < quantJogos; i++) {
		document.getElementById("containerJogo").innerHTML += `
		<a href="${jogos[i].freetogame_profile_url}" id="freetogame_profile_url"> <div class="game" > <div><img src="${jogos[i].thumbnail}" class="thumbnail" alt=""></div></a>
		<div id="alinhar_text_botao">
			<h4 id="title">${jogos[i].title}</h4>
			<button class="btn_favoritar" onclick="favo(${jogos[i].id})" ><span class="material-symbols-outlined">star</span></button>
		</div>
		
		</div>`;
	}
}

const verJogos = (category, plataform) => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '0c67e168ddmshf8b4ef8bed5ff13p141ca2jsn943ceb9c73c3',
			'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
		}
	};

	if (category == "") {
		category = ``;
	}
	else {
		category = `&category=${category}`;
	}

	fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=${plataform}${category}&sort-by=popularity`, options)
		.then(response => response.json())
		.then(response => {
			TODOS_JOGOS.push(response);
			Mostjogos(TODOS_JOGOS[0]);
			Mostjogos(response);
		})
		.catch(err => console.error(err));
}

verJogos(slc_gen, slc_plat);

generos[0].addEventListener("click", () => selecao_genero(generos[0].id));
generos[1].addEventListener("click", () => selecao_genero(generos[1].id));
generos[2].addEventListener("click", () => selecao_genero(generos[2].id));
generos[3].addEventListener("click", () => selecao_genero(generos[3].id));
generos[4].addEventListener("click", () => selecao_genero(generos[4].id));
generos[5].addEventListener("click", () => selecao_genero(generos[5].id));
generos[6].addEventListener("click", () => selecao_genero(generos[6].id));
generos[7].addEventListener("click", () => selecao_genero(generos[7].id));

plataforma[0].addEventListener("click", () => selecao_plataforma(plataforma[0].id));
plataforma[1].addEventListener("click", () => selecao_plataforma(plataforma[1].id));
plataforma[2].addEventListener("click", () => selecao_plataforma(plataforma[2].id));

click_favoritos.addEventListener('click', () => ver_favorito());


