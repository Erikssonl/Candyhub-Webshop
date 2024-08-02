import { useContext, useEffect } from "react";
import { CandyContext } from "../context/CandyContextProvider";
import styles from '../Styles/CategoryResult-style.module.css'

const CategoryResultComp = () => {
    const { getByCategory, selectedCategory, selectedCandy,
        modalOpen, quantity, openModal, closeModal, hadndleQuantity, handleAddToCart, allProducts, handleBackToHomeClick 
    } = useContext(CandyContext);

    const products = selectedCategory ? getByCategory[selectedCategory] : allProducts;

    useEffect (() => {
        window.scrollTo(0, 0);
    }, [selectedCategory]);

    return (
        <div>
            
            <div className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 ${modalOpen ? 'block' : 'hidden'}`}></div>
            <button onClick={() => handleBackToHomeClick()} 
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-customBtnGreen rounded-full px-6 py-2 ml-10 sm:ml-20 md:ml-30 lg:ml-40 mt-5 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow">
                &#8592; Back
            </button>
            <h2 className={styles.h2Category}>{selectedCategory ? selectedCategory : 'All products'}</h2>
            <div className={styles.resultWrap}>
                <div className={styles.listWrap}>
                    {products.map((candy, idx) => (
                        <div className="card lg:card-side bg-base-100 shadow-xl m-4" key={idx} onClick={() => openModal(candy)} >
                            <div className="card-body">
                                <figure className="px-5 pt-5">
                                    <img src={candy.image_path} alt="" className="rounded-xl" />
                                </figure>
                                <h3 className="card-title">{candy.name}</h3>
                                <p>{candy.category}</p>
                                <p>Price: {candy.price}$</p>
                                <p>Stock: {candy.stock}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedCandy && (
                    <dialog id="my_modal_3" className="modal z-50" open>
                        <div className="modal-box">
                            <form method="dialog" onClick={closeModal}>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">×</button>
                            </form>
                            <figure className="px-10 pt-10">
                                <img src={selectedCandy.image_path} alt="" className="rounded-xl" />
                            </figure>
                            <h3 className="font-bold text-lg">{selectedCandy.name}</h3>
                            <p className="py-4">Price: {selectedCandy.price}$ - Stock: {selectedCandy.stock}</p>
                            <label>Quantity:</label>
                            <div className={styles.quantityWrap}>
                                <input
                                    className={styles.quantityInput}
                                    type="number"
                                    id="quantity"
                                    name='quantity'
                                    min="1"
                                    value={quantity}
                                    onChange={hadndleQuantity}
                                />
                                <button onClick={handleAddToCart}
                                    className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow ">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </dialog>
                )}
        </div>
    )
}
export default CategoryResultComp