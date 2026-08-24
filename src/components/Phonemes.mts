// Data structures for graphemes and phonemes.

import _phonemeData from '../data/phonemes.json';
export const phonemeData: Record<string, PhonemeItem> = _phonemeData;

import _wsgData from '../data/ws-graphemes.json';
export const phonograms: Array<Phonogram> = _wsgData.phonograms;
export const wsNames: Record<string, string> = _wsgData.names;

interface Phonogram {
	ws: string;
	chars: string[];
	phoneme: string;
	status: string;
	example: string;
	notes: string;
}

interface PhonemeItem {
	symbol: string;
	label: string;
	sortkey: string;
	slug?: string;
}

export function phonemeSymbol(key: string): string {
	return phonemeData[key]?.symbol ?? "";
}

export function phonemeLabel(key: string): string {
	return phonemeData[key]?.label ?? "";
}

export function phonemeSlug(key: string): string {

	let result = phonemeData[key]?.slug ?? key;

	const hpos = result.indexOf("#");
	let anchor = "";
	if (hpos > -1) {
		anchor = result.substring(hpos);
		result = result.substring(0, hpos);
	}

	if (result.substring(0, 4) == 'diph') {
		result = result.replace("-lngth", "");
		
	} else if (result.substring(0, 4) == "dart") {
		// NOT YET IMPLEMENTED
	
	} else if (result.substring(0, 4) == "tone") {
	
	} else if (result.substring(0, 3) == "vwl") {
		// remove modification, eg, '-short'
		if (result.substring(0, 9) == "vwl-ce-ap") {
			result = "vwl-ce-ap";
		} else {
			result = result.substring(0, 13);	// eg, vwl-fr-op-rnd
		}

	} else if (result.substring(0, 4) == "cons") {  // eg, cons-null

	} else {   // consonant
		// remove modification, eg, '-gemin'
		let place = result.substring(0, 3);
		if (place == "stp" || place == "aff" || place == "fri" || place == "tap") {
			result = result.substring(0, 10);	// eg, stp-bil-vl
		} else {
			result = result.substring(0, 7);	// eg, nas-alv
		}
	}

	result = phonemeData[result]?.slug ?? result;	// eg, nas-den -> nas-alv

	result = result.replace("+", "__");
	result = result + anchor;
	console.log(key + " >> " + result);
	return result;
}
