import React from 'react';
import Tesseract from 'tesseract.js';
import MyImage from '../../assets/images/table.png';
// import MyImage from '../../assets/images/eng_bw.png';
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
        // const rectangle = {
        //     left: 15.401301518438178,
        //     top: 16.171003717472118,
        //     width: 4.772234273318872,
        //     height: 1.486988847583643
        // }
        let rectangle = {
            left: 18.841310388901654 / 100.0 * 2380,
            top: 10.700468583540482 / 100.0 * 3080,
            width: 11.266926997849922 / 100.0 * 2380,
            height: 2.0288393094942165 / 100.0 * 3080
        }
        Tesseract.recognize(MyImage, 'eng', { logger: m => console.log("m", m) })
            .then(({ data: { text } }) => {
                console.log("text", text);
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