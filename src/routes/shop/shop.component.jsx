import { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.components";
import "./shop.styles.scss"
const Shop = () => {
    const {products} = useContext(ProductsContext)
    console.log('Products', products)
    return (
        <div className="products-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}

export default Shop;