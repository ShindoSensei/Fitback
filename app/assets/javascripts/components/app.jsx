/* globals React FixedHeader FixedFooter UpcomingTrainings Form History CurrentSession */

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      screen: 'upcoming'
      // screen: 'history'
      // screen: 'current'
    }
  }

  render () {
    // Different centre screen depending on this.state.screen
    var screenRender
    if (this.state.screen === 'upcoming') {
      screenRender = <UpcomingTrainings training={this.props.training} />
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
          <Form className='hidden' />
        </div>
        <FixedFooter />
      </div>
    )
  }
}
