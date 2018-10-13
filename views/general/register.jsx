const React = require('react');
const Structure = require('../layout/structure');

class Register extends React.Component {

    render() {

        let nope;

        if (this.props.check === 'true') {
            nope = <div className='nope-long'>The Username Has Already Been Taken</div>
        }

        return(

            <Structure title='Register'>
                <fieldset>
                    <legend>Register</legend>
                    {nope}
                    <form method='POST' action='/register'>
                        <h3>Username:</h3>
                        <input className='input' type='text' name='username' required autoComplete='off' />
                        <h3>Password:</h3>
                        <input className='input' type='password' name='password' required /><br/>
                        <input className='submit' type='submit' value='Submit' />
                    </form>
                    <a href='/login' className='link'>Already Have An Account?</a>
                </fieldset>
            </Structure>
    )};
};

module.exports = Register;