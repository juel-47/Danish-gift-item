// Layout.jsx
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { usePage } from "@inertiajs/react";
import { useCartStore } from "../stores/cartStore";
import { useEffect } from "react";

const Layout = ({ children }) => {
    const { props } = usePage();
    const { cart } = props;

    const { setCart } = useCartStore();
    useEffect(() => {
        if (cart) {
            useCartStore.setState({
                cartCount: cart.count,
                total: cart.total,
            });
        }
    }, [cart]);
    return (
        <>
            <Header />
            <main className="overflow-x-hidden">{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
