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
    
    // Check if any note is out of range
    let hasHighNotes = false;
    let hasLowNotes = false;
    
    for (const note of phrase) {
        const [pitchClass, octave] = noteToPitch(note);
        if (pitchClass !== undefined && octave !== undefined) {
            const absolutePitch = pitchClass + (octave * 12);
            if (absolutePitch > C5_PITCH) {
                hasHighNotes = true;
            }
            if (absolutePitch < F3_PITCH) {
                hasLowNotes = true;
            }
        }
    }
    
    // Determine octave shift based on out-of-range notes
    let octaveShift = 0;
    if (hasHighNotes) {
        octaveShift = -1;
        console.log('Phrase has high notes, transposing down 1 octave');
    } else if (hasLowNotes) {
        octaveShift = 1;
        console.log('Phrase has low notes, transposing up 1 octave');
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
    } else if (phraseType === "iii_to_biii") {
        console.log('Initializing iii_to_biii cyclers - left from PRE_BIIICELLS, right from BIIICELLS');
        leftCycler = new Cycler(window.PRE_BIIICELLS);
        rightCycler = new Cycler(window.BIIICELLS);
    } else if (phraseType === "long_iii_to_biii") {
        console.log('Initializing long_iii_to_biii cyclers with BIIICELLS:', window.BIIICELLS);
        leftCycler = new Cycler(window.BIIICELLS);
        rightCycler = new Cycler(window.BIIICELLS);
    } else if (phraseType === "biii_to_ii_old" || phraseType === "long_biii_to_ii_old") {
        console.log('Initializing biii_to_ii_old cyclers - left from CELLS_up2, right from BASE_BIIICELLS');
        leftCycler = new Cycler(window.CELLS_up2);
        rightCycler = new Cycler(window.BASE_BIIICELLS);
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
    } else if (phraseType === "short_25_major" || phraseType === "long_25_major" || phraseType === "turnaround" || phraseType === "backdoor_25" || phraseType === "iv_iv") {
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
        "backdoor_25": 17,
        "short_backdoor_25": 9,
        "deceptive_25": 17,
        "short_deceptive_25": 9,
        "iv_iv": 17,
        "short_iv_iv": 9,
        "turnaround": 17,
        "rhythm_changes_56": 17,
        "ii7_to_v7": 17,
        "iii_to_biii": 9,
        "long_iii_to_biii": 17,
        "biii_to_ii_old": 9,
        "long_biii_to_ii_old": 17,
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
            } else if (phraseType === "iii_to_biii") {
                const result = generateIiiToBiiiPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "long_iii_to_biii") {
                const result = generateLongIiiToBiiiPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "biii_to_ii_old") {
                const result = generateBiiiToIiOldPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "long_biii_to_ii_old") {
                const result = generateLongBiiiToIiOldPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "backdoor_25") {
                const result = generateBackdoor25Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "short_backdoor_25") {
                const result = generateShortBackdoor25Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "deceptive_25") {
                const result = generateDeceptive25Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "short_deceptive_25") {
                const result = generateShortDeceptive25Phrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "short_iv_iv") {
                const result = generateShortIVIVPhrase(keyName);
                phrase = result.phrase;
                phraseLength = result.length;
            } else if (phraseType === "iv_iv") {
                const result = generateIVIVPhrase(keyName);
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
            // For backdoor_25, add 7 semitones (perfect fifth) + 3 semitones = 10 semitones total
            if (phraseType === "backdoor_25") {
                transpositionSemitones = (keySemitones + 10) % 12;
            }
            // For iv_iv: uses pre-transposed cells, so only basic key transposition
            else if (phraseType === "iv_iv" || phraseType === "short_iv_iv") {
                transpositionSemitones = keySemitones;
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
            } else if (phraseType === "backdoor_25" || phraseType === "iv_iv" || phraseType === "short_iv_iv") {
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
            } else if (phraseType === "backdoor_25" || phraseType === "iv_iv" || phraseType === "short_iv_iv") {
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
    console.log('generateRhythmChanges56Phrase called with keyName:', keyName);
    console.log('DFB cells available:', window.DFB ? window.DFB.length : 'undefined');
    console.log('CELLS_up5 cells available:', window.CELLS_up5 ? window.CELLS_up5.length : 'undefined');
    console.log('CELLS cells available:', CELLS ? CELLS.length : 'undefined');
    
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        let resolutionCell = resolutionCycler.nextItem();  // From DFB
        console.log('Attempt', attempts + 1, 'resolution cell:', resolutionCell);
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
            console.log('Looking for cells ending with pitch class:', firstNoteCurrent, 'in', cellSetName);
            
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            console.log('Found', compatibleCells.length, 'compatible cells in', cellSetName);
            
            if (compatibleCells.length === 0) {
                console.log('No compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            console.log('Found', unusedCompatibleCells.length, 'unused compatible cells in', cellSetName);
            
            if (unusedCompatibleCells.length === 0) {
                console.log('No unused compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            
            // For the fourth cell (i=2, from CELLS), check that it starts with 'E', 'G', or 'D' before modulation
            if (i === 2) {
                const firstNote = leftCell[0].slice(0, -1); // Remove octave number
                if (!['E', 'G', 'D'].includes(firstNote)) {
                    console.log('Fourth cell starts with', firstNote, 'which is not allowed (must be E, G, or D), skipping this cell');
                    validPhrase = false;
                    break;
                }
                console.log('Fourth cell starts with', firstNote, 'which is allowed (E, G, or D)');
            }
            
            usedCellsPerSet[cellSetName].add(leftCell.join(' ')); // Mark this cell as used in this set
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
            console.log('Added cell, phrase length now:', phrase.length);
        }
        
        if (validPhrase && phrase.length === 17) {
            console.log('Successfully generated rhythm changes 5-6 phrase:', phrase);
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        resolutionCycler.resetPermutation();
    }
    
    console.error('Failed to generate rhythm changes 5-6 phrase after', maxAttempts, 'attempts');
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

// Generate iii to biii° phrase
function generateIiiToBiiiPhrase(keyName) {
    const maxAttempts = 50; // Limit attempts to avoid infinite loops
    
    // Define the four cells to exclude from right cell selection
    const excludedCells = [
        ["D4","B3","C4","D4","D#4"],
        ["B4","A4","F#4","G4","G#4"],
        ["C4", "F4", "Ab4", "Eb4", "F#4"],
        ["A4","D5","B4","F#4","D#4"]
    ];
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const rightCell = rightCycler.nextItem();
        const firstNoteRight = rightCell[0].slice(0, -1); // Remove octave
        
        // Skip any of the four excluded cells
        const isExcludedCell = excludedCells.some(excludedCell => 
            rightCell.length === excludedCell.length &&
            rightCell.every((note, index) => note === excludedCell[index])
        );
        
        if (isExcludedCell) {
            continue; // Try again with a new right cell
        }
        
        // Find compatible left cells from PRE_BIIICELLS (cells that end with the same pitch class as right cell starts)
        const compatibleLeft = window.PRE_BIIICELLS.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteRight);
        
        // If no compatible left cells, try a new right cell
        if (compatibleLeft.length === 0) {
            continue; // Try again with a new right cell
        }
        
        // Found compatible cells, select one
        let leftCell = leftCycler.nextItem();
        while (leftCell[leftCell.length - 1].slice(0, -1) !== firstNoteRight) {
            leftCell = leftCycler.nextItem();
        }
        
        // For iii to biii° phrases, use cells directly without octave adjustment to preserve cell shapes
        const adjustedRight = adjustRightCell(leftCell, rightCell);
        const phrase = leftCell.concat(adjustedRight.slice(1));
        
        return { phrase: phrase, length: phrase.length };
    }
    
    // If we get here, we couldn't find compatible cells after max attempts
    console.error('Could not find compatible cells for iii to biii° phrase after', maxAttempts, 'attempts');
    throw new Error('Unable to generate iii to biii° phrase - no compatible cell combinations found');
}

// Generate long iii to biii° phrase
function generateLongIiiToBiiiPhrase(keyName) {
    // First generate a short iii to biii° phrase (9 notes)
    const shortResult = generateIiiToBiiiPhrase(keyName);
    let phrase = shortResult.phrase;
    
    // Define the four cells to exclude from right cell selection (same as short version)
    const excludedCells = [
        ["D4","B3","C4","D4","D#4"],
        ["B4","A4","F#4","G4","G#4"],
        ["C4", "F4", "Ab4", "Eb4", "F#4"],
        ["A4","D5","B4","F#4","D#4"]
    ];
    
    // Now add two cells to the left, ensuring connectivity
    // Cell 1 (position 1): from PRE_BIIICELLS
    // Cell 0 (position 0): from BASE_MAJOR_CELLS
    const cellSets = [window.PRE_BIIICELLS, window.MAJOR_CELLS];  // Two additional cells
    let usedCells = new Set(); // Track used cells to avoid duplicates
    
    for (let i = 0; i < cellSets.length; i++) {
        const cellSet = cellSets[i];
        const firstNoteCurrent = phrase[0].slice(0, -1);  // Get pitch class of first note
        const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
        
        if (compatibleCells.length > 0) {
            // Filter out cells that have already been used
            const unusedCompatibleCells = compatibleCells.filter(cell => {
                // Check if cell has been used
                if (usedCells.has(cell.join(' '))) {
                    return false;
                }
                return true;
            });
            
            if (unusedCompatibleCells.length === 0) {
                throw new Error("No unused compatible cells found for long iii to biii° phrase");
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCells.add(leftCell.join(' ')); // Mark this cell as used
            const adjustedPhrase = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedPhrase);  // Remove last note of left cell, add entire adjusted phrase
        } else {
            throw new Error("No compatible cells found for long iii to biii° phrase");
        }
    }
    
    return { phrase: phrase, length: phrase.length };
}

// Generate old biii° to ii phrase (original logic)
function generateBiiiToIiOldPhrase(keyName) { // Now generates vi to II7b9 phrases
    // Short version: 1 cell from CELLS_up2 (left, excludes cells starting with "G") + 1 cell from BASE_BIIICELLS (right)
    const maxAttempts = 50; // Limit attempts to avoid infinite loops
    
    // Define the four cells to exclude (from data.js lines 235-238)
    const excludedCells = [
        ["D4","B3","C4","D4","D#4"],
        ["B4","A4","F#4","G4","G#4"],
        ["C4", "F4", "Ab4", "Eb4", "F#4"],
        ["A4","D5","B4","F#4","D#4"]
    ];
    
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const rightCell = rightCycler.nextItem();
        const firstNoteRight = rightCell[0].slice(0, -1); // Remove octave
        
        // Skip any of the four excluded cells
        const isExcludedCell = excludedCells.some(excludedCell => 
            rightCell.length === excludedCell.length &&
            rightCell.every((note, index) => note === excludedCell[index])
        );
        
        if (isExcludedCell) {
            continue; // Try again with a new right cell
        }
        
        // Find compatible left cells from CELLS_up2 (cells that end with the same pitch class as right cell starts)
        // Filter out cells starting with "G" for the leftmost cell
        const compatibleLeft = window.CELLS_up2.filter(cell => {
            const cellEndsWith = cell[cell.length - 1].slice(0, -1);
            const cellStartsWith = cell[0].slice(0, -1);
            return cellEndsWith === firstNoteRight && cellStartsWith !== 'G';
        });
        
        // If no compatible left cells, try a new right cell
        if (compatibleLeft.length === 0) {
            continue; // Try again with a new right cell
        }
        
        // Found compatible cells, select one from the compatible cells
        const leftCell = compatibleLeft[Math.floor(Math.random() * compatibleLeft.length)];
        
        // For biii° to ii phrases, use cells directly without octave adjustment to preserve cell shapes
        const adjustedRight = adjustRightCell(leftCell, rightCell);
        const phrase = leftCell.concat(adjustedRight.slice(1));
        
        return { phrase: phrase, length: phrase.length };
    }
    
    // If we get here, we couldn't find compatible cells after max attempts
    console.error('Could not find compatible cells for vi to II7b9 phrase after', maxAttempts, 'attempts');
    throw new Error('Unable to generate vi to II7b9 phrase - no compatible cell combinations found');
}

// Generate long vi to II7b9 phrase - similar to long 25 minor approach
function generateLongBiiiToIiOldPhrase(keyName) {
    // Long version: 2 cells from CELLS_up2 (cells 0,1, where cell 0 excludes cells starting with "G") + 2 cells from BASE_BIIICELLS (cells 2,3)
    const maxAttempts = 50;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            // Start with a right cell from BASE_BIIICELLS (this will be cell 3)
            const rightCell = rightCycler.nextItem();
            const firstNoteRight = rightCell[0].slice(0, -1); // Remove octave
            
            // Define the four cells to exclude from BASE_BIIICELLS (for cells 2 and 3)
            const excludedCells = [
                ["D4","B3","C4","D4","D#4"],
                ["B4","A4","F#4","G4","G#4"],
                ["C4", "F4", "Ab4", "Eb4", "F#4"],
                ["A4","D5","B4","F#4","D#4"]
            ];
            
            // Skip any of the four excluded cells for the right cell
            const isExcludedCell = excludedCells.some(excludedCell => 
                rightCell.length === excludedCell.length &&
                rightCell.every((note, index) => note === excludedCell[index])
            );
            
            if (isExcludedCell) {
                attempts++;
                continue; // Try again with a new right cell
            }
            
            // Find cell 2 from BASE_BIIICELLS (compatible with cell 3)
            const compatibleCell2 = window.BASE_BIIICELLS.filter(cell => {
                // Check if cell ends with the same pitch class as right cell starts
                const cellEndsWith = cell[cell.length - 1].slice(0, -1);
                const rightStartsWith = firstNoteRight;
                
                // Also check if this cell is not in the excluded list
                const isExcluded = excludedCells.some(excludedCell => 
                    cell.length === excludedCell.length &&
                    cell.every((note, index) => note === excludedCell[index])
                );
                
                return cellEndsWith === rightStartsWith && !isExcluded;
            });
            
            if (compatibleCell2.length === 0) {
                attempts++;
                continue; // Try again with a new right cell
            }
            
            const cell2 = compatibleCell2[Math.floor(Math.random() * compatibleCell2.length)];
            
            // Now build the phrase from right to left
            // Start with cell 3 (right cell)
            let phrase = [...rightCell];
            
            // Add cell 2 (adjusting the connection)
            const adjustedCell2 = adjustRightCell(cell2, phrase);
            phrase = cell2.slice(0, -1).concat(adjustedCell2);
            
            // Now add two cells from CELLS_up2 (cells 0 and 1)
            const cellSets = [window.CELLS_up2, window.CELLS_up2];
            let usedCells = new Set();
            
            for (let i = 0; i < cellSets.length; i++) {
                const cellSet = cellSets[i];
                const firstNoteCurrent = phrase[0].slice(0, -1);  // Get pitch class of first note
                
                // Filter cells based on position: cell 0 (leftmost) excludes cells starting with "G"
                let compatibleCells;
                if (i === 0) {
                    // For cell 0 (leftmost), filter out cells starting with "G"
                    compatibleCells = cellSet.filter(cell => {
                        const cellEndsWith = cell[cell.length - 1].slice(0, -1);
                        const cellStartsWith = cell[0].slice(0, -1);
                        return cellEndsWith === firstNoteCurrent && cellStartsWith !== 'G';
                    });
                } else {
                    // For cell 1, no additional filtering
                    compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
                }
                
                if (compatibleCells.length > 0) {
                    // Filter out cells that have already been used
                    const unusedCompatibleCells = compatibleCells.filter(cell => {
                        return !usedCells.has(cell.join(' '));
                    });
                    
                                if (unusedCompatibleCells.length === 0) {
                throw new Error("No unused compatible cells found for long vi to II7b9 phrase");
            }
                    
                    const leftCell = new Cycler(unusedCompatibleCells).nextItem();
                    usedCells.add(leftCell.join(' ')); // Mark this cell as used
                    const adjustedPhrase = adjustRightCell(leftCell, phrase);
                    phrase = leftCell.slice(0, -1).concat(adjustedPhrase);
                        } else {
            throw new Error("No compatible cells found for long vi to II7b9 phrase");
        }
            }
            
            return { phrase: phrase, length: phrase.length };
            
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed:`, error);
            attempts++;
                            if (attempts >= maxAttempts) {
                    throw new Error(`Failed to generate long vi to II7b9 phrase after ${maxAttempts} attempts`);
                }
        }
    }
    
    throw new Error(`Failed to generate long vi to II7b9 phrase after ${maxAttempts} attempts`);
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

// Generate backdoor 25 phrase - NEW FUNCTION
// Generate backdoor 25 phrase - COMPLETE REIMPLEMENTATION
function generateBackdoor25Phrase(keyName) {
    console.log('generateBackdoor25Phrase called with keyName:', keyName);
    console.log('MAJOR_RESOLUTION_CELLS_down5 available:', window.MAJOR_RESOLUTION_CELLS_down5 ? window.MAJOR_RESOLUTION_CELLS_down5.length : 'undefined');
    console.log('CELLS2_down2 available:', window.CELLS2_down2 ? window.CELLS2_down2.length : 'undefined');
    console.log('CELLS_down2 available:', window.CELLS_down2 ? window.CELLS_down2.length : 'undefined');
    
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        // Create a cycler for the transposed resolution cells
        const resolutionCyclerTransposed = new Cycler(window.MAJOR_RESOLUTION_CELLS_down5);
        let resolutionCell = resolutionCyclerTransposed.nextItem();
        console.log('Attempt', attempts + 1, 'resolution cell:', resolutionCell);
        
        let phrase = resolutionCell;
        const cellSets = [window.CELLS2_down2, window.CELLS_down2, window.CELLS_down2];
        let validPhrase = true;
        
        // Track used cells per cell set to avoid duplicates within the same set
        let usedCellsPerSet = {
            'CELLS2_down2': new Set(),
            'CELLS_down2': new Set()
        };
        
        // Add the resolution cell to the appropriate set (it's from MAJOR_RESOLUTION_CELLS_down5)
        usedCellsPerSet['CELLS_down2'].add(resolutionCell.join(' '));
        
        for (let i = 0; i < cellSets.length; i++) {
            const cellSet = cellSets[i];
            const cellSetName = i === 0 ? 'CELLS2_down2' : 'CELLS_down2';
            const firstNoteCurrent = phrase[0].slice(0, -1);
            console.log('Looking for cells ending with pitch class:', firstNoteCurrent, 'in', cellSetName);
            
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            console.log('Found', compatibleCells.length, 'compatible cells in', cellSetName);
            
            if (compatibleCells.length === 0) {
                console.log('No compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            console.log('Found', unusedCompatibleCells.length, 'unused compatible cells in', cellSetName);
            
            if (unusedCompatibleCells.length === 0) {
                console.log('No unused compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCellsPerSet[cellSetName].add(leftCell.join(' ')); // Mark this cell as used in this set
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 17) {
            // Transpose the entire phrase a whole step up (2 semitones)
            const transposedPhrase = phrase.map(note => transposeNote(note, 2, "C"));
            return { phrase: transposedPhrase, length: transposedPhrase.length };
        }
        
        attempts++;
        resolutionCyclerTransposed.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid backdoor_25 phrase after maximum attempts");
}

// Generate short backdoor 25 phrase - like long but with only 1 cell + resolution
function generateShortBackdoor25Phrase(keyName) {
    console.log('generateShortBackdoor25Phrase called with keyName:', keyName);
    console.log('MAJOR_RESOLUTION_CELLS_down5 available:', window.MAJOR_RESOLUTION_CELLS_down5 ? window.MAJOR_RESOLUTION_CELLS_down5.length : 'undefined');
    console.log('CELLS2_down2 available:', window.CELLS2_down2 ? window.CELLS2_down2.length : 'undefined');
    
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        // Create a cycler for the transposed resolution cells
        const resolutionCyclerTransposed = new Cycler(window.MAJOR_RESOLUTION_CELLS_down5);
        let resolutionCell = resolutionCyclerTransposed.nextItem();
        console.log('Attempt', attempts + 1, 'resolution cell:', resolutionCell);
        
        let phrase = resolutionCell;
        const cellSets = [window.CELLS2_down2]; // Use CELLS2_down2 like the long version's 3rd cell
        let validPhrase = true;
        
        // Track used cells per cell set to avoid duplicates within the same set
        let usedCellsPerSet = {
            'CELLS2_down2': new Set()
        };
        
        for (let i = 0; i < cellSets.length; i++) {
            const cellSet = cellSets[i];
            const cellSetName = 'CELLS2_down2';
            const firstNoteCurrent = phrase[0].slice(0, -1);
            console.log('Looking for cells ending with pitch class:', firstNoteCurrent, 'in', cellSetName);
            
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            console.log('Found', compatibleCells.length, 'compatible cells in', cellSetName);
            
            if (compatibleCells.length === 0) {
                console.log('No compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            console.log('Found', unusedCompatibleCells.length, 'unused compatible cells in', cellSetName);
            
            if (unusedCompatibleCells.length === 0) {
                console.log('No unused compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            const leftCell = new Cycler(unusedCompatibleCells).nextItem();
            usedCellsPerSet[cellSetName].add(leftCell.join(' ')); // Mark this cell as used in this set
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
        }
        
        if (validPhrase && phrase.length === 9) {
            // For short backdoor 25, use no transposition (0 semitones)
            return { phrase: phrase, length: phrase.length };
        }
        
        attempts++;
        resolutionCyclerTransposed.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid short_backdoor_25 phrase after maximum attempts");
}

// Generate deceptive 25 phrase - same as 251 minor but in different key
function generateDeceptive25Phrase(keyName) {
    // Map the target key to the source key for 251 minor
    const keyToSourceKey = {
        "C": "E",   // Key of C uses 251 minor from key of E
        "G": "B",   // Key of G uses 251 minor from key of B
        "D": "F#",  // Key of D uses 251 minor from key of F#
        "A": "C#",  // Key of A uses 251 minor from key of C#
        "E": "Ab",  // Key of E uses 251 minor from key of Ab
        "B": "Eb",  // Key of B uses 251 minor from key of Eb
        "F#": "Bb", // Key of F# uses 251 minor from key of Bb
        "Db": "F",  // Key of Db uses 251 minor from key of F
        "Ab": "C",  // Key of Ab uses 251 minor from key of C
        "Eb": "G",  // Key of Eb uses 251 minor from key of G
        "Bb": "D",  // Key of Bb uses 251 minor from key of D
        "F": "A"    // Key of F uses 251 minor from key of A
    };
    
    const sourceKey = keyToSourceKey[keyName];
    if (!sourceKey) {
        throw new Error(`No source key mapping found for deceptive 25 in key ${keyName}`);
    }
    
    // Save current cyclers
    const originalLeftCycler = leftCycler;
    const originalRightCycler = rightCycler;
    const originalResolutionCycler = resolutionCycler;
    
    // Initialize cyclers for long_25_minor to generate the source phrase
    initializeCyclers("long_25_minor");
    
    // Generate the 251 minor phrase in the source key
    console.log(`Generating deceptive 25: source key = ${sourceKey}, target key = ${keyName}`);
    const sourceResult = generateLong25MinorPhrase(sourceKey);
    console.log(`Generated phrase in source key ${sourceKey}:`, sourceResult.phrase);
    
    // Restore original cyclers
    leftCycler = originalLeftCycler;
    rightCycler = originalRightCycler;
    resolutionCycler = originalResolutionCycler;
    
    // Transpose the phrase to the target key
    const targetSemitones = KEYS[keyName];
    const sourceSemitones = KEYS[sourceKey];
    const transposition = (targetSemitones - sourceSemitones + 12) % 12;
    console.log(`Transposition: ${targetSemitones} - ${sourceSemitones} = ${transposition} semitones`);
    
    const transposedPhrase = sourceResult.phrase.map(note => transposeNote(note, transposition, "C"));
    console.log(`Transposed phrase:`, transposedPhrase);
    
    // Apply final modulation: one semitone down to fix the key issue
    const finalPhrase = transposedPhrase.map(note => transposeNote(note, -1, "C"));
    console.log(`Final phrase after -1 semitone adjustment:`, finalPhrase);
    
    return { phrase: finalPhrase, length: finalPhrase.length };
}

// Generate short deceptive 25 phrase - same as short 251 minor but in different key
function generateShortDeceptive25Phrase(keyName) {
    // Map the target key to the source key for 251 minor
    const keyToSourceKey = {
        "C": "E",   // Key of C uses 251 minor from key of E
        "G": "B",   // Key of G uses 251 minor from key of B
        "D": "F#",  // Key of D uses 251 minor from key of F#
        "A": "C#",  // Key of A uses 251 minor from key of C#
        "E": "Ab",  // Key of E uses 251 minor from key of Ab
        "B": "Eb",  // Key of B uses 251 minor from key of Eb
        "F#": "Bb", // Key of F# uses 251 minor from key of Bb
        "Db": "F",  // Key of Db uses 251 minor from key of F
        "Ab": "C",  // Key of Ab uses 251 minor from key of C
        "Eb": "G",  // Key of Eb uses 251 minor from key of G
        "Bb": "D",  // Key of Bb uses 251 minor from key of D
        "F": "A"    // Key of F uses 251 minor from key of A
    };
    
    const sourceKey = keyToSourceKey[keyName];
    if (!sourceKey) {
        throw new Error(`No source key mapping found for short deceptive 25 in key ${keyName}`);
    }
    
    // Save current cyclers
    const originalLeftCycler = leftCycler;
    const originalRightCycler = rightCycler;
    const originalResolutionCycler = resolutionCycler;
    
    // Initialize cyclers for short_25_minor to generate the source phrase
    initializeCyclers("short_25_minor");
    
    // Generate the short 251 minor phrase in the source key
    const sourceResult = generateShort25MinorPhrase(sourceKey);
    
    // Restore original cyclers
    leftCycler = originalLeftCycler;
    rightCycler = originalRightCycler;
    resolutionCycler = originalResolutionCycler;
    
    // Transpose the phrase to the target key
    const targetSemitones = KEYS[keyName];
    const sourceSemitones = KEYS[sourceKey];
    const transposition = (targetSemitones - sourceSemitones + 12) % 12;
    
    const transposedPhrase = sourceResult.phrase.map(note => transposeNote(note, transposition, "C"));
    
    // Apply final modulation: one semitone down to fix the key issue
    const finalPhrase = transposedPhrase.map(note => transposeNote(note, -1, "C"));
    
    return { phrase: finalPhrase, length: finalPhrase.length };
}

// Generate short IV – iv – phrase (2 cells)
function generateShortIVIVPhrase(keyName) {
    console.log('generateShortIVIVPhrase called with keyName:', keyName);
    console.log('BASE_MAJOR_RESOLUTION_CELLS_down5 available:', window.BASE_MAJOR_RESOLUTION_CELLS_down5 ? window.BASE_MAJOR_RESOLUTION_CELLS_down5.length : 'undefined');
    console.log('MAJOR_CELLS_up5 available:', window.MAJOR_CELLS_up5 ? window.MAJOR_CELLS_up5.length : 'undefined');
    
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        // Create a cycler for the transposed resolution cells (right cell)
        const resolutionCyclerTransposed = new Cycler(window.BASE_MAJOR_RESOLUTION_CELLS_down5);
        let resolutionCell = resolutionCyclerTransposed.nextItem();
        console.log('Attempt', attempts + 1, 'resolution cell:', resolutionCell);
        
        let phrase = resolutionCell;
        
        // Add one cell from MAJOR_CELLS_up5 (left cell)
        const firstNoteCurrent = phrase[0].slice(0, -1);
        console.log('Looking for cells ending with pitch class:', firstNoteCurrent, 'in MAJOR_CELLS_up5');
        
        const compatibleCells = window.MAJOR_CELLS_up5.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
        console.log('Found', compatibleCells.length, 'compatible cells in MAJOR_CELLS_up5');
        
        if (compatibleCells.length > 0) {
            const leftCell = new Cycler(compatibleCells).nextItem();
            const adjustedNewCell = adjustRightCell(leftCell, phrase);
            phrase = leftCell.slice(0, -1).concat(adjustedNewCell);
            
            if (phrase.length === 9) {
                return { phrase: phrase, length: phrase.length };
            }
        }
        
        attempts++;
        resolutionCyclerTransposed.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid short iv_iv phrase after maximum attempts");
}

// Generate IV – iv – phrase - COMPLETE REIMPLEMENTATION
function generateIVIVPhrase(keyName) {
    console.log('generateIVIVPhrase called with keyName:', keyName);
    console.log('BASE_MAJOR_RESOLUTION_CELLS_down5 available:', window.BASE_MAJOR_RESOLUTION_CELLS_down5 ? window.BASE_MAJOR_RESOLUTION_CELLS_down5.length : 'undefined');
    console.log('CELLS2_down2 available:', window.CELLS2_down2 ? window.CELLS2_down2.length : 'undefined');
    console.log('MAJOR_CELLS_up5 available:', window.MAJOR_CELLS_up5 ? window.MAJOR_CELLS_up5.length : 'undefined');
    
    const maxAttempts = 100;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        // Create a cycler for the transposed resolution cells
        const resolutionCyclerTransposed = new Cycler(window.BASE_MAJOR_RESOLUTION_CELLS_down5);
        let resolutionCell = resolutionCyclerTransposed.nextItem();
        console.log('Attempt', attempts + 1, 'resolution cell:', resolutionCell);
        
        let phrase = resolutionCell;
        const cellSets = [window.CELLS2_down2, window.MAJOR_CELLS_up5, window.MAJOR_CELLS_up5];
        let validPhrase = true;
        
        // Track used cells per cell set to avoid duplicates within the same set
        let usedCellsPerSet = {
            'CELLS2_down2': new Set(),
            'MAJOR_CELLS_up5': new Set()
        };
        
        // Add the resolution cell to the appropriate set (it's from BASE_MAJOR_RESOLUTION_CELLS_down5)
        usedCellsPerSet['MAJOR_CELLS_up5'].add(resolutionCell.join(' '));
        
        for (let i = 0; i < cellSets.length; i++) {
            const cellSet = cellSets[i];
            const cellSetName = i === 0 ? 'CELLS2_down2' : 'MAJOR_CELLS_up5';
            const firstNoteCurrent = phrase[0].slice(0, -1);
            console.log('Looking for cells ending with pitch class:', firstNoteCurrent, 'in', cellSetName);
            
            const compatibleCells = cellSet.filter(cell => cell[cell.length - 1].slice(0, -1) === firstNoteCurrent);
            console.log('Found', compatibleCells.length, 'compatible cells in', cellSetName);
            
            if (compatibleCells.length === 0) {
                console.log('No compatible cells found, breaking');
                validPhrase = false;
                break;
            }
            
            // Filter out cells that have already been used within this specific cell set
            const unusedCompatibleCells = compatibleCells.filter(cell => !usedCellsPerSet[cellSetName].has(cell.join(' ')));
            console.log('Found', unusedCompatibleCells.length, 'unused compatible cells in', cellSetName);
            
            if (unusedCompatibleCells.length === 0) {
                console.log('No unused compatible cells found, breaking');
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
        resolutionCyclerTransposed.resetPermutation();
    }
    
    throw new Error("Failed to generate a valid iv_iv phrase after maximum attempts");
}

// Export the generatePhrase function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generatePhrase };
} 