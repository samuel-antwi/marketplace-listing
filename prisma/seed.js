import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const categoryData = [
  {
    id: 1,
    name: "cars & vehicles",
    uiLabel: "Cars & Vehicles",
    slug: "cars-vehicles",
    href: "cars-vehicles",
    title: "Cars & Vehicles",
    metaTitle: "Cars, motorbikes and vehicles for sale | Oneghana",
    metaDescription:
      "Browse a wide selection of vehicles and cars on Oneghana. From sedans and SUVs to trucks and motorcycles, we have it all. Find the perfect ride for you at great prices from trusted sellers. Shop now and get on the road in no time.",
    description: "",
    subCategories: [
      { url: "cars", title: "Cars" },
      { url: "motorbikes-scooters", title: "Motorbikes and Scooters" },
      {
        url: "vehicle-parts-and-accessories",
        title: "Vehicle Parts and Accessories",
      },
      { url: "buses", title: "Buses & Minibuses" },
    ],
  },
  {
    id: 2,
    name: "for sale",
    uiLabel: "For Sale",
    slug: "for-sale",
    href: "for-sale",
    title: "Used stuff for sale",
    metaTitle: "Used stuff for sale | Oneghana",
    metaDescription:
      "Shop a wide range of products for sale on Oneghana. From electronics and home goods and collectibles, we have it all. Find great deals on high-quality brand new and used items and get everything you need in one place.",
    description: "",
    subCategories: [
      { url: "audio-and-music-equipment", title: "Audio & Music Equipment" },
      { url: "computer-accessories", title: "Computer Accessories" },
      { url: "computer-monitors", title: "Computer Monitors" },
      { url: "computer-software", title: "Computer Software & Hardware" },
      { url: "clothing", title: "Clothes, Footwear & Accessories" },
      { url: "headphones", title: "Headphones" },
      { url: "kitchen-appliances", title: "Kitchen Appliances" },
      { url: "laptops-and-computers", title: "Laptops & Computers" },
      { url: "photos-and-video-cameras", title: "Photos & Video Cameras" },
      { url: "phones", title: "Phones, Mobile Phones & Telecoms" },
      { url: "printers-and-scanners", title: "Printers & Scanners" },
      { url: "security-and-surveillance", title: "Security & Surveillance" },
      { url: "software", title: "Software" },
      { url: "tv-and-dvd-equipment", title: "TV & DVD Equipment" },
      { url: "video-game-consoles", title: "Video Game Consoles" },
    ],
  },
  {
    id: 3,
    name: "property",
    uiLabel: "Property",
    slug: "real-estate",
    href: "real-estate",
    title: "Property",
    metaTitle:
      "Houses, apartments, land and plots for sale and rent | Oneghana",
    metaDescription:
      "Find your dream property on Oneghana. From homes and apartments to commercial real estate and vacation rentals, we have a wide selection of properties available. Browse now and get the best deals on top-quality properties",
    description: "",
    subCategories: [
      {
        url: "houses-and-apartments-for-sale",
        title: "Houses and Apartments for Sale",
      },
      { url: "land-and-plot-for-sale", title: "Land and Plot for Sale" },
      {
        url: "houses-and-apartments-for-rent",
        title: "Houses and Apartments for Rent",
      },
      { url: "land-and-plot-for-rent", title: "Land and Plot for Rent" },
    ],
  },

  {
    id: 4,
    name: "jobs",
    uiLabel: "Jobs",
    slug: "jobs",
    href: "jobs",
    title: " Jobs in Ghana",
    metaTitle: "Jobs in Ghana | Oneghana",
    metaDescription:
      "Find your next job on Oneghana. With a wide range of opportunities in various industries, we have something for everyone. Browse now and take the first step towards a successful career.",
    description: "",
    subCategories: [
      { url: "hr", title: "HR" },
      { url: "accountancy", title: "Accountancy" },
    ],
  },
  {
    id: 5,
    name: "services",
    uiLabel: "Services",
    slug: "business-services",
    href: "business-services",
    title: " Services",
    metaTitle: "Services | Oneghana",
    metaDescription:
      "Find professional services of all kinds on Oneghana. From home repair and maintenance to personal care and business support, we have a wide range of service providers ready to help. Browse now and get the best deals on top-quality services.",
    description: "",
    subCategories: [{ url: "finance-and-legal", title: "Finance & Legal" }],
  },
  {
    id: 6,
    name: "babies & kids",
    uiLabel: "Babies & Kids",
    slug: "babies-kids",
    href: "babies-kids",
    title: " Babies and kids",
    metaTitle: "Babies and kids stuff for sale in Ghana | Oneghana",
    metaDescription:
      "Shop for all your baby and kids' needs on Oneghana. From clothes and toys to strollers and cribs, we have a wide selection of high-quality products at great prices. Find everything you need to care for your little ones in one place.",
    description: "",
    subCategories: [{ url: "child-care", title: "Child Care" }],
  },
  {
    id: 7,
    name: " sports & outdoor",
    uiLabel: "Sports & Outdoor",
    slug: "sports-outdoor",
    href: "sports-outdoor",
    title: " Sports and outdoor",
    metaTitle: "Sports and outdoor equipment for sale in Ghana | Oneghana",
    metaDescription:
      "Find a wide selection of sports and outdoor gear on Oneghana. From hiking and camping equipment to sports gear and accessories, we have it all. Shop now and get the best deals on high-quality products. ",
    description: "",
    subCategories: [{ url: "sports-equipment", title: "Sports Equipment" }],
  },
];

async function main() {
  for (const category of categoryData) {
    const { subCategories, ...categoryData } = category;

    try {
      const createdCategory = await prisma.category.create({
        data: {
          ...categoryData,
          subCategories: {
            create: subCategories,
          },
        },
      });

      console.log(`Created category: ${createdCategory.name}`);
    } catch (error) {
      console.error(`Error creating category ${category.name}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
