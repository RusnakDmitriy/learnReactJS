import React,{Component} from 'react';
import './commentFormStyle.css';
import {connect} from 'react-redux';
import {addComment} from '../../AC';
import randomID from '../../middlewares/randomID';

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            user:'' ,
            text:''
        };
        this.handleAddComment=this.handleAddComment.bind(this);
        this.handleChangeUser=this.handleChangeUser.bind(this);
        this.handleChangeComment=this.handleChangeComment.bind(this);
    }
    
    handleAddComment(){
        this.props.addComment(this.state);
        this.setState({
            user:'',
            text:''
        });
    }
    
    handleChangeUser(ev){
        let target=ev.target;
        this.setState({user:target.value});
    }
    
    handleChangeComment(ev){
        let target=ev.target;
        this.setState({text:target.value});
    }
    
    render(){
        const {user,text}=this.state;
        const classUser=(user.split('').length<5  && user.split('').length>=1 || user.split('').length>15) ? 'error' : '';
        const classComment=(text.split('').length<20 && text.split('').length>=1 || text.split('').length>50) ? 'error' : '';
        return(
            <div>
                user: <input type='text' value={user} onChange={this.handleChangeUser} className={classUser}/>
                comment: <input type='text' value={text} onChange={this.handleChangeComment} className={classComment} />
                <button onClick={this.handleAddComment}>add comment</button>
            </div>
        )
    }
}

export default connect(null, (dispatch,ownProps)=>({
    addComment: (comment)=>dispatch(addComment(comment,ownProps.articleID))
}))(CommentForm)