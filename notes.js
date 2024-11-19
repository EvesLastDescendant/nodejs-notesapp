const fs = require('fs'); // require fs module
const chalk = require('chalk');

// create function to fetch existing notes from file
const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON); 
    } catch (error) {
        return [];
    }
}

// create function to save added note to a file
const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}


// create function to add note
const addNote = function(title, body) {
    const notes = loadNotes();

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes);

        console.log(chalk.green.bold('New note has been added to file!'));
    } else {
        console.log(chalk.red.bold('Note title taken!'));
    }
}

const removeNote = function(title) {
    const notes = loadNotes();

    const titleMatch = notes.filter((note) => note.title === title);
    
    if (titleMatch.length > 0) {
        const remainingNotes = notes.filter((note) => note.title !== title);
        
        saveNotes(remainingNotes);

        console.log(chalk.green.bold('Note removed successfully!'));
    } else {
        console.log(chalk.red.bold('No note found!'));
    }
};

const listNotes = function() {
    const notes = loadNotes();

    if (notes.length > 0) {
        console.log(chalk.green.bold('Your notes:'));
        notes.forEach((note) => {
            console.log(chalk.bold.blue(note.title));
            console.log(chalk.dim.yellow(note.body));            
        })
    } else {
        console.log(chalk.red('No notes found!', 'Try adding some!'));
    }
}

const readNote = function(title) {
    const notes = loadNotes();

    const noteToRead = notes.find((note) => note.title === title);
    
    if (noteToRead) {
        console.log(chalk.bold.blue(noteToRead.title));
        console.log(chalk.dim.yellow(noteToRead.body));
    } else {
        console.log(chalk.red('No note found!'));
    }
}

// export functions to be used in app.js
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};