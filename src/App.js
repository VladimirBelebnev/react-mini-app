import React from 'react';
import { useState, useEffect } from 'react';
import { Collection } from './Collection';
import './index.scss';

const categories = [
	{ "name": "Все" },
	{ "name": "Море" },
	{ "name": "Горы" },
	{ "name": "Архитектура" },
	{ "name": "Города" }
];

function App() {
	const [categoryID, setCategoryID] = useState(0);
	const [collections, setCollections] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setIsLoading(true);

		const category = categoryID ? `category=${categoryID}` : ''; 

		fetch(`https://6389f629c5356b25a20dc4dd.mockapi.io/collections?page=${page}&limit=3&${category}`)
			.then(result => result.json())
			.then(json => setCollections(json))
			.catch(err => {
				console.log(err);
				alert('Ошибка загрузки данных с сервера.')
			})
			.finally(() => setIsLoading(false))
	}, [categoryID, page]);

	return (
		<div className="App">
		<h1>Моя коллекция фотографий</h1>
		<div className="top">
			<ul className="tags">
				{
					categories.map((obj, index) => <li onClick={() => setCategoryID(index)} className={categoryID == index ? 'active' : ''} key={obj.name}>{obj.name}</li>)
				}
			</ul>
			<input 
				value={searchValue} 
				onChange={event => setSearchValue(event.target.value)}
				className="search-input" 
				placeholder="Поиск по названию" />
		</div>
		<div className="content">
				{isLoading ? <h2>Идет загрузка...</h2> : 
					collections
						.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
						.map((obj, index) => (
							<Collection key={index} name={obj.name} images={obj.photos} />)
				)}
		</div>
			<ul className="pagination">
				{
					[...Array(3)].map((_, index) => <li onClick={() => setPage(index + 1)} className={page == index + 1 ? 'active' : ''}>{index + 1}</li>)
				}
			</ul>
		</div>
	);
};

export default App;