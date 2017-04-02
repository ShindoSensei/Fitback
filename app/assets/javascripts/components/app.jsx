/* globals React FixedHeader FixedFooter UpcomingTrainings Form History CurrentSession $ */

class App extends React.Component {
  constructor (props) {
    // Must pass in props here because React only assigns props on constructed instance right after construction. Hence, we make use of the fact that React passes props to constructor by default
    super(props)
    this.state = {
      training: this.props.training,
      screen: 'upcoming',
      formDisplay: 'hidden'
      // screen: 'history'
      // screen: 'current'
    }
  }

  updateUpcoming () {
    $.ajax({
      url: '/trainings.json',
      method: 'GET',
      success: function (data) {
        this.setState({
          training: data
        })
        console.log('trainings updated on upcoming page')
        this.setState({
          formDisplay: 'hidden'
        })
      }.bind(this)
    })
  }
  render () {
    var screenRender
    if (this.state.screen === 'upcoming') {
      screenRender = <UpcomingTrainings training={this.state.training} />
    } else if (this.state.screen === 'history') {
      screenRender = <History />
    } else if (this.state.screen === 'current') {
      screenRender = <CurrentSession />
    }

    return (
      <div>
        <FixedHeader />
        <div>
          {screenRender}
        </div>
        <div>
          <Form
            update={this.updateUpcoming.bind(this)}
            activities={this.props.activity}
            className={'modalForm ' + this.state.formDisplay}
          />
        </div>
        <FixedFooter />
      </div>
    )
  }
}
