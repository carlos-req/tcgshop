import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "pw-1",
    name: "Palworld Official Card Game: Dawn of Palpagos - Booster Box 1st Edition",
    price: 179.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "in_stock",
    category: "palworld",
    slug: "dawn-of-palpagos-booster-box",
  },
  {
    id: "pw-2",
    name: "Palworld Official Card Game: Legends Awaken - Booster Box (PREORDER)",
    price: 119.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "coming_soon",
    category: "palworld",
    slug: "legends-awaken-booster-box",
  },
  {
    id: "pw-3",
    name: "Palworld Official Card Game: Dawn of Palpagos - Booster Pack",
    price: 5.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "in_stock",
    category: "palworld",
    slug: "dawn-of-palpagos-booster-pack",
  },
  {
    id: "pw-4",
    name: "Palworld Official Card Game: Sleeve & Card Set Vol.1 (PREORDER)",
    price: 24.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "out_of_stock",
    category: "palworld",
    slug: "sleeve-card-set-vol1",
  },
  {
    id: "pw-5",
    name: "Palworld Official Card Game: Paldeck Vol.1",
    price: 14.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "in_stock",
    category: "palworld",
    slug: "paldeck-vol1",
  },
  {
    id: "pw-6",
    name: "Palworld Official Card Game: Legends Awaken - Booster Pack (PREORDER)",
    price: 3.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "coming_soon",
    category: "palworld",
    slug: "legends-awaken-booster-pack",
  },
  {
    id: "pw-7",
    name: "Palworld Official Card Game: Dawn of Palpagos - Booster Box 1st Edition",
    price: 179.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "in_stock",
    category: "palworld",
    slug: "dawn-of-palpagos-booster-box-2",
  },
  {
    id: "pw-8",
    name: "Palworld Official Card Game: Dawn of Palpagos - Booster Pack",
    price: 5.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "in_stock",
    category: "palworld",
    slug: "dawn-of-palpagos-booster-pack-2",
  },
  {
    id: "pw-9",
    name: "Palworld Official Card Game: Legends Awaken - Booster Box (PREORDER)",
    price: 119.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "coming_soon",
    category: "palworld",
    slug: "legends-awaken-booster-box-2",
  },
  {
    id: "pw-10",
    name: "Palworld Official Card Game: Sleeve & Card Set Vol.1 (PREORDER)",
    price: 24.97,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg",
    status: "out_of_stock",
    category: "palworld",
    slug: "sleeve-card-set-vol1-2",
  },
  {
    id: "mtg-1",
    name: "Magic: The Gathering — Modern Horizons 3 Play Booster Box",
    price: 289.99,
    image:
      "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg",
    status: "coming_soon",
    category: "magic",
    slug: "modern-horizons-3",
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
