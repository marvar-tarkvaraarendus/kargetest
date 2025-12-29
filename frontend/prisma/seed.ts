import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Create default admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  
  await prisma.adminUser.upsert({
    where: { email: "admin@karge.ee" },
    update: {},
    create: {
      email: "admin@karge.ee",
      password: hashedPassword,
      name: "Admin",
    },
  });
  console.log("✅ Admin user created");

  // Create sample cookies
  const cookies = [
    {
      slug: "kinder-bueno",
      price: "3.50",
      imagePath: "/assets/kinder-bueno-cookie.png",
      name: { et: "Kinder Bueno Küpsis", en: "Kinder Bueno Cookie" },
      description: {
        et: "Maitsev küpsis Kinder Bueno täidisega, kaetud valge šokolaadiga ja kaunistatud Kinder Bueno tükkidega.",
        en: "Delicious cookie with Kinder Bueno filling, coated with white chocolate and decorated with Kinder Bueno pieces.",
      },
      ingredients: {
        et: "Jahu, või, suhkur, munad, Kinder Bueno, valge šokolaad, vaniljeekstrakt",
        en: "Flour, butter, sugar, eggs, Kinder Bueno, white chocolate, vanilla extract",
      },
    },
    {
      slug: "chocolate-chip",
      price: "2.80",
      imagePath: "/assets/menu-chocolate-cookie.png",
      name: { et: "Šokolaadiküpsis", en: "Chocolate Chip Cookie" },
      description: {
        et: "Klassikaline šokolaadiküpsis täis tumedaid šokolaaditükke.",
        en: "Classic chocolate chip cookie filled with dark chocolate chunks.",
      },
      ingredients: {
        et: "Jahu, või, pruun suhkur, munad, tume šokolaad, vaniljeekstrakt, küpsetuspulber",
        en: "Flour, butter, brown sugar, eggs, dark chocolate, vanilla extract, baking powder",
      },
    },
    {
      slug: "cinnamon-roll",
      price: "4.20",
      imagePath: "/assets/menu-cinnamon-roll.jpg",
      name: { et: "Kaneelirull", en: "Cinnamon Roll" },
      description: {
        et: "Pehme ja magus kaneelirull kreemise glasuuriga.",
        en: "Soft and sweet cinnamon roll with creamy glaze.",
      },
      ingredients: {
        et: "Jahu, piim, või, suhkur, kaneel, toorjuust, vaniljeekstrakt",
        en: "Flour, milk, butter, sugar, cinnamon, cream cheese, vanilla extract",
      },
    },
  ];

  for (const cookie of cookies) {
    await prisma.cookie.upsert({
      where: { slug: cookie.slug },
      update: cookie,
      create: cookie,
    });
  }
  console.log("✅ Sample cookies created");

  // Create default opening times
  await prisma.openingTimes.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      content: {
        monday: { open: "08:00", close: "18:00" },
        tuesday: { open: "08:00", close: "18:00" },
        wednesday: { open: "08:00", close: "18:00" },
        thursday: { open: "08:00", close: "18:00" },
        friday: { open: "08:00", close: "20:00" },
        saturday: { open: "10:00", close: "18:00" },
        sunday: { open: "10:00", close: "16:00" },
      },
    },
  });
  console.log("✅ Opening times created");

  console.log("🎉 Seed completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
