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
                        <h4 className='neon-green border-bottom-neon'>EDIT PROFILE</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <img id='initial-pic' src={image} width="380px" height="360px" />
                    </div>
                    <div className="col-6">
                        <form className='edit-profile-form' method='POST' action={editLink} encType='multipart/form-data'>
                            <div className="custom-file">
                              <input className='custom-file-input' id='pic' type='file' name='profilepic' accept="image/*" />
                              <label id="fileLabel" className="custom-file-label bg-dark" htmlFor="customFile">Choose profile picture</label>
                            </div>
                            <div className="form-row mt-3">
                                <div className="form-group col-8">
                                    <h6 className='neon-green'>Username:</h6>
                                    <input className='bg-dark form-control neon-green' type='text' name='username' defaultValue={this.props.user.username} disabled/>
                                </div>
                                <div className="form-group col-4">
                                    <h6 className='neon-green'>Age:</h6>
                                    <input className='bg-dark neon-green form-control longText' type='number' name='age' defaultValue={this.props.user.age} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col">
                                    <h6 className='neon-green'>Description:</h6>
                                    <textarea className='bg-dark neon-green form-control longText' name='biography' rows="5" maxLength="230" defaultValue={this.props.user.biography}></textarea>
                                </div>
                            </div>
                            <input type='hidden' name='displayimage' value={image} />
                            <input className='btn btn-outline-success btn-lg btn-block' type='submit' value='Update' />
                        </form>
                    </div>
                </div>
                <script type="text/javascript" src='/js/upload.js'></script>
            </Default>
    )};
};

module.exports = EditForm;