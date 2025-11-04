import cowImg from "../../../assets/images/cow.png";
import buffaloImg from "../../../assets/images/buffalo.png";
import goatImg from "../../../assets/images/goat.png";
import sheepImg from "../../../assets/images/sheep.png";
import oxImg from "../../../assets/images/ox.png";
import chickenImg from "../../../assets/images/chicken.png";
import horseImg from "../../../assets/images/horse.png";
import othersImg from "../../../assets/images/other.png";

export const cattleData = [
  { name: "Cow", image: cowImg },
  { name: "Buffalo", image: buffaloImg },
  { name: "Goat", image: goatImg },
  { name: "Sheep", image: sheepImg },
  { name: "Ox", image: oxImg },
  { name: "Chicken", image: chickenImg },
  { name: "Horse", image: horseImg },
  { name: "Others", image: othersImg },
];

export const breedOptions = {
  Cow: [
    "Gir",
    "HF",
    "Sahiwal",
    "Rathi",
    "Hariyana",
    "Jersey",
    "Thaparkar",
    "Sindhi",
    "Punganur",
    "Kankrej",
    "Mewati",
    "Vilwadri",
    "Vechur",
    "Odisha Desi",
    "Ongole",
    "Cheruvally",
    "Kasargod Kullun",
    "Kapila",
    "Deoni",
  ],
  Buffalo: ["Banni", "Jafarabadi", "Murrah", "Surti", "Nili"],
  Goat: [
    "Barbari",
    "Beetal",
    "Black Bengal",
    "Boer",
    "Jakhrana",
    "Jamunapari",
    "Kota",
    "Malabari",
    "Sirohi",
    "Sojat",
    "Sannen",
    "Gujri",
  ],
  Sheep: [
    "Bannur",
    "Coimbatore",
    "Deccani Sheep",
    "Gaddi",
    "NARI Suwarna",
    "Neelore Jodipi",
    "Sindhanoor",
  ],
  Ox: ["Brahma", "Ongole"],
  Chicken: [
    "Kadaknath - Kali Masi",
    "Aseel",
    "Chittagong - Malay",
    "Busra",
    "Nicobari",
    "White Leghorn",
    "Rhode Island Red",
    "Hybirds",
    "Broiler - Cornish",
  ],
  Horse: [],
  Others: [],
};
