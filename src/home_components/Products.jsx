import Product from "../home_components/product";
import { useSelector } from "react-redux";

const Products = ({ innerPage, products }) => {

    const allProductsRaw = useSelector(state => state.api.products);
    const allProducts = allProductsRaw || [];
    const finalProducts = products || allProducts;

    return (
        <div className="py-10 px-10">
            {!innerPage && <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-stone-800">
                Our Products
            </h2>}
            <div className="flex flex-wrap justify-center gap-20">
                {Array.isArray(finalProducts) && finalProducts.length > 0 &&
                    finalProducts.slice(0, 8).map(item => (
                        <Product key={item.id} index={item.id} data={item} />
                    ))
                }
            </div>
        </div>
    );
};

export default Products;
