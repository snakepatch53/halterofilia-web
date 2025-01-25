import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./session.components/Header";
import Sidebar from "./session.components/Sidebar";
import { ROUTES_SESSION } from "./common/constants";

const Home = lazy(() => import("./session.views/Home"));

export default function RouterSession() {
    return (
        <div className=" flex min-h-screen bg-[--c2] text-[--c2-txt] ">
            <Sidebar />
            <div className=" flex flex-col w-full ">
                <Header />
                <div className=" flex-1 ">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                            <Route path={ROUTES_SESSION.HOME} element={<Home />} />
                            <Route path={ROUTES_SESSION.USERS} element={<Home />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
