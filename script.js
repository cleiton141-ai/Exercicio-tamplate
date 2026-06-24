//==== Navegação Mobile & smooth===//
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click',() => {
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
    window.scrollTo({top: t.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    navLinks?.classList.remove('active');
  });  
});

//===Estado====
let ctx = { profissional: null,wa: null, colecao:'agendamentos' }; // <==Força agendamentos
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
    { nome:"Pomada Líquida DA Force MEN", preco:39,99 },
    { nome:"Leave-in", preco:39,99},
    { nome:"Tônico Capilar Dom Pelo", preco: 49,99},
    { nome:"Balm Para Barba", preço: 39,99},
    { nome:"Pomada Modeladora - Efeito Teia", preço:3 4,99}, 
    { nome:"Pomada modeladora - Efeito seco", preço: 34,99},       
];

// >>> Catálogo de Serviços Mostrado no modal
const SERVICOS = [
    { nome: '', valor: },
]