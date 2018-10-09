const React = require('react');
const Structure = require('../layout/structure');

class Register extends React.Component {

    render() {

        let nope;

        if (this.props.check === 'true') {
            nope = <div className='nope'>The Username Has Already Been Taken</div>
        }

        return(

            <Structure title='Register'>
                <fieldset>
                    <legend>Register</legend>
                    {nope}
                    <form method='POST' action='/register'>
                        <h3>Username:</h3>
                        <input type='text' name='username' />
                        <h3>Password:</h3>
                        <input type='password' name='password' required /><br/>
                        <input type='submit' value='Submit' required />
                    </form>
                    <a href='/login'>Already Have An Account?</a>
                </fieldset>
            </Structure>
    )};
};

module.exports = Register;