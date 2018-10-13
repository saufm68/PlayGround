const React = require('react');
const Structure = require('../layout/structure');

class Login extends React.Component {

    render() {

        let nope;

        if (this.props.check === 'true') {
            nope = <div className='nope'>Username/Password id incorrect</div>
        }

        return(

            <Structure title='Login'>
                <fieldset>
                    <legend>LOGIN</legend>
                    {nope}
                    <form method='POST' action='/login'>
                        <h3>Username:</h3>
                        <input className='input' type='text' name='username' required autoComplete='off' />
                        <h3>Password:</h3>
                        <input className='input' type='password' name='password' required /><br/>
                        <input className='submit' type='submit' value='Submit' />
                    </form>
                    <a href='/register' className='link'>Don't Have An Account Yet?</a>
                </fieldset>
            </Structure>
    )};
};

module.exports = Login;