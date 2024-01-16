import HeroNav from "../components/common/HeroNav";
import useAxios from "../hooks/useAxiosGet";
import ForRentForm from "../components/JobRentForm/rentForm/ForRentForm";

const PostJobPage = ({ baseUrl }) => {
  const cityUrl = `rents/web/create_page`;
  const [Data] = useAxios(cityUrl);
  const rentPageData = Data?.data;
  
  return (
    <div>
      <HeroNav
        mainData={rentPageData?.slider}
        subData={rentPageData?.slider?.model}
      />

      <ForRentForm rentPageData={rentPageData} baseUrl={baseUrl} />
    </div>
  );
};

export default PostJobPage;
