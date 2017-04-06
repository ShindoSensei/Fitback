/* globals React $ */

class User extends React.Component {
  constructor (props) {
    // Must pass in props here because React only assigns props on constructed instance right after construction. Hence, we make use of the fact that React passes props to constructor by default
    super(props)
    this.state = {
      formstatus: false,
      messagestatus: true,
      message: '',
      alert_type: ''
    }
  }

  onInputChange (event) {
    this.props.handleFormInput(event)
  }

  submitEditUserFunc (event) {
    event.preventDefault()
    // var Functions = require('./Functions.js')
    // console.log('this.props.trainingForm.place is ' + this.props.trainingForm)
    var token = $("meta[name='csrf-token']").attr('content')
    console.log(token)
    // var header = $("meta[name='_csrf_header']").attr("content");
    $.ajax({
      url: '/user_update/' + this.props.userid,
      method: 'PUT',
      data: {
        user: {
          first_name: this.props.firstName,
          last_name: this.props.lastName,
          email: this.props.email,
          password: this.props.password
        },
        authenticity_token: token
      },
      success: function (data) {
        console.log('User Profile updated!')
        console.log(data.update)
        if (data.update === 'success') {
          this.setState({
            formstatus: true,
            messagestatus: false,
            message: 'User Profile Update!',
            alert_type: 'alert alert-success'
          })
        } else {
          this.setState({
            messagestatus: false,
            message: 'User Profile Update fail',
            alert_type: 'alert alert-danger'
          })
        }
      }.bind(this)
    })
  }

  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <h2>Edit User Profile</h2>
            <div className='container' hidden={this.state.messagestatus}>
              <p className={this.state.alert_type}>{this.state.message}</p>
            </div>
            <form className='edit_user' id='edit_user' onSubmit={this.submitEditUserFunc.bind(this)} hidden={this.state.formstatus}>

              <div className='field'>
                <label>First Name</label><br />
                <input autoFocus='autofocus' type='text' value={this.props.firstName} name='firstName' id='user_first_name' onChange={this.onInputChange.bind(this)} required />
              </div>

              <div className='field'>
                <label>Last Name</label><br />
                <input autoFocus='autofocus' type='text' value={this.props.lastName} name='lastName' id='user_last_name' onChange={this.onInputChange.bind(this)} required />
              </div>

              <div className='field'>
                <label>Email</label><br />
                <input autoFocus='autofocus' type='email' value={this.props.email} name='email' id='user_email' onChange={this.onInputChange.bind(this)} required />
              </div>
              <div className='field'>
                <label>Password</label>
                <i>(leave blank if you don't want to change it)</i><br />
                <input autoComplete='off' type='password' name='password' id='password' onChange={this.onInputChange.bind(this)} />
                <br />
                <em>6 characters minimum</em>
              </div>

              <div className='field'>
                <button className='btn btn-success btn-xs'>
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
