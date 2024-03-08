import Header from "../components/Header";
import CollectionSidebar from "../components/CollectionSidebar";

function App() {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className="relative z-0 h-full bg-slate-100">
        <CollectionSidebar />
      </div>
    </div>
  );
}

export default App;
