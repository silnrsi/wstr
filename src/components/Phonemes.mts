// Data structures for graphemes and phonemes.

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
	slug: string;
}


