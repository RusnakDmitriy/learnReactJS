import {articles as defaultArticles} from '../fixtures';
import {CHANGE_SELECT, CHANGE_DATERANGE, RESET_CHANGE_DATERANGE} from '../constants';

const defaultFilters={
    selected:[],
    dateRange:{
        from: null,
        to: null
    }
};

export default (filters=defaultFilters, action)=>{
    const {type, payload}=action;
    
    switch(type){
        case CHANGE_SELECT: return {...filters, selected: payload.selected};
            
        case CHANGE_DATERANGE: return {...filters, dateRange: payload.range};
            
        case RESET_CHANGE_DATERANGE: return {...filters, dateRange:defaultFilters.dateRange};
    
    };
    
    return filters
}