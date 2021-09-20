import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
// import MyImage from '../../assets/images/table.png';

function ImperativeTesseract() {
    const worker = createWorker({
        logger: m => console.log(m),
    });
    const doOCR = async () => {
        // const rectangle = {
        //     left: 15.401301518438178,
        //     top: 16.171003717472118,
        //     width: 4.772234273318872,
        //     height: 1.486988847583643
        // }
        const rectangle = {
            left: 1.735357917570499,
            top: 3.864734299516908,
            width: 10.195227765726681,
            height: 10.144927536231885
        }
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png', { rectangle });
        console.log("text", text)
        await worker.terminate();
        setOcr(text);
    };
    const [ocr, setOcr] = useState('Recognizing...');
    useEffect(() => {
        doOCR();
    });
    return (
        <div>
            <p>{ocr}</p>
        </div>
    );
}

export default ImperativeTesseract;
