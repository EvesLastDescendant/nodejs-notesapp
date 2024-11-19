const chalk = require('chalk'); // require chalk
const yargs = require('yargs'); // require yargs
const notes = require('./notes'); // require notesjs file

// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
        
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Remove a note',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
        
    }
})

// create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: function() {
        notes.listNotes();        
    }
})

// create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Read a note',
            demandOption: true,
            type: 'string',
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title);
    }
})

// initialize yargs to parse
yargs.parse()






