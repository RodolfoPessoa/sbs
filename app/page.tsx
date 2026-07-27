"use client";

import { useState } from "react";

const facts = [
  ["87.661", "habitantes (estimativa 2025)"],
  ["495 km²", "de território"],
  ["1873", "ano de fundação"],
];

function LocationArt() {
  return (
    <div className="location-art" aria-label="Localização: Brasil, Santa Catarina, São Bento do Sul">
      <div className="route-line" />
      <div className="place brazil">
        <span className="place-number">01</span>
        <strong>BRASIL</strong>
        <small>Região Sul</small>
      </div>
      <div className="place santa">
        <span className="place-number">02</span>
        <strong>SANTA CATARINA</strong>
        <small>Planalto Norte</small>
      </div>
      <div className="place saobento">
        <span className="pin">●</span>
        <strong>SÃO BENTO DO SUL</strong>
        <small>26°15′ S · 49°23′ O</small>
      </div>
    </div>
  );
}

function Front() {
  return (
    <section className="sheet front" aria-label="Frente do folder">
      <article className="panel flap">
        <div className="eyebrow">DESCUBRA</div>
        <h2>Entre serras,<br />tradições<br />e histórias.</h2>
        <p className="lead">Uma cidade onde a herança europeia encontra a natureza do Planalto Norte catarinense.</p>
        <div className="mini-landscape" aria-hidden="true">
          <i /><i /><i /><b />
        </div>
        <p className="microcopy">Abra e conheça<br />São Bento do Sul →</p>
      </article>

      <article className="panel back-cover">
        <div>
          <div className="eyebrow">PLANEJE SUA VISITA</div>
          <h2>Leve São Bento<br />com você.</h2>
          <p>Natureza, cultura, boa mesa e hospitalidade em todas as estações.</p>
        </div>
        <div className="contact-block">
          <div className="qr-placeholder" aria-label="Espaço reservado para QR Code">
            <span>SEU<br />QR CODE</span>
          </div>
          <div>
            <strong>SAIBA MAIS</strong>
            <a href="https://saobentodosul.sc.gov.br/" target="_blank" rel="noreferrer">saobentodosul.sc.gov.br</a>
            <small>Santa Catarina · Brasil</small>
          </div>
        </div>
        <p className="source-note">Dados: IBGE · Conteúdo-base editável</p>
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
      </article>
    </section>
  );
}

function Back() {
  return (
    <section className="sheet back" aria-label="Verso do folder">
      <article className="panel intro">
        <div className="eyebrow">BEM-VINDO</div>
        <h2>Uma cidade<br />feita de encontros.</h2>
        <p>São Bento do Sul cresceu entre caminhos de serra, florestas e saberes trazidos por imigrantes europeus. O resultado é uma identidade singular — presente na arquitetura, nas festas, na gastronomia e no jeito acolhedor de receber.</p>
        <blockquote>“Tradição que inspira.<br />Natureza que abraça.”</blockquote>
        <div className="facts">
          {facts.map(([value, label]) => (
            <div key={value}><strong>{value}</strong><span>{label}</span></div>
          ))}
        </div>
      </article>

      <article className="panel location">
        <div className="eyebrow">ONDE FICA</div>
        <h2>No coração do<br />Planalto Norte.</h2>
        <LocationArt />
        <p>Em Santa Catarina, próximo à divisa com o Paraná e com acesso pela BR-280. A posição estratégica conecta a cidade a Curitiba, Joinville e ao litoral catarinense.</p>
      </article>

      <article className="panel curiosities">
        <div className="eyebrow">PARA GUARDAR</div>
        <h2>Curiosidades<br />de São Bento.</h2>
        <ol>
          <li>
            <span>01</span>
            <div><strong>Capital dos móveis</strong><p>A tradição moveleira ajudou a projetar o nome da cidade no Brasil e no exterior.</p></div>
          </li>
          <li>
            <span>02</span>
            <div><strong>Raízes multiculturais</strong><p>Influências alemãs, austríacas, tchecas e polonesas aparecem nos costumes locais.</p></div>
          </li>
          <li>
            <span>03</span>
            <div><strong>Natureza por perto</strong><p>Florestas de araucárias, rios, trilhas e paisagens de serra cercam a área urbana.</p></div>
          </li>
        </ol>
        <div className="stamp">VIVA<br /><b>SÃO BENTO</b></div>
      </article>
    </section>
  );
}

export default function Home() {
  const [side, setSide] = useState<"front" | "back">("front");
  const [folds, setFolds] = useState(true);

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
        {side === "front" ? <Front /> : <Back />}
        <p className="hint">Dica: na impressão, escolha A4 horizontal, escala 100% e ative “gráficos de fundo”.</p>
      </div>

      <div className="print-only">
        <Front />
        <Back />
      </div>
    </main>
  );
}
