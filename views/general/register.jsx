const React = require('react');
const Structure = require('../layout/structure');

class Register extends React.Component {

    render() {

        let nope;

        if (this.props.check === 'true') {
            nope = <div className='nope-long'>The Username Has Already Been Taken</div>
        }

        return(

            <Structure>
                <fieldset>
                    <legend>REGISTER</legend>
                    {nope}
                    <form className="register-form" method='POST' action='/register'>
                        <h3 className="register-header">Username:</h3>
                        <input className='input' type='text' name='username' required autoComplete='off' />
                        <h3 className="register-header">Age:</h3>
                        <input className='input' type='number' name='age' required autoComplete='off' />
                        <h3 className="register-header">Password:</h3>
                        <input className='input' type='password' name='password' required /><br/>
                        <input className='submit' type='submit' value='Submit' />
                    </form>
                    <a href='/login' className='link'>Already Have An Account?</a>
                </fieldset>
            </Structure>
    )};
};

module.exports = Register;