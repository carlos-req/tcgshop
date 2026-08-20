import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "pw-1",
    name: "Bushiroad Trial Deck Palworld: Dawn of Palpagos - Green · Purple",
    price: 79.97,
    image: "/src/assets/PW-trialdeck-greenpurple.jpg",
    status: "in_stock",
    category: "palworld",
    slug: "dawn-of-palpagos-booster-box",
  },
  {
    id: "pw-2",
    name: "Bushiroad Trial Deck Palworld: Dawn of Palpagos - Red & Blue",
    price: 79.97,
    image: "/src/assets/PW-trialdecks-redblue.jpg",
    status: "coming_soon",
    category: "palworld",
    slug: "legends-awaken-booster-box",
  },
  {
    id: "pw-3",
    name: "Palworld TCG: Dawn of Palpagos Series 01 Booster Box - 12 Packs",
    price: 150.9,
    image: "src/assets/PW-boosterpack-12-series01.jpg",
    status: "out_of_stock",
    category: "palworld",
    slug: "sleeve-card-set-vol1",
  },
  {
    id: "mtg-1",
    name: "Magic: The Gathering — Hobbit Play Booster Box",
    price: 289.99,
    image: "src/assets/mtg-playbooster-hobbit.jpg",
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
    status: "in_stock",
    category: "magic",
    slug: "commander-masters-box",
  },
  {
    id: "mtg-4",
    name: "Magic: The Gathering — Bloomburrow Collector Booster Box",
    price: 259.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg",
    status: "out_of_stock",
    category: "magic",
    slug: "bloomburrow-collector-box",
  },
  {
    id: "mtg-5",
    name: "Magic: The Gathering — Duskmourn Bundle",
    price: 44.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg",
    status: "in_stock",
    category: "magic",
    slug: "duskmourn-bundle",
  },
];

export function getProductsByCategory(category: Product["category"]) {
  return products.filter((product) => product.category === category);
}
