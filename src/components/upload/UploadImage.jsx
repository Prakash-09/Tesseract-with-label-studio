import React from 'react';
import Tesseract from 'tesseract.js';
import { Row, Col } from 'react-bootstrap';

export default class UploadImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageViewer: "",
            imageData: "Here image text"
        }
    }

    imageChange(e) {
        e.preventDefault();
        let image = e.target.files[0];
        this.setState({
            imageViewer: URL.createObjectURL(image)
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        let myImage = this.state.imageViewer
        Tesseract.recognize(myImage, 'eng', { logger: m => console.log("m", m) })
            .then(({ data: { text } }) => {
                this.setState({ imageData: text })
            }).catch(error =>
                console.log("error", error)
            )
    }

    render() {
        const { imageData, imageViewer } = this.state;
        return (
            <div className="previewComponent">
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <input className="fileInput" type="file" onChange={this.imageChange.bind(this)} />
                    <button className="submitButton" type="submit" >Get text from image</button>
                </form>
                <Row className="mt-3">
                    <Col>
                        <div className="imagePreview">
                            {imageViewer ?
                                <img src={imageViewer} alt="viewerImg" height="300px" width="300px" />
                                :
                                <div className="previewText">Please select an image for preview</div>
                            }
                        </div>
                    </Col>
                    <Col><div className="imageText">{imageData}</div></Col>
                </Row>
            </div>
        );
    }
}