import React from 'react';
import './App.css';
// import FirstSimpleSample from './components/simplesample/FirstSimpleSample';
// import ImperativeTesseract from './components/imperative/ImperativeTesseract';
// import UploadImage from './components/upload/UploadImage';
// import TesseractWithLs from './components/withlabelstudio/TesseractWithLs';
import ImperativeWithClass from './components/imperativeWithClass/ImperativeWithClass';

function App() {
    return (
        <div className="App">
            {/* <FirstSimpleSample /> */}
            {/* <ImperativeTesseract /> */}
            {/* <UploadImage /> */}
            {/* <TesseractWithLs /> */}
            <ImperativeWithClass />
        </div>
    );
}

export default App;
