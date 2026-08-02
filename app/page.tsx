"use client";

import { useEffect, useState } from "react";

type DetailKey = "dados" | "economia" | "cidade" | "historia" | "mapas" | "turismo";
type PhotoView = { src: string; alt: string; caption: string };

const details: Record<DetailKey, {
  kicker: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  facts: [string, string, string?][];
  paragraphs: string[];
  links: [string, string][];
  gallery?: [string, string, string][];
}> = {
  dados: {
    kicker: "CONHEÇA A CIDADE",
    title: "São Bento do Sul em números",
    intro: "Estes números ajudam a entender o tamanho da cidade, quantas pessoas moram nela e como é a vida por lá.",
    image: "bandeira-sao-bento-do-sul.png",
    imageAlt: "Bandeira de São Bento do Sul",
    facts: [
      ["87.661", "habitantes estimados em 2025"],
      ["495 km²", "tamanho do município"],
      ["838 m", "altura em relação ao mar"],
      ["0,782", "IDHM", "É uma nota que ajuda a entender como é viver em uma cidade. Ela observa três coisas: se as pessoas vivem bastante, se estudam e se têm renda. Quanto mais perto de 1, melhores costumam ser essas condições."],
      ["R$ 60.499", "PIB per capita em 2023", "Primeiro somamos o valor de tudo o que a cidade produz em um ano. Depois dividimos esse total pelo número de moradores. O resultado é uma média para comparar cidades — não quer dizer que cada pessoa recebe esse dinheiro."],
      ["4215802", "código IBGE", "É como o número de identificação da cidade. O IBGE usa esse código para não confundir municípios com nomes parecidos e para organizar mapas, censos e pesquisas."],
    ],
    paragraphs: ["São Bento do Sul fica no Planalto Norte de Santa Catarina, perto da divisa com o Paraná. De lá, é possível chegar com facilidade a cidades como Curitiba e Joinville e também ao litoral."],
    links: [["Ver os dados no IBGE", "https://www.ibge.gov.br/cidades-e-estados/sc/sao-bento-do-sul.html"]],
  },
  economia: {
    kicker: "TRABALHO E PRODUÇÃO",
    title: "Da madeira a muitos tipos de indústria",
    intro: "A madeira sempre foi importante para a economia da cidade. Com o tempo, São Bento do Sul ficou conhecida no Brasil e em outros países pela fabricação de móveis.",
    image: "foto-cidade-05.jpg",
    imageAlt: "Arquitetura e paisagem de São Bento do Sul",
    facts: [
      ["Móveis", "Rudnick e Artefama", "A Rudnick e a Artefama são exemplos de fábricas de móveis de São Bento do Sul. Elas transformam madeira e outros materiais em mesas, cadeiras, armários e móveis para casas e empresas."],
      ["Metalurgia", "ArcelorMittal Tuper", "A ArcelorMittal Tuper é um exemplo do setor metalúrgico. Ela fabrica tubos, peças e sistemas de aço usados em carros, construções, máquinas e outras atividades."],
      ["Cerâmica", "Oxford Porcelanas", "A Oxford é um exemplo do setor cerâmico. Ela fabrica pratos, xícaras, canecas e outros objetos usados para servir alimentos."],
      ["Têxtil", "Buddemeyer", "A Buddemeyer é um exemplo do setor têxtil. Ela fabrica produtos de tecido para a casa, como toalhas, roupas de cama e itens para banho."],
      ["Higiene", "Condor", "A Condor é um exemplo da indústria de higiene e limpeza. Ela produz escovas, vassouras, pincéis e outros objetos usados no dia a dia."],
    ],
    paragraphs: ["No começo, serrarias e pequenas oficinas usavam madeiras como imbuía, pinheiro e canela. Depois, as fábricas cresceram, passaram a usar novas tecnologias e começaram a vender móveis para vários países.", "Hoje, a cidade também produz plásticos, peças de metal, cerâmica, tecidos e outros produtos. O comércio e os serviços também ajudam a movimentar a economia."],
    links: [["Ver o Plano Municipal de Turismo", "https://turismoemsaobento.sc.gov.br/assets/plano_municipal_de_turismo.pdf"]],
  },
  cidade: {
    kicker: "CONHEÇA SÃO BENTO",
    title: "Uma cidade de histórias e natureza",
    intro: "A cidade reúne construções antigas, festas, música, trabalho e belas paisagens de serra.",
    image: "acervo-catedral-centro.jpg",
    imageAlt: "Vista do centro e da Igreja Matriz de São Bento do Sul",
    facts: [["70 pioneiros", "homenageados no Monumento ao Imigrante"], ["22 mil m²", "tamanho do Parque 23 de Setembro"], ["1913", "ano de abertura da estação de trem"], ["112 anos", "da Banda Treml em 2026"]],
    paragraphs: ["Povos de diferentes origens ajudaram a formar São Bento do Sul. Essa mistura pode ser percebida nas casas, na música, nas festas, na comida e no jeito de trabalhar.", "Você sabia? A Estrada Dona Francisca é uma das estradas antigas mais importantes do Brasil. A Casa Eichendorf foi construída no final dos anos 1800. A antiga estação de trem hoje abriga o Museu da Música."],
    links: [["Portal oficial de turismo", "https://www.turismoemsaobento.sc.gov.br/"]],
  },
  historia: {
    kicker: "LINHA DO TEMPO",
    title: "Como São Bento do Sul começou",
    intro: "A história da cidade envolve os povos indígenas que já viviam na região, a chegada de famílias europeias e a construção de caminhos entre a serra e o litoral.",
    image: "acervo-casa-eichendorf.jpg",
    imageAlt: "Edificação histórica de São Bento do Sul",
    facts: [["1858", "começa a Estrada Dona Francisca"], ["1873", "chegada das primeiras famílias europeias"], ["1876", "o lugar recebe o nome São Bento"], ["1883", "criação do município"], ["1884", "início da administração municipal"], ["1893", "cidade abriga o governo de Santa Catarina por um tempo"], ["1913", "a estação de trem é inaugurada"]],
    paragraphs: ["Os indígenas Xokleng já viviam na região. Em 1873, um grupo pequeno subiu a serra a pé, levando ferramentas em lombo de mula, e começou a colônia.", "As famílias vieram da Áustria, da Baviera, da Prússia, da Saxônia, da Polônia e da Boêmia — lugares que hoje fazem parte da Alemanha, da Áustria, da Polônia e da Tchéquia. Elas foram trazidas por uma empresa de colonização, a Sociedade Colonizadora de Hamburgo.", "Em 1876, o lugar recebeu o nome de São Bento. Hoje, museus, casas antigas e monumentos ajudam a contar essa história."],
    links: [["História no portal de turismo", "https://turismoemsaobento.sc.gov.br/ver?conteudo=saobentodosul"]],
  },
  mapas: {
    kicker: "VEJA ONDE FICA",
    title: "São Bento do Sul no Planalto Norte",
    intro: "O mapa aproxima a região para mostrar com clareza onde fica São Bento do Sul e quais cidades estão por perto.",
    image: "mapa-santa-catarina-ibge.jpg",
    imageAlt: "Mapa oficial de Santa Catarina produzido pelo IBGE",
    facts: [["≈ 15 km", "Rio Negrinho"], ["≈ 25 km", "Campo Alegre"], ["≈ 80 km", "Joinville"], ["≈ 139 km", "Curitiba"], ["838 m", "altitude"], ["495 km²", "tamanho do município"], ["Mata Atlântica", "bioma", "Bioma é um grande conjunto de matas, bichos e clima que combinam entre si. Todo o território de São Bento do Sul fica dentro da Mata Atlântica."], ["≈ 14 °C", "média de julho", "Média é o valor do meio: somamos a temperatura de todos os dias de julho e dividimos pelo número de dias. Julho é o mês mais frio do ano na cidade."], ["Comum no inverno", "geada", "Geada é o gelo fininho que se forma de madrugada, quando a temperatura cai muito perto do chão. Em São Bento do Sul isso acontece em várias madrugadas de inverno."]],
    paragraphs: ["São Bento do Sul fica no nordeste de Santa Catarina, perto da divisa com o Paraná. Rio Negrinho e Campo Alegre são as cidades vizinhas mais próximas.", "A cidade está a 838 metros de altitude, na serra. Nessa altura crescem bem as araucárias, o pinheiro-do-paraná, que aparece principalmente acima de 800 metros.", "Por causa da altitude, o inverno é frio: em julho a média fica perto de 14 °C e a geada é comum de madrugada."],
    links: [["Ver o mapa de Santa Catarina", "mapa-santa-catarina-ibge.jpg"], ["Ver o mapa da cidade", "mapa-municipal-ibge.png"], ["Explorar o mapa interativo da prefeitura", "https://geo.saobentodosul.sc.gov.br/"]],
  },
  turismo: {
    kicker: "PASSEIOS E LUGARES",
    title: "O que conhecer em São Bento do Sul",
    intro: "Na cidade, é possível visitar museus, conhecer lugares antigos, andar de bicicleta, aproveitar a natureza, experimentar comidas e participar de festas.",
    image: "acervo-maria-fumaca.jpg",
    imageAlt: "Maria Fumaça em meio à Mata Atlântica",
    facts: [["Museu Dr. Felippe Maria Wolff", "conta a história da cidade"], ["Museu da Música", "fica na estação de trem de 1913"], ["Estrada Dona Francisca", "caminho pela serra começado em 1858"], ["41ª edição", "da Schlachtfest, em 2025"], ["Setembro", "mês em que a Schlachtfest acontece"], ["Rio Vermelho", "região rural com cultura e natureza"]],
    paragraphs: ["São Bento do Sul oferece passeios para quem gosta de história, natureza, compras, comida, festas e aventuras ao ar livre.", "A Schlachtfest tem música, dança, roupas típicas e comidas de origem alemã. Ela é organizada pela Sociedade Ginástica e Desportiva São Bento do Sul, que completou 100 anos em 2025.", "A estação de trem foi inaugurada em 1913 e hoje abriga o Museu Municipal da Música Maestro Pedro Machado de Bitencourt."],
    links: [["Ver todos os atrativos", "https://www.turismoemsaobento.sc.gov.br/"], ["Buscar vídeos sobre o destino", "https://www.youtube.com/results?search_query=turismo+São+Bento+do+Sul+SC"]],
    gallery: [
      ["acervo-catedral-centro.jpg", "Centro de São Bento do Sul e Igreja Matriz", "Centro & Matriz"],
      ["acervo-casa-eichendorf.jpg", "Casa Eichendorf", "Casa Eichendorf"],
      ["acervo-museu.jpg", "Museu Municipal Dr. Felippe Maria Wolff", "Museu Municipal"],
      ["acervo-rio-vermelho.jpg", "Igreja de Rio Vermelho Povoado", "Rio Vermelho"],
      ["acervo-schlachtfest.jpg", "Desfile da Schlachtfest", "Schlachtfest"],
      ["acervo-parque-das-aves.jpg", "Aves em área de visitação", "Parque das Aves"],
    ],
  },
};

function PanelTrigger({ detail, open }: { detail: DetailKey; open: (detail: DetailKey) => void }) {
  return (
    <button className="panel-trigger" onClick={() => open(detail)} aria-label={`Abrir mais informações: ${details[detail].title}`}>
      <span>TOQUE PARA EXPLORAR</span><b>+</b>
    </button>
  );
}

function ZoomPhoto({
  photo,
  open,
}: {
  photo: PhotoView;
  open?: (photo: PhotoView) => void;
}) {
  if (!open) return <img src={photo.src} alt={photo.alt} />;
  return (
    <button className="photo-zoom" onClick={() => open(photo)} aria-label={`Ampliar foto: ${photo.caption}`}>
      <img src={photo.src} alt={photo.alt} />
      <span className="photo-zoom-icon" aria-hidden="true">⌕</span>
    </button>
  );
}

function LocationArt() {
  return (
    <div className="location-art">
      <svg viewBox="0 0 620 350" role="img" aria-labelledby="regional-map-title regional-map-description">
        <title id="regional-map-title">São Bento do Sul no Planalto Norte de Santa Catarina</title>
        <desc id="regional-map-description">Mapa feito com limites municipais do IBGE. Mostra Mafra, Rio Negrinho, São Bento do Sul e Campo Alegre.</desc>
        <defs>
          <linearGradient id="real-map-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4eddc" />
            <stop offset="1" stopColor="#e1d6bc" />
          </linearGradient>
          <filter id="real-city-shadow" x="-30%" y="-30%" width="170%" height="190%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#342317" floodOpacity=".38" />
          </filter>
        </defs>
        <rect width="620" height="350" fill="url(#real-map-ground)" />
        <text className="real-map-overline" x="26" y="28">PLANALTO NORTE</text>
        <text className="real-map-neighbor-state" x="612" y="28" textAnchor="end">PARANÁ ↑</text>

        <g className="real-municipalities">
          <path className="municipality municipality-mafra" d="M 115.8 147.4 L 145.5 141.8 L 159.7 147.2 L 167.8 138.4 L 207.5 132.1 L 222.4 157.4 L 225.2 170.5 L 218.4 184.3 L 232.2 208.4 L 220.3 225.5 L 240.0 226.5 L 248.6 207.4 L 263.2 195.6 L 286.1 187.7 L 279.7 177.7 L 294.9 171.0 L 288.9 154.5 L 297.9 126.3 L 279.2 110.0 L 272.3 111.2 L 244.4 84.5 L 216.6 71.9 L 202.1 55.9 L 200.0 47.2 L 176.2 41.2 L 154.4 38.1 L 106.4 54.3 L 100.5 44.3 L 82.3 62.1 L 83.9 79.4 L 102.1 103.2 L 95.8 119.0 L 102.5 136.3 L 115.8 147.4 Z" />
          <path className="municipality municipality-rio" d="M 340.5 113.0 L 335.1 123.5 L 317.5 129.0 L 297.9 126.3 L 288.9 154.5 L 294.9 171.0 L 279.7 177.7 L 286.1 187.7 L 263.2 195.6 L 248.6 207.4 L 240.0 226.5 L 249.6 247.6 L 250.0 258.2 L 264.9 268.5 L 267.3 285.1 L 259.6 298.7 L 264.4 314.9 L 279.9 317.4 L 290.8 322.0 L 293.2 295.3 L 304.2 289.4 L 306.3 270.9 L 312.0 265.3 L 318.5 248.9 L 328.2 248.7 L 357.3 233.7 L 338.7 213.6 L 341.8 205.5 L 352.8 193.1 L 348.6 182.9 L 346.5 132.2 L 340.5 113.0 Z" />
          <path className="municipality municipality-sbs" d="M 426.7 143.4 L 399.7 124.3 L 393.1 112.2 L 376.3 115.2 L 361.8 103.1 L 340.9 109.3 L 340.5 113.0 L 346.5 132.2 L 348.6 182.9 L 352.8 193.1 L 341.8 205.5 L 355.7 208.3 L 360.2 184.5 L 371.4 176.6 L 394.5 188.5 L 412.8 185.3 L 434.6 196.1 L 454.9 183.2 L 450.9 174.8 L 457.4 159.6 L 426.7 143.4 Z" />
          <path className="municipality municipality-campo" d="M 445.1 123.6 L 457.7 110.5 L 450.0 93.0 L 461.1 80.3 L 492.6 64.1 L 498.6 64.6 L 500.4 44.9 L 508.5 37.6 L 518.2 44.1 L 535.6 41.1 L 537.7 29.4 L 531.2 28.0 L 512.1 39.9 L 508.7 35.3 L 503.7 35.3 L 492.4 33.9 L 458.0 33.7 L 433.3 46.0 L 409.2 79.0 L 401.3 78.5 L 386.9 89.7 L 379.6 97.6 L 361.8 103.1 L 376.3 115.2 L 393.1 112.2 L 399.7 124.3 L 426.7 143.4 L 445.1 123.6 Z" />
        </g>

        <g className="real-city real-city-mafra">
          <circle cx="227" cy="82" r="6" /><text x="168" y="68">MAFRA</text>
        </g>
        <g className="real-city real-city-rio">
          <circle cx="332" cy="138" r="6" /><text x="202" y="182">RIO NEGRINHO</text>
        </g>
        <g className="real-city real-city-campo">
          <circle cx="425" cy="114" r="6" /><text x="614" y="92" textAnchor="end">CAMPO ALEGRE</text>
        </g>

        {/* O filtro de sombra fica so nas formas: o Chrome rasteriza subarvores
            filtradas ao gerar PDF, e o texto sairia como bitmap borrado. */}
        <g className="real-city-focus" filter="url(#real-city-shadow)">
          <path className="real-pin" d="M369 132 C369 110 397 110 397 132 C397 149 383 162 383 162 C383 162 369 149 369 132 Z" />
          <circle className="real-pin-center" cx="383" cy="131" r="6" />
          <rect x="330" y="210" width="280" height="76" rx="3" />
          <path className="real-card-pointer" d="M383 162 L368 210 L398 210 Z" />
        </g>
        <g className="real-city-focus">
          <text className="real-city-name" x="470" y="240" textAnchor="middle">SÃO BENTO DO SUL</text>
          <text className="real-city-detail" x="470" y="267" textAnchor="middle">o município em amarelo</text>
        </g>

        <text className="real-map-source" x="26" y="334">LIMITES MUNICIPAIS: IBGE</text>
      </svg>
    </div>
  );
}

function Front({ open }: { open: (detail: DetailKey) => void }) {
  return (
    <section className="sheet front" aria-label="Frente do folder">
      <article className="panel flap">
        <div className="eyebrow">SÍMBOLO MUNICIPAL</div>
        <div className="flag-frame">
          <img src="bandeira-sao-bento-do-sul.png" alt="Bandeira oficial de São Bento do Sul" />
        </div>
        <h2>São Bento<br />do Sul.</h2>
        <p className="lead">Tradição, trabalho e natureza no Planalto Norte de Santa Catarina.</p>
        <div className="flap-profile">
          <div className="flap-profile-title">
            <span>RETRATO RÁPIDO</span>
            <i aria-hidden="true">SC</i>
          </div>
          <p>Quem nasce em São Bento do Sul é <strong>são-bentense</strong>. A cidade está em uma região serrana, próxima à divisa de Santa Catarina com o Paraná.</p>
          <div className="flap-profile-grid">
            <div><span>REGIÃO</span><strong>Planalto Norte</strong></div>
            <div><span>ALTITUDE</span><strong>838 m</strong></div>
            <div><span>ESTADO</span><strong>Santa Catarina</strong></div>
            <div><span>COORDENADAS</span><strong>26°15′S · 49°23′O</strong></div>
          </div>
        </div>
        <div className="flap-data">
          <div><strong>87.661</strong><span>habitantes<br />estimados</span></div>
          <div><strong>495 km²</strong><span>de tamanho<br />do município</span></div>
          <div><strong>1873</strong><span>ano de<br />fundação</span></div>
        </div>
        <div className="print-glossary">
          <b>PARA ENTENDER OS DADOS</b>
          <p><strong>IDHM:</strong> nota sobre saúde, educação e renda.</p>
          <p><strong>PIB per capita:</strong> média do valor produzido por morador.</p>
          <p><strong>Código IBGE:</strong> número oficial que identifica o município.</p>
        </div>
        <p className="microcopy">Abra e conheça São Bento do Sul →</p>
        <PanelTrigger detail="dados" open={open} />
      </article>

      <article className="panel back-cover economy">
        <div className="eyebrow">ECONOMIA</div>
        <h2>Trabalho que<br />ganha o mundo.</h2>
        <p>A madeira sempre foi importante para a cidade. No começo, havia serrarias e pequenas oficinas de móveis. Com o tempo, São Bento do Sul ficou conhecida no Brasil e em outros países pela fabricação de móveis.</p>
        <div className="economy-number">
          <strong>R$ 60,5 mil</strong>
          <span>PIB por habitante · 2023</span>
        </div>
        <div className="sectors">
          <span>MÓVEIS</span><span>METALURGIA</span><span>CERÂMICA</span>
          <span>PLÁSTICOS</span><span>FIAÇÃO & TÊXTIL</span><span>SERVIÇOS</span>
        </div>
        <div className="economy-examples">
          <b>EMPRESAS QUE AJUDAM A MOVER A CIDADE</b>
          <p><strong>Móveis:</strong> Rudnick e Artefama</p>
          <p><strong>Metal:</strong> ArcelorMittal Tuper</p>
          <p><strong>Cerâmica:</strong> Oxford Porcelanas</p>
          <small>A cidade também tem a Buddemeyer, que faz toalhas, e a Condor, que faz escovas e vassouras — além de muitas empresas menores.</small>
        </div>
        <div className="economy-note">
          <a className="qr-tile" href="https://rodolfopessoa.github.io/sbs/" target="_blank" rel="noreferrer" aria-label="Abrir o infográfico de São Bento do Sul">
            <img src="qrcode-folder.png" alt="QR Code para abrir o infográfico de São Bento do Sul" />
            <span>ACESSE</span>
          </a>
          <div>
            <b>VOCÊ SABIA?</b>
            <p>São Bento do Sul é conhecida no Brasil pela produção de móveis. A cidade também possui fábricas de vários outros produtos.</p>
            <small className="economy-sources"><strong>FONTES:</strong> IBGE · Plano Municipal de Turismo · Prefeitura Municipal</small>
          </div>
        </div>
        <PanelTrigger detail="economia" open={open} />
      </article>

      <article className="panel cover">
        <div className="cover-photo" aria-hidden="true" style={{ backgroundImage: 'url("acervo-catedral-centro.jpg")' }} />
        <div className="cover-shade" aria-hidden="true" />
        <div className="cover-top">
          <span className="state-tag">SANTA CATARINA</span>
          <span className="edition">PLANALTO NORTE</span>
        </div>
        <div className="cover-landmark">
          <span>IGREJA MATRIZ</span>
          <b>Puríssimo Coração de Maria</b>
        </div>
        <div className="cover-title">
          <h1>Descubra<br /><em>São Bento<br />do Sul</em></h1>
          <div className="title-rule"><span>HISTÓRIA</span><span>CULTURA</span><span>NATUREZA</span></div>
        </div>
        <div className="cover-footer">
          <span>26°15′S · 49°23′O</span>
          <b>GUIA DA CIDADE</b>
        </div>
        <PanelTrigger detail="cidade" open={open} />
      </article>
    </section>
  );
}

function Back({
  open,
  openPhoto,
}: {
  open: (detail: DetailKey) => void;
  openPhoto?: (photo: PhotoView) => void;
}) {
  return (
    <section className="sheet back" aria-label="Verso do folder">
      <article className="panel intro">
        <div className="eyebrow">NOSSA HISTÓRIA</div>
        <h2>Como a cidade<br />começou.</h2>
        <div className="history-photo">
          <ZoomPhoto
            photo={{ src: "foto-cidade-05.jpg", alt: "Arquitetura histórica de São Bento do Sul", caption: "Uma história preservada" }}
            open={openPhoto}
          />
          <span>Uma história preservada</span>
        </div>
        <div className="history-story">
          <p>Os indígenas Xokleng já conheciam e cuidavam destas terras muito antes de a cidade existir.</p>
          <p>Em 1873, um grupo pequeno subiu a serra a pé, levando ferramentas em lombo de mula. Ali começou São Bento do Sul.</p>
        </div>
        <div className="timeline">
          <div><b>1858</b><span>Começa a Estrada Dona Francisca, ligando a serra ao litoral</span></div>
          <div><b>1873</b><span>Chegam as primeiras famílias vindas da Europa</span></div>
          <div><b>1876</b><span>O lugar recebe o nome de São Bento</span></div>
          <div><b>1883</b><span>São Bento passa a ser um município</span></div>
          <div><b>1893</b><span>Por um tempo, o governo de Santa Catarina funciona aqui</span></div>
          <div><b>1913</b><span>A estação de trem é inaugurada e aproxima a cidade</span></div>
        </div>
        <div className="history-curiosity">
          <b>DE ONDE VIERAM AS FAMÍLIAS</b>
          <p>Áustria, Baviera, Prússia, Saxônia, Polônia e Boêmia. Hoje esses lugares fazem parte da Alemanha, da Áustria, da Polônia e da Tchéquia.</p>
        </div>
        <PanelTrigger detail="historia" open={open} />
      </article>

      <article className="panel location">
        <div className="eyebrow">ONDE FICA</div>
        <h2>Aqui está<br />São Bento do Sul.</h2>
        <LocationArt />
        <div className="location-facts" aria-label="Informações sobre a localização">
          <div><strong>838 m</strong><span>de altitude</span></div>
          <div><strong>495 km²</strong><span>de tamanho</span></div>
          <div><strong>15 km</strong><span>até Rio Negrinho</span></div>
        </div>
        <div className="nature-box">
          <b>A NATUREZA DAQUI</b>
          <div className="nature-grid">
            <div><strong>Mata Atlântica</strong><span>Todo o município fica dentro desse bioma</span></div>
            <div><strong>Araucárias</strong><span>Pinheiro-do-paraná, típico acima de 800 m</span></div>
            <div><strong>≈ 14 °C</strong><span>Julho é o mês mais frio do ano</span></div>
            <div><strong>Geada</strong><span>Aparece em várias madrugadas de inverno</span></div>
          </div>
          <small><strong>Bioma</strong> é um grande conjunto de matas, bichos e clima que combinam entre si. <strong>Geada</strong> é o gelo fininho que se forma de madrugada quando faz muito frio.</small>
        </div>
        <div className="location-why">
          <b>ENTENDA O CAMINHO</b>
          <p>A BR-280 passa pela região e a SC-418 sobe a serra até Joinville. Elas ligam a cidade ao Paraná e ao litoral.</p>
        </div>
        <PanelTrigger detail="mapas" open={open} />
      </article>

      <article className="panel curiosities">
        <div className="eyebrow">A CIDADE HOJE</div>
        <h2>Quem mora e o<br />que dá para fazer.</h2>
        <div className="photo-grid">
          <figure className="photo-main">
            <ZoomPhoto
              photo={{ src: "acervo-catedral-centro.jpg", alt: "Centro e Igreja Matriz Puríssimo Coração de Maria", caption: "Igreja Matriz Puríssimo Coração de Maria" }}
              open={openPhoto}
            />
            <figcaption>Igreja Matriz</figcaption>
          </figure>
          <figure>
            <ZoomPhoto
              photo={{ src: "acervo-maria-fumaca.jpg", alt: "Maria Fumaça em meio à Mata Atlântica", caption: "Maria Fumaça em meio à Mata Atlântica" }}
              open={openPhoto}
            />
            <figcaption>Maria Fumaça</figcaption>
          </figure>
          <figure>
            <ZoomPhoto
              photo={{ src: "acervo-schlachtfest.jpg", alt: "Desfile tradicional da Schlachtfest", caption: "Desfile tradicional da Schlachtfest" }}
              open={openPhoto}
            />
            <figcaption>Schlachtfest</figcaption>
          </figure>
        </div>
        <div className="people-box">
          <b>GENTE E ESCOLA</b>
          <div className="people-grid">
            <div><strong>83.277</strong><span>moradores contados no Censo de 2022</span></div>
            <div><strong>87.661</strong><span>estimativa para 2025: a cidade cresceu</span></div>
            <div><strong>168</strong><span>pessoas por km², em média</span></div>
            <div><strong>98,45%</strong><span>das crianças de 6 a 14 anos estão na escola</span></div>
          </div>
          <small><strong>Censo</strong> é a contagem de todas as pessoas do país, feita pelo IBGE de tempos em tempos. Nas escolas públicas, a nota do <strong>IDEB</strong> nos primeiros anos foi <strong>6,9</strong> em 2023 — o IDEB mostra o quanto os alunos estão aprendendo.</small>
        </div>
        <div className="tourism-choices">
          <div>
            <b>GOSTA DE HISTÓRIA?</b>
            <p>O Museu da Música fica na antiga estação de trem, inaugurada em 1913.</p>
          </div>
          <div>
            <b>PREFERE NATUREZA?</b>
            <p>A Estrada Dona Francisca, começada em 1858, atravessa a serra entre araucárias.</p>
          </div>
          <div>
            <b>GOSTA DE FESTA?</b>
            <p>A Schlachtfest acontece em setembro e chegou à 41ª edição em 2025.</p>
          </div>
        </div>
        <PanelTrigger detail="turismo" open={open} />
      </article>
    </section>
  );
}

export default function Home() {
  const [side, setSide] = useState<"front" | "back">("front");
  const [folds, setFolds] = useState(true);
  const [activeDetail, setActiveDetail] = useState<DetailKey | null>(null);
  const [activeFact, setActiveFact] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState<PhotoView | null>(null);
  const selectedFact = activeDetail && activeFact
    ? details[activeDetail].facts.find(([, label]) => label === activeFact)
    : undefined;
  const openDetail = (detail: DetailKey) => {
    setActiveFact(null);
    setActiveDetail(detail);
  };
  const closeDetail = () => {
    setActiveFact(null);
    setActiveDetail(null);
  };
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePhoto(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <main>
      <header className="toolbar">
        <div>
          <strong>Folder São Bento do Sul</strong>
          <span>A4 horizontal · tríptico · frente e verso</span>
        </div>
        <nav aria-label="Controles de visualização">
          <div className="segmented">
            <button className={side === "front" ? "active" : ""} onClick={() => setSide("front")}>Frente</button>
            <button className={side === "back" ? "active" : ""} onClick={() => setSide("back")}>Verso</button>
          </div>
          <button className="fold-button" onClick={() => setFolds(!folds)}>{folds ? "Ocultar dobras" : "Mostrar dobras"}</button>
          <button className="print-button" onClick={() => window.print()}>Imprimir / PDF</button>
        </nav>
      </header>

      <div className={`workspace ${folds ? "show-folds" : ""}`}>
        <div className="side-label">{side === "front" ? "LADO EXTERNO" : "LADO INTERNO"}</div>
        {side === "front" ? <Front open={openDetail} /> : <Back open={openDetail} openPhoto={setActivePhoto} />}
        <p className="hint">Dica: na impressão, escolha A4 horizontal, escala 100% e ative “gráficos de fundo”.</p>
      </div>

      <div className="print-only">
        <Front open={() => undefined} />
        <Back open={() => undefined} />
      </div>

      {activeDetail && (
        <div className="detail-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeDetail();
        }}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button className="modal-close" onClick={closeDetail} aria-label="Fechar informações">×</button>
            <div className={`detail-visual ${activeDetail === "mapas" ? "map-mode" : ""} ${activeDetail === "economia" ? "economy-mode" : ""}`}>
              {activeDetail === "mapas"
                ? <LocationArt />
                : details[activeDetail].image && <img src={details[activeDetail].image} alt={details[activeDetail].imageAlt || ""} />}
              <span>{details[activeDetail].kicker}</span>
            </div>
            <div className="detail-content">
              <p className="detail-kicker">{details[activeDetail].kicker}</p>
              <h2 id="detail-title">{details[activeDetail].title}</h2>
              <p className="detail-intro">{details[activeDetail].intro}</p>
              <div className="detail-facts">
                {details[activeDetail].facts.map(([value, label, explanation]) => (
                  <div className={`fact-card ${explanation ? "has-explainer" : ""}`} key={`${value}-${label}`}>
                    <strong>{value}</strong><span>{label}</span>
                    {explanation && (
                      <>
                        <button
                          className="fact-info"
                          aria-label={`Entenda o que significa ${label}`}
                          aria-expanded={activeFact === label}
                          onClick={() => setActiveFact(activeFact === label ? null : label)}
                        >i</button>
                        <div className="fact-tooltip" role="tooltip">{explanation}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              {selectedFact?.[2] && (
                <div className="fact-learning-panel" aria-live="polite">
                  <span>ENTENDA ESTE DADO</span>
                  <h3>O que significa {selectedFact[1]}?</h3>
                  <p>{selectedFact[2]}</p>
                </div>
              )}
              <div className="detail-text">
                {details[activeDetail].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {details[activeDetail].gallery && (
                <div className="detail-gallery">
                  {details[activeDetail].gallery?.map(([src, alt, caption]) => (
                    <figure key={src}>
                      <ZoomPhoto photo={{ src, alt, caption }} open={setActivePhoto} />
                      <figcaption>{caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
              <div className="detail-links">
                {details[activeDetail].links.map(([label, href]) => (
                  <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {activePhoto && (
        <div className="photo-lightbox" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActivePhoto(null);
        }}>
          <button className="photo-lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Fechar foto ampliada">×</button>
          <figure role="dialog" aria-modal="true" aria-label={activePhoto.caption}>
            <img src={activePhoto.src} alt={activePhoto.alt} />
            <figcaption>{activePhoto.caption}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}
