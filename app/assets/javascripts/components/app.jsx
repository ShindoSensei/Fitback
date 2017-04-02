/* globals React FixedHeader FixedFooter UpcomingTrainings Form History CurrentSession Profile */

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      screen: 'upcoming'
      // screen: 'history'
      // screen: 'current'
    }
  }

  setRenderScreen (newScreen) {
    this.setState({
      screen: newScreen
    })
  }

  render () {
    // Different centre screen depending on this.state.screen
    var screenRender
    if (this.state.screen === 'upcoming') {
      screenRender = <UpcomingTrainings training={this.props.training} activity={this.props.activity} />
    } else if (this.state.screen === 'history') {
      screenRender = <History />
    } else if (this.state.screen === 'current') {
      screenRender = <CurrentSession />
    } else if (this.state.screen === 'profile') {
      screenRender = <Profile />
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
        <FixedFooter setRenderScreen={this.setRenderScreen.bind(this)} />
      </div>
    )
  }
}
