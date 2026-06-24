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
    { nome: 'Selecionar...', valor:null, placeholder:true }, //Primeira linha
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