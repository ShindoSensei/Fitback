/* globals React */

class FixedFooter extends React.Component {

  submitupcomingScreen (event) {
    event.preventDefault()
    this.props.setRenderScreen('upcoming')
  }
  submithistoryScreen (event) {
    event.preventDefault()
    this.props.setRenderScreen('history')
  }

  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-bottom'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-3 text-left'>
                <a onSubmit={this.submitupcomingScreen.bind(this)}>
                  <i className='fa fa-home fa-3' aria-hidden='true' />
                </a>
              </div>
              <div className='col-xs-2 text-left'>
                <i className='fa fa-history fa-3' aria-hidden='true' />
                <a onSubmit={this.submithistoryScreen.bind(this)} />
              </div>
              <div className='col-xs-2 text-center'><i className='fa fa-heartbeat fa-3' aria-hidden='true' /></div>
              <div className='col-xs-2 text-right'>
                <i className='fa fa-user fa-3' aria-hidden='true' />
              </div>
              <div className='col-xs-3 text-right'>
                <a rel='nofollow' data-method='delete' href='/users/sign_out' ><i className='fa fa-sign-out fa-3' aria-hidden='true' /></a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
FixedFooter.propTypes = {
  setRenderScreen: React.PropTypes.func
}
