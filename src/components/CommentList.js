import React, {Component} from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';
import toggleOpen from '../decorators/toggleOpen';
import CommentForm from './CommentForm/CommentForm';
import {connect} from 'react-redux';
import {loadComments} from '../AC';
import Loader from './Loader';
import {mapToArr} from '../helpers';
import {filtrateArticlesSelector} from '../selectors';

class CommentList extends Component{
    static contextTypes={
        store: PropTypes.object,
        router: PropTypes.object,
        user: PropTypes.string
    }
    
    static defaultProps={
        comments: []
    }

    componentWillReceiveProps({isOpen, article, loadComments}){
        if(isOpen && !article.commentsLoaded && !article.commentsLoading) loadComments(article.id)
    }
    
    render(){
        const {article,isOpen,toggleOpen} = this.props;
        console.log('---', this.context);
        return(
            <div>
                <h3>User: {this.context.user}</h3>
                <button onClick={toggleOpen}>
                    {!isOpen ? 'comments open' : 'comments close'}
                </button>
                {this.getComments()}
                <CommentForm articleID={article.id}/>
            </div>
        )
    }
    
    getComments(){
        const {isOpen, article}=this.props;
        //const comments=article.comments;
        if(!isOpen) return;
        if(article.commentsLoading) return <Loader />
        if(!article.commentsLoaded) return;
        if(!article.comments.length) return <p>No comments yet</p>
        const comments=article.comments;
        return(
            <ul>
                {comments.map((comment)=>{
                    return  <li key={comment}><Comment id={comment} /></li>
                })}
            </ul>
        )
    }
}

//export default toggleOpen(CommentList)

export default connect(null, {loadComments}, null, {pure: false})(toggleOpen(CommentList))