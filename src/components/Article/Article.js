import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteArticle, loadArticle} from '../../AC';
import CommentList from '../CommentList';
import toggleOpen from '../../decorators/toggleOpen';
import { CSSTransitionGroup } from 'react-transition-group';
import './article.css';
import Loader from '../Loader';

class Article extends Component{
    static propTypes={
        id: PropTypes.string.isRequired,
        article: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            text: PropTypes.string
        })
    }

    componentDidMount(){
        const {loadArticle, article, id}=this.props;
        if(!article || (!article.text && !article.loading)) loadArticle(id)
    }
    
    render(){
        const {article,isOpen,toggleOpen}=this.props;
        if(!article) return null;
        return(
            <div>
                <h3>{article.title}</h3>
                <button onClick={toggleOpen}>
                    {isOpen ? 'close' : 'open'}
                </button>
                <button onClick={this.handleDelete}>delete me</button>
                <CSSTransitionGroup
                    transitionName='article'
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={500}
                >
                    {this.getBody()}
                </CSSTransitionGroup>
            </div>
        ) 
    }
    
    handleDelete=()=>{
        const {deleteArticle, article} = this.props;
        deleteArticle(article.id);
        console.log('---', 'deleting article');
    }
    
    getBody(){
        const {article,isOpen}=this.props;
        if(!isOpen) return null;
        if(article.loading) return <Loader />
        return (
            <div>
                <section>{article.text}</section>
                <CommentList article={article} />
            </div>
        );
    }
}

export default connect((state, ownProps)=>({
    article: state.articles.entities.get(ownProps.id)
}), {deleteArticle, loadArticle}, null, {pure: false})(Article)