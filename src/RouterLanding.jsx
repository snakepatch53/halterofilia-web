import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Header from "./landing.components/Header";
import Footer from "./landing.components/Footer";
import Sidebar from "./landing.components/Sidebar";
import SidebarRight from "./landing.components/SidebarRight";

const Home = lazy(() => import("./landing.views/Home"));

export default function RouterLanding() {
    return (
        <div className=" grid lg:grid-cols-[var(--sidebar-width)_1fr_var(--sidebar-width)] grid-rows-[var(--header-height)_1fr] w-full min-h-screen bg-c4 dark:bg-dark-c4 text-c4-txt dark:text-dark-c4-txt ">
            <Sidebar className=" lg:row-span-2 " />
            <Header className=" lg:col-span-2 " />
            <main className=" w-full max-w-[1000px] mx-auto flex flex-col px-[var(--container-padding)] pt-4 ">
                <Suspense fallback={<p>Loading..</p>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Suspense>
                <Footer className=" mt-auto " />
            </main>
            <SidebarRight className="  " />
        </div>
    );
}
