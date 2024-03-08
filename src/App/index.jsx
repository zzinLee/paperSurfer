import Header from "../components/Header";

function App() {
  return (
    <div className="relative flex flex-col h-screen">
      <Header />
      <div className="relative z-0 h-full bg-slate-100"></div>
    </div>
  );
}

export default App;
