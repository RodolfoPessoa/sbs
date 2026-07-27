"use client";

import { useState } from "react";

type DetailKey = "dados" | "economia" | "cidade" | "historia" | "mapas" | "turismo";

const details: Record<DetailKey, {
  kicker: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  facts: [string, string][];
  paragraphs: string[];
  links: [string, string][];
}> = {
  dados: {
    kicker: "RETRATO DO MUNICÍPIO",
    title: "São Bento do Sul em números",
    intro: "Um panorama rápido para compreender o território, a população e a qualidade de vida.",
    image: "/bandeira-sao-bento-do-sul.png",
    imageAlt: "Bandeira de São Bento do Sul",
    facts: [["87.661", "habitantes estimados em 2025"], ["495 km²", "área territorial"], ["838 m", "altitude aproximada"], ["0,782", "IDHM"], ["R$ 60.499", "PIB per capita em 2023"], ["4215802", "código IBGE"]],
    paragraphs: ["O município está no Planalto Norte catarinense, próximo à divisa com o Paraná. Sua localização favorece conexões com Curitiba, Joinville, o litoral e outros centros do Sul do país."],
    links: [["Consultar dados no IBGE", "https://www.ibge.gov.br/cidades-e-estados/sc/sao-bento-do-sul.html"]],
  },
  economia: {
    kicker: "VOCAÇÃO PRODUTIVA",
    title: "Da madeira à indústria diversificada",
    intro: "A transformação da madeira está na origem da economia local e ajudou a construir um dos polos moveleiros mais conhecidos do Brasil.",
    image: "/foto-cidade-05.jpg",
    imageAlt: "Arquitetura e paisagem de São Bento do Sul",
    facts: [["Móveis", "setor de referência"], ["Metalurgia", "cadeia industrial"], ["Cerâmica", "produção diversificada"], ["Têxtil", "fiação e confecção"]],
    paragraphs: ["As primeiras serrarias, carpintarias e marcenarias aproveitavam imbuía, pinheiro e canela. Ao longo do tempo, a produção ganhou escala, tecnologia e mercados internacionais.", "Hoje, plásticos, metalurgia, cerâmica, têxtil, comércio e serviços complementam a base produtiva do município."],
    links: [["Ver o Plano Municipal de Turismo", "https://turismoemsaobento.sc.gov.br/assets/plano_municipal_de_turismo.pdf"]],
  },
  cidade: {
    kicker: "CONHEÇA SÃO BENTO",
    title: "Uma cidade entre tradição e natureza",
    intro: "Patrimônio, trabalho, cultura e paisagens de serra formam uma identidade singular no Planalto Norte.",
    image: "/foto-cidade-01.jpg",
    imageAlt: "Praça Jardim dos Imigrantes",
    facts: [["1873", "início da colonização"], ["1884", "instalação do município"], ["Caminho dos Príncipes", "região turística"], ["Clima temperado", "característica local"]],
    paragraphs: ["A herança de diferentes povos aparece na arquitetura, na música, nas festas, na gastronomia e nos modos de produzir. O contato com araucárias, rios e áreas rurais completa a experiência da cidade."],
    links: [["Portal oficial de turismo", "https://www.turismoemsaobento.sc.gov.br/"]],
  },
  historia: {
    kicker: "LINHA DO TEMPO",
    title: "Da Colônia Dona Francisca ao município",
    intro: "A formação de São Bento do Sul reúne presença indígena, colonização europeia e a abertura de caminhos entre o planalto e o litoral.",
    image: "/foto-cidade-05.jpg",
    imageAlt: "Edificação histórica de São Bento do Sul",
    facts: [["1873", "chegada dos primeiros colonos"], ["1876", "nome São Bento"], ["1883", "elevação à vila"], ["1884", "município instalado"], ["1893", "sede temporária do governo estadual"]],
    paragraphs: ["A região era habitada por indígenas Xokleng. A partir de 1873, famílias alemãs, austríacas, polonesas e tchecas chegaram por meio da Sociedade Colonizadora de Hamburgo.", "Em 1876, Alfredo Taunay visitou a colônia e o núcleo recebeu o nome de São Bento. A memória desse percurso está preservada em museus, edificações e monumentos."],
    links: [["História no portal de turismo", "https://turismoemsaobento.sc.gov.br/ver?conteudo=saobentodosul"]],
  },
  mapas: {
    kicker: "EXPLORE O TERRITÓRIO",
    title: "Do Sul do Brasil às ruas da cidade",
    intro: "Dois mapas ajudam a entender a posição estratégica e a forma do município.",
    image: "/mapa-sul-planalto-norte-v2.png",
    imageAlt: "Mapa em camadas da Região Sul e do Planalto Norte",
    facts: [["BR-280", "principal acesso regional"], ["SC-418", "ligação com o litoral"], ["Paraná", "divisa ao norte"], ["Planalto Norte", "região de Santa Catarina"]],
    paragraphs: ["O mapa em camadas localiza São Bento do Sul no Planalto Norte. A cartografia do IBGE detalha os limites municipais, a rede viária e a concentração urbana."],
    links: [["Abrir mapa municipal do IBGE", "/mapa-municipal-ibge.png"], ["Abrir geoprocessamento municipal", "https://geo.saobentodosul.sc.gov.br/"]],
  },
  turismo: {
    kicker: "ROTEIROS & EXPERIÊNCIAS",
    title: "O que conhecer em São Bento do Sul",
    intro: "A cidade combina patrimônio histórico, natureza, cicloturismo, compras, gastronomia, eventos e turismo rural.",
    image: "/foto-cidade-04.jpg",
    imageAlt: "Igreja Matriz Puríssimo Coração de Maria",
    facts: [["Museu Dr. Felippe Maria Wolff", "história local"], ["Museu da Música", "memória musical"], ["Estrada Dona Francisca", "paisagem e patrimônio"], ["Circuito das Araucárias", "cicloturismo"], ["Rio Natal", "paisagens e mirantes"], ["Jardim dos Imigrantes", "centro e convivência"]],
    paragraphs: ["O Plano Municipal de Turismo identifica como forças da cidade o turismo de experiência, cultural, de natureza, negócios, compras, gastronomia e história.", "Na lousa digital, esta seção pode receber novos vídeos, roteiros, fotografias e atividades pedagógicas conforme o projeto evoluir."],
    links: [["Ver todos os atrativos", "https://www.turismoemsaobento.sc.gov.br/"], ["Buscar vídeos sobre o destino", "https://www.youtube.com/results?search_query=turismo+São+Bento+do+Sul+SC"]],
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
        src="/mapa-sul-planalto-norte-v2.png"
        alt="Mapa em camadas mostrando a Região Sul do Brasil, Santa Catarina e a posição de São Bento do Sul no Planalto Norte"
      />
      <div className="map-label map-label-south">
        <strong>REGIÃO SUL</strong>
        <small>Brasil</small>
      </div>
      <div className="map-label map-label-state">
        <strong>SANTA CATARINA</strong>
        <small>Planalto Norte</small>
      </div>
      <div className="map-label map-label-city">
        <strong>SÃO BENTO DO SUL</strong>
        <small>26°15′S · 49°23′O</small>
      </div>
    </div>
  );
}

function Front({ open }: { open: (detail: DetailKey) => void }) {
  return (
    <section className="sheet front" aria-label="Frente do folder">
      <article className="panel flap">
        <div className="eyebrow">SÍMBOLO MUNICIPAL</div>
        <div className="flag-frame">
          <img src="/bandeira-sao-bento-do-sul.png" alt="Bandeira oficial de São Bento do Sul" />
        </div>
        <h2>São Bento<br />do Sul.</h2>
        <p className="lead">Tradição, trabalho e natureza no Planalto Norte de Santa Catarina.</p>
        <div className="flap-data">
          <div><strong>87.661</strong><span>habitantes<br />estimados</span></div>
          <div><strong>495 km²</strong><span>de área<br />territorial</span></div>
          <div><strong>1873</strong><span>ano de<br />fundação</span></div>
        </div>
        <p className="microcopy">Abra e conheça São Bento do Sul →</p>
        <PanelTrigger detail="dados" open={open} />
      </article>

      <article className="panel back-cover economy">
        <div className="eyebrow">ECONOMIA</div>
        <h2>Trabalho que<br />ganha o mundo.</h2>
        <p>A transformação da madeira moldou a vocação produtiva do município. Das primeiras serrarias e marcenarias nasceu um polo moveleiro reconhecido nacional e internacionalmente.</p>
        <div className="economy-number">
          <strong>R$ 60,5 mil</strong>
          <span>PIB por habitante · 2023</span>
        </div>
        <div className="sectors">
          <span>MÓVEIS</span><span>METALURGIA</span><span>CERÂMICA</span>
          <span>PLÁSTICOS</span><span>FIAÇÃO & TÊXTIL</span><span>SERVIÇOS</span>
        </div>
        <div className="economy-note">
          <b>VOCÊ SABIA?</b>
          <p>São Bento do Sul consolidou-se como referência brasileira na produção de móveis, mantendo uma economia industrial diversificada.</p>
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
        <div className="cover-top">
          <span className="state-tag">SANTA CATARINA</span>
          <span className="edition">GUIA ESSENCIAL</span>
        </div>
        <div className="sun" aria-hidden="true" />
        <div className="cover-title">
          <p>UM CONVITE PARA</p>
          <h1>SÃO BENTO<br /><em>DO SUL</em></h1>
          <div className="title-rule"><span>26°15′S</span><span>49°23′O</span></div>
        </div>
        <div className="mountains" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
        <p className="cover-caption">CULTURA · NATUREZA · ACOLHIMENTO</p>
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
        <h2>Da Colônia Dona<br />Francisca à cidade.</h2>
        <div className="history-photo">
          <img src="/foto-cidade-05.jpg" alt="Arquitetura histórica de São Bento do Sul" />
          <span>Patrimônio e memória</span>
        </div>
        <p>A colonização europeia começou em 1873, com famílias alemãs, austríacas, polonesas e tchecas. A região era habitada por indígenas Xokleng e integrava a Colônia Dona Francisca.</p>
        <div className="timeline">
          <div><b>1873</b><span>Chegada dos primeiros colonos</span></div>
          <div><b>1876</b><span>O núcleo recebe o nome de São Bento</span></div>
          <div><b>1883</b><span>Elevação à categoria de vila</span></div>
          <div><b>1884</b><span>Instalação oficial do município</span></div>
        </div>
        <PanelTrigger detail="historia" open={open} />
      </article>

      <article className="panel location">
        <div className="eyebrow">LOCALIZAÇÃO & TERRITÓRIO</div>
        <h2>Do Sul do Brasil<br />ao município.</h2>
        <LocationArt />
        <div className="municipal-map">
          <img src="/mapa-municipal-ibge.png" alt="Mapa oficial do município de São Bento do Sul produzido pelo IBGE" />
          <div><b>MAPA MUNICIPAL</b><span>Limites, vias e área urbana · IBGE</span></div>
        </div>
        <p className="location-copy">Planalto Norte de Santa Catarina · acesso pela BR-280 e SC-418 · altitude aproximada de 838 m.</p>
        <PanelTrigger detail="mapas" open={open} />
      </article>

      <article className="panel curiosities">
        <div className="eyebrow">TURISMO & EXPERIÊNCIAS</div>
        <h2>História, natureza<br />e hospitalidade.</h2>
        <div className="photo-grid">
          <figure className="photo-main">
            <img src="/foto-cidade-04.jpg" alt="Igreja Matriz Puríssimo Coração de Maria" />
            <figcaption>Igreja Matriz</figcaption>
          </figure>
          <figure>
            <img src="/foto-cidade-01.jpg" alt="Praça Jardim dos Imigrantes" />
            <figcaption>Jardim dos Imigrantes</figcaption>
          </figure>
          <figure>
            <img src="/foto-cidade-06.jpg" alt="Paisagem rural e natural de São Bento do Sul" />
            <figcaption>Natureza & turismo rural</figcaption>
          </figure>
        </div>
        <ul className="tourism-list">
          <li>Museu Municipal Dr. Felippe Maria Wolff</li>
          <li>Estação Ferroviária e Museu da Música</li>
          <li>Estrada Dona Francisca e Casa Eichendorf</li>
          <li>Circuito das Araucárias de Cicloturismo</li>
        </ul>
        <div className="tourism-fact"><b>1893</b><span>Durante a Revolução Federalista, São Bento sediou temporariamente o governo de Santa Catarina.</span></div>
        <PanelTrigger detail="turismo" open={open} />
      </article>
    </section>
  );
}

export default function Home() {
  const [side, setSide] = useState<"front" | "back">("front");
  const [folds, setFolds] = useState(true);
  const [activeDetail, setActiveDetail] = useState<DetailKey | null>(null);

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
        {side === "front" ? <Front open={setActiveDetail} /> : <Back open={setActiveDetail} />}
        <p className="hint">Dica: na impressão, escolha A4 horizontal, escala 100% e ative “gráficos de fundo”.</p>
      </div>

      <div className="print-only">
        <Front open={() => undefined} />
        <Back open={() => undefined} />
      </div>

      {activeDetail && (
        <div className="detail-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveDetail(null);
        }}>
          <section className="detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title">
            <button className="modal-close" onClick={() => setActiveDetail(null)} aria-label="Fechar informações">×</button>
            <div className="detail-visual">
              {details[activeDetail].image && <img src={details[activeDetail].image} alt={details[activeDetail].imageAlt || ""} />}
              <span>{details[activeDetail].kicker}</span>
            </div>
            <div className="detail-content">
              <p className="detail-kicker">{details[activeDetail].kicker}</p>
              <h2 id="detail-title">{details[activeDetail].title}</h2>
              <p className="detail-intro">{details[activeDetail].intro}</p>
              <div className="detail-facts">
                {details[activeDetail].facts.map(([value, label]) => (
                  <div key={`${value}-${label}`}><strong>{value}</strong><span>{label}</span></div>
                ))}
              </div>
              <div className="detail-text">
                {details[activeDetail].paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
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
