import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./session.components/Header";
import Sidebar from "./session.components/Sidebar";
import { ROUTES_SESSION } from "./common/constants";
import AdminGuard from "./guards/AdminGuard";

const Home = lazy(() => import("./session.views/Home"));
const Users = lazy(() => import("./session.views/Users"));
const Institutions = lazy(() => import("./session.views/Institutions"));
const Championships = lazy(() => import("./session.views/Championships"));
const ChampionshipCategories = lazy(() => import("./session.views/ChampionshipCategories"));

export default function RouterSession() {
    return (
        <div className=" flex min-h-screen bg-[--c2] text-[--c2-txt] ">
            <Sidebar />
            <div className=" flex flex-col w-full ">
                <Header />
                <div className=" flex-1 p-4 ">
                    <Suspense fallback={<p>Loading...</p>}>
                        <Routes>
                            <Route path={ROUTES_SESSION.HOME} element={<Home />} />
                            <Route element={<AdminGuard />}>
                                <Route path={ROUTES_SESSION.USERS} element={<Users />} />
                            </Route>
                            <Route path={ROUTES_SESSION.INSTITUTIONS} element={<Institutions />} />
                            <Route path={ROUTES_SESSION.CHAMPIONSHIPS} element={<Championships />} />
                            <Route path={ROUTES_SESSION.CHAMPIONSHIP_CATEGORIES} element={<ChampionshipCategories />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
