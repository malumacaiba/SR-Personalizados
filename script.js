var ZAP = 'https://wa.me/5511965310564';

function linkZap(mensagem) {
  if (!mensagem) return ZAP;
  return ZAP + '?text=' + encodeURIComponent(mensagem);
}

var iconeZap = '<svg class="icone-zap"><use href="#icone-zap"></use></svg>';

var Pages = {};

var produtosHome = [
  { nome: 'Canecas',           imagem: 'canecas',           link: '#/canecas' },
  { nome: 'Camisetas',         imagem: 'camisetas',         link: '#/camisetas' },
  { nome: 'Kits',              imagem: 'kits',              link: '#/kits' },
  { nome: 'Copos térmicos',    imagem: 'copos-termicos',    link: '#/catalogo' },
  { nome: 'Garrafas térmicas', imagem: 'garrafas-termicas', link: '#/catalogo' },
  { nome: 'Fraldas de boca',   imagem: 'fraldas-de-boca',   link: '#/catalogo' },
  { nome: 'Aventais',          imagem: 'aventais',          link: '#/catalogo' },
  { nome: 'Body',              imagem: 'body',              link: '#/catalogo' },
  { nome: 'Chaveiros',         imagem: 'chaveiros',         link: '#/catalogo' }
];

Pages.home = {
  title: 'SR Personalizados',

  render: function () {
    var cards = produtosHome.map(function (p) {
      return `<a class="card" href="${p.link}">
          <img src="images/${p.imagem}.webp" alt="${p.nome}" width="600" height="600" loading="lazy">
          <span>${p.nome}</span>
        </a>`;
    }).join('');

    return `
<div class="wrap">

  <div class="hero">
    <p class="etiqueta">Personalizados com carinho</p>
    <h1>Presentes que contam histórias</h1>
    <p class="lead">Canecas, camisetas e kits personalizados, feitos com carinho para cada ocasião.</p>
    <img class="banner" src="images/banner.webp" width="1400" height="933"
         alt="Canecas, camisetas, body de bebê, avental e garrafas personalizados">
  </div>

  <section class="secao">
    <h2>O que você encontra aqui</h2>
    <div class="carrossel">
      <button class="seta seta-esq" type="button" aria-label="Produtos anteriores" hidden>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <div class="track">${cards}</div>
      <button class="seta seta-dir" type="button" aria-label="Próximos produtos">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
      </button>
    </div>
  </section>

  <section class="secao por-que">
    <h2>Por que a SR?</h2>
    <ul>
      <li>Personalização de verdade</li>
      <li>Qualidade em cada detalhe</li>
      <li>Feito com carinho para você</li>
    </ul>
  </section>

  <section class="secao como-funciona">
    <h2>Como funciona</h2>
    <div class="passos">
      <div class="passo"><span class="numero">1</span>Escolha o produto</div>
      <div class="passo"><span class="numero">2</span>Personalize com a sua ideia</div>
      <div class="passo"><span class="numero">3</span>Peça o orçamento</div>
      <div class="passo"><span class="numero">4</span>Combine os detalhes e receba</div>
    </div>
  </section>

  <section class="secao chamada">
    <h3>Gostou de algum produto?</h3>
    <p>Chame a gente e faça seu orçamento.</p>
    <a class="botao botao-branco" href="${linkZap()}" target="_blank" rel="noopener">${iconeZap}Falar no WhatsApp</a>
  </section>

  ${Pages.catalogo.section()}
  ${Pages.sobre.section()}
  ${Pages.faq.section()}

</div>`;
  },

  init: function (app) {
    app.querySelectorAll('.por-que li').forEach(function (item) {
      item.addEventListener('click', function () {
        item.classList.toggle('marcado');
      });
    });

    var passos = app.querySelectorAll('.passo');
    passos.forEach(function (passo) {
      passo.addEventListener('click', function () {
        passos.forEach(function (outro) { outro.classList.remove('marcado'); });
        passo.classList.add('marcado');
      });
    });

    var track = app.querySelector('.track');
    var setaEsq = app.querySelector('.seta-esq');
    var setaDir = app.querySelector('.seta-dir');

    function atualizarSetas() {
      var fim = track.scrollWidth - track.clientWidth - 4;
      setaEsq.hidden = track.scrollLeft <= 4;
      setaDir.hidden = track.scrollLeft >= fim;
    }

    function rolar(direcao) {
      var passo = track.clientWidth * 0.8;
      track.scrollBy({ left: direcao * passo, behavior: 'smooth' });
    }

    setaEsq.addEventListener('click', function () { rolar(-1); });
    setaDir.addEventListener('click', function () { rolar(1); });
    track.addEventListener('scroll', atualizarSetas);
    window.addEventListener('resize', atualizarSetas);
    atualizarSetas();

    Pages.sobre.init(app);
    Pages.faq.init(app);
  }
};

Pages.catalogo = {
  title: 'Catálogo de Presentes | SR Personalizados',

  section: function () {
    return `
<section class="secao" id="secao-catalogo">
  <p class="etiqueta">Catálogo</p>
  <h2 class="titulo-grande">Escolha o seu presente</h2>

  <article class="produto">
    <h3>Canecas</h3>
    <p>Personalize seus momentos com canecas exclusivas: designs criativos, qualidade e muito estilo para o seu café do dia a dia.</p>
    <div class="galeria">
      <img src="images/catalogo/canecas-aranha.webp" alt="Canecas Homem-Aranha" loading="lazy">
      <img src="images/catalogo/canecas-vidro-nome.webp" alt="Caneca de vidro fosco com nome" loading="lazy">
    </div>
    <a class="botao" href="${linkZap('Olá! Gostaria de pedir um orçamento de Canecas.')}" target="_blank" rel="noopener">Pedir orçamento</a>
    <a class="link-todas" href="#/canecas">Ver todas as canecas</a>
  </article>

  <article class="produto">
    <h3>Camisetas</h3>
    <p>Camisetas que têm a sua cara: conforto e muito detalhe, ótimas para grupos, eventos e para divulgar o seu sonho.</p>
    <div class="galeria">
      <img src="images/catalogo/camiseta-cachorro-bike.webp" alt="Camiseta marrom estampada" loading="lazy">
      <img src="images/catalogo/camiseta-one-piece.webp" alt="Camiseta preta estampada" loading="lazy">
    </div>
    <a class="botao" href="${linkZap('Olá! Gostaria de pedir um orçamento de Camisetas.')}" target="_blank" rel="noopener">Pedir orçamento</a>
    <a class="link-todas" href="#/camisetas">Ver todas as camisetas</a>
  </article>

  <article class="produto">
    <h3>Kits especiais</h3>
    <p>Kits preparados com carinho para momentos inesquecíveis: presentes, lembrancinhas e combinações perfeitas para celebrar e agradecer.</p>
    <div class="galeria">
      <img src="images/catalogo/kit-calendario.webp" alt="Kit caneca e quadro com calendário" loading="lazy">
      <img src="images/catalogo/kit-almofada.webp" alt="Kit caneca e almofada" loading="lazy">
    </div>
    <a class="botao" href="${linkZap('Olá! Vim pelo site e gostaria de saber mais sobre os Kits Especiais.')}" target="_blank" rel="noopener">Falar no WhatsApp</a>
    <a class="link-todas" href="#/kits">Ver todos os kits</a>
  </article>
</section>`;
  }
};

Pages.sobre = {
  title: 'Sobre nós | SR Personalizados',

  section: function () {
    return `
<section class="secao" id="secao-sobre">
  <p class="etiqueta">Sobre nós</p>
  <h2 class="titulo-grande">Conheça a SR Personalizados</h2>

  <div class="sobre-texto">
    <p>Eu sou a Suelen e, junto com meu esposo Cleyton, estou por trás da SR. Ela nasceu de um sonho que já vinha sendo construído e ganhou coragem, forma e vida em março de 2026.</p>
    <p>Eu sempre amei presentear com significado, daqueles que a gente guarda e que, anos depois, fazem lembrar de alguém ou de um momento especial</p>
    <p>Nunca quisemos ser apenas "a loja que faz canecas". Aqui, nenhum pedido é "só mais um pedido": cada detalhe é feito com capricho, carinho e amor.</p>
  </div>

  <blockquote class="destaque">
    <p>Transformar ideias em presentes únicos e cheios de significado.</p>
    <footer>— Suelen Rodrigues, SR Personalizados</footer>
  </blockquote>
</section>`;
  },

  init: function (app) {
    var destaque = app.querySelector('.destaque');
    if (!('IntersectionObserver' in window)) return;

    destaque.classList.add('escondido');

    var observador = new IntersectionObserver(function (entradas) {
      if (entradas[0].isIntersecting) {
        destaque.classList.remove('escondido');
        observador.disconnect();
      }
    }, { threshold: 0.25 });

    observador.observe(destaque);
  }
};

Pages.faq = {
  title: 'Perguntas Frequentes | SR Personalizados',

  section: function () {
    return `
<section class="secao" id="secao-faq">
  <p class="etiqueta">FAQ</p>
  <h2 class="titulo-grande">Perguntas frequentes</h2>

  <article class="item">
    <button class="item__btn" aria-expanded="false" aria-controls="r1" id="q1">Como faço meu pedido?</button>
    <div class="item__painel" id="r1" role="region" aria-labelledby="q1">
      <p><strong>Pelo WhatsApp</strong>: escolha o produto, conte sua ideia, depois combinamos os detalhes.</p>
    </div>
  </article>

  <article class="item">
    <button class="item__btn" aria-expanded="false" aria-controls="r2" id="q2">Qual o prazo de entrega?</button>
    <div class="item__painel" id="r2" role="region" aria-labelledby="q2">
      <p>De até 4 dias úteis dependendo do produto.</p>
    </div>
  </article>

  <article class="item">
    <button class="item__btn" aria-expanded="false" aria-controls="r3" id="q3">Quais as formas de pagamento?</button>
    <div class="item__painel" id="r3" role="region" aria-labelledby="q3">
      <p>Débito, crédito e Pix</p>
    </div>
  </article>

  <div class="duvida">
    <h2>Ficou com dúvida?</h2>
    <a class="botao botao-branco" href="${linkZap()}" target="_blank" rel="noopener">Falar no WhatsApp</a>
  </div>
</section>`;
  },

  init: function (app) {
    var botoes = app.querySelectorAll('.item__btn');

    botoes.forEach(function (botao) {
      botao.addEventListener('click', function () {
        var estavaAberto = botao.getAttribute('aria-expanded') === 'true';
        botoes.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
        botao.setAttribute('aria-expanded', String(!estavaAberto));
      });
    });

    botoes[0].setAttribute('aria-expanded', 'true');
  }
};

var canecas = [
  { imagem: 'aranha',                nome: 'Canecas Teia (par branca e vermelha)' },
  { imagem: 'vidro-tamires',         nome: 'Caneca de vidro fosco com nome' },
  { imagem: 'vidro-frases',          nome: 'Canecas de vidro fosco com frases' },
  { imagem: 'meu-par',               nome: 'Caneca Meu Par (casal)' },
  { imagem: 'feliz-natal',           nome: 'Caneca Feliz Natal (gatinhos)' },
  { imagem: 'stitch-angel',          nome: 'Par de canecas Stitch e Angel' },
  { imagem: 'nao-sou-um-robo',       nome: 'Caneca “Não sou um robô”' },
  { imagem: 'jesus-ta-la-1',         nome: 'Caneca “Jesus tá lá” (marrom)' },
  { imagem: 'jesus-ta-la-2',         nome: 'Caneca “Jesus tá lá” (rosa)' },
  { imagem: 'lindas-tambem',         nome: 'Caneca glitter rosa' },
  { imagem: 'voce-merece',           nome: 'Caneca “Você merece o mundo”' },
  { imagem: 'xicaras',               nome: 'Xícaras empilháveis com suporte' },
  { imagem: 'antes-de-te-conhecer',  nome: 'Par de canecas “Antes de te conhecer”' }
];

Pages.canecas = {
  title: 'Canecas | SR Personalizados',

  render: function () {
    var cartoes = canecas.map(function (c) {
      var mensagem = 'Olá! Quero saber mais sobre: ' + c.nome;
      return `<article class="prod">
        <img src="images/canecas/${c.imagem}.webp" alt="${c.nome}" loading="lazy">
        <h3>${c.nome}</h3>
        <a class="botao" href="${linkZap(mensagem)}" target="_blank" rel="noopener">Pedir no WhatsApp</a>
      </article>`;
    }).join('');

    return `
<div class="wrap">
  <section class="secao">
    <h2 class="titulo-grande">Canecas</h2>
    <p class="intro">Canecas personalizadas com nome, frase ou a arte que você quiser. Escolha um modelo e fale com a gente.</p>
    <div class="grid">${cartoes}</div>
  </section>
</div>`;
  }
};

var camisetas = [
  { imagem: 'one-piece', nome: 'Camiseta One Piece' },
  { imagem: 'cachorro-bicicleta', nome: 'Camiseta Cachorro na bicicleta' },
  { imagem: 'saudades', nome: 'Camiseta Saudades desses olhos' },
  { imagem: 'bob-esponja', nome: 'Camisetas Bob Esponja' },
  { imagem: 'capivara-branca', nome: 'Camiseta Capivara branca' },
  { imagem: 'corinthians', nome: 'Camiseta Corinthians' },
  { imagem: 'logo-empresa', nome: 'Camiseta com logotipo personalizado' },
  { imagem: 'body-bebe', nome: 'Body de bebê personalizado' },
  { imagem: 'professora', nome: 'Camiseta para professora' },
  { imagem: 'capivara-marrom', nome: 'Camiseta Capivara marrom' },
  { imagem: 'snoopy-academia', nome: 'Camiseta Snoopy academia' },
  { imagem: 'gym-mode', nome: 'Camiseta Gym Mode' },
  { imagem: 'sua-estampa', nome: 'Camiseta com sua estampa' }
];

Pages.camisetas = {
  title: 'Camisetas | SR Personalizados',
  render: function () {
    var cartoes = camisetas.map(function (c) {
      return `<article class="prod">
        <img src="images/camisetas/${c.imagem}.webp" alt="${c.nome}" loading="lazy" width="600" height="600">
        <h3>${c.nome}</h3>
        <a class="botao" href="${linkZap('Olá! Quero saber mais sobre: ' + c.nome)}" target="_blank" rel="noopener">Pedir no WhatsApp</a>
      </article>`;
    }).join('');
    return `<div class="wrap"><section class="secao">
      <h2 class="titulo-grande">Camisetas personalizadas</h2>
      <p class="intro">Escolha seu modelo favorito ou peça uma estampa especial. Consulte cores, tamanhos e disponibilidade pelo WhatsApp.</p>
      <div class="grid">${cartoes}</div>
    </section></div>`;
  }
};

var kits = [
  { imagem: 'kit-calendario',         nome: 'Kit caneca e quadro com fotos e calendário' },
  { imagem: 'kit-almofada-chaveiros', nome: 'Kit almofada, caneca e chaveiros com foto' },
  { imagem: 'kit-meu-amor',           nome: 'Kit almofada e caneca “O meu amor é teu”' },
  { imagem: 'copos-casal',            nome: 'Kit copos térmicos para casal' },
  { imagem: 'canecas-namorados',      nome: 'Kit canecas de casal com chocolates' },
  { imagem: 'kit-bestie',             nome: 'Kit presente para amiga (Bestie)' },
  { imagem: 'kit-rosa-nome',          nome: 'Kit garrafa, agenda e caneta com nome' },
  { imagem: 'kit-branco-nome',        nome: 'Kit copo, agenda, caneta e chaveiro com nome' },
  { imagem: 'kit-professora-1',       nome: 'Kit Professora: caneca e bolsinha' },
  { imagem: 'kit-professora-2',       nome: 'Kit Professora: caneca, bolsinha e chaveiro' },
  { imagem: 'kit-player',             nome: 'Kit casal Player 1 e Player 2 (camisetas e canecas)' },
  { imagem: 'kit-para-todo-sempre',   nome: 'Kit casal “Para todo sempre” (camisetas e canecas)' }
];

Pages.kits = {
  title: 'Kits | SR Personalizados',
  render: function () {
    var cartoes = kits.map(function (k) {
      return `<article class="prod">
        <img src="images/kits/${k.imagem}.webp" alt="${k.nome}" loading="lazy" width="600" height="750">
        <h3>${k.nome}</h3>
        <a class="botao" href="${linkZap('Olá! Quero saber mais sobre: ' + k.nome)}" target="_blank" rel="noopener">Pedir no WhatsApp</a>
      </article>`;
    }).join('');
    return `<div class="wrap"><section class="secao">
      <h2 class="titulo-grande">Kits especiais</h2>
      <p class="intro">Kits montados com carinho para presentear. Escolha um modelo e fale com a gente para personalizar.</p>
      <div class="grid">${cartoes}</div>
    </section></div>`;
  }
};

var app = document.getElementById('app');
var paginaAtual = '';

var paginasInternas = ['canecas', 'camisetas', 'kits'];

var secoes = {
  catalogo: 'secao-catalogo',
  sobre: 'secao-sobre',
  faq: 'secao-faq'
};

function marcarMenu(nome) {
  document.querySelectorAll('nav.bottom a').forEach(function (link) {
    link.classList.toggle('on', link.dataset.page === nome);
  });
}

function acompanharRolagem() {
  if (paginasInternas.indexOf(paginaAtual) !== -1) {
    marcarMenu('catalogo');
    return;
  }

  var atual = 'home';
  for (var nome in secoes) {
    var secao = document.getElementById(secoes[nome]);
    if (secao.getBoundingClientRect().top <= 140) atual = nome;
  }
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) atual = 'faq';

  marcarMenu(atual);
}

function mostrarPagina() {
  var rota = location.hash.replace('#/', '');
  var nome = (paginasInternas.indexOf(rota) !== -1) ? rota : 'home';

  if (nome !== paginaAtual) {
    app.innerHTML = Pages[nome].render();
    if (Pages[nome].init) Pages[nome].init(app);
    paginaAtual = nome;
  }

  document.title = (Pages[rota] || Pages[nome]).title;

  if (secoes[rota]) {
    document.getElementById(secoes[rota]).scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }

  acompanharRolagem();
}

window.addEventListener('hashchange', mostrarPagina);
window.addEventListener('scroll', acompanharRolagem);

document.querySelectorAll('nav.bottom a, .brand').forEach(function (link) {
  link.addEventListener('click', function (evento) {
    if ((location.hash || '#/') === link.getAttribute('href')) {
      evento.preventDefault();
      mostrarPagina();
    }
  });
});

mostrarPagina();

var botaoZap = document.querySelector('.zap__btn');
var cartaoZap = document.getElementById('zap-pop');

document.getElementById('zap-chamar').href = linkZap('Olá! Vim pelo site da SR Personalizados.');

function abrirFecharZap(abrir) {
  cartaoZap.hidden = !abrir;
  botaoZap.setAttribute('aria-expanded', String(abrir));
}

botaoZap.addEventListener('click', function () {
  abrirFecharZap(cartaoZap.hidden);
});

document.addEventListener('click', function (evento) {
  if (!evento.target.closest('.zap')) abrirFecharZap(false);
});
document.addEventListener('keydown', function (evento) {
  if (evento.key === 'Escape') abrirFecharZap(false);
});
