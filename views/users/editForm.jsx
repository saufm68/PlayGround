const React = require('react');
const Default = require('../layout/Default');

class EditForm extends React.Component {

    render() {

        let image = this.props.user.profilepic;
        let editLink = `/users/${this.props.user.id}?_method=PUT`;

        return(

            <Default cookie={this.props.cookie} title='Edit'>
                <h1>EDIT PROFILE</h1>
                <img id='initial-pic' src={image} />
                <form className='edit-profile-form' method='POST' action={editLink} encType='multipart/form-data'>
                    <input id='pic' type='file' name='profilepic' />
                    <h2>Username:</h2>
                    <input type='text' name='username' defaultValue={this.props.user.username} disabled/>
                    <h2>Age:</h2>
                    <input type='number' name='age' defaultValue={this.props.user.age} />
                    <h2>Description:</h2>
                    <textarea className='biography' name='biography' defaultValue={this.props.user.biography}></textarea>
                    <input type='submit' value='Update' />
                </form>
                <script type="text/javascript" src='/js/upload.js'></script>
            </Default>
    )};
};

module.exports = EditForm;