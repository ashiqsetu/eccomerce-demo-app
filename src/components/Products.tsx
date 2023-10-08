import Product from "./Product";

function Products ({filterProducts}: any) {
    return       
        <>
            <div className="product-filtering">
                <button className={selectedCategory === 'all' ? 'active' : ''} onClick={() => handleCategoryClick("all")}>All</button>
                <button className={selectedCategory === 'men' ? 'active' : ''} onClick={() => handleCategoryClick("men")}>Men</button>
                <button className={selectedCategory === 'women' ? 'active' : ''} onClick={() => handleCategoryClick("women")}>Women</button>
                <button className={selectedCategory === 'child' ? 'active' : ''} onClick={() => handleCategoryClick("child")}>Child</button>
            </div>
            <div className='product-list'>
                {filterProducts.map((product, index) => (
                    <Product key={product.id} product={product, index}></Product>
                ))}
            </div>;
        </>;
}

export default Products;