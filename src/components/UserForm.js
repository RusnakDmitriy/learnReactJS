import React, {Component} from 'react';

export default class UserForm extends Component{
    
    handleUserChange=(ev)=>{
        if(ev.target.value.length>10) return;
        this.props.onChange(ev.target.value)
    }
    
    render(){
        return(
            <div>
                Name: <input type='text' value={this.props.value} onChange={this.handleUserChange} />
            </div>
        )
    }
}