import { useContext } from 'react';
import { CandyContext } from '../context/CandyContextProvider';

const Searchcomp = () => {
    const { allProducts } = useContext(CandyContext)

    console.log(allProducts)
  return (
    <div>
        <input type="text" placeholder="What is your favorite candy?" />
        <button>Search</button>
    </div>
  )
}
export default Searchcomp