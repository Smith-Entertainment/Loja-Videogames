var quantJogos = 10;
let container_Banner = document.getElementById("containerBanner");
let container_Jogo = document.getElementById("containerJogo");
let generos = document.getElementsByClassName("container_filtro");
let plataforma = document.getElementsByClassName("slc_plataforma");
let section_favoritos = document.getElementsByClassName("main_games");
let click_favoritos = document.getElementById("fav");
let btnFavoritar = document.getElementsByClassName("material-symbols-outlined");
let buttonMostrarMais = document.getElementById("btn_carregar_mais");
const TODOS_JOGOS = [];


let slc_gen = ["", 0];
let slc_plat = ["all", 2];
const FAVORITOS = pegar_db();

console.log(FAVORITOS);

const favo = (idJogo, index_botao) => {
	let jogoFavorito = TODOS_JOGOS[0].find(element => element.id === idJogo);
	// Verifica se o elemento já está no array
	if (!!FAVORITOS.find(element => element.id === idJogo)) {
		FAVORITOS.splice(FAVORITOS.indexOf(FAVORITOS.find(element => element.id === idJogo)), 1); // Remove caso já exista
		remove_db();
		btnFavoritar[index_botao].classList.remove("adicionado_favorito");	//Remove a classe de favoritado
		console.log("Removeu: ", FAVORITOS);
		return;
	}

	// Adiciona um novo elemento no array
	FAVORITOS.push(jogoFavorito);
	salvar_db(jogoFavorito);
	btnFavoritar[index_botao].classList.add("adicionado_favorito");	//Adiciona a classe de favoritado

	// todo: Persistir dados em localStorage

	console.log("inseriu: ", FAVORITOS);
}

function ver_favorito() {
	container_Banner.style.display = "none";
	buttonMostrarMais.style.display = "none";

	container_Jogo.innerHTML = '';

	for (var i = 0; i < FAVORITOS.length; i++) {
		container_Jogo.innerHTML += `
		<a href="${FAVORITOS[i].freetogame_profile_url}" id="freetogame_profile_url" target="_blank"> <div class="game" > <div><img src="${FAVORITOS[i].thumbnail}" class="thumbnail" alt=""></div></a>
		<div id="alinhar_text_botao">
			<h4 id="title">${FAVORITOS[i].title}</h4>
			<button class="btn_favoritar " onclick="favo(${FAVORITOS[i].id}, ${i - 1})" ><span class="material-symbols-outlined adicionado_favorito">star</span></button>
		</div>
		
		</div>`;
	}
}

const selecao_genero = (gen, index) => {
	if (quantJogos > 10) {
		quantJogos = 10;
	}

	generos[slc_gen[1]].classList.remove("active_gen");

	if (gen == "home") {
		slc_gen = ["", index];
	}
	else {
		slc_gen = [gen, index];
	}

	generos[index].classList.add("active_gen");

	verJogos(slc_gen[0], slc_plat[0]);
}


const selecao_plataforma = (plat, index) => {

	plataforma[slc_plat[1]].classList.remove("active_plat");

	if (quantJogos > 10) {
		quantJogos = 10;
	}

	plataforma[index].classList.add("active_plat");

	slc_plat = [plat, index];
	verJogos(slc_gen[0], slc_plat[0]);
}

function salvar_db(jogo_favorito){
	let favoritos = pegar_db();

	favoritos.push(jogo_favorito);

	localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function remove_db(){
	localStorage.setItem("favoritos", JSON.stringify(FAVORITOS));
}

function pegar_db(){
	let favoritos;

	if(localStorage.getItem("favoritos") === null)
	{
		favoritos = [];
	}else
	{
		favoritos = JSON.parse(localStorage.getItem("favoritos"));
	}

	return favoritos;
}

function somarJogos() {
	quantJogos += 10;
	verJogos(slc_gen[0], slc_plat[0]);
}

function Mostjogos(jogos) {
	container_Banner.style.display = "block";
	buttonMostrarMais.style.display = "block";

	container_Banner.innerHTML = `<a href="${jogos[0].freetogame_profile_url}" id="freetogame_profile_url" target="_blank">

	<div id="img_banner"><img src="${jogos[0].thumbnail}" class="thumbnail" alt=""></div>
	<h4 id="title">${jogos[0].title}</h4></a>`

	container_Jogo.innerHTML = '';

	for (var i = 1; i < quantJogos; i++) {
		let classe_favorito = "";

		if (!!FAVORITOS.find(element => element.id === jogos[i].id)) {
			classe_favorito = "adicionado_favorito";
		}

		container_Jogo.innerHTML += `
		<a href="${jogos[i].freetogame_profile_url}" id="freetogame_profile_url" target="_blank"> <div class="game" > <div><img src="${jogos[i].thumbnail}" class="thumbnail" alt=""></div></a>
		<div id="alinhar_text_botao">
			<h4 id="title">${jogos[i].title}</h4>
			<button class="btn_favoritar " onclick="favo(${jogos[i].id}, ${i - 1})" ><span class="material-symbols-outlined ${classe_favorito}">star</span></button>
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

verJogos(slc_gen[0], slc_plat[0]);

generos[0].addEventListener("click", () => selecao_genero(generos[0].id, 0));
generos[1].addEventListener("click", () => selecao_genero(generos[1].id, 1));
generos[2].addEventListener("click", () => selecao_genero(generos[2].id, 2));
generos[3].addEventListener("click", () => selecao_genero(generos[3].id, 3));
generos[4].addEventListener("click", () => selecao_genero(generos[4].id, 4));
generos[5].addEventListener("click", () => selecao_genero(generos[5].id, 5));
generos[6].addEventListener("click", () => selecao_genero(generos[6].id, 6));
generos[7].addEventListener("click", () => selecao_genero(generos[7].id, 7));

plataforma[0].addEventListener("click", () => selecao_plataforma(plataforma[0].id, 0));
plataforma[1].addEventListener("click", () => selecao_plataforma(plataforma[1].id, 1));
plataforma[2].addEventListener("click", () => selecao_plataforma(plataforma[2].id, 2));

click_favoritos.addEventListener('click', ver_favorito);
buttonMostrarMais.addEventListener('click', somarJogos);


