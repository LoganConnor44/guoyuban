#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import {render, Box, Text} from 'ink';
import type {FC} from 'react';
import Ascii from './Ascii';
import 'mongodb-typescript';
import IMovie from './IMovie';
import Movie from './Movie';
import SelectInput from 'ink-select-input';
//import meow from 'meow';

// const cli = meow(`
// 	Usage
// 	  $ ink-js-test

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ ink-js-test --name=Jane
// 	  Hello, Jane
// `, {
// 	flags: {
// 		name: {
// 			type: 'string'
// 		}
// 	}
// });

export interface NonIndicatorProps {
	isSelected?: boolean;
}
const NonIndicator: FC<NonIndicatorProps> = ({isSelected = false}) => (<Text></Text>);

export interface ItemProps {
	label: string;
}
const NonItem: FC<ItemProps> = ({label}) => (
	<Text>{label}</Text>
);

const App = () => {
	const [items1, setItems1] = useState<{label: string, value: number}[]>([]);
	const [items2, setItems2] = useState<{label: string, value: number}[]>([]);
	const [items3, setItems3] = useState<{label: string, value: number}[]>([]);
	const [items4, setItems4] = useState<{label: string, value: number}[]>([]);
	const [selectedName, setSelectedName] = useState<string>('');
	const [selectedStream, setSelectedStream] = useState<string>('');
	const [selectedChineseName, setSelectedChineseName] = useState<string>('');
	const [selectedId, setSelectedId] = useState<string>('');

	useEffect(() => {
		const getAllRecords = () => {
			Movie.find({'healthy-stream': {$eq: true}, 'english': {$ne: ''}}).sort({'english': 1}).then((movies: IMovie[]) => {
				movies.forEach((movie: IMovie, index: number) => {
					if (movie.english.trim() !== '') {
						// if (index <= 14) {
						// 	items1.unshift({
						// 		label: '',
						// 		value: index
						// 	});
						// }
						// items1.push({
						// 	label: movie.english.substr(0,30),
						// 	value: Number(movie._id)
						// });
						items2.push({
							label: movie.english.substr(0,30),
							value: Number(movie._id)
						});
						if (index > 14) {
							items3.push({
								label: movie.english.substr(0,30),
								value: Number(movie._id)
							});
						}
						if (index > 29) {
							items4.push({
								label: movie.english.substr(0,30),
								value: Number(movie._id)
							});
						}
						
					}
				});
				setItems1(items1);
				setItems2(items2);
				setItems3(items3);
				setItems4(items4);
			});
		};
		getAllRecords();
	}, [items2]);

	const handleSelect = (item: {label: string, value: number}) => {
		if (item.value !== Number(selectedId)) {
			setSelectedName(item.label);
			Movie.findOne({_id: {$eq: item.value.toString()} }, (err: any, movie: IMovie) => {
				if (movie !== null) {
					setSelectedStream(movie.stream);
					setSelectedChineseName(movie.chinese);
					setSelectedId(movie._id);
				}
			});
		} else {
			
		}
	};

	return (
		<React.Fragment>
			<Ascii font="Doh" 
				horizontalLayout="fitted" 
				verticalLayout="default" 
				text="GuoYu Ban" />
			<Box height={15} flexDirection="row">
				<Box flexGrow={1} flexDirection="column" marginLeft={1} marginRight={1}>
					<Text>{selectedName}</Text>
					<Text>{selectedChineseName}</Text>
					<Text>{selectedStream}</Text>
				</Box>
				<Box flexGrow={1} flexDirection="column" marginLeft={1} marginRight={1}>
					<SelectInput key={2} 
						items={items2}
						onHighlight={handleSelect} 
						limit={15} />
				</Box>
				<Box flexGrow={1} flexDirection="column" marginLeft={1} marginRight={1}>
					<SelectInput key={3} 
						items={items3}
						indicatorComponent={NonIndicator} 
						itemComponent={NonItem}
						limit={15} />
				</Box>
				<Box flexGrow={1} flexDirection="column" marginLeft={1} marginRight={1}>
					<SelectInput key={4} 
						items={items4}
						indicatorComponent={NonIndicator} 
						itemComponent={NonItem}
						limit={15} />
				</Box>
			</Box>
		</React.Fragment>
	)
};

render (<App />)