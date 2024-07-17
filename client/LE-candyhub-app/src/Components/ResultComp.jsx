import { useContext, useEffect } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/SearchComp-style.module.css'

const ResultComp = () => {
    const { candySearch, setSearchTerm, handleSearch, searchAttempted, searchTerm, selectedCandy,
        modalOpen, quantity, openModal, closeModal, hadndleQuantity, handleAddToCart, handleBackToHomeClick
    } = useContext(CandyContext)

    console.log(candySearch)

    useEffect (() => {
        window.scrollTo(0, 0);
    }, [candySearch]);

    return (
        <div>
            <div className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 ${modalOpen ? 'block' : 'hidden'}`}></div>
            <button onClick={() => handleBackToHomeClick()} 
                className="btn bg-customBtnGreen rounded-full px-6 py-2 ml-40 mt-5 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow " >
                    &#8592; Back
            </button>
            <div className={styles.searchWrap}>
                <input 
                className={styles.resultInput} 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="What is your favorite candy?" />
                <button onClick={()=> handleSearch(searchTerm)} 
                className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow " >
                    Search
                </button>
            </div>
            <div>
                {candySearch?.length > 0 ? (
                    <div>
                        <h2 className={styles.h2Search}>Search result:</h2>
                        <div className={styles.resultWrap}>
                            <div className={styles.listWrap}>
                                {candySearch.map((candy, idx) => (
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
                        </div>
                    </div>
                ) : ( 
                    searchAttempted && <p>No candy found</p>
                )}

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
            
        </div>
      )
    }
    export default ResultComp;
