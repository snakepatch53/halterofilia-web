import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./landing.components/Header";

const Home = lazy(() => import("./session.views/Home"));

export default function RouterSession() {
    return (
        <div>
            <Header />

            <Suspense fallback={<p>Loading...</p>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
        </div>
    );
}
