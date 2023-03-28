import { Requests } from "../proxy/Services";
import * as idb from "idb-keyval";

const currentWordRecords = await idb.get("wordRecords");
const currentDictRecords = await idb.get("dictRecords");

async function fetchSaveWords(token) {
	const wordrecords = await Requests.fetchAllWords(token);
	await idb.set("wordRecords", wordrecords);
	return wordrecords;
}

async function fetchSaveDictionary(token) {
	const dictrecords = await Requests.fetchAllRecords(token);
	await idb.set("dictRecords", dictrecords);
	return dictrecords;
}

export async function fetchBothRecords(token) {
	if (currentWordRecords || currentDictRecords) {
		return [provideWords(), provideDictionaries()];
	}
	const recordArray = await Promise.all([fetchSaveWords(token), fetchSaveDictionary(token)]);
	return recordArray;
}

async function provideWords() {
	/* run an algorithm that checks if currentWordRecords needs an update. */
	return currentWordRecords;
}

export async function provideDictionaries() {
	/* run an algorithm that checks if currentWordRecords needs an update. */
	return currentDictRecords;
}

function predictSearch(word = "", data = []) {
	let output = [];
	let substringTwo = word.substring(0, 2);
	let substringThree = word.substring(0, 3);

	for (let i = 0; i < data.length; i++) {
		if (data[i].name.substring(0, 2) === substringTwo || data[i].name.substring(0, 3) === substringThree) {
			output.push(data[i].name);
		}
	}
	return output ?? [];
}

function predictDictionary(word) {}

export async function predictSuggestion(word = "", category = "") {
	const localData = await provideWords();
	const localRecord = await provideDictionaries();

	switch (category) {
		case "search":
			return predictSearch(word, localData.data);
		case "dictionary":
			break;
	}
}
