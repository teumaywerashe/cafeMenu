/**
 * Seed Script — 1 Super Admin, 6 Cafe Owners, 12 items each
 * Usage: npm run seed
 */

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import { userModel } from "./models/userModel.js";
import { itemModel } from "./models/itemModel.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key:    process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const hash = async (pw: string) => bcrypt.hash(pw, await bcrypt.genSalt(10));

async function uploadFromUrl(imageUrl: string, folder: string, publicId: string): Promise<string> {
    const isProfile = folder.includes("profiles");
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(imageUrl, {
            folder,
            public_id: publicId,
            overwrite: true,
            transformation: isProfile
                ? [
                    { width: 400, height: 400, crop: "fill", gravity: "face" },
                    { quality: "auto:good" },
                    { fetch_format: "auto" },
                ]
                : [
                    { width: 800, height: 600, crop: "fill", gravity: "auto" },
                    { quality: "auto:good" },
                    { fetch_format: "auto" },
                ],
        }, (error, result) => {
            if (error || !result) return reject(error);
            resolve(result.secure_url);
        });
    });
}

// ── Super Admin ───────────────────────────────────────────────────────────────
const superAdmin = {
    name: "Super Admin",
    email: "superadmin@cafemenu.com",
    password: "SuperAdmin@123",
    role: "superadmin",
    profileImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
};

// ── Cafe Owners ───────────────────────────────────────────────────────────────
const cafeOwners = [
    { name: "Abebe Kebede",    email: "abebe@cafemenu.com",    password: "Admin@1234", role: "admin", cafeName: "Addis Buna Cafe",
      profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" },
    { name: "Tigist Haile",    email: "tigist@cafemenu.com",   password: "Admin@1234", role: "admin", cafeName: "Sheger Coffee House",
      profileImageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face" },
    { name: "Dawit Tesfaye",   email: "dawit@cafemenu.com",    password: "Admin@1234", role: "admin", cafeName: "Habesha Kitchen",
      profileImageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face" },
    { name: "Selam Girma",     email: "selam@cafemenu.com",    password: "Admin@1234", role: "admin", cafeName: "Lalibela Bistro",
      profileImageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face" },
    { name: "Yonas Bekele",    email: "yonas@cafemenu.com",    password: "Admin@1234", role: "admin", cafeName: "Blue Nile Grill",
      profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face" },
    { name: "Meron Tadesse",   email: "meron@cafemenu.com",    password: "Admin@1234", role: "admin", cafeName: "Entoto Garden Cafe",
      profileImageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face" },
];

// ── Menu Items ────────────────────────────────────────────────────────────────
type MenuItem = { name: string; description: string; price: number; category: string; imageUrl: string };
const menuItems: Record<string, MenuItem[]> = {

    // ── 1. Addis Buna Cafe ────────────────────────────────────────────────────
    "Addis Buna Cafe": [
        { name: "Espresso",           description: "Rich, bold single-shot espresso from premium Ethiopian Yirgacheffe beans.",     price: 3.5,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800" },
        { name: "Macchiato",          description: "Ethiopian-style macchiato — espresso topped with a dollop of steamed milk.",    price: 4.0,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1485808191679-5f86510bd9d4?w=800" },
        { name: "Cappuccino",         description: "Velvety cappuccino with equal parts espresso, steamed milk, and foam.",         price: 4.5,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800" },
        { name: "Avocado Toast",      description: "Sourdough toast topped with smashed avocado, chili flakes, and lemon zest.",   price: 7.0,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=800" },
        { name: "Pancakes",           description: "Fluffy buttermilk pancakes served with maple syrup and fresh berries.",        price: 8.0,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800" },
        { name: "Club Sandwich",      description: "Triple-decker sandwich with grilled chicken, bacon, lettuce, and tomato.",     price: 9.5,  category: "Lunch",     imageUrl: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800" },
        { name: "Caesar Salad",       description: "Crisp romaine, parmesan shavings, croutons, and classic Caesar dressing.",     price: 8.5,  category: "Salads",    imageUrl: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800" },
        { name: "Chocolate Cake",     description: "Decadent moist chocolate cake layered with rich dark ganache frosting.",       price: 6.0,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800" },
        { name: "Cheesecake",         description: "New York-style cheesecake on a buttery graham cracker crust.",                 price: 6.5,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800" },
        { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice served ice-cold.",                               price: 4.0,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800" },
        { name: "Mango Smoothie",     description: "Thick mango smoothie blended with yogurt and a drizzle of honey.",             price: 5.0,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=800" },
        { name: "Eggs Benedict",      description: "Poached eggs on English muffin with Canadian bacon and hollandaise sauce.",    price: 10.0, category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800" },
    ],

    // ── 2. Sheger Coffee House ────────────────────────────────────────────────
    "Sheger Coffee House": [
        { name: "Latte",              description: "Smooth espresso with silky steamed milk and a thin layer of microfoam.",       price: 4.5,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800" },
        { name: "Cold Brew",          description: "12-hour slow-steeped cold brew, served over ice — smooth and low-acid.",      price: 5.0,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800" },
        { name: "Croissant",          description: "Buttery, flaky French croissant baked fresh every morning.",                  price: 3.5,  category: "Pastry",    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800" },
        { name: "Blueberry Muffin",   description: "Soft muffin bursting with fresh blueberries and a crunchy sugar top.",       price: 3.0,  category: "Pastry",    imageUrl: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800" },
        { name: "Grilled Chicken",    description: "Herb-marinated grilled chicken breast with seasonal roasted vegetables.",     price: 12.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800" },
        { name: "Beef Burger",        description: "Juicy beef patty with aged cheddar, lettuce, tomato, and house sauce.",      price: 11.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800" },
        { name: "Margherita Pizza",   description: "Classic Neapolitan pizza with San Marzano tomatoes, mozzarella, and basil.", price: 13.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800" },
        { name: "Greek Salad",        description: "Tomatoes, cucumbers, kalamata olives, feta, and oregano vinaigrette.",       price: 8.0,  category: "Salads",    imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800" },
        { name: "Tiramisu",           description: "Espresso-soaked ladyfingers layered with mascarpone cream and cocoa.",        price: 7.0,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800" },
        { name: "Strawberry Shake",   description: "Creamy milkshake blended with fresh strawberries and vanilla ice cream.",    price: 5.5,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800" },
        { name: "Iced Tea",           description: "Refreshing iced tea with lemon and fresh mint, lightly sweetened.",          price: 3.5,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800" },
        { name: "Mushroom Risotto",   description: "Creamy Arborio rice with wild mushrooms, parmesan, and fresh thyme.",        price: 14.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800" },
    ],

    // ── 3. Habesha Kitchen ────────────────────────────────────────────────────
    "Habesha Kitchen": [
        { name: "Injera with Doro Wat",   description: "Spongy Ethiopian flatbread served with rich, spicy chicken stew.",       price: 14.0, category: "Ethiopian", imageUrl: "https://images.unsplash.com/photo-1567364816519-cbc9c4ffe1eb?w=800" },
        { name: "Tibs",                   description: "Sautéed beef with onions, tomatoes, jalapeño, and Ethiopian spices.",    price: 13.0, category: "Ethiopian", imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
        { name: "Shiro",                  description: "Creamy chickpea flour stew seasoned with berbere and niter kibbeh.",     price: 9.0,  category: "Ethiopian", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800" },
        { name: "Kitfo",                  description: "Ethiopian-style minced beef with mitmita spice and spiced clarified butter.", price: 15.0, category: "Ethiopian", imageUrl: "https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800" },
        { name: "Ful Medames",            description: "Slow-cooked fava beans with olive oil, garlic, lemon, and cumin.",      price: 7.0,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
        { name: "Scrambled Eggs",         description: "Fluffy scrambled eggs with fresh herbs and a side of toasted bread.",   price: 6.0,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800" },
        { name: "Red Lentil Soup",        description: "Hearty red lentil soup with cumin, coriander, and a squeeze of lemon.", price: 7.5,  category: "Soups",     imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800" },
        { name: "Roasted Tomato Soup",    description: "Velvety roasted tomato soup with basil oil and crusty sourdough.",      price: 7.0,  category: "Soups",     imageUrl: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800" },
        { name: "Baklava",                description: "Crispy phyllo layers filled with chopped nuts and sweet honey syrup.",  price: 5.5,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800" },
        { name: "Fruit Platter",          description: "Seasonal fresh fruits — mango, papaya, watermelon, and pineapple.",     price: 6.0,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800" },
        { name: "Spiced Chai",            description: "Aromatic tea brewed with cardamom, cinnamon, ginger, and cloves.",      price: 3.5,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800" },
        { name: "Misir Wot",              description: "Spiced red lentil stew cooked with berbere, onions, and garlic.",       price: 10.0, category: "Ethiopian", imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800" },
    ],

    // ── 4. Lalibela Bistro ────────────────────────────────────────────────────
    "Lalibela Bistro": [
        { name: "Flat White",         description: "Double ristretto with velvety microfoam milk — stronger than a latte.",       price: 4.5,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800" },
        { name: "Mocha",              description: "Espresso blended with rich chocolate sauce and steamed milk.",                 price: 5.0,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=800" },
        { name: "French Toast",       description: "Thick brioche slices dipped in custard, pan-fried golden, dusted with sugar.", price: 8.5,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800" },
        { name: "Acai Bowl",          description: "Blended acai topped with granola, banana, berries, and coconut flakes.",      price: 9.0,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800" },
        { name: "Salmon Pasta",       description: "Penne with smoked salmon, capers, cream sauce, and fresh dill.",              price: 15.0, category: "Pasta",     imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800" },
        { name: "Pesto Pasta",        description: "Al dente spaghetti tossed in homemade basil pesto with pine nuts.",           price: 12.0, category: "Pasta",     imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800" },
        { name: "BBQ Ribs",           description: "Slow-cooked pork ribs glazed with smoky BBQ sauce, served with coleslaw.",    price: 18.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
        { name: "Fish & Chips",       description: "Beer-battered fish fillet with crispy fries and tartar sauce.",               price: 14.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=800" },
        { name: "Waldorf Salad",      description: "Apples, celery, walnuts, grapes, and creamy mayo dressing on lettuce.",       price: 9.0,  category: "Salads",    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
        { name: "Panna Cotta",        description: "Silky Italian cream dessert with a fresh berry coulis.",                      price: 6.5,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },
        { name: "Lemonade",           description: "House-made lemonade with fresh lemons, mint, and a hint of ginger.",          price: 4.0,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800" },
        { name: "Watermelon Juice",   description: "Pure blended watermelon juice, chilled and lightly salted.",                  price: 4.5,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800" },
    ],

    // ── 5. Blue Nile Grill ────────────────────────────────────────────────────
    "Blue Nile Grill": [
        { name: "Americano",          description: "Espresso shots diluted with hot water for a smooth, bold black coffee.",      price: 3.5,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=800" },
        { name: "Iced Latte",         description: "Chilled espresso poured over ice with cold milk — refreshing and smooth.",   price: 5.0,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800" },
        { name: "Grilled Tilapia",    description: "Whole tilapia marinated in lemon-herb sauce, grilled over open flame.",      price: 16.0, category: "Grill",     imageUrl: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800" },
        { name: "Lamb Chops",         description: "Tender lamb chops marinated in rosemary and garlic, grilled to perfection.", price: 20.0, category: "Grill",     imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800" },
        { name: "Beef Steak",         description: "200g sirloin steak cooked to your liking with chimichurri and fries.",       price: 22.0, category: "Grill",     imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800" },
        { name: "Chicken Wings",      description: "Crispy chicken wings tossed in buffalo sauce with blue cheese dip.",         price: 11.0, category: "Starters",  imageUrl: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800" },
        { name: "Calamari",           description: "Lightly battered calamari rings, fried golden, served with aioli.",          price: 10.0, category: "Starters",  imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800" },
        { name: "Corn on the Cob",    description: "Grilled corn brushed with herb butter and a sprinkle of chili powder.",      price: 5.0,  category: "Sides",     imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=800" },
        { name: "Sweet Potato Fries", description: "Crispy sweet potato fries seasoned with paprika and sea salt.",              price: 6.0,  category: "Sides",     imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800" },
        { name: "Brownie Sundae",     description: "Warm chocolate brownie topped with vanilla ice cream and hot fudge.",        price: 7.5,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800" },
        { name: "Passion Fruit Juice",description: "Fresh passion fruit blended with water and a touch of sugar.",               price: 4.5,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=800" },
        { name: "Hibiscus Tea",       description: "Chilled hibiscus flower tea, naturally tart and beautifully crimson.",       price: 4.0,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800" },
    ],

    // ── 6. Entoto Garden Cafe ─────────────────────────────────────────────────
    "Entoto Garden Cafe": [
        { name: "Pour Over Coffee",   description: "Single-origin Ethiopian beans brewed slowly by hand for a clean, bright cup.", price: 5.0,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800" },
        { name: "Matcha Latte",       description: "Ceremonial-grade matcha whisked with oat milk and a touch of honey.",         price: 5.5,  category: "Coffee",    imageUrl: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800" },
        { name: "Veggie Wrap",        description: "Grilled vegetables, hummus, and feta wrapped in a warm whole-wheat tortilla.", price: 9.0,  category: "Lunch",     imageUrl: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=800" },
        { name: "Quinoa Bowl",        description: "Fluffy quinoa with roasted chickpeas, avocado, cucumber, and tahini.",        price: 11.0, category: "Lunch",     imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800" },
        { name: "Shakshuka",          description: "Eggs poached in spiced tomato and pepper sauce, served with pita bread.",     price: 10.0, category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=800" },
        { name: "Granola Parfait",    description: "Layers of Greek yogurt, house granola, and seasonal fresh fruit.",            price: 7.5,  category: "Breakfast", imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800" },
        { name: "Falafel Plate",      description: "Crispy falafel balls with tabbouleh, hummus, and warm pita.",                 price: 12.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?w=800" },
        { name: "Stuffed Peppers",    description: "Bell peppers stuffed with spiced rice, herbs, and topped with tomato sauce.", price: 11.0, category: "Mains",     imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800" },
        { name: "Caprese Salad",      description: "Fresh mozzarella, ripe tomatoes, basil, and a drizzle of balsamic glaze.",   price: 9.0,  category: "Salads",    imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800" },
        { name: "Carrot Cake",        description: "Moist spiced carrot cake with cream cheese frosting and walnut crumble.",     price: 6.5,  category: "Desserts",  imageUrl: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800" },
        { name: "Coconut Water",      description: "Pure chilled coconut water, naturally sweet and hydrating.",                  price: 4.0,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800" },
        { name: "Green Detox Juice",  description: "Spinach, cucumber, green apple, ginger, and lemon blended fresh.",           price: 5.5,  category: "Drinks",    imageUrl: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800" },
    ],
};

// ── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("✅ Connected\n");

    await userModel.deleteMany({});
    await itemModel.deleteMany({});
    console.log("🗑️  Cleared existing users and items\n");

    // Super Admin
    const superAdminDoc = await userModel.create({
        name: superAdmin.name,
        email: superAdmin.email,
        password: await hash(superAdmin.password),
        role: superAdmin.role,
    });
    console.log(`👑 Super Admin created: ${superAdminDoc.email}`);

    // Cafe Owners + Items
    for (const owner of cafeOwners) {
        // Upload profile image to Cloudinary
        process.stdout.write(`\n🖼️  Uploading profile image for ${owner.name}...`);
        let profileImage: string = "default.jpg";
        try {
            profileImage = await uploadFromUrl(
                owner.profileImageUrl,
                "cafemenu/profiles",
                owner.name.replace(/\s+/g, "_").toLowerCase()
            );
            process.stdout.write(" ✅\n");
        } catch {
            process.stdout.write(" ⚠️  (using default)\n");
        }

        const ownerDoc = await userModel.create({
            name: owner.name,
            email: owner.email,
            password: await hash(owner.password),
            role: owner.role,
            profileImage,
        });
        console.log(`☕ Cafe owner created: ${ownerDoc.email} (${owner.cafeName})`);

        const items = menuItems[owner.cafeName];
        for (const item of items) {
            process.stdout.write(`   📸 Uploading "${item.name}"...`);
            let imageUrl: string;
            try {
                imageUrl = await uploadFromUrl(
                    item.imageUrl,
                    `cafemenu/${owner.cafeName.replace(/\s+/g, "_")}`,
                    item.name.replace(/\s+/g, "_").toLowerCase()
                );
                process.stdout.write(" ✅\n");
            } catch {
                imageUrl = item.imageUrl;
                process.stdout.write(" ⚠️  (fallback to original URL)\n");
            }

            await itemModel.create({
                name: item.name,
                image: imageUrl,
                description: item.description,
                price: item.price,
                ownerId: ownerDoc._id.toString(),
                category: item.category,
            });
        }
        console.log(`   ✅ ${items.length} items seeded for ${owner.cafeName}`);
    }

    console.log("\n🎉 Seeding complete!\n");
    console.log("─────────────────────────────────────────────────────────");
    console.log("Super Admin   →  superadmin@cafemenu.com  /  SuperAdmin@123");
    console.log("Cafe Owner 1  →  abebe@cafemenu.com       /  Admin@1234  (Addis Buna Cafe)");
    console.log("Cafe Owner 2  →  tigist@cafemenu.com      /  Admin@1234  (Sheger Coffee House)");
    console.log("Cafe Owner 3  →  dawit@cafemenu.com       /  Admin@1234  (Habesha Kitchen)");
    console.log("Cafe Owner 4  →  selam@cafemenu.com       /  Admin@1234  (Lalibela Bistro)");
    console.log("Cafe Owner 5  →  yonas@cafemenu.com       /  Admin@1234  (Blue Nile Grill)");
    console.log("Cafe Owner 6  →  meron@cafemenu.com       /  Admin@1234  (Entoto Garden Cafe)");
    console.log("─────────────────────────────────────────────────────────\n");

    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error("❌ Seed failed:", err);
    process.exit(1);
});
