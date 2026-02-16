import { PrismaClient, GlassesType, Gender, FrameShape } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding TUTTO marketplace...');

  // Catégories marketplace
  const categories = await Promise.all([
    prisma.category.upsert({ where: { slug: 'restaurants' }, update: {}, create: { name: 'Restaurants', slug: 'restaurants', description: 'Plats préparés et restauration', order: 1, imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'epicerie' }, update: {}, create: { name: 'Épicerie', slug: 'epicerie', description: 'Courses et produits du quotidien', order: 2, imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'mode' }, update: {}, create: { name: 'Mode', slug: 'mode', description: 'Vêtements et accessoires', order: 3, imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'electronique' }, update: {}, create: { name: 'Électronique', slug: 'electronique', description: 'High-tech et gadgets', order: 4, imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'maison-deco' }, update: {}, create: { name: 'Maison & Déco', slug: 'maison-deco', description: 'Décoration et ameublement', order: 5, imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'beaute' }, update: {}, create: { name: 'Beauté', slug: 'beaute', description: 'Cosmétiques et soins', order: 6, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'sport' }, update: {}, create: { name: 'Sport', slug: 'sport', description: 'Équipements et vêtements de sport', order: 7, imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'pharmacie' }, update: {}, create: { name: 'Pharmacie', slug: 'pharmacie', description: 'Santé et bien-être', order: 8, imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'animaux' }, update: {}, create: { name: 'Animaux', slug: 'animaux', description: 'Nourriture et accessoires pour animaux', order: 9, imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'jeux-jouets' }, update: {}, create: { name: 'Jeux & Jouets', slug: 'jeux-jouets', description: 'Jeux vidéo, jouets et loisirs', order: 10, imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'livres' }, update: {}, create: { name: 'Livres', slug: 'livres', description: 'Livres, BD et papeterie', order: 11, imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop' } }),
    prisma.category.upsert({ where: { slug: 'auto-moto' }, update: {}, create: { name: 'Auto & Moto', slug: 'auto-moto', description: 'Pièces et accessoires auto/moto', order: 12, imageUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop' } }),
  ]);

  console.log(`✅ ${categories.length} catégories créées`);

  // Marques marketplace
  const brands = await Promise.all([
    prisma.brand.upsert({ where: { slug: 'apple' }, update: {}, create: { name: 'Apple', slug: 'apple', description: 'Think Different' } }),
    prisma.brand.upsert({ where: { slug: 'samsung' }, update: {}, create: { name: 'Samsung', slug: 'samsung', description: 'Innovation technologique' } }),
    prisma.brand.upsert({ where: { slug: 'nike' }, update: {}, create: { name: 'Nike', slug: 'nike', description: 'Just Do It' } }),
    prisma.brand.upsert({ where: { slug: 'zara' }, update: {}, create: { name: 'Zara', slug: 'zara', description: 'Mode rapide' } }),
    prisma.brand.upsert({ where: { slug: 'ikea' }, update: {}, create: { name: 'IKEA', slug: 'ikea', description: 'Ameublement et décoration' } }),
    prisma.brand.upsert({ where: { slug: 'loreal' }, update: {}, create: { name: "L'Oréal", slug: 'loreal', description: 'Parce que vous le valez bien' } }),
    prisma.brand.upsert({ where: { slug: 'sony' }, update: {}, create: { name: 'Sony', slug: 'sony', description: 'Be Moved' } }),
    prisma.brand.upsert({ where: { slug: 'adidas' }, update: {}, create: { name: 'Adidas', slug: 'adidas', description: 'Impossible is Nothing' } }),
    prisma.brand.upsert({ where: { slug: 'tutto-market' }, update: {}, create: { name: 'TUTTO Market', slug: 'tutto-market', description: 'Marque maison TUTTO' } }),
    prisma.brand.upsert({ where: { slug: 'dyson' }, update: {}, create: { name: 'Dyson', slug: 'dyson', description: 'Ingénierie inventive' } }),
  ]);

  console.log(`✅ ${brands.length} marques créées`);

  // Matières (Remplaçant l'enum FrameMaterial)
  const materials = await Promise.all([
    prisma.material.upsert({ where: { slug: 'metal' }, update: {}, create: { name: 'Métal', slug: 'metal', skuCode: 'MET' } }),
    prisma.material.upsert({ where: { slug: 'plastique' }, update: {}, create: { name: 'Plastique', slug: 'plastique', skuCode: 'PLA' } }),
    prisma.material.upsert({ where: { slug: 'acetate' }, update: {}, create: { name: 'Acétate', slug: 'acetate', skuCode: 'ACE' } }),
    prisma.material.upsert({ where: { slug: 'titane' }, update: {}, create: { name: 'Titane', slug: 'titane', skuCode: 'TIT' } }),
    prisma.material.upsert({ where: { slug: 'bois' }, update: {}, create: { name: 'Bois', slug: 'bois', skuCode: 'BOI' } }),
    prisma.material.upsert({ where: { slug: 'mixte' }, update: {}, create: { name: 'Mixte', slug: 'mixte', skuCode: 'MIX' } }),
  ]);

  console.log(`✅ ${materials.length} matières créées`);

  // Index par slug pour accès rapide
  const catMap: Record<string, string> = {};
  categories.forEach(c => { catMap[c.slug] = c.id; });
  const brandMap: Record<string, string> = {};
  brands.forEach(b => { brandMap[b.slug] = b.id; });

  // Produits marketplace
  const productsData = [
    // 🍽️ Restaurants
    { name: 'Pizza Margherita', slug: 'pizza-margherita', shortDesc: 'Mozzarella, tomates, basilic', price: 12.90, cat: 'restaurants', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Burger Gourmet', slug: 'burger-gourmet', shortDesc: 'Boeuf Angus, cheddar, bacon', price: 14.50, cat: 'restaurants', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Sushi Box Premium', slug: 'sushi-box-premium', shortDesc: '18 pièces, saumon & thon', price: 22.90, cat: 'restaurants', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=400&fit=crop', isNew: true },
    { name: 'Salade Caesar', slug: 'salade-caesar', shortDesc: 'Poulet grillé, parmesan, croûtons', price: 11.50, cat: 'restaurants', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&h=400&fit=crop' },
    // 🛒 Épicerie
    { name: 'Panier Bio Fruits', slug: 'panier-bio-fruits', shortDesc: 'Fruits de saison bio, 3kg', price: 15.90, cat: 'epicerie', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Huile d\'Olive Extra Vierge', slug: 'huile-olive-extra-vierge', shortDesc: 'Première pression à froid, 1L', price: 8.90, cat: 'epicerie', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1474979266404-7f28db3e3c18?w=500&h=400&fit=crop' },
    { name: 'Café Arabica Premium', slug: 'cafe-arabica-premium', shortDesc: 'Grains 100% arabica, 500g', price: 12.50, cat: 'epicerie', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=400&fit=crop', isNew: true },
    { name: 'Chocolat Noir 85%', slug: 'chocolat-noir-85', shortDesc: 'Tablette artisanale, 200g', price: 5.90, cat: 'epicerie', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=500&h=400&fit=crop' },
    // 👗 Mode
    { name: 'Sneakers Air Max', slug: 'sneakers-air-max', shortDesc: 'Running, confort ultime', price: 129.99, originalPrice: 159.99, cat: 'mode', brand: 'nike', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=400&fit=crop', isBestSeller: true, isPromo: true },
    { name: 'Veste en Jean', slug: 'veste-en-jean', shortDesc: 'Coupe oversize, coton bio', price: 59.90, cat: 'mode', brand: 'zara', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=400&fit=crop', isNew: true },
    { name: 'Ultraboost 23', slug: 'ultraboost-23', shortDesc: 'Performance et style', price: 149.99, originalPrice: 189.99, cat: 'mode', brand: 'adidas', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=400&fit=crop', isPromo: true },
    { name: 'Robe d\'Été Fleurie', slug: 'robe-ete-fleurie', shortDesc: 'Légère et élégante', price: 39.90, cat: 'mode', brand: 'zara', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=400&fit=crop' },
    // 📱 Électronique
    { name: 'iPhone 16 Pro', slug: 'iphone-16-pro', shortDesc: '256 Go, Titane Naturel', price: 1229.00, cat: 'electronique', brand: 'apple', image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=400&fit=crop', isBestSeller: true, isNew: true },
    { name: 'Galaxy S25 Ultra', slug: 'galaxy-s25-ultra', shortDesc: '512 Go, Noir Titanium', price: 1199.00, cat: 'electronique', brand: 'samsung', image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=400&fit=crop', isNew: true },
    { name: 'AirPods Pro 3', slug: 'airpods-pro-3', shortDesc: 'ANC, Audio Spatial', price: 279.00, originalPrice: 299.00, cat: 'electronique', brand: 'apple', image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=400&fit=crop', isBestSeller: true, isPromo: true },
    { name: 'PlayStation 5 Pro', slug: 'ps5-pro', shortDesc: 'Console de nouvelle génération', price: 799.00, cat: 'electronique', brand: 'sony', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=400&fit=crop', isBestSeller: true },
    // 🏠 Maison & Déco
    { name: 'Lampe Design Scandinave', slug: 'lampe-design-scandinave', shortDesc: 'Bois et lin, H45cm', price: 49.90, cat: 'maison-deco', brand: 'ikea', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=500&h=400&fit=crop', isNew: true },
    { name: 'Coussin Velours', slug: 'coussin-velours', shortDesc: 'Vert émeraude, 45x45cm', price: 19.90, cat: 'maison-deco', brand: 'ikea', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=400&fit=crop' },
    { name: 'Aspirateur V15', slug: 'aspirateur-v15', shortDesc: 'Sans fil, 60min autonomie', price: 599.00, originalPrice: 699.00, cat: 'maison-deco', brand: 'dyson', image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&h=400&fit=crop', isBestSeller: true, isPromo: true },
    { name: 'Bougie Parfumée', slug: 'bougie-parfumee', shortDesc: 'Vanille & Bois de santal', price: 24.90, cat: 'maison-deco', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1602607663818-9a08573e40b1?w=500&h=400&fit=crop' },
    // 💄 Beauté
    { name: 'Sérum Revitalisant', slug: 'serum-revitalisant', shortDesc: 'Vitamine C, 30ml', price: 34.90, cat: 'beaute', brand: 'loreal', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Palette Maquillage', slug: 'palette-maquillage', shortDesc: '24 couleurs nude & bold', price: 29.90, cat: 'beaute', brand: 'loreal', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=400&fit=crop', isNew: true },
    { name: 'Parfum Intense', slug: 'parfum-intense', shortDesc: 'Notes boisées, 100ml', price: 89.90, originalPrice: 112.00, cat: 'beaute', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=400&fit=crop', isPromo: true },
    { name: 'Crème Hydratante', slug: 'creme-hydratante', shortDesc: 'Soin de jour, 50ml', price: 18.90, cat: 'beaute', brand: 'loreal', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&h=400&fit=crop' },
    // ⚽ Sport
    { name: 'Tapis de Yoga Premium', slug: 'tapis-yoga-premium', shortDesc: 'Antidérapant, éco-responsable', price: 39.90, cat: 'sport', brand: 'nike', image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Haltères Réglables', slug: 'halteres-reglables', shortDesc: '2-24kg, mécanisme rapide', price: 199.00, cat: 'sport', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=400&fit=crop', isNew: true },
    { name: 'Maillot Running', slug: 'maillot-running', shortDesc: 'DRI-FIT, ultra léger', price: 44.90, originalPrice: 59.90, cat: 'sport', brand: 'nike', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=400&fit=crop', isPromo: true },
    { name: 'Ballon Football Pro', slug: 'ballon-football-pro', shortDesc: 'Taille 5, compétition', price: 34.90, cat: 'sport', brand: 'adidas', image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500&h=400&fit=crop' },
    // 💊 Pharmacie
    { name: 'Vitamines Multi+', slug: 'vitamines-multi-plus', shortDesc: '30 gélules, cure 1 mois', price: 14.90, cat: 'pharmacie', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Huile Essentielle Lavande', slug: 'huile-essentielle-lavande', shortDesc: 'Bio, 10ml', price: 8.90, cat: 'pharmacie', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=400&fit=crop' },
    // 🐾 Animaux
    { name: 'Croquettes Premium Chien', slug: 'croquettes-premium-chien', shortDesc: 'Sans céréales, 12kg', price: 54.90, cat: 'animaux', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Arbre à Chat Deluxe', slug: 'arbre-a-chat-deluxe', shortDesc: '3 niveaux, sisal naturel', price: 79.90, cat: 'animaux', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=500&h=400&fit=crop', isNew: true },
    // 🎮 Jeux & Jouets
    { name: 'Manette Sans Fil Pro', slug: 'manette-sans-fil-pro', shortDesc: 'Compatible PS5/PC', price: 69.90, cat: 'jeux-jouets', brand: 'sony', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'LEGO Architecture Paris', slug: 'lego-architecture-paris', shortDesc: '649 pièces, +16 ans', price: 49.90, cat: 'jeux-jouets', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=500&h=400&fit=crop', isNew: true },
    // 📚 Livres
    { name: 'Best-Seller Roman', slug: 'best-seller-roman', shortDesc: 'Le dernier succès littéraire', price: 21.90, cat: 'livres', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Manga Coffret', slug: 'manga-coffret', shortDesc: 'Tomes 1-5, édition collector', price: 39.90, cat: 'livres', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1614107151491-6876eecbff89?w=500&h=400&fit=crop', isNew: true },
    // 🚗 Auto & Moto
    { name: 'Dashcam 4K', slug: 'dashcam-4k', shortDesc: 'Vision nocturne, GPS intégré', price: 89.90, cat: 'auto-moto', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=500&h=400&fit=crop', isBestSeller: true },
    { name: 'Kit d\'Entretien Auto', slug: 'kit-entretien-auto', shortDesc: 'Shampoing, cire, microfibre', price: 34.90, cat: 'auto-moto', brand: 'tutto-market', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&h=400&fit=crop', isNew: true },
  ];

  console.log(`📦 Création de ${productsData.length} produits...`);

  for (let i = 0; i < productsData.length; i++) {
    const data = productsData[i];
    const product = await prisma.glasses.upsert({
      where: { slug: data.slug },
      update: {
        name: data.name,
        price: data.price,
        originalPrice: data.originalPrice || null,
        shortDesc: data.shortDesc,
        isBestSeller: data.isBestSeller || false,
        isNew: data.isNew || false,
        isPromo: data.isPromo || false,
      },
      create: {
        name: data.name,
        slug: data.slug,
        shortDesc: data.shortDesc,
        description: data.shortDesc,
        price: data.price,
        originalPrice: data.originalPrice || null,
        categoryId: catMap[data.cat],
        brandId: brandMap[data.brand],
        type: GlassesType.OPTICAL,
        gender: Gender.UNISEX,
        isNew: data.isNew || false,
        isBestSeller: data.isBestSeller || false,
        isPromo: data.isPromo || false,
        stock: Math.floor(Math.random() * 100) + 10,
        isAvailable: true,
      },
    });

    // Image
    await prisma.glassesImage.upsert({
      where: { id: `img-${product.id}-0` },
      update: { url: data.image },
      create: {
        id: `img-${product.id}-0`,
        url: data.image,
        alt: data.name,
        isPrimary: true,
        order: 0,
        glassesId: product.id,
      },
    });
  }

  console.log(`✅ ${productsData.length} produits créés avec images`);
  console.log('🎉 Seeding TUTTO terminé!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
