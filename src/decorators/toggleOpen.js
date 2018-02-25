import React, {Component} from 'react';

export default (OriginalComponent)=> class WrappedComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen: false
        };
        this.toggleOpen=this.toggleOpen.bind(this);
    }
    
    toggleOpen(){
        this.setState({
            isOpen:!this.state.isOpen
        })
    }
    
    render(){
        return <OriginalComponent {...this.props} isOpen={this.state.isOpen} toggleOpen={this.toggleOpen}/>
    }
}