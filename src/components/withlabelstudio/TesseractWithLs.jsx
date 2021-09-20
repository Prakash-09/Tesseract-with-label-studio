import React from 'react';
import './TesseractWithLs.css';
import sourceData from './AnnotationsData';
import { Row, Col, Button } from 'react-bootstrap'
import LabelStudio from 'label-studio';
import 'label-studio/build/static/css/main.css';

export default class TesseractWithLs extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            taskNavigation: 0,
            lsLegendLabels: [],
            response: [],
            interfacesData: ["update", "side-column", "controls", "submit"],
            taskData: [],
            showCreateLabelsModal: false,
            label: "",
            validateMsg: "",
        }
    }
    componentDidMount() {
        let taskNavigation = this.state.taskNavigation
        let responseData = sourceData.RESPONSE_DATA
        let interfacesData = this.state.interfacesData
        let taskData = this.state.taskData
        let filteredLegendLabels
        let unfilteredLegendLabels = []


        if (responseData.length !== 0) {
            for (const responseObj of responseData) {
                let taskObj = {
                    annotations: [{ id: `${responseData.indexOf(responseObj)}`, result: [] }],
                    data: { content1: responseObj.document?.length > 0 ? responseObj.document : "", content2: responseObj.documentSecondary?.length > 0 ? responseObj.documentSecondary : "" },
                    id: 1 + parseInt(`${responseData.indexOf(responseObj)}`),
                    predictions: [],
                    modified: responseObj.modified ? responseObj.modified : false,
                    annotationType: responseObj.annotation.type
                }
                if (responseObj.annotation?.entities) {
                    if (responseObj.annotation.entities.length !== 0) {
                        for (const entitiesObj of responseObj.annotation.entities) {
                            let labelObj = {
                                id: entitiesObj.label,
                                displayName: entitiesObj.label
                            }
                            unfilteredLegendLabels.push(labelObj)

                            let testObj = {
                                from_name: "label",
                                id: `${responseObj.annotation.entities.indexOf(entitiesObj)}${responseData.indexOf(responseObj)}1`,
                                to_name: "text",
                                type: "labels",
                                value: {
                                    end: entitiesObj.end,
                                    labels: [`${entitiesObj.label}`],
                                    start: entitiesObj.start,
                                    text: `${entitiesObj.text}`,
                                },
                            }
                            taskObj.annotations[0].result.push(testObj)
                        }
                    }
                }
                taskData.push(taskObj)
            }
            filteredLegendLabels = unfilteredLegendLabels.filter((value, idx, arr) => arr.findIndex(item => (JSON.stringify(item) === JSON.stringify(value))) === idx)
            if (filteredLegendLabels.length > 0) {
                for (const legend of filteredLegendLabels) {
                    legend.background = this.generateDynamicColor()
                }
            }
            this.buildLabelStudio(filteredLegendLabels, interfacesData, taskData, taskNavigation)

            this.setState({ response: responseData, taskData: taskData, lsLegendLabels: filteredLegendLabels })
        }

    }
    generateDynamicColor() {
        let uniqueNum = Math.floor(Math.random() * 0xfffff * new Date().getTime()).toString(16);
        let randomColor = "#" + uniqueNum.slice(0, 6);
        return randomColor
    }
    buildLabelStudio(lsLegendLabelsParam, interfacesDataParam, taskDataParam, taskNavId) {
        // console.log("taskDataParam", taskDataParam)
        const lsLegendLabels = lsLegendLabelsParam;
        const interfacesData = interfacesDataParam
        let taskData = taskDataParam
        let navigation = taskNavId
        new LabelStudio('label-studio', {
            config: this.lsConfigHtml(taskData, navigation, lsLegendLabels),
            interfaces: interfacesData,
            task: taskData[navigation],

            onLabelStudioLoad: function (LS) {
                var c = LS.annotationStore.addAnnotation({
                    userGenerate: true
                });
                LS.annotationStore.selectAnnotation(c.id);
            },
            onUpdateAnnotation: this.updateAnnotation.bind(this),
        });
    }
    lsConfigHtml(taskDataParam, navigationParam, lsLegendLabelsParam) {
        const taskData = taskDataParam
        const navigation = navigationParam
        const lsLegendLabels = lsLegendLabelsParam
        if (taskData[navigation].annotationType === "text") {
            return (
                `<View>
                    <Header value="Text labeling"/>
                    <Labels name="label" toName="text">
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </Labels>
                    <Text name="text" value="$content1" />
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "image rectangle") {
            return (
                `<View>
                    <Header value="Image rectangle labeling"/>
                    <RectangleLabels name="tag" toName="img">
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </RectangleLabels>
                    <Image name="img" value="$content1"></Image>
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "image polygon") {
            return (
                `<View>
                    <Header value="Image polygon labeling"/>
                    <PolygonLabels name="tag" toName="img" strokeWidth="3" pointSize="small" opacity="0.9">
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </PolygonLabels>
                    <Image name="img" value="$content1"></Image>
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "video") {
            return (
                `<View>
                    <Header value="Video labeling"/>
                    <Labels name="tricks" toName="audio">
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </Labels>
                    <HyperText name="video" value="$content2"/>
                    <AudioPlus name="audio" value="$content1" speed="false"/>
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "audio") {
            return (
                `< View >
                    <Header value="Audio labeling"/>
                    <Labels name="label" toName="audio">
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </Labels>
                    <AudioPlus name="audio" value="$content1"></AudioPlus>
                </View >`
            )
        }
        if (taskData[navigation].annotationType === "pairwise") {
            return (
                `<View>
                    <Header>Pairwise labeling</Header>
                    <Pairwise name="pw" toName="text1,text2" />
                    <Text name="text1" value="$content1" />
                    <Text name="text2" value="$content2" />
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "keypoints") {
            return (
                `<View>
                    <Header value="Keypoint labeling"/>
                    <KeyPointLabels name="label" toName="img" strokewidth="2" opacity="1" >
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </KeyPointLabels>
                    <Image name="img" value="$content1" zoom="true" zoomControl="true"></Image>
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "HTML NER") {
            return (
                `<View>
                    <Header value="HTML NER labeling"/>
                    <HyperTextLabels name="ner" toName="textner">
                        ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
                    </HyperTextLabels>
                    <View style="border: 1px solid #CCC; border-radius: 10px; padding: 5px">
                        <HyperText name="textner" value="$content1"/>
                    </View>
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "audio classification") {
            return (
                `<View>
                    <Header value="Audio classification labeling"/>
                    <Header value="Select its topic"/>
                    <Choices name="topic" toName="audio" choice="single-radio" showInline="true">
                        ${lsLegendLabels.map((item, itemIdx) => `<Choice key='${itemIdx}' value='${item.displayName}' />`)}
                    </Choices>
                    <Audio name="audio" value="$content1"/>
                </View>`
            )
        }
        if (taskData[navigation].annotationType === "text classification") {
            return (
                `<View>
                    <Header value="Text classification labeling"/>
                    <Choices name="sentiment" toName="text" choice="multiple">
                        ${lsLegendLabels.map((item, itemIdx) => `<Choice key='${itemIdx}' value='${item.displayName}' />`)}
                    </Choices>
                    <Text name="text" value="$content1"/>
                </View>`
            )
        }
    }
    updateAnnotation(ls, annotation) {
        // console.log("structure", annotation.serializeAnnotation())
        let taskData = JSON.parse(JSON.stringify(this.state.taskData))
        // let response = JSON.parse(JSON.stringify(this.state.response))
        const interfacesData = this.state.interfacesData
        let lsLegendLabels = this.state.lsLegendLabels
        let taskNavigation = this.state.taskNavigation
        // let selectedReponseObj = response[ls.task.id - 1]
        let selectedTask = taskData.filter(task => task.id === ls.task.id)[0]

        selectedTask.annotations[0].result = annotation.serializeAnnotation()
        console.log("selectedTask", selectedTask)

        // const requestOptions = {
        //     method: 'POST',
        //     body: JSON.stringify(payload)
        // }
        // window.fetch(url, requestOptions);

        // selectedReponseObj.annotation.entities = []

        // for (const resultObj of selectedTask.annotations[0].result) {
        //     if (resultObj.type === "labels") {
        //         let entityObj = {
        //             end: resultObj.value?.end,
        //             label: resultObj.value?.labels[0],
        //             start: resultObj.value?.start,
        //             text: resultObj.value?.text
        //         }
        //         selectedReponseObj.annotation.entities.push(entityObj)
        //     }
        // }
        // selectedTask.modified = true
        // console.log("response", response)
        this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, taskNavigation)

        // this.setState({ taskData: taskData, response: response })
        this.setState({ taskData: taskData })
    }
    navigateTask(type) {
        let { taskNavigation, response, taskData, lsLegendLabels, interfacesData } = this.state
        if (type === "next") {
            if (taskNavigation < response.length - 1) {
                let navIcrement = taskNavigation + 1
                this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, navIcrement)
                this.setState({ taskNavigation: navIcrement })
            }
        }
        if (type === "prev") {
            if (taskNavigation > 0) {
                let navDecrement = taskNavigation - 1
                this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, navDecrement)
                this.setState({ taskNavigation: navDecrement })
            }
        }
    }
    addLabel() {
        let lsLegendLabels = this.state.lsLegendLabels
        const interfacesData = this.state.interfacesData
        let label = this.state.label
        let taskData = this.state.taskData
        let taskNavigation = this.state.taskNavigation

        if (label) {
            let labelExisting = lsLegendLabels.filter(legend => legend.displayName.toLowerCase() === label.toLowerCase())
            if (labelExisting.length === 0) {
                let labelObj = {
                    id: label,
                    displayName: label,
                    description: label,
                    background: this.generateDynamicColor(),
                }
                lsLegendLabels.push(labelObj)
                this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, taskNavigation)
                this.setState({ lsLegendLabels: lsLegendLabels, taskData: taskData, taskNavigation: taskNavigation, showCreateLabelsModal: false, label: "", validateMsg: "" })
            } else {
                console.log("labelExisting existence", labelExisting)
                this.setState({ validateMsg: "It is already exist" })
            }
        } else {
            console.log("no label")
            this.setState({ validateMsg: "Please enter label name" })
        }
    }
    render() {
        const { response, taskNavigation, showCreateLabelsModal, label, validateMsg } = this.state
        const selectedTaskObj = response[taskNavigation]
        return (
            <div>
                <Row className="p-3">
                    <Col className="text-right">
                        <i className="fa fa-arrow-left m-3" onClick={this.navigateTask.bind(this, "prev")} />
                        <i className="fa fa-arrow-right m-3" onClick={this.navigateTask.bind(this, "next")} />
                    </Col>
                    <Col className="text-right" xs="auto">
                        <Button variant="primary" onClick={() => this.setState({ showCreateLabelsModal: true })}> + Add Labels </Button>
                        {/* {actionButton(dashboardItemData[taskNavigation]?.annotation?.status === 'COMPLETED' ? 'Completed' : 'Mark as complete', this.onSaveAndCompleteClick.bind(this), 'btn btn-sm', 'feather icon-check-circle', true, dashboardItemData[taskNavigation]?.annotation?.status === 'COMPLETED' ? true : false, dashboardItemData[taskNavigation]?.annotation?.status === 'COMPLETED' ? ACTION_BUTTON.WARNING : ACTION_BUTTON.PRIMARY)} */}
                        {showCreateLabelsModal &&
                            <div className="create-labels-modal">
                                <input type="text" className="form-control border-0 shadow-none" placeholder="Enter Label name" value={label} onChange={(e) => this.setState({ label: e.target.value, validateMsg: "" })} />
                                <button type="button" className="close-labels-modal" aria-label="Close" onClick={() => this.setState({ showCreateLabelsModal: false, label: "", validateMsg: "" })}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <button type="button" className="close-labels-modal save-labels-modal ml-3" onClick={() => this.addLabel()}>
                                    <i className="fa fa-check text-primary" aria-hidden="true"></i>
                                </button>
                                {validateMsg && <small className="text-danger">{validateMsg}</small>}
                            </div>
                        }
                    </Col>
                </Row>
                <div id="label-studio"></div>
                <div className="pb-5">
                    <h5>User Feedback</h5>
                    <Row className="m-0">
                        <Col className="p-0">
                            <div className="user-feedback-container">
                                {selectedTaskObj?.comments?.map((comment, commentIdx) =>
                                    <p key={commentIdx}>
                                        <span className="font-weight-bold">{comment.commentedBy} - </span>
                                        {comment.comment}
                                        <span className="text-muted pl-2">{comment.commentedAt}</span>
                                    </p>
                                )}
                            </div>
                        </Col>
                        <Col xs="auto"><div className="empty-div"></div></Col>
                    </Row>
                </div>
            </div>
        );
    }
}