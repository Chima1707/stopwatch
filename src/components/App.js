import React, {Component} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ButtonList from './ButtonList'
import Timer from './Timer'
import Lapses from './Lapses'
import './App.css'

class App extends Component {
  componentDidMount () {
    this.timer = setInterval(this.props.onTick, 100)
  }
  componentWillUnmount () {
    clearInterval(this.timer)
  }
  render () {
    return (<div className='content'>
      <Timer main timeElapsed={this.props.mainTime} />
      <br />
      <Timer timeElapsed={this.props.lapTime} />
      <br />
      <Lapses lapses={this.props.lapses} />
      <br />
      <ButtonList />
    </div>)
  }
}

App.propTypes = {
  lapses: PropTypes.array.isRequired,
  onTick: PropTypes.func.isRequired,
  mainTime: PropTypes.number.isRequired,
  lapTime: PropTypes.number.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  lapses: state.lapses,
  mainTime: state.timer.mainTime,
  lapTime: state.timer.lapTime
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTick: () => dispatch({type: 'TICK'})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
