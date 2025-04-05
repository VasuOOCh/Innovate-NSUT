import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <Navbar />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}
