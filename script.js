/* ===== 1. DADOS E FUNÇÕES AUXILIARES ===== */

// Número do WhatsApp da loja (troque só aqui)
// (o número deve ter DDI+DDD, sem espaços ou símbolos)
var ZAP = 'https://wa.me/5511965310564'; // guarda o link base do WhatsApp da loja (wa.me/ + número)

// Recebe um texto e devolve o link do WhatsApp já com a mensagem pronta
// encodeURIComponent troca espaços e acentos por códigos aceitos em links
function linkZap(mensagem) { // cria a função linkZap, que recebe um texto opcional
  if (!mensagem) return ZAP; // sem mensagem: devolve só o link base
  return ZAP + '?text=' + encodeURIComponent(mensagem); // com mensagem: junta o link base com ?text= e a mensagem codificada
} // fim do bloco

// Ícone do WhatsApp em HTML (o desenho fica definido uma vez no index.html)
var iconeZap = '<svg class="icone-zap"><use href="#icone-zap"></use></svg>'; // texto HTML que desenha o ícone do WhatsApp (definido no index.html)

// "Pages" guarda todas as páginas do site. Cada página tem:
//   render() -> devolve o HTML da página
//   init()   -> liga os cliques e efeitos depois que o HTML entra na tela
var Pages = {}; // cria o objeto vazio que vai guardar todas as páginas


/* ===== 2. PÁGINA HOME ===== */

// Lista dos produtos do carrossel: nome, nome do arquivo da imagem (sem .webp) e para onde o card leva
var produtosHome = [ // começa a lista dos cards do carrossel
  { nome: 'Canecas',           imagem: 'canecas',           link: '#/canecas' }, // card "Canecas": foto canecas.webp, leva para #/canecas
  { nome: 'Camisetas',         imagem: 'camisetas',         link: '#/camisetas' }, // card "Camisetas": foto camisetas.webp, leva para #/camisetas
  { nome: 'Kits',              imagem: 'kits',              link: '#/kits' }, // card "Kits": foto kits.webp, leva para #/kits
  { nome: 'Copos térmicos',    imagem: 'copos-termicos',    link: '#/catalogo' }, // card "Copos térmicos": foto copos-termicos.webp, leva para #/catalogo
  { nome: 'Garrafas térmicas', imagem: 'garrafas-termicas', link: '#/catalogo' }, // card "Garrafas térmicas": foto garrafas-termicas.webp, leva para #/catalogo
  { nome: 'Fraldas de boca',   imagem: 'fraldas-de-boca',   link: '#/catalogo' }, // card "Fraldas de boca": foto fraldas-de-boca.webp, leva para #/catalogo
  { nome: 'Aventais',          imagem: 'aventais',          link: '#/catalogo' }, // card "Aventais": foto aventais.webp, leva para #/catalogo
  { nome: 'Body',              imagem: 'body',              link: '#/catalogo' }, // card "Body": foto body.webp, leva para #/catalogo
  { nome: 'Chaveiros',         imagem: 'chaveiros',         link: '#/catalogo' } // card "Chaveiros": foto chaveiros.webp, leva para #/catalogo
]; // fim da lista

Pages.home = { // define a página Home
  title: 'SR Personalizados', // título da aba do navegador nesta página

  render: function () { // função que devolve o HTML da página
    // .map percorre a lista e devolve um pedaço de HTML por produto; .join('') junta tudo em um texto só
    var cards = produtosHome.map(function (p) { // percorre a lista de produtos, um por vez (p = produto atual)
      // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
      return `<a class="card" href="${p.link}">
          <img src="images/${p.imagem}.webp" alt="${p.nome}" width="600" height="600" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
          <span>${p.nome}</span> <!-- trecho de texto com texto -->
        </a>`; // fim do HTML desta função
    }).join(''); // fim do .map; .join('') junta todos os cartões em um único texto

    // monta o HTML da Home. ${...} insere valores de variáveis dentro do texto
    // ordem: Banner > Carrossel > Por que a SR > Como funciona > Chamada > Catálogo > Sobre > FAQ
    // tudo dentro de UM container (.wrap), por isso tudo tem a mesma largura
    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `
<div class="wrap"> <!-- bloco (div) (classe "wrap") -->

  <div class="hero"> <!-- bloco (div) (classe "hero") -->
    <p class="etiqueta">Personalizados com carinho</p> <!-- parágrafo com texto (classe "etiqueta") -->
    <h1>Presentes que contam histórias</h1> <!-- título principal com texto -->
    <p class="lead">Canecas, camisetas e kits personalizados, feitos com carinho para cada ocasião.</p> <!-- parágrafo com texto (classe "lead") -->
    <img class="banner" src="images/banner.webp" width="1400" height="933" <!-- imagem (classe "banner") -->
         alt="Canecas, camisetas, body de bebê, avental e garrafas personalizados"> <!-- continuação da tag da linha de cima (alt) -->
  </div> <!-- fim: bloco (div) -->

  <section class="secao"> <!-- seção (classe "secao") -->
    <h2>O que você encontra aqui</h2> <!-- título de seção com texto -->
    <div class="carrossel"> <!-- bloco (div) (classe "carrossel") -->
      <button class="seta seta-esq" type="button" aria-label="Produtos anteriores" hidden> <!-- botão (classe "seta seta-esq"; aria-label = rótulo para leitores de tela; começa escondido) -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg> <!-- desenho vetorial (ícone SVG) + traço do desenho (começa escondido) -->
      </button> <!-- fim: botão -->
      <div class="track">${cards}</div> <!-- bloco (div) com texto (classe "track") -->
      <button class="seta seta-dir" type="button" aria-label="Próximos produtos"> <!-- botão (classe "seta seta-dir"; aria-label = rótulo para leitores de tela) -->
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg> <!-- desenho vetorial (ícone SVG) + traço do desenho (começa escondido) -->
      </button> <!-- fim: botão -->
    </div> <!-- fim: bloco (div) -->
  </section> <!-- fim: seção -->

  <section class="secao por-que"> <!-- seção (classe "secao por-que") -->
    <h2>Por que a SR?</h2> <!-- título de seção com texto -->
    <ul> <!-- lista -->
      <li>Personalização de verdade</li> <!-- item da lista com texto -->
      <li>Qualidade em cada detalhe</li> <!-- item da lista com texto -->
      <li>Feito com carinho para você</li> <!-- item da lista com texto -->
    </ul> <!-- fim: lista -->
  </section> <!-- fim: seção -->

  <section class="secao como-funciona"> <!-- seção (classe "secao como-funciona") -->
    <h2>Como funciona</h2> <!-- título de seção com texto -->
    <div class="passos"> <!-- bloco (div) (classe "passos") -->
      <div class="passo"><span class="numero">1</span>Escolha o produto</div> <!-- bloco (div) + trecho de texto (classe "passo") -->
      <div class="passo"><span class="numero">2</span>Personalize com a sua ideia</div> <!-- bloco (div) + trecho de texto (classe "passo") -->
      <div class="passo"><span class="numero">3</span>Peça o orçamento</div> <!-- bloco (div) + trecho de texto (classe "passo") -->
      <div class="passo"><span class="numero">4</span>Combine os detalhes e receba</div> <!-- bloco (div) + trecho de texto (classe "passo") -->
    </div> <!-- fim: bloco (div) -->
  </section> <!-- fim: seção -->

  <section class="secao chamada"> <!-- seção (classe "secao chamada") -->
    <h3>Gostou de algum produto?</h3> <!-- subtítulo com texto -->
    <p>Chame a gente e faça seu orçamento.</p> <!-- parágrafo com texto -->
    <a class="botao botao-branco" href="${linkZap()}" target="_blank" rel="noopener">${iconeZap}Falar no WhatsApp</a> <!-- link com texto (classe "botao botao-branco"; vai para ${linkZap()}; abre em nova aba) -->
  </section> <!-- fim: seção -->

  ${Pages.catalogo.section()} <!-- o JavaScript insere aqui: ${Pages.catalogo.section()} -->
  ${Pages.sobre.section()} <!-- o JavaScript insere aqui: ${Pages.sobre.section()} -->
  ${Pages.faq.section()} <!-- o JavaScript insere aqui: ${Pages.faq.section()} -->

</div>`; // fim do HTML desta função
  }, // fim da função, segue o próximo item

  // roda depois que o HTML da Home já está na tela (app = o elemento <main>)
  init: function (app) { // função que liga cliques e efeitos (app = o <main> onde a página está)
    // --- "Por que a SR?": clicar destaca o item ---
    // cada clique alterna (liga/desliga) a classe 'marcado', que o CSS usa para destacar
    app.querySelectorAll('.por-que li').forEach(function (item) { // para cada item da lista "Por que a SR?"
      item.addEventListener('click', function () { // quando clicar no item...
        item.classList.toggle('marcado'); // ...liga ou desliga a classe 'marcado' (o CSS destaca o item)
      }); // fim da função interna
    }); // fim da função interna

    // --- "Como funciona": só um passo fica marcado ---
    var passos = app.querySelectorAll('.passo'); // pega todos os 4 passos de "Como funciona"
    passos.forEach(function (passo) { // para cada passo
      passo.addEventListener('click', function () { // quando clicar no passo...
        passos.forEach(function (outro) { outro.classList.remove('marcado'); }); // ...tira a marca de todos os passos...
        passo.classList.add('marcado'); // ...e marca só o que foi clicado
      }); // fim da função interna
    }); // fim da função interna

    // --- Carrossel: setas para rolar os cards ---
    // 'track' é a faixa de cards; as duas variáveis seguintes são os botões de seta
    var track = app.querySelector('.track'); // pega a faixa que rola de lado
    var setaEsq = app.querySelector('.seta-esq'); // pega o botão da seta esquerda
    var setaDir = app.querySelector('.seta-dir'); // pega o botão da seta direita

    // mostra/esconde cada seta conforme a posição da rolagem
    // (scrollLeft = quanto já rolou; scrollWidth = largura total; clientWidth = largura visível)
    function atualizarSetas() { // função que mostra ou esconde as setas
      var fim = track.scrollWidth - track.clientWidth - 4; // calcula a posição do fim da rolagem (com 4px de folga)
      setaEsq.hidden = track.scrollLeft <= 4; // esconde a seta esquerda se estiver no começo
      setaDir.hidden = track.scrollLeft >= fim; // esconde a seta direita se chegou ao fim
    } // fim do bloco

    // direcao: -1 volta, 1 avança; 'smooth' faz a rolagem suave
    function rolar(direcao) { // função que rola o carrossel (direcao = -1 volta, 1 avança)
      var passo = track.clientWidth * 0.8; // cada clique anda 80% da largura visível
      track.scrollBy({ left: direcao * passo, behavior: 'smooth' }); // rola para o lado com animação suave
    } // fim do bloco

    // liga os cliques e atualiza as setas quando rolar ou redimensionar a janela
    setaEsq.addEventListener('click', function () { rolar(-1); }); // clique na seta esquerda: volta
    setaDir.addEventListener('click', function () { rolar(1); }); // clique na seta direita: avança
    track.addEventListener('scroll', atualizarSetas); // ao rolar a faixa, atualiza as setas
    window.addEventListener('resize', atualizarSetas); // ao mudar o tamanho da janela, atualiza as setas
    atualizarSetas(); // ajusta as setas já na primeira vez

    // --- Sobre nós e FAQ ---
    Pages.sobre.init(app); // liga o efeito do bloco "Sobre nós"
    Pages.faq.init(app); // liga o acordeão do FAQ
  } // fim do bloco
}; // fim do bloco/objeto


/* ===== 3. SEÇÕES DA HOME: CATÁLOGO, SOBRE NÓS E FAQ ===== */

// ----- CATÁLOGO (fotos em images/catalogo/) -----
// A função section() devolve só um pedaço da Home (não é uma página separada)
Pages.catalogo = { // define o catálogo da Home (é só uma seção)
  title: 'Catálogo de Presentes | SR Personalizados', // título da aba quando o endereço é #/catalogo

  section: function () { // função que devolve o HTML da seção
    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `
<section class="secao" id="secao-catalogo"> <!-- seção (classe "secao"; id "secao-catalogo") -->
  <p class="etiqueta">Catálogo</p> <!-- parágrafo com texto (classe "etiqueta") -->
  <h2 class="titulo-grande">Escolha o seu presente</h2> <!-- título de seção com texto (classe "titulo-grande") -->

  <article class="produto"> <!-- cartão (article) (classe "produto") -->
    <h3>Canecas</h3> <!-- subtítulo com texto -->
    <p>Personalize seus momentos com canecas exclusivas: designs criativos, qualidade e muito estilo para o seu café do dia a dia.</p> <!-- parágrafo com texto -->
    <div class="galeria"> <!-- bloco (div) (classe "galeria") -->
      <img src="images/catalogo/canecas-aranha.webp" alt="Canecas Homem-Aranha" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
      <img src="images/catalogo/canecas-vidro-nome.webp" alt="Caneca de vidro fosco com nome" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
    </div> <!-- fim: bloco (div) -->
    <a class="botao" href="${linkZap('Olá! Gostaria de pedir um orçamento de Canecas.')}" target="_blank" rel="noopener">Pedir orçamento</a> <!-- link com texto (classe "botao"; vai para ${linkZap('Olá! Gostaria de pedir um orçamento de Canecas.')}; abre em nova aba) -->
    <a class="link-todas" href="#/canecas">Ver todas as canecas</a> <!-- link com texto (classe "link-todas"; vai para #/canecas) -->
  </article> <!-- fim: cartão (article) -->

  <article class="produto"> <!-- cartão (article) (classe "produto") -->
    <h3>Camisetas</h3> <!-- subtítulo com texto -->
    <p>Camisetas que têm a sua cara: conforto e muito detalhe, ótimas para grupos, eventos e para divulgar o seu sonho.</p> <!-- parágrafo com texto -->
    <div class="galeria"> <!-- bloco (div) (classe "galeria") -->
      <img src="images/catalogo/camiseta-cachorro-bike.webp" alt="Camiseta marrom estampada" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
      <img src="images/catalogo/camiseta-one-piece.webp" alt="Camiseta preta estampada" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
    </div> <!-- fim: bloco (div) -->
    <a class="botao" href="${linkZap('Olá! Gostaria de pedir um orçamento de Camisetas.')}" target="_blank" rel="noopener">Pedir orçamento</a> <!-- link com texto (classe "botao"; vai para ${linkZap('Olá! Gostaria de pedir um orçamento de Camisetas.')}; abre em nova aba) -->
    <a class="link-todas" href="#/camisetas">Ver todas as camisetas</a> <!-- link com texto (classe "link-todas"; vai para #/camisetas) -->
  </article> <!-- fim: cartão (article) -->

  <article class="produto"> <!-- cartão (article) (classe "produto") -->
    <h3>Kits especiais</h3> <!-- subtítulo com texto -->
    <p>Kits preparados com carinho para momentos inesquecíveis: presentes, lembrancinhas e combinações perfeitas para celebrar e agradecer.</p> <!-- parágrafo com texto -->
    <div class="galeria"> <!-- bloco (div) (classe "galeria") -->
      <img src="images/catalogo/kit-calendario.webp" alt="Kit caneca e quadro com calendário" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
      <img src="images/catalogo/kit-almofada.webp" alt="Kit caneca e almofada" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
    </div> <!-- fim: bloco (div) -->
    <a class="botao" href="${linkZap('Olá! Vim pelo site e gostaria de saber mais sobre os Kits Especiais.')}" target="_blank" rel="noopener">Falar no WhatsApp</a> <!-- link com texto (classe "botao"; vai para ${linkZap('Olá! Vim pelo site e gostaria de saber mais sobre os Kits Especiais.')}; abre em nova aba) -->
    <a class="link-todas" href="#/kits">Ver todos os kits</a> <!-- link com texto (classe "link-todas"; vai para #/kits) -->
  </article> <!-- fim: cartão (article) -->
</section>`; // fim do HTML desta função
  } // fim do bloco
}; // fim do bloco/objeto

// ----- SOBRE NÓS -----
// Texto da loja e citação em destaque
Pages.sobre = { // define a seção "Sobre nós"
  title: 'Sobre nós | SR Personalizados', // título da aba para #/sobre

  section: function () { // função que devolve o HTML da seção
    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `
<section class="secao" id="secao-sobre"> <!-- seção (classe "secao"; id "secao-sobre") -->
  <p class="etiqueta">Sobre nós</p> <!-- parágrafo com texto (classe "etiqueta") -->
  <h2 class="titulo-grande">Conheça a SR Personalizados</h2> <!-- título de seção com texto (classe "titulo-grande") -->

  <div class="sobre-texto"> <!-- bloco (div) (classe "sobre-texto") -->
    <p>Eu sou a Suelen e, junto com meu esposo Cleyton, estou por trás da SR. Ela nasceu de um sonho que já vinha sendo construído e ganhou coragem, forma e vida em março de 2026.</p> <!-- parágrafo com texto -->
    <p>Eu sempre amei presentear com significado, daqueles que a gente guarda e que, anos depois, fazem lembrar de alguém ou de um momento especial</p> <!-- parágrafo com texto -->
    <p>Nunca quisemos ser apenas "a loja que faz canecas". Aqui, nenhum pedido é "só mais um pedido": cada detalhe é feito com capricho, carinho e amor.</p> <!-- parágrafo com texto -->
  </div> <!-- fim: bloco (div) -->

  <blockquote class="destaque"> <!-- citação (classe "destaque") -->
    <p>Transformar ideias em presentes únicos e cheios de significado.</p> <!-- parágrafo com texto -->
    <footer>— Suelen Rodrigues, SR Personalizados</footer> <!-- rodapé com texto -->
  </blockquote> <!-- fim: citação -->
</section>`; // fim do HTML desta função
  }, // fim da função, segue o próximo item

  init: function (app) { // função que liga cliques e efeitos (app = o <main> onde a página está)
    // IntersectionObserver avisa quando o elemento aparece na tela; se o navegador não tiver, não faz o efeito
    var destaque = app.querySelector('.destaque'); // pega o bloco da citação em destaque
    if (!('IntersectionObserver' in window)) return; // se o navegador não tem IntersectionObserver, para aqui (sem efeito)

    destaque.classList.add('escondido'); // esconde a citação até ela aparecer na tela

    var observador = new IntersectionObserver(function (entradas) { // cria um "vigia" que avisa quando o elemento aparece
      if (entradas[0].isIntersecting) { // se o elemento já está visível...
        destaque.classList.remove('escondido'); // ...mostra a citação com a animação
        observador.disconnect(); // ...e desliga o vigia (só precisa avisar uma vez)
      } // fim do bloco
    }, { threshold: 0.25 }); // avisa quando 25% do elemento estiver visível

    observador.observe(destaque); // começa a vigiar a citação
  } // fim do bloco
}; // fim do bloco/objeto

// ----- FAQ -----
// Perguntas e respostas (acordeão: abre uma e fecha as outras)
Pages.faq = { // define a seção FAQ
  title: 'Perguntas Frequentes | SR Personalizados', // título da aba para #/faq

  section: function () { // função que devolve o HTML da seção
    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `
<section class="secao" id="secao-faq"> <!-- seção (classe "secao"; id "secao-faq") -->
  <p class="etiqueta">FAQ</p> <!-- parágrafo com texto (classe "etiqueta") -->
  <h2 class="titulo-grande">Perguntas frequentes</h2> <!-- título de seção com texto (classe "titulo-grande") -->

  <article class="item"> <!-- cartão (article) (classe "item") -->
    <button class="item__btn" aria-expanded="false" aria-controls="r1" id="q1">Como faço meu pedido?</button> <!-- botão com texto (classe "item__btn"; id "q1"; aria-expanded = aberto/fechado) -->
    <div class="item__painel" id="r1" role="region" aria-labelledby="q1"> <!-- bloco (div) (classe "item__painel"; id "r1"; aria-label = rótulo para leitores de tela) -->
      <p><strong>Pelo WhatsApp</strong>: escolha o produto, conte sua ideia, depois combinamos os detalhes.</p> <!-- parágrafo + texto em negrito -->
    </div> <!-- fim: bloco (div) -->
  </article> <!-- fim: cartão (article) -->

  <article class="item"> <!-- cartão (article) (classe "item") -->
    <button class="item__btn" aria-expanded="false" aria-controls="r2" id="q2">Qual o prazo de entrega?</button> <!-- botão com texto (classe "item__btn"; id "q2"; aria-expanded = aberto/fechado) -->
    <div class="item__painel" id="r2" role="region" aria-labelledby="q2"> <!-- bloco (div) (classe "item__painel"; id "r2"; aria-label = rótulo para leitores de tela) -->
      <p>De até 4 dias úteis dependendo do produto.</p> <!-- parágrafo com texto -->
    </div> <!-- fim: bloco (div) -->
  </article> <!-- fim: cartão (article) -->

  <article class="item"> <!-- cartão (article) (classe "item") -->
    <button class="item__btn" aria-expanded="false" aria-controls="r3" id="q3">Quais as formas de pagamento?</button> <!-- botão com texto (classe "item__btn"; id "q3"; aria-expanded = aberto/fechado) -->
    <div class="item__painel" id="r3" role="region" aria-labelledby="q3"> <!-- bloco (div) (classe "item__painel"; id "r3"; aria-label = rótulo para leitores de tela) -->
      <p>Débito, crédito e Pix</p> <!-- parágrafo com texto -->
    </div> <!-- fim: bloco (div) -->
  </article> <!-- fim: cartão (article) -->

  <div class="duvida"> <!-- bloco (div) (classe "duvida") -->
    <h2>Ficou com dúvida?</h2> <!-- título de seção com texto -->
    <a class="botao botao-branco" href="${linkZap()}" target="_blank" rel="noopener">Falar no WhatsApp</a> <!-- link com texto (classe "botao botao-branco"; vai para ${linkZap()}; abre em nova aba) -->
  </div> <!-- fim: bloco (div) -->
</section>`; // fim do HTML desta função
  }, // fim da função, segue o próximo item

  init: function (app) { // função que liga cliques e efeitos (app = o <main> onde a página está)
    // aria-expanded diz ao CSS (e a leitores de tela) se a resposta está aberta
    var botoes = app.querySelectorAll('.item__btn'); // pega todos os botões de pergunta

    botoes.forEach(function (botao) { // para cada pergunta
      botao.addEventListener('click', function () { // quando clicar na pergunta...
        var estavaAberto = botao.getAttribute('aria-expanded') === 'true'; // ...anota se ela já estava aberta
        botoes.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); }); // ...fecha todas as perguntas
        botao.setAttribute('aria-expanded', String(!estavaAberto)); // ...e abre a clicada (se já estava aberta, fica fechada)
      }); // fim da função interna
    }); // fim da função interna

    // a primeira pergunta começa aberta
    botoes[0].setAttribute('aria-expanded', 'true'); // abre a primeira pergunta
  } // fim do bloco
}; // fim do bloco/objeto


/* ===== 4. PÁGINA CANECAS (fotos em images/canecas/) ===== */

// Lista de canecas: nome do arquivo em images/canecas/ (sem .webp) e o nome que aparece na tela
// Para incluir uma caneca nova: coloque a foto na pasta e acrescente uma linha aqui
var canecas = [ // começa a lista de canecas
  { imagem: 'aranha',                nome: 'Canecas Teia (par branca e vermelha)' }, // foto aranha.webp, nome exibido: Canecas Teia (par branca e vermelha)
  { imagem: 'vidro-tamires',         nome: 'Caneca de vidro fosco com nome' }, // foto vidro-tamires.webp, nome exibido: Caneca de vidro fosco com nome
  { imagem: 'vidro-frases',          nome: 'Canecas de vidro fosco com frases' }, // foto vidro-frases.webp, nome exibido: Canecas de vidro fosco com frases
  { imagem: 'meu-par',               nome: 'Caneca Meu Par (casal)' }, // foto meu-par.webp, nome exibido: Caneca Meu Par (casal)
  { imagem: 'feliz-natal',           nome: 'Caneca Feliz Natal (gatinhos)' }, // foto feliz-natal.webp, nome exibido: Caneca Feliz Natal (gatinhos)
  { imagem: 'stitch-angel',          nome: 'Par de canecas Stitch e Angel' }, // foto stitch-angel.webp, nome exibido: Par de canecas Stitch e Angel
  { imagem: 'nao-sou-um-robo',       nome: 'Caneca “Não sou um robô”' }, // foto nao-sou-um-robo.webp, nome exibido: Caneca “Não sou um robô”
  { imagem: 'jesus-ta-la-1',         nome: 'Caneca “Jesus tá lá” (marrom)' }, // foto jesus-ta-la-1.webp, nome exibido: Caneca “Jesus tá lá” (marrom)
  { imagem: 'jesus-ta-la-2',         nome: 'Caneca “Jesus tá lá” (rosa)' }, // foto jesus-ta-la-2.webp, nome exibido: Caneca “Jesus tá lá” (rosa)
  { imagem: 'lindas-tambem',         nome: 'Caneca glitter rosa' }, // foto lindas-tambem.webp, nome exibido: Caneca glitter rosa
  { imagem: 'voce-merece',           nome: 'Caneca “Você merece o mundo”' }, // foto voce-merece.webp, nome exibido: Caneca “Você merece o mundo”
  { imagem: 'xicaras',               nome: 'Xícaras empilháveis com suporte' }, // foto xicaras.webp, nome exibido: Xícaras empilháveis com suporte
  { imagem: 'antes-de-te-conhecer',  nome: 'Par de canecas “Antes de te conhecer”' } // foto antes-de-te-conhecer.webp, nome exibido: Par de canecas “Antes de te conhecer”
]; // fim da lista

// Página que mostra todas as canecas em cartões
Pages.canecas = { // define a página de canecas
  title: 'Canecas | SR Personalizados', // título da aba

  render: function () { // função que devolve o HTML da página
    // cria um cartão para cada caneca da lista acima
    // um cartão por caneca; o botão abre o WhatsApp com uma mensagem citando o produto
    var cartoes = canecas.map(function (c) { // percorre a lista de canecas (c = caneca atual)
      var mensagem = 'Olá! Quero saber mais sobre: ' + c.nome; // monta a mensagem que vai para o WhatsApp
      // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
      return `<article class="prod">
        <img src="images/canecas/${c.imagem}.webp" alt="${c.nome}" loading="lazy"> <!-- imagem (carrega só quando aparece) -->
        <h3>${c.nome}</h3> <!-- subtítulo com texto -->
        <a class="botao" href="${linkZap(mensagem)}" target="_blank" rel="noopener">Pedir no WhatsApp</a> <!-- link com texto (classe "botao"; vai para ${linkZap(mensagem)}; abre em nova aba) -->
      </article>`; // fim do HTML desta função
    }).join(''); // fim do .map; .join('') junta todos os cartões em um único texto

    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `
<div class="wrap"> <!-- bloco (div) (classe "wrap") -->
  <section class="secao"> <!-- seção (classe "secao") -->
    <h2 class="titulo-grande">Canecas</h2> <!-- título de seção com texto (classe "titulo-grande") -->
    <p class="intro">Canecas personalizadas com nome, frase ou a arte que você quiser. Escolha um modelo e fale com a gente.</p> <!-- parágrafo com texto (classe "intro") -->
    <div class="grid">${cartoes}</div> <!-- bloco (div) com texto (classe "grid") -->
  </section> <!-- fim: seção -->
</div>`; // fim do HTML desta função
  } // fim do bloco
}; // fim do bloco/objeto

/* ===== CATÁLOGO DE CAMISETAS E BODY PERSONALIZADOS ===== */
// Lista de camisetas e body: arquivo em images/camisetas/ (sem .webp) e nome exibido
var camisetas = [ // começa a lista de camisetas
  { imagem: 'one-piece', nome: 'Camiseta One Piece' }, // foto one-piece.webp, nome exibido: Camiseta One Piece
  { imagem: 'cachorro-bicicleta', nome: 'Camiseta Cachorro na bicicleta' }, // foto cachorro-bicicleta.webp, nome exibido: Camiseta Cachorro na bicicleta
  { imagem: 'saudades', nome: 'Camiseta Saudades desses olhos' }, // foto saudades.webp, nome exibido: Camiseta Saudades desses olhos
  { imagem: 'bob-esponja', nome: 'Camisetas Bob Esponja' }, // foto bob-esponja.webp, nome exibido: Camisetas Bob Esponja
  { imagem: 'capivara-branca', nome: 'Camiseta Capivara branca' }, // foto capivara-branca.webp, nome exibido: Camiseta Capivara branca
  { imagem: 'corinthians', nome: 'Camiseta Corinthians' }, // foto corinthians.webp, nome exibido: Camiseta Corinthians
  { imagem: 'logo-empresa', nome: 'Camiseta com logotipo personalizado' }, // foto logo-empresa.webp, nome exibido: Camiseta com logotipo personalizado
  { imagem: 'body-bebe', nome: 'Body de bebê personalizado' }, // foto body-bebe.webp, nome exibido: Body de bebê personalizado
  { imagem: 'professora', nome: 'Camiseta para professora' }, // foto professora.webp, nome exibido: Camiseta para professora
  { imagem: 'capivara-marrom', nome: 'Camiseta Capivara marrom' }, // foto capivara-marrom.webp, nome exibido: Camiseta Capivara marrom
  { imagem: 'snoopy-academia', nome: 'Camiseta Snoopy academia' }, // foto snoopy-academia.webp, nome exibido: Camiseta Snoopy academia
  { imagem: 'gym-mode', nome: 'Camiseta Gym Mode' }, // foto gym-mode.webp, nome exibido: Camiseta Gym Mode
  { imagem: 'sua-estampa', nome: 'Camiseta com sua estampa' } // foto sua-estampa.webp, nome exibido: Camiseta com sua estampa
]; // fim da lista

// Página que mostra todas as camisetas em cartões
Pages.camisetas = { // define a página de camisetas
  title: 'Camisetas | SR Personalizados', // título da aba
  render: function () { // função que devolve o HTML da página
    var cartoes = camisetas.map(function (c) { // percorre a lista de camisetas
      // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
      return `<article class="prod">
        <img src="images/camisetas/${c.imagem}.webp" alt="${c.nome}" loading="lazy" width="600" height="600"> <!-- imagem (carrega só quando aparece) -->
        <h3>${c.nome}</h3> <!-- subtítulo com texto -->
        <a class="botao" href="${linkZap('Olá! Quero saber mais sobre: ' + c.nome)}" target="_blank" rel="noopener">Pedir no WhatsApp</a> <!-- link com texto (classe "botao"; vai para ${linkZap('Olá! Quero saber mais sobre: ' + c.nome)}; abre em nova aba) -->
      </article>`; // fim do HTML desta função
    }).join(''); // fim do .map; .join('') junta todos os cartões em um único texto
    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `<div class="wrap"><section class="secao">
      <h2 class="titulo-grande">Camisetas personalizadas</h2> <!-- título de seção com texto (classe "titulo-grande") -->
      <p class="intro">Escolha seu modelo favorito ou peça uma estampa especial. Consulte cores, tamanhos e disponibilidade pelo WhatsApp.</p> <!-- parágrafo com texto (classe "intro") -->
      <div class="grid">${cartoes}</div> <!-- bloco (div) com texto (classe "grid") -->
    </section></div>`; // fim do HTML desta função
  } // fim do bloco
}; // fim do bloco/objeto


/* ===== PÁGINA KITS (fotos em images/kits/) ===== */
// Lista de kits: arquivo em images/kits/ (sem .webp) e nome exibido
var kits = [ // começa a lista de kits
  { imagem: 'kit-calendario',         nome: 'Kit caneca e quadro com fotos e calendário' }, // foto kit-calendario.webp, nome exibido: Kit caneca e quadro com fotos e calendário
  { imagem: 'kit-almofada-chaveiros', nome: 'Kit almofada, caneca e chaveiros com foto' }, // foto kit-almofada-chaveiros.webp, nome exibido: Kit almofada, caneca e chaveiros com foto
  { imagem: 'kit-meu-amor',           nome: 'Kit almofada e caneca “O meu amor é teu”' }, // foto kit-meu-amor.webp, nome exibido: Kit almofada e caneca “O meu amor é teu”
  { imagem: 'copos-casal',            nome: 'Kit copos térmicos para casal' }, // foto copos-casal.webp, nome exibido: Kit copos térmicos para casal
  { imagem: 'canecas-namorados',      nome: 'Kit canecas de casal com chocolates' }, // foto canecas-namorados.webp, nome exibido: Kit canecas de casal com chocolates
  { imagem: 'kit-bestie',             nome: 'Kit presente para amiga (Bestie)' }, // foto kit-bestie.webp, nome exibido: Kit presente para amiga (Bestie)
  { imagem: 'kit-rosa-nome',          nome: 'Kit garrafa, agenda e caneta com nome' }, // foto kit-rosa-nome.webp, nome exibido: Kit garrafa, agenda e caneta com nome
  { imagem: 'kit-branco-nome',        nome: 'Kit copo, agenda, caneta e chaveiro com nome' }, // foto kit-branco-nome.webp, nome exibido: Kit copo, agenda, caneta e chaveiro com nome
  { imagem: 'kit-professora-1',       nome: 'Kit Professora: caneca e bolsinha' }, // foto kit-professora-1.webp, nome exibido: Kit Professora: caneca e bolsinha
  { imagem: 'kit-professora-2',       nome: 'Kit Professora: caneca, bolsinha e chaveiro' }, // foto kit-professora-2.webp, nome exibido: Kit Professora: caneca, bolsinha e chaveiro
  { imagem: 'kit-player',             nome: 'Kit casal Player 1 e Player 2 (camisetas e canecas)' }, // foto kit-player.webp, nome exibido: Kit casal Player 1 e Player 2 (camisetas e canecas)
  { imagem: 'kit-para-todo-sempre',   nome: 'Kit casal “Para todo sempre” (camisetas e canecas)' } // foto kit-para-todo-sempre.webp, nome exibido: Kit casal “Para todo sempre” (camisetas e canecas)
]; // fim da lista

// Página que mostra todos os kits em cartões
Pages.kits = { // define a página de kits
  title: 'Kits | SR Personalizados', // título da aba
  render: function () { // função que devolve o HTML da página
    var cartoes = kits.map(function (k) { // percorre a lista de kits (k = kit atual)
      // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
      return `<article class="prod">
        <img src="images/kits/${k.imagem}.webp" alt="${k.nome}" loading="lazy" width="600" height="750"> <!-- imagem (carrega só quando aparece) -->
        <h3>${k.nome}</h3> <!-- subtítulo com texto -->
        <a class="botao" href="${linkZap('Olá! Quero saber mais sobre: ' + k.nome)}" target="_blank" rel="noopener">Pedir no WhatsApp</a> <!-- link com texto (classe "botao"; vai para ${linkZap('Olá! Quero saber mais sobre: ' + k.nome)}; abre em nova aba) -->
      </article>`; // fim do HTML desta função
    }).join(''); // fim do .map; .join('') junta todos os cartões em um único texto
    // a partir daqui, até a próxima crase, é HTML dentro de um texto (template literal)
    return `<div class="wrap"><section class="secao">
      <h2 class="titulo-grande">Kits especiais</h2> <!-- título de seção com texto (classe "titulo-grande") -->
      <p class="intro">Kits montados com carinho para presentear. Escolha um modelo e fale com a gente para personalizar.</p> <!-- parágrafo com texto (classe "intro") -->
      <div class="grid">${cartoes}</div> <!-- bloco (div) com texto (classe "grid") -->
    </section></div>`; // fim do HTML desta função
  } // fim do bloco
}; // fim do bloco/objeto


/* ===== 5. TROCA DE PÁGINAS (ROTEADOR) E MENU ===== */

// 'app' é o <main> do index.html, onde as páginas são colocadas
var app = document.getElementById('app'); // pega o <main id="app"> do index.html
// guarda qual página está na tela, para só montar de novo quando mudar
var paginaAtual = ''; // começa sem nenhuma página na tela

// páginas de verdade além da Home (as outras rotas são seções da Home)
var paginasInternas = ['canecas', 'camisetas', 'kits']; // lista das páginas que têm tela própria

// seções da Home que o menu de baixo "rola até elas" (rota -> id da seção)
var secoes = { // relaciona o nome da rota ao id da seção na Home
  catalogo: 'secao-catalogo', // #/catalogo rola até a seção do catálogo
  sobre: 'secao-sobre', // #/sobre rola até "Sobre nós"
  faq: 'secao-faq' // #/faq rola até o FAQ
}; // fim do bloco/objeto

// Liga a classe 'on' só no botão da página atual
function marcarMenu(nome) { // função que destaca um botão do menu de baixo
  document.querySelectorAll('nav.bottom a').forEach(function (link) { // para cada botão do menu
    link.classList.toggle('on', link.dataset.page === nome); // liga 'on' se for o botão da página atual; desliga nos outros
  }); // fim da função interna
} // fim do bloco

// Roda ao rolar: nas páginas internas marca "Catálogo"; na Home vê qual seção está no topo
function acompanharRolagem() { // função que descobre qual botão do menu destacar
  if (paginasInternas.indexOf(paginaAtual) !== -1) { // se está numa página interna (canecas, camisetas, kits)...
    marcarMenu('catalogo'); // ...destaca "Catálogo"
    return; // ...e encerra a função
  } // fim do bloco

  var atual = 'home'; // começa supondo que está no topo (Home)
  for (var nome in secoes) { // confere cada seção, uma por vez
    var secao = document.getElementById(secoes[nome]); // pega a seção na tela
    if (secao.getBoundingClientRect().top <= 140) atual = nome; // se o topo da seção já passou de 140px, ela é a atual
  } // fim do bloco
  // chegou no fim da página: FAQ
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) atual = 'faq'; // se chegou ao fim da página, destaca FAQ

  marcarMenu(atual); // destaca o botão encontrado
} // fim do bloco

// É o "roteador": lê o endereço (location.hash, a parte depois do #) e mostra a página certa
function mostrarPagina() { // função que decide e mostra a página
  var rota = location.hash.replace('#/', '');          // '' | 'canecas' | 'camisetas' | 'kits' | 'catalogo' | 'sobre' | 'faq'
  var nome = (paginasInternas.indexOf(rota) !== -1) ? rota : 'home'; // se a rota é uma página interna usa ela; senão, Home

  // só monta a página de novo se ela mudou
  if (nome !== paginaAtual) { // só monta se a página mudou
    app.innerHTML = Pages[nome].render(); // coloca o HTML da página dentro do <main>
    if (Pages[nome].init) Pages[nome].init(app); // se a página tem init, liga os cliques e efeitos
    paginaAtual = nome; // guarda qual página está na tela agora
  } // fim do bloco

  document.title = (Pages[rota] || Pages[nome]).title; // troca o título da aba

  // rola até a seção pedida (ou volta ao topo)
  if (secoes[rota]) { // se a rota é uma seção da Home (catálogo, sobre, faq)...
    document.getElementById(secoes[rota]).scrollIntoView(); // ...rola até ela
  } else { // senão...
    window.scrollTo(0, 0); // ...volta ao topo
  } // fim do bloco

  acompanharRolagem(); // atualiza o destaque do menu
} // fim do bloco

// hashchange: o endereço mudou (clicou num link). scroll: usuário rolou a página
window.addEventListener('hashchange', mostrarPagina); // se o endereço (#) mudar, mostra a página certa
window.addEventListener('scroll', acompanharRolagem); // ao rolar a página, atualiza o menu

// Se o link clicado já é o endereço atual, o navegador não dispara 'hashchange'; então chamamos na mão
document.querySelectorAll('nav.bottom a, .brand').forEach(function (link) { // para cada link do menu de baixo e da marca
  link.addEventListener('click', function (evento) { // quando clicar no link...
    if ((location.hash || '#/') === link.getAttribute('href')) { // ...se o endereço já é o do link...
      evento.preventDefault(); // ...cancela o comportamento padrão...
      mostrarPagina(); // ...e mostra a página na mão
    } // fim do bloco
  }); // fim da função interna
}); // fim da função interna

// mostra a página assim que o site abre
mostrarPagina(); // chama a função uma vez assim que o site abre


/* ===== 6. BOTÃO DO WHATSAPP NO TOPO ===== */

// botão redondo do topo e o cartão que abre ao clicar nele
var botaoZap = document.querySelector('.zap__btn'); // pega o botão redondo do WhatsApp
var cartaoZap = document.getElementById('zap-pop'); // pega o cartão que abre ao clicar

// define o link do botão "Chamar" com uma mensagem inicial
document.getElementById('zap-chamar').href = linkZap('Olá! Vim pelo site da SR Personalizados.'); // define o link do botão "Chamar" com mensagem inicial

// abrir = true mostra o cartão; false esconde
function abrirFecharZap(abrir) { // função que abre (true) ou fecha (false) o cartão
  cartaoZap.hidden = !abrir; // mostra ou esconde o cartão
  botaoZap.setAttribute('aria-expanded', String(abrir)); // informa aos leitores de tela se está aberto
} // fim do bloco

// clicar no botão alterna entre abrir e fechar
botaoZap.addEventListener('click', function () { // quando clicar no botão...
  abrirFecharZap(cartaoZap.hidden); // ...alterna: se estava escondido abre; se aberto fecha
}); // fim da função interna

// clicar fora do cartão ou apertar Esc fecha
document.addEventListener('click', function (evento) { // qualquer clique na página...
  if (!evento.target.closest('.zap')) abrirFecharZap(false); // ...fora da área do WhatsApp fecha o cartão
}); // fim da função interna
document.addEventListener('keydown', function (evento) { // qualquer tecla apertada...
  if (evento.key === 'Escape') abrirFecharZap(false); // ...se for Esc, fecha o cartão
}); // fim da função interna
