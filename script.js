//==== Navegação Mobile & smooth===//
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    navLinks.classList.contains('active')
        ? icon.classList.replace('bx-menu', 'bx-x')
        : icon.classList.replace('bx-x', 'bx-menu');
});
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.getAttribute('href');
        const t = document.querySelector(id);
        if (!t) return;
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
        navLinks?.classList.remove('active');
    });
});

//===Estado====
let ctx = { profissional: null, wa: null, colecao: 'agendamentos' }; // <==Força agendamentos
let agendamentoContexto = {
    nomeCliente: '',
    produtos: [],
    totalProdutos: 0,
    raclub: { status: 'nao' },
    servico: null //{nome, valor}
};

//===Constantes===
const REVIEW_URL = document.getElementById('btnAvaliarGoogle')?.getAttribute('href') || '';

const PRODUTOS = [
    { nome: "Pomada Líquida DA Force MEN", preco: 39, 99 },
    { nome: "Leave-in", preco: 39, 99},
    { nome: "Tônico Capilar Dom Pelo", preco: 49, 99},
    { nome: "Balm Para Barba", preço: 39, 99},
    { nome: "Pomada Modeladora - Efeito Teia", preço: 3 4, 99},
    { nome: "Pomada modeladora - Efeito seco", preço: 34, 99},
];

// >>> Catálogo de Serviços Mostrado no modal
const SERVICOS = [
    { nome: 'Selecionar...', valor: null, placeholder: true }, //Primeira linha
    { nome: 'Acabamento', valor: 20,00 },
    { nome: 'Maquina e Tesoura', valor: 40,00 },
    { nome: 'Corte Maquina', valor: 40,00 },
    { nome: 'Corte Tesoura', valor: 50,00 },
    { nome: 'Alisamento Americano', valor: 40,00 },
    { nome: 'Corte Infantil', valor: 50,00 },
    { nome: 'Blidado', valor: 60,00 },
    { nome: 'Corte + Barba Alisamento prime', valor: 150,00 },
    { nome: 'Corte e Escova', valor: 70,00 },
    { nome: 'Corte Fantasia', valor: 60,00 },
    { nome: 'Barba + Sobrancelha', valor: 55,00 },
    { nome: 'Corte + Barba + Sobrancelha', valor: 90,00 },
    { nome: 'Corte + Alisamento Prime', valor: 95,00 },
    { nome: 'Corte + Progressiva', valor: 115,00 },
    { nome: 'Corte + Sobrancelha', valor: 65,00 },
    { nome: 'Corte + Feminino', valor: 70,00 },
    { nome: 'Matizar', valor: 30,00 },
    { nome: 'Progressiva', valor: 70,00 },
    { nome: 'Taper Fade', valor: 40,00 },
    { nome: 'Navalhado', valor: 45,00 },
    { nome: 'Alisamento + Corte + Barba + Pigmentação + Sobrancelha', valor: 230,00 },
    { nome: 'Alisamento Prime + Corte + Pigmentação + Sobrancelha', valor: 175,00 },
    { nome: 'Alisamento prime + Corte Maquina + Barba ', valor: 140,00 },
    { nome: 'Alisamento Prime + Corte Tesoura', valor: 125,00 },
    { nome: 'Alisamento Prime + Corte Tesoura + Barba', valor: 160,00 },
    { nome: 'Alisamento Prime + Navalhado', valor: 120,00 },
    { nome: 'Alisamento Prime + Navalhado + Barba', valor: 145,00 },
    { nome: 'Aplicação de Colorção', valor: 45,00 },
    { nome: 'Barba + Acabamento', valor: 55,00 },
    { nome: 'Barba + Hidratação ', valor: 55,00 },
    { nome: 'Barba + pigmentação', valor: 60,00 },
    { nome: 'Barba + limpeza de Pele', valor: 65,00 },
    { nome: 'Botox + Navalhado +Barba', valor: 110,00 },
    { nome: 'Botox Prime + Corte Maquina + Barba', valor: 120,00 },
    { nome: 'Botox Prime + Corte Tesoura + Barba', valor: 130,00 },
    { nome: 'Corte + Barba + Limpeza de Pele', valor: 120,00 },
    { nome: 'Corte + Barba', valor: 75,00 },
    { nome: 'Corte + Hidratação + Escova', valor: 65,00 },
    { nome: 'Corte + Alisamento Americano', valor: 75,00 },
    { nome: 'Corte + Alisamento Prime + Sobrancelha', valor: 130,00 },
    { nome: 'Corte + Barba + Alisamento Americano', valor: 100,00 },
    { nome: 'Corte + Barba + Botox Prime', valor: 120,00 },
    { nome: 'Corte + Barba + Limpeza de Pele', valor: 120,00 },
    { nome: 'Corte + Barba + Limpeza de Pele + Sobrancelha + Pigmentação Capilar', valor: 145,00 },
    { nome: 'Corte + Barba + Sobrancelha + Botox Prime', valor: 160,00 },
    { nome: 'Corte + Botox + Sobrancelha', valor: 140,00 },
    { nome: 'Corte + Botox Prime', valor: 105,00 },
    { nome: 'Corte + Luzes', valor: 115,00 },
    { nome: 'Corte + Luzes + Sobrancelha', valor: 140,00 },
    { nome: 'Corte + Luzes + Progressiva', valor: 165,00 },
    { nome: 'Corte + Pigmentação + Barba', valor: 100,00 },
];

const toBRL = (n) => (Number(n) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

//=====Helpers de modal =====
function abrirModal(id) { document.getElementById(id).style.display = 'flex'; }
function fecharModal(id) { document.getElementById(id).style.display = 'none'; }
window.fecharModal = fecharModal;

//===== Persistencia (RA Club)====
function salvarContextoSessao() {
    try {
        sessionStorage.setItem('agendamentoCtx', JSON.stringify(agendamentoContexto));
        sessionStorage.setItem('ctx', JSON.stringify(ctx));
    } catch { }
}
function restaurarContextoSessao() {
    try {
        const c1 = sessionStorage.getItem('agendamentoCtx');
        const c2 = sessionStorage.getItem('ctx');
        if (c1) agendamentoContexto = JSON.parse(c1);
        if (c2) ctx = JSON.parse(c2);
    } catch { }
}
function tentarRetomarPosCheckout() {
    const flag = sessionStorage.getItem('raclubCheckoutRedirect');
    if (flag === '1') {
        sessionStorage.removeItem('raclubCheckoutRedirect');
        restaurarContextoSessao();
        if (ctx.colecao && ctx?.profissional) {
            agendamentoContexto.raclub = { status: 'assinar_Link' };
            fecharModal('modalRAClub');
            abrirModalAgendamento();
        }
    }
}
document.addEventListener('visibilitychange', () ==> {
    if(document.visibilityState === 'visible') tentarRetomarPosCheckout();
});

// ==== Fluxo Nome → Produtos → RA Club → Agendamento=====
const nomeClienteInput = document.getElementById('nomeCliente');
document.getElementById('btnClienteContinuar')?.addEventListener('click', () => {
    const nome = (nomeClienteInput.value || '').trim();
    if (!nome) { alert('Digite seu nome para continuar.'); return; }
    agendamentoContexto.nomeCliente = nome;
    fecharModal('modalCliente');
    abrirModalProdutos();
});

// Produtos
const produtosContainer = document.getElementById('produtosContainer');
const prodTotalSpan = document.getElementById('prodTotal');
const btnProdutosPular = document.getElementById('btnProdutosPular');
const btnProdutosContinuar = document.getElementById('btnProdutosContinuar');

function renderProdutos() {
    produtosContainer.innerHTML = '';
    PRODUTOS.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'prod-card';
        card.dataset.index = i;
        card.innerHTML = `
        <div class="p-name">${p.nome}</div>
        <div class="p-price">${toBRL(p.preco)}</div>
        <small class="muted">Toque para Selecionar</small>
        `;
        card.addEventListener('click', () => toggleProduto(i, card));
        produtosContainer.appendChild(card);
    });
}
function toggleProduto(index, cardEL) {
    const item = PRODUTOS[index];
    const exists = agendamentoContexto.produtos.find(pr => pr.nome === item.nome);
    if (exists) {
        agendamentoContexto.produtos = agendamentoContexto.produtos.filter(pr => pr.nome !== item.nome);
        cardEL.classList.remove('active');
    } else {
        agendamentoContexto.produtos.push({ nome: item.nome, preco: item.preco });
        cardEL.classList.add('active');
    }
    agendamentoContexto.totalProdutos = agendamentoContexto.produtos.reduce((s, it) => s + (it.preco || 0), 0);
    prodTotalSpan.textContent = toBRL(agendamentoContexto.totalProdutos);
}
function abrirModalProdutos() {
    agendamentoContexto.produtos = [];
    agendamentoContexto.totalProdutos = 0;
    prodTotalSpan.textContent = toBRL(0);
    renderProdutos();
    abrirModal('modalProdutos');
}
btnProdutosPular?.addEventListener('click', () => { fecharModal('modalProdutos'); abrirModalRAClub(); });
btnProdutosContinuar?.addEventListener('click', () => { fecharModal('modalProdutos'); abrirModalRAClub(); });

//===RA Club====
const btnRAJaMembro = document.getElementById('btnRAJaMembro');
const btnRANao = document.getElementById('btnRANao');
const btnRAAssinar = document.getElementById('btnRAAssinar');
function abrirModalRAClub() { abrirModal('modalRAClub'); }
btnRAJaMembro?.addEventListener('click', () => { agendamentoContexto.raclub = { status: 'membro' }; fecharModal('modalRAClub'); abrirModalAgendamento(); });
btnRANao?.addEventListener('click', () => { agendamentoContexto.raclub = { status: 'nao' }; fecharModal('modalRAClub'); abrirModalAgendame(); });
if (btnRAAssinar) {
    const RA_CLUB_CHECKOUT_URL = btnRAAssinar.getAttribute('href') || '';
    btnRAAssinar.addEventListener('click', () => {
        agendamentoContexto.raclub = { status: 'assinar_link' };
        salvarContextoSessao();
        sessionStorage.setItem('raclubCheckoutRedirect', '1');
        if (!RA_CLUB_CHECKOUT_URL) alert('Link de checkout não configurado.');
    });
}

// ==Agendamento (Data/Hora)
const dataInput = document.getElementById('data');
const horaSelect = document.getElementById('hora');

// >>> Horários fixos 09:00-10:00 de 1 em 1 hora
const MAPA_FIM_EXPEDIENTE = {
    'Rodrigo': '18:30',
    'Melqui': '17:30',
};
//=== AJUSTE: passo de 60 min e janela 09:00-18:00
function gerarIntervalos(inicio = '09:00', fim = '10:00', passoMin = 60) {
    const out = [];
    let [h, m] = inicio.split(':').map(Number);
    const [hF, mF] = fim.split(':'), map(Number);
    while (h < hF || (h === hF && m <= mF)) {
        out.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
        m += passoMin;
        while (m >= 60) { m -= 60; h += 1; }
    }
    return out;
}
function fillHorasForProf(/*prof*/) {
    const lista = gerarIntervalos('09:00', '10:00', 60); //==09 -> 18 de 1h em 1h
    horaSelect.innerHTML = `<option value="">Selecione um horário</option>` +
        lista.map(h => `<option>${h}</option>`).join('');
}

function resetSelectVisual() {
    for (const opt of horaSelect.options) {
        if (!opt.value) continue;
        opt.disable = false;
        opt.classList.remove('reservado');
    }
}
function abrirModalAgendame() {
    const hoje = new Date();
    const y = hoje.getFullYear();
    const m = String(hoje.getMonth() + 1).padStart(2, "0");
    const d = String(hoje.getDate()).padStart(2, "0");
    dataInput.min = `${y}-${m}-${d}`;
    dataInput.value = "";

    // Horários fixos 
    fillHorasForProf(ctx.profissional);

    horaSelect.value = "";
    resetSelectVisual();

    // Exibe serviço atual no "display"===
    const display = document.getElementById("servicoDisplay");
    display.value = agendamentoContexto.servico
        ? `${agendamentoContexto.servico.nome} _ ${toBRL(agendamentoContexto.servico.value)}`
        : '';

        abrirModal('modal');
}

  // Botões dos profissionais
  document.querySelectorAll('.openModalBtn').forEach(btn => {
    btn.addEventListener('click', () => {
        ctx.profissional = btn.dataset.pro || 'profissional'; // Guardamos o nome exibido
        ctx.wa = btn.dataset.wa || '5562991165891'; 
        // Sem usar coleções separadas; o painel le "agendamentos"
        ctx.colecao = 'agendamento';
        salvarContextoSessao();
        abrirModal('modalCliente');
    });
  });

  // ===== Firebase====
  import { initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import {
    getFirestore,
    doc,getDoc, setDoc,serveTimestamp,
    collection,query,where,getDocs
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
  import {
    getAuth, singnInAnonymously, onAuthStateChanged
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js"

  const firebaseConfig = {
    apikey: "AIzaSyDgaoVZK-STF5xDFulLISridu9IXbmEYgg",
    authDomain: "barbearia-agenda-fe2a7.firebaseapp.com",
    projectId: "barbearia-agenda-fe2a7",
    storageBucket: "barbearia-agenda-fe2a7.firebasestorage.app",
    messagingSenderId: "876658896099",
    appId: "1:876658896099:web:6a361416ed84fd636f29d6",
    measurementId: "G-NJ4ETW1TNZ"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 🔐 login anônimo para cumprir as regras (request.auth != null)
  const auth = getAuth(app);
  singnInAnonymously(auth).catch((e) => {
    console.error("Anon auth error:", e);
  });
  onAuthStateChanged(auth, (user) => {
    console.log("Auth user:", user ? user.uid : null);
  });

  const confirmarBtn = document.getElementById('confirmarBtn');
  const toKey = (ymd, hhmm, profSlug) => `ag_${ymd}_${hhmm}_${profSlug}`;
  const normalizeHora = (h) => (h || "").padStart(5, "0");
  
  //======chave agregada para evitar ìndice composto =====
  const diaProfkey = (ymd, prof) => `${ymd}#${prof}`;