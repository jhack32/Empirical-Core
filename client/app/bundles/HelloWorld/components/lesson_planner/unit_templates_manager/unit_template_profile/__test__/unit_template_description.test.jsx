import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash'

import UnitTemplateProfileDescription from '../unit_template_profile_description'
import MarkdownParser from '../../../../shared/markdown_parser.jsx'

const props = {'data':{'id':34,'name':'barebones activity','problem':'bloopd i am problem rawr','summary':'bloop','teacher_review':'lalala','time':20,'grades':['1'],'order_number':1,'number_of_standards':1,'activity_info':'hi there','activities':[{'uid':'-KCNLERe7k5EKlr2sm1b','id':303,'name':'From','description':'Write five sentences using the correct preposition.','flags':['production'],'data':null,'created_at':'2016-03-08T22:28:58.921Z','updated_at':'2016-03-17T19:06:21.724Z','anonymous_path':'/activity_sessions/anonymous?activity_id=303','classification':{'uid':'s2u3tVuguhfUjOQxDP-7RA','id':2,'name':'Quill Grammar','key':'sentence','form_url':'https://grammar.quill.org/play/sw','module_url':'https://grammar.quill.org/play/sw','created_at':'2014-04-19T00:05:03.113Z','updated_at':'2017-01-24T16:06:52.270Z','image_class':'icon-puzzle-gray','alias':'Quill Grammar','scorebook_icon_class':'icon-puzzle'},'topic':{'id':6,'name':'1.1i. Frequently Occurring Prepositions','created_at':'2014-04-19T15:42:40.907Z','updated_at':'2015-02-07T21:55:22.303Z','section':{'id':7,'name':'1st Grade CCSS','created_at':'2013-11-12T18:03:10.973Z','updated_at':'2015-02-27T22:02:03.770Z'},'topic_category':{'id':5,'name':'Prepositions','created_at':'2015-02-07T21:55:22.293Z','updated_at':'2015-02-07T21:55:22.293Z'}}}],'unit_template_category':{'id':3,'name':'ELL','primary_color':'.348fdf','secondary_color':'.014f92'},'author':{'id':6,'name':'Sara A.','avatar_url':'https://empirical-core-dev.s3.amazonaws.com/authors/avatars/000/000/006/thumb/Sara_Angel_96.png?1451924889','description':'I am a human'},'non_authenticated':false}}


describe('UnitTemplateProfileDescription component', () => {

  describe('when activity info exists', () => {
    it('should render MarkdownParser', ()=> {
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...props} />
      );
      expect(wrapper.find(MarkdownParser)).toHaveLength(1);
    })

    it('should not render the activity list', ()=>{
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...props} />
      );
      expect(wrapper.find('dl')).toHaveLength(0);
    })


  })

  describe('when activity info does not exist', () => {
    const propsWithoutActivityInfo = _.cloneDeep(props)
    propsWithoutActivityInfo.data.activity_info = ''

    it('should not render MarkdownParser', ()=> {
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutActivityInfo} />
      );
      expect(wrapper.find(MarkdownParser)).toHaveLength(0);
    })

    it('should render the activity list', ()=>{
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutActivityInfo} />
      );
      expect(wrapper.find('dl').length).not.toBeLessThan(1);
    })

    describe('when problem does exist', ()=> {
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutActivityInfo} />
      )
      it('renders the problem title', () => {
        expect(wrapper.find('#problem_title')).toHaveLength(1)
      })
      it('renders the problem text', () => {
        expect(wrapper.find('#problem_text')).toHaveLength(1)
      })

    })

    describe('when problem does not exist', ()=> {
      const propsWithoutProblem = _.cloneDeep(propsWithoutActivityInfo)
      propsWithoutProblem.data.problem = ''
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutProblem} />
      )
      it('does not render the problem title', () => {
        expect(wrapper.find('#problem_title')).toHaveLength(0)
      })
      it('does not render the problem text', () => {
        expect(wrapper.find('#problem_text')).toHaveLength(0)
      })
    })

    describe('when teacher review does exist', ()=> {
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutActivityInfo} />
      )
      it('renders the teacher review title', () => {
        expect(wrapper.find('#review_title')).toHaveLength(1)
      })
      it('renders the teacher review text', () => {
        expect(wrapper.find('#review_text')).toHaveLength(1)
      })

    })

    describe('when teacher review does not exist', ()=> {
      const propsWithoutTeacherReview = _.cloneDeep(propsWithoutActivityInfo)
      propsWithoutTeacherReview.data.teacher_review = ''
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutTeacherReview} />
      )
      it('does not render the teacher review title', () => {
        expect(wrapper.find('#review_title')).toHaveLength(0)
      })
      it('does not render the teacher review text', () => {
        expect(wrapper.find('#review_text')).toHaveLength(0)
      })
    })

    describe('when summary does exist', ()=> {
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutActivityInfo} />
      )
      it('renders the summary title', () => {
        expect(wrapper.find('#summary_title')).toHaveLength(1)
      })
      it('renders the summary text', () => {
        expect(wrapper.find('#summary_text')).toHaveLength(1)
      })

    })

    describe('when summary does not exist', ()=> {
      const propsWithoutSummary = _.cloneDeep(propsWithoutActivityInfo)
      propsWithoutSummary.data.summary = ''
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutSummary} />
      )
      it('does not render the summary title', () => {
        expect(wrapper.find('#summary_title')).toHaveLength(0)
      })
      it('does not render the summary text', () => {
        expect(wrapper.find('#summary_text')).toHaveLength(0)
      })
    })

    describe('when author.description does exist', ()=> {
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutActivityInfo} />
      )
      it('renders the author description title', () => {
        expect(wrapper.find('#author_title')).toHaveLength(1)
      })
      it('renders the author description text', () => {
        expect(wrapper.find('#author_text')).toHaveLength(1)
      })

    })

    describe('when author description does not exist', ()=> {
      const propsWithoutAuthorDescription = _.cloneDeep(propsWithoutActivityInfo)
      propsWithoutAuthorDescription.data.author.description = ''
      const wrapper = shallow(
        <UnitTemplateProfileDescription {...propsWithoutAuthorDescription} />
      )
      it('does not render the author description title', () => {
        expect(wrapper.find('#author_title')).toHaveLength(0)
      })
      it('does not render the author description text', () => {
        expect(wrapper.find('#author_text')).toHaveLength(0)
      })
    })

  })

});
