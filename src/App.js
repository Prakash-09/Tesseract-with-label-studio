import React from 'react';
import './App.css';
// import FirstSimpleSample from './components/simplesample/FirstSimpleSample';
// import ImperativeTesseract from './components/imperative/ImperativeTesseract';
// import UploadImage from './components/upload/UploadImage';
import TesseractWithLs from './components/withlabelstudio/TesseractWithLs';

function App() {
    return (
        <div className="App">
            {/* <FirstSimpleSample /> */}
            {/* <ImperativeTesseract /> */}
            {/* <UploadImage /> */}
            <TesseractWithLs />
        </div>
    );
}

export default App;
