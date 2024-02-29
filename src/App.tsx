import cocaLata from "./assets/coca300x300.png";
import aguaCrystal from "./assets/agua300x300.png";
import coca2L from "./assets/coca2l300x300.png";
import monster from "./assets/monster300x300.png";
import monstrerWhite from "./assets/monsterWhite.png";
import fantaUva from "./assets/fantaUva300x300.png";
import Mikes from "./assets/mikes300x300.png";
import IceTeaLeao from "./assets/iceTeaLeao300x300.png";
import DelValle from "./assets/delValle300x300.png";
import "./App.css";
import OpenCVImageCropper from "./components/openCVImageCropper";

interface Product {
  id: number;
  name: string;
  src: string;
  height: number;
  width: number;
}

function App() {
  const shelf: (Product | Product[])[] = [
    {
      id: 0,
      name: "Coca",
      src: cocaLata,
      height: 12.22,
      width: 6.62,
    },
    [
      {
        id: 1,
        name: "Coca",
        src: cocaLata,
        height: 12.22,
        width: 6.62,
      },
      {
        id: 2,
        name: "Coca",
        src: cocaLata,
        height: 12.22,
        width: 6.62,
      },
    ],
    {
      id: 3,
      name: "Monster",
      height: 15.7,
      width: 6.5,
      src: monster,
    },
    [
      {
        id: 4,
        name: "Monster",
        height: 15.7,
        width: 6.5,
        src: monster,
      },
      {
        id: 5,
        name: "Monster",
        height: 15.7,
        width: 6.5,
        src: monster,
      },
    ],
    {
      id: 6,
      name: "Monster White",
      height: 15.7,
      width: 6.5,
      src: monstrerWhite,
    },
    [
      {
        id: 7,
        name: "Monster White",
        height: 15.7,
        width: 6.5,
        src: monstrerWhite,
      },
      {
        id: 8,
        name: "Monster White",
        height: 15.7,
        width: 6.5,
        src: monstrerWhite,
      },
    ],
    {
      id: 9,
      name: "Agua Crystal",
      height: 22.3,
      width: 6.3,
      src: aguaCrystal,
    },
    {
      id: 10,
      name: "Coca 2L",
      height: 34.34,
      width: 10.4,
      src: coca2L,
    },
    {
      id: 11,
      name: "Fanta Uva",
      height: 12.2,
      width: 6.5,
      src: fantaUva,
    },
    [
      {
        id: 12,
        name: "Fanta Uva",
        height: 12.2,
        width: 6.5,
        src: fantaUva,
      },
      {
        id: 13,
        name: "Fanta Uva",
        height: 12.2,
        width: 6.5,
        src: fantaUva,
      },
    ],
    {
      id: 14,
      name: "Mikes",
      height: 21.5,
      width: 5.7,
      src: Mikes,
    },
    {
      id: 15,
      name: "Ice Tea Leao",
      height: 18.5,
      width: 6.1,
      src: IceTeaLeao,
    },
    {
      id: 16,
      name: "Del Valle",
      height: 21.3,
      width: 7.4,
      src: DelValle,
    },
  ];

  const scaleCmToPx = (cm: number) => cm * 5;

  return (
    <div className="shelf">
      {shelf.map((productOrProducts, index) => (
        <>
          {Array.isArray(productOrProducts) ? (
            <div className="column" key={index}>
              {productOrProducts.map((product) => (
                <OpenCVImageCropper
                  key={product.id}
                  src={product.src}
                  width={scaleCmToPx(product.width)}
                  height={scaleCmToPx(product.height)}
                />
              ))}
            </div>
          ) : (
            <div className="column" key={productOrProducts.id}>
              <OpenCVImageCropper
                src={productOrProducts.src}
                width={scaleCmToPx(productOrProducts.width)}
                height={scaleCmToPx(productOrProducts.height)}
              />
            </div>
          )}
        </>
      ))}
    </div>
  );
}

export default App;
