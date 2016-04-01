import React from 'react'
import { connect } from 'react-redux'
import questionActions from '../../actions/questions'
import _ from 'underscore'
import {hashToCollection} from '../../libs/hashToCollection'
import Modal from '../modal/modal.jsx'
import EditFrom from './questionForm.jsx'
import Response from './response.jsx'
import C from '../../constants'

const Question = React.createClass({

  // renderQuestions: function () {
  //   const {data} = this.props.concepts;
  //   const keys = _.keys(data);
  //   return keys.map((key) => {
  //     console.log(key, data, data[key])
  //     return (<li><Link to={'/admin/concepts/' + key}>{data[key].name}</Link></li>)
  //   })
  // },

  getInitialState: function () {
    return {
      sorting: "count",
      ascending: false
    }
  },

  deleteQuestion: function () {
    this.props.dispatch(questionActions.deleteQuestion(this.props.params.questionID))
  },

  startEditingQuestion: function () {
    this.props.dispatch(questionActions.startQuestionEdit(this.props.params.questionID))
  },

  cancelEditingQuestion: function () {
    this.props.dispatch(questionActions.cancelQuestionEdit(this.props.params.questionID))
  },

  saveQuestionEdits: function (vals) {
    this.props.dispatch(questionActions.submitQuestionEdit(this.props.params.questionID, vals))
  },

  submitNewResponse: function () {
    var newResp = {
      vals: {
        text: this.refs.newResponseText.value,
        feedback: this.refs.newResponseFeedback.value,
        optimal: this.refs.newResponseOptimal.checked
      },
      questionID: this.props.params.questionID
    }
    this.props.dispatch(questionActions.submitNewResponse(newResp.questionID, newResp.vals))
  },

  toggleResponseSort: function (field) {
    (field === this.state.sorting ? this.setState({ascending: !this.state.ascending}) : this.setState({sorting: field, ascending: false}));
  },


  renderResponses: function () {
    const {data, states} = this.props.questions, {questionID} = this.props.params;
    var responses = hashToCollection(data[questionID].responses)
    var responsesListItems = _.sortBy(responses, (resp) =>
        {return resp[this.state.sorting] || 0 }
      ).map((resp) => {
      return <Response
        response={resp}
        states={states}
        questionID={questionID}
        dispatch={this.props.dispatch}
        key={resp.key} />
    })
    if (this.state.ascending) {
      return responsesListItems;
    } else {
      return responsesListItems.reverse();
    }
  },

  renderArrow: function () {
    return this.state.ascending ? <p>&uarr;</p> : <p>&darr;</p>
  },

  renderNewResponseForm: function () {
    return (
      <div className="box">
        <h6 className="control subtitle">Add a new response</h6>
        <label className="label">Response text</label>
        <p className="control">
          <input className="input" type="text" ref="newResponseText"></input>
        </p>
        <label className="label">Feedback</label>
        <p className="control">
          <input className="input" type="text" ref="newResponseFeedback"></input>
        </p>
        <p className="control">
          <label className="checkbox">
            <input ref="newResponseOptimal" type="checkbox" />
            Optimal?
          </label>
        </p>
        <button className="button is-primary" onClick={this.submitNewResponse}>Add Response</button>
      </div>
    )
  },

  renderEditForm: function () {
    const {data} = this.props.questions, {questionID} = this.props.params;
    const question = (data[questionID])
    if (this.props.questions.states[questionID] === C.EDITING_QUESTION) {
      return (
        <Modal close={this.cancelEditingQuestion}>
          <EditFrom question={question} submit={this.saveQuestionEdits}/>
        </Modal>
      )
    }
  },

  render: function (){
    const {data} = this.props.questions, {questionID} = this.props.params;
    if (data[questionID]) {
      var responses = hashToCollection(data[questionID].responses)
      return (
        <div>
          {this.renderEditForm()}
          <h4 className="title">{data[questionID].prompt}</h4>
          <h6 className="subtitle">{responses.length} Responses</h6>
          <p className="control">
            <button className="button is-info" onClick={this.startEditingQuestion}>Edit Question</button> <button className="button is-danger" onClick={this.deleteQuestion}>Delete Question</button>
          </p>
          {this.renderNewResponseForm()}
          <div>
            <a onClick={this.toggleResponseSort.bind(null, "count")}>Submissions </a>
            <a onClick={this.toggleResponseSort.bind(null, "text")}>Text </a>
            <a onClick={this.toggleResponseSort.bind(null, "createdAt")}>Created At</a>
            {this.renderArrow()}
          </div>
          {this.renderResponses()}
        </div>
      )
    } else if (this.props.questions.hasreceiveddata === false){
      return (<p>Loading...</p>)
    } else {
      return (
        <p>404: No Question Found</p>
      )
    }

  }
})

function select(state) {
  return {
    concepts: state.concepts,
    questions: state.questions,
    routing: state.routing
  }
}

export default connect(select)(Question)
