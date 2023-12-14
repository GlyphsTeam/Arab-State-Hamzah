import HeroNav from '../components/common/HeroNav'
import LookingFor from '../components/common/lookingFor/LookingFor'
import useAxios from "../hooks/useAxiosGet";
import { Helmet } from 'react-helmet'
const LookingForRentPage = () => {
  const url = `rents/web/looking_for`;
  const [Data] = useAxios(url);
  const lookingForData = Data?.data;
  return (
    <div>
      <Helmet>
        <title>{lookingForData?.slider?.main?.title}</title>
        <meta name='description' content={lookingForData?.slider?.main?.description}/>
      </Helmet>
      <HeroNav
        mainData={lookingForData?.slider}
        subData={lookingForData?.slider?.model}
      />
      <LookingFor data={lookingForData} pageType='rent' />

    </div>
  )
}

export default LookingForRentPage