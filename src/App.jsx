import "./App.css";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouterLanding from "./RouterLanding";
import SessionOutGuard from "./guards/SessionOutGuard";
import AuthGuard from "./guards/AuthGuard";
import RouterSession from "./RouterSession";
import Login from "./views/Login";
import { Notification } from "./components/Notification";

export default function App() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BrowserRouter>
                <Notification />
                <Routes>
                    <Route path="/*" element={<RouterLanding />} />
                    <Route element={<SessionOutGuard />}>
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route path="/panel/*" element={<RouterSession />} />
                    </Route>
                    <Route path="*" element={<p>Page not found</p>} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
