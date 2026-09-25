const E="/Dentist/".replace(/\/$/,""),H="iksdent-recenzja-dane",O="iksdent-recenzja-fokus",Q="iksdent-recenzja",u=[["/","Strona główna"],["/uslugi/stomatologia-zachowawcza","Stomatologia zachowawcza i estetyczna"],["/uslugi/stomatologia-dziecieca","Stomatologia dziecięca"],["/uslugi/endodoncja","Endodoncja"],["/uslugi/profilaktyka","Profilaktyka"],["/uslugi/wybielanie","Wybielanie"],["/uslugi/protetyka","Protetyka"],["/uslugi/ozonoterapia","Ozonoterapia"],["/uslugi/chirurgia","Chirurgia"],["/uslugi/radiowizjografia","Radiowizjografia"],["/cennik","Cennik"],["/praca","Praca"],["/zamowienia-publiczne","Zamówienia publiczne"]],ee=new Set(["STRONG","EM","B","I","U","MARK","SMALL","SUP","SUB","BR","ABBR","CODE","S","SPAN"]),W="p,div,h1,h2,h3,h4,h5,h6,li,ul,ol,section,article,header,footer,nav,table,img,button,form,input,textarea,select",te="header,script,style,noscript,textarea,input,select,option,[data-review-skip]",S=()=>window.innerWidth<640,$=e=>e.replace(/\s+/g," ").trim(),z=(e,t)=>`${e}
${t}`,x=e=>e.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]);let j=!0;const o=ae(),p=new WeakMap,_=new WeakMap;function ae(){const e={edits:{},notes:{},reviewed:{},editing:!0,open:window.innerWidth>=640};try{const t=localStorage.getItem(H),a=t?{...e,...JSON.parse(t)}:e;return window.innerWidth<640&&(a.open=!1),a}catch{return j=!1,e}}function k(){try{localStorage.setItem(H,JSON.stringify(o)),j=!0}catch{j=!1}}function m(){let e=location.pathname;return E&&e.startsWith(E)&&(e=e.slice(E.length)),e=e.replace(/\/+$/,""),e||"/"}const C=e=>{var t;return((t=u.find(([a])=>a===e))==null?void 0:t[1])??e},ne=e=>E+(e==="/"?"/":e),q=()=>Object.values(o.edits).sort((e,t)=>B(e.page)-B(t.page)),B=e=>{const t=u.findIndex(([a])=>a===e);return t<0?999:t},oe=e=>Object.values(o.edits).filter(t=>t.page===e).length;function V(e){const t=[],a=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;for(;n=a.nextNode();)t.push(n);return t}function D(e){const t=e.nodeType===Node.TEXT_NODE?e.parentElement:e;if(!t||!(t instanceof HTMLElement))return;const a=document.getElementById("root");if(!a||!a.contains(t))return;const n=new Set,i=document.createTreeWalker(t,NodeFilter.SHOW_TEXT);let r=e.nodeType===Node.TEXT_NODE?e:i.nextNode();for(;r;r=i.nextNode()){if(!new RegExp("\\p{L}","u").test(r.nodeValue??""))continue;let l=r.parentElement;if(l){for(;ee.has(l.tagName)&&l.parentElement&&!l.parentElement.querySelector(W);)l=l.parentElement;l.closest(te)||l.querySelector(W)||n.add(l)}}const h=l=>{let s=0;for(let g=l;g;g=g.parentElement)s++;return s};[...n].sort((l,s)=>h(l)-h(s)).forEach(ie)}function ie(e){var a;if(p.has(e)||(a=e.parentElement)!=null&&a.closest("[data-rv]"))return;const t=$(e.textContent??"");t&&(p.set(e,t),_.set(e,V(e).map(n=>[n,n.nodeValue??""])),e.setAttribute("data-rv",""),Z(e))}function G(e,t){const a=V(e);if(!a.length){e.appendChild(document.createTextNode(t));return}a[0].nodeValue=t;for(let n=1;n<a.length;n++)a[n].nodeValue=""}function re(e){const t=_.get(e);t&&t.every(([a])=>e.contains(a))?t.forEach(([a,n])=>a.nodeValue=n):G(e,p.get(e)??"")}function Z(e){const t=p.get(e);if(t===void 0)return;const a=o.edits[z(m(),t)];a?e.textContent!==a.text&&G(e,a.text):$(e.textContent??"")!==t&&re(e),e.toggleAttribute("data-rv-changed",!!a),e.style.whiteSpace=a&&a.text.includes(`
`)?"pre-line":""}function I(){document.querySelectorAll("[data-rv]").forEach(Z)}function A(e,t){const a=m(),n=z(a,e),i=t.split(`
`).map(r=>r.replace(/[ \t]+/g," ").trim()).join(`
`).replace(/\n{3,}/g,`

`).trim();$(i)===e?delete o.edits[n]:o.edits[n]={page:a,original:e,text:i,at:new Date().toISOString()},k(),I(),w()}function se(e){delete o.edits[e],k(),I(),w()}function F(){const e=q(),a=["POPRAWKI TREŚCI — strona IKS-DENT",`Data: ${new Date().toLocaleString("pl-PL")}`,`Liczba zmian: ${e.length}`,`Przejrzane strony: ${u.filter(([r])=>o.reviewed[r]).length} z ${u.length}`,""],n=[...new Set([...u.map(([r])=>r),...e.map(r=>r.page),...Object.keys(o.notes)])];for(const r of n){const h=e.filter(s=>s.page===r),l=(o.notes[r]??"").trim();!h.length&&!l&&!o.reviewed[r]||(a.push(`==================== ${C(r)} (${r}) ====================`),a.push(`Przejrzana: ${o.reviewed[r]?"tak":"nie"}`),l&&a.push("","UWAGI:",l),h.forEach((s,g)=>{a.push("",`[${g+1}]`,"BYŁO:",s.original,"JEST:",s.text||"(tekst usunięty)")}),a.push("",""))}const i=u.filter(([r])=>!o.reviewed[r]).map(([,r])=>r);return i.length&&a.push(`Strony nieoznaczone jako przejrzane: ${i.join(", ")}`,""),a.push("----- DANE TECHNICZNE (proszę nie edytować) -----",JSON.stringify({edits:e,notes:o.notes,reviewed:o.reviewed},null,1)),a.join(`
`)}function de(){const e=new Blob([F()],{type:"text/plain;charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(e),t.download=`poprawki-iksdent-${new Date().toISOString().slice(0,10)}.txt`,document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(t.href),2e3),N("Plik został pobrany — wyślij go mailem jako załącznik.")}async function le(){const e=F();try{await navigator.clipboard.writeText(e)}catch{const t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("copy"),t.remove()}N("Skopiowano — możesz wkleić treść do maila.")}let f,c=null,L="",y=!1;const b={pagesOpen:!1,changesOpen:!1},ce=`
html.rv-editing [data-rv]{cursor:text;border-radius:4px;transition:outline-color .15s,background-color .15s}
html.rv-editing [data-rv]:hover{outline:2px dashed #d97706;outline-offset:3px}
html.rv-editing [data-rv][data-rv-changed]{outline:2px solid rgba(217,119,6,.55);outline-offset:3px;background-color:rgba(251,191,36,.14)}
html.rv-editing [data-rv][data-rv-active]{outline:3px solid #d97706;outline-offset:3px;background-color:rgba(251,191,36,.22)}
@keyframes rv-flash{0%,100%{background-color:rgba(251,191,36,.14)}50%{background-color:rgba(251,191,36,.6)}}
[data-rv-flash]{animation:rv-flash .7s ease-in-out 3}
`,pe=`
:host{all:initial}
*{box-sizing:border-box;font-family:"Instrument Sans",system-ui,-apple-system,"Segoe UI",sans-serif}
button{font:inherit;cursor:pointer}
.wrap{position:fixed;right:16px;bottom:16px;z-index:2147483000;color:#1f2a1f;font-size:14px;line-height:1.45}
.pill{display:flex;align-items:center;gap:8px;padding:12px 18px;border-radius:999px;border:0;background:#4f5f16;color:#fff;font-weight:600;box-shadow:0 8px 24px rgba(0,0,0,.25)}
.pill .badge{background:#fbbf24;color:#3b2a00}
.badge{display:inline-block;min-width:22px;padding:1px 7px;border-radius:999px;font-size:12px;font-weight:700;text-align:center;background:#eef1e6;color:#4f5f16}
.badge.hot{background:#fde68a;color:#78350f}
.sheet{display:none;flex-direction:column;width:340px;max-height:min(80vh,720px);background:#fff;border:1px solid #dfe5d8;border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.22);overflow:hidden}
.wrap.open .sheet{display:flex}
.wrap.open .pill{display:none}
.head{display:flex;align-items:flex-start;justify-content:space-between;gap:8px;padding:14px 16px;background:#4f5f16;color:#fff}
.head strong{display:block;font-size:15px}
.head small{opacity:.85;font-size:12px}
.icon-btn{border:0;background:rgba(255,255,255,.15);color:#fff;width:30px;height:30px;border-radius:8px;font-size:16px;line-height:1}
.body{padding:14px 16px;overflow:auto;display:flex;flex-direction:column;gap:14px}
.switch{display:flex;align-items:center;gap:10px;font-weight:600;cursor:pointer}
.switch input{width:18px;height:18px;accent-color:#4f5f16}
.hint{margin:0;color:#5b6657;font-size:13px}
.warn{margin:0;padding:8px 10px;border-radius:8px;background:#fee2e2;color:#7f1d1d;font-size:13px}
.card{border:1px solid #e5e9df;border-radius:12px;padding:12px}
.card h3{margin:0 0 8px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#4f5f16}
.row{display:flex;align-items:center;justify-content:space-between;gap:8px}
textarea{width:100%;font:inherit;font-size:14px;padding:8px 10px;border:1px solid #cfd6c6;border-radius:8px;resize:vertical;color:inherit;background:#fff}
textarea:focus{outline:2px solid #4f5f16;outline-offset:1px}
.toggle{display:flex;width:100%;align-items:center;justify-content:space-between;border:0;background:none;padding:0;font-weight:600;color:inherit;text-align:left}
.toggle::after{content:"▾";color:#7a8574}
.toggle[aria-expanded="true"]::after{content:"▴"}
.list{list-style:none;margin:8px 0 0;padding:0;display:flex;flex-direction:column;gap:2px}
.list button.page{display:flex;width:100%;align-items:center;gap:8px;border:0;background:none;padding:6px 8px;border-radius:8px;text-align:left;color:inherit}
.list button.page:hover{background:#f3f6ee}
.list button.page.current{background:#eef1e6;font-weight:600}
.list .name{flex:1}
.tick{color:#15803d;font-weight:700;width:14px}
.change{border-top:1px solid #eef1e9;padding:10px 0}
.change:first-child{border-top:0;padding-top:4px}
.change .where{font-size:12px;color:#7a8574;margin-bottom:4px}
.was,.now{margin:0;font-size:13px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;white-space:pre-line}
.was{color:#9b1c1c;text-decoration:line-through;text-decoration-color:rgba(155,28,28,.4)}
.now{color:#14532d;margin-top:2px}
.actions{display:flex;gap:6px;margin-top:6px}
.link{border:0;background:none;padding:2px 0;color:#4f5f16;font-weight:600;font-size:13px;text-decoration:underline}
.link.danger{color:#b91c1c}
.foot{padding:12px 16px 14px;border-top:1px solid #e5e9df;display:flex;flex-direction:column;gap:8px;background:#fafbf8}
.btn{border:1px solid #cfd6c6;background:#fff;color:#1f2a1f;padding:9px 14px;border-radius:10px;font-weight:600}
.btn.primary{background:#4f5f16;border-color:#4f5f16;color:#fff}
.btn:hover{filter:brightness(.97)}
.btns{display:flex;gap:8px}
.btns .btn{flex:1}
.foot small{color:#6b7566;font-size:12px}
.foot .minor{display:flex;justify-content:space-between;gap:8px}
.empty{margin:0;color:#7a8574;font-size:13px}

.editor{position:fixed;z-index:2147483001;width:min(520px,calc(100vw - 32px));background:#fff;border:2px solid #d97706;border-radius:14px;box-shadow:0 18px 44px rgba(0,0,0,.25);padding:12px;display:none;flex-direction:column;gap:8px;color:#1f2a1f;font-size:14px}
.editor.show{display:flex}
.editor label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#92400e}
.editor textarea{min-height:70px;max-height:40vh;resize:none;font-size:15px;line-height:1.5}
.editor .orig{font-size:12px;color:#6b7566;background:#f7f8f4;border-radius:8px;padding:6px 8px;max-height:90px;overflow:auto;white-space:pre-line}
.editor .ebtns{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}
.editor .ebtns .spacer{flex:1}
.editor small{color:#7a8574;font-size:12px}
.toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483002;background:#1f2a1f;color:#fff;padding:10px 16px;border-radius:10px;font-size:14px;box-shadow:0 8px 24px rgba(0,0,0,.25);opacity:0;transition:opacity .2s;pointer-events:none;max-width:calc(100vw - 32px)}
.toast.show{opacity:1}

@media (max-width:639px){
  .wrap{right:12px;bottom:12px;left:auto}
  .wrap.open{left:0;right:0;bottom:0}
  .sheet{width:100%;max-height:75vh;border-radius:16px 16px 0 0}
  .editor{left:8px!important;right:8px;width:auto;bottom:8px;top:auto!important}
  .editor > small{display:none}
}
`;function d(e){return f.querySelector(e)}function ge(){const e=document.createElement("style");e.textContent=ce,document.head.appendChild(e);const t=document.createElement("div");t.id="iks-review-host",document.body.appendChild(t),f=t.attachShadow({mode:"open"});const a=m();f.innerHTML=`
    <style>${pe}</style>
    <div class="wrap">
      <button class="pill" data-a="open">✎ Recenzja treści <span class="badge" data-count></span></button>
      <section class="sheet" aria-label="Panel recenzji treści">
        <div class="head">
          <div><strong>Recenzja treści</strong><small>Wersja robocza strony IKS-DENT</small></div>
          <button class="icon-btn" data-a="close" title="Zwiń panel" aria-label="Zwiń panel">–</button>
        </div>
        <div class="body">
          <p class="warn" data-warn hidden>Ta przeglądarka nie zapisuje zmian (np. tryb prywatny). Pobierz plik z poprawkami przed zamknięciem strony.</p>
          <label class="switch"><input type="checkbox" data-a="editing"> Poprawianie tekstów</label>
          <p class="hint" data-hint></p>

          <div class="card">
            <h3>Ta strona: ${x(C(a))}</h3>
            <label class="switch" style="font-weight:500"><input type="checkbox" data-a="reviewed"> Przejrzana</label>
            <div style="margin-top:8px">
              <textarea rows="3" data-a="notes" placeholder="Uwagi do tej strony (np. czego brakuje, co usunąć, pytania)…"></textarea>
            </div>
          </div>

          <div class="card">
            <button class="toggle" data-a="toggle-pages" aria-expanded="false">
              <span>Strony do przejrzenia <span class="badge" data-reviewed></span></span>
            </button>
            <ul class="list" data-pages hidden></ul>
          </div>

          <div class="card">
            <button class="toggle" data-a="toggle-changes" aria-expanded="false">
              <span>Wszystkie zmiany <span class="badge" data-count></span></span>
            </button>
            <div data-changes hidden></div>
          </div>
        </div>
        <div class="foot">
          <div class="btns">
            <button class="btn primary" data-a="download">Pobierz plik z poprawkami</button>
            <button class="btn" data-a="copy">Kopiuj</button>
          </div>
          <small>Zmiany zapisują się automatycznie w tej przeglądarce, więc możesz wrócić do pracy później. Gdy skończysz, pobierz plik i wyślij go mailem.</small>
          <div class="minor">
            <button class="link danger" data-a="clear">Usuń wszystkie zmiany</button>
            <button class="link" data-a="exit">Zamknij tryb recenzji</button>
          </div>
        </div>
      </section>
    </div>

    <div class="editor" role="dialog" aria-label="Edycja tekstu">
      <label for="rv-text">Popraw tekst</label>
      <textarea id="rv-text" data-e="text"></textarea>
      <div data-e="orig-wrap" hidden><small>Oryginał:</small><div class="orig" data-e="orig"></div></div>
      <div class="ebtns">
        <button class="link" data-e="restore" hidden>Przywróć oryginał</button>
        <span class="spacer"></span>
        <button class="btn" data-e="cancel">Anuluj</button>
        <button class="btn primary" data-e="done">Gotowe</button>
      </div>
      <small>Enter — zatwierdź · Shift+Enter — nowa linia · Esc — anuluj</small>
    </div>
    <div class="toast" data-toast></div>
  `,d('[data-a="notes"]').value=o.notes[a]??"",f.addEventListener("click",fe),f.addEventListener("input",K),f.addEventListener("change",K);const n=d('[data-e="text"]');n.addEventListener("input",()=>{P(n),c&&A(p.get(c),n.value),R()}),n.addEventListener("keydown",i=>{i.key==="Enter"&&!i.shiftKey?(i.preventDefault(),v()):i.key==="Escape"&&(i.preventDefault(),J())}),w()}function w(){if(!f)return;const e=m(),t=q(),a=u.filter(([s])=>o.reviewed[s]).length;f.querySelector(".wrap").classList.toggle("open",o.open),f.querySelectorAll("[data-count]").forEach(s=>{s.textContent=String(t.length)}),d("[data-reviewed]").textContent=`${a}/${u.length}`,d("[data-warn]").hidden=j,d('[data-a="editing"]').checked=o.editing,d('[data-a="reviewed"]').checked=!!o.reviewed[e],d("[data-hint]").textContent=o.editing?"Kliknij dowolny tekst na stronie, aby go poprawić — zmiana od razu pojawi się na stronie. Zmienione fragmenty są podświetlone na pomarańczowo.":"Poprawianie wyłączone — możesz swobodnie klikać linki, rozwijać pytania i przeglądać stronę.",document.documentElement.classList.toggle("rv-editing",o.editing),d('[data-a="toggle-pages"]').setAttribute("aria-expanded",String(b.pagesOpen));const i=d("[data-pages]");i.hidden=!b.pagesOpen,i.innerHTML=u.map(([s,g])=>{const U=oe(s);return`<li><button class="page${s===e?" current":""}" data-a="go" data-page="${x(s)}">
      <span class="tick">${o.reviewed[s]?"✓":""}</span>
      <span class="name">${x(g)}</span>
      ${U?`<span class="badge hot">${U}</span>`:""}
    </button></li>`}).join(""),d('[data-a="toggle-changes"]').setAttribute("aria-expanded",String(b.changesOpen));const h=d("[data-changes]");h.hidden=!b.changesOpen,h.innerHTML=t.length?t.map(s=>{const g=z(s.page,s.original);return`<div class="change">
            <div class="where">${x(C(s.page))}</div>
            <p class="was">${x(s.original)}</p>
            <p class="now">${x(s.text||"(tekst usunięty)")}</p>
            <div class="actions">
              <button class="link" data-a="show" data-key="${x(g)}">Pokaż na stronie</button>
              <button class="link danger" data-a="revert" data-key="${x(g)}">Cofnij</button>
            </div>
          </div>`}).join(""):'<p class="empty" style="margin-top:8px">Jeszcze nic nie zmieniono.</p>';const l=d('[data-a="clear"]');l.textContent=y?"Na pewno? Kliknij ponownie":"Usuń wszystkie zmiany"}function fe(e){const t=e.target.closest("[data-a],[data-e]");if(!t)return;const a=t.dataset.a,n=t.dataset.e;if(a!=="clear"&&(y=!1),a==="open"||a==="close")o.open=a==="open",k();else if(a==="toggle-pages")b.pagesOpen=!b.pagesOpen;else if(a==="toggle-changes")b.changesOpen=!b.changesOpen;else if(a==="go")X(t.dataset.page);else if(a==="download")de();else if(a==="copy")le();else if(a==="revert")se(t.dataset.key);else if(a==="show")he(t.dataset.key);else if(a==="clear")y&&(o.edits={},o.notes={},o.reviewed={},k(),d('[data-a="notes"]').value="",I(),N("Usunięto wszystkie zmiany.")),y=!y;else if(a==="exit"){try{localStorage.removeItem(Q)}catch{}location.assign(location.pathname);return}if(n==="done")v();else if(n==="cancel")J();else if(n==="restore"&&c){const i=d('[data-e="text"]');i.value=p.get(c),A(p.get(c),i.value),P(i),R()}w()}function K(e){const t=e.target,a=m();if(t.dataset.a==="editing"&&e.type==="change")o.editing=t.checked,o.editing||v();else if(t.dataset.a==="reviewed"&&e.type==="change")o.reviewed[a]=t.checked,t.checked||delete o.reviewed[a];else if(t.dataset.a==="notes")t.value.trim()?o.notes[a]=t.value:delete o.notes[a];else return;k(),t.dataset.a!=="notes"&&w()}let M=0;function N(e){const t=d("[data-toast]");t.textContent=e,t.classList.add("show"),clearTimeout(M),M=window.setTimeout(()=>t.classList.remove("show"),3200)}function P(e){e.style.height="auto",e.style.height=`${e.scrollHeight+2}px`}function R(){if(!c)return;const e=p.get(c),t=!!o.edits[z(m(),e)];d('[data-e="orig-wrap"]').hidden=!t,d('[data-e="restore"]').hidden=!t,d('[data-e="orig"]').textContent=e}function ue(e){c&&c!==e&&v(),c=e,e.setAttribute("data-rv-active","");const t=p.get(e),a=o.edits[z(m(),t)];L=a?a.text:t,S()&&o.open&&(o.open=!1,w());const n=d('[data-e="text"]');n.value=L,d(".editor").classList.add("show"),R(),P(n),S()&&e.scrollIntoView({block:"center",behavior:"smooth"}),T(),n.focus({preventScroll:!0}),n.setSelectionRange(n.value.length,n.value.length)}function v(){c&&(c.removeAttribute("data-rv-active"),c=null,d(".editor").classList.remove("show"))}function J(){c&&A(p.get(c),L),v()}function T(){if(!c||S())return;const e=d(".editor"),t=c.getBoundingClientRect(),a=e.offsetHeight,n=e.offsetWidth;let i=t.bottom+12;i+a>window.innerHeight-12&&(i=t.top-a-12),i=Math.max(12,Math.min(i,window.innerHeight-a-12));const r=Math.max(16,Math.min(t.left,window.innerWidth-n-16));e.style.top=`${i}px`,e.style.left=`${r}px`}function X(e){location.assign(ne(e))}function he(e){const t=o.edits[e];if(t){if(t.page!==m()){try{sessionStorage.setItem(O,t.original)}catch{}X(t.page);return}Y(t.original)}}function Y(e){const t=[...document.querySelectorAll("[data-rv]")].find(a=>p.get(a)===e);return t?(t.scrollIntoView({block:"center",behavior:"smooth"}),t.setAttribute("data-rv-flash",""),setTimeout(()=>t.removeAttribute("data-rv-flash"),2200),S()&&(o.open=!1,w()),!0):!1}function xe(e){const t=e.target;if(!(t instanceof Element)||t.closest("#iks-review-host"))return;if(o.editing){const n=t.closest("[data-rv]");if(n&&!t.closest("svg")){e.preventDefault(),e.stopPropagation(),ue(n);return}c&&v()}const a=t.closest("a[href]");if(a&&a.origin===location.origin&&!a.target&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey){const n=new URL(a.href);n.pathname!==location.pathname&&(e.preventDefault(),e.stopPropagation(),location.assign(n.href))}}function be(){ge();const e=document.getElementById("root");new MutationObserver(a=>{for(const n of a)n.addedNodes.forEach(i=>D(i))}).observe(e,{childList:!0,subtree:!0}),D(e),window.addEventListener("click",xe,!0),window.addEventListener("popstate",()=>location.reload()),window.addEventListener("scroll",()=>requestAnimationFrame(T),{capture:!0,passive:!0}),window.addEventListener("resize",()=>requestAnimationFrame(T));let t=null;try{t=sessionStorage.getItem(O),sessionStorage.removeItem(O)}catch{}if(t){let a=0;const n=()=>{!Y(t)&&++a<30&&setTimeout(n,100)};setTimeout(n,300)}}export{Q as REVIEW_FLAG,be as startReview};
