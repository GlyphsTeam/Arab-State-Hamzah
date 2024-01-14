
import filterStyle from '../../assets/style/common/filteredPage.module.css'
import SquareMarketPlace from '../common/cards/SquareMarketPlaceCategoryCard';
import { useSelector } from 'react-redux';
import { marketState } from '../../redux/Market/market';

function HouseSection() {

  const marketPlace = useSelector(marketState)

  return (
    <>
      <div className={`row ${filterStyle.circleRow}`}>
        {marketPlace?.marketPlace?.map((item, index) =>
          <SquareMarketPlace key={index} data={item} />
        )}
      </div>
    </>
  )
}

export default HouseSection