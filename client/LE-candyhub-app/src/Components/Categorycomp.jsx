import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';
import styles from '../Styles/CategoryComp-Style.module.css'

const Categorycomp = () => {
  const navigate = useNavigate()
  const { } = useContext(CandyContext)

  return (
    <div className={styles.categoryWrap}>
      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardPink" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./chocolate_bar.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Chocolate</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardLightGreen" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./licorice_twists.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Licorice</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardLightBlue" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./peanut_brittle.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Crunchy Candy</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardPurpul" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./cotton_candy.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Soft Candy</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardPurpul" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./sour_worms.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Gummies</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardDarkBlue" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./maple_nut_fudge.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Fudge</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardPink" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./fruit_drops.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title">Hard Candy</h3>
        </div>
      </div>

      <div className="card lg:card-side bg-base-100 shadow-xl m-4 bg-costomCardDarkGreen" >
        <div className="card-body items-center text-center">
          <figure className="px-10 pt-10">
            <img src="./all_candy.png" alt="" className="rounded-xl" />
          </figure>
          <h3 className="card-title"> Show All Candy</h3>
        </div>
      </div>
    </div>
  )
}
export default Categorycomp