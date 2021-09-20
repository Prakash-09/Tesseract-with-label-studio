import React from 'react';
import { createWorker } from 'tesseract.js';

export default class ImperativeWithClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageText: "Recognizing..."
        }
    }
    componentDidMount() {
        this.gettingTesseract()
    }
    async gettingTesseract() {
        const rectangle = {
            left: 1.735357917570499,
            top: 3.864734299516908,
            width: 10.195227765726681,
            height: 10.144927536231885
        }
        const worker = createWorker({
            logger: m => console.log(m),
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png', { rectangle: rectangle });
        console.log("text", text)
        await worker.terminate();
        this.setState({ imageText: text })
    }
    render() {
        const { imageText } = this.state;
        return (
            <div>
                {imageText}
            </div>
        );
    }
}