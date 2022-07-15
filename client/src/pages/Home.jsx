import Announcement from '../components/announcement';
import Navbar from '../components/navbar';
import Slider from '../components/slider';
import Categories from '../components/categories';
import Products from '../components/products';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';

const Home = () => {
    return (
        <div>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            <Newsletter />
            <Footer />
        </div>
    );
}

export default Home;