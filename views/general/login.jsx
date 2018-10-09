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
                        <input type='text' name='username' required />
                        <h3>Password:</h3>
                        <input type='password' name='password' required /><br/>
                        <input type='submit' value='Submit' />
                    </form>
                    <a href='/register'>Don't Have An Account Yet?</a>
                </fieldset>
            </Structure>
    )};
};

module.exports = Login;