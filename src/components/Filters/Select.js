import React,{Component} from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {connect} from 'react-redux';
import {changeSelect} from '../../AC';
import {mapToArr} from '../../helpers';

class SelectFilter extends Component{
    static propTypes={
        
    };

    changeSelection = (selection) => {
        const {changeSelect}=this.props;
        const {selected}=this.props.filters;
        const totalSelection=[];
        selection.forEach((select)=>{
            totalSelection.push(select.value);
        });
        changeSelect(totalSelection);
    }

    render(){
        const {articles, filters, changeSelect}=this.props;
        const options=articles.map((article)=>({
            value: article.id,
            label: article.title
        }));
        
        return(
            <div>
                <Select
                    options={options}
                    value={filters.selected}
                    onChange={this.changeSelection}
                    multi={true}
                />
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        articles:mapToArr(state.articles.entities),
        filters:state.filters
    }
}

const mapToDispatch={changeSelect}

export default connect(mapStateToProps, mapToDispatch)(SelectFilter)