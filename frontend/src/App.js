import PrivateRoute from "./utilities/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

import {
  BrowserRouter as Router,
  Route,
  Link, Routes
} from "react-router-dom";

function App() {
  return (
          <Router>
            <div className="App">
              <AuthProvider>
              <Header />
              <Routes>
                <Route exact path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<HomePage />} exact />
                </Route>
                <Route path="/login" element={<LoginPage />} />
              </Routes>
              </AuthProvider>
            </div>
          </Router>
  );
}

export default App;
