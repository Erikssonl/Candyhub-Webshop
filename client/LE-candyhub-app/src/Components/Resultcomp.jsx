import { useContext, useState } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/Searchcomp-style.module.css'

const Resultcomp = () => {
    const { candySearch, setSearchTerm, handleSearch, searchAttempted, searchTerm, addToCart } = useContext(CandyContext)

    const [selectedCandy, setSelectedCandy] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const openModal = (candy) => {
        setSelectedCandy(candy);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCandy(null);
        setModalOpen(false)
        setQuantity(1)
    }

    const hadndleQuantity = (e) => {
        setQuantity(parseInt(e.target.value));
    }

    const handleAddToCart = () => {
        if (selectedCandy) {
            addToCart({ ...selectedCandy, quantity});
            closeModal();
        }
    }

    return (
        <div>
            <div className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-50 ${modalOpen ? 'block' : 'hidden'}`}></div>
            <div className={styles.searchWrap}>
                <input 
                className={styles.input} 
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
                        <h2 className={styles.h2Search}>Sökresultat:</h2>
                        <div className={styles.resultWrap}>
                            <div className={styles.listWrap}>
                                {candySearch.map((candy, idx) => (
                                    <div className="card w-96 bg-base-100 shadow-xl m-4" key={idx} onClick={() => openModal(candy)} >
                                        <div className="card-body">
                                            {/* (här kommer jag lägga en egen bild) */}
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
                            <h3 className="font-bold text-lg">{selectedCandy.name}</h3>
                            <p className="py-4">Price: {selectedCandy.price}$</p>
                            <p className="py-4">Stock: {selectedCandy.stock}</p>
                            <div className={styles.quantityWrap}>
                                <label>Quantity:</label>
                                <input
                                    className={styles.input}
                                    type="number"
                                    id="quantity"
                                    name='quantity'
                                    min="1"
                                    value={quantity}
                                    onChange={hadndleQuantity}
                                />
                            </div>
                            <button onClick={handleAddToCart}
                                className="btn bg-customBtnGreen rounded-full px-6 py-2 font-semibold hover:bg-green-300 transition-colors shadow-btnShadow ">
                                Add to cart
                            </button>
                        </div>
                    </dialog>
                )}
            </div>
            
        </div>
      )
    }
    export default Resultcomp;