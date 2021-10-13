import React from 'react';
import { createWorker } from 'tesseract.js';
import MyImage from '../../assets/images/eng_bw.png';

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
            width: 300,
            height: 300
        }
        const worker = createWorker({
            logger: m => console.log(m),
        });
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(MyImage, { rectangle });
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