import React from 'react';
import Tesseract from 'tesseract.js';
import MyImage from '../../assets/images/eng_bw.png';
// import MyImage from '../../assets/images/loremIpsum.JPG';

export default class FirstSimpleSample extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageData: "Recognizing..."
        }
    }

    componentDidMount() {
        this.buildTesseract()
    }
    buildTesseract() {

        Tesseract.recognize(MyImage, 'eng', { logger: m => console.log("m", m) })
            .then(({ data: { text } }) => {
                // console.log("text", text);
                this.setState({ imageData: text })
            }).catch(error =>
                console.log("error", error)
            )
    }


    render() {
        const { imageData } = this.state
        return (
            <div>
                {/* Hello test tesseract */}
                {imageData}
            </div>
        );
    }
}