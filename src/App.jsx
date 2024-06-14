import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideHeader from "./components/SideHeader";
import HomePage from "./pages/HomePage";
import ReviewDetails from "./pages/ReviewDetails";
import Category from "./pages/Category";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
})
export default function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App">
          <SideHeader />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:id" element={<ReviewDetails />} />
            <Route path="/category/:id" element={<Category />} />
          </Routes>
        </div>
      </ApolloProvider>
    </Router>
  );
}
