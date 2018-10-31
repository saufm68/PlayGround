const React = require('react');
const Default = require('../layout/default');

class UploadForm extends React.Component {

    render() {

        let date = new Date();
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;


        let tags = this.props.tags.map((element) => {
            return <div className='checkbox' key={element.id}><input type='checkbox' name='tag' value={element.id} />{element.tag}</div>
        });

        return(

            <Default cookie={this.props.cookie} title='Upload'>
                <h1 className='header'>UPLOAD GAME</h1>
                <img id='initial-pic' className='pic' src='/dp/defaultpic.png' />
                <form className='upload-form' method='POST' action='/games' encType='multipart/form-data'>
                    <input id='pic' className='input-file' type='file' name='displayimage' />
                    <h2 className='subheader'>Title:</h2>
                    <input className='inputs' type='text' name='title' placeholder='Enter Title' required />
                    <h2 className='subheader'>Summary:</h2>
                    <textarea className='inputs summaryTextArea' name='summary' placeholder='Enter A Short Summary Of The Game'></textarea>
                    <h2 className='subheader'>Category</h2>
                    <input type='radio' name='category' value='pro'/>Professional<br/>
                    <p>'Professional Games' are established games in the market, that other users can buy/download. Please provide a link where users can go to buy/download the game.</p>
                    <input type='radio' name='category' value='amatuer' checked />Amatuer<br/>
                    <p>'Amatuer Games' are games that you have created and hosted on a site. Please provide a link where users can go to play the game </p>
                    <h2 className='subheader'>Tags:</h2>
                    <div className='tags-holder'>
                        {tags}
                    </div>
                    <h2 className='subheader'>Link:</h2>
                    <input className='inputs' type='text' name='link' placeholder='Enter the link to the game' /><br/>
                    <input type='hidden' name='dt' value={date} />
                    <input type='hidden' name='rating' value='0' />
                    <input type='hidden' name='displayimage' value='/dp/defaultpic.png' />
                    <input className='form-button' type='submit' value='Upload' />
                </form>
                <script type='text/javascript' src='/js/upload.js'></script>
            </Default>
    )};
};

module.exports = UploadForm;