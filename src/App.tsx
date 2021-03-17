import StatisticsPage from "./containers/StatisticsPage";
import * as React from 'react';
import Layout from "./components/Layout";
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Layout>
            <StatisticsPage />
        </Layout>
    </div>
  );
}

export default App;
