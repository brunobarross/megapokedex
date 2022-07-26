const pokemonsWrapper = document.querySelector('.pokemon-wrapper');
const navtabs = document.querySelectorAll('.navtabs button');
let promisesPoke = [];

const getAllPokemonsLoop = () => {
  for (let i = 1; i <= 150; i++) {
    const url_pokeapi = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promisesPoke.push(fetch(url_pokeapi).then((res) => res.json()));
  }
  return promisesPoke;
};

const templateCard = (data) => {
  const { name, types, id, sprites } = data;

  return `
    <div class="card-pokemon">
      <div class="sprite">
        <img src="${sprites.front_default}">     
      </div>
      <h3>${name}</h3>
      <p>ID: <span>${id}</span></p>
      <div class="types">
        ${types
          .map((i) => `<div class="badge">${i.type.name}</div>`)
          .join('')}      
    
      </div>
      <div class="btn-container">
        <button>Ver detalhes</button>
      </div>
    </div>
  
  `;
};

const promiseAllPoke = async () => {
  const resolvePromises = await Promise.all(getAllPokemonsLoop());
  const mapResolvePromises = resolvePromises
    .map((i) => templateCard(i))
    .join('');
  return mapResolvePromises;
};

const promiseFilterPoke = async () => {
  const resolvePromises = await Promise.all(getAllPokemonsLoop());
  const mapResolvePromises = resolvePromises.filter((i) =>
    i.types.map((t) => t.type.name == 'electric'),
  );

  console.log(mapResolvePromises);
};

const renderInitialPokemons = async () => {
  pokemonsWrapper.innerHTML = await promiseAllPoke();
};

renderInitialPokemons();

navtabs.forEach((button) => {
  button.addEventListener('click', (e) => {
    const dataType = e.currentTarget.getAttribute('data-type');
    promiseFilterPoke();
  });
});
