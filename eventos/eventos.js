const divBebida = document.querySelector(".bebidas");
const spanBadge = document.querySelector("span.position-absolute");

// Importa a biblioteca Axios para fazer requisições HTTP
const axios = require('axios');

// Declaração de uma função assíncrona chamada carregaBebidas
const carregaEventos = async () => {
  try {
    // Faz uma requisição GET para o endpoint "http://localhost:3000/bebidas"
    const response = await axios.get("http://localhost:3000/bebidas");
    
    // Armazena os dados da resposta (bebidas) na variável 'bebidas'
    eventos = response.data;

    // Inicializa uma string vazia para armazenar o HTML que será gerado dinamicamente
    let resposta = "";

    // Itera sobre cada bebida e adiciona o HTML correspondente à string 'resposta'
    for (const evento of eventos) {
      resposta += `
        <div class="col-6 col-sm-5 col-md-4">
          <div class="card">
            <img src="${evento.foto}" class="card-img-top" alt="${evento.nome}">
            <div class="card-body">
              <h5 class="card-title">Tipo: ${evento.titulo}</h5>
              <hr>
              <p class="card-text">${evento.texto}</p>
              <hr>
            </div>
          </div>    
        </div>  
      `;
    }

    // Atualiza o conteúdo da div com id 'divBebida' com a string 'resposta'
    divEventos.innerHTML = resposta;

    // Recupera as bebidas compradas do armazenamento local e atualiza a quantidade no span com id 'spanBadge'
    eventosAnunciados = localStorage.getItem("bebidas")
      ? localStorage.getItem("eventos").split(";")
      : [];
    spanBadge.innerText = eventosAnunciados.length;
  } catch (error) {
    // Se ocorrer um erro durante a requisição, exibe uma mensagem de erro no console
    console.error("Erro ao carregar bebidas:", error);
  }
};

// Adiciona um ouvinte de eventos que chama a função carregaBebidas quando a janela é carregada
window.addEventListener("load", carregaEventos);

divBebida.addEventListener("click", (e) => {
    // Verifica se o elemento clicado possui a classe "btAdicionar"
    if (e.target.classList.contains("btAdicionar")) {
      // Obtém a referência ao elemento pai do botão clicado (o bloco de cartão)
      const div = e.target.parentElement;
  
      // Obtém o elemento <h5> dentro do bloco de cartão
      const tagH5 = div.querySelector("h5");
  
      // Obtém o nome da bebida do elemento com a classe "card-text" dentro do bloco de cartão
      const tituloEvento = tagH5.innerText.split("\nTipo: ")[1];
      
      // Obtém o tipo da bebida a partir do texto dentro do elemento <h5>
      const textoEvento = div.querySelector(".card-text").innerText;
  
  
      // Cria um objeto contendo as informações da bebida
      const bebidaObj = {
        nome: tituloEvento,
        texto: textoEvento,
      };
  
      // Adiciona o objeto bebida à lista de bebidas compradas
      eventos.push(bebidaObj);
  
      // Atualiza a quantidade de bebidas compradas no elemento de span com id 'spanBadge'
      spanBadge.innerText = eventosAnunciados.length;
  
      // Atualiza as bebidas compradas no armazenamento local, convertendo a lista para uma string com ';' como delimitador
      localStorage.setItem("eventos", eventosAnunciados.map(bebida => bebida.id).join(";"));
  
      // Exibe as bebidas compradas no console para fins de depuração
      console.log(eventosAnunciados);
    }
  });