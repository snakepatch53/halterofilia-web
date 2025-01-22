import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import Header from "./landing.components/Header";
import Footer from "./landing.components/Footer";

const Home = lazy(() => import("./landing.views/Home"));

export default function RouterLanding() {
    return (
        <>
            <Header />
            <Suspense fallback={<p>Loading..</p>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    );
}
