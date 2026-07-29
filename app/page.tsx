"use client";

import { useState } from "react";

type DetailKey = "dados" | "economia" | "cidade" | "historia" | "mapas" | "turismo";

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
    facts: [["1858", "abertura da Estrada Dona Francisca"], ["1873", "chegada das primeiras famílias europeias"], ["1876", "o lugar recebe o nome São Bento"], ["1883", "criação do município"], ["1884", "início da administração municipal"], ["1893", "cidade abriga o governo de Santa Catarina por um tempo"]],
    paragraphs: ["Os indígenas Xokleng já viviam na região. A partir de 1873, chegaram famílias alemãs, austríacas, polonesas e tchecas, trazidas por uma empresa de colonização chamada Sociedade Colonizadora de Hamburgo.", "Em 1876, Alfredo Taunay visitou a colônia, e o lugar recebeu o nome de São Bento. Hoje, museus, casas antigas e monumentos ajudam a contar essa história."],
    links: [["História no portal de turismo", "https://turismoemsaobento.sc.gov.br/ver?conteudo=saobentodosul"]],
  },
  mapas: {
    kicker: "VEJA ONDE FICA",
    title: "Do Sul do Brasil às ruas da cidade",
    intro: "Os mapas mostram onde São Bento do Sul fica e quais cidades estão mais próximas.",
    image: "mapa-santa-catarina-ibge.jpg",
    imageAlt: "Mapa completo do estado de Santa Catarina produzido pelo IBGE",
    facts: [["≈ 15 km", "Rio Negrinho"], ["≈ 25 km", "Campo Alegre"], ["≈ 80 km", "Joinville"], ["≈ 85 km", "Jaraguá do Sul"], ["≈ 115 km", "São Francisco do Sul"], ["≈ 139 km", "Curitiba"]],
    paragraphs: ["São Bento do Sul fica no nordeste de Santa Catarina, perto da divisa com o Paraná.", "Rio Negrinho e Campo Alegre são as cidades vizinhas mais próximas. Joinville, Jaraguá do Sul, São Francisco do Sul e Curitiba também são importantes para viagens, compras, serviços e passeios."],
    links: [["Ver o mapa de Santa Catarina", "mapa-santa-catarina-ibge.jpg"], ["Ver o mapa da cidade", "mapa-municipal-ibge.png"], ["Explorar o mapa interativo da prefeitura", "https://geo.saobentodosul.sc.gov.br/"]],
  },
  turismo: {
    kicker: "PASSEIOS E LUGARES",
    title: "O que conhecer em São Bento do Sul",
    intro: "Na cidade, é possível visitar museus, conhecer lugares antigos, andar de bicicleta, aproveitar a natureza, experimentar comidas e participar de festas.",
    image: "acervo-maria-fumaca.jpg",
    imageAlt: "Maria Fumaça em meio à Mata Atlântica",
    facts: [["Museu Dr. Felippe Maria Wolff", "conta a história da cidade"], ["Museu da Música", "mostra a história da música local"], ["Estrada Dona Francisca", "estrada antiga cercada por paisagens"], ["Schlachtfest", "uma das maiores festas da cidade"], ["Rio Vermelho", "região rural com cultura e natureza"], ["Parque das Aves", "lugar para conhecer e aprender sobre aves"]],
    paragraphs: ["São Bento do Sul oferece passeios para quem gosta de história, natureza, compras, comida, festas e aventuras ao ar livre.", "A Schlachtfest tem música, dança e comidas de origem alemã. A estação de trem foi aberta em 1913 e hoje abriga o Museu da Música."],
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

function LocationArt() {
  return (
    <div className="location-art" aria-label="Localização: Brasil, Santa Catarina, São Bento do Sul">
      <img
        src="mapa-santa-catarina-ibge.jpg"
        alt="Mapa completo de Santa Catarina com destaque para São Bento do Sul no nordeste do estado"
      />
      <div className="map-label map-label-city">
        <strong>SÃO BENTO DO SUL</strong>
        <small>Planalto Norte · divisa com o Paraná</small>
      </div>
      <span className="state-map-pin" aria-hidden="true">●</span>
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
          <p><strong>Têxtil:</strong> Buddemeyer</p>
          <p><strong>Higiene e limpeza:</strong> Condor</p>
          <small>São exemplos conhecidos; a cidade também possui muitas empresas menores.</small>
        </div>
        <div className="economy-note">
          <b>VOCÊ SABIA?</b>
          <p>São Bento do Sul é conhecida no Brasil pela produção de móveis. A cidade também possui fábricas de vários outros produtos.</p>
        </div>
        <div className="contact-block">
          <div>
            <strong>FONTES</strong>
            <small>IBGE · Plano Municipal de Turismo · Prefeitura Municipal</small>
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
          <p>DESCUBRA UMA CIDADE DE</p>
          <h1>SÃO BENTO<br /><em>DO SUL</em></h1>
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

function Back({ open }: { open: (detail: DetailKey) => void }) {
  return (
    <section className="sheet back" aria-label="Verso do folder">
      <article className="panel intro">
        <div className="eyebrow">NOSSA HISTÓRIA</div>
        <h2>Como a cidade<br />começou.</h2>
        <div className="history-photo">
          <img src="foto-cidade-05.jpg" alt="Arquitetura histórica de São Bento do Sul" />
          <span>Uma história preservada</span>
        </div>
        <p>Os indígenas Xokleng já viviam nesta região. Em 1873, começaram a chegar famílias alemãs, austríacas, polonesas e tchecas.</p>
        <div className="timeline">
          <div><b>1873</b><span>Chegada das primeiras famílias europeias</span></div>
          <div><b>1876</b><span>O lugar recebe o nome de São Bento</span></div>
          <div><b>1883</b><span>São Bento passa a ser um município</span></div>
          <div><b>1884</b><span>Começa a administração da cidade</span></div>
        </div>
        <PanelTrigger detail="historia" open={open} />
      </article>

      <article className="panel location">
        <div className="eyebrow">ONDE FICA</div>
        <h2>Do Sul do Brasil<br />até a cidade.</h2>
        <LocationArt />
        <div className="nearby-cities" aria-label="Cidades importantes próximas">
          <b>NO ENTORNO</b>
          <span>Rio Negrinho · 15 km</span>
          <span>Campo Alegre · 25 km</span>
          <span>Joinville · 80 km</span>
          <span>Jaraguá do Sul · 85 km</span>
          <span>Curitiba · 139 km</span>
        </div>
        <p className="location-copy">A cidade fica no Planalto Norte de Santa Catarina. As principais estradas de acesso são a BR-280 e a SC-418. Sua altitude é de cerca de 838 m.</p>
        <PanelTrigger detail="mapas" open={open} />
      </article>

      <article className="panel curiosities">
        <div className="eyebrow">PASSEIOS E TURISMO</div>
        <h2>História, natureza<br />e bons passeios.</h2>
        <div className="photo-grid">
          <figure className="photo-main">
            <img src="acervo-catedral-centro.jpg" alt="Centro e Igreja Matriz Puríssimo Coração de Maria" />
            <figcaption>Igreja Matriz</figcaption>
          </figure>
          <figure>
            <img src="acervo-maria-fumaca.jpg" alt="Maria Fumaça em meio à Mata Atlântica" />
            <figcaption>Maria Fumaça</figcaption>
          </figure>
          <figure>
            <img src="acervo-schlachtfest.jpg" alt="Desfile tradicional da Schlachtfest" />
            <figcaption>Schlachtfest</figcaption>
          </figure>
        </div>
        <ul className="tourism-list">
          <li>Museu Municipal Dr. Felippe Maria Wolff</li>
          <li>Estação Ferroviária e Museu da Música</li>
          <li>Estrada Dona Francisca e Casa Eichendorf</li>
          <li>Circuito das Araucárias de Cicloturismo</li>
        </ul>
        <div className="tourism-fact"><b>1893</b><span>Por um curto período, São Bento do Sul foi a cidade onde funcionou o governo de Santa Catarina.</span></div>
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
        {side === "front" ? <Front open={openDetail} /> : <Back open={openDetail} />}
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
              {details[activeDetail].image && <img src={details[activeDetail].image} alt={details[activeDetail].imageAlt || ""} />}
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
                    <figure key={src}><img src={src} alt={alt} /><figcaption>{caption}</figcaption></figure>
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
    </main>
  );
}
