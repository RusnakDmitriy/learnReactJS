import React, {Component} from 'react';


export default (OriginalComponent)=> class Accordeon extends Component{
    
    constructor(props){
        super(props);
        this.state={
            //openArticleId: this.props.defaultOpenId
            openArticleId: null
        };
    }
    
    toggleOpenArticleId=openArticleId=>ev=>{
        if(openArticleId===this.state.openArticleId)
           this.setState({openArticleId: null})
        else
            this.setState({openArticleId: openArticleId})
    }
    
    render(){
       
        return <OriginalComponent {...this.props} openArticleId={this.state.openArticleId} toggleOpenArticleId={this.toggleOpenArticleId} />
    }
}
