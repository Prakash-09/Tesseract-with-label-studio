import React, { Component } from 'react';
import './LabelAnnotations.scss';
import { Row, Col } from 'reactstrap';
import { actionButton, ACTION_BUTTON } from '../../../../studio/utils/StudioUtils';
import { annotationService } from '../../../services/AnnotationService';
import { notifyError, notifySuccess } from '../../../../studio/utils/Notifications';
import LabelStudio from 'label-studio';
import 'label-studio/build/static/css/main.css';


export default class Labelannotations extends Component {
    constructor(props) {
        super(props)

        this.state = {
            taskNavigation: 0,
            lsLegendLabels: [],
            dashboardItemData: [],
            interfacesData: ["update", "controls", "submit"],
            taskData: [],
            showCreateLabelsModal: false,
            label: "",
            validateMsg: "",
        }
    }

    componentDidMount() {
        let { taskData, taskNavigation, interfacesData } = this.state;
        const { dashboardItem } = this.props;
        let filteredLegendLabels
        let unfilteredLegendLabels = []

        if (dashboardItem.data?.length > 0) {
            for (const dashboardItemDataObj of dashboardItem.data) {
                let taskObj = {
                    annotations: [{ id: `${dashboardItem.data.indexOf(dashboardItemDataObj)}`, result: [] }],
                    data: { text: dashboardItemDataObj.document, },
                    id: 1 + parseInt(`${dashboardItem.data.indexOf(dashboardItemDataObj)}`),
                    predictions: [],
                    modified: dashboardItemDataObj.modified ? dashboardItemDataObj.modified : false
                }
                if (dashboardItemDataObj.annotation?.entities) {
                    if (dashboardItemDataObj.annotation.entities.length !== 0) {
                        for (const entitiesObj of dashboardItemDataObj.annotation.entities) {
                            let labelObj = {
                                id: entitiesObj.label,
                                displayName: entitiesObj.label
                            }
                            unfilteredLegendLabels.push(labelObj)

                            let resultObj = {
                                from_name: "label",
                                id: `${dashboardItemDataObj.annotation.entities.indexOf(entitiesObj)}${dashboardItem.data.indexOf(dashboardItemDataObj)}1`,
                                to_name: "text",
                                type: "labels",
                                value: {
                                    end: entitiesObj.end,
                                    labels: [`${entitiesObj.label}`],
                                    start: entitiesObj.start,
                                    text: `${entitiesObj.text}`,
                                },
                            }
                            taskObj.annotations[0].result.push(resultObj)
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

            this.setState({ dashboardItemData: dashboardItem.data, taskData: taskData, lsLegendLabels: filteredLegendLabels })
        }
    }
    generateDynamicColor() {
        let uniqueNum = Math.floor(Math.random() * 0xfffff * new Date().getTime()).toString(16);
        let randomColor = "#" + uniqueNum.slice(0, 6);
        return randomColor
    }
    buildLabelStudio(lsLegendLabelsParam, interfacesDataParam, taskDataParam, taskNavParam) {
        const lsLegendLabels = lsLegendLabelsParam;
        const taskData = taskDataParam;
        const taskNav = taskNavParam;
        const interfacesData = interfacesDataParam;

        new LabelStudio('label-studio', {
            config: `<View>
            <View className="${taskData[taskNav].modified ? "modified-headers" : "default-headers"}">
            <Header name="text-1" value="Legends" />  
            </View>
            <Labels name="label" toName="text">
                ${lsLegendLabels.map((item, itemIdx) => `<Label key='${itemIdx}' value='${item.displayName}' background='${item.background}' />`)}
            </Labels>
            <View className="${taskData[taskNav].modified ? "modified-headers" : "default-headers"}">
            <Header name="text-2" value="Editor" />
            </View>
            <Text name="text" value="$text" />
            </View>`,
            interfaces: interfacesData,
            task: taskData[taskNav],

            onLabelStudioLoad: function (LS) {
                var c = LS.annotationStore.addAnnotation({
                    userGenerate: true
                });
                LS.annotationStore.selectAnnotation(c.id);
            },
            onUpdateAnnotation: this.updateAnnotation.bind(this),
        });
    }
    updateAnnotation(ls, annotation) {
        let taskData = JSON.parse(JSON.stringify(this.state.taskData))
        let dashboardItemData = JSON.parse(JSON.stringify(this.state.dashboardItemData))
        const { lsLegendLabels, taskNavigation, interfacesData } = this.state
        let selectedDashboardItemDataObj = dashboardItemData[ls.task.id - 1]
        let selectedTask = taskData.filter(task => task.id === ls.task.id)[0]
        let serializeAnnotation = annotation.serializeAnnotation()
        let isModified = false;

        if (selectedTask?.annotations[0]?.result) {
            if (selectedTask.annotations[0].result.length !== serializeAnnotation.length) {
                isModified = true
            } else {
                serializeAnnotation.forEach((entity, idx) => {
                    if (((entity.value.labels[0] !== selectedTask.annotations[0].result[idx].value.labels[0])) || ((entity.value.text) !== (selectedTask.annotations[0].result[idx].value.text))) {
                        isModified = true
                    }
                });
            }
        }
        if (isModified) {
            selectedTask.annotations[0].result = serializeAnnotation.filter(item => item.type !== "relation")
            selectedDashboardItemDataObj.annotation.entities = []

            for (const resultObj of selectedTask.annotations[0].result) {
                if (resultObj.type === "labels") {
                    let entityObj = {
                        end: resultObj.value?.end,
                        label: resultObj.value?.labels[0],
                        start: resultObj.value?.start,
                        text: resultObj.value?.text
                    }
                    selectedDashboardItemDataObj.annotation.entities.push(entityObj)
                }
            }

            let reannotatedData = { "reannotatedData": [{ ...selectedDashboardItemDataObj }] }

            annotationService.saveAnnotation(reannotatedData).then(response => {
                if (response.status === "COMPLETED") {
                    selectedDashboardItemDataObj.annotation.status = response.status
                    selectedTask.modified = true
                    this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, taskNavigation)
                    this.setState({ taskData: taskData, dashboardItemData: dashboardItemData })
                    notifySuccess('Annotation Data', 'Annotation Data successfully saved');
                }
            }).catch(error => {
                console.error("Unable to Save annotation data", error);
                notifyError('Unable to Save annotations data', error.message);
            })
        }
    }
    navigateTask(type) {
        let { taskNavigation, dashboardItemData, interfacesData, taskData, lsLegendLabels } = this.state
        if (type === "NEXT") {
            if (taskNavigation < dashboardItemData.length - 1) {
                let navIcrement = taskNavigation + 1
                this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, navIcrement)
                this.setState({ taskNavigation: navIcrement })
            }
        }
        if (type === "PREV") {
            if (taskNavigation > 0) {
                let navDecrement = taskNavigation - 1
                this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, navDecrement)
                this.setState({ taskNavigation: navDecrement })
            }
        }
    }
    toggleAddLabelModal(type) {
        if (type === "OPEN") {
            this.setState({ showCreateLabelsModal: true })
        } else {
            this.setState({ showCreateLabelsModal: false, label: "", validateMsg: "" })
        }
    }
    addLabel() {
        let lsLegendLabels = this.state.lsLegendLabels
        let label = this.state.label
        const { interfacesData, taskData, taskNavigation } = this.state;

        if (label) {
            let labelExisting = lsLegendLabels.filter(legend => legend.displayName.toLowerCase() === label.toLowerCase())
            if (labelExisting.length === 0) {
                let labelObj = {
                    id: label,
                    displayName: label,
                    background: this.generateDynamicColor(),
                }
                lsLegendLabels.push(labelObj)
                this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, taskNavigation)
                this.setState({ lsLegendLabels: lsLegendLabels, showCreateLabelsModal: false, label: "", validateMsg: "" })
            } else {
                this.setState({ validateMsg: "Label already exists" })
            }
        } else {
            console.log("label not entered")
        }
    }
    toggleResults() {
        let { interfacesData } = this.state;
        const { lsLegendLabels, taskData, taskNavigation } = this.state;
        let getResults = interfacesData.findIndex(resultVal => resultVal === "side-column")
        if (getResults !== -1) {
            interfacesData.splice(getResults, 1)
        } else {
            interfacesData.push("side-column")
        }
        this.buildLabelStudio(lsLegendLabels, interfacesData, taskData, taskNavigation)
        this.setState({ interfacesData: interfacesData })
    }
    render() {
        const { dashboardItemData, interfacesData, taskNavigation, showCreateLabelsModal, label, validateMsg } = this.state;
        const resultsColumn = interfacesData.findIndex(resultVal => resultVal === "side-column")
        console.log("dashboardItemData", dashboardItemData)
        return (
            <section className="label-annotation-container">
                <Row className="p-2 mt-4 mb-1">
                    <Col className="text-right p-0 ">
                        <div className="header-action-container">
                            {actionButton('', this.navigateTask.bind(this, "PREV"), '', 'feather icon-arrow-left', false, '', ACTION_BUTTON.PRIMARY)}
                            {actionButton('', this.navigateTask.bind(this, "NEXT"), 'mx-3', 'feather icon-arrow-right', false, '', ACTION_BUTTON.PRIMARY)}
                            {actionButton('Add label', this.toggleAddLabelModal.bind(this, "OPEN"), 'mr-3', 'feather icon-tag', false, '', ACTION_BUTTON.PRIMARY)}
                            {showCreateLabelsModal &&
                                <div className="create-labels-modal">
                                    <input type="text" className="form-control border-0 shadow-none" placeholder="Enter Label name" value={label} onChange={(e) => this.setState({ label: e.target.value, validateMsg: "" })} />
                                    {actionButton('', this.toggleAddLabelModal.bind(this, "CLOSE"), 'close-labels-modal', 'feather icon-x', false, '', '')}
                                    {actionButton('', this.addLabel.bind(this), 'save-labels-modal', 'fa fa-check', false, label ? false : true, '')}
                                    {validateMsg && <p className="text-right m-0"><small className="text-danger">{validateMsg}</small></p>}
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
                {actionButton('', this.toggleResults.bind(this), 'toggle-results-pannel-icon', 'feather icon-settings', false, '', ACTION_BUTTON.PRIMARY)}
                <div id="label-studio" className="text-left"></div>
                <div className="pb-5">
                    <h3 className="text-left mb-2 container-fluid default-headers">User Feedbacks</h3>
                    {dashboardItemData[taskNavigation]?.comments.length > 0 &&
                        <Row className="m-0">
                            <Col className="p-0 py-2 user-feedback-container-col">
                                {dashboardItemData[taskNavigation]?.comments?.map((comment, commentIdx) =>
                                    <div key={commentIdx}>
                                        <div className="comment-header pl-3">{comment.commentedBy ? comment.commentedBy.split("@")[0] + "@" + new Date(comment.commentedAt).toISOString().split('T')[0] : ""}</div>
                                        <div className="comment-body pl-3">{comment.comment}</div>
                                    </div>
                                )}
                            </Col>
                            {(resultsColumn !== -1) &&
                                <Col xs="auto" className="p-0"><div className="empty-div"></div></Col>
                            }
                        </Row>
                    }
                </div>
            </section>
        )
    }
}
