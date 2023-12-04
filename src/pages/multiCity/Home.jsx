import Hero from "../../components/home/hero/Hero";
import About from "../../components/home/about/AboutUs";
import TryApp from "../../components/home/tryApp/TryApp";
import CategoryList from "../../components/home/category/CategoryList";
import Blog from "../../components/home/blog/Blog";
import Services from "../../components/home/jobs/Services";
import useAxios from "../../hooks/useAxiosGet";
import AdvBanner from "../../components/common/AdvBanner";
import CitySection from "../../components/multiCityComponent/citySection/CityList";


function Home({ baseURL }) {
    let urlId;


    const url = `home`;
    const [Data] = useAxios(url);
    const homeData = Data?.data;


    const cities = [
        {
            id: "1",
            cityName: "Dallas",
            value: "GA",
        },
        {
            id: "2",
            cityName: "Dallas2",
            value: "DA",
        },
    ]
    return (
        <>

            <Hero data={homeData?.hero} />

            {cities && (
                <CitySection data={homeData?.cities} />
            )}

            <About data={homeData?.about} />
            <AdvBanner data={homeData?.advertisements} />
            <CategoryList data={homeData?.category} urlId={urlId} />
            <Services data={homeData?.our_service?.model} />
            <TryApp data={homeData?.try_app} />
            <Blog data={homeData?.blogs} urlId={urlId} />
        </>

    );

}

export default Home;