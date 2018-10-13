const React = require('react');
const Default = require('../layout/Default');

class UploadForm extends React.Component {

    render() {
        //encType='multipart/form-data'

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;


        let tags = this.props.tags.map((element) => {
            return <div key={element.id}><input type='checkbox' name='tag' value={element.id} />{element.tag}</div>
        });

        return(

            <Default cookie={this.props.cookie} title='Upload'>
                <h1>UPLOAD GAME</h1>
                <img id='initial-pic' src='/dp/defaultpic.png' />
                <form id='changePic' method='POST' action='/games/new' encType='multipart/form-data'>
                    <input id='pic' type='file' name='displayimage' />
                    <input type='submit' value='Change' />
                </form>
                <form className='upload-form' method='POST' action='/games'>
                    <h2>Title:</h2>
                    <input type='text' name='title' placeholder='Enter Title' required />
                    <h2>Summary:</h2>
                    <textarea className='summary' name='summary' placeholder='Enter A Short Summary Of The Game'></textarea>
                    <h2>Tags:</h2>
                    {tags}
                    <h2>Link:</h2>
                    <input type='text' name='link' placeholder='Enter the link to the game' />
                    <input type='hidden' name='dt' value={date} />
                    <input type='hidden' name='rating' value='0' />
                    <input id='dp' type='hidden' name='displayimage' value='/dp/defaultpic.png' />
                    <input type='submit' value='Upload' />
                </form>
                <script type='text/javascript' src='/js/upload.js'></script>
            </Default>
    )};
};

module.exports = UploadForm;