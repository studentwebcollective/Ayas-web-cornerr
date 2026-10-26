export interface PortfolioWebsite {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
}

export interface FormInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  businessName?: string;
  category: string;
  message: string;
  status: 'nieuw' | 'behandeld';
}

export interface SiteData {
  logoImage: string; // Base64 or URL uploaded by user
  logoScale: number; // 50 to 200 (zoom level in percentage)
  logoOffsetX: number; // optional offset
  logoOffsetY: number;
  brandName: string;
  subtitle: string;
  email: string;

  // Pages content
  home: {
    heroBigTitle: string;
    motto: string;
    introHeading: string;
    introText: string;
    priceTitle: string;
    priceAmount: string;
    priceDescription: string;
    extraNote: string;
  };

  about: {
    title: string;
    story: string;
    reasonsText: string;
  };

  warranty: {
    title: string;
    threeMonthsText: string;
    afterThreeMonthsText: string;
    designChangeText: string;
    pricingBreakdown: string;
  };

  howToOrder: {
    title: string;
    content: string;
  };

  contact: {
    title: string;
    text: string;
  };

  disclaimer: {
    title: string;
    content: string;
  };

  websites: PortfolioWebsite[];
  inquiries: FormInquiry[];
}

export const defaultSiteData: SiteData = {
  logoImage: '',
  logoScale: 100,
  logoOffsetX: 0,
  logoOffsetY: 0,
  brandName: "Aya's Web Corner",
  subtitle: "Based in Rotterdam · Est. 06 2026",
  email: "aya.webcorner@gmail.com",

  home: {
    heroBigTitle: "Welkom bij Aya’s Web Corner",
    motto: "Eenvoudig, stijlvol & betaalbaar online voor ondernemers.",
    introHeading: "Lieve ondernemers en klanten,",
    introText: "Aangezien ik nog een beginnende student-programmeur ben in Rotterdam, zijn mijn prijzen heel laag en doe ik voor nu alleen one-page websites.",
    priceTitle: "One-Page (Landingspagina)",
    priceAmount: "€79",
    priceDescription: "Een heldere pagina waar bezoekers eenvoudig doorheen scrollen. Ideaal om snel en voordelig online te zijn met de basis: wie je bent, wat je doet en hoe ze contact opnemen. Ook perfect te gebruiken als productdisplay waarin klanten al je producten of diensten in één oogopslag zien.",
    extraNote: "Vaste prijs van €79 · Geen verborgen kosten · Inclusief 3 maanden garantie."
  },

  about: {
    title: "Over Mij",
    story: "Hoi, ik ben Aya! Ik ben een student software development in Rotterdam en ik zie een grote gap bij kleine ondernemers die alles via social media (Instagram DM's of TikTok) regelen, in plaats van een overzichtelijke website te hebben waar klanten in één oogopslag al hun producten kunnen zien, een afspraak kunnen inplannen voor een service of meer te weten kunnen komen over wie je bent en wat jouw onderneming inhoudt.",
    reasonsText: "Doordat ik nog een student ben, houd ik mijn prijzen heel laag (€79). Ik vind dat een online presence voor een bedrijf ook niet te veel moet kosten, vooral voor jonge ondernemers die niet een paar honderd euro over kunnen houden voor een website. Omdat ik een student ben, wil ik graag wat ik heb geleerd direct kunnen toepassen op het echte leven. Dit is de reden waarom mijn prijzen zo laag zijn!"
  },

  warranty: {
    title: "Garantie & Tarieven",
    threeMonthsText: "Elke website heeft standaard 3 maanden garantie. Mocht het zo zijn dat de website opeens het niet meer doet, stopt met werken of dat het heel erg lagt, dan zal ik het gratis voor u fixen.",
    afterThreeMonthsText: "Na de 3 maanden garantieperiode heb ik een klein tarief van €10 tot €30 om eventuele technische problemen te fixen.",
    designChangeText: "Stel je vindt het design na een tijdje niet meer leuk of je hebt een nieuw logo en wilt graag de stijl van je website veranderen: dat valt niet onder de garantie zolang de website nog gewoon prima werkt.",
    pricingBreakdown: "In het geval van een designverandering kost het tussen de €20 en €60, afhankelijk van wat je wilt aanpassen:\n• Alleen het logo en kleurenpalet aanpassen: €20\n• Meerdere secties of stijl aanpassen: €35\n• Een hele rebrand (bijna een gloednieuwe website): €60"
  },

  howToOrder: {
    title: "Hoe Bestellen Werkt",
    content: "Hieronder kun je jouw eigen stappen en uitleg zetten over hoe klanten bij jou kunnen bestellen.\n\nStap 1: Vul de vragenlijst / het aanvraagformulier in op deze website met wat voor bedrijf je hebt.\nStap 2: Ik neem per e-mail contact met je op voor je logo, foto's en je prijslijst of diensten.\nStap 3: Ik bouw jouw website binnen 3 tot 5 dagen en stuur je een preview link.\nStap 4: We passen jouw feedback aan en zetten de website live op je eigen domein!\n\n(Tip: Je kunt deze tekst helemaal zelf aanpassen in het beheerpaneel!)"
  },

  contact: {
    title: "Aanvraag & Vragenlijst",
    text: "Wil je een website laten maken voor €79 of heb je een vraag? Vul het inschrijfformulier hieronder in. Ik ontvang je aanvraag direct in mijn beheerpaneel en reageer zo snel mogelijk per e-mail!"
  },

  disclaimer: {
    title: "Disclaimer & Juridische Informatie",
    content: "1. Aansprakelijkheid & Aangeleverd Materiaal: De opdrachtgever (klant) is te allen tijde zelf verantwoordelijk voor alle aangeleverde teksten, foto's, prijzen en logo's, en garandeert dat deze geen inbreuk maken op auteursrechten van derden. Aya's Web Corner is nimmer aansprakelijk voor claims betreffende door de klant aangeleverde content. De totale aansprakelijkheid van Aya's Web Corner is te allen tijde beperkt tot maximaal het factuurbedrag van de website (€79).\n\n2. Garantievoorwaarden: De gratis 3 maanden garantie geldt uitsluitend voor de originele, door mij opgeleverde code. Zodra de klant of een derde partij zelf wijzigingen aanbrengt in de broncode vervalt de gratis garantie. Designwijzigingen vallen zoals vermeld buiten de gratis garantie.\n\n3. Hosting & Domein: Webhosting en de domeinnaam worden op naam en voor rekening van de klant zelf afgesloten. Aya's Web Corner is geen hostingprovider en niet aansprakelijk voor eventuele downtime of storingen bij externe hostingpartijen.\n\n4. Studentenstatus: Werkzaamheden worden verricht als student in Rotterdam conform de geldende Nederlandse fiscale regelgeving (o.a. KOR / vrijgesteld van BTW)."
  },

  websites: [
    {
      id: 'ayas-web-corner',
      title: "Aya's Web Corner",
      category: 'Webdevelopment & Design',
      image: '/src/assets/images/portfolio_ayas_web_corner.svg',
      description: 'Mijn eigen one-page website in Rotterdam, compleet met dienstenoverzicht, interactief beheerpaneel en online aanvraagformulier.',
      link: '/'
    },
    {
      id: 'rose-and-bloom',
      title: 'Rose & Bloom Nail Studio',
      category: 'Beauty & Nails',
      image: '/src/assets/images/portfolio_beauty_salon_1792147197522.jpg',
      description: 'One-page landingspagina voor een nagelstudio in Rotterdam met prijslijst, BIAB behandelingen en directe afspraaklink.',
      link: 'https://instagram.com'
    },
    {
      id: 'the-daily-knead',
      title: 'Atelier De Bakker',
      category: 'Bakkerij & Food',
      image: '/src/assets/images/portfolio_bakery_pastry_1792147197116.jpg',
      description: 'Overzichtelijke productpagina voor een desembakkerij met dagvers broodassortiment, weekendboxen en afhaaltijden.',
      link: 'https://instagram.com'
    },
    {
      id: 'atelier-noord',
      title: 'Atelier Noord Vintage',
      category: 'Mode & Vintage',
      image: '/src/assets/images/portfolio_vintage_boutique_1792147197945.jpg',
      description: 'Minimalistische online etalage voor een vintage kledingwinkel in Rotterdam met wekelijkse drops en route.',
      link: 'https://instagram.com'
    }
  ],

  inquiries: [
    {
      id: 'inq-sample-1',
      createdAt: '18 okt 2026, 11:20',
      name: 'Soraya Bakir',
      email: 'soraya@example.nl',
      phone: '06 12345678',
      businessName: 'Soraya Brows & Lashes',
      category: 'Beauty & Nails',
      message: 'Hoi Aya! Ik wil graag een simpele one-pager voor mijn wimper- en wenkbrauwstudio in Rotterdam. Ik heb al een prijslijstje klaar!',
      status: 'nieuw'
    }
  ]
};
