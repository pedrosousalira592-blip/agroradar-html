window.AgroRadarData = {
  site: {
    name: "AgroRadar",
    tagline: "informação prática para o agro em movimento",
    mission:
      "Portal editorial com foco no Norte do Brasil, leitura rápida, contexto regional e decisões mais bem informadas.",
    defaultRegion: "para"
  },
  sources: {
    usdbrl: {
      name: "Banco Central do Brasil (PTAX)",
      url: "https://opendata.bcb.gov.br/pt_PT/dataset/american-dollar-bid-and-offer-daily-rates",
      mode: "live",
      note: "Cotação oficial diária do dólar comercial, com atualização do próprio Banco Central."
    },
    weather: {
      name: "Open-Meteo",
      url: "https://open-meteo.com/en/docs",
      mode: "live",
      note: "Condições atuais e previsão com consulta por coordenadas, sem chave de API."
    },
    editorial: {
      name: "Monitor editorial AgroRadar",
      url: "",
      mode: "manual",
      note: "Indicadores regionais temporários até a integração com um feed local próprio."
    }
  },
  categories: [
    {
      slug: "mercado",
      name: "Mercado",
      description: "Preço, câmbio, prêmio, compra e venda no ritmo do agro."
    },
    {
      slug: "clima",
      name: "Clima",
      description: "Janela operacional, chuva, solo e risco para cada praça."
    },
    {
      slug: "pecuaria",
      name: "Pecuária",
      description: "Escala, arroba, nutrição e manejo com leitura regional."
    },
    {
      slug: "logistica",
      name: "Logística",
      description: "Portos, corredores, frete e gargalos que mexem com margem."
    },
    {
      slug: "politica",
      name: "Política",
      description: "Crédito, seguro, infraestrutura e decisões públicas para o campo."
    },
    {
      slug: "tecnologia",
      name: "Tecnologia",
      description: "Ferramentas, rastreabilidade e eficiência na operação."
    }
  ],
  regions: [
    {
      id: "para",
      name: "Pará",
      selector: "Pará / Barcarena e Santarém",
      weather: {
        city: "Belém (PA)",
        latitude: -1.4558,
        longitude: -48.4902
      },
      localNote:
        "Praça com peso logístico e exportador, boa para monitorar corredor Norte, prêmio de porto e ritmo de embarque.",
      localHighlightSlug: "corredor-norte-soja-frete-barcarena",
      marketBoard: [
        {
          id: "usdbrl",
          label: "USD/BRL PTAX",
          type: "live-usd"
        },
        {
          id: "porto-barcarena",
          label: "Barcarena",
          value: "embarque acelerado",
          change: "fluxo forte no corredor Norte",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T09:05:00-03:00"
        },
        {
          id: "santarem",
          label: "Santarém",
          value: "prêmio firme",
          change: "disputa por origem disponível",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T08:50:00-03:00"
        }
      ]
    },
    {
      id: "tocantins",
      name: "Tocantins",
      selector: "Tocantins / Palmas e corredor Norte",
      weather: {
        city: "Palmas (TO)",
        latitude: -10.184,
        longitude: -48.3336
      },
      localNote:
        "Praça sensível a clima de transição, logística rodoviária e custo financeiro para a segunda safra.",
      localHighlightSlug: "credito-tocantins-seguro-rural",
      marketBoard: [
        {
          id: "usdbrl",
          label: "USD/BRL PTAX",
          type: "live-usd"
        },
        {
          id: "milho-to",
          label: "Milho no balcão",
          value: "compra seletiva",
          change: "negócio travado em lotes curtos",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T08:45:00-03:00"
        },
        {
          id: "frete-to",
          label: "Frete interestadual",
          value: "pressão moderada",
          change: "disponibilidade irregular de caminhões",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T08:30:00-03:00"
        }
      ]
    },
    {
      id: "rondonia",
      name: "Rondônia",
      selector: "Rondônia / Porto Velho e interior",
      weather: {
        city: "Porto Velho (RO)",
        latitude: -8.7608,
        longitude: -63.8999
      },
      localNote:
        "Pecuária, café robusta e tecnologia de campo ganham peso na leitura diária da praça.",
      localHighlightSlug: "boi-rondonia-escalas-curtas",
      marketBoard: [
        {
          id: "usdbrl",
          label: "USD/BRL PTAX",
          type: "live-usd"
        },
        {
          id: "boi-ro",
          label: "Escalas frigoríficas",
          value: "mais curtas",
          change: "compra mais tensa no interior",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T09:00:00-03:00"
        },
        {
          id: "robusta-ro",
          label: "Café robusta",
          value: "oferta seletiva",
          change: "produtor busca margem melhor",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T08:20:00-03:00"
        }
      ]
    },
    {
      id: "amazonas",
      name: "Amazonas",
      selector: "Amazonas / Manaus e polos locais",
      weather: {
        city: "Manaus (AM)",
        latitude: -3.119,
        longitude: -60.0217
      },
      localNote:
        "Piscicultura, abastecimento regional e clima úmido criam uma dinâmica própria de decisão.",
      localHighlightSlug: "amazonas-piscicultura-racao-custos",
      marketBoard: [
        {
          id: "usdbrl",
          label: "USD/BRL PTAX",
          type: "live-usd"
        },
        {
          id: "racao-am",
          label: "Ração aquícola",
          value: "custo pressionado",
          change: "frete e insumo ainda pesam",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T08:10:00-03:00"
        },
        {
          id: "abastecimento-am",
          label: "Abastecimento local",
          value: "ritmo estável",
          change: "mercado reage à chuva e logística",
          source: "editorial",
          temporary: true,
          updatedAt: "2026-04-15T07:55:00-03:00"
        }
      ]
    }
  ],
  homepage: {
    heroSlug: "corredor-norte-soja-frete-barcarena",
    highlightSlugs: [
      "chuvas-sul-para-janela-milho",
      "porto-santarem-premio-soja",
      "boi-rondonia-escalas-curtas",
      "rondonia-rastreabilidade-rebanho"
    ],
    mostReadSlugs: [
      "corredor-norte-soja-frete-barcarena",
      "credito-tocantins-seguro-rural",
      "boi-rondonia-escalas-curtas",
      "amazonas-piscicultura-racao-custos",
      "cacau-transamazonica-industria-local"
    ],
    latestSlugs: [
      "porto-santarem-premio-soja",
      "credito-tocantins-seguro-rural",
      "chuvas-sul-para-janela-milho",
      "acre-cafe-robusta-rota-exportacao",
      "bioinsumos-cooperativas-para"
    ],
    briefing: [
      {
        label: "Clima",
        text: "Sul do Pará e Tocantins seguem no radar por causa da janela operacional da segunda safra."
      },
      {
        label: "Mercado",
        text: "Câmbio, prêmio e logística continuam mexendo com a comercialização da soja no corredor Norte."
      },
      {
        label: "Região",
        text: "O foco editorial continua no Norte, com adaptação prática de praça para clima e utilidade local."
      }
    ],
    agenda: [
      {
        time: "09:30",
        text: "Radar de câmbio e reação do dólar oficial na abertura do dia."
      },
      {
        time: "11:00",
        text: "Atualização regional de compra e venda para soja, boi e frete."
      },
      {
        time: "16:00",
        text: "Fechamento com clima, fluxo logístico e leitura de margem."
      }
    ]
  },
  articles: [
    {
      slug: "corredor-norte-soja-frete-barcarena",
      category: "mercado",
      region: "para",
      kicker: "Mercado & Logística",
      title: "Corredor Norte ganha tração com soja represada e reabre disputa por frete entre Miritituba e Barcarena",
      deck:
        "Tradings, cooperativas e transportadores relatam nova pressão sobre o frete à medida que o fluxo de soja se reorganiza no Norte.",
      summary:
        "O corredor Barcarena-Miritituba voltou ao centro da operação comercial, com produtor mais seletivo, prêmio firme e disputa logística em lotes curtos.",
      location: "Belém (PA)",
      readTime: "6 min",
      updatedAt: "2026-04-15T09:20:00-03:00",
      highlights: [
        "O prêmio local segue mais firme nos portos do Arco Norte.",
        "Transportadores relatam disponibilidade irregular de caminhões.",
        "Produtor segura parte do volume esperando melhor relação entre prêmio e câmbio."
      ],
      body: [
        "A recomposição do fluxo de soja no Norte voltou a mexer com a logística regional. Nas últimas rodadas de negócio, operadores do corredor Barcarena-Miritituba passaram a relatar uma concorrência mais clara por frete, especialmente em janelas curtas de embarque.",
        "A avaliação de agentes locais é que o produtor segue vendendo com mais disciplina. Em vez de acelerar grandes volumes, prefere negociar lotes menores e monitorar câmbio, prêmio e custo de entrega ao mesmo tempo.",
        "Esse comportamento pressiona tradings e cerealistas a recalibrar origem, programação e margem. Quando o corredor Norte volta a ganhar tração, a diferença entre uma operação viável e uma operação apertada passa diretamente por logística e timing.",
        "O efeito prático é uma praça mais sensível a notícia, clima e disponibilidade de transporte. Para quem acompanha mercado no Norte, o corredor deixa de ser apenas uma alternativa e volta a funcionar como peça central da estratégia comercial."
      ],
      related: [
        "porto-santarem-premio-soja",
        "chuvas-sul-para-janela-milho",
        "credito-tocantins-seguro-rural"
      ]
    },
    {
      slug: "chuvas-sul-para-janela-milho",
      category: "clima",
      region: "para",
      kicker: "Clima",
      title: "Sul do Pará ganha nova janela de umidade e melhora a leitura operacional para milho e manejo de solo",
      deck:
        "Modelos apontam chuva distribuída e redução do estresse hídrico em áreas que vinham operando com margem curta.",
      summary:
        "A nova rodada de chuva não resolve tudo, mas devolve previsibilidade para quem precisava reorganizar manejo e pulverização.",
      location: "Redenção (PA)",
      readTime: "4 min",
      updatedAt: "2026-04-15T08:40:00-03:00",
      highlights: [
        "A umidade do solo melhora de forma gradual em pontos mais pressionados.",
        "A janela de pulverização segue curta nas tardes com vento mais seco.",
        "A regularidade da chuva ainda é mais importante que o volume isolado."
      ],
      body: [
        "A leitura climática para o sul do Pará melhorou nas últimas atualizações. A distribuição da chuva, mesmo sem volumes extremos, devolve parte da previsibilidade que o manejo vinha perdendo nos últimos dias.",
        "Produtores consultados pelo AgroRadar indicam que o ganho mais imediato está na organização da operação. Com mais umidade e menor risco de estresse hídrico abrupto, o planejamento deixa de ser feito no improviso.",
        "A recomendação técnica continua sendo observar a janela útil dentro do dia. Em algumas áreas, vento e temperatura seguem limitando pulverização no período da tarde, o que exige operação mais precisa.",
        "O cenário ainda pede cautela, mas a percepção local é que a semana começou menos defensiva e mais favorável para manter o calendário sob controle."
      ],
      related: [
        "corredor-norte-soja-frete-barcarena",
        "bioinsumos-cooperativas-para",
        "credito-tocantins-seguro-rural"
      ]
    },
    {
      slug: "porto-santarem-premio-soja",
      category: "mercado",
      region: "para",
      kicker: "Mercado",
      title: "Santarém volta ao radar com prêmio mais firme e origem seletiva para soja disponível",
      deck:
        "O apetite por origem no porto cresce, mas a negociação segue pontual e depende de margem logística bem calibrada.",
      summary:
        "O prêmio melhora, porém não basta sozinho: produtor continua filtrando oportunidades de venda.",
      location: "Santarém (PA)",
      readTime: "5 min",
      updatedAt: "2026-04-15T09:00:00-03:00",
      highlights: [
        "A praça reage mais rápido quando câmbio e prêmio andam juntos.",
        "Origem disponível continua disputada entre operadores.",
        "Volume travado limita a velocidade da programação."
      ],
      body: [
        "Santarém reapareceu no radar comercial com uma combinação mais construtiva entre prêmio e necessidade de origem. Na prática, isso não significa uma enxurrada de negócios, mas amplia a disposição dos agentes em conversar.",
        "O produtor continua seletivo. O ritmo de venda depende do resultado líquido da operação e não apenas de uma melhora isolada no porto, o que mantém o mercado em compasso cuidadoso.",
        "Na avaliação de operadores, a praça tem respondido melhor quando prêmio, logística e câmbio evoluem na mesma direção. Quando um desses pilares perde força, o avanço comercial volta a travar.",
        "Por isso, a leitura de Santarém continua sendo menos sobre euforia e mais sobre sensibilidade operacional. Pequenas mudanças podem redefinir a atratividade do negócio em poucas horas."
      ],
      related: [
        "corredor-norte-soja-frete-barcarena",
        "acre-cafe-robusta-rota-exportacao",
        "cacau-transamazonica-industria-local"
      ]
    },
    {
      slug: "boi-rondonia-escalas-curtas",
      category: "pecuaria",
      region: "rondonia",
      kicker: "Pecuária",
      title: "Escalas mais curtas em Rondônia deixam frigoríficos mais sensíveis ao ritmo de oferta",
      deck:
        "A praça opera com compra mais atenta, retenção moderada e necessidade maior de cobertura rápida.",
      summary:
        "O mercado do boi em Rondônia ganha firmeza quando a oferta some da tela e as escalas encurtam.",
      location: "Porto Velho (RO)",
      readTime: "5 min",
      updatedAt: "2026-04-15T08:55:00-03:00",
      highlights: [
        "A escala curta não garante alta linear, mas reduz o conforto da indústria.",
        "Oferta de boiada continua seletiva em algumas praças.",
        "A compra tende a reagir rápido quando surgem lotes prontos."
      ],
      body: [
        "O boi gordo em Rondônia voltou a operar com leitura mais firme por causa do encurtamento das escalas. Isso muda o tom da negociação, porque a indústria passa a precisar de cobertura em menos tempo.",
        "Na ponta do produtor, o movimento é de retenção moderada. Ninguém fala em euforia, mas o pecuarista percebe que pode ser mais seletivo quando a oferta pronta não aparece com facilidade.",
        "Esse ambiente torna a praça mais volátil. Um lote relevante pode aliviar momentaneamente a compra, mas a ausência de volume constante mantém o mercado sensível e com reação rápida.",
        "Para o pecuarista, a mensagem é clara: escalas mais curtas não resolvem sozinhas a margem, mas ajudam a devolver poder de negociação."
      ],
      related: [
        "rondonia-rastreabilidade-rebanho",
        "amazonas-piscicultura-racao-custos",
        "credito-tocantins-seguro-rural"
      ]
    },
    {
      slug: "credito-tocantins-seguro-rural",
      category: "politica",
      region: "tocantins",
      kicker: "Política",
      title: "Crédito e seguro rural voltam ao centro da conversa no Tocantins com produtor mais cauteloso",
      deck:
        "A busca por previsibilidade financeira cresce num ambiente de custos altos e compra mais seletiva.",
      summary:
        "No Tocantins, a decisão financeira pesa tanto quanto a operacional na preparação da próxima safra.",
      location: "Palmas (TO)",
      readTime: "4 min",
      updatedAt: "2026-04-15T08:25:00-03:00",
      highlights: [
        "Produtor quer previsibilidade e menos exposição na compra antecipada.",
        "Seguro rural aparece como ferramenta de estabilidade, não só de emergência.",
        "O crédito mais seletivo pressiona o planejamento de caixa."
      ],
      body: [
        "A conversa sobre crédito e seguro rural voltou a ganhar força no Tocantins porque o produtor entrou em modo mais conservador. A prioridade deixou de ser apenas garantir volume e passou a ser garantir margem com previsibilidade.",
        "Esse movimento é reforçado por um cenário de custos ainda pressionados e por uma percepção mais dura do risco financeiro. Quem compra cedo quer segurança maior; quem espera, sabe que pode perder janela.",
        "Cooperativas e consultorias relatam que o seguro rural voltou a ser discutido como peça de estratégia, não apenas como resposta a perda. Isso muda a forma como o planejamento da próxima temporada é construído.",
        "O efeito para o portal é claro: cobertura de política no agro precisa conversar com a rotina da fazenda, e não ficar isolada de mercado e clima."
      ],
      related: [
        "chuvas-sul-para-janela-milho",
        "corredor-norte-soja-frete-barcarena",
        "bioinsumos-cooperativas-para"
      ]
    },
    {
      slug: "rondonia-rastreabilidade-rebanho",
      category: "tecnologia",
      region: "rondonia",
      kicker: "Tecnologia",
      title: "Rastreabilidade de rebanho avança em Rondônia como resposta a mercado mais exigente",
      deck:
        "Ferramentas simples de gestão e coleta de dados começam a sair do discurso e entrar na rotina da fazenda.",
      summary:
        "A tecnologia avança quando resolve venda, manejo e confiança comercial ao mesmo tempo.",
      location: "Ji-Paraná (RO)",
      readTime: "4 min",
      updatedAt: "2026-04-15T07:50:00-03:00",
      highlights: [
        "A adoção cresce quando o sistema é simples e conversa com a rotina de campo.",
        "Rastreabilidade vira argumento comercial e de gestão.",
        "O ganho não está só na exigência externa, mas na operação diária."
      ],
      body: [
        "Em Rondônia, a discussão sobre rastreabilidade deixou de ser apenas institucional e começou a ganhar aplicação prática em fazendas que querem vender melhor e gerenciar melhor.",
        "O que destrava essa mudança não é tecnologia complexa, e sim ferramenta que caiba no ritmo da operação. Quando a coleta de informação ajuda no manejo e na negociação, a adoção acelera.",
        "A praça também começa a perceber que rastreabilidade pode fortalecer confiança comercial em cadeias mais exigentes. Isso vale para venda, para relacionamento com indústria e para organização interna da fazenda.",
        "O avanço ainda é desigual, mas a direção é clara: tecnologia só cria tração real quando entra na rotina como ferramenta útil."
      ],
      related: [
        "boi-rondonia-escalas-curtas",
        "bioinsumos-cooperativas-para",
        "amazonas-piscicultura-racao-custos"
      ]
    },
    {
      slug: "amazonas-piscicultura-racao-custos",
      category: "pecuaria",
      region: "amazonas",
      kicker: "Pecuária",
      title: "Piscicultura no Amazonas recalcula margem com ração cara e logística ainda irregular",
      deck:
        "O produtor regional busca eficiência operacional enquanto tenta proteger caixa diante do custo mais alto.",
      summary:
        "A pressão da ração continua sendo o ponto central para a sustentabilidade econômica da atividade.",
      location: "Manaus (AM)",
      readTime: "4 min",
      updatedAt: "2026-04-15T08:05:00-03:00",
      highlights: [
        "Ração segue como principal componente de pressão sobre margem.",
        "Frete e abastecimento ainda influenciam fortemente o custo final.",
        "O produtor responde com manejo mais fino e compras mais cuidadosas."
      ],
      body: [
        "A piscicultura no Amazonas continua operando sob uma equação apertada, principalmente por causa do custo da ração. O produtor precisa equilibrar eficiência de manejo com um caixa mais pressionado.",
        "A logística regional amplia essa dificuldade. Quando abastecimento e frete oscilam, o custo final da operação sobe mais rápido e tira previsibilidade da decisão.",
        "Em resposta, produtores têm revisado calendário de compra, rotina de trato e leitura de conversão alimentar. É uma tentativa de recuperar margem onde ainda existe controle operacional.",
        "No portal, esse tipo de cobertura é importante porque mostra que o Norte não é uma pauta única. Cada praça responde a pressões muito próprias e precisa de uma leitura editorial adequada."
      ],
      related: [
        "boi-rondonia-escalas-curtas",
        "rondonia-rastreabilidade-rebanho",
        "credito-tocantins-seguro-rural"
      ]
    },
    {
      slug: "acre-cafe-robusta-rota-exportacao",
      category: "mercado",
      region: "rondonia",
      kicker: "Mercado",
      title: "Café robusta da fronteira Norte busca nova rota de venda com produtor mais atento ao câmbio",
      deck:
        "A leitura de mercado incorpora logística, câmbio e oportunidade comercial em vez de apenas preço nominal.",
      summary:
        "O robusta da região ganha interesse, mas a decisão comercial segue muito dependente do custo para escoar.",
      location: "Rio Branco (AC)",
      readTime: "4 min",
      updatedAt: "2026-04-15T07:35:00-03:00",
      highlights: [
        "O câmbio influencia a conversa comercial mais do que no passado recente.",
        "Logística ainda define o ritmo da venda.",
        "Produtor observa oportunidade, mas continua seletivo."
      ],
      body: [
        "A fronteira Norte do café robusta volta a ser observada com mais atenção por agentes que enxergam espaço para novas rotas de venda. Mesmo assim, a operação continua sendo filtrada por custo logístico e câmbio.",
        "Na prática, o produtor olha menos para o preço isolado e mais para o resultado final. Quando o escoamento pesa demais, a atratividade do negócio diminui rapidamente.",
        "Esse comportamento aproxima o café da lógica já vista em outras cadeias regionais: vender bem depende de olhar o conjunto da operação e não só a cotação do dia.",
        "Para o AgroRadar, essa pauta ajuda a mostrar um Norte mais diverso, com cadeias que exigem leitura própria e cobertura especializada."
      ],
      related: [
        "porto-santarem-premio-soja",
        "corredor-norte-soja-frete-barcarena",
        "rondonia-rastreabilidade-rebanho"
      ]
    },
    {
      slug: "cacau-transamazonica-industria-local",
      category: "mercado",
      region: "para",
      kicker: "Mercado",
      title: "Cacau da Transamazônica ganha tração com indústria local e produtor mais atento à qualidade",
      deck:
        "A origem regional tenta capturar mais valor combinando padronização, relacionamento comercial e identidade de praça.",
      summary:
        "A competitividade cresce quando qualidade e organização comercial avançam juntas.",
      location: "Altamira (PA)",
      readTime: "4 min",
      updatedAt: "2026-04-15T07:20:00-03:00",
      highlights: [
        "A qualidade ganha peso direto na remuneração.",
        "Indústria local ajuda a encurtar a distância entre origem e comprador.",
        "O mercado premia organização, não apenas volume."
      ],
      body: [
        "O cacau da Transamazônica voltou a chamar atenção porque a praça começa a construir uma relação comercial mais sofisticada entre qualidade, origem e indústria local.",
        "Em vez de depender apenas de volume, parte dos produtores já trabalha para capturar valor na consistência da entrega e na padronização do produto. Isso fortalece a posição de quem vende.",
        "A indústria regional ajuda nesse processo porque aproxima origem e comprador. Quanto menor a distância operacional, maior a chance de criar uma cadeia mais estável e menos oportunista.",
        "Esse tipo de movimento interessa ao AgroRadar porque mostra uma agenda de desenvolvimento regional conectada à prática do campo."
      ],
      related: [
        "porto-santarem-premio-soja",
        "bioinsumos-cooperativas-para",
        "chuvas-sul-para-janela-milho"
      ]
    },
    {
      slug: "bioinsumos-cooperativas-para",
      category: "tecnologia",
      region: "para",
      kicker: "Tecnologia",
      title: "Cooperativas do Pará ampliam teste de bioinsumos para reduzir dependência de compra de última hora",
      deck:
        "A adoção ainda é seletiva, mas cresce nas fazendas que querem previsibilidade maior de custo e manejo.",
      summary:
        "Bioinsumo ganha espaço quando entra como ferramenta de planejamento e não como moda.",
      location: "Castanhal (PA)",
      readTime: "4 min",
      updatedAt: "2026-04-15T07:10:00-03:00",
      highlights: [
        "A decisão passa por custo, adaptação local e suporte técnico.",
        "Cooperativas funcionam como ponte para reduzir risco de adoção.",
        "O foco está em previsibilidade operacional."
      ],
      body: [
        "O avanço dos bioinsumos em cooperativas do Pará está menos ligado a discurso e mais a necessidade de previsibilidade. Em um ambiente de compra seletiva, toda solução que reduza dependência de última hora entra no radar.",
        "Ainda não há adoção homogênea. O ritmo depende de suporte técnico, adaptação local e leitura correta de custo. Mesmo assim, a percepção é que o tema deixou de ser periférico.",
        "Quando a cooperativa assume parte da curadoria técnica, o produtor enxerga menos risco de teste e mais chance de incorporar a ferramenta no planejamento.",
        "O efeito editorial é relevante: tecnologia no agro regional precisa ser traduzida em decisão prática, e não apresentada como vitrine abstrata."
      ],
      related: [
        "chuvas-sul-para-janela-milho",
        "cacau-transamazonica-industria-local",
        "rondonia-rastreabilidade-rebanho"
      ]
    }
  ]
};
