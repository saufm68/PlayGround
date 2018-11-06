const React = require('react');
const Default = require('../layout/default');

class EditForm extends React.Component {

    render() {

        let image = this.props.user.profilepic;
        let editLink = `/users/${this.props.user.id}?_method=PUT`;

        return(

            <Default cookie={this.props.cookie}>
                <div className="row mb-3">
                    <div className="col">
                        <h2 className='neon-green border-bottom-neon'>EDIT PROFILE</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <img id='initial-pic' src={image} width="380px" height="360px" />
                    </div>
                    <div className="col-6">
                        <form className='edit-profile-form' method='POST' action={editLink} encType='multipart/form-data'>
                            <div class="custom-file">
                              <input className='custom-file-input' id='pic' type='file' name='profilepic' />
                              <label class="custom-file-label bg-dark" htmlFor="customFile">Choose profile picture</label>
                            </div>
                            <h2 className='subheader'>Username:</h2>
                            <input className='inputs align' type='text' name='username' defaultValue={this.props.user.username} disabled/>
                            <h2 className='subheader'>Age:</h2>
                            <input className='inputs align' type='number' name='age' defaultValue={this.props.user.age} />
                            <h2 className='subheader'>Description:</h2>
                            <textarea className='inputs summaryTextArea align' name='biography' defaultValue={this.props.user.biography}></textarea><br/>
                            <input className='form-button align-small' type='submit' value='Update' />
                        </form>
                    </div>
                </div>
                <script type="text/javascript" src='/js/upload.js'></script>
            </Default>
    )};
};

module.exports = EditForm;