import {normalizedComments as defaultComments} from '../fixtures';
import {ADD_COMMENT, START, SUCCESS, LOAD_COMMENTS, LOAD_ALL_COMMENTS} from '../constants';
import {arrToMap, mapToArr} from '../helpers';
import {OrderedMap, Record, Map} from 'immutable';

const CommentsRecord = Record({
    text: undefined,
    user: undefined,
    id: undefined
});

const ReducerState=Record({
    entities:new OrderedMap({}),
    totalSize: null,
    pagination:new Map({})
});

const defaultState=new ReducerState();

//const commentsMap=arrToMap(defaultComments);

export default (commentsState=defaultState, action)=>{
    const {type, payload, response, randomID}=action;

    switch(type){   
        case LOAD_COMMENTS+SUCCESS: return commentsState.update('entities', entities=>entities.merge(arrToMap(payload.response,CommentsRecord)));
        
        //case ADD_COMMENT: return {...commentsState, [randomID]:payload.comment};
        case ADD_COMMENT: return commentsState.setIn(['entities', randomID], new CommentsRecord({...payload.comment, id:randomID}));
            
        case LOAD_ALL_COMMENTS+START: return commentsState.setIn(['pagination', payload.page, 'loading'], true);
            
        case LOAD_ALL_COMMENTS+SUCCESS:
                                    return commentsState.set('totalSize', payload.response.total)
                                                        .mergeIn(['entities'], arrToMap(payload.response.records,CommentsRecord))
                                                        .setIn(['pagination', payload.page, 'ids'], payload.response.records.map(comment => comment.id))
                                                        .setIn(['pagination', payload.page, 'loading'], false);
    }
    
    return commentsState
}