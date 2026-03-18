import { BarChart2, Search, TrendingUp, Target, Users, Lightbulb } from "lucide-react"

/**
 * SHARED DATA — IC Blue Professional templates
 * Edit here once → syncs to both:
 *   · template-ic-blue-professional-alt.tsx   (dark blue theme)
 *   · template-ic-blue-professional-v2.tsx    (light grey theme)
 */

export const D = {
  productName:  "From Data to Better Decisions",
  regionName:   "Faster.",
  productTypes: ["Industry knowledge", "Concepts & tools", "Lead generation", "Pricing optimisation"],

  editions: [
    { name: "Standard Edition 2025",                    price: "€2,490", highlight: false },
    { name: "Premium Edition 2025 (incl. data tables)", price: "€3,990", highlight: true  },
  ],

  otherRegions: [
    { name: "Germany",        status: "Available",  available: true  },
    { name: "Switzerland",    status: "Available",  available: true  },
    { name: "Czech Republic", status: "Available",  available: true  },
    { name: "Poland",         status: "Q2 2026",    available: false },
    { name: "Hungary",        status: "Q3 2026",    available: false },
    { name: "Romania",        status: "On Request", available: false },
  ],

  press: [
    {
      title: "Building Back Growth: European Sandwich Panels Market Shows Signs of Recovery",
      desc:  "After two years of decline, the market is starting to grow again, driven by increasing renovation projects and a solid level of new investments.",
    },
    {
      title: "Europe's Door Access Control Goes Smart: Integrated Readers on the Rise",
      desc:  "Residential new-builds are expected to recover gradually, supported by ongoing renovation activity and rising demand for integrated security solutions.",
    },
  ],

  events: [
    {
      title: "Free Online Preview: Facility Services in Central and Eastern Europe 2026",
      desc:  "Webinar with latest market tracking insights and practical recommendations.",
      date:  "10/03/2026",
    },
    {
      title: "Free Online Preview: Facility Services in Italy 2026",
      desc:  "Webinar covering current trends, opportunities and strategic implications.",
      date:  "11/03/2026",
    },
  ],

  references: [
    {
      company:   "ELK",
      logoSrc:   "/images/ELK.png",
      statement: "The prefabricated housing study by Interconnection Consulting shows a real picture of the actual market situation and forms a valuable basis for our strategic decisions.",
      author:    "Gerhard Schuller (CFO ELK)",
    },
    {
      company:   "Epson",
      logoSrc:   "/images/Epson.png",
      statement: "EPSON is satisfied with the Interconnection's way of communication with the market and with clients. EPSON is also appriciate the Interconnection's continuous work trying to aim the report to be at the higher level. As a result, EPSON rely on Interconnection data, for the market of POS Printers and Systems.",
      author:    "T.Murakami (Brand Management, Seiko Epson Corporation)",
    },
    {
      company:   "Sodexo",
      logoSrc:   "/images/Sodexo.jpg",
      statement: "When developing new market strategies, Interconnection is a trusted source we always come back to.",
      author:    "Christian Frey (Marketing Manager CS DACH)",
    },
    {
      company:   "Schneider Electric",
      logoSrc:   "/images/shneider.png",
      statement: "Under a short time constraint, Interconnection was able to deliver an outstanding study that exceeded my expectation in terms of quality and market breadth. I highly recommend Interconnection to anyone in need of market research.",
      author:    "Jeff Canterberry (Director of Strategy and M&A, Schneider Electric)",
    },
  ],

  additionalClients: [
    { name: "Admonter" },
    { name: "D+H Mechatronic" },
    { name: "Daikin" },
    { name: "Danwood" },
    { name: "Deceuninck" },
    { name: "Deloitte" },
    { name: "Deutscher Holzfertigbau Verband" },
    { name: "Dickson-Constant" },
    { name: "DME" },
    { name: "Doka" },
    { name: "Domoferm" },
    { name: "Dorel" },
    { name: "Dormakaba" },
    { name: "Dow Corning" },
    { name: "Drexel und Weiss" },
    { name: "DTZ" },
    { name: "Dufour" },
  ],
}

export const COMPETENCES = [
  { icon: Users,      title: "Management Consulting", desc: "Tailor-made consulting solutions to optimise sales, pricing and strategic execution." },
  { icon: Search,     title: "Customer Insights",     desc: "Practical insight into customer needs, behaviour and market expectations." },
  { icon: TrendingUp, title: "Innovation Management", desc: "From trend detection to innovation priorities that create measurable growth." },
  { icon: Target,     title: "Big Data Tools",        desc: "Data-driven tools for structured market intelligence and decision support." },
  { icon: BarChart2,  title: "Market Reports",        desc: "High-quality market reports worldwide with actionable and relevant findings." },
  { icon: Lightbulb,  title: "Industry Experience",   desc: "Deep sector expertise built through decades of projects and market research." },
]
