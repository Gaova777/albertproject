export interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  material: string;
  image: string;
  fallback: string;
}

export const products: Product[] = [
  {
    id: 1,
    slug: "nocturno",
    name: "Buzo Nocturno",
    price: "$89.000",
    material: "Algodón premium 320g",
    image: "/images/buzo-1.jpg",
    fallback:
      "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 2,
    slug: "classic-hood",
    name: "Buzo Classic Hood",
    price: "$95.000",
    material: "Fleece perchado 340g",
    image: "/images/buzo-2.jpg",
    fallback:
      "https://images.pexels.com/photos/6311481/pexels-photo-6311481.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 3,
    slug: "urban-elite",
    name: "Buzo Urban Elite",
    price: "$109.000",
    material: "Heavyweight cotton 380g",
    image: "/images/buzo-3.jpg",
    fallback:
      "https://images.pexels.com/photos/6311394/pexels-photo-6311394.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 4,
    slug: "street-vision",
    name: "Buzo Street Vision",
    price: "$92.000",
    material: "Algodón orgánico 300g",
    image: "/images/buzo-4.jpg",
    fallback:
      "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 5,
    slug: "minimal-code",
    name: "Buzo Minimal Code",
    price: "$85.000",
    material: "French terry 280g",
    image: "/images/buzo-5.jpg",
    fallback:
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: 6,
    slug: "urban-flow",
    name: "Buzo Urban Flow",
    price: "$99.000",
    material: "Heavyweight cotton 380g",
    image: "/images/buzo-6.jpg",
    fallback:
      "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
];
