import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthRoutes from "./AuthRoutes"
import NotFound from "../pages/NotFound"
import DarkToggle from "../pages/darkToggel"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {AuthRoutes()}

                {/* catche not found routes */}
                <Route path="/theme" element={<DarkToggle />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes