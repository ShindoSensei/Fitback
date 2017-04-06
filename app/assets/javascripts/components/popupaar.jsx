/* globals React $ */
class PopupAAR extends React.Component {

  onInputChange (event) {
    this.props.handleFormInput(event)
  }

  submitAARFunc (event) {
    event.preventDefault()
    // console.log('this.props.trainingForm.place is ' + this.props.trainingForm)
    $.ajax({
      url: '/updateAAR/' + this.props.trainingId,
      method: 'PUT',
      data: {
        training: {
          AAR: this.props.remark,
          status: 'completed'
        }
      },
      success: function (data) {
        console.log('AAR remark updated!')
        this.props.closeAARModal()
        this.props.updateAAR()
      }.bind(this)
    })
  }

  render () {
    if (!this.props.isAARModalOpen) {
      return null
    }
    return (
      <div className='modalForm'>
        <div className='col-md-12'>
          <form onSubmit={this.submitAARFunc.bind(this)} className='formBox'>
            <label>
              Training Remark:
            </label>
            <textarea name='remark' type='text' value={this.props.remark} onChange={this.onInputChange.bind(this)} placeholder='Enter remark on the training conducted' required />
            <br />
            <br />
            <div className="col-xs-4 col-xs-offset-4">
            <button className='btn btn-large button-black2 text-white'> Submit </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
