import { getCart } from "@/src/actions/cartController"
import { getProducts, getProductsFromCart } from "@/src/actions/productController"
import CartItem from "@/src/components/Cart/CartItem";
import CartTableLayout from "@/src/components/Cart/CartTableLayout";

export default async function Cart() {
    const cartData  = await getCart();
    const products = await getProductsFromCart(cartData)
    let total = 0
    for(let p in products){
        total += (products[p].product_price * products[p].product_qty)
    }

    return (
        <>
            <div className="container mx-auto p-10">
                <h1 className="text-3xl font-black mt-8">Warenkorb</h1>
                <CartTableLayout total={total} >{products.map(p => <CartItem product={p}></CartItem>)}</CartTableLayout>
            </div>
        </>
    )
}