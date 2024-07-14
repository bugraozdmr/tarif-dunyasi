import { Billboard } from "./types";

import Baklava from "@/public/billboardImages/baklava.png"
import Icecek from "@/public/billboardImages/icecekler.jpg"
import Kahvalti from "@/public/billboardImages/kahvalti.jpg"
import Ana from "@/public/billboardImages/pizza.jpg"
import Atistirmalik from "@/public/billboardImages/atistirmalik.jpg"

export const Billboards : Billboard[] = [
    {
        label : "Tatlı mı tatlı tarifler",
        imageUrl : Baklava.src ,
        name : "tatlilar"
    },
    {
        label : "Tam yemelik tarifler",
        imageUrl : Ana.src ,
        name : "ana-yemekler"
    },
    {
        label : "Yemeğin üstüne ne içsek ?",
        imageUrl : Icecek.src ,
        name : "icecekler"
    },
    {
        label : "Hızlı ve güzel bir şeyler mi lazım ?",
        imageUrl : Atistirmalik.src ,
        name : "atistirmaliklar"
    },
    {
        label : "Güne güzel başlamanın sırrı tarifler",
        imageUrl : Kahvalti.src ,
        name : "kahvalti"
    }
]