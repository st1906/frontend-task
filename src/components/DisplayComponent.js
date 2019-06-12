import React from 'react';
import './displayComponentStyle.css'

class DisplayComponent extends React.Component{

    state = {
        colors : [],
        textValue : '',
        colorValue : ''
    };

    componentDidMount(){
        this.getColors();
        this.getColors();
    }

    getColors = async() => {
        try{
            const response = await fetch('http://www.colr.org/json/color/random');
            const colorData = await response.json();
            const color = colorData.colors[0].hex;
            const newColors = [...this.state.colors, color];
            this.setState({colors:newColors});
        }
        catch(err){
            console.log('Error: ', err);
        }
    }
    

    handleInputChange = (event) => {
        this.setState({textValue : event.target.value});
    }

    handleClickColor = () => {
        if(this.state.colorValue === ''){
            /**Generates randomly 0 or 1 */
            const randomIndex = Math.round(Math.random());
            const backgroundColor =`#${this.state.colors[randomIndex]}`;
            this.setState({colorValue : backgroundColor});
        }
        else
            this.setState({colorValue:''});
    }

    render(){
        return(
            <div>
                <div   
                    onClick={this.handleClickColor}
                    className ='display-box'
                    style = {{
                            background: this.state.colorValue ? `${this.state.colorValue}` : 'black',
                        }}>
                    <p  className = 'display-text'
                        style = {{ display: this.state.textValue? 'block' : 'none'
                        }}>
                            {this.state.textValue}
                    </p>
                </div>
                <input  className='input-text'
                        type='text'
                        placeholder = 'start typing (max. 120)'
                        maxLength='120'
                        value = {this.state.textValue} 
                        onChange = {this.handleInputChange}/>
            </div>

        );
    }
}

export default DisplayComponent;