import {normalizedArticles as defaultArticles} from '../fixtures';
import {DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, START, SUCCESS, LOAD_ARTICLE, LOAD_COMMENTS} from '../constants';
import {arrToMap, mapToArr} from '../helpers';
import {OrderedMap, Record} from 'immutable';

const ArticleRecord=Record({
    text: undefined,
    title: '',
    id: undefined,
    loading: false,
    commentsLoading:false,
    commentsLoaded:false,
    comments: []
});

const ReducerState=Record({
    loading:false,
    loaded:false,
    entities:new OrderedMap({}) 
});

const defaultState=new ReducerState();

export default (articleState=defaultState, action)=>{
    const {type, payload, response, randomID}=action;
    
    switch(type){         
        //case DELETE_ARTICLE: return mapToArr(articleState).filter(article=>article.id !==payload.id);          
        case DELETE_ARTICLE: 
            //let tmplarticleState={...articleState};
            //delete tmplarticleState[payload.id];
            //return Object.assign({},tmplarticleState);
            return articleState.deleteIn(['entities', payload.id])
            
        case ADD_COMMENT:
            return articleState.updateIn(
                ['entities', payload.articleID, 'comments'],
                comments=>comments.concat(randomID)
            )
            
            /*const article=articleState[payload.articleID];
            return {
                ...articleState,
                [payload.articleID]:{
                    ...article,
                    comments:(article.comments || []).concat(randomID)
                }
            }*/
    
        case LOAD_ALL_ARTICLES+START:
            return articleState.set('loading', true)
        
        case LOAD_ALL_ARTICLES+SUCCESS:
            return articleState
                        .set('entities', arrToMap(response, ArticleRecord))
                        .set('loading', false)
                        .set('loaded', true)
            
        case LOAD_ARTICLE+START:
            return articleState.setIn(['entities', payload.id, 'loading'], true)
            
        case LOAD_ARTICLE+SUCCESS:
            return articleState.setIn(['entities', payload.id], new ArticleRecord(payload.response))
            
        case LOAD_COMMENTS+START:
            return articleState.setIn(['entities', payload.articleID, 'commentsLoading'], true)
            
        case LOAD_COMMENTS+SUCCESS:
            return articleState
                        .setIn(['entities', payload.articleID, 'commentsLoaded'], true)
                        .setIn(['entities', payload.articleID, 'commentsLoading'], false)
    }
    
    return articleState
}