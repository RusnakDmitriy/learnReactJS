import {createSelector} from 'reselect';
import {mapToArr} from '../helpers';

const filtersGetter = state=>state.filters;
const articlesGetter = state=>state.articles.entities;
const commentsGetter = state=>state.comments.entities;
const idGetter = (state, props)=>props.id;

export const filtrateArticlesSelector = createSelector(articlesGetter,filtersGetter,(articles,filters)=>{
    const {selected, dateRange}=filters;
    
    return mapToArr(articles).filter((article)=>{
        return (!selected.length || selected.includes(article.id)) &&
               (!dateRange.from || !dateRange.to || Date.parse(dateRange.from)<Date.parse(article.date) && Date.parse(dateRange.to)>Date.parse(article.date))
    })
})

export const commentSelectorFactory = ()=> createSelector(commentsGetter,idGetter, (comments,id)=>{
    return comments.get(id)
    //return comments.find(comment=>comment.id===id)
})