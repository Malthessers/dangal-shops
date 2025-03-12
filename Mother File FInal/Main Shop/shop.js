// Header and Subheader Animations
const header = document.querySelector("header");
const subheader = document.querySelector(".subheader");
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

if (header && subheader) {
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;
        const isScrolled = scrollPosition > 100;

        // Header Animation (Always Visible, but changes background when scrolling)
        if (scrollPosition > 50) {
            header.classList.add("sticky");
            header.style.background = "#ffffff";
            header.style.transform = "translateY(0)";
        } else {
            header.classList.remove("sticky");
            header.style.background = "transparent"; // Transparent when at the top
            header.style.boxShadow = "none";
            header.style.backdropFilter = "none";
        }

        // Subheader Animation (Appears smoothly when scrolled)
        if (isScrolled) {
            subheader.classList.add("show-subheader");
            subheader.style.transform = "translateY(0)";
            subheader.style.opacity = "1";
        } else {
            subheader.classList.remove("show-subheader");
            subheader.style.transform = "translateY(-20px)";
            subheader.style.opacity = "0";
        }
    });
}

// Mobile Menu Toggle
if (menu) {
    menu.onclick = () => {
        menu.classList.toggle("bx-x");
        navlist?.classList.toggle("open");
    };
}

window.onscroll = () => {
    menu?.classList.remove("bx-x");
    navlist?.classList.remove("open");
};

// Carousel Navigation
document.getElementById('next')?.addEventListener('click', function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').appendChild(lists[0]);
});

document.getElementById('prev')?.addEventListener('click', function(){
    let lists = document.querySelectorAll('.item');
    document.getElementById('slide').prepend(lists[lists.length - 1]);
});


// Product data

const products = {
    1: {
        name: "Traditionally Weaved Shoulder Bag",
        price: "₱1,200.00",
        oldPrice: "",
        brand: "Dangal Accessories",
        location: {
            name: "Cebu City, Philippines",
            url: "https://goo.gl/maps/3Z5g5F5Z5Zy"
        },
        description: "This Traditionally Weaved Shoulder Bag is a stunning representation of Filipino craftsmanship. Made from high-quality, handwoven materials, it features intricate patterns that reflect the rich cultural heritage of the Philippines. Perfect for everyday use or special occasions, this bag combines functionality with style, making it an essential accessory for anyone who appreciates artisanal products.",
        images: ["../mainimages/7.png"],
        reviews: "(24 reviews)"
    },
    2: {
        name: "Durian Candy",
        price: "₱150.00",
        oldPrice: "",
        brand: "Apo ni Lola",
        location: {
            name: "Davao City, Philippines",
            url: "https://goo.gl/maps/4Z5g5F5Z5Zy"
        },
        description: "Indulge in the unique flavor of our Durian Candy, crafted from the freshest durians sourced from the heart of Davao. This delightful treat captures the essence of the king of fruits, offering a sweet and creamy texture that melts in your mouth. Perfect for those who love adventurous flavors, this candy is a must-try for anyone visiting the Philippines or looking to experience a taste of its tropical delights.",
        images: ["../mainimages/9.png"],
        reviews: "(30 reviews)"
    },
    3: {
        name: "Kopi Juan",
        price: "₱200.00",
        oldPrice: "",
        brand: "Juan Kopi Inc.",
        location: {
            name: "Manila, Philippines",
            url: "https://goo.gl/maps/5Z5g5F5Z5Zy"
        },
        description: "Kopi Juan is a rich and aromatic coffee blend that showcases the best of Philippine coffee culture. Sourced from the finest coffee beans grown in the lush highlands, this brew offers a robust flavor profile with hints of chocolate and caramel. Perfect for coffee lovers, it can be enjoyed hot or iced, making it a versatile choice for any time of day. Experience the warmth and hospitality of the Philippines with every sip.",
        images: ["../mainimages/10.png"],
        reviews: "(15 reviews)"
    },
    4: {
        name: "Dried Pineapples",
        price: "₱250.00",
        oldPrice: "",
        brand: "Sweet Memories of Cebu",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/6Z5g5F5Z5Zy"
        },
        description: "Our Dried Pineapples are a delicious and healthy snack option that captures the sweet, tropical flavor of fresh pineapples. Carefully dried to preserve their natural sweetness and chewy texture, these treats are perfect for on-the-go snacking or as a delightful addition to your breakfast or dessert. Enjoy the taste of Cebu's finest pineapples, known for their exceptional quality and flavor.",
        images: ["../mainimages/11.png"],
        reviews: "(20 reviews)"
    },
    5: {
        name: "Dried Mangos",
        price: "₱300.00",
        oldPrice: "",
        brand: "Sweet Memories of Cebu",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/7Z5g5F5Z5Zy"
        },
        description: "Savor the tropical goodness of our Dried Mangos, made from the sweetest, ripest mangoes harvested at their peak. These dried slices are packed with flavor and nutrients, making them a perfect snack for any time of day. Whether you're hiking, traveling, or just relaxing at home, these dried mangos provide a delicious and healthy way to satisfy your sweet cravings.",
        images: ["../mainimages/12.png"],
        reviews: "(35 reviews)"
    },
    6: {
        name: "Sungka Table",
        price: "₱1,500.00",
        oldPrice: "",
        brand: "Dangal Handyworks",
        location: {
            name: "Laguna, Philippines",
            url: "https://goo.gl/maps/8Z5g5F5Z5Zy"
        },
        description: "Bring family and friends together with our beautifully crafted Sungka Table, a traditional Filipino game that provides hours of fun and entertainment. Made from high-quality wood, this table features a smooth finish and is designed to withstand the test of time. Perfect for gatherings, it encourages friendly competition and bonding, making it a wonderful addition to any home.",
        images: ["../mainimages/56.png"],
        reviews: "(10 reviews)"
    },
    7: {
        name: "Buko Pie",
        price: "₱220.00",
        oldPrice: "",
        brand: "El Mare",
        location: {
            name: "Laguna, Philippines",
            url: "https://goo.gl/maps/9Z5g5F5Z5Zy"
        },
        description: "Indulge in the delightful taste of our Buko Pie, a classic Filipino dessert made with fresh coconut meat and a flaky crust. Each pie is lovingly baked to perfection, offering a sweet and creamy filling that captures the essence of the tropics. Perfect for sharing with family and friends, this treat is a must-try for anyone looking to experience the flavors of the Philippines.",
        images: ["../mainimages/57.png"],
        reviews: "(18 reviews)"
    },
    8: {
        name: "Cassava Cake",
        price: "₱150.00",
        oldPrice: "",
        brand: "El Mare",
        location: {
            name: "Cavite, Philippines",
            url: "https://goo.gl/maps/10Z5g5F5Z5Zy"
        },
        description: "Our Cassava Cake is a deliciously moist and sweet dessert made from freshly grated cassava. Baked to perfection, this cake is a favorite among Filipinos and is often served during special occasions. With its rich flavor and unique texture, it’s a delightful treat that pairs perfectly with coffee or tea, making it a great addition to any gathering.",
        images: ["../mainimages/58.png"],
        reviews: "(22 reviews)"
    },
    9: {
        name: "Sweet Vinegar",
        price: "₱120.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Bataan, Philippines",
            url: "https://goo.gl/maps/11Z5g5F5Z5Zy"
        },
        description: "Our Sweet Vinegar is a versatile condiment that adds a tangy and sweet flavor to your dishes. Perfect for dipping, marinating, or dressing salads, this vinegar is made from high-quality ingredients to ensure the best taste. It’s a staple in many Filipino households, enhancing the flavors of traditional dishes and providing a delightful twist to modern recipes.",
        images: ["../mainimages/16.png"],
        reviews: "(15 reviews)"
    },
    10: {
        name: "Mushroom Cracklings",
        price: "₱200.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Baguio City, Philippines",
            url: "https://goo.gl/maps/12Z5g5F5Z5Zy"
        },
        description: "Crispy Mushroom Cracklings are a unique and delicious snack that offers a delightful crunch with every bite. Made from high-quality mushrooms, these cracklings are seasoned to perfection, making them an irresistible treat for any occasion. Enjoy them as a snack on their own or as a topping for your favorite dishes to add a savory twist.",
        images: ["../mainimages/17.png"],
        reviews: "(10 reviews)"
    },
    11: {
        name: "Unsweetened Tablea",
        price: "₱150.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Davao, Philippines",
            url: "https://goo.gl/maps/13Z5g5F5Z5Zy"
        },
        description: "Our Unsweetened Tablea is made from premium cacao beans sourced from Davao, perfect for making rich and flavorful hot chocolate. This traditional Filipino chocolate is ideal for baking and cooking, allowing you to create delicious desserts and beverages. Each pack contains pure, unsweetened chocolate discs that are versatile and easy to use.",
        images: ["../mainimages/59.png"],
        reviews: "(12 reviews)"
    },
    12: {
        name: "T'nalak Weaved Rugs",
        price: "₱1,800.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "South Cotabato, Philippines",
            url: "https://goo.gl/maps/14Z5g5F5Z5Zy"
        },
        description: "These T'nalak Weaved Rugs are exquisite pieces of art that showcase the rich cultural heritage of the T'boli people. Handcrafted using traditional weaving techniques, each rug features intricate designs and vibrant colors that tell a story. Perfect for adding a touch of elegance to your home, these rugs are not only beautiful but also durable, making them a great investment for any space.",
        images: ["../mainimages/19.png"],
        reviews: "(8 reviews)"
    },
    13: {
        name: "T'nalak Pillowcase",
        price: "₱600.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "South Cotabato, Philippines",
            url: "https://goo.gl/maps/15Z5g5F5Z5Zy"
        },
        description: "Add a touch of cultural elegance to your bedroom with our T'nalak Pillowcase. Made from high-quality T'nalak fabric, each pillowcase is intricately woven by skilled artisans, showcasing traditional designs that reflect the beauty of Filipino craftsmanship. Soft and durable, this pillowcase is perfect for enhancing your home decor while providing comfort and style.",
        images: ["../mainimages/20.png"],
        reviews: "(5 reviews)"
    },
    14: {
        name: "Alamang Bagoong",
        price: "₱100.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Pangasinan, Philippines",
            url: "https://goo.gl/maps/16Z5g5F5Z5Zy"
        },
        description: "Our Alamang Bagoong is a savory shrimp paste that is a staple in Filipino cuisine. Made from fresh shrimp and traditional fermentation methods, this bagoong adds a rich umami flavor to your dishes. Perfect for enhancing the taste of pinakbet, kare-kare, or as a dip for fresh vegetables, it’s a must-have condiment for any Filipino kitchen.",
        images: ["../mainimages/21.png"],
        reviews: "(20 reviews)"
    },
    15: {
        name: "Balikutsa",
        price: "₱80.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Ilocos Norte, Philippines",
            url: "https://goo.gl/maps/17Z5g5F5Z5Zy"
        },
        description: "Balikutsa is a traditional Ilocano delicacy made from sugarcane, known for its unique texture and sweet flavor. This delightful treat is perfect for those with a sweet tooth and is often enjoyed as a snack or dessert. Each piece is carefully crafted to ensure the perfect balance of sweetness and chewiness, making it a beloved favorite among locals and visitors alike.",
        images: ["../mainimages/22.png"],
        reviews: "(15 reviews)"
    },
    16: {
        name: "Skinless Longganisa",
        price: "₱250.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Bulacan, Philippines",
            url: "https://goo.gl/maps/18Z5g5F5Z5Zy"
        },
        description: "Our Skinless Longganisa is a delicious Filipino sausage made from high-quality pork and a blend of traditional spices. Known for its savory and slightly sweet flavor, this longganisa is perfect for breakfast or as an ingredient in various dishes. Enjoy it grilled, fried, or sautéed, and experience the authentic taste of Filipino cuisine.",
        images: ["../mainimages/24.png"],
        reviews: "(30 reviews)"
    },
    17: {
        name: "Special Chicharon",
        price: "₱300.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Cavite, Philippines",
            url: "https://goo.gl/maps/19Z5g5F5Z5Zy"
        },
        description: "Crispy Special Chicharon is a popular Filipino snack made from pork skin, expertly fried to achieve the perfect crunch. This delightful treat is often enjoyed on its own or paired with vinegar for dipping. With its rich flavor and satisfying texture, it’s a favorite among snack lovers and a must-try for anyone visiting the Philippines.",
        images: ["../mainimages/25.png"],
        reviews: "(25 reviews)"
    },
    18: {
        name: "Abaca Carpet Rugs",
        price: "₱1,200.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Samar, Philippines",
            url: "https://goo.gl/maps/20Z5g5F5Z5Zy"
        },
        description: "Handcrafted Abaca Carpet Rugs are a beautiful addition to any home, showcasing the natural beauty of abaca fibers. Each rug is meticulously woven by skilled artisans, featuring unique designs that reflect the rich cultural heritage of the Philippines. Durable and stylish, these rugs are perfect for adding warmth and character to your living space.",
        images: ["../mainimages/26.png"],
        reviews: "(10 reviews)"
    },
    19: {
        name: "Abaca Bags",
        price: "₱800.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Leyte, Philippines",
            url: "https://goo.gl/maps/21Z5g5F5Z5Zy"
        },
        description: "Stylish and eco-friendly Abaca Bags are perfect for everyday use. Made from sustainably sourced abaca fibers, these bags are not only fashionable but also durable and lightweight. Ideal for shopping, beach trips, or casual outings, they showcase the beauty of Filipino craftsmanship while promoting environmental sustainability.",
        images: ["../mainimages/27.png"],
        reviews: "(15 reviews)"
    },
    20: {
        name: "Capiz Chandelier",
        price: "₱3,500.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Capiz, Philippines",
            url: "https://goo.gl/maps/22Z5g5F5Z5Zy"
        },
        description: "This stunning Capiz Chandelier is a statement piece that adds elegance to any room. Made from natural capiz shells, it reflects light beautifully, creating a warm and inviting atmosphere. Perfect for dining rooms, living areas, or entryways, this chandelier showcases the artistry of Filipino craftsmanship and is sure to impress your guests.",
        images: ["../mainimages/28.png"],
        reviews: "(5 reviews)"
    },
    21: {
        name: "Lucban Longganisa",
        price: "₱250.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Quezon Province, Philippines",
            url: "https://goo.gl/maps/23Z5g5F5Z5Zy"
        },
        description: "Lucban Longganisa is a famous Filipino sausage known for its distinct flavor and aroma. Made from high-quality pork and a blend of spices, this longganisa is perfect for breakfast or as an ingredient in various dishes. Enjoy it grilled, fried, or sautéed, and experience the authentic taste of Filipino cuisine.",
        images: ["../mainimages/29.png"],
        reviews: "(20 reviews)"
    },
    22: {
        name: "Snack Bites",
        price: "₱150.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/24Z5g5F5Z5Zy"
        },
        description: "Our Snack Bites are a delightful mix of flavors and textures, perfect for on-the-go snacking. Made from high-quality ingredients, these bites are both delicious and satisfying, making them an ideal choice for busy individuals or families. Enjoy them during road trips, picnics, or as a quick snack at home.",
        images: ["../mainimages/30.png"],
        reviews: "(15 reviews)"
    },
    23: {
        name: "Abaca Mat",
        price: "₱1,000.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Samar, Philippines",
            url: "https://goo.gl/maps/25Z5g5F5Z5Zy"
        },
        description: "Our Abaca Mat is a versatile and stylish addition to any home. Handcrafted from natural abaca fibers, this mat is not only durable but also adds a touch of elegance to your living space. Perfect for use in entryways, kitchens, or as a decorative accent, it showcases the beauty of Filipino craftsmanship.",
        images: ["../mainimages/31.png"],
        reviews: "(10 reviews)"
    },
    24: {
        name: "Pearl Jewels",
        price: "₱1,500.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Palawan, Philippines",
            url: "https://goo.gl/maps/26Z5g5F5Z5Zy"
        },
        description: "Our Pearl Jewels are exquisite pieces of jewelry that highlight the natural beauty of pearls. Handcrafted by skilled artisans, each piece is unique and showcases intricate designs that reflect the rich cultural heritage of the Philippines. Perfect for special occasions or as a thoughtful gift, these jewels are a timeless addition to any jewelry collection.",
        images: ["../mainimages/32.png"],
        reviews: "(8 reviews)"
    },
    25: {
        name: "Clay Vase",
        price: "₱400.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Laguna, Philippines",
            url: "https://goo.gl/maps/27Z5g5F5Z5Zy"
        },
        description: "This beautifully handcrafted Clay Vase is perfect for displaying your favorite flowers or as a decorative piece in your home. Made from high-quality clay, each vase is unique and showcases the artistry of Filipino craftsmanship. Its elegant design makes it a great addition to any room, adding a touch of warmth and charm.",
        images: ["../mainimages/33.png"],
        reviews: "(12 reviews)"
    },
    26: {
        name: "Buri Palm Fan",
        price: "₱150.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Bohol, Philippines",
            url: "https://goo.gl/maps/28Z5g5F5Z5Zy"
        },
        description: "Stay cool in style with our Buri Palm Fan, handcrafted from natural buri palm leaves. This fan is not only functional but also a beautiful piece of art that showcases traditional Filipino craftsmanship. Lightweight and portable, it’s perfect for use at home or on the go, making it an essential accessory for warm days.",
        images: ["../mainimages/34.png"],
        reviews: "(20 reviews)"
    },
    27: {
        name: "Fried Dilis",
        price: "₱180.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Cavite, Philippines",
            url: "https://goo.gl/maps/29Z5g5F5Z5Zy"
        },
        description: "Crispy Fried Dilis are a popular Filipino snack that offers a delightful crunch with every bite. Made from high-quality fish, these dilis are seasoned to perfection, making them an irresistible treat for any occasion. Enjoy them as a snack on their own or as a topping for your favorite dishes to add a savory twist.",
        images: ["../mainimages/35.png"],
        reviews: "(15 reviews)"
    },
    28: {
        name: "Pili Nuts with Onions",
        price: "₱250.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Bicol Region, Philippines",
            url: "https://goo.gl/maps/30Z5g5F5Z5Zy"
        },
        description: "Our Pili Nuts with Onions are a delicious and savory snack that combines the rich flavor of pili nuts with the aromatic taste of onions. Perfect for munching on during movie nights or as a topping for salads and dishes, these nuts are packed with nutrients and provide a satisfying crunch.",
        images: ["../mainimages/36.png"],
        reviews: "(10 reviews)"
    },
    29: {
        name: "T'nalak Robes",
        price: "₱2,000.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "South Cotabato, Philippines",
            url: "https://goo.gl/maps/31Z5g5F5Z5Zy"
        },
        description: "Experience the beauty of T'nalak Robes, handcrafted by skilled artisans from the T'boli tribe. Each robe is made from high-quality T'nalak fabric, featuring intricate designs that reflect the rich cultural heritage of the Philippines. Perfect for special occasions or as a unique addition to your wardrobe, these robes are a true testament to Filipino craftsmanship.",
        images: ["../mainimages/37.png"],
        reviews: "(5 reviews)"
    },
    30: {
        name: "Cacao Beans",
        price: "₱300.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Davao, Philippines",
            url: "https://goo.gl/maps/32Z5g5F5Z5Zy"
        },
        description: "Our premium Cacao Beans are sourced from the lush plantations of Davao, known for producing some of the finest cacao in the world. Perfect for making rich chocolate or hot cocoa, these beans are a must-have for any chocolate lover. Each pack contains high-quality cacao beans that are sure to elevate your culinary creations.",
        images: ["../mainimages/38.png"],
        reviews: "(15 reviews)"
    },
    31: {
        name: "Long Dress with Tribal Patterns",
        price: "₱1,200.00",
        oldPrice: "",
        brand: "Dangal Fashion",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/33Z5g5F5Z5Zy"
        },
        description: "This Long Dress with Tribal Patterns is a stunning piece that showcases the vibrant culture of the Philippines. Made from lightweight fabric, it features intricate tribal designs that are both stylish and comfortable. Perfect for casual outings or special events, this dress is a beautiful addition to any wardrobe.",
        images: ["../mainimages/39.png"],
        reviews: "(10 reviews)"
    },
    32: {
        name: "Capiz Shell Lamps",
        price: "₱2,500.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Capiz, Philippines",
            url: "https://goo.gl/maps/34Z5g5F5Z5Zy"
        },
        description: "Illuminate your space with our exquisite Capiz Shell Lamps, handcrafted by skilled artisans. Each lamp is made from natural capiz shells, creating a beautiful play of light and shadow in your home. Perfect for adding a touch of elegance to any room, these lamps are a stunning representation of Filipino craftsmanship.",
        images: ["../mainimages/40.png"],
        reviews: "(8 reviews)"
    },
    33: {
        name: "Dream Catcher",
        price: "₱300.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Baguio City, Philippines",
            url: "https://goo.gl/maps/35Z5g5F5Z5Zy"
        },
        description: "Our Dream Catcher is a beautifully handcrafted piece that not only serves as a decorative item but also symbolizes protection and good dreams. Made from natural materials, each dream catcher features intricate designs and vibrant colors, making it a perfect addition to your home decor or a thoughtful gift for loved ones.",
        images: ["../mainimages/41.png"],
        reviews: "(12 reviews)"
    },
    34: {
        name: "Baro't Saya Dress",
        price: "₱1,500.00",
        oldPrice: "",
        brand: "Dangal Fashion",
        location: {
            name: "Quezon Province, Philippines",
            url: "https://goo.gl/maps/36Z5g5F5Z5Zy"
        },
        description: "The Baro't Saya Dress is a traditional Filipino attire that beautifully combines elegance and cultural heritage. Made from high-quality fabric, this dress features intricate embroidery and vibrant colors, making it perfect for special occasions or cultural events. Experience the beauty of Filipino fashion with this stunning piece.",
        images: ["../mainimages/42.png"],
        reviews: "(10 reviews)"
    },
    35: {
        name: "Handbags",
        price: "₱1,000.00",
        oldPrice: "",
        brand: "Dangal Fashion",
        location: {
            name: "Makati City, Philippines",
            url: "https://goo.gl/maps/37Z5g5F5Z5Zy"
        },
        description: "Our Handbags are stylish and functional accessories that are perfect for everyday use. Made from high-quality materials, these bags feature unique designs that reflect the artistry of Filipino craftsmanship. Whether you're heading to work or out for a casual day, these handbags are the perfect companion for any outfit.",
        images: ["../mainimages/43.png"],
        reviews: "(15 reviews)"
    },
    36: {
        name: "T'nalak Rugs",
        price: "₱1,800.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "South Cotabato, Philippines",
            url: "https://goo.gl/maps/38Z5g5F5Z5Zy"
        },
        description: "T'nalak Rugs are exquisite pieces of art that showcase the rich cultural heritage of the T'boli people. Handcrafted using traditional weaving techniques, each rug features intricate designs and vibrant colors that tell a story. Perfect for adding a touch of elegance to your home, these rugs are not only beautiful but also durable, making them a great investment for any space.",
        images: ["../mainimages/44.png"],
        reviews: "(8 reviews)"
    },
    37: {
        name: "Dried Mangos",
        price: "₱300.00",
        oldPrice: "",
        brand: "Sweet Memories of Cebu",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/39Z5g5F5Z5Zy"
        },
        description: "Our Dried Mangos are a deliciously sweet and chewy snack made from the finest mangoes harvested at their peak ripeness. Carefully dried to preserve their natural flavor and nutrients, these treats are perfect for on-the-go snacking or as a healthy addition to your breakfast or dessert. Enjoy the taste of the tropics with every bite.",
        images: ["../mainimages/45.png"],
        reviews: "(35 reviews)"
    },
    38: {
        name: "Nara Wood Acoustic Guitar",
        price: "₱15,000.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Cavite, Philippines",
            url: "https://goo.gl/maps/40Z5g5F5Z5Zy"
        },
        description: "This Nara Wood Acoustic Guitar is a beautifully crafted instrument that offers rich sound quality and stunning aesthetics. Made from high-quality Nara wood, it is perfect for musicians of all levels. Whether you're strumming at home or performing on stage, this guitar is designed to provide an exceptional playing experience.",
        images: ["../mainimages/46.png"],
        reviews: "(5 reviews)"
    },
    39: {
        name: "Buri Palm Basket",
        price: "₱500.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Bohol, Philippines",
            url: "https://goo.gl/maps/41Z5g5F5Z5Zy"
        },
        description: "Handcrafted from natural buri palm leaves, our Buri Palm Basket is both functional and stylish. Perfect for storage or as a decorative piece, this basket showcases the artistry of Filipino craftsmanship. Lightweight and durable, it’s ideal for organizing your home or for use during picnics and outings.",
        images: ["../mainimages/47.png"],
        reviews: "(10 reviews)"
    },
    40: {
        name: "Buri Palm Container",
        price: "₱400.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Laguna, Philippines",
            url: "https://goo.gl/maps/42Z5g5F5Z5Zy"
        },
        description: "Our Buri Palm Container is a versatile and stylish storage solution made from natural buri palm. Perfect for organizing your space, this container adds a touch of rustic charm to any room. Its durable construction ensures it can hold a variety of items, making it a practical addition to your home decor.",
        images: ["../mainimages/48.png"],
        reviews: "(12 reviews)"
    },
    41: {
        name: "Necklace Medallion",
        price: "₱600.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Palawan, Philippines",
            url: "https://goo.gl/maps/43Z5g5F5Z5Zy"
        },
        description: "This Necklace Medallion is a stunning piece of jewelry that highlights the natural beauty of pearls. Handcrafted by skilled artisans, each piece is unique and showcases intricate designs that reflect the rich cultural heritage of the Philippines. Perfect for special occasions or as a thoughtful gift, this medallion is a timeless addition to any jewelry collection.",
        images: ["../mainimages/49.png"],
        reviews: "(8 reviews)"
    },
    42: {
        name: "Dreamcatcher",
        price: "₱300.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Baguio City, Philippines",
            url: "https://goo.gl/maps/44Z5g5F5Z5Zy"
        },
        description: "Our Dreamcatcher is a beautifully handcrafted piece that not only serves as a decorative item but also symbolizes protection and good dreams. Made from natural materials, each dream catcher features intricate designs and vibrant colors, making it a perfect addition to your home decor or a thoughtful gift for loved ones.",
        images: ["../mainimages/50.png"],
        reviews: "(12 reviews)"
    },
    43: {
        name: "Tablea Chocolate",
        price: "₱250.00",
        oldPrice: "",
        brand: "Davao Delights",
        location: {
            name: "Davao, Philippines",
            url: "https://goo.gl/maps/45Z5g5F5Z5Zy"
        },
        description: "Our Tablea Chocolate is made from premium cacao beans sourced from Davao, perfect for making rich and flavorful hot chocolate. This traditional Filipino chocolate is ideal for baking and cooking, allowing you to create delicious desserts and beverages. Each pack contains high-quality cacao beans that are sure to elevate your culinary creations.",
        images: ["../mainimages/60.png"],
        reviews: "(15 reviews)"
    },
    44: {
        name: "Mini Dreamcatcher",
        price: "₱150.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/46Z5g5F5Z5Zy"
        },
        description: "This Mini Dreamcatcher is a charming decorative piece that adds a touch of whimsy to any space. Handcrafted with care, it features colorful threads and beads that create a beautiful visual effect. Perfect for hanging in bedrooms or living areas, it serves as a lovely reminder of dreams and positivity.",
        images: ["../mainimages/52.png"],
        reviews: "(12 reviews)"
    },
    45: {
        name: "Pickled Garlic",
        price: "₱120.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Bataan, Philippines",
            url: "https://goo.gl/maps/47Z5g5F5Z5Zy"
        },
        description: "Our Pickled Garlic is a tangy and flavorful condiment that enhances a variety of dishes. Made from fresh garlic cloves, this pickled version adds a delightful crunch and a burst of flavor to salads, sandwiches, and more. It’s a must-have for anyone who loves to add a zesty kick to their meals.",
        images: ["../mainimages/53.png"],
        reviews: "(10 reviews)"
    },
    46: {
        name: "Crispy Chicharon",
        price: "₱250.00",
        oldPrice: "",
        brand: "Dangal Foods",
        location: {
            name: "Cavite, Philippines",
            url: "https://goo.gl/maps/48Z5g5F5Z5Zy"
        },
        description: "Crispy Chicharon is a beloved Filipino snack made from pork skin, expertly fried to achieve the perfect crunch. This delightful treat is often enjoyed on its own or paired with vinegar for dipping. With its rich flavor and satisfying texture, it’s a favorite among snack lovers and a must-try for anyone visiting the Philippines.",
        images: ["../mainimages/54.png"],
        reviews: "(15 reviews)"
    },
    47: {
        name: "Kalinga Weaved Handbags",
        price: "₱1,200.00",
        oldPrice: "",
        brand: "Dangal Crafts",
        location: {
            name: "Kalinga, Philippines",
            url: "https://goo.gl/maps/49Z5g5F5Z5Zy"
        },
        description: "Kalinga Weaved Handbags are stylish and functional accessories that showcase the artistry of traditional weaving. Made from high-quality materials, these handbags are perfect for everyday use or special occasions. Each piece is unique, reflecting the rich cultural heritage of the Kalinga people and their craftsmanship.",
        images: ["../mainimages/55.png"],
        reviews: "(10 reviews)"
    },
    48: {
        name: "Yema Spread",
        price: "₱180.00",
        oldPrice: "",
        brand: "Sweet Delights",
        location: {
            name: "Cebu, Philippines",
            url: "https://goo.gl/maps/50Z5g5F5Z5Zy"
        },
        description: "Our Yema Spread is a deliciously sweet treat made from condensed milk and egg yolks, capturing the essence of traditional Filipino desserts. Perfect for spreading on toast, pancakes, or as a filling for pastries, this creamy spread is a delightful addition to any breakfast or snack. Enjoy the rich, sweet flavor that brings a taste of the Philippines to your table.",
        images: ["../mainimages/65.png"],
        reviews: "(12 reviews)"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart and wishlist arrays in localStorage if they don't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
    if (!localStorage.getItem('wishlist')) {
        localStorage.setItem('wishlist', JSON.stringify([]));
    }

    // Update cart count in the header
    updateCartCount();

    // Get modal element
    const modal = document.getElementById('productModal');
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Get close button
    const closeButton = document.querySelector('.close-modal');
    
    // Add click event to product cards
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking wishlist or quick-view buttons
            if (e.target.closest('.add-to-wishlist')) {
                e.preventDefault();
                return;
            }
            
            const productId = this.getAttribute('data-id');
            openProductModal(productId);
        });
        
        // Add cart functionality to quick-view button
        const quickViewBtn = card.querySelector('.add-to-wishlist');
        if (quickViewBtn) {
            quickViewBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productCard = this.closest('.product-card');
                const productId = productCard.dataset.id;
                const product = {
                    id: productId,
                    name: productCard.querySelector('.product-name').textContent,
                    price: productCard.querySelector('.product-price').textContent,
                    image: productCard.querySelector('img').src,
                    quantity: 1
                };
                
            
                showNotification(product.name + ' added to cart!');
                // Visual feedback
                this.classList.add('added-to-cart');
                setTimeout(() => {
                    this.classList.remove('added-to-cart');
                }, 1000);
            });
        }
    });
    
    // Add click event listeners to all "Add to Cart" buttons (if any)
    const addToCartButtons = document.querySelectorAll('.add-cart, .add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent opening the modal
            
            // Get the product container
            const productCard = this.closest('.product-card, .row-item, .product');
            
            // Extract product information
            const product = {
                id: productCard.dataset.id || generateProductId(),
                name: productCard.querySelector('h3, .product-title, .product-name').textContent,
                price: productCard.querySelector('.price, .product-price').textContent.trim(),
                image: productCard.querySelector('img').src,
                quantity: 1
            };
            
            // Add to cart
            addToCart(product);
            
            // Show confirmation message
            showNotification(product.name + ' added to cart!');
        });
    });
    
    // Add click event listeners to all heart/wishlist buttons
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist, .heart-icon, .bx-heart, .bxs-heart');
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent opening the modal
            
            // Toggle active/filled heart class
            this.classList.toggle('active');
            
            if (this.classList.contains('bx')) {
                this.classList.toggle('bxs-heart');
                this.classList.toggle('bx-heart');
            }
            
            // Get the product container
            const productCard = this.closest('.product-card, .row-item, .product');
            
            // Extract product information
            const product = {
                id: productCard.dataset.id || generateProductId(),
                name: productCard.querySelector('h3, .product-title, .product-name').textContent,
                price: productCard.querySelector('.price, .product-price').textContent.trim(),
                image: productCard.querySelector('img').src
            };
            
            // Add to cart AND toggle wishlist status
            addToCart(product);
            toggleWishlist(product);
            
            // Show confirmation message
    
        });
    });
    
   // Open product modal function
   function openProductModal(productId) {
    const product = products[productId];
    if (!product) return;

    // Populate modal with product data
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = product.price;
    document.getElementById('modalOldPrice').textContent = product.oldPrice;
    document.getElementById('modalProductBrand').textContent = product.brand;

    // Create a clickable link for the location
    const locationElement = document.getElementById('modalProductLocation');
    locationElement.innerHTML = `<a href="${product.location.url}" target="_blank" style="color: var(--text-color); text-decoration: underline;">${product.location.name}</a>`;

    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalReviews').textContent = product.reviews;
    document.getElementById('modalProductImage').src = product.images[0];

    // Store current product ID for add to cart from modal
    modal.setAttribute('data-current-product-id', productId);

    // ADDED CODE: Clear existing thumbnails and create new ones from product data
    const thumbnailContainer = document.querySelector('.product-thumbnails');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';

        // Create new thumbnails based on product images
        product.images.forEach((imagePath, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imagePath;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.className = 'thumbnail';
            if (index === 0) thumbnail.classList.add('active');

            // Add click event to change main image when clicked
            thumbnail.addEventListener('click', function() {
                document.getElementById('modalProductImage').src = imagePath;
                // Remove active class from all thumbnails
                document.querySelectorAll('.thumbnail').forEach(thumb => {
                    thumb.classList.remove('active');
                });
                // Add active class to clicked thumbnail
                this.classList.add('active');
            });

            thumbnailContainer.appendChild(thumbnail);
        });
    }

    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}
    
    // Close modal when clicking the close button
    closeButton?.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside modal content
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal function
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    }
    
    // Thumbnail functionality
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            document.getElementById('modalProductImage').src = this.src;
        });
    });
    
    // Quantity selector functionality
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    minusBtn?.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    plusBtn?.addEventListener('click', function() {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });
    
    // Size selection functionality
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sizeOptions.forEach(o => o.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
    
    // Add to cart functionality from modal
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    addToCartBtn?.addEventListener('click', function() {
        const productId = modal.getAttribute('data-current-product-id');
        const productData = products[productId];
        
        if (!productData) return;
        
        const product = {
            id: productId,
            name: document.getElementById('modalProductName').textContent,
            price: document.getElementById('modalProductPrice').textContent,
            image: document.getElementById('modalProductImage').src,
            quantity: parseInt(document.querySelector('.quantity-input').value) || 1
        };
        
        // Add to cart
        addToCart(product);
        
        // Show confirmation message
        showNotification(product.name + ' added to cart!');
    });
    
    // Buy now functionality
    const buyNowBtn = document.querySelector('.buy-now-btn');
    buyNowBtn?.addEventListener('click', function() {
        const productId = modal.getAttribute('data-current-product-id');
        const productData = products[productId];
        
        if (!productData) return;
        
        const product = {
            id: productId,
            name: productData.name,
            price: productData.price,
            image: productData.images[0],
            quantity: parseInt(document.querySelector('.quantity-input').value) || 1
        };
        
        // Add to cart
        addToCart(product);
        
        // Redirect to cart page
        window.location.href = '../Cart/cart.html';
    });

    // ENHANCED DYNAMIC PAGINATION
    const paginationProducts = document.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const paginationContainer = document.querySelector('.pagination');

    


    
    
    if (paginationContainer) {
        // Show products per page
        const productsPerPage = 12;
        let currentPage = 1;
        const totalProducts = paginationProducts.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);

        // Clear existing number buttons
        const existingNumberBtns = paginationContainer.querySelectorAll('.number-btn');
        existingNumberBtns.forEach(btn => {
            if (!btn.classList.contains('prev-btn') && !btn.classList.contains('next-btn')) {
                btn.remove();
            }
        });

        // Create new number buttons based on actual page count
        if (totalPages > 0) {
            const nextBtn = paginationContainer.querySelector('.next-btn');
            
            // Generate page number buttons
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'page-btn number-btn';
                pageBtn.setAttribute('data-page', i);
                pageBtn.textContent = i;
                
                if (i === 1) {
                    pageBtn.classList.add('active');
                }
                
                // Insert before next button
                paginationContainer.insertBefore(pageBtn, nextBtn);
                
                // Add click event
                pageBtn.addEventListener('click', function() {
                    currentPage = parseInt(this.dataset.page);
                    showPage(currentPage);
                });
            }
            
            // Only show pagination if there's more than one page
            paginationContainer.parentElement.style.display = totalPages > 1 ? 'block' : 'none';
        }
        
            // Center the pagination
            if (paginationContainer) {
                paginationContainer.style.display = 'flex';
                paginationContainer.style.justifyContent = 'center';
                paginationContainer.style.gap = '5px';
            }

            // Center the pagination container
            const paginationParent = paginationContainer.parentElement;
            if (paginationParent) {
                paginationParent.style.display = 'flex';
                paginationParent.style.justifyContent = 'center';
                paginationParent.style.margin = '40px 0';
            }

            // Style the pagination buttons for consistency
            const pageBtns = paginationContainer.querySelectorAll('button');
            pageBtns.forEach(btn => {
                btn.style.margin = '0 2px';
            });

        function showPage(pageNum) {
            // Calculate which products to show
            const startIndex = (pageNum - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            
            // Hide all products first
            paginationProducts.forEach(card => {
                card.style.display = 'none';
            });
            
            // Show only current page products
            for (let i = startIndex; i < endIndex && i < paginationProducts.length; i++) {
                paginationProducts[i].style.display = 'block';
            }
            
            // Update active button state
            const numberBtns = document.querySelectorAll('.number-btn');
            numberBtns.forEach(btn => {
                btn.classList.remove('active');
                if (parseInt(btn.dataset.page) === currentPage) {
                    btn.classList.add('active');
                }
            });
            
            // Enable/disable prev/next buttons
            if (prevBtn) prevBtn.disabled = currentPage === 1;
            if (nextBtn) nextBtn.disabled = currentPage === totalPages;
            
            // Scroll to top of product section (optional)
            const productSection = document.querySelector('.product-section');
            if (productSection) {
                productSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
        
        // Initialize first page
        if (paginationProducts.length > 0) {
            showPage(currentPage);
        }
        
        // Previous button click
        prevBtn?.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
        
        // Next button click
        nextBtn?.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    }

    // Check if products are in wishlist and update UI
    updateWishlistUI();
    
   
});

// Function to add product to cart
function addToCart(product) {
    // Get current cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product is already in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
        // Product exists in cart, increase quantity
        cart[existingProductIndex].quantity += product.quantity || 1;
    } else {
        // Product doesn't exist in cart, add it
        cart.push(product);
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in the header
    updateCartCount();
}

// Function to toggle product in wishlist
function toggleWishlist(product) {
    // Get current wishlist
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product is already in wishlist
    const existingProductIndex = wishlist.findIndex(item => item.id === product.id);
    
    if (existingProductIndex > -1) {
        // Product exists in wishlist, remove it
        wishlist.splice(existingProductIndex, 1);
    } else {
        // Product doesn't exist in wishlist, add it
        wishlist.push(product);
    }
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist UI
    updateWishlistUI();
}

// Function to update wishlist UI
function updateWishlistUI() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistButtons = document.querySelectorAll('.heart-icon, .bx-heart, .bxs-heart, .add-to-wishlist');
    
    wishlistButtons.forEach(button => {
        const productCard = button.closest('.product-card, .row-item, .product');
        const productId = productCard?.dataset.id;
        
        if (productId && wishlist.some(item => item.id === productId)) {
            // Product is in wishlist, show filled heart
            button.classList.add('active');
            if (button.classList.contains('bx')) {
                button.classList.add('bxs-heart');
                button.classList.remove('bx-heart');
            }
        } else {
            // Product is not in wishlist, show outline heart
            button.classList.remove('active');
            if (button.classList.contains('bx')) {
                button.classList.remove('bxs-heart');
                button.classList.add('bx-heart');
            }
        }
    });
}

// Function to update cart count in the header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Update the cart count element if it exists
    const cartCountElement = document.querySelector('.cart-count-badge');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        
        // Make sure it's visible if there are items
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

// Function to add cart count badge to the header
function addCartCountBadge() {
    const cartIcon = document.querySelector('.header-icons .bx-cart');
    if (cartIcon) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        // Create the badge if it doesn't exist
        let badge = document.querySelector('.cart-count-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cart-count-badge';
            cartIcon.parentNode.appendChild(badge);
            
            // Style the badge
            badge.style.position = 'absolute';
            badge.style.top = '-8px';
            badge.style.right = '-8px';
            badge.style.backgroundColor = '#8a8f70';
            badge.style.color = 'white';
            badge.style.fontSize = '12px';
            badge.style.width = '18px';
            badge.style.height = '18px';
            badge.style.borderRadius = '50%';
            badge.style.display = cartCount > 0 ? 'flex' : 'none';
            badge.style.alignItems = 'center';
            badge.style.justifyContent = 'center';
            badge.style.fontWeight = '600';
        }
        
        badge.textContent = cartCount;
    }
}

// Helper function to generate a unique ID for products that don't have one
function generateProductId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to show a notification
function showNotification(message) {
    // Check if notification container exists, if not create it
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
        
        // Style the notification container
        notificationContainer.style.position = 'fixed';
        notificationContainer.style.bottom = '20px';
        notificationContainer.style.right = '20px';
        notificationContainer.style.zIndex = '1000';
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Style the notification
    notification.style.backgroundColor = '#8a8f70';
    notification.style.color = 'white';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '4px';
    notification.style.marginTop = '10px';
    notification.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add this to your existing JavaScript code

// Function to filter products by brand
function filterProductsByBrand() {
    // Get the selected brand
    const selectedBrand = document.getElementById('brandFilter').value;
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Counter for visible products
    let visibleCount = 0;
    
    // Loop through all products
    productCards.forEach(card => {
        // Get the product ID
        const productId = card.getAttribute('data-id');
        
        // Get the product data
        const product = products[productId];
        
        // If product exists and (selected brand is "all" or matches the product brand)
        if (product && (selectedBrand === 'all' || product.brand === selectedBrand)) {
            card.style.display = 'block'; // Show the product
            visibleCount++;
        } else {
            card.style.display = 'none'; // Hide the product
        }
    });
    
    // Show message if no products found
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (noProductsMessage) {
        if (visibleCount === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
        }
    }
    
    // Reset pagination to first page after filtering
    if (typeof showPage === 'function') {
        currentPage = 1;
        showPage(1);
    }
}

// Function to populate brand dropdown
function populateBrandDropdown() {
    // Get the dropdown element
    const dropdown = document.getElementById('brandFilter');
    
    if (!dropdown) return;
    
    // Create a Set to store unique brands
    const brands = new Set();
    
    // Add all brands from products
    for (const id in products) {
        if (products[id].brand) {
            brands.add(products[id].brand);
        }
    }
    
    // Sort brands alphabetically
    const sortedBrands = Array.from(brands).sort();
    
    // Add "All Brands" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Brands';
    dropdown.appendChild(allOption);
    
    // Add each brand as an option
    sortedBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        dropdown.appendChild(option);
    });
    
    // Add change event listener
    dropdown.addEventListener('change', filterProductsByBrand);
}

// Initialize the brand filter when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add this to your existing DOMContentLoaded event handler
    populateBrandDropdown();
});

// Enhanced function to populate brand dropdown
function populateBrandDropdown() {
    // Get the dropdown element
    const dropdown = document.getElementById('brandFilter');
    
    if (!dropdown) return;
    
    // Create a Set to store unique brands
    const brands = new Set();
    
    // Add all brands from products
    for (const id in products) {
        if (products[id].brand) {
            brands.add(products[id].brand);
        }
    }
    
    // Sort brands alphabetically
    const sortedBrands = Array.from(brands).sort();
    
    // Add "All Brands" option
    const allOption = document.createElement('option');
    allOption.value = 'all';
    allOption.textContent = 'All Brands';
    dropdown.appendChild(allOption);
    
    // Add each brand as an option
    sortedBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        dropdown.appendChild(option);
    });
    
    // Add change event listener with animation
    dropdown.addEventListener('change', function() {
        // Add a subtle animation effect when changing
        this.classList.add('filter-changing');
        
        // Show loading state
        const productsContainer = document.querySelector('.product-container, .products-grid, .new-content');
        if (productsContainer) {
            productsContainer.style.opacity = '0.6';
            productsContainer.style.transition = 'opacity 0.3s ease';
        }
        
        // Slight delay to show animation
        setTimeout(() => {
            filterProductsByBrand();
            
            // Remove animation class
            this.classList.remove('filter-changing');
            
            // Restore opacity
            if (productsContainer) {
                productsContainer.style.opacity = '1';
            }
        }, 300);
    });
    
    // Add this class for animation
    const style = document.createElement('style');
    style.textContent = `
        .filter-changing {
            background-color: #f5f6f3;
        }
    `;
    document.head.appendChild(style);
}

// Function to filter products by brand (same as before)
function filterProductsByBrand() {
    // Get the selected brand
    const selectedBrand = document.getElementById('brandFilter').value;
    
    // Get all product cards
    const productCards = document.querySelectorAll('.product-card');
    
    // Counter for visible products
    let visibleCount = 0;
    
    // Loop through all products
    productCards.forEach(card => {
        // Get the product ID
        const productId = card.getAttribute('data-id');
        
        // Get the product data
        const product = products[productId];
        
        // If product exists and (selected brand is "all" or matches the product brand)
        if (product && (selectedBrand === 'all' || product.brand === selectedBrand)) {
            card.style.display = 'block'; // Show the product
            visibleCount++;
        } else {
            card.style.display = 'none'; // Hide the product
        }
    });
    
    // Show message if no products found
    const noProductsMessage = document.getElementById('noProductsMessage');
    if (noProductsMessage) {
        if (visibleCount === 0) {
            noProductsMessage.style.display = 'block';
        } else {
            noProductsMessage.style.display = 'none';
        }
    }
    
    // Reset pagination to first page after filtering
    if (typeof showPage === 'function' && typeof currentPage !== 'undefined') {
        currentPage = 1;
        showPage(1);
    }
}
