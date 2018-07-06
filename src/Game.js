import React from 'react';
import Numbers from './Numbers';
import Stars from './Star';
import Button from './Button';
import Answer from './Answer';
import _ from 'lodash';
import DoneFrame from './DoneFrame';

class Game extends React.Component {
    static initialState = () => ({
        selectedNumbers: [],
        usedNumbers: [],
        randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null
    })
    constructor(props) {
        super(props);
        this.state = Game.initialState();
        this.selectNumber = this.selectNumber.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
        this.acceptAnswer = this.acceptAnswer.bind(this);
        this.redraw = this.redraw.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }
    resetGame = () => {
        this.setState(Game.initialState);
    }
    possibleSolutionsExist = ({randomNumberOfStars, usedNumbers}) => {
        const possibleSummands = _.range(1,10).filter(n =>
            (n <= randomNumberOfStars && usedNumbers.indexOf(n) === -1)
        );
        let possibleSums = [0];
        possibleSummands.forEach(n =>
            possibleSums = possibleSums.concat(possibleSums.map(s => s + n))
        );

        return possibleSums.indexOf(randomNumberOfStars) !== -1;
    }
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return {doneStatus: "Yayyyyyy"}
            }
            if (prevState.redraws === 0 && !this.possibleSolutionsExist(prevState)) {
                return {doneStatus: "Game over!"}
            }
        });
    }
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0
            || this.state.usedNumbers.indexOf(clickedNumber) >= 0)
            {return;}
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    }
    unselectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(num => num !== clickedNumber)
        }));
    }
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars 
                === prevState.selectedNumbers.reduce((total, n) => total + n, 0)
        }));
    }
    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: 1 + Math.floor(Math.random() * 9)
        }), this.updateDoneStatus);
    }
    redraw = () => {
        if (this.state.redraws === 0) {return;}
        this.setState(prevState => ({
            randomNumberOfStars: 1 + Math.floor(Math.random() * 9),
            answerIsCorrect: null,
            selectedNumbers: [],
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus);
    }
    render() {
        return (
            <div className="container"> 
                <h1>Play Nine</h1>
                <hr />
                <div className="row">
                    <Stars numberOfStars={this.state.randomNumberOfStars} /> 
                    <br />
                    <Button selectedNumbers={this.state.selectedNumbers} 
                            handleClick={this.checkAnswer} 
                            redraw={this.redraw}
                            redraws={this.state.redraws} 
                            answerIsCorrect={this.state.answerIsCorrect} 
                            acceptAnswer={this.acceptAnswer} />
                    <Answer     selectedNumbers={this.state.selectedNumbers} 
                                unselectNumber={this.unselectNumber} />

                </div>
                <br />
                {this.state.doneStatus ? 
                    <DoneFrame  status={this.state.doneStatus} 
                                handleClick={this.resetGame} /> : <div></div>
                }
                    <Numbers    selectedNumbers={this.state.selectedNumbers} 
                                selectNumber={this.selectNumber} 
                                usedNumbers={this.state.usedNumbers} />
                
            </div>
        );
    }
}

export default Game;
