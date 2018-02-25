import React, {Component} from 'react';
import {DELETE_ARTICLE, INCREMENT, CHANGE_SELECT, CHANGE_DATERANGE, RESET_CHANGE_DATERANGE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE, START, SUCCESS, FAIL, LOAD_COMMENTS, LOAD_ALL_COMMENTS} from '../constants';
import {push, replace} from 'react-router-redux';

export function increment(){
    return {
        type: INCREMENT
    }
}

export function deleteArticle(id){
    return {
       type:  DELETE_ARTICLE,
       payload: {id}
    }
}

export function changeSelect(selected){
    return {
        type: CHANGE_SELECT,
        payload: {selected}
    }
}

export function changeDateRange(range){
    return {
        type: CHANGE_DATERANGE,
        payload: {range}
    }
}


export function resetChangeDateRange(){
    return {
        type: RESET_CHANGE_DATERANGE,
        payload: {}
    }
}

export function addComment(comment,articleID){
    return {
        type: ADD_COMMENT,
        payload: {comment,articleID},
        statusID: true
    }
}

export function loadAllArticles(){
    return {
        type: LOAD_ALL_ARTICLES,
        callAPI: '/api/article'
    }
}

export function loadArticle(id){
    return (dispatch)=>{
        dispatch({
            type: LOAD_ARTICLE+START,
            payload: {id}
        })
        
        setTimeout(()=>{
            fetch(`/api/article/${id}`)
                .then(res=>{
                    if(res.status>=400){
                        throw new Error(res.statusText)
                    }
                    return res.json()
                })
                .then(response=>dispatch({
                    type: LOAD_ARTICLE+SUCCESS,
                    payload: {id,response}
                }))
                .catch(error=>{
                    dispatch({
                        type: LOAD_ARTICLE+FAIL,
                        payload: {id,error}
                    })
                    dispatch(replace('/error'))
                })
        },1000)
    }
}

export function loadComments(articleID){
    return (dispatch)=>{
        dispatch({
            type: LOAD_COMMENTS+START,
            payload: {articleID}
        })
        
        setTimeout(()=>{
            fetch(`/api/comment?article=${articleID}`)
                .then(res=>res.json())
                .then(response=>dispatch({
                    type: LOAD_COMMENTS+SUCCESS,
                    payload: {articleID,response}
                }))
                .catch(error=>dispatch({
                    type: LOAD_COMMENTS+FAIL,
                    payload: {articleID,error}
                }))
        }, 1000)
    }
}

/*export function loadComments(articleID){
    return {
        type: LOAD_COMMENTS,
        payload: {articleID},
        callAPI: `/api/comment?article=${articleID}`
    }
}*/

/*export function loadCommentsPagination(page){
    return (dispatch, getState) => {
        const {comments: {pagination}} =getState();
        if(pagination.getIn([page, 'loading']) || pagination.getIn([page, 'ids'])) return;
        
        dispatch({
            type: LOAD_ALL_COMMENTS,
            payload: {page},
            callAPI: `/api/comment?limit=5&offset=${5*(page-1)}`
        })
    }
}*/

export function loadCommentsPagination(page){
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_COMMENTS+START,
            payload: {page}
        })
    
        setTimeout(() => {
            fetch(`/api/comment?limit=5&offset=${5*(page-1)}`)
                .then(res => res.json())
                .then(response => dispatch({
                    type: LOAD_ALL_COMMENTS+SUCCESS,
                    payload: {page, response}
                }))
                .catch(error => dispatch({
                    type: LOAD_ALL_COMMENTS+FAIL,
                    payload: {page, error}
                }))
        }, 1000)
    }
}