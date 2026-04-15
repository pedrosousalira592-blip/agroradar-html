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
      mode: "live"
    },
    weather: {
      name: "Open-Meteo",
      url: "https://open-meteo.com/en/docs",
      mode: "live"
    },
    editorial: {
      name: "Monitor editorial AgroRadar",
      url: "",
      mode: "manual"
    }
  },
  homepage: {
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
          change: "fluxo forte no corredor Norte"
        },
        {
          id: "santarem",
          label: "Santarém",
          value: "prêmio firme",
          change: "disputa por origem disponível"
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
          change: "negócio travado em lotes curtos"
        },
        {
          id: "frete-to",
          label: "Frete interestadual",
          value: "pressão moderada",
          change: "disponibilidade irregular de caminhões"
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
          change: "compra mais tensa no interior"
        },
        {
          id: "robusta-ro",
          label: "Café robusta",
          value: "oferta seletiva",
          change: "produtor busca margem melhor"
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
          change: "frete e insumo ainda pesam"
        },
        {
          id: "abastecimento-am",
          label: "Abastecimento local",
          value: "ritmo estável",
          change: "mercado reage à chuva e logística"
        }
      ]
    }
  ]
};
