(() => {
  const months = {
    enero: 0, febrero: 1, marzo: 2, abril: 3, mayo: 4, junio: 5,
    julio: 6, agosto: 7, septiembre: 8, octubre: 9, noviembre: 10, diciembre: 11
  };

  const style = document.createElement("style");
  style.textContent = `
    .mg-help{position:fixed;right:20px;bottom:20px;z-index:90;font-family:inherit}
    .mg-help>button{display:flex;align-items:center;gap:9px;border:0;border-radius:999px;padding:13px 18px;background:#075c68;color:#fff;
      font:800 12px/1 inherit;box-shadow:0 12px 35px rgba(7,92,104,.28);cursor:pointer}
    .mg-help>button::before{content:"☎";display:grid;place-items:center;width:25px;height:25px;border-radius:50%;
      background:rgba(255,255,255,.16);font-size:14px}
    .mg-help-panel{display:none;position:absolute;right:0;bottom:62px;width:min(350px,calc(100vw - 32px));
      padding:18px;border:1px solid #d5e5e8;border-radius:20px;background:#fff;box-shadow:0 22px 60px rgba(23,66,87,.18)}
    .mg-help.open .mg-help-panel{display:grid;gap:8px}
    .mg-help-panel strong{font-family:Georgia,serif;font-size:21px;color:#17384c}
    .mg-help-panel p{margin:0 0 5px;color:#5d7280;font-size:11px;line-height:1.55}
    .mg-help-panel a{padding:11px 12px;border-radius:11px;background:#dff5ef;color:#075c68;font-size:11px;font-weight:800;text-decoration:none}
    .mg-help-panel .mg-urgent{background:#9f3e35;color:#fff}
    .mg-emergency-data{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .mg-emergency-data div{padding:10px 11px;border-radius:11px;background:#f4f8f6}
    .mg-emergency-data b,.mg-emergency-data span{display:block}
    .mg-emergency-data b{color:#17384c;font-size:11px}
    .mg-emergency-data span{margin-top:2px;color:#5d7280;font-size:10px;line-height:1.35}
    .mg-help-note{padding-top:6px;border-top:1px solid #d5e5e8;color:#6d7e84!important;font-size:10px!important}
    .mg-calendar{display:inline-flex;margin-top:12px;border:1px solid #087d78;border-radius:999px;padding:9px 13px;
      background:#fff;color:#087d78;font:800 11px/1 inherit;cursor:pointer}
    .mg-home-section{padding:92px 0;background:#fcfefa;color:#173f38}
    .mg-home-section.mg-dental{background:linear-gradient(145deg,#edf8f3,#f8fcfa)}
    .mg-home-container{width:min(1160px,calc(100% - 40px));margin:0 auto}
    .mg-home-heading{display:grid;grid-template-columns:1fr .72fr;gap:55px;align-items:end;margin-bottom:38px}
    .mg-home-kicker{margin:0 0 10px;color:#3f9d82;font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
    .mg-home-heading h2{margin:0;font:500 clamp(38px,5vw,62px)/1.05 Georgia,serif;color:#173f38}
    .mg-home-heading>p{margin:0;color:#60766f;font-size:14px;line-height:1.75}
    .mg-dental-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
    .mg-dental-card{padding:25px;border:1px solid rgba(34,105,87,.18);border-radius:19px;background:#fff}
    .mg-dental-card span{display:grid;width:35px;height:35px;place-items:center;border-radius:50%;background:#edf9f4;color:#3f9d82;font-weight:900}
    .mg-dental-card h3{margin:18px 0 9px;font:500 24px/1.1 Georgia,serif;color:#173f38}
    .mg-dental-card p{margin:0;color:#60766f;font-size:12px;line-height:1.7}
    .mg-systemic{margin-top:18px;padding:24px 27px;border-radius:18px;background:#2f7865;color:#fff}
    .mg-systemic strong{display:block;margin-bottom:7px;font:500 23px/1.2 Georgia,serif}
    .mg-systemic p{margin:0;color:rgba(255,255,255,.82);font-size:12px;line-height:1.7}
    .mg-section-link{display:inline-flex;margin-top:22px;padding:12px 17px;border-radius:999px;background:#3f9d82;color:#fff!important;font-size:12px;font-weight:850;text-decoration:none}
    .mg-sources{padding:24px 0 20px;background:#5a9685;color:#fff;border-bottom:1px solid rgba(255,255,255,.14)}
    .mg-sources-row{display:flex;align-items:center;justify-content:space-between;gap:28px}
    .mg-sources-copy{display:flex;align-items:baseline;gap:13px}
    .mg-sources-copy strong{font:500 17px/1.2 Georgia,serif}
    .mg-sources-copy span{color:rgba(255,255,255,.72);font-size:10px}
    .mg-source-links{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:7px 14px}
    .mg-source-links a{color:rgba(255,255,255,.88);font-size:10px;font-weight:750;text-decoration:none}
    .mg-source-links a:hover{text-decoration:underline}
    @media(max-width:560px){.mg-help{right:14px;bottom:14px}.mg-help>button{padding:11px 15px}}
    @media(max-width:850px){.mg-home-heading{grid-template-columns:1fr;gap:16px}.mg-dental-grid{grid-template-columns:1fr 1fr}.mg-sources-row{align-items:flex-start;flex-direction:column;gap:12px}.mg-source-links{justify-content:flex-start}}
    @media(max-width:560px){.mg-home-section{padding:66px 0}.mg-dental-grid{grid-template-columns:1fr}.mg-emergency-data{grid-template-columns:1fr}.mg-sources-copy{align-items:flex-start;flex-direction:column;gap:3px}}
  `;
  document.head.appendChild(style);

  const widget = document.createElement("aside");
  widget.className = "mg-help";
  widget.setAttribute("aria-label", "Ayuda y emergencias");
  widget.innerHTML = `
    <div class="mg-help-panel">
      <strong>Teléfonos de urgencia</strong>
      <p>Si hay peligro inmediato, llama al número oficial del lugar donde te encuentras.</p>
      <div class="mg-emergency-data">
        <div><b>Unión Europea</b><span>112 · emergencias</span></div>
        <div><b>México</b><span>911 · emergencias</span></div>
        <div><b>Marruecos</b><span>15 · ambulancia / 19 · policía</span></div>
        <div><b>Otros países</b><span>Consulta el número local antes de llamar</span></div>
      </div>
      <a class="mg-urgent" href="./directorio/">Ver teléfonos por país</a>
      <p class="mg-help-note">Si existe peligro inmediato, llama al servicio de emergencias local. Esta web no sustituye la atención urgente.</p>
    </div>
    <button type="button" aria-expanded="false" aria-controls="mg-help-panel">Necesito ayuda</button>`;
  widget.querySelector(".mg-help-panel").id = "mg-help-panel";
  document.body.appendChild(widget);
  const toggle = widget.querySelector("button");
  toggle.addEventListener("click", () => {
    const open = widget.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", (event) => {
    if (!widget.contains(event.target) && widget.classList.contains("open")) {
      widget.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  const addHomeSections = () => {
    const root = document.querySelector("#root");
    const footer = root?.querySelector("footer");
    const main = root?.querySelector("main");
    if (!footer || !main || document.querySelector("#medicina-dentaria")) return false;

    const dental = document.createElement("section");
    dental.className = "mg-home-section mg-dental";
    dental.id = "medicina-dentaria";
    dental.innerHTML = `
      <div class="mg-home-container">
        <div class="mg-home-heading">
          <div><p class="mg-home-kicker">SALUD BUCODENTAL POR ETAPAS</p><h2>Medicina dentaria</h2></div>
          <p>Prevención, cuidados y señales de consulta desde el primer diente hasta el adulto mayor, con información específica sobre caries, encías, ortodoncia, prótesis y urgencias.</p>
        </div>
        <div class="mg-dental-grid">
          <article class="mg-dental-card"><span>01</span><h3>Infancia</h3><p>Primer diente, pasta fluorada, caries temprana, traumatismos, hábitos orales y desarrollo de la mordida.</p></article>
          <article class="mg-dental-card"><span>02</span><h3>Adolescencia</h3><p>Ortodoncia, higiene con brackets o alineadores, bebidas azucaradas, vapeo, piercings y deporte.</p></article>
          <article class="mg-dental-card"><span>03</span><h3>Adultez</h3><p>Caries, gingivitis, periodontitis, embarazo, sensibilidad, lesiones orales y conservación dental.</p></article>
          <article class="mg-dental-card"><span>04</span><h3>Adulto mayor</h3><p>Boca seca, prótesis, pérdida dental, autonomía para la higiene y cuidados adaptados al deterioro cognitivo.</p></article>
        </div>
        <div class="mg-systemic">
          <strong>Boca, diabetes, corazón y deterioro cognitivo</strong>
          <p>La enfermedad periodontal comparte factores de riesgo y se asocia con diabetes, enfermedad cardiovascular y deterioro cognitivo/Alzheimer. Estas asociaciones no demuestran que una condición cause directamente la otra.</p>
        </div>
        <a class="mg-section-link" href="/guias?tema=odontologia">Abrir la guía completa de medicina dentaria →</a>
      </div>`;

    const bibliography = document.createElement("section");
    bibliography.className = "mg-sources";
    bibliography.id = "bibliografia";
    bibliography.innerHTML = `
      <div class="mg-home-container mg-sources-row">
        <div class="mg-sources-copy">
          <strong>Fuentes de información</strong>
          <span>Revisión editorial · julio de 2026</span>
        </div>
        <nav class="mg-source-links" aria-label="Fuentes de información">
          <a href="https://www.who.int/europe/" target="_blank" rel="noreferrer">OMS Europa ↗</a>
          <a href="https://www.nice.org.uk/guidance" target="_blank" rel="noreferrer">NICE ↗</a>
          <a href="https://www.ema.europa.eu/" target="_blank" rel="noreferrer">EMA ↗</a>
          <a href="https://www.fda.gov/" target="_blank" rel="noreferrer">FDA ↗</a>
          <a href="https://www.efsa.europa.eu/" target="_blank" rel="noreferrer">EFSA ↗</a>
          <a href="/bibliografia">Ver todas las fuentes →</a>
        </nav>
      </div>`;

    const aesthetics = main.querySelector("#estetica");
    if (aesthetics) {
      main.insertBefore(dental, aesthetics);
    } else {
      main.appendChild(dental);
    }
    main.appendChild(bibliography);

    const nav = root.querySelector(".nav-links");
    const aboutLink = nav?.querySelector('a[href="#sobre"]');
    if (nav && aboutLink) {
      const dentalLink = document.createElement("a");
      dentalLink.href = "#medicina-dentaria";
      dentalLink.textContent = "Dentaria";
      nav.insertBefore(dentalLink, aboutLink);
    }
    return true;
  };

  const parseSpanishDate = (text) => {
    const match = text.match(/(\d{1,2}) de ([a-záéíóú]+) de (\d{4})/i);
    if (!match) return null;
    const month = months[match[2].toLowerCase()];
    return month === undefined ? null : new Date(Number(match[3]), month, Number(match[1]), 12);
  };
  const icsDate = (date) =>
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const downloadCalendar = (resultText) => {
    const date = parseSpanishDate(resultText);
    if (!date) return;
    const title = /parto/i.test(resultText) ? "Fecha probable de parto" :
      /menstruación/i.test(resultText) ? "Próxima menstruación estimada" : "Ventana fértil estimada";
    const end = new Date(date); end.setDate(end.getDate() + 1);
    const content = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Maternity Global//ES",
      "BEGIN:VEVENT", `DTSTART;VALUE=DATE:${icsDate(date)}`, `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${title}`, `DESCRIPTION:${resultText.replace(/\n/g, " ")}`,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "maternity-global-calendario.ics"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const enhance = () => {
    addHomeSections();
    document.querySelectorAll("button").forEach((button) => {
      if (/guardar.*dispositivo/i.test(button.textContent || "")) button.remove();
      if (/descargar como imagen/i.test(button.textContent || "") && !button.dataset.mgPrivacy) {
        button.dataset.mgPrivacy = "ready";
        button.addEventListener("click", () => {
          window.setTimeout(() => window.location.reload(), 1400);
        });
      }
    });
    document.querySelectorAll(".result.show").forEach((result) => {
      if (result.querySelector(".mg-calendar")) return;
      const text = result.textContent || "";
      if (!parseSpanishDate(text)) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "mg-calendar";
      button.textContent = "Agregar al calendario del teléfono";
      button.addEventListener("click", () => downloadCalendar(text));
      result.appendChild(button);
    });
  };
  new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true, attributes: true });
  enhance();
})();
