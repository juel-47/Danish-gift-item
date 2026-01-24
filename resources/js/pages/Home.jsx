import HeroSlider from "../components/home/HeroSlider";
// import PopularCategories from "../components/home/PopularCategories";
// import FeaturedProducts from "../components/home/FeaturedProducts";
// import LatestProducts from "../components/home/LatestProducts";
// import CustomerStories from "../components/home/CustomerStories";

const HomePage = ({sliders}) => {
    return (
        <>
            <HeroSlider sliders={sliders} />
            <PopularCategories />
            {/* <FeaturedProducts />
            <div className="p-0 m-0 w-full bg-gray">
                <Link to="/products">
                    <img src="/banner.svg" alt="" className="w-full" />
                </Link>
            </div>
            <LatestProducts /> */}
            {/* <CustomerStories /> */}
        </>
    );
};

export default HomePage;
