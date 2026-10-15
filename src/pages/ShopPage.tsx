import { useMemo, useState, type FormEvent } from "react";
import { Container } from "../components/ui";
import { products, type Product } from "../data/secondary";
import { orderService, type CreateOrderInput } from "../services/orders";

type CartItem = { id: string; name: string; size: string; qty: number; price: number; image: string; gender: string; category: string };

const DARAZ_SHIRT_URL = "https://www.daraz.pk/products/oversized-baggy-t-shirt-for-men-and-women-unisex-casual-streetwear-tee-i1981174376-s14069074976.html?";

function isShirt(product: Product) {
  return product.category === "Official Society Wear";
}

function ProductView({ product, onAdd }: { product: Product; onAdd: (item: CartItem) => void }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const shirt = isShirt(product);
  function handleAdd() {
    if (shirt) {
      window.open(DARAZ_SHIRT_URL, "_blank", "noopener,noreferrer");
    } else {
      onAdd({ id: product.id, name: product.name, size, qty, price: product.price, image: product.image, gender: product.gender, category: product.category });
    }
  }
  return <article className="shop-product">
    <div className="product-image"><img src={product.image} alt={product.name} /><span>{product.badge}</span></div>
    <div className="product-copy">
      <p>{product.category}</p><h2>{product.name}</h2><strong>Rs. {product.price.toLocaleString("en-US")}</strong><p>{product.description}</p>
      <ul>{product.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <fieldset><legend>Choose size</legend>{product.sizes.map(option => <button type="button" className={size === option ? "selected" : ""} key={option} onClick={() => setSize(option)}>{option}</button>)}</fieldset>
      <div className="quantity"><button type="button" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button><span>{qty}</span><button type="button" onClick={() => setQty(qty + 1)} aria-label="Increase quantity">+</button></div>
      <button className="add-cart" onClick={handleAdd}>{shirt ? "Buy on Daraz" : "Add to cart"}</button>
    </div>
  </article>;
}

export default function ShopPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState(false);
  const subtotal = useMemo(() => cart.reduce((total, item) => total + item.price * item.qty, 0), [cart]);
  const delivery = subtotal ? 200 : 0;
  const total = subtotal + delivery;
  const hasNonShirtItems = useMemo(() => cart.some(item => item.category !== "Official Society Wear"), [cart]);
  function add(item: CartItem) {
    if (item.category === "Official Society Wear") return;
    setCart(current => {
      const index = current.findIndex(existing => existing.id === item.id && existing.size === item.size);
      if (index < 0) return [...current, item];
      const next = [...current];
      next[index] = { ...next[index], qty: next[index].qty + item.qty };
      return next;
    });
  }
  return <>
    <section className="shop-hero-new"><Container>
      <p>SOCIAPI SHOP / OFFICIAL MERCHANDISE</p>
      <h1>Wear the<br />community.</h1>
      <div><p>Made-on-demand Sociapi merchandise for members, supporters, and campus teams.</p><dl><div><dt>Delivery</dt><dd>Across Pakistan</dd></div><div><dt>Payment</dt><dd>Cash on delivery</dd></div><div><dt>Delivery fee</dt><dd>PKR 200</dd></div></dl></div>
    </Container></section>
    <section className="shop-page"><Container><div className="shop-layout"><div>{products.map(product => <ProductView key={product.id} product={product} onAdd={add} />)}</div>
      <aside><h2>Your cart <span>{cart.reduce((count, item) => count + item.qty, 0)}</span></h2>
        {cart.length === 0 ? <p className="cart-empty">Your cart is empty.</p> : cart.map(item => <article key={`${item.id}-${item.size}`}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{item.size} · Qty {item.qty}</p><b>Rs. {(item.price * item.qty).toLocaleString("en-US")}</b></div><button onClick={() => setCart(current => current.filter(existing => !(existing.id === item.id && existing.size === item.size)))} aria-label={`Remove ${item.name}`}>×</button></article>)}
        <dl><div><dt>Subtotal</dt><dd>Rs. {subtotal.toLocaleString("en-US")}</dd></div><div><dt>Delivery</dt><dd>Rs. {delivery.toLocaleString("en-US")}</dd></div><div><dt>Total</dt><dd>Rs. {total.toLocaleString("en-US")}</dd></div></dl>
        <button className="button" disabled={!cart.length || !hasNonShirtItems} onClick={() => setCheckout(true)}>Checkout</button><small>Delivery: PKR 200 · Cash on delivery</small>
      </aside>
    </div></Container></section>
    {checkout && hasNonShirtItems && <Checkout cart={cart} subtotal={subtotal} delivery={delivery} total={total} close={() => setCheckout(false)} done={() => { setCart([]); setCheckout(false); }} />}
  </>;
}

function Checkout({ cart, subtotal, delivery, total, close, done }: { cart: CartItem[]; subtotal: number; delivery: number; total: number; close: () => void; done: () => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    const data = new FormData(event.currentTarget);
    const payload: CreateOrderInput = { customer_name: String(data.get("name") || ""), phone: String(data.get("phone") || ""), email: String(data.get("email") || "") || null, country: "Pakistan", province: String(data.get("province") || ""), city: String(data.get("city") || ""), address: String(data.get("address") || ""), postal_code: String(data.get("postal") || ""), landmark: String(data.get("landmark") || "") || null, cart_items: cart.map(item => ({ name: item.name, gender: item.gender, size: item.size, quantity: item.qty, unit_price: item.price })), subtotal, delivery, total };
    try { const result = await orderService.createOrder(payload); setSuccess(`Order ${result.order_number} placed successfully.`); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "The order could not be saved."); }
    finally { setBusy(false); }
  }
  return <div className="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div><button className="modal-close" onClick={close} aria-label="Close checkout">×</button><h2 id="checkout-title">Delivery details</h2>
    {success ? <div className="order-success"><h3>Thank you.</h3><p>{success}</p><button className="button" onClick={done}>Close</button></div> : <form onSubmit={submit}>
      <label>Full name<input required name="name" autoComplete="name" /></label><label>Phone<input required name="phone" autoComplete="tel" /></label><label>Email<input name="email" type="email" /></label><label>Province<input name="province" /></label><label>City<input required name="city" /></label><label>Postal code<input name="postal" /></label>
      <label className="full">Complete address<textarea required name="address" /></label><label className="full">Landmark<input name="landmark" /></label>{error && <p className="order-error">{error}</p>}<div className="checkout-total">Total <b>Rs. {total.toLocaleString("en-US")}</b></div><button className="button" disabled={busy}>{busy ? "Saving order…" : "Place order"}</button><small>Orders are saved to the existing Sociapi Supabase order system.</small>
    </form>}
  </div></div>;
}
