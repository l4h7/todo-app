"use server"
export default async function CartDropDown(props){
    return (
        <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">{props?.itemCount} Produkt{props?.itemCount > 1 ? "e" : ""}</span>
          <span className="text-blue-600">Preis: {props?.cartTotal}</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">Zum Warenkorb</button>
          </div>
        </div>
      </div>
    )
}

/*
SELECT sum(product_price * carts.cart_qty) FROM products INNER JOIN carts 
ON carts.cart_product_id = products.product_id
WHERE carts.cart_user_id = 2;
 */