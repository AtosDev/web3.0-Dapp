// importing all the components from a single file jsx 
import { Navbar, Welcome, Footer, Loader, Services, Transactions } from "./components";

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
      <Navbar/>
      <Welcome/>
      </div>
      <Services/>
      <Transactions/>
      <Footer/>
    </div>
  );
}

export default App;
