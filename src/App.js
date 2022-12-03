import { useState } from 'react';
import './index.scss';

const questions = [
	{
		title: 'React - это ... ?',
		variants: ['библиотека', 'фреймворк', 'приложение'],
		correct: 0,
	},
	{
		title: 'Компонент - это ... ',
		variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
		correct: 1,
	},
	{
		title: 'Что такое JSX?',
		variants: [
		'Это простой HTML',
		'Это функция',
		'Это тот же HTML, но с возможностью выполнять JS-код',
		],
		correct: 2,
	},
];

function Result({ correct, onStartAgain }) {
	return (
		<div className="result">
			<img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
			<h2>Вы отгадали {correct} ответа из {questions.length}</h2>
			<button onClick={onStartAgain}>Попробовать снова</button>
		</div>
	);
}

function Game({ question, step, onClickVariant }) {
	const procentage = Math.round((step / questions.length) * 100);
	return (
		<>
			<div className="progress">
				<div style={{ width: `${procentage}%` }} className="progress__inner"></div>
			</div>
			<h1>{question.title}</h1>
			<ul>
				{question.variants.map((answer, index) => (
					<li key={index} onClick={() => onClickVariant(index)}>{answer}</li>
				))}
			</ul>
		</>
	);
}

function App() {
	const [step, setStep] = useState(0);
	const [correct, setCorrect] = useState(0);

	const question = questions[step];

	const onClickVariant = (index) => {
		if (index === question.correct) {
			setCorrect(correct + 1);
		}

		setStep(step + 1); 
	};

	const onStartAgain = () => {
		setStep(0);
		setCorrect(0);
	};

	return (
		<div className="App">
			{step !== questions.length ? <Game question={question} step={step} onClickVariant={onClickVariant} /> : <Result correct={correct} onStartAgain={onStartAgain} />}
		</div>
	);
}

export default App;