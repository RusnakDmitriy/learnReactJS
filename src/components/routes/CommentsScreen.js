import React, {Component} from 'react';
import {Route, Redirect, NavLink} from 'react-router-dom';
import CommentsPagination from '../CommentsPagination';

function CommentsScreen({match}){
    if(match.isExact) return <Redirect to='/comments/1' />
    return <Route path='/comments/:page' render={getCommentsPaginator} />
}

function getCommentsPaginator({match}){
    return <CommentsPagination key={match.params.page} page={match.params.page} />
}

export default CommentsScreen