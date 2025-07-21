// data.js - Musical data structures converted from Python
// Simplified version - base cells defined once, transposed versions generated programmatically

// ============================================================================
// BASE CELLS DEFINITIONS (Define each pattern only once)
// ============================================================================

// Base cells for 7sus4 (dominant) phrases
const BASE_CELLS = [
    ["Bb4", "D4", "F4", "F#4", "A4"],
    ["D4", "F4", "E4", "D4", "C4"],
    ["A4", "G4", "F#4", "G4", "C5"],
    ["E4", "G4", "Bb4", "D5", "C5"],
    ["C5", "B4", "Bb4", "A4", "G4"],
    ["C4", "D4", "E4", "G4", "Bb4"],
    ["Bb4", "A4", "G4", "F4", "E4"],
    ["Bb3", "C4", "D4", "F4", "E4"],
    ["G4", "D4", "F4", "D4", "E4"],
    ["D4", "F4", "D4", "Eb4", "E4"],
    ["E4", "D4", "C4", "B3", "Bb3"],
    ["E5", "F5", "D5", "Bb4", "A4"],
    ["A4", "Bb4", "F#4", "A4", "G4"],
    ["Bb4", "F4", "F#4", "A4", "G4"],
    ["F#4", "A4", "G#4", "F#4", "G4"],
    ["D4", "F4", "F#4", "A4", "G4"],
    ["G4", "A4", "Bb4", "C5", "D5"],
    ["G4", "F4", "E4", "D4", "C4"],
    ["G4", "Bb4", "D5", "F5", "E5"],
    ["D5", "Ab4", "A4", "C5", "Bb4"],
    ["G4", "F4", "E4", "F4", "D4"],
    ["D5", "Bb4", "A4", "G4", "C5"],
    ["D5", "Bb4", "G4", "F4", "E4"],
    ["Bb3", "C4", "D4", "E4", "F4"],
    ["C5", "B4", "Bb4", "D4", "F4"],
    ["F4", "F#4", "A4", "Ab4", "G4"],
    // Note: Commented out cell ["F4", "D4", "Bb3", "G3", "E4"] was already removed
    ["F4", "D4", "C4", "Bb3", "A3"],
    ["Bb3", "C4", "D4", "F4", "F#4"],
    ["Bb4", "A4", "G4", "F4", "F#4"],
    ["F#4", "A4", "G4", "F4", "E4"],
    ["F#4", "A4", "G4", "E4", "C4"],
    ["A4", "Bb4", "D5", "F5", "F#5"],
    //7.12
    ["Bb4","F#4","A4","Ab4","G4"],
    ["A4","G4","D4","F4","E4"],
    ["A4","G4","D4","F4","F#4"],
    ["C5", "B4", "Bb4", "F4", "F#4"],
    ["C5","B4","Bb4","C5","D5"],
    //7.20
    ["Bb4", "D4", "Db4", "D4", "A4"],
    ["Bb3", "F4", "D4", "Bb3", "A3"],
];

// Additional cells unique to CELLS2 (these are only in CELLS2, not in base CELLS)
const BASE_CELLS2_ADDITIONAL = [
    ["D5", "Bb4", "A4", "G4", "F#4"],
    ["G4", "A4", "Bb4", "C5", "Db5"],
    ["G4", "A4", "Bb4", "C5", "Eb5"],
    ["C5", "Bb4", "A4", "Bb4", "Eb5"],
    ["G4", "F4", "E4", "F4", "Db4"],
    ["D5", "Bb4", "A4", "G4", "Ab4"],
    ["C5", "B4", "Bb4", "A4", "Ab4"],
    ["Bb3", "D4", "F4", "A4", "Ab4"],
    ["Bb4", "D4", "F4", "A4", "Ab4"],
    ["D4", "F4", "F#4", "A4", "Ab4"],
];

// Base cells for major phrases (C major cells)
const BASE_MAJOR_CELLS = [
    ["G4", "A4", "B4", "D5", "C5"],
    ["E4", "G4", "B4", "D5", "C5"],
    ["E4", "G4", "B4", "D5", "B4"],
    ["B4", "C5", "D5", "Db5", "C5"],
    ["E5", "Bb4", "B4", "D5", "C5"],
    ["C5", "B4", "A4", "Ab4", "G4"],
    ["C4", "D4", "E4", "G4", "B4"],
    ["C5", "E4", "G4", "B4", "A4"],
    ["B4", "A4", "G4", "F4", "E4"],
    ["D4", "C4", "B3", "C4", "E4"],
    ["E4", "G4", "A4", "B4", "D5"],
    ["D5", "C5", "B4", "A4", "G4"],
    ["E4", "G4", "B4", "A4", "G4"],
    ["B4", "A4", "G#4", "F#4", "G4"],
    ["G4", "F4", "E4", "D4", "B3"],
    ["G4", "E4", "D4", "C4", "B3"],
    ["G4", "E4", "B3", "G3", "A3"],
    ["B3", "C4", "E4", "G4", "B4"],
    ["D5", "C5", "E4", "G4", "B4"],
    ["E5", "D5", "Bb4", "B4", "D5"],
    ["B4", "A4", "G4", "E4", "D4"],
    ["D5", "Db5", "C5", "E5", "B4"],
    ["C5", "E4", "G4", "B4", "A4"],
    ["A4", "G4", "G#4", "F#4", "G4"],
    ["A4", "G#4", "G4", "F4", "E4"],
    ["A4", "G4", "C4", "F4", "E4"],
    ["G4", "B3", "C4", "F4", "E4"],
    ["G4", "F4", "D4", "Eb4", "E4"],
    ["B4", "C5", "G#4", "B4", "A4"],
    ["E4", "C4", "B3", "A3", "D4"],
    ["C5", "E4", "Eb4", "E4", "B4"],
    ["A4", "C5", "B4", "A4", "G4"],
    ["C5", "G4", "Ab4", "B4", "A4"]
];

// Base cells for major resolution (C dominant resolving to F major)
const BASE_MAJOR_RESOLUTION_CELLS = [
    ["C5", "Bb4", "Eb5", "Db5", "C5"],
    ["C5", "Ab4", "E4", "C4", "G4"],
    ["E4", "Db4", "C4", "Bb3", "A3"],
    ["E4", "Db5", "C5", "Bb4", "A4"],
    ["E4", "G4", "Bb4", "Db5", "C5"],
    ["E4", "G4", "Db4", "B3", "C4"],
    ["G4", "E4", "C4", "Bb3", "A3"],
    ["G4", "Ab4", "E4", "Db4", "C4"],
    ["Bb4", "Ab4", "E4", "C4", "G4"],
    ["Bb4", "Ab4", "E4", "Db4", "C4"],
    ["Db4", "Eb4", "C4", "Bb3", "A3"],
    ["Eb4", "Db4", "C4", "Bb3", "A3"],
    ["Eb4", "Db4", "Ab3", "Bb3", "C4"],
    ["Eb4", "Db4", "Ab3", "E3", "C4"],
    ["F#4", "E4", "Eb4", "Db4", "C4"],
    ["F#4", "A4", "G4", "E4", "C4"],
    ["A4", "G4", "Gb4", "G4", "C5"],
    ["A4", "Ab4", "E4", "C4", "G4"],
    ["A4", "G4", "Eb4", "E4", "G4"],
    ["A4", "Ab4", "E4", "Db4", "C4"],
    ["Ab4", "E4", "Eb4", "Db4", "C4"],
    ["Ab4", "E5", "Eb5", "Db5", "C5"],
];

// Base cells for minor phrases
const BASE_MINOR_B_CELLS = [
    ["D4", "C4", "B3", "A3", "G#3"],
    ["B3", "D4", "F4", "A4", "G#4"],
    ["B4", "D4", "F4", "A4", "G#4"],
    ["A4", "C5", "B4", "A4", "G#4"],
    ["F4", "D4", "B3", "A3", "G#3"],
    ["B4", "F4", "A4", "G4", "G#4"],
    //7.12
    ["G4", "F#4", "F4", "A4", "E4"],
    ["F4", "G4", "A4", "C5", "E5"],
    ["D4", "F4", "A4", "C5", "E5"],

    ["F4", "E4", "D4", "C4", "B3"],
    ["F4", "G4", "A4", "C5", "B4"],
    ["D4", "A3", "C4", "A3", "B3"],
    ["A3", "C4", "A3", "A#3", "B3"],

    ["G4","F#4","F4","E4","D4"],
    ["F4","C4","C#4","E4","D4"],
    ["A4","C5","C#5","E5","D5"],
    ["E4","F4","C#4","E4","D4"],

];

const BASE_MINOR_C_CELLS = [
    ["G#4", "F4", "E4", "D4", "C4"],
    ["G#3", "F4", "E4", "D4", "C4"],
    ["G#3", "B3", "E4", "D4", "C4"],
    ["G#3", "B3", "D4", "F4", "E4"],
    ["G#4", "F4", "D4", "D#4", "E4"],
    ["G#3", "F4", "D4", "D#4", "E4"],
    ["G#4", "B4", "F4", "D#4", "E4"],
    //7.12
    ["E5","C5","G#4","E4","B4"],
    ["E5","C5","G#4","F4","E4"],
    ["E5","A#4","B4","D5","C5"],

    ["B3", "C4", "G#3", "F3", "E3"],

    ["D4", "C4", "G#3", "E3", "B3"],
    ["D4", "C4", "G#3", "F3", "E3"],

];

// Base turnaround cells
const BASE_TURNAROUND_CELLS_1 = [
    ["A4", "G4", "E4", "F4", "Gb4"],
    ["A4", "E4", "G4", "F4", "Gb4"],
    ["A4", "C4", "E4", "G4", "Gb4"],
    ["A4", "C5", "E5", "G5", "Gb5"],
    ["C5", "Bb4", "A4", "G4", "Gb4"],
    ["C4", "D4", "E4", "G4", "Gb4"],
];

// Base cells for rhythm changes bar 5-6 resolution (DFB)
const BASE_DFB = [
    ["A4", "C5", "Eb5", "F#5", "G5"],
    ["C4", "Eb4", "F#4", "A4", "G4"],
    ["F#4", "A4", "G#4", "F#4", "G4"],
    ["D#4", "F#4", "B4", "A4", "G4"],
    ["D#4", "A4", "G#4", "F#4", "G4"],
    ["D#4", "C4", "A3", "F#3", "G3"]
];

// ============================================================================
// TRANSPOSITION HELPER FUNCTIONS (using music-utils.js functions)
// ============================================================================

// These functions will be available after music-utils.js is loaded
// We'll use lazy evaluation to ensure proper initialization

// ============================================================================
// GENERATED CELL SETS (Same names and content as original, but generated)
// ============================================================================

// Direct assignments for non-transposed sets
window.CELLS = [...BASE_CELLS];
window.CELLS2 = [...BASE_CELLS, ...BASE_CELLS2_ADDITIONAL];
window.CELLS2_ADDITIONAL = [...BASE_CELLS2_ADDITIONAL];
window.MAJOR_CELLS = [...BASE_MAJOR_CELLS];
window.MAJOR_RESOLUTION_CELLS = [...BASE_MAJOR_RESOLUTION_CELLS];
window.MINOR_B_CELLS = [...BASE_MINOR_B_CELLS];
window.MINOR_C_CELLS = [...BASE_MINOR_C_CELLS];
window.TURNAROUND_CELLS_1 = [...BASE_TURNAROUND_CELLS_1];
window.DFB = [...BASE_DFB];

// Deferred initialization for transposed sets (will be initialized after music-utils.js loads)
function initializeTransposedCells() {
    console.log('initializeTransposedCells() called - starting initialization...');
    
    // Check if transposeNote is available
    if (typeof transposeNote !== 'function') {
        console.error('transposeNote function not available!');
        return;
    }
    
    // Use the transposeNote function from music-utils.js
    function transposeCells(baseCells, semitones, key = "C") {
        return baseCells.map(cell => 
            cell.map(note => transposeNote(note, semitones, key))
        );
    }
    
    // Filter cells to exclude those starting with specific note
    function filterCellsStartingWith(cells, excludeNote) {
        return cells.filter(cell => !cell[0].startsWith(excludeNote));
    }
    
    // Generate transposed cell sets
    console.log('Generating CELLSM5...');
    window.CELLSM5 = transposeCells(BASE_CELLS, -5, "C");
    console.log('CELLSM5 generated:', window.CELLSM5.length, 'cells');
    
    console.log('Generating MINOR_C_CELLS_DOWN2...');
    window.MINOR_C_CELLS_DOWN2 = transposeCells(BASE_MINOR_C_CELLS, -2, "C");
    console.log('MINOR_C_CELLS_DOWN2 generated:', window.MINOR_C_CELLS_DOWN2.length, 'cells');
    
    console.log('Generating CELLS_up5...');
    window.CELLS_up5 = filterCellsStartingWith(transposeCells(BASE_CELLS, 5, "C"), "F");
    console.log('CELLS_up5 generated:', window.CELLS_up5.length, 'cells');
    
    console.log('Generating CELLS_up2...');
    window.CELLS_up2 = filterCellsStartingWith(transposeCells(BASE_CELLS, 2, "C"), "F");
    console.log('CELLS_up2 generated:', window.CELLS_up2.length, 'cells');
    
    console.log('Generating CELLS_down5...');
    window.CELLS_down5 = filterCellsStartingWith(transposeCells(BASE_CELLS, -5, "C"), "F");
    console.log('CELLS_down5 generated:', window.CELLS_down5.length, 'cells');
    
    console.log('Transposed cell sets initialized successfully');
    
    // Also make them available as global constants for backward compatibility
    window.CELLSM5_GLOBAL = window.CELLSM5;
    window.MINOR_C_CELLS_DOWN2_GLOBAL = window.MINOR_C_CELLS_DOWN2;
    window.CELLS_up5_GLOBAL = window.CELLS_up5;
    window.CELLS_up2_GLOBAL = window.CELLS_up2;
    window.CELLS_down5_GLOBAL = window.CELLS_down5;
}

// ============================================================================
// KEYS AND CHORD MAPPINGS (Unchanged from original)
// ============================================================================

// Keys and transposition
window.KEYS = {
    "C": 0, "G": 7, "D": 2, "A": 9, "E": 4, "B": 11,
    "F#": 6, "Db": 1, "Ab": 8, "Eb": 3, "Bb": 10, "F": 5
};

// Make data structures available globally without window prefix
const KEYS = window.KEYS;
const KEY_CHORD_MAP = window.KEY_CHORD_MAP;
const CELLS = window.CELLS;
const MAJOR_CELLS = window.MAJOR_CELLS;
const MAJOR_RESOLUTION_CELLS = window.MAJOR_RESOLUTION_CELLS;
const MINOR_B_CELLS = window.MINOR_B_CELLS;
const MINOR_C_CELLS = window.MINOR_C_CELLS;
const TURNAROUND_CELLS_1 = window.TURNAROUND_CELLS_1;
const DFB = window.DFB;

// Transposed cell sets will be available after initializeTransposedCells() is called
// These will be initialized in the DOMContentLoaded event

// Pitch classes
window.PITCH_CLASSES_SHARP = {0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F",
                             6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"};
window.PITCH_CLASSES_FLAT = {0: "C", 1: "Db", 2: "D", 3: "Eb", 4: "E", 5: "F",
                            6: "Gb", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B"};

// Keys that prefer flats
window.FLAT_KEYS = new Set(["Db", "Ab", "Eb", "Bb", "F", "C"]);

// Chord mappings for each key
window.KEY_CHORD_MAP = {
    "7sus4": {
        "C": "usable on Gm, C7, Eø7, F#7Alt",
        "G": "usable on Dm, G7, Bø7, Db7Alt",
        "D": "usable on Am, D7, F#ø7, Ab7Alt",
        "A": "usable on Em, A7, C#ø7, Eb7Alt",
        "E": "usable on Bm, E7, G#ø7, Bb7Alt",
        "B": "usable on F#m, B7, D#ø7, F7Alt",
        "F#": "usable on C#m, F#7, A#ø7, C7Alt",
        "Db": "usable on Abm, Db7, Fø7, G7Alt",
        "Ab": "usable on Ebm, Ab7, Cø7, D7Alt",
        "Eb": "usable on Bbm, Eb7, Gø7, A7Alt",
        "Bb": "usable on Fm, Bb7, Dø7, E7Alt",
        "F": "usable on Cm, F7, Aø7, B7Alt"
    },
    "major": {
        "C": "usable on C",
        "G": "usable on G",
        "D": "usable on D",
        "A": "usable on A",
        "E": "usable on E",
        "B": "usable on B",
        "F#": "usable on F#",
        "Db": "usable on Db",
        "Ab": "usable on Ab",
        "Eb": "usable on Eb",
        "Bb": "usable on Bb",
        "F": "usable on F"
    },
    "short_25_major": {
        "C": "in the key of F",
        "G": "in the key of C",
        "D": "in the key of G",
        "A": "in the key of D",
        "E": "in the key of A",
        "B": "in the key of E",
        "F#": "in the key of B",
        "Db": "in the key of F#",
        "Ab": "in the key of Db",
        "Eb": "in the key of Ab",
        "Bb": "in the key of Eb",
        "F": "in the key of Bb"
    },
    "long_25_major": {
        "C": "in the key of F",
        "G": "in the key of C",
        "D": "in the key of G",
        "A": "in the key of D",
        "E": "in the key of A",
        "B": "in the key of E",
        "F#": "in the key of B",
        "Db": "in the key of F#",
        "Ab": "in the key of Db",
        "Eb": "in the key of Ab",
        "Bb": "in the key of Eb",
        "F": "in the key of Bb"
    },
    "short_25_minor": {
        "C": "in the key of Am",
        "G": "in the key of Em",
        "D": "in the key of Bm",
        "A": "in the key of F#m",
        "E": "in the key of C#m",
        "B": "in the key of Abm",
        "F#": "in the key of Ebm",
        "Db": "in the key of Bbm",
        "Ab": "in the key of Fm",
        "Eb": "in the key of Cm",
        "Bb": "in the key of Gm",
        "F": "in the key of Dm"
    },
    "long_25_minor": {
        "C": "in the key of Am",
        "G": "in the key of Em",
        "D": "in the key of Bm",
        "A": "in the key of F#m",
        "E": "in the key of C#m",
        "B": "in the key of Abm",
        "F#": "in the key of Ebm",
        "Db": "in the key of Bbm",
        "Ab": "in the key of Fm",
        "Eb": "in the key of Cm",
        "Bb": "in the key of Gm",
        "F": "in the key of Dm"
    },
    "turnaround": {
        "C": "in the key of C",
        "G": "in the key of G",
        "D": "in the key of D",
        "A": "in the key of A",
        "E": "in the key of E",
        "B": "in the key of B",
        "F#": "in the key of F#",
        "Db": "in the key of Db",
        "Ab": "in the key of Ab",
        "Eb": "in the key of Eb",
        "Bb": "in the key of Bb",
        "F": "in the key of F"
    },
    "rhythm_changes_56": {
        "C": "in the key of C",
        "G": "in the key of G",
        "D": "in the key of D",
        "A": "in the key of A",
        "E": "in the key of E",
        "B": "in the key of B",
        "F#": "in the key of F#",
        "Db": "in the key of Db",
        "Ab": "in the key of Ab",
        "Eb": "in the key of Eb",
        "Bb": "in the key of Bb",
        "F": "in the key of F"
    },
    "ii7_to_v7": {
        "C": "in the key of C",
        "G": "in the key of G",
        "D": "in the key of D",
        "A": "in the key of A",
        "E": "in the key of E",
        "B": "in the key of B",
        "F#": "in the key of F#",
        "Db": "in the key of Db",
        "Ab": "in the key of Ab",
        "Eb": "in the key of Eb",
        "Bb": "in the key of Bb",
        "F": "in the key of F"
    }
};

// Functions from data.py line 318 onwards - EXACT MATCH TO PYTHON

function get_7sus4_chord_display(key, chord_type) {
    /**Generate chord display based on selected key and chord type*/
    if (chord_type === "minor") {
        return `in the key of ${key}m`;
    } else if (chord_type === "dominant") {
        return `in the key of ${key}7`;
    } else if (chord_type === "half_dim") {
        return `in the key of ${key}ø7`;
    } else if (chord_type === "altered") {
        return `in the key of ${key}7Alt`;
    }
    
    return `in the key of ${key}`;
}

function find_7sus4_generation_key(target_key, chord_type) {
    /**Find which key's 7sus4 phrase should be used to generate phrases for the target chord*/
    // Create the target chord string
    let target_chord;
    if (chord_type === "minor") {
        target_chord = `${target_key}m`;
    } else if (chord_type === "dominant") {
        target_chord = `${target_key}7`;
    } else if (chord_type === "half_dim") {
        target_chord = `${target_key}ø7`;
    } else if (chord_type === "altered") {
        target_chord = `${target_key}7Alt`;
    } else {
        return target_key;
    }
    
    // Search through all 7sus4 mappings to find which key's phrase is usable on target_chord
    for (const [generation_key, chord_text] of Object.entries(window.KEY_CHORD_MAP["7sus4"])) {
        if (chord_text.includes("usable on ")) {
            const chords = chord_text.replace("usable on ", "").split(", ");
            if (chords.includes(target_chord)) {
                return generation_key;
            }
        }
    }
    
    // If not found, return the original key
    return target_key;
}

function find_7sus4_target_key_for_display(generation_key, chord_type) {
    /**Find which target key should be displayed given a generation key and chord type in random mode*/
    // Get the chord list for this generation key
    if (!(generation_key in window.KEY_CHORD_MAP["7sus4"])) {
        return generation_key;
    }
    
    const chord_text = window.KEY_CHORD_MAP["7sus4"][generation_key];
    if (!chord_text.includes("usable on ")) {
        return generation_key;
    }
    
    const chords = chord_text.replace("usable on ", "").split(", ");
    
    // Find the chord that matches our chord type
    for (const chord of chords) {
        if (chord_type === "minor" && chord.endsWith("m")) {
            return chord.slice(0, -1); // Remove 'm' suffix
        } else if (chord_type === "dominant" && chord.endsWith("7") && !chord.endsWith("ø7") && !chord.endsWith("Alt")) {
            return chord.slice(0, -1); // Remove '7' suffix
        } else if (chord_type === "half_dim" && chord.endsWith("ø7")) {
            return chord.slice(0, -2); // Remove 'ø7' suffix
        } else if (chord_type === "altered" && chord.endsWith("Alt")) {
            return chord.slice(0, -4); // Remove '7Alt' suffix
        }
    }
    
    // If no match found, return the generation key
    return generation_key;
}

// Add new mappings for specific 7sus4 chord types - EXACT MATCH TO PYTHON
window.KEY_CHORD_MAP["7sus4_minor"] = {};
window.KEY_CHORD_MAP["7sus4_dominant"] = {};
window.KEY_CHORD_MAP["7sus4_half_dim"] = {};
window.KEY_CHORD_MAP["7sus4_altered"] = {};

// Populate the new mappings - EXACT MATCH TO PYTHON
for (const key of Object.keys(window.KEY_CHORD_MAP["7sus4"])) {
    window.KEY_CHORD_MAP["7sus4_minor"][key] = get_7sus4_chord_display(key, "minor");
    window.KEY_CHORD_MAP["7sus4_dominant"][key] = get_7sus4_chord_display(key, "dominant");
    window.KEY_CHORD_MAP["7sus4_half_dim"][key] = get_7sus4_chord_display(key, "half_dim");
    window.KEY_CHORD_MAP["7sus4_altered"][key] = get_7sus4_chord_display(key, "altered");
}

// Random Cycler for 7sus4 chord types (from random_cycler.py)
class Random7sus4Cycler {
    constructor() {
        this.chord_types = ["7sus4_minor", "7sus4_dominant", "7sus4_half_dim", "7sus4_altered"];
        this.current_round = [];
        this.current_index = 0;
        this.round_count = 0;
        this._start_new_round();
    }
    
    _start_new_round() {
        this.current_round = [...this.chord_types];
        this._shuffle(this.current_round);
        this.current_index = 0;
        this.round_count++;
        console.log(`Starting round ${this.round_count}: ${this.current_round.map(ct => ct.replace('7sus4_', ''))}`);
    }
    
    _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    get_next_chord_type() {
        // If we've used all chord types in this round, start a new round
        if (this.current_index >= this.current_round.length) {
            this._start_new_round();
        }
        
        // Get the current chord type and advance the index
        const chord_type = this.current_round[this.current_index];
        this.current_index++;
        const chord_name = chord_type.replace('7sus4_', '');
        console.log(`Generated chord type: ${chord_name} (position ${this.current_index} of round ${this.round_count})`);
        return chord_type;
    }
}

// Random Cycler for keys
class RandomKeyCycler {
    constructor() {
        this.keys = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
        this.current_round = [];
        this.current_index = 0;
        this.round_count = 0;
        this._start_new_round();
    }
    
    _start_new_round() {
        this.current_round = [...this.keys];
        this._shuffle(this.current_round);
        this.current_index = 0;
        this.round_count++;
        console.log(`Starting key round ${this.round_count}: ${this.current_round}`);
    }
    
    _shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    get_next_key() {
        // If we've used all keys in this round, start a new round
        if (this.current_index >= this.current_round.length) {
            this._start_new_round();
        }
        
        // Get the current key and advance the index
        const key = this.current_round[this.current_index];
        this.current_index++;
        console.log(`Generated key: ${key} (position ${this.current_index} of round ${this.round_count})`);
        return key;
    }
}

// Global instances for the random cyclers
window.random_7sus4_cycler = new Random7sus4Cycler();
window.random_key_cycler = new RandomKeyCycler();

// Now make them available globally without window prefix
const random_7sus4_cycler = window.random_7sus4_cycler;
const random_key_cycler = window.random_key_cycler;

// Make KEYS globally accessible for browser environment
window.KEYS = KEYS;

// Export everything for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CELLS, CELLS2, MAJOR_CELLS, MAJOR_RESOLUTION_CELLS, MINOR_B_CELLS, MINOR_C_CELLS,
        TURNAROUND_CELLS_1, DFB,
        KEYS, PITCH_CLASSES_SHARP, PITCH_CLASSES_FLAT, FLAT_KEYS, KEY_CHORD_MAP, 
        get_7sus4_chord_display, find_7sus4_generation_key, find_7sus4_target_key_for_display,
        Random7sus4Cycler, RandomKeyCycler, random_7sus4_cycler, random_key_cycler,
        initializeTransposedCells
    };
}

// Functions for 7sus4 chord display and key mapping are now included here - COMPLETE MATCH TO PYTHON
