
import filterStyle from '../../assets/style/common/filteredPage.module.css'
import SquareMarketPlace from '../common/cards/SquareMarketPlaceCategoryCard';

function HouseSection({categoryData}) {

 
  return (
    <>
    <div className={`row ${filterStyle.circleRow}`}>
        {categoryData?.map((item, index)=>
              <SquareMarketPlace key={index} data = {item} />
        )}
    </div>
    </>
  )
}

export default HouseSection