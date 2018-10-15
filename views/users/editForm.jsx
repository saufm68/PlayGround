const React = require('react');
const Default = require('../layout/default');

class EditForm extends React.Component {

    render() {

        let image = this.props.user.profilepic;
        let editLink = `/users/${this.props.user.id}?_method=PUT`;

        return(

            <Default cookie={this.props.cookie} title='Edit'>
                <h1 className='header'>EDIT PROFILE</h1>
                <img className='pic' id='initial-pic' src={image} />
                <form className='edit-profile-form' method='POST' action={editLink} encType='multipart/form-data'>
                    <input className='input-file align-small' id='pic' type='file' name='profilepic' />
                    <h2 className='subheader'>Username:</h2>
                    <input className='inputs align' type='text' name='username' defaultValue={this.props.user.username} disabled/>
                    <h2 className='subheader'>Age:</h2>
                    <input className='inputs align' type='number' name='age' defaultValue={this.props.user.age} />
                    <h2 className='subheader'>Description:</h2>
                    <textarea className='inputs summaryTextArea align' name='biography' defaultValue={this.props.user.biography}></textarea><br/>
                    <input className='form-button align-small' type='submit' value='Update' />
                </form>
                <script type="text/javascript" src='/js/upload.js'></script>
            </Default>
    )};
};

module.exports = EditForm;