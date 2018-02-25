import React,{Component} from 'react';
import SelectFilter from './Select';
import DPicker from './DayPicker';

export default class Filters extends Component{
    render(){
        return(
            <div>
                <SelectFilter />
                <DPicker />
            </div>
        )
    }
}

