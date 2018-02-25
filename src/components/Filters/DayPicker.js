import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DayPicker.css';
import {connect} from 'react-redux';
import {changeDateRange, resetChangeDateRange} from '../../AC';

class DPicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 1
  };
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  handleDayClick(day) {
    const {dateRange} = this.props.filters;
    const ranged = DateUtils.addDayToRange(day, dateRange);
    this.props.changeDateRange(ranged);
  }

  handleResetClick() {
    this.props.resetChangeDateRange();
  }

  render() {
    const {dateRange} = this.props.filters;
    const {from, to} = dateRange;
    const modifiers = { start: dateRange.from, end: dateRange.to };
    return (
      <div className="RangeExample">
        <p>
          {!from && !to && 'Please select the first day.'}
          {from && !to && 'Please select the last day.'}
          {from &&
            to &&
            `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{' '}
          {from &&
            to && (
              <button className="link" onClick={this.handleResetClick}>
                Reset
              </button>
            )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    )

  }
}

function mapStateToProps(state){
    return{
        articles:state.articles,
        filters:state.filters
    }
}

const mapToDispatch={changeDateRange, resetChangeDateRange}

export default connect(mapStateToProps, mapToDispatch)(DPicker)