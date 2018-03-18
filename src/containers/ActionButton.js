import { connect } from 'react-redux'
import Button from '../components/Button'

const mapStateToProps = (state, ownProps) => ({
  show: state.possibleActions.includes(ownProps.text)
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch({type: ownProps.text.toUpperCase()})
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button)
