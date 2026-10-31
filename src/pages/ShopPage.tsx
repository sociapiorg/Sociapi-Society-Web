import { useState } from "react";
import { Container } from "../components/ui";
import { products, type Product } from "../data/secondary";

const DARAZ_SHIRT_URL = "https://www.daraz.pk/products/oversized-baggy-t-shirt-for-men-and-women-unisex-casual-streetwear-tee-i1981174376-s14069074976.html?";
const DARAZ_LAPTOP_SKIN_URL = "https://www.daraz.pk/products/i1981808757.html?spm=Seller_PK.24863640.table_online_product.1.1a2c2a97CIDRsh";

function isShirt(product: Product) {
  return product.category === "Official Society Wear";
}

function ProductView({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const shirt = isShirt(product);
  const laptopSkin = product.id === "laptop-skin";
  function handleAdd() {
    if (shirt || laptopSkin) {
      window.open(laptopSkin ? DARAZ_LAPTOP_SKIN_URL : DARAZ_SHIRT_URL, "_blank", "noopener,noreferrer");
    }
  }
  return <article className="shop-product">
    <div className="product-image"><img src={product.image} alt={product.name} /><span>{product.badge}</span></div>
    <div className="product-copy">
      <p>{product.category}</p><h2>{product.name}</h2><strong>Rs. {product.price.toLocaleString("en-US")}</strong><p>{product.description}</p>
      <ul>{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <fieldset><legend>Choose size</legend>{product.sizes.map(option => <button type="button" className={size === option ? "selected" : ""} key={option} onClick={() => setSize(option)}>{option}</button>)}</fieldset>
      <div className="quantity"><button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button><span>{qty}</span><button type="button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button></div>
      <button className="add-cart" onClick={handleAdd}>{shirt || laptopSkin ? "Buy on Daraz" : "Add to cart"}</button>
    </div>
  </article>;
}

export default function ShopPage() {
  return <>
    <section className="shop-hero-new"><Container>
      <p>SOCIAPI SHOP / OFFICIAL MERCHANDISE</p>
      <h1>Wear the<br />community.</h1>
      <div><p>Made-on-demand Sociapi merchandise for members, supporters, and campus teams.</p></div>
    </Container></section>
    <section className="shop-page"><Container><div className="shop-layout"><div>{products.map(product => <ProductView key={product.id} product={product} />)}</div>
    </div></Container></section>
  </>;
}
