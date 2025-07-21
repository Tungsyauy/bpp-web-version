// phrase-generator.js - Phrase generation algorithms converted from Python

// Initialize cyclers for different cell types
let leftCycler, rightCycler, majorLeftCycler, majorRightCycler, resolutionCycler;
let keyCycler;

// Define pitch range for comfortable staff reading (F3 to C5) 
const F3_PITCH = 5 + (2 * 12); // F3 = 29
const C5_PITCH = 0 + (5 * 12); // C5 = 60 (much more reasonable upper limit)

// Check if phrase is within comfortable reading range
function isPhraseInRange(phrase) {
    console.log('Checking phrase range for:', phrase);
    for (const note of phrase) {
        const [pitchClass, octave] = noteToPitch(note);
        // Use the exact same formula as Python: absolute_pitch = pitch_class + (octave * 12)
        const absolutePitch = pitchClass + (octave * 12);
        console.log(`Note ${note}: pitch_class=${pitchClass}, octave=${octave}, absolute_pitch=${absolutePitch}`);
        
        if (absolutePitch < F3_PITCH || absolutePitch > C5_PITCH) {
            console.log(`Note ${note} out of range: ${absolutePitch} not in [${F3_PITCH}, ${C5_PITCH}] (F3-C5)`);
            return false;
        }
    }
    return true;
}

// Automatically adjust phrase octave if it's too high or too low
function adjustPhraseOctave(phrase) {
    console.log('Adjusting phrase octave for:', phrase);
    
    // Calculate average pitch of the phrase
    let totalPitch = 0;
    let validNotes = 0;
    
    for (const note of phrase) {
        const [pitchClass, octave] = noteToPitch(note);
        if (pitchClass !== undefined && octave !== undefined) {
            totalPitch += pitchClass + (octave * 12);
            validNotes++;
        }
    }
    
    if (validNotes === 0) return phrase;
    
    const averagePitch = totalPitch / validNotes;
    const targetPitch = (F3_PITCH + C5_PITCH) / 2; // Middle of our range
    console.log(`Average pitch: ${averagePitch}, target: ${targetPitch}`);
    
    // If phrase is too high, transpose down by octaves
    let octaveShift = 0;
    if (averagePitch > C5_PITCH + 6) { // If clearly too high
        octaveShift = -1;
        console.log('Phrase too high, transposing down 1 octave');
    } else if (averagePitch < F3_PITCH - 6) { // If clearly too low
        octaveShift = 1;
        console.log('Phrase too low, transposing up 1 octave');
    }
    
    if (octaveShift === 0) return phrase;
    
    // Apply octave shift
    const adjustedPhrase = phrase.map(note => {
        const [pitchClass, octave] = noteToPitch(note);
        if (pitchClass === undefined || octave === undefined) return note;
        
        const newOctave = octave + octaveShift;
        // Use the same pitch class constants as in transposeNote
        const PITCH_CLASSES_SHARP = {0: "C", 1: "C#", 2: "D", 3: "D#", 4: "E", 5: "F",
                                     6: "F#", 7: "G", 8: "G#", 9: "A", 10: "A#", 11: "B"};
        const PITCH_CLASSES_FLAT = {0: "C", 1: "Db", 2: "D", 3: "Eb", 4: "E", 5: "F",
                                    6: "Gb", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B"};
        const FLAT_KEYS = new Set(["Db", "Ab", "Eb", "Bb", "F", "C"]);
        
        const pitchClasses = FLAT_KEYS.has("C") ? PITCH_CLASSES_FLAT : PITCH_CLASSES_SHARP;
        const pitchName = pitchClasses[pitchClass];
        
        return `${pitchName}${newOctave}`;
    });
    
    console.log('Adjusted phrase:', adjustedPhrase);
    return adjustedPhrase;
}

// Initialize cyclers based on phrase type - EXACT MATCH TO PYTHON
function initializeCyclers(phraseType) {
    console.log('Initializing cyclers for phrase type:', phraseType);
    
    if (phraseType === "short_25_minor" || phraseType === "long_25_minor") {
        leftCycler = new Cycler(MINOR_B_CELLS);
        rightCycler = new Cycler(MINOR_C_CELLS);
    } else if (phraseType === "turnaround") {
        leftCycler = new Cycler(TURNAROUND_CELLS_1);
        rightCycler = new Cycler(MAJOR_RESOLUTION_CELLS);
    } else if (phraseType === "rhythm_changes_56") {
        leftCycler = new Cycler(CELLS);
        rightCycler = new Cycler(DFB);
    } else if (phraseType === "ii7_to_v7") {
        leftCycler = new Cycler(window.CELLS_up2);
        rightCycler = new Cycler(window.CELLS_down5);
    } else if (phraseType === "major" || phraseType === "long_major") {
        leftCycler = new Cycler(MAJOR_CELLS);
        rightCycler = new Cycler(MAJOR_CELLS);
    } else if (phraseType === "7sus4" || phraseType === "long_7sus4" || 
               phraseType === "7sus4_minor" || phraseType === "7sus4_dominant" || 
               phraseType === "7sus4_half_dim" || phraseType === "7sus4_altered" ||
               phraseType === "long_7sus4_minor" || phraseType === "long_7sus4_dominant" ||
               phraseType === "long_7sus4_half_dim" || phraseType === "long_7sus4_altered") {
        leftCycler = new Cycler(CELLS);
        rightCycler = new Cycler(CELLS);
    } else {
        // For short_25_major, long_25_major and others
        const cellSet = (phraseType === "short_25_major" || phraseType === "long_25_major") ? window.CELLS2 : CELLS;
        leftCycler = new Cycler(cellSet);
        rightCycler = new Cycler((phraseType === "short_25_major" || phraseType === "long_25_major") ? MAJOR_RESOLUTION_CELLS : cellSet);
    }
    
    // Initialize resolution cycler - EXACT MATCH TO PYTHON
    if (phraseType === "long_25_minor") {
        resolutionCycler = new Cycler(MINOR_C_CELLS);
    } else if (phraseType === "short_25_major" || phraseType === "long_25_major" || phraseType === "turnaround") {
        resolutionCycler = new Cycler(MAJOR_RESOLUTION_CELLS);
    } else if (phraseType === "rhythm_changes_56") {
        resolutionCycler = new Cycler(DFB);
    } else if (phraseType === "ii7_to_v7") {
        resolutionCycler = new Cycler(window.CELLS_down5);
    } else if (phraseType === "long_major" || phraseType === "long_7sus4" || 
               phraseType === "long_7sus4_minor" || phraseType === "long_7sus4_dominant" ||
               phraseType === "long_7sus4_half_dim" || phraseType === "long_7sus4_altered") {
        resolutionCycler = new Cycler(phraseType === "long_major" ? MAJOR_CELLS : CELLS);
    } else {
        resolutionCycler = null;
    }
}

// Generate phrase based on type - EXACT MATCH TO PYTHON
function generatePhrase(phraseType = "7sus4", selectedKey = null, chordType = null) {
    console.log('generatePhrase called with:', { phraseType, selectedKey, chordType });
    
    // Ensure transposed cells are initialized
    if (!window.CELLSM5 && typeof initializeTransposedCells === 'function') {
        console.log('Transposed cells not initialized, calling initializeTransposedCells...');
        initializeTransposedCells();
    }
    
    // Initialize cyclers for this phrase type
    initializeCyclers(phraseType);
    
    // Initialize the key cycler if not already initialized
    if (!keyCycler) {
        keyCycler = new Cycler(Object.keys(KEYS));
    }
    
    let keyName = selectedKey || keyCycler.nextItem();
    
    // Set expected phrase lengths
    const expectedLengths = {
        "7sus4": 9,
        "major": 9,
        "short_25_major": 9,
        "long_25_major": 17,
        "short_25_minor": 9,
        "long_25_minor": 17,
        "turnaround": 17,
        "rhythm_changes_56": 17,
        "ii7_to_v7": 17,
        "long_major": 17,
        "long_7sus4": 17
    };
    
    console.log('Initial keyName:', keyName);
    
    // CRITICAL: Add range checking and regeneration loop exactly like Python
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let phrase = [];
        let phraseLength = 9;
        
        try {
            // Key mapping is now handled in generatePhraseData to avoid double mapping
            // The selectedKey parameter here is already the effective generation key
            
            // Generate the phrase using the appropriate method
            if (phraseType === "7sus4") {
                const result = generate7sus4Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "major") {
                const result = generateMajorPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "long_major") {
                const result = generateLongMajorPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "long_7sus4") {
                const result = generateLong7sus4Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "short_25_major") {
                const result = generateShort25MajorPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "long_25_major") {
                const result = generateLong25MajorPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "short_25_minor") {
                const result = generateShort25MinorPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "long_25_minor") {
                const result = generateLong25MinorPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "turnaround") {
                const result = generateTurnaroundPhrase(keyName);
                phrase = result.phrase;
                phraseLength = phrase.length;  // Match Python: calculate from final phrase length
            } else if (phraseType === "rhythm_changes_56") {
                const result = generateRhythmChanges56Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "ii7_to_v7") {
                const result = generateII7ToV7Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else {
                throw new Error(`Unknown phrase type: ${phraseType}`);
            }
            
            // Transpose the phrase
            const keySemitones = KEYS[keyName];
            let transpositionSemitones = keySemitones;
            
            // For turnaround, add 7 semitones (perfect fifth)
            if (phraseType === "turnaround") {
                transpositionSemitones = (keySemitones + 7) % 12;
            }
            
            const transposedPhrase = phrase.map(note => transposeNote(note, transpositionSemitones, keyName));
            
            // Validate resolution cell
            const validatedPhrase = validateResolutionCell(transposedPhrase, phraseType);
            
            // Apply intelligent octave adjustment if needed
            const octaveAdjustedPhrase = adjustPhraseOctave(validatedPhrase);
            
            // CRITICAL: Check if phrase is within range and correct length (exactly like Python)
            if (phraseLength === expectedLengths[phraseType] && isPhraseInRange(octaveAdjustedPhrase)) {
                console.log(`Phrase type: ${phraseType}, keyName=${keyName}, phrase length=${phraseLength}`);
                console.log('Final phrase:', octaveAdjustedPhrase);
                console.log('Phrase passed range and length validation');
                
                return {
                    phrase: octaveAdjustedPhrase,
                    key: keyName,
                    length: phraseLength
                };
            }
            
            // If we get here, the phrase failed validation
            console.log(`Generated phrase length ${phraseLength} (expected ${expectedLengths[phraseType]}), ` +
                       `pitch range ${isPhraseInRange(octaveAdjustedPhrase) ? 'valid' : 'out of F3-C5 range'}, ` +
                       `regenerating with key ${keyName}...`);
            
            attempts++;
            
            // Reset cycler permutations for certain phrase types that support it
            if (["long_major", "long_7sus4", "turnaround"].includes(phraseType)) {
                rightCycler.resetPermutation();
            } else if (phraseType === "rhythm_changes_56") {
                resolutionCycler.resetPermutation();
            } else if (phraseType === "ii7_to_v7") {
                resolutionCycler.resetPermutation();
            }
            
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed for phrase type ${phraseType}:`, error);
            attempts++;
            
            // Reset cycler permutations on error
            if (["long_major", "long_7sus4", "turnaround"].includes(phraseType)) {
                rightCycler.resetPermutation();
            } else if (phraseType === "rhythm_changes_56") {
                resolutionCycler.resetPermutation();
            } else if (phraseType === "ii7_to_v7") {
                resolutionCycler.resetPermutation();
            }
        }
    }
    
    // If we get here, we've exceeded max attempts
    throw new Error(`Failed to generate a valid ${phraseType} phrase after ${maxAttempts} attempts`);
}

// Generate 7sus4 phrase - EXACT MATCH TO PYTHON
function generate7sus4Phrase(keyName) {
    const leftCell = leftCycler.nextItem();
    const lastNoteLeft = leftCell[leftCell.length - 1].slice(0, -1); // Remove octave
    
    // Find compatible right cells
    const compatibleRight = CELLS.filter(cell => cell[0].slice(0, -1) === lastNoteLeft);
    
    let rightCell;
    if (compatibleRight.length > 0) {
        rightCell = rightCycler.nextItem();
        while (rightCell[0].slice(0, -1) !== lastNoteLeft) {
            rightCell = rightCycler.nextItem();
        }
    } else {
        rightCell = rightCycler.nextItem();
    }
    
    const adjustedRight = adjustRightCell(leftCell, rightCell);
    const phrase = leftCell.concat(adjustedRight.slice(1));
    
    return { phrase: phrase, length: phrase.length };
}

// Generate major phrase - EXACT MATCH TO PYTHON
function generateMajorPhrase(keyName) {
    const leftCell = leftCycler.nextItem();
    const lastNoteLeft = leftCell[leftCell.length - 1].slice(0, -1); // Remove octave
    
    // Find compatible right cells
    const compatibleRight = MAJOR_CELLS.filter(cell => cell[0].slice(0, -1) === lastNoteLeft);
    
    let rightCell;
    if (compatibleRight.length > 0) {
        rightCell = rightCycler.nextItem();
        while (rightCell[0].slice(0, -1) !== lastNoteLeft) {
            rightCell = rightCycler.nextItem();
        }
    } else {
        rightCell = rightCycler.nextItem();
    }
    
    const adjustedRight = adjustRightCell(leftCell, rightCell);
    const phrase = leftCell.concat(adjustedRight.slice(1));
    
    return { phrase: phrase, length: phrase.length };
}

// Generate long major phrase - EXACT MATCH TO PYTHON
function generateLongMajorPhrase(keyName) {
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let phrase = rightCycler.nextItem();  // Start with a major cell
        const cellSets = [MAJOR_CELLS, MAJOR_CELLS, MAJOR_CELLS];  // Three additional cells
        let validPhrase = true;
        let usedCells = new Set(); // Track used cells to avoid duplicates
        usedCells.add(phrase.join(' ')); // Add the initial cell
        
        for (const cellSet of cellSets) {
            const firstNoteCurrent = phrase[0].slice(0, -1);
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            
            if (compatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCells.has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCells.add(leftCell.join(' ')); // Mark this cell as used
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 17) {  // Expected length: 5 + 4 + 4 + 4
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        rightCycler.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid long_major phrase after maximum attempts");
}

// Generate long 7sus4 phrase - EXACT MATCH TO PYTHON
function generateLong7sus4Phrase(keyName) {
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let phrase = rightCycler.nextItem();  // Start with a 7sus4 cell
        const cellSets = [CELLS, CELLS, CELLS];  // Three additional cells
        let validPhrase = true;
        let usedCells = new Set(); // Track used cells to avoid duplicates
        usedCells.add(phrase.join(' ')); // Add the initial cell
        
        for (const cellSet of cellSets) {
            const firstNoteCurrent = phrase[0].slice(0, -1);
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            
            if (compatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCells.has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCells.add(leftCell.join(' ')); // Mark this cell as used
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 17) {  // Expected length: 5 + 4 + 4 + 4
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        rightCycler.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid long_7sus4 phrase after maximum attempts");
}

// Generate short 25 major phrase - EXACT MATCH TO PYTHON
function generateShort25MajorPhrase(keyName) {
    const rightCell = rightCycler.nextItem();
    const firstNoteRight = rightCell[0].slice(0, -1);
    const compatibleLeft = window.CELLS2.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteRight);
    
    let leftCell;
    if (compatibleLeft.length > 0) {
        leftCell = leftCycler.nextItem();
        let attempts = 0;
        while (leftCell[leftCell.length - 1].slice(0, -1) !== firstNoteRight && attempts < window.CELLS2.length) {
            leftCell = leftCycler.nextItem();
            attempts++;
        }
        if (attempts >= window.CELLS2.length) {
            leftCell = compatibleLeft[0];
        }
    } else {
        leftCell = leftCycler.nextItem();
    }
    
    const adjustedRight = adjustRightCell(leftCell, rightCell);
    const phrase = leftCell.concat(adjustedRight.slice(1));
    
    return { phrase: phrase, length: phrase.length };
}

// Generate long 25 major phrase - EXACT MATCH TO PYTHON
function generateLong25MajorPhrase(keyName) {
    let resolutionCell = resolutionCycler.nextItem();  // This comes from MAJOR_RESOLUTION_CELLS
    let phrase = resolutionCell;
    const cellSets = [window.CELLS2, CELLS, CELLS];
    let usedCells = new Set(); // Track used cells to avoid duplicates
    usedCells.add(resolutionCell.join(' ')); // Add the resolution cell
    
    for (const cellSet of cellSets) {
        const firstNoteCurrent = phrase[0].slice(0, -1);
        const dominantCompatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
        
        if (dominantCompatibleCells.length > 0) {
            // Filter out cells that have already been used
            const unusedCompatibleCells = dominantCompatibleCells.filter(cell => !usedCells.has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                throw new Error("No unused compatible cells found for long_25_major phrase");
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCells.add(leftCell.join(' ')); // Mark this cell as used
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        } else {
            throw new Error("No compatible cells found for long_25_major phrase");
        }
    }
    
    return { phrase: phrase, length: phrase.length };
}

// Generate short 25 minor phrase - EXACT MATCH TO PYTHON
function generateShort25MinorPhrase(keyName) {
    const rightCell = rightCycler.nextItem();
    const firstNoteRight = rightCell[0].slice(0, -1);
    const compatibleLeft = MINOR_B_CELLS.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteRight);
    
    let leftCell;
    if (compatibleLeft.length > 0) {
        leftCell = leftCycler.nextItem();
        let attempts = 0;
        while (leftCell[leftCell.length - 1].slice(0, -1) !== firstNoteRight && attempts < MINOR_B_CELLS.length) {
            leftCell = leftCycler.nextItem();
            attempts++;
        }
        if (attempts >= MINOR_B_CELLS.length) {
            leftCell = compatibleLeft[0];
        }
    } else {
        leftCell = leftCycler.nextItem();
    }
    
    const adjustedRight = adjustRightCell(leftCell, rightCell);
    const phrase = leftCell.concat(adjustedRight.slice(1));
    
    return { phrase: phrase, length: phrase.length };
}

// Generate long 25 minor phrase - NEW APPROACH: start with short phrase, add left cells
function generateLong25MinorPhrase(keyName) {
    // First generate a short 25 minor phrase (9 notes)
    const shortResult = generateShort25MinorPhrase(keyName);
    let phrase = shortResult.phrase;
    
    // Now add two cells from CELLSM5 to the left, ensuring connectivity
    const cellSets = [window.CELLSM5, window.CELLSM5];  // Two additional cells
    let usedCells = new Set(); // Track used cells to avoid duplicates
    
    // Add the cells from the short phrase to used cells
    // We need to identify which cells were used in the short phrase
    // For now, we'll track cells as we add them
    
    for (let i = 0; i < cellSets.length; i++) {
        const cellSet = cellSets[i];
        const firstNoteCurrent = phrase[0].slice(0, -1);  // Get pitch class of first note
        const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
        
        if (compatibleCells.length > 0) {
            // Filter out cells that have already been used
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCells.has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                throw new Error("No unused compatible cells found for long_25_minor phrase");
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCells.add(leftCell.join(' ')); // Mark this cell as used
            const adjustedPhrase = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedPhrase);  // Remove last note of left cell, add entire adjusted phrase
        } else {
            throw new Error("No compatible cells found for long_25_minor phrase");
        }
    }
    
    return { phrase: phrase, length: phrase.length };
}

// Generate turnaround phrase - EXACT MATCH TO PYTHON
function generateTurnaroundPhrase(keyName) {
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let resolutionCell = rightCycler.nextItem();  // From MAJOR_RESOLUTION_CELLS (matching Python)
        let phrase = resolutionCell;
        const cellSets = [window.CELLS2, window.MINOR_C_CELLS_DOWN2, TURNAROUND_CELLS_1];
        let validPhrase = true;
        
        // Track used cells per cell set to avoid duplicates within the same set
        let usedCellsPerSet = {
            'CELLS2': new Set(),
            'MINOR_C_CELLS_DOWN2': new Set(),
            'TURNAROUND_CELLS_1': new Set()
        };
        
        // Add the resolution cell to the appropriate set (it's from MAJOR_RESOLUTION_CELLS)
        usedCellsPerSet['TURNAROUND_CELLS_1'].add(resolutionCell.join(' '));
        
        for (let i = 0; i < cellSets.length; i++) {
            const cellSet = cellSets[i];
            const cellSetName = i === 0 ? 'CELLS2' : i === 1 ? 'MINOR_C_CELLS_DOWN2' : 'TURNAROUND_CELLS_1';
            const firstNoteCurrent = phrase[0].slice(0, -1);
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            
            if (compatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCellsPerSet[cellSetName].add(leftCell.join(' ')); // Mark this cell as used in this set
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 17) {
            phrase = validateResolutionCell(phrase, "turnaround");
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        rightCycler.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid turnaround phrase after maximum attempts");
}

// Generate rhythm changes 5-6 phrase - EXACT MATCH TO PYTHON
function generateRhythmChanges56Phrase(keyName) {
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let resolutionCell = resolutionCycler.nextItem();  // From DFB
        let phrase = resolutionCell;
        const cellSets = [window.CELLS_up5, CELLS, CELLS];
        let validPhrase = true;
        
        // Track used cells per cell set to avoid duplicates within the same set
        let usedCellsPerSet = {
            'CELLS_up5': new Set(),
            'CELLS': new Set()
        };
        
        // Add the resolution cell to the appropriate set (it's from DFB, which is similar to CELLS)
        usedCellsPerSet['CELLS'].add(resolutionCell.join(' '));
        
        for (let i = 0; i < cellSets.length; i++) {
            const cellSet = cellSets[i];
            const cellSetName = i === 0 ? 'CELLS_up5' : 'CELLS';
            const firstNoteCurrent = phrase[0].slice(0, -1);
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            
            if (compatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCellsPerSet[cellSetName].add(leftCell.join(' ')); // Mark this cell as used in this set
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 17) {
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        resolutionCycler.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid rhythm_changes_56 phrase after maximum attempts");
}

// Generate ii7 to V7 phrase - EXACT MATCH TO PYTHON
function generateII7ToV7Phrase(keyName) {
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let resolutionCell = resolutionCycler.nextItem();  // From CELLS_down5
        let phrase = resolutionCell;
        const cellSets = [window.CELLS_down5, window.CELLS_up2, window.CELLS_up2];
        let validPhrase = true;
        
        // Track used cells per cell set to avoid duplicates within the same set
        let usedCellsPerSet = {
            'CELLS_down5': new Set(),
            'CELLS_up2': new Set()
        };
        
        // Add the resolution cell to the appropriate set (it's from CELLS_down5)
        usedCellsPerSet['CELLS_down5'].add(resolutionCell.join(' '));
        
        for (let i = 0; i < cellSets.length; i++) {
            const cellSet = cellSets[i];
            const cellSetName = i === 0 ? 'CELLS_down5' : 'CELLS_up2';
            const firstNoteCurrent = phrase[0].slice(0, -1);
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            
            if (compatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            
            if (unusedCompatibleCells.length === 0) {
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCellsPerSet[cellSetName].add(leftCell.join(' ')); // Mark this cell as used in this set
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 17) {
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        resolutionCycler.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid ii7_to_v7 phrase after maximum attempts");
}

// Validate resolution cell - exact match to Python implementation
function validateResolutionCell(phrase, phraseType) {
    console.log(`Validating resolution cell for phrase type: ${phraseType}`);
    
    if (["short_25_major", "long_25_major", "turnaround"].includes(phraseType)) {
        const resolutionCell = phrase.slice(-5);
        const resolutionCellStr = resolutionCell.join(" ");
        
        console.log(`Checking MAJOR_RESOLUTION_CELLS for ${phraseType}`);
        console.log(`Resolution cell: ${resolutionCellStr}`);
        
        // Check if it matches exactly
        for (const cell of MAJOR_RESOLUTION_CELLS) {
            const cellStr = cell.join(" ");
            if (cellStr === resolutionCellStr) {
                console.log(`Exact match found in MAJOR_RESOLUTION_CELLS: ${cellStr}`);
                return phrase;
            }
        }
        
        // If no exact match, check pitch class match and adjust octaves
        const resolutionPitchClasses = resolutionCell.map(note => note.slice(0, -1));
        console.log(`Checking pitch class match for: ${resolutionPitchClasses.join(" ")}`);
        
        for (const cell of MAJOR_RESOLUTION_CELLS) {
            const cellPitchClasses = cell.map(note => note.slice(0, -1));
            if (JSON.stringify(cellPitchClasses) === JSON.stringify(resolutionPitchClasses)) {
                console.log(`Pitch class match found, adjusting octaves: ${cellPitchClasses.join(" ")}`);
                
                // Adjust octaves to match the current phrase
                const adjustedCell = [];
                const refOctave = noteToPitch(resolutionCell[0])[1];
                
                for (let i = 0; i < cell.length; i++) {
                    const [pitchClass, octave] = noteToPitch(cell[i]);
                    const [cellFirstPitch, cellFirstOctave] = noteToPitch(cell[0]);
                    const newOctave = refOctave + (octave - cellFirstOctave);
                    
                    // Find the note with this pitch class and octave
                    const pitchName = PITCH_CLASSES_SHARP[pitchClass];
                    const adjustedNote = `${pitchName}${newOctave}`;
                    adjustedCell.push(adjustedNote);
                }
                
                const adjustedPhrase = phrase.slice(0, -5).concat(adjustedCell);
                console.log(`Adjusted phrase: ${adjustedPhrase.join(" ")}`);
                return adjustedPhrase;
            }
        }
    } else if (["short_25_minor", "long_25_minor"].includes(phraseType)) {
        const resolutionCell = phrase.slice(-5);
        
        // Check against minor_C_cells
        for (const cell of MINOR_C_CELLS) {
            const cellStr = cell.join(" ");
            const resolutionCellStr = resolutionCell.join(" ");
            if (cellStr === resolutionCellStr) {
                return phrase;
            }
        }
        
        // Check pitch class match and adjust octaves for minor cells
        const resolutionPitchClasses = resolutionCell.map(note => note.slice(0, -1));
        for (const cell of MINOR_C_CELLS) {
            const cellPitchClasses = cell.map(note => note.slice(0, -1));
            if (JSON.stringify(cellPitchClasses) === JSON.stringify(resolutionPitchClasses)) {
                // Similar octave adjustment logic for minor cells
                const adjustedCell = [];
                const refOctave = noteToPitch(resolutionCell[0])[1];
                
                for (let i = 0; i < cell.length; i++) {
                    const [pitchClass, octave] = noteToPitch(cell[i]);
                    const [cellFirstPitch, cellFirstOctave] = noteToPitch(cell[0]);
                    const newOctave = refOctave + (octave - cellFirstOctave);
                    
                    const pitchName = PITCH_CLASSES_SHARP[pitchClass];
                    const adjustedNote = `${pitchName}${newOctave}`;
                    adjustedCell.push(adjustedNote);
                }
                
                return phrase.slice(0, -5).concat(adjustedCell);
            }
        }
    } else if (phraseType === "rhythm_changes_56") {
        const resolutionCell = phrase.slice(-5);
        
        // Check against DFB
        for (const cell of DFB) {
            const cellStr = cell.join(" ");
            const resolutionCellStr = resolutionCell.join(" ");
            if (cellStr === resolutionCellStr) {
                return phrase;
            }
        }
        
        // Check pitch class match and adjust octaves for DFB
        const resolutionPitchClasses = resolutionCell.map(note => note.slice(0, -1));
        for (const cell of DFB) {
            const cellPitchClasses = cell.map(note => note.slice(0, -1));
            if (JSON.stringify(cellPitchClasses) === JSON.stringify(resolutionPitchClasses)) {
                // Similar octave adjustment logic for DFB
                const adjustedCell = [];
                const refOctave = noteToPitch(resolutionCell[0])[1];
                
                for (let i = 0; i < cell.length; i++) {
                    const [pitchClass, octave] = noteToPitch(cell[i]);
                    const [cellFirstPitch, cellFirstOctave] = noteToPitch(cell[0]);
                    const newOctave = refOctave + (octave - cellFirstOctave);
                    
                    const pitchName = PITCH_CLASSES_SHARP[pitchClass];
                    const adjustedNote = `${pitchName}${newOctave}`;
                    adjustedCell.push(adjustedNote);
                }
                
                return phrase.slice(0, -5).concat(adjustedCell);
            }
        }
    } else if (phraseType === "ii7_to_v7") {
        const resolutionCell = phrase.slice(-5);
        
        // Check against CELLS_down5
        for (const cell of window.CELLS_down5) {
            const cellStr = cell.join(" ");
            const resolutionCellStr = resolutionCell.join(" ");
            if (cellStr === resolutionCellStr) {
                return phrase;
            }
        }
        
        // Check pitch class match and adjust octaves for CELLS_down5
        const resolutionPitchClasses = resolutionCell.map(note => note.slice(0, -1));
        for (const cell of window.CELLS_down5) {
            const cellPitchClasses = cell.map(note => note.slice(0, -1));
            if (JSON.stringify(cellPitchClasses) === JSON.stringify(resolutionPitchClasses)) {
                // Similar octave adjustment logic for CELLS_down5
                const adjustedCell = [];
                const refOctave = noteToPitch(resolutionCell[0])[1];
                
                for (let i = 0; i < cell.length; i++) {
                    const [pitchClass, octave] = noteToPitch(cell[i]);
                    const [cellFirstPitch, cellFirstOctave] = noteToPitch(cell[0]);
                    const newOctave = refOctave + (octave - cellFirstOctave);
                    
                    const pitchName = PITCH_CLASSES_SHARP[pitchClass];
                    const adjustedNote = `${pitchName}${newOctave}`;
                    adjustedCell.push(adjustedNote);
                }
                
                return phrase.slice(0, -5).concat(adjustedCell);
            }
        }
    }
    
    return phrase;
}

// Export the generatePhrase function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePhrase };
} 