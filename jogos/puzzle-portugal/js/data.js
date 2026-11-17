/* ==========================================================================
   PUZZLE DE PORTUGAL - BASE DE DADOS GEOGRÁFICA
   Distritos (18 + 2 Regiões Autónomas) e Concelhos (308)
   ========================================================================== */

const DISTRICTS_DATA = [
  {
    id: "viana_do_castelo",
    name: "Viana do Castelo",
    region: "Norte (Alto Minho)",
    capital: "Viana do Castelo",
    color: "#2563eb",
    cx: 195,
    cy: 50,
    path: "M 175,25 L 215,25 L 230,55 L 205,75 L 175,65 L 165,45 Z",
    trivia: "Famosa pela Romaria de Nª Senhora da Agonia, o Ouro Filigrana e o Rio Lima."
  },
  {
    id: "braga",
    name: "Braga",
    region: "Norte (Cávado / Ave)",
    capital: "Braga",
    color: "#3b82f6",
    cx: 215,
    cy: 88,
    path: "M 175,65 L 205,75 L 230,55 L 255,75 L 245,105 L 195,110 L 180,95 Z",
    trivia: "Conhecida como a 'Roma Portuguesa' devido ao seu património religioso e ao Bom Jesus."
  },
  {
    id: "vila_real",
    name: "Vila Real",
    region: "Norte (Trás-os-Montes)",
    capital: "Vila Real",
    color: "#60a5fa",
    cx: 285,
    cy: 90,
    path: "M 255,75 L 315,65 L 325,100 L 295,120 L 245,105 Z",
    trivia: "Terra do Palácio de Mateus e porta de entrada para a paisagem vinhateira do Douro."
  },
  {
    id: "braganca",
    name: "Bragança",
    region: "Norte (Alto Trás-os-Montes)",
    capital: "Bragança",
    color: "#0284c7",
    cx: 370,
    cy: 70,
    path: "M 315,65 L 420,35 L 435,90 L 375,120 L 325,100 Z",
    trivia: "Acolhe o Parque Natural de Montesinho e a secular cidadela medieval com o Domus Municipalis."
  },
  {
    id: "porto",
    name: "Porto",
    region: "Norte (Área Metropolitana)",
    capital: "Porto",
    color: "#0284c7",
    cx: 190,
    cy: 130,
    path: "M 170,100 L 245,105 L 250,140 L 195,150 L 165,130 Z",
    trivia: "A Cidade Invicta, mundialmente célebre pelo Vinho do Porto, Ribeira e Ponte D. Luís I."
  },
  {
    id: "aveiro",
    name: "Aveiro",
    region: "Centro (Baixo Vouga)",
    capital: "Aveiro",
    color: "#06b6d4",
    cx: 185,
    cy: 180,
    path: "M 165,150 L 210,150 L 220,195 L 180,210 L 160,185 Z",
    trivia: "A 'Veneza Portuguesa', famosa pelos barcos Moliceiros e pelos doces Ovos Moles."
  },
  {
    id: "viseu",
    name: "Viseu",
    region: "Centro (Dão-Lafões)",
    capital: "Viseu",
    color: "#0891b2",
    cx: 260,
    cy: 165,
    path: "M 250,140 L 295,120 L 325,150 L 285,200 L 220,195 L 210,150 Z",
    trivia: "Cidade de Viriato, berço do pintor Grão Vasco e da prestigiada região vinhateira do Dão."
  },
  {
    id: "guarda",
    name: "Guarda",
    region: "Centro (Beira Interior)",
    capital: "Guarda",
    color: "#14b8a6",
    cx: 345,
    cy: 175,
    path: "M 325,100 L 375,120 L 390,170 L 335,210 L 285,200 L 325,150 Z",
    trivia: "A cidade mais alta de Portugal (1056m), conhecida pelas '5 Fs': Forte, Fria, Farta, Fiel e Formosa."
  },
  {
    id: "coimbra",
    name: "Coimbra",
    region: "Centro (Região de Coimbra)",
    capital: "Coimbra",
    color: "#10b981",
    cx: 200,
    cy: 235,
    path: "M 160,210 L 220,195 L 265,220 L 235,265 L 175,255 L 155,230 Z",
    trivia: "A Cidade dos Estudantes, lar de uma das universidades mais antigas do mundo e do Fado de Coimbra."
  },
  {
    id: "castelo_branco",
    name: "Castelo Branco",
    region: "Centro (Beira Baixa)",
    capital: "Castelo Branco",
    color: "#059669",
    cx: 300,
    cy: 260,
    path: "M 285,200 L 335,210 L 350,265 L 290,305 L 235,265 L 265,220 Z",
    trivia: "Famosa pelos tradicionais Bordados de Castelo Branco e pelo Jardim do Paço Episcopal."
  },
  {
    id: "leiria",
    name: "Leiria",
    region: "Centro (Pinhal Litoral)",
    capital: "Leiria",
    color: "#84cc16",
    cx: 165,
    cy: 305,
    path: "M 155,255 L 205,260 L 210,325 L 150,340 L 140,290 Z",
    trivia: "Terra do Castelo de Leiria, Pinhal do Rei (Pinhal de Leiria) e do Mosteiro da Batalha."
  },
  {
    id: "santarem",
    name: "Santarém",
    region: "Alentejo / Ribatejo",
    capital: "Santarém",
    color: "#eab308",
    cx: 215,
    cy: 350,
    path: "M 205,260 L 290,305 L 270,380 L 195,395 L 210,325 Z",
    trivia: "Capital do Gótico em Portugal, célebre pela tradição ribatejana, campinos e fértil Lezíria."
  },
  {
    id: "lisboa",
    name: "Lisboa",
    region: "Área Metropolitana",
    capital: "Lisboa",
    color: "#f59e0b",
    cx: 155,
    cy: 415,
    path: "M 140,360 L 195,370 L 190,435 L 145,445 L 125,400 Z",
    trivia: "Capital de Portugal, famosa pelas 7 colinas, elétricos amarelos, Pastéis de Belém e Fado."
  },
  {
    id: "portalegre",
    name: "Portalegre",
    region: "Alentejo (Alto Alentejo)",
    capital: "Portalegre",
    color: "#d97706",
    cx: 310,
    cy: 360,
    path: "M 290,305 L 360,335 L 345,410 L 270,380 Z",
    trivia: "Porta de entrada para a Serra de São Mamede, vila de Marvão e tradição das Tapeçarias."
  },
  {
    id: "setubal",
    name: "Setúbal",
    region: "Península de Setúbal",
    capital: "Setúbal",
    color: "#ef4444",
    cx: 175,
    cy: 480,
    path: "M 145,445 L 190,435 L 225,470 L 195,525 L 145,510 Z",
    trivia: "Famosa pela Serra da Arrábida, chocos fritos, praias do Troia e os golfinhos do Sado."
  },
  {
    id: "evora",
    name: "Évora",
    region: "Alentejo (Central)",
    capital: "Évora",
    color: "#dc2626",
    cx: 275,
    cy: 460,
    path: "M 270,380 L 345,410 L 330,490 L 240,505 L 225,470 Z",
    trivia: "Cidade Património Mundial da UNESCO com o Templo Romano de Diana e a Capela dos Ossos."
  },
  {
    id: "beja",
    name: "Beja",
    region: "Alentejo (Baixo Alentejo)",
    capital: "Beja",
    color: "#b91c1c",
    cx: 240,
    cy: 565,
    path: "M 195,525 L 330,505 L 315,610 L 205,620 L 175,555 Z",
    trivia: "Coração do Baixo Alentejo, com a imponente Torre de Menagem do Castelo de Beja e a planície dourada."
  },
  {
    id: "faro",
    name: "Faro",
    region: "Algarve",
    capital: "Faro",
    color: "#f43f5e",
    cx: 235,
    cy: 660,
    path: "M 205,620 L 315,610 L 305,690 L 190,680 Z",
    trivia: "A acolhedora região do Algarve, famosa pelas suas praias de falésias douradas e Ria Formosa."
  },
  {
    id: "acores",
    name: "Região Autónoma dos Açores",
    region: "Arquipélago dos Açores",
    capital: "Ponta Delgada",
    color: "#0d9488",
    cx: 77,
    cy: 92,
    path: "M 25,65 L 130,65 L 130,120 L 25,120 Z",
    trivia: "Paraíso atlântico formado por 9 ilhas vulcânicas de beleza natural única, lagoas e hortênsias."
  },
  {
    id: "madeira",
    name: "Região Autónoma da Madeira",
    region: "Arquipélago da Madeira",
    capital: "Funchal",
    color: "#854d0e",
    cx: 77,
    cy: 172,
    path: "M 25,145 L 130,145 L 130,200 L 25,200 Z",
    trivia: "A 'Pérola do Atlântico', famosa pela Floresta Laurissilva, Levadas, Vinho da Madeira e fogo de artifício."
  }
];

/* Base de Dados de Concelhos de Portugal (Amostra Representativa Organizada por Distrito) */
const CONCELHOS_DATABASE = [
  // Viana do Castelo
  { name: "Viana do Castelo", district: "Viana do Castelo", isCapital: true, trivia: "Concelho foz do Rio Lima e Monte de Santa Luzia." },
  { name: "Ponte de Lima", district: "Viana do Castelo", isCapital: false, trivia: "A vila mais antiga de Portugal, com ponte romana imponente." },
  { name: "Caminha", district: "Viana do Castelo", isCapital: false, trivia: "Fronteiriça com a Galiza no estuário do Minho." },
  { name: "Valença", district: "Viana do Castelo", isCapital: false, trivia: "Famosa pela fortaleza militar sobre o Rio Minho." },
  { name: "Monção", district: "Viana do Castelo", isCapital: false, trivia: "Terra do vinho Alvarinho e da lenda de Deu-la-Deu Martins." },

  // Braga
  { name: "Braga", district: "Braga", isCapital: true, trivia: "Cidade dos Arcebispos com o Bom Jesus do Monte." },
  { name: "Guimarães", district: "Braga", isCapital: false, trivia: "O 'Berço da Nação', onde nasceu D. Afonso Henriques." },
  { name: "Vila Nova de Famalicão", district: "Braga", isCapital: false, trivia: "Importante polo industrial e têxtil do Minho." },
  { name: "Barcelos", district: "Braga", isCapital: false, trivia: "Terra natal do lendário Galo de Barcelos." },
  { name: "Esposende", district: "Braga", isCapital: false, trivia: "Concelho litoral com o Parque Natural do Litoral Norte." },

  // Vila Real
  { name: "Vila Real", district: "Vila Real", isCapital: true, trivia: "Capital transmontana junto à serra do Marão." },
  { name: "Chaves", district: "Vila Real", isCapital: false, trivia: "Cidade termal histórica com a ponte romana de Trajano." },
  { name: "Peso da Régua", district: "Vila Real", isCapital: false, trivia: "Coração da Região Demarcada do Douro." },

  // Bragança
  { name: "Bragança", district: "Bragança", isCapital: true, trivia: "Capital do nordeste transmontano." },
  { name: "Mirandela", district: "Bragança", isCapital: false, trivia: "Conhecida pela alheira e pelas oliveiras." },
  { name: "Miranda do Douro", district: "Bragança", isCapital: false, trivia: "Berço da língua Mirandesa e dos Pauliteiros." },

  // Porto
  { name: "Porto", district: "Porto", isCapital: true, trivia: "Cidade Invicta no estuário do Douro." },
  { name: "Vila Nova de Gaia", district: "Porto", isCapital: false, trivia: "Acolhe as míticas Caves do Vinho do Porto." },
  { name: "Matosinhos", district: "Porto", isCapital: false, trivia: "Famosa pela gastronomia de peixe fresco e porto de leixões." },
  { name: "Maia", district: "Porto", isCapital: false, trivia: "Centro de inovação e polo industrial do Grande Porto." },
  { name: "Póvoa de Varzim", district: "Porto", isCapital: false, trivia: "Tradicional cidade piscatória e estância balnear." },

  // Aveiro
  { name: "Aveiro", district: "Aveiro", isCapital: true, trivia: "Cidade dos canais e da ria." },
  { name: "Santa Maria da Feira", district: "Aveiro", isCapital: false, trivia: "Célebre pelo Castelo medieval e pela Viagem Medieval." },
  { name: "Ílhavo", district: "Aveiro", isCapital: false, trivia: "Terra dos bacalhoeiros e da Porcelana da Vista Alegre." },
  { name: "Espinho", district: "Aveiro", isCapital: false, trivia: "Conhecida pelo casino e vastas praias para surf." },

  // Viseu
  { name: "Viseu", district: "Viseu", isCapital: true, trivia: "Cidade com elevado índice de qualidade de vida." },
  { name: "Lamego", district: "Viseu", isCapital: false, trivia: "Conhecida pelo Santuário de Nª Senhora dos Remédios e bôla de Lamego." },
  { name: "Mangualde", district: "Viseu", isCapital: false, trivia: "Famosa pela pastorícia e queijo Serra da Estrela." },

  // Guarda
  { name: "Guarda", district: "Guarda", isCapital: true, trivia: "A cidade mais alta de Portugal Continental." },
  { name: "Seia", district: "Guarda", isCapital: false, trivia: "Porta de acesso à Serra da Estrela e ao Queijo da Serra." },
  { name: "Gouveia", district: "Guarda", isCapital: false, trivia: "Cidade serrana com rico património natural." },

  // Coimbra
  { name: "Coimbra", district: "Coimbra", isCapital: true, trivia: "Cidade Universitária banhada pelo Rio Mondego." },
  { name: "Figueira da Foz", district: "Coimbra", isCapital: false, trivia: "Rainha das praias de Portugal na foz do Mondego." },
  { name: "Cantanhede", district: "Coimbra", isCapital: false, trivia: "Concelho produtor dos vinhos da Bairrada." },

  // Castelo Branco
  { name: "Castelo Branco", district: "Castelo Branco", isCapital: true, trivia: "Capital da Beira Baixa." },
  { name: "Covilhã", district: "Castelo Branco", isCapital: false, trivia: "Cidade da lã e porta da Serra da Estrela." },
  { name: "Fundão", district: "Castelo Branco", isCapital: false, trivia: "Capital nacional da Cereja." },

  // Leiria
  { name: "Leiria", district: "Leiria", isCapital: true, trivia: "Dominada pelo imponente Castelo no topo da colina." },
  { name: "Caldas da Rainha", district: "Leiria", isCapital: false, trivia: "Famosa pela cerâmica artística de Bordalo Pinheiro e águas termais." },
  { name: "Peniche", district: "Leiria", isCapital: false, trivia: "Capital Mundial do Surf com a praia dos Supertubos e Berlengas." },
  { name: "Nazaré", district: "Leiria", isCapital: false, trivia: "Mundialmente famosa pelas ondas gigantes do Canhão da Nazaré." },
  { name: "Alcobaça", district: "Leiria", isCapital: false, trivia: "Terra do Mosteiro de Alcobaça e do amor de Pedro e Inês." },

  // Santarém
  { name: "Santarém", district: "Santarém", isCapital: true, trivia: "Varanda do Ribatejo com vista panorâmica sobre o Tejo." },
  { name: "Tomar", district: "Santarém", isCapital: false, trivia: "Cidade dos Templários com o Convento de Cristo." },
  { name: "Abrantes", district: "Santarém", isCapital: false, trivia: "Cidade no topo da colina com fortaleza defensiva." },
  { name: "Torres Novas", district: "Santarém", isCapital: false, trivia: "Concelho banhado pelo rio Almonda e com castelo medieval." },

  // Lisboa
  { name: "Lisboa", district: "Lisboa", isCapital: true, trivia: "Capital nacional com os bairros históricos de Alfama e Baixa." },
  { name: "Sintra", district: "Lisboa", isCapital: false, trivia: "Vila romântica com o Palácio da Pena e Quinta da Regaleira." },
  { name: "Cascais", district: "Lisboa", isCapital: false, trivia: "Antiga vila piscatória e nobre refúgio de verão." },
  { name: "Loures", district: "Lisboa", isCapital: false, trivia: "Concelho com forte tradição vinícola de Bucelas." },
  { name: "Amadora", district: "Lisboa", isCapital: false, trivia: "Concelho urbano da Área Metropolitana." },

  // Portalegre
  { name: "Portalegre", district: "Portalegre", isCapital: true, trivia: "Capital do Alto Alentejo." },
  { name: "Elvas", district: "Portalegre", isCapital: false, trivia: "Maior fortificação abaluartada do mundo (UNESCO)." },
  { name: "Campo Maior", district: "Portalegre", isCapital: false, trivia: "Famosa pelas Festas do Povo (ruas floridas em papel)." },

  // Setúbal
  { name: "Setúbal", district: "Setúbal", isCapital: true, trivia: "Banhada pelo Sado e encostada à Serra da Arrábida." },
  { name: "Almada", district: "Setúbal", isCapital: false, trivia: "Onde se ergue o imponente Cristo Rei com vista para Lisboa." },
  { name: "Seixal", district: "Setúbal", isCapital: false, trivia: "Concelho na baía natural do Tejo." },
  { name: "Sesimbra", district: "Setúbal", isCapital: false, trivia: "Vila piscatória no sopé da Arrábida com o Cabo Espichel." },

  // Évora
  { name: "Évora", district: "Évora", isCapital: true, trivia: "Cidade-museu no coração do Alentejo." },
  { name: "Montemor-o-Novo", district: "Évora", isCapital: false, trivia: "Castelo com vista desafogada sobre o montado alentejano." },
  { name: "Estremoz", district: "Évora", isCapital: false, trivia: "Famosa pelo Mármore branco e pelos Bonecos de Estremoz." },

  // Beja
  { name: "Beja", district: "Beja", isCapital: true, trivia: "Cidade histórica com ruínas romanas de Pisões." },
  { name: "Serpa", district: "Beja", isCapital: false, trivia: "Famosa pelo Queijo de Serpa PDO e muralhas históricas." },
  { name: "Odemira", district: "Beja", isCapital: false, trivia: "Maior concelho em extensão territorial de Portugal." },

  // Faro
  { name: "Faro", district: "Faro", isCapital: true, trivia: "Capital algarvia com a Cidade Velha (Vila Adentro)." },
  { name: "Portimão", district: "Faro", isCapital: false, trivia: "Famosa pela Praia da Rocha e sardinhadas." },
  { name: "Albufeira", district: "Faro", isCapital: false, trivia: "Capital do turismo algarvio com belas praias." },
  { name: "Loulé", district: "Faro", isCapital: false, trivia: "Maior concelho do Algarve, famoso pelo Carnaval e Mercado." },
  { name: "Lagos", district: "Faro", isCapital: false, trivia: "Ligada aos Descobrimentos e às falésias da Ponta da Piedade." },

  // Açores
  { name: "Ponta Delgada", district: "Região Autónoma dos Açores", isCapital: true, trivia: "Capital económica na ilha de São Miguel." },
  { name: "Angra do Heroísmo", district: "Região Autónoma dos Açores", isCapital: false, trivia: "Cidade Património Mundial na Ilha Terceira." },
  { name: "Horta", district: "Região Autónoma dos Açores", isCapital: false, trivia: "Famosa pela Marina da Horta na Ilha do Faial." },

  // Madeira
  { name: "Funchal", district: "Região Autónoma da Madeira", isCapital: true, trivia: "Capital madeirense na magnífica baía em anfiteatro." },
  { name: "Machico", district: "Região Autónoma da Madeira", isCapital: false, trivia: "Primeiro local de desembarque dos navegadores portugueses em 1419." },
  { name: "Porto Santo", district: "Região Autónoma da Madeira", isCapital: false, trivia: "Ilha vizinha famosa pela praia de 9 km de areia dourada terapêutica." }
];

/* Base de Dados de Perguntas do Quiz de Geografia */
const QUIZ_QUESTIONS_DATABASE = [
  {
    id: 1,
    question: "Qual é a capital do distrito de Castelo Branco?",
    options: ["Castelo Branco", "Covilhã", "Fundão", "Idanha-a-Nova"],
    correctIndex: 0,
    targetDistrictId: "castelo_branco",
    explanation: "Castelo Branco é a capital da Beira Baixa, famosa pelos seus bordados tradicionais."
  },
  {
    id: 2,
    question: "Clica no mapa ou seleciona o distrito mais a Sul de Portugal Continental (Região do Algarve).",
    options: ["Faro", "Beja", "Setúbal", "Évora"],
    correctIndex: 0,
    targetDistrictId: "faro",
    explanation: "Faro é o distrito mais a Sul do país continental e capital do Algarve."
  },
  {
    id: 3,
    question: "Qual destes distritos NÃO tem fronteira terrestre com Espanha?",
    options: ["Leiria", "Bragança", "Guarda", "Portalegre"],
    correctIndex: 0,
    targetDistrictId: "leiria",
    explanation: "Leiria situa-se na costa litoral centro de Portugal e não faz fronteira com Espanha."
  },
  {
    id: 4,
    question: "Conhecida como a 'Roma Portuguesa', que distrito acolhe o Santuário do Bom Jesus?",
    options: ["Braga", "Viana do Castelo", "Guimarães", "Porto"],
    correctIndex: 0,
    targetDistrictId: "braga",
    explanation: "Braga é célebre pelo seu património religioso e pelo Bom Jesus do Monte."
  },
  {
    id: 5,
    question: "A cidade de Aveiro, famosa pelos Ovos Moles e Moliceiros, é capital de que distrito?",
    options: ["Aveiro", "Coimbra", "Porto", "Viseu"],
    correctIndex: 0,
    targetDistrictId: "aveiro",
    explanation: "Aveiro situa-se no litoral centro e é banhada pelos canais da Ria de Aveiro."
  },
  {
    id: 6,
    question: "Em que distrito fica a vila de Peniche e o arquipélago das Berlengas?",
    options: ["Leiria", "Lisboa", "Setúbal", "Santarém"],
    correctIndex: 0,
    targetDistrictId: "leiria",
    explanation: "Peniche e as ilhas Berlengas integram o distrito de Leiria."
  },
  {
    id: 7,
    question: "Qual é o maior distrito em extensão territorial de Portugal Continental?",
    options: ["Beja", "Évora", "Bragança", "Castelo Branco"],
    correctIndex: 0,
    targetDistrictId: "beja",
    explanation: "Beja é o maior distrito de Portugal em área geográfica no Baixo Alentejo."
  },
  {
    id: 8,
    question: "Onde se localiza a histórica Universidade fundada por D. Dinis em 1290?",
    options: ["Coimbra", "Lisboa", "Évora", "Porto"],
    correctIndex: 0,
    targetDistrictId: "coimbra",
    explanation: "A Universidade de Coimbra é uma das mais antigas do mundo e Património da UNESCO."
  },
  {
    id: 9,
    question: "Em que distrito fica o concelho da Nazaré, famoso pelas ondas gigantes?",
    options: ["Leiria", "Lisboa", "Coimbra", "Setúbal"],
    correctIndex: 0,
    targetDistrictId: "leiria",
    explanation: "A Nazaré situa-se no litoral do distrito de Leiria."
  },
  {
    id: 10,
    question: "Qual é o distrito associado à região vinhateira do Dão e à cidade de Viriato?",
    options: ["Viseu", "Guarda", "Vila Real", "Coimbra"],
    correctIndex: 0,
    targetDistrictId: "viseu",
    explanation: "Viseu situa-se no centro norte e é o coração da região vinhateira do Dão."
  },
  {
    id: 11,
    question: "Quantas ilhas formam o Arquipélago da Região Autónoma dos Açores?",
    options: ["9 Ilhas", "7 Ilhas", "12 Ilhas", "5 Ilhas"],
    correctIndex: 0,
    targetDistrictId: "acores",
    explanation: "Os Açores são constituídos por 9 ilhas de origem vulcânica divididas em 3 grupos."
  },
  {
    id: 12,
    question: "Qual é o distrito onde se localiza o Palácio Nacional da Pena e a Quinta da Regaleira (Sintra)?",
    options: ["Lisboa", "Setúbal", "Santarém", "Leiria"],
    correctIndex: 0,
    targetDistrictId: "lisboa",
    explanation: "O concelho de Sintra faz parte do distrito de Lisboa."
  }
];

