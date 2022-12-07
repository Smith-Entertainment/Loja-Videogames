let category;
let jogos;
category = "shooter";




const mostrarJogos = (games)=>{
    for(const game in games){
        console.log(game.release_date);
    }
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0c67e168ddmshf8b4ef8bed5ff13p141ca2jsn943ceb9c73c3',
		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
	}
};

fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options)
	.then(response => response.json())
	.then(response => {//mostrarJogos(response)
        jogos = response;
       let jogo_selecionado = jogos.sort((nameA,nameB)=> {
        if (nameA.release_date < nameB.release_date) {
            return -1;
          }
          if (nameA.release_date > nameB.release_date) {
            return 1;
          }
        
          // names must be equal
          return 0;
       });
        mostrarJogos(jogo_selecionado);
    }
    )
	.catch(err => console.error(err));


