import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/CategoryComp-Style.module.css'

const Categorycomp = () => {
  const navigate = useNavigate()
  const { categories, categoryColors, setSelectedCategory } = useContext(CandyContext)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    navigate('/category-result');
  }

  const handleShowAllCandy = () => {
    setSelectedCategory(null); 
    navigate('/category-result');  
  };

  return (
    <div>
      <div className={styles.h2Wrap}>
        <h2 className="text-5xl" >Shop by category</h2>
      </div>
      <div className={styles.categoryWrap}>
        {categories.map((category, idx) => (
          <div className={`card lg:card-side bg-base-100 shadow-xl m-4`} 
            style={{ backgroundColor: categoryColors[category.replace(/\s+/g, '')] }}
            key={idx} onClick={() => handleCategoryClick(category)}>
            <div className="card-body items-center text-center">
              <figure className="px-5 pt-5">
                <img src={`./${category}.png`} alt={category} className="rounded-xl" />
              </figure>
              <h3 className="card-title">{category}</h3>
            </div>
          </div>
        ))}
        <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardDarkGreen" onClick={handleShowAllCandy}>
          <div className="card-body items-center text-center">
            <figure className="px-5 pt-5">
              <img src="./all_candy.png" alt="" className="rounded-xl" />
            </figure>
            <h3 className="card-title"> Show All Candy</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Categorycomp
