const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv
var command = argv._[0]

if(command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	if(note){
		console.log('Note created');
		notes.logNote(note);
	} else {
		console.log('ERROR: duplicate title');
	}
} else if(command === 'list'){
	var list = notes.getAll();
	if(list.length > 0){
		list.forEach((note) => {
			notes.logNote(note);
		});
	} else {
		console.log('No notes found');
	}
} else if(command === 'read') {
	var note = notes.getNote(argv.title);
	if(note){
		notes.logNote(note);
	} else {
		console.log('Note not existing');
	}
} else if(command === 'remove'){
	var message = notes.removeNote(argv.title) ? 'Note was removed' : 'No note removed';
	console.log(message);
} else {
	console.log('Command not recognized');
}