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
    //["Bb4", "A4", "G4", "F4", "E4"],
    ["Bb3", "C4", "D4", "F4", "E4"],
    ["G4", "D4", "F4", "Eb4", "E4"],
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
    //["Bb4", "A4", "G4", "F4", "F#4"],
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
    //7.24
    ["F#4", "D4", "F4", "Eb4", "E4"],
    //8.21
    //["E4","F4","E4","D4","C4"],
    //8.27
    ["Bb4","D5","A4","G4","C5"],
    ["C5","Bb4","D4","F4","A4"],
    //["A4","F#4","G4","F4","D4"],
    ["A4","F#4","G4","Bb3","D4"],
    ["F4","A4","G4","Bb3","D4"],
    ["D4","F4","E4","G3","Bb3"],
    ["Bb3","D4","F4","A4","G4"],
    ["G4","Bb3","D4","F4","E4"],
    ["E5","G4","Bb4","D5","C5"],
    //9.1
    ["Bb4","Db4","D4","A4","G4"],
    //9.2
    ["Bb4","F#4","A4","G4","D4"],
    ["D5","A4","C5","Bb4","F#4"],
    //["F#4","A4","G4","D4","Bb3"],
    ["C5","A4","Bb4","D4","F#4"],
    ["A4","C5","Bb4","D4","A4"],
    ["A4","F#4","G4","A4","Bb4"],
    ["A4","F#4","G4","F4","E4"],
    ["Bb4","C5","D5","Bb4","A4"],
    ["A4","G4","F#4","D4","F4"],
    ["F4","Eb4","E4","G4","Bb4"],
    ["D4","E4","F4","F#4","A4"],
    ["A4","Ab4","G4","D4","F4"],
    ["F4","G4","E4","D4","C4"],
    ["C5","G4","Bb4","D5","A4"],
    ["Bb4","D4","Eb4","E4","A4"],
    ["G4","D4","Bb3","G3","A3"],
    ["G4","D4","F4","A4","E4"],
    ["G4","Bb4","A4","G4","C5"],
    //9.5
    ["Bb5","G5","F5","Eb5","E5"],
    ["F#5","G5","D5","C5","Bb4"],
    ["F#4","G4","A4","Bb4","C5"],
    ["A4","Bb4","C5","C#5","D5"],
    ["C5","C#5","D5","Bb4","G4"],


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
    //8.27
    ["E4","G3","Bb3","C4","Db4"]
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
    ["C5", "G4", "Ab4", "B4", "A4"],
    //8.16
    ["B4", "C5", "G4", "E4", "A4"],
    //9.5
    //["G4","E4","F4","C4","E4"],
    //["C5","G4","B4","A4","G4"],
    ["B4","C5","G4","F4","E4"],
    //["C5","Bb4","G4","F4","E4"],
    //["B4","C5","G4","F4","Eb4"],
    //["B4","A4","G4","F4","Eb4"],
    //["D4","C4","B3","C4","Eb4"],
    //["C5","Bb4","G4","F4","Eb4"],
    //["Eb4","E4","F4","F#4","G4"],
    //["Eb4","E4","F4","Eb4","E4"],
    //["Eb4","E4","G4","F4","E4"],
    //["Eb4","E4","A4","Ab4","G4"]
];

// Base cells for major resolution (C dominant resolving to F major)
const BASE_MAJOR_RESOLUTION_CELLS = [
    ["C5", "Bb4", "Eb5", "Db5", "C5"],
    ["C5", "Ab4", "E4", "C4", "G4"],
    ["E4", "Db4", "C4", "Bb3", "A3"],
    ["E4", "Db5", "C5", "Bb4", "A4"],
    ["E4", "G4", "Bb4", "Db5", "C5"],
    ["E4", "G4", "Db4", "B3", "C4"],
    //["G4", "F4", "Db4", "Bb3", "A3"],
    ["G4", "Ab4", "E4", "Db4", "C4"],
    ["Bb4", "Ab4", "E4", "C4", "G4"],
    ["Bb4", "Ab4", "E4", "Db4", "C4"],
    ["Db4", "Eb4", "C4", "Bb3", "A3"],
    ["Eb4", "Db4", "C4", "Bb3", "A3"],
    ["Eb4", "Db4", "Ab3", "Bb3", "C4"],
    ["Eb4", "Db4", "Ab3", "E3", "C4"],
    //["F#4", "E4", "Eb4", "Db4", "C4"],
    ["F#4", "A4", "G4", "E4", "C4"],
    ["A4", "G4", "Gb4", "G4", "C5"],
    ["A4", "Ab4", "E4", "C4", "G4"],
    //["A4", "G4", "Eb4", "E4", "G4"],
    ["A4", "Ab4", "E4", "Db4", "C4"],
    ["Ab4", "E4", "Eb4", "Db4", "C4"],
    ["Ab4", "E5", "Eb5", "Db5", "C5"],
    //9.1
    ["Bb4","A4","Eb4","E4","G4"],
    ["Bb4","C4","Db4","A4","G4"],
    //9.2
    ["Bb4", "C5","Db5","B4","C5"],
    ["Db4","Bb4","A4","E4","G4"],
];

// Base cells for minor phrases (original cells)
const BASE_MINOR_B_CELLS_ORIGINAL = [
    ["D4", "C4", "B3", "A3", "G#3"],
    ["B3", "D4", "F4", "A4", "G#4"],
    ["B4", "D4", "F4", "A4", "G#4"],
    ["A4", "C5", "B4", "A4", "G#4"],
    ["F4", "D4", "B3", "A3", "G#3"],
    ["B4", "F4", "A4", "G4", "G#4"],
    //7.12
    //["G4", "F#4", "F4", "G4", "E4"],
    //["F4", "G4", "A4", "C5", "E5"],
    //["D4", "F4", "A4", "C5", "E5"],

    //["F4", "E4", "D4", "C4", "B3"],
    //["F4", "G4", "A4", "C5", "B4"],
    //["D4", "A3", "C4", "A3", "B3"],
    //["A3", "C4", "A3", "A#3", "B3"],

    //["G4","F#4","F4","E4","D4"],
    //["F4","C4","C#4","E4","D4"],
    //["A4","C5","C#5","E5","D5"],
    //["E4","F4","C#4","E4","D4"],
    //8.5
    //["E5", "D5", "B4", "A4", "G#4"],
    //8.14
    ["F4","G4","E4","D4","C4"],


];

// Base cells for minor phrases (will be initialized with original + BASE_CELLS down a perfect fourth)
let BASE_MINOR_B_CELLS = [...BASE_MINOR_B_CELLS_ORIGINAL];

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
    //7.31
    ["F5","G5","E5","D5","C5"],
    //["G5","F5","E5","D5","C5"],

    ["G5","F5","C5","G#4","E5"],
    ["G5","F5","C5","D5","E5"],

    ["C5","G#4","G4","F4","E4"],
    ["C5","G#4","F4","D4","E4"],
    //8.27
    ["G#3","F4","E4","B3","D4"],
    //9.1
    ["F4","E4","Bb3","B3","D4"],
    ["F4","G3","Ab3","E4","D4"],
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
    //["D#4", "A4", "G#4", "F#4", "G4"],
    ["D#4", "C4", "A3", "F#3", "G3"],
    //8.16
    //["D#4","F#4","A4","F#4","G4"],
    ["F#4", "A4", "C5", "D#5", "E5"],
    ["A4", "F#4", "Eb4", "A4", "G4"],
    ["C5", "A4", "F#4", "D#4", "E4"],
    ["B4", "A4", "G#4", "A4", "C5"],
    ["D4", "C4", "B3", "A3", "C4"],
    //["D4", "C4", "B3", "A3", "G4"],
    ["D4", "Eb4", "B3", "D4", "C4"],
];

// Base cells for iii to biii° phrases (pre-selection)
const PRE_BASE_BIIICELLS = [
    ["B4","C5","G#4","B4","A4"],//yes
    ["D4","C4","B3","C4","F4"],//yes
    ["D4","C4","B3","A3","C4"],//yes
    ["C4", "Eb4", "B3", "Ab3", "A3"],//yes
    ["D4","B3","C4","D4","D#4"],//yes
    ["A4","G4","E4","F4","F#4"] //yes
];

// Base cells for biii° to ii phrases
const BASE_BIIICELLS = [
    ["D4","D#4","B3","D4","C4"],
    ["B4","C5","G#4","B4","A4"],
    ["D4","C4","B3","C4","F4"],
    ["G#4","F#4","F4","Eb4","D4"],
    ["B4","A4","G#4","F#4","F4"],
    ["F4","Eb4","D4","C4","B3"],
    ["B4","A4","G#4","A4","C5"],
    ["D#4","F#4","B4","A4","G4"],
    ["D4","C4","B3","A3","C4"],
    ["D#4","F#4","B4","A4","C5"],
    //8.6
    ["D4","B3","C4","D4","D#4"],
    ["B4","A4","F#4","G4","G#4"],
    //8.16
    ["A4","D5","B4","F#4","D#4"],
    ["A4","D5","F5","C5","D#5"],
    ["C4","F4","D4","A3","F#3"],
    ["C4","F4","Ab4","Eb4","F#4"],
];

// Long cells for positions 2 and 3 in iii to biii and vi to II7b9 phrases
const BASE_LONG_BIIICELLS = [
    ["D#5","F#4","B4","D#5","C5","Eb4", "Ab4", "C5", "A4"],
    ["D#4","F#4","D4","B3","C4", "Eb4", "B3", "Ab3", "A3"],
    ["C4", "F4", "Ab4", "Eb4", "F#4","B4","D5","A4","C5"],
    ["A4","D5","B4","F#4","D#4","Ab4","F4","C4","A3"],
    ["D#5","B4","F#4","D5","C5", "Ab4", "Eb4", "B4", "A4"],
    ["B3","C4","F4","A4","D4","Eb4","Ab4","C5","F4"]
];

// Debug: Log when long cells are defined
console.log('BASE_LONG_BIIICELLS defined with', BASE_LONG_BIIICELLS.length, 'cells');
console.log('Sample long cell:', BASE_LONG_BIIICELLS[0]);

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



// Filtered versions for long 251 major phrases
// Position 0 (leftmost, last in time): uses CELLS, exclude cells starting with E
window.CELLS_FILTERED_NO_E = BASE_CELLS.filter(cell => 
    !cell[0].startsWith('E')
);
console.log(`CELLS filtered for position 0 from ${BASE_CELLS.length} to ${window.CELLS_FILTERED_NO_E.length} cells (excluded E starts)`);

// Position 2 (third from left): uses CELLS2, exclude cells starting with F (but keep F#)  
window.CELLS2_FILTERED_NO_F = [...BASE_CELLS, ...BASE_CELLS2_ADDITIONAL].filter(cell => 
    !cell[0].startsWith('F4') && !cell[0].startsWith('F5') && !cell[0].startsWith('F3')
);
console.log(`CELLS2 filtered for position 2 from ${window.CELLS2.length} to ${window.CELLS2_FILTERED_NO_F.length} cells (excluded F starts)`);

// MINOR_B_CELLS will be updated in initializeTransposedCells() to include transposed BASE_CELLS
window.MINOR_B_CELLS = [...BASE_MINOR_B_CELLS_ORIGINAL];
window.MINOR_C_CELLS = [...BASE_MINOR_C_CELLS];
window.TURNAROUND_CELLS_1 = [...BASE_TURNAROUND_CELLS_1];
window.DFB = [...BASE_DFB];
window.PRE_BIIICELLS = [...PRE_BASE_BIIICELLS];
window.BASE_BIIICELLS = [...BASE_BIIICELLS];
window.BIIICELLS = [...BASE_BIIICELLS];
window.BASE_LONG_BIIICELLS = [...BASE_LONG_BIIICELLS];
console.log('window.BASE_LONG_BIIICELLS assigned with', window.BASE_LONG_BIIICELLS.length, 'cells');

// Deferred initialization for transposed sets (will be initialized after music-utils.js loads)
function initializeTransposedCells() {
    // Create the complete PRE_BIIICELLS by combining PRE_BASE_BIIICELLS with BASE_MAJOR_CELLS
    // but filtering out cells that end with E or G
    const filteredMajorCells = BASE_MAJOR_CELLS.filter(cell => {
        const lastNote = cell[cell.length - 1].slice(0, -1); // Remove octave
        return lastNote !== 'E' && lastNote !== 'G';
    });
    
    // Combine PRE_BASE_BIIICELLS with filtered BASE_MAJOR_CELLS
    window.PRE_BIIICELLS = [...PRE_BASE_BIIICELLS, ...filteredMajorCells];
    console.log('PRE_BIIICELLS created:', window.PRE_BIIICELLS.length, 'cells');
    console.log('Filtered out', BASE_MAJOR_CELLS.length - filteredMajorCells.length, 'cells ending with E or G');
    
    console.log('initializeTransposedCells() called - starting initialization...');
    
    // Check if transposeNote is available
    if (typeof transposeNote !== 'function') {
        console.error('transposeNote function not available! Retrying in 100ms...');
        setTimeout(initializeTransposedCells, 100);
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
    
    console.log('Generating MAJOR_CELLS_down5...');
    window.MAJOR_CELLS_down5 = transposeCells(BASE_MAJOR_CELLS, -5, "C");
    console.log('MAJOR_CELLS_down5 generated:', window.MAJOR_CELLS_down5.length, 'cells');
    
    console.log('Generating BASE_MAJOR_RESOLUTION_CELLS_down5...');
    window.BASE_MAJOR_RESOLUTION_CELLS_down5 = transposeCells(BASE_MAJOR_RESOLUTION_CELLS, -5, "C");
    console.log('BASE_MAJOR_RESOLUTION_CELLS_down5 generated:', window.BASE_MAJOR_RESOLUTION_CELLS_down5.length, 'cells');
    
    console.log('Generating MAJOR_RESOLUTION_CELLS_down5...');
    // First, identify the problematic cell in the original BASE_MAJOR_RESOLUTION_CELLS
    const problematicCell2 = ["F#4", "A4", "G4", "E4", "C4"];
    // Transpose it to see what it becomes after -5 semitones
    const transposedProblematicCell2 = problematicCell2.map(note => transposeNote(note, -5, "C"));
    console.log('Original problematic cell 2:', problematicCell2);
    console.log('Transposed problematic cell 2:', transposedProblematicCell2);
    
    window.MAJOR_RESOLUTION_CELLS_down5 = transposeCells(BASE_MAJOR_RESOLUTION_CELLS, -5, "C");
    // Filter out the transposed version of the problematic cell
    window.MAJOR_RESOLUTION_CELLS_down5 = window.MAJOR_RESOLUTION_CELLS_down5.filter(cell => 
        !(cell[0] === transposedProblematicCell2[0] && 
          cell[1] === transposedProblematicCell2[1] && 
          cell[2] === transposedProblematicCell2[2] && 
          cell[3] === transposedProblematicCell2[3] && 
          cell[4] === transposedProblematicCell2[4])
    );
    console.log('MAJOR_RESOLUTION_CELLS_down5 generated:', window.MAJOR_RESOLUTION_CELLS_down5.length, 'cells');
    
    console.log('Generating CELLS2_down2...');
    // First, identify the problematic cell in the original CELLS2
    const problematicCell1 = ["G4", "F4", "E4", "F4", "Db4"];
    // Transpose it to see what it becomes after -2 semitones
    const transposedProblematicCell1 = problematicCell1.map(note => transposeNote(note, -2, "C"));
    console.log('Original problematic cell 1:', problematicCell1);
    console.log('Transposed problematic cell 1:', transposedProblematicCell1);
    
    window.CELLS2_down2 = transposeCells(window.CELLS2, -2, "C");
    // Filter out the transposed version of the problematic cell
    window.CELLS2_down2 = window.CELLS2_down2.filter(cell => 
        !(cell[0] === transposedProblematicCell1[0] && 
          cell[1] === transposedProblematicCell1[1] && 
          cell[2] === transposedProblematicCell1[2] && 
          cell[3] === transposedProblematicCell1[3] && 
          cell[4] === transposedProblematicCell1[4])
    );
    console.log('CELLS2_down2 generated:', window.CELLS2_down2.length, 'cells');
    
    console.log('Generating CELLS2_up2...');
    window.CELLS2_up2 = transposeCells(window.CELLS2, 2, "C");
    console.log('CELLS2_up2 generated:', window.CELLS2_up2.length, 'cells');
    
    console.log('Generating CELLS2_up5...');
    window.CELLS2_up5 = transposeCells(window.CELLS2, 5, "C");
    console.log('CELLS2_up5 generated:', window.CELLS2_up5.length, 'cells');
    
    console.log('Generating BASE_MAJOR_RESOLUTION_CELLS_up5...');
    window.BASE_MAJOR_RESOLUTION_CELLS_up5 = transposeCells(BASE_MAJOR_RESOLUTION_CELLS, 5, "C");
    console.log('BASE_MAJOR_RESOLUTION_CELLS_up5 generated:', window.BASE_MAJOR_RESOLUTION_CELLS_up5.length, 'cells');
    
    console.log('Generating MAJOR_CELLS_up5...');
    window.MAJOR_CELLS_up5 = transposeCells(BASE_MAJOR_CELLS, 5, "C");
    console.log('MAJOR_CELLS_up5 generated:', window.MAJOR_CELLS_up5.length, 'cells');
    
    console.log('Generating MAJOR_CELLS_down4...');
    window.MAJOR_CELLS_down4 = transposeCells(BASE_MAJOR_CELLS, -4, "C");
    // Add the specific cell [F4, Ab4, F4, F#4, G4] directly to MAJOR_CELLS_down4
    window.MAJOR_CELLS_down4.push(["F4", "Ab4", "F4", "F#4", "G4"]);
    console.log('MAJOR_CELLS_down4 generated:', window.MAJOR_CELLS_down4.length, 'cells');
    
    // Filter out cells that contain the note Bb
    console.log('Filtering out cells containing Bb from MAJOR_CELLS_up5...');
    const originalMAJOR_CELLS_up5Count = window.MAJOR_CELLS_up5.length;
    window.MAJOR_CELLS_up5 = window.MAJOR_CELLS_up5.filter(cell => 
        !cell.some(note => note.includes('Bb'))
    );
    const filteredMAJOR_CELLS_up5Count = window.MAJOR_CELLS_up5.length;
    console.log(`Filtered out ${originalMAJOR_CELLS_up5Count - filteredMAJOR_CELLS_up5Count} cells containing Bb from MAJOR_CELLS_up5`);
    console.log('MAJOR_CELLS_up5 after filtering:', window.MAJOR_CELLS_up5.length, 'cells');
    
    console.log('Generating CELLS_down2...');
    window.CELLS_down2 = transposeCells(BASE_CELLS, -2, "C");
    console.log('CELLS_down2 generated:', window.CELLS_down2.length, 'cells');
    
    console.log('Generating CELLS_down4...');
    window.CELLS_down4 = transposeCells(BASE_CELLS, -4, "C");
    console.log('CELLS_down4 generated:', window.CELLS_down4.length, 'cells');
    
    console.log('Generating MINOR_C_CELLS_DOWN2...');
    window.MINOR_C_CELLS_DOWN2 = transposeCells(BASE_MINOR_C_CELLS, -2, "C");
    console.log('MINOR_C_CELLS_DOWN2 generated:', window.MINOR_C_CELLS_DOWN2.length, 'cells');
    
    console.log('Generating CELLS_up5...');
    window.CELLS_up5 = filterCellsStartingWith(transposeCells(BASE_CELLS, 5, "C"), "F");
    console.log('CELLS_up5 generated:', window.CELLS_up5.length, 'cells');
    
    console.log('Generating CELLS_up2...');
    window.CELLS_up2 = filterCellsStartingWith(transposeCells(BASE_CELLS, 2, "C"), "F");
    console.log('CELLS_up2 generated:', window.CELLS_up2.length, 'cells');
    
    console.log('Generating CELLS_up6...');
    window.CELLS_up6 = transposeCells(BASE_CELLS, 6, "C");
    console.log('CELLS_up6 generated:', window.CELLS_up6.length, 'cells');
    console.log('CELLS_up6 sample:', window.CELLS_up6[0]);
    console.log('CELLS_up6 is now available globally:', window.CELLS_up6 ? 'YES' : 'NO');
    
    console.log('Generating CELLS_down5...');
    window.CELLS_down5 = filterCellsStartingWith(transposeCells(BASE_CELLS, -5, "C"), "F");
    console.log('CELLS_down5 generated:', window.CELLS_down5.length, 'cells');
    
    // Update BASE_MINOR_B_CELLS to include BASE_CELLS transposed down a perfect fourth
    console.log('Updating BASE_MINOR_B_CELLS with BASE_CELLS down a perfect fourth...');
    const baseCellsDownPerfectFourth = transposeCells(BASE_CELLS, -5, "C");
    BASE_MINOR_B_CELLS = [...BASE_MINOR_B_CELLS_ORIGINAL, ...baseCellsDownPerfectFourth];
    console.log('BASE_MINOR_B_CELLS updated:', BASE_MINOR_B_CELLS.length, 'cells total');
    
    // Filter out cells that start with 'A' or 'G'
    console.log('Filtering out cells that start with "A", "G", or "C" (except allowlisted ["A4","F4","E4","D4","G4"])...');
    const originalCount = BASE_MINOR_B_CELLS.length;
    const allowlistedMinorBCell = ["A4","F4","E4","D4","G4"];
    BASE_MINOR_B_CELLS = BASE_MINOR_B_CELLS.filter(cell => {
        const isAllowlisted = cell.length === 5 &&
            cell[0] === allowlistedMinorBCell[0] &&
            cell[1] === allowlistedMinorBCell[1] &&
            cell[2] === allowlistedMinorBCell[2] &&
            cell[3] === allowlistedMinorBCell[3] &&
            cell[4] === allowlistedMinorBCell[4];
        if (isAllowlisted) return true;
        return !cell[0].startsWith('A') && !cell[0].startsWith('G') && !cell[0].startsWith('C');
    });
    const filteredCount = BASE_MINOR_B_CELLS.length;
    console.log(`Filtered out ${originalCount - filteredCount} cells starting with "A", "G", or "C" (with allowlist applied)`);
    console.log('BASE_MINOR_B_CELLS after filtering:', BASE_MINOR_B_CELLS.length, 'cells total');
    
    // Update the global MINOR_B_CELLS to reflect the new BASE_MINOR_B_CELLS
    window.MINOR_B_CELLS = [...BASE_MINOR_B_CELLS];
    console.log('MINOR_B_CELLS updated:', window.MINOR_B_CELLS.length, 'cells');
    
    // Update the global MINOR_B_CELLS reference
    MINOR_B_CELLS = window.MINOR_B_CELLS;
    
    console.log('Transposed cell sets initialized successfully');
    
    // Also make them available as global constants for backward compatibility
    window.CELLSM5_GLOBAL = window.CELLSM5;
    window.MINOR_C_CELLS_DOWN2_GLOBAL = window.MINOR_C_CELLS_DOWN2;
    window.CELLS_up5_GLOBAL = window.CELLS_up5;
    window.CELLS_up2_GLOBAL = window.CELLS_up2;
    window.CELLS_down5_GLOBAL = window.CELLS_down5;
    window.CELLS_down4_GLOBAL = window.CELLS_down4;
    window.MAJOR_CELLS_down4_GLOBAL = window.MAJOR_CELLS_down4;
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
// MINOR_B_CELLS will be updated after initializeTransposedCells() is called
let MINOR_B_CELLS = window.MINOR_B_CELLS;
const MINOR_C_CELLS = window.MINOR_C_CELLS;
const TURNAROUND_CELLS_1 = window.TURNAROUND_CELLS_1;
const DFB = window.DFB;
const BIIICELLS = window.BIIICELLS;

// Transposed cell sets will be available after initializeTransposedCells() is called
// These will be initialized in the DOMContentLoaded event
let CELLS_down4 = window.CELLS_down4;
let MAJOR_CELLS_down4 = window.MAJOR_CELLS_down4;

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
    },
    "biii_to_ii": {
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
    "backdoor_25": {
        "C": "Fm Bb7 C",
        "G": "Cm F7 G",
        "D": "Gm C7 D",
        "A": "Dm G7 A",
        "E": "Am D7 E",
        "B": "Em A7 B",
        "F#": "Bm E7 F#",
        "Db": "F#m B7 C#",
        "Ab": "C#m F#7 G#",
        "Eb": "Abm Db7 Eb",
        "Bb": "Ebm Ab7 Bb",
        "F": "Bbm Eb7 F"
    },
    "tritone_sub_25_major": {
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
    "tritone_sub_25_minor": {
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
    "iv_iv": {
        "C": "F – Fm –",
        "G": "C – Cm –",
        "D": "G – Gm –",
        "A": "D – Dm –",
        "E": "A – Am –",
        "B": "E – Em –",
        "F#": "B – Bm –",
        "Db": "Gb – Gbm –",
        "Ab": "Db – Dbm –",
        "Eb": "Ab – Abm –",
        "Bb": "Eb – Ebm –",
        "F": "Bb – Bbm –"
    },
    "short_iv_iv": {
        "C": "F – Fm –",
        "G": "C – Cm –",
        "D": "G – Gm –",
        "A": "D – Dm –",
        "E": "A – Am –",
        "B": "E – Em –",
        "F#": "B – Bm –",
        "Db": "Gb – Gbm –",
        "Ab": "Db – Dbm –",
        "Eb": "Ab – Abm –",
        "Bb": "Eb – Ebm –",
        "F": "Bb – Bbm –"
    },
    "d7_to_db": {
        "C": "II7 – bII –",
        "G": "II7 – bII –",
        "D": "II7 – bII –",
        "A": "II7 – bII –",
        "E": "II7 – bII –",
        "B": "II7 – bII –",
        "F#": "II7 – bII –",
        "Db": "II7 – bII –",
        "Ab": "II7 – bII –",
        "Eb": "II7 – bII –",
        "Bb": "II7 – bII –",
        "F": "II7 – bII –"
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

// Initialize transposed cells when the page loads
if (typeof window !== 'undefined') {
    // Function to attempt initialization with retry logic
    function attemptInitialization() {
        console.log('Attempting initialization...');
        console.log('window.transposeNote type:', typeof window.transposeNote);
        console.log('window.transposeNote available:', window.transposeNote ? 'YES' : 'NO');
        
        if (typeof window.transposeNote === 'function') {
            console.log('transposeNote function available, initializing transposed cells...');
            initializeTransposedCells();
            console.log('Transposed cells initialized on page load');
        } else {
            console.log('transposeNote function not available yet, retrying in 200ms...');
            setTimeout(attemptInitialization, 200);
        }
    }
    
    // Wait for DOM to be ready and all scripts to be loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Start attempting initialization
            attemptInitialization();
        });
    } else {
        // DOM is already loaded, start attempting initialization
        attemptInitialization();
    }
}

// Export everything for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CELLS, CELLS2, MAJOR_CELLS, MAJOR_RESOLUTION_CELLS, MINOR_B_CELLS, MINOR_C_CELLS,
        TURNAROUND_CELLS_1, DFB, BASE_LONG_BIIICELLS,
        KEYS, PITCH_CLASSES_SHARP, PITCH_CLASSES_FLAT, FLAT_KEYS, KEY_CHORD_MAP, 
        get_7sus4_chord_display, find_7sus4_generation_key, find_7sus4_target_key_for_display,
        Random7sus4Cycler, RandomKeyCycler, random_7sus4_cycler, random_key_cycler,
        initializeTransposedCells, MAJOR_CELLS_down4
    };
}

// New BACKDOOR_RESOLUTION cells for short backdoor 25 phrases
// These replace MAJOR_RESOLUTION_CELLS_down5 for better backdoor-specific resolution patterns
window.BACKDOOR_RESOLUTION = [
    ["G4", "F4", "Bb4", "Ab4", "G4"],
    ["C4", "Ab3", "G3", "F3", "E3"],
    ["D4", "C4", "Ab3", "F3", "E3"],
    ["D4", "Eb4", "C4", "Ab3", "G3"],
    ["F4", "G4", "Ab4", "Bb4", "G4"],
    ["Ab3", "Bb3", "G3", "F3", "E3"],
    ["Bb3", "Ab3", "G3", "F3", "E3"],
    ["Bb3", "Ab3", "Eb3", "F3", "G3"],
    ["Bb3", "Ab3", "Eb3", "C3", "G3"],
    //["E4", "D4", "Db4", "D4", "G4"],
    ["E4", "C4", "Ab3", "E3", "B3"],
    ["Eb4", "C4", "Bb3", "Ab3", "G3"],
    ["Ab4", "C4", "Eb4", "E4", "G4"],
    //["Ab4", "C4", "B3", "C4", "G4"],
    ["Ab3", "Eb4", "C4", "Ab3", "G3"],
];

// Functions for 7sus4 chord display and key mapping are now included here - COMPLETE MATCH TO PYTHON
