/* globals React */

class FixedFooter extends React.Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-bottom'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-3 text-left'><i className='fa fa-home fa-3' aria-hidden='true' />
              </div>
              <div className='col-xs-2 text-left'><i className='fa fa-history fa-3' aria-hidden='true' /></div>
              <div className='col-xs-2 text-center'><i className='fa fa-heartbeat fa-3' aria-hidden='true' /></div>
              <div className='col-xs-2 text-right'>
                <i className='fa fa-user fa-3' aria-hidden='true' />
              </div>
              <div className='col-xs-3 text-right'>
                <i className='fa fa-sign-out fa-3' aria-hidden='true' />
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
