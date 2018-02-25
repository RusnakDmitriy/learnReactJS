import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {loadCommentsPagination} from '../AC';
import Loader from './Loader';
import Comment from './Comment';

class CommentsPagination extends Component{
    static propTypes = {
        
    };

    /*componentWillMount(){
        this.props.loadCommentsPagination(this.props.page)
    }

    componentWillReceiveProps({page, loadCommentsPagination}){
        loadCommentsPagination(page)
    }*/
    
    componentDidMount(){
        const {page, comments, loading, loadCommentsPagination} = this.props;
        loadCommentsPagination(page)
    }

    getCommentsList(){
        const {comments, loading}=this.props;
        if(loading || !comments) return <Loader />;
        const commentsList = comments.map(id => <li key={id}><Comment id={id} /></li>);
        return <ul>{commentsList}</ul>
    }

    getpaginationPages(){
        const {totalSize}=this.props;
        const commentsPageAmount = Math.ceil(totalSize/5);
        const paginationPages = [...Array(commentsPageAmount)].map((numb,index) => {return <li key={index}><NavLink activeStyle={{color:'red'}} to={`/comments/${index+1}`}>{index+1}</NavLink></li>});
        return <ul>{paginationPages}</ul>
    }

    render(){
        const {totalSize}=this.props;
        if(!totalSize) return <Loader />
        return(
            <div>
                {this.getCommentsList()}
                {this.getpaginationPages()}
            </div>
        )
    }
}

export default connect((state, {page})=>{
    const {pagination, totalSize}=state.comments;
    return {
        loading: pagination.getIn([page, 'loading']),
        comments: pagination.getIn([page, 'ids']),
        totalSize
    }
}, {loadCommentsPagination})(CommentsPagination)
