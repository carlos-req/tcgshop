import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "pw-1",
    name: "Bushiroad Trial Deck Palworld: Dawn of Palpagos - Green · Purple",
    price: 79.97,
    image: "/src/assets/PW-trialdeck-greenpurple.jpg",
    alt: "Palworld Trial Deck Green - Purple",
    status: "in_stock",
    category: "palworld",
    slug: "dawn-of-palpagos-booster-box",
  },
  {
    id: "pw-2",
    name: "Bushiroad Trial Deck Palworld: Dawn of Palpagos - Red & Blue",
    price: 79.97,
    image: "/src/assets/PW-trialdecks-redblue.jpg",
    alt: "Palworld Trial Deck Red - Blue",
    status: "coming_soon",
    category: "palworld",
    slug: "legends-awaken-booster-box",
  },
  {
    id: "pw-3",
    name: "Palworld TCG: Dawn of Palpagos Series 01 Booster Box - 12 Packs",
    price: 150.9,
    image: "/src/assets/PW-boosterpack-12-series01.jpg",
    alt: "Palworld Series 01 Booster Box",
    status: "out_of_stock",
    category: "palworld",
    slug: "sleeve-card-set-vol1",
  },
  {
    id: "pw-4",
    name: "Palworld TCG: Dawn of Palpagos Series 01 Booster Box - 12 Packs",
    price: 150.9,
    image: "/src/assets/PW-boosterpack-12-series01.jpg",
    alt: "Palworld Series 01 Booster Box",
    status: "out_of_stock",
    category: "palworld",
    slug: "sleeve-card-set-vol1",
  },
  {
    id: "mtg-1",
    name: "Magic: The Gathering — Hobbit Play Booster Box",
    price: 289.99,
    image: "/src/assets/mtg-playbooster-hobbit.jpg",
    alt: "MTG Hobbit Play Booster Box",
    status: "coming_soon",
    category: "magic",
    slug: "hobbit-play-booster-12",
  },
  {
    id: "mtg-2",
    name: "Magic: The Gathering — Modern Horizons 3 Play Booster Pack",
    price: 5.49,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg",
    alt: "MTG Modern Horizons 3 Play Booster Box",
    status: "in_stock",
    category: "magic",
    slug: "modern-horizons-3-pack",
  },
  {
    id: "mtg-3",
    name: "Magic: The Gathering — Commander Masters Booster Box",
    price: 349.99,
    originalPrice: 399.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg",
    alt: "MTG Commander Masters Play Booster Box",
    status: "in_stock",
    category: "magic",
    slug: "commander-masters-box",
  },
];

export function getProductsByCategory(category: Product["category"]) {
  return products.filter((product) => product.category === category);
}
