import { useContext } from "react";

import { CandyContext } from "../context/CandyContextProvider";

const CategoryResultComp = () => {
    const { getByCategory, selectedCategory } = useContext(CandyContext);
    const products = getByCategory[selectedCategory] || [];

    return (
        <div>
            <h1>{selectedCategory}</h1>
            {products.map((candy, idx) => (
                <div className="card w-96 bg-base-100 shadow-xl m-4" key={idx} onClick={() => openModal(candy)} >
                    <div className="card-body">
                        <figure className="px-10 pt-10">
                            <img src={candy.image_path} alt="" className="rounded-xl" />
                        </figure>
                        {/* <img className={styles.candyImg} src={candy.image_path} alt="" /> */}
                        <h3 className="card-title">{candy.name}</h3>
                        <p>{candy.category}</p>
                        <p>Price: {candy.price}$</p>
                        <p>Stock: {candy.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default CategoryResultComp