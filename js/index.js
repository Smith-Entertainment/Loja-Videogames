
function Mostjogos(jogos) {

	for (i = 0; i < quantJogos; i++) {
		document.getElementById("containerJogo").innerHTML = `<div id="game"> 
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





