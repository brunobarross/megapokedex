function pokedexScript() {
  const pokemonsWrapper = document.querySelector('.pokemon-wrapper');
  const navtabs = document.querySelectorAll('.navtabs button');
  let ArraypromisesPoke = [];

  for (let i = 1; i <= 150; i++) {
    const url_pokeapi = `https://pokeapi.co/api/v2/pokemon/${i}`;
    ArraypromisesPoke.push(fetch(url_pokeapi).then((res) => res.json()));
  }

  const templateCard = (data) => {
    const { name, types, id, sprites } = data;
    return `
      <div class="card-pokemon" data-id=${id}>
        <div class="sprite">
          <img src="${sprites.front_default}">     
        </div>
        <h3>${name}</h3>
        <p>ID: <span>${id}</span></p>
        <div class="types">
          ${types
            .map(
              (i) => `<div class="badge ${i.type.name}">${i.type.name}</div>`,
            )
            .join('')}      
      
        </div>
        <div class="btn-container">
          <button>Ver detalhes</button>
        </div>
      </div>
    
    `;
  };

  const promiseAllPokemons = async () => {
    const resolvePromises = await Promise.all(ArraypromisesPoke);
    const mapResolvePromises = resolvePromises
      .map((i) => templateCard(i))
      .join('');

    return mapResolvePromises;
  };

  const promiseFilteredPokemons = async (type) => {
    const resolvePromises = await Promise.all(ArraypromisesPoke);
    const mapToFilteredPokemons = resolvePromises
      .filter((i) => i.types.some((t) => t.type.name == type))
      .map((i) => templateCard(i))
      .join('');

    return mapToFilteredPokemons;
  };

  const renderTemplateInHTML = async (container, template) => {
    container.innerHTML = await template;
  };

  navtabs.forEach((button) => {
    button.addEventListener('click', (e) => {
      const dataType = e.currentTarget.getAttribute('data-type');
      dataType == 'todos'
        ? renderTemplateInHTML(pokemonsWrapper, promiseAllPokemons())
        : renderTemplateInHTML(
            pokemonsWrapper,
            promiseFilteredPokemons(dataType),
          );
    });
  });

  function init() {
    renderTemplateInHTML(pokemonsWrapper, promiseAllPokemons());
  }
  return {
    init,
  };
}

pokedexScript().init();
