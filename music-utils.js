// music-utils.js - Music utility functions

//test

// Note to pitch conversion
function noteToPitch(note) {
    const pitchClasses = {
        "C": 0, "Db": 1, "C#": 1, "D": 2, "Eb": 3, "D#": 3, "E": 4,
        "F": 5, "Gb": 6, "F#": 6, "G": 7, "Ab": 8, "G#": 8, "A": 9,
        "Bb": 10, "A#": 10, "B": 11
    };
    
    // Validate the note input
    if (!note || typeof note !== 'string') {
        console.error('Invalid note input:', note);
        return [undefined, undefined];
    }
    
    const name = note.slice(0, -1);
    const octaveStr = note.slice(-1);
    const octave = parseInt(octaveStr);
    
    // Validate the note name and octave
    if (!(name in pitchClasses)) {
        console.error('Invalid note name:', name, 'in note:', note);
        return [undefined, undefined];
    }
    
    if (isNaN(octave)) {
        console.error('Invalid octave:', octaveStr, 'in note:', note);
        return [undefined, undefined];
    }
    
    return [pitchClasses[name], octave];
}

// Note transposition - EXACT MATCH TO PYTHON transpose_note function
function transposeNote(note, semitones, key) {
    const [pitchClass, octave] = noteToPitch(note);
    
    // Handle invalid notes
    if (pitchClass === undefined || octave === undefined) {
        console.error('Invalid note in transposeNote:', note);
        return note; // Return original note if invalid
    }
    
    // Fix JavaScript modulo behavior for negative numbers
    const newPitch = ((pitchClass + semitones) % 12 + 12) % 12;
    const newOctave = octave + Math.floor((pitchClass + semitones) / 12);
    
    // Define pitch classes exactly like Python
    const PITCH_CLASSES_SHARP = {0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F",
                                 6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"};
    const PITCH_CLASSES_FLAT = {0: "C", 1: "Db", 2: "D", 3: "Eb", 4: "E", 5: "F",
                                6: "Gb", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B"};
    const FLAT_KEYS = new Set(["Db", "Ab", "Eb", "Bb", "F", "C"]);
    
    // Choose sharp/flat based on key - exact Python logic
    const pitchClasses = FLAT_KEYS.has(key) ? PITCH_CLASSES_FLAT : PITCH_CLASSES_SHARP;
    let pitchName = pitchClasses[newPitch];
    
    // Special handling for certain keys - EXACT Python logic from lines 17-19
    if (["F#", "B", "E", "A", "D", "G"].includes(key)) {
        if (["Db", "Eb", "Gb", "Ab", "Bb"].includes(pitchName)) {
            const sharpMap = {1: "C#", 3: "D#", 6: "F#", 8: "G#", 10: "A#"};
            pitchName = sharpMap[newPitch] || pitchName;
        }
    }
    
    return `${pitchName}${newOctave}`;
}

// Adjust right cell octaves to match left cell
function adjustRightCell(leftCell, rightCell) {
    const [leftEndPitch, leftEndOctave] = noteToPitch(leftCell[leftCell.length - 1]);
    const [rightStartPitch, rightStartOctave] = noteToPitch(rightCell[0]);
    
    let octaveShift;
    if (leftEndPitch === rightStartPitch) {
        octaveShift = leftEndOctave - rightStartOctave;
    } else {
        const pitchDiff = (rightStartPitch - leftEndPitch + 12) % 12;
        if (pitchDiff > 6) {
            octaveShift = leftEndOctave + 1 - rightStartOctave;
        } else {
            octaveShift = leftEndOctave - rightStartOctave;
        }
    }
    
    const result = rightCell.map(note => {
        const [pitchClass, octave] = noteToPitch(note);
        
        // Handle invalid notes
        if (pitchClass === undefined || octave === undefined) {
            console.error('Invalid note detected in adjustRightCell:', note);
            return note; // Return original note if invalid
        }
        
        const newOctave = octave + octaveShift;
        
        // Use the same pitch class constants as defined in transposeNote
        const PITCH_CLASSES_SHARP = {0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F",
                                     6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"};
        const PITCH_CLASSES_FLAT = {0: "C", 1: "Db", 2: "D", 3: "Eb", 4: "E", 5: "F",
                                    6: "Gb", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B"};
        const LOCAL_FLAT_KEYS = new Set(["Db", "Ab", "Eb", "Bb", "F", "C"]);
        
        // Find the note name with the new octave
        const pitchClasses = LOCAL_FLAT_KEYS.has("C") ? PITCH_CLASSES_FLAT : PITCH_CLASSES_SHARP;
        const pitchName = pitchClasses[pitchClass];
        
        // Handle case where pitchName is undefined
        if (pitchName === undefined) {
            console.error('Invalid pitch class:', pitchClass, 'for note:', note);
            return note; // Return original note if lookup fails
        }
        
        return `${pitchName}${newOctave}`;
    });
    
    return result;
}

// Cycler class for randomizing cell selection
class Cycler {
    constructor(items) {
        this.originalItems = items;
        this.permutation = [];
        this.index = 0;
        this.resetPermutation();
    }
    
    resetPermutation() {
        this.permutation = Array.from({length: this.originalItems.length}, (_, i) => i);
        this.shuffle(this.permutation);
        this.index = 0;
    }
    
    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    nextItem() {
        if (this.index >= this.permutation.length) {
            this.resetPermutation();
        }
        const item = this.originalItems[this.permutation[this.index]];
        this.index++;
        return item;
    }
}

// Transpose a note down by one octave for display
function transposeNoteDownOneOctave(note) {
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1));
    
    // Transpose down by one octave
    const newOctave = octave - 1;
    
    // Ensure we don't go below a reasonable octave range (octave 1)
    if (newOctave < 1) {
        return `${noteName}1`;
    }
    
    return `${noteName}${newOctave}`;
}

// Generate ABC notation for partial or full phrase (matching LilyPond exactly)
function generateABCScore(phrase, partial = false, phraseLength = 9) {
    let notes;
    let abcNotes;
    
    // Use notes directly without transposing down (like Python LilyPond version)
    const displayPhrase = phrase;
    
    if (partial) {
        if (phraseLength < 5) {
            throw new Error("Phrase must have at least 5 notes for partial display");
        }
        
        if (phraseLength === 9) {
            // Show notes at positions [0, 4, 8] with rests between
            notes = [displayPhrase[0], displayPhrase[4], displayPhrase[8]];
            const abcNotesList = convertToABCWithAccidentals(notes);
            abcNotes = `${abcNotesList[0]} z z z ${abcNotesList[1]} z z z ${abcNotesList[2]}`;
        } else if (phraseLength === 17) {
            // Show notes at positions [0, 4, 8, 12, 16] with rests between
            notes = [displayPhrase[0], displayPhrase[4], displayPhrase[8], displayPhrase[12], displayPhrase[16]];
            const abcNotesList = convertToABCWithAccidentals(notes);
            abcNotes = `${abcNotesList[0]} z z z ${abcNotesList[1]} z z z ${abcNotesList[2]} z z z ${abcNotesList[3]} z z z ${abcNotesList[4]}`;
        } else {
            // Other lengths: show first, middle, and last notes
            notes = [displayPhrase[0], displayPhrase[4], displayPhrase[displayPhrase.length - 1]];
            const abcNotesList = convertToABCWithAccidentals(notes);
            abcNotes = `${abcNotesList[0]} z z z ${abcNotesList[1]} z z z ${abcNotesList[2]}`;
        }
    } else {
        // Full phrase: show all notes with proper accidental handling and beaming
        notes = displayPhrase;
        const abcNotesList = convertToABCWithAccidentals(notes);
        abcNotes = groupNotesForBeaming(abcNotesList);
    }
    
    console.log(`Generating ABC score ${partial ? 'partial' : 'full'}: original phrase=${phrase}, display phrase=${displayPhrase}, notes=${notes}, abcNotes=${abcNotes}`);
    
    // Generate ABC notation string
    const abcNotation = `X:1
L:1/8
M:4/4
K:C
${abcNotes}`;
    
    return abcNotation;
}

// Group notes for proper beaming in ABC notation (eighth notes in groups of 4)
function groupNotesForBeaming(abcNotesList) {
    const beamedGroups = [];
    
    for (let i = 0; i < abcNotesList.length; i += 4) {
        const group = abcNotesList.slice(i, i + 4);
        if (group.length === 4) {
            // Group of 4 notes - beam them together
            beamedGroups.push(group.join(''));
        } else {
            // Remaining notes (less than 4) - separate with spaces
            beamedGroups.push(group.join(' '));
        }
    }
    
    return beamedGroups.join(' ');
}

// Convert notes to ABC notation with proper accidental state tracking
function convertToABCWithAccidentals(notes) {
    const accidentalState = {}; // Track accidentals by pitch class AND octave within the measure
    
    return notes.map(note => {
        const noteName = note.slice(0, -1);
        const octave = parseInt(note.slice(-1));
        
        const pitchClass = noteName[0]; // Base pitch class (C, D, E, F, G, A, B)
        const currentAccidental = noteName.length > 1 ? noteName[1] : null;
        
        // Create key that includes both pitch class and octave (e.g., "B4", "B3")
        const accidentalKey = `${pitchClass}${octave}`;
        
        let baseNote = pitchClass.toLowerCase();
        let accidentalSymbol = "";
        
        // Determine what accidental symbol to use based on current state
        if (currentAccidental === "#") {
            if (accidentalState[accidentalKey] !== "#") {
                accidentalSymbol = "^"; // Sharp
                accidentalState[accidentalKey] = "#";
            }
        } else if (currentAccidental === "b") {
            if (accidentalState[accidentalKey] !== "b") {
                accidentalSymbol = "_"; // Flat
                accidentalState[accidentalKey] = "b";
            }
        } else {
            // Natural note - only add natural sign if we need to cancel a previous accidental
            if (accidentalState[accidentalKey] === "#" || accidentalState[accidentalKey] === "b") {
                accidentalSymbol = "="; // Natural (cancels previous accidental)
                accidentalState[accidentalKey] = "natural";
            }
        }
        
        // Apply accidental symbol
        if (accidentalSymbol) {
            baseNote = accidentalSymbol + baseNote;
        }
        
        // Handle octaves relative to octave 4 (middle octave in ABC)
        // For F3-E5 range, we want good staff representation
        if (octave >= 5) {
            // Higher octaves use apostrophes
            const apostrophes = "'".repeat(octave - 4);
            baseNote = baseNote + apostrophes;
        } else if (octave === 4) {
            // Octave 4 stays as is (lowercase)
            baseNote = baseNote;
        } else if (octave === 3) {
            // Octave 3 uses uppercase (good for our F3-E5 range)
            baseNote = baseNote.toUpperCase();
        } else if (octave <= 2) {
            // Lower octaves use commas
            baseNote = baseNote.toUpperCase();
            const commas = ",".repeat(3 - octave);
            baseNote = baseNote + commas;
        }
        
        return baseNote;
    });
}

// Convert note to ABC notation - SIMPLE APPROACH matching LilyPond
function convertToABCNote(note) {
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1));
    
    let baseNote = noteName[0].toLowerCase();
    
    // Handle accidentals - simple approach like LilyPond
    if (noteName.length > 1) {
        const accidental = noteName[1];
        if (accidental === "#") {
            baseNote = "^" + baseNote;
        } else if (accidental === "b") {
            baseNote = "_" + baseNote;
        }
    }
    
    // Handle octaves relative to octave 4 (middle octave in ABC)
    // For F3-E5 range, we want good staff representation
    if (octave >= 5) {
        // Higher octaves use apostrophes
        const apostrophes = "'".repeat(octave - 4);
        baseNote = baseNote + apostrophes;
    } else if (octave === 4) {
        // Octave 4 stays as is (lowercase)
        baseNote = baseNote;
    } else if (octave === 3) {
        // Octave 3 uses uppercase (good for our F3-E5 range)
        baseNote = baseNote.toUpperCase();
    } else if (octave <= 2) {
        // Lower octaves use commas
        baseNote = baseNote.toUpperCase();
        const commas = ",".repeat(3 - octave);
        baseNote = baseNote + commas;
    }
    
    return baseNote;
}

// Simple ABC conversion without state management
function convertToABC(notes) {
    return notes.map(note => convertToABCNote(note));
}

// Generate transposed cells for different phrase types
function generateTransposedCells(originalCells, semitones, key) {
    return originalCells.map(cell => 
        cell.map(note => transposeNote(note, semitones, key))
    );
}

// Get the key display string for a phrase type
function getKeyDisplayString(phraseType, key) {
    if (KEY_CHORD_MAP[phraseType] && KEY_CHORD_MAP[phraseType][key]) {
        return KEY_CHORD_MAP[phraseType][key];
    }
    return `in the key of ${key}`;
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        noteToPitch, transposeNote, transposeNoteDownOneOctave, adjustRightCell, Cycler, convertToABCNote, 
        convertToABCWithAccidentals, groupNotesForBeaming, generateABCScore, convertToABC, generateTransposedCells, getKeyDisplayString
    };
} 

// Functions for 7sus4 chord display and key mapping are now in data.js