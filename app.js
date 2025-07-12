// app.js - Main application logic for the Bebop Practice Program

// Application state
let appState = {
    currentScreen: 'welcome',
    mode: null,              // 'random' or 'designate'
    selectedKey: null,       // Selected key for designate mode
    phraseType: null,        // Selected phrase type
    chordType: null,         // For 7sus4 phrases
    length: null,            // 'short' or 'long'
    useRandomCycling: false, // For random mode
    currentPhrase: null,     // Current generated phrase
    isPartialShown: false,   // Whether partial phrase is shown
    isFullShown: false       // Whether full phrase is shown
};

// Global variables for phrase display
let currentPhraseData = null;
let currentPhraseType = null;
let showingPartialPhrase = true;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    preventZoomAndScaling();
});

// Comprehensive zoom and scaling prevention
function preventZoomAndScaling() {
    // Prevent pinch zoom on the entire document
    document.addEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchmove', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchend', function(event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, { passive: false });

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });

    // Prevent zoom with keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '0')) {
            event.preventDefault();
        }
    });

    // Prevent context menu on long press
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });
}

function initializeApp() {
    setupEventListeners();
    showScreen('welcome');
}

function setupEventListeners() {
    // Welcome screen - Login interface
    document.getElementById('login-btn').addEventListener('click', () => {
        showScreen('mode');
    });

    // Mode selection
    document.getElementById('random-btn').addEventListener('click', () => {
        appState.mode = 'random';
        appState.useRandomCycling = true;
        showScreen('phrase-type');
    });

    document.getElementById('designate-btn').addEventListener('click', () => {
        appState.mode = 'designate';
        appState.useRandomCycling = false;
        showScreen('key');
    });

    // Key selection
    document.querySelectorAll('.key-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            appState.selectedKey = btn.dataset.key;
            showScreen('phrase-type');
        });
    });

    // Phrase type selection
    document.getElementById('7sus4-btn').addEventListener('click', () => {
        console.log('7sus4 button clicked');
        appState.phraseType = '7sus4';
        appState.chordType = null; // Reset chord type
        console.log('App state after 7sus4 selection:', appState);
        showScreen('chord-type');
    });

    document.getElementById('major-btn').addEventListener('click', () => {
        console.log('major button clicked');
        appState.phraseType = 'major';
        appState.chordType = null; // Reset chord type
        console.log('App state after major selection:', appState);
        showScreen('length');
    });

    document.getElementById('major-25-btn').addEventListener('click', () => {
        console.log('major-25 button clicked');
        appState.phraseType = 'major_25';
        appState.chordType = null; // Reset chord type
        console.log('App state after major-25 selection:', appState);
        showScreen('length');
    });

    document.getElementById('minor-25-btn').addEventListener('click', () => {
        console.log('minor-25 button clicked');
        appState.phraseType = 'minor_25';
        appState.chordType = null; // Reset chord type
        console.log('App state after minor-25 selection:', appState);
        showScreen('length');
    });

    document.getElementById('turnaround-btn').addEventListener('click', () => {
        appState.phraseType = 'turnaround';
        navigateToGenerator();
    });

    document.getElementById('rhythm-changes-btn').addEventListener('click', () => {
        appState.phraseType = 'rhythm_changes_56';
        navigateToGenerator();
    });

    document.getElementById('ii7-v7-btn').addEventListener('click', () => {
        appState.phraseType = 'ii7_to_v7';
        navigateToGenerator();
    });

    // Chord type selection (7sus4)
    document.getElementById('minor-chord-btn').addEventListener('click', () => {
        console.log('minor chord button clicked');
        appState.chordType = 'minor';
        console.log('App state after minor chord selection:', appState);
        showScreen('length');
    });

    document.getElementById('dominant-chord-btn').addEventListener('click', () => {
        console.log('dominant chord button clicked');
        appState.chordType = 'dominant';
        console.log('App state after dominant chord selection:', appState);
        showScreen('length');
    });

    document.getElementById('half-dim-chord-btn').addEventListener('click', () => {
        console.log('half-dim chord button clicked');
        appState.chordType = 'half_dim';
        console.log('App state after half-dim chord selection:', appState);
        showScreen('length');
    });

    document.getElementById('altered-chord-btn').addEventListener('click', () => {
        console.log('altered chord button clicked');
        appState.chordType = 'altered';
        console.log('App state after altered chord selection:', appState);
        showScreen('length');
    });

    document.getElementById('random-chord-btn').addEventListener('click', () => {
        console.log('random chord button clicked');
        appState.chordType = 'random';
        console.log('App state after random chord selection:', appState);
        showScreen('length');
    });

    // Length selection
    document.getElementById('short-btn').addEventListener('click', () => {
        console.log('short button clicked');
        appState.length = 'short';
        console.log('App state after short selection:', appState);
        console.log('About to navigate to generator');
        navigateToGenerator();
    });

    document.getElementById('long-btn').addEventListener('click', () => {
        console.log('long button clicked');
        appState.length = 'long';
        console.log('App state after long selection:', appState);
        console.log('About to navigate to generator');
        navigateToGenerator();
    });

    // Phrase generator controls - now handled by toggle button

    // Toggle phrase button
    const toggleButton = document.getElementById('toggle-phrase-btn');
    if (toggleButton) {
        toggleButton.addEventListener('click', handleTogglePhrase);
    }

    // Return arrows
    document.getElementById('mode-return').addEventListener('click', () => showScreen('welcome'));
    document.getElementById('key-return').addEventListener('click', () => showScreen('mode'));
    document.getElementById('phrase-type-return').addEventListener('click', () => {
        if (appState.mode === 'designate') {
            showScreen('key');
        } else {
            showScreen('mode');
        }
    });
    document.getElementById('chord-type-return').addEventListener('click', () => showScreen('phrase-type'));
    document.getElementById('length-return').addEventListener('click', () => {
        if (appState.phraseType === '7sus4') {
            showScreen('chord-type');
        } else {
            showScreen('phrase-type');
        }
    });
    document.getElementById('phrase-generator-return').addEventListener('click', () => {
        if (appState.phraseType === '7sus4' || appState.phraseType === 'major' || 
            appState.phraseType === 'major_25' || appState.phraseType === 'minor_25') {
            showScreen('length');
        } else {
            showScreen('phrase-type');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
}

function handleKeyPress(event) {
    if (event.key === 'Escape') {
        handleBackNavigation();
    } else if (event.key === 'Enter' || event.key === ' ') {
        if (appState.currentScreen === 'phrase-generator') {
            if (!appState.isFullShown) {
                showFullPhrase();
            } else {
                generateNextPhrase();
            }
        }
    }
}

function handleBackNavigation() {
    switch (appState.currentScreen) {
        case 'welcome':
            return;
        case 'mode':
            showScreen('welcome');
            break;
        case 'key':
            showScreen('mode');
            break;
        case 'phrase-type':
            if (appState.mode === 'designate') {
                showScreen('key');
            } else {
                showScreen('mode');
            }
            break;
        case 'chord-type':
            showScreen('phrase-type');
            break;
        case 'length':
            if (appState.phraseType === '7sus4') {
                showScreen('chord-type');
            } else {
                showScreen('phrase-type');
            }
            break;
        case 'phrase-generator':
            if (appState.phraseType === '7sus4' || appState.phraseType === 'major' || 
                appState.phraseType === 'major_25' || appState.phraseType === 'minor_25') {
                showScreen('length');
            } else {
                showScreen('phrase-type');
            }
            break;
    }
}

function showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });

    // Show the target screen
    document.getElementById(screenName + '-screen').classList.remove('hidden');
    appState.currentScreen = screenName;

    // Update screen titles based on current state
    updateScreenTitles();
}

function updateScreenTitles() {
    // Update phrase type screen title
    if (appState.mode === 'designate' && appState.selectedKey) {
        document.getElementById('phrase-type-title').textContent = 
            `Key of ${appState.selectedKey}: Choose Phrase Type`;
    } else if (appState.mode === 'random') {
        document.getElementById('phrase-type-title').textContent = 'Random Key: Choose Phrase Type';
    } else {
        document.getElementById('phrase-type-title').textContent = 'Choose Phrase Type';
    }

    // Update chord type screen title
    if (appState.mode === 'designate' && appState.selectedKey) {
        document.getElementById('chord-type-title').textContent = 
            `Key of ${appState.selectedKey}: Choose 7sus4 Chord Type`;
    } else if (appState.mode === 'random') {
        document.getElementById('chord-type-title').textContent = 'Random Key: Choose 7sus4 Chord Type';
    } else {
        document.getElementById('chord-type-title').textContent = 'Choose 7sus4 Chord Type';
    }

    // Update length screen title
    if (appState.mode === 'designate' && appState.selectedKey) {
        let phraseTypeDisplay = getPhraseTypeDisplay(appState.phraseType);
        document.getElementById('length-title').textContent = 
            `Key of ${appState.selectedKey}: ${phraseTypeDisplay}`;
    } else if (appState.mode === 'random') {
        let phraseTypeDisplay = getPhraseTypeDisplay(appState.phraseType);
        document.getElementById('length-title').textContent = `Random Key: ${phraseTypeDisplay}`;
    } else {
        let phraseTypeDisplay = getPhraseTypeDisplay(appState.phraseType);
        document.getElementById('length-title').textContent = `Choose ${phraseTypeDisplay} Length`;
    }
}

function getPhraseTypeDisplay(phraseType) {
    switch (phraseType) {
        case 'major': return 'Major';
        case 'major_25': return 'Major 25';
        case 'minor_25': return 'Minor 25';
        case '7sus4': return getChordTypeDisplay(appState.chordType);
        default: return phraseType;
    }
}

function getChordTypeDisplay(chordType) {
    switch (chordType) {
        case 'minor': return 'Minor';
        case 'dominant': return 'Dominant';
        case 'half_dim': return 'ø7';
        case 'altered': return 'Altered';
        case 'random': return 'Random';
        default: return '7sus4';
    }
}

function navigateToGenerator() {
    console.log('navigateToGenerator called');
    console.log('Final app state:', appState);
    
    // Determine the final phrase type string based on length and type
    // For random 7sus4, use cycling from the first phrase
    const useRandomCycling = (appState.phraseType === '7sus4' && appState.chordType === 'random');
    let finalPhraseType = getFinalPhraseType(useRandomCycling);
    console.log('Final phrase type:', finalPhraseType);
    
    // Determine the key to use based on mode
    let keyToUse = null;
    if (appState.mode === 'designate') {
        keyToUse = appState.selectedKey;
        console.log('Using selected key for designate mode:', keyToUse);
    } else {
        // For random mode, let the phrase generator handle key generation
        keyToUse = null;
        console.log('Using random key generation for random mode');
    }
    
    // Generate the phrase with automatic retry
    const maxAttempts = 10;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            const phraseData = generatePhraseData(finalPhraseType, keyToUse);
            console.log('Generated phrase data:', phraseData);
            
            // Store the phrase data globally
            currentPhraseData = phraseData;
            currentPhraseType = finalPhraseType;
            
            // Set initial state to show partial phrase
            showingPartialPhrase = true;
            
            // Show the generator screen
            showScreen('phrase-generator');
            
            // Update the display
            updatePhraseDisplay();
            
            // Success - exit the retry loop
            return;
            
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed to generate initial phrase:`, error);
            attempts++;
            
            // If this was the last attempt, show error briefly
            if (attempts >= maxAttempts) {
                showError('Unable to generate phrase after multiple attempts. Please try again.');
                return;
            }
            
            // Continue to next attempt
        }
    }
}

function updatePhraseDisplay() {
    console.log('updatePhraseDisplay called');
    console.log('Current phrase data:', currentPhraseData);
    console.log('Showing partial phrase:', showingPartialPhrase);
    
    if (!currentPhraseData) {
        console.error('No phrase data available');
        return;
    }
    
    // Generate the appropriate ABC notation
    let abcNotation;
    let buttonText;
    
    if (showingPartialPhrase) {
        // Show partial phrase with rests (exactly like Python LilyPond)
        abcNotation = generateABCScore(currentPhraseData.phrase, true, currentPhraseData.phrase.length);
        buttonText = "Show Full Phrase";
    } else {
        // Show full phrase
        abcNotation = generateABCScore(currentPhraseData.phrase, false, currentPhraseData.phrase.length);
        buttonText = "Generate Next Phrase";
    }
    
    console.log('ABC notation:', abcNotation);
    console.log('Button text:', buttonText);
    
    // Update the musical staff
    renderABCNotation(abcNotation);
    
    // Update the key display
    const keyDisplay = document.getElementById('key-display');
    if (keyDisplay) {
        keyDisplay.textContent = currentPhraseData.keyDisplay;
    }
    
    // Update the button
    const toggleButton = document.getElementById('toggle-phrase-btn');
    if (toggleButton) {
        toggleButton.textContent = buttonText;
    }
}

function renderABCNotation(abcNotation) {
    console.log('renderABCNotation called with:', abcNotation);
    
    const notationDiv = document.getElementById('notation');
    if (!notationDiv) {
        console.error('Notation div not found');
        return;
    }
    
    try {
        // Clear previous content
        notationDiv.innerHTML = '';
        
        // Render the ABC notation optimized for iPhone 13 landscape
        ABCJS.renderAbc(notationDiv, abcNotation, {
            responsive: "resize",
            scale: 1.0,  // Reduced scale for iPhone 13
            staffwidth: 450,  // Reduced width for iPhone 13 landscape
            paddingleft: 40,   // Reduced padding
            paddingright: 40,  // Reduced padding
            paddingtop: 15,
            paddingbottom: 15,
            viewportHorizontal: true,
            viewportVertical: true,
            add_classes: true,
            format: {
                titlefont: "serif 14",  // Smaller fonts for iPhone 13
                gchordfont: "serif 10",
                vocalfont: "serif 11",
                annotationfont: "serif 10",
                historyfont: "serif 14",
                infofont: "serif 10",
                measurefont: "serif 10",
                partsfont: "serif 10",
                repeatfont: "serif 10",
                textfont: "serif 10",
                voicefont: "serif 10",
                wordsfont: "serif 10"
            },
            wrap: {
                minSpacing: 1.6,
                maxSpacing: 2.4,
                preferredMeasuresPerLine: 16
            }
        });
        
        // Additional centering and comprehensive scaling prevention
        setTimeout(() => {
            const svg = notationDiv.querySelector('svg');
            if (svg) {
                svg.style.margin = '0 auto';
                svg.style.display = 'block';
                svg.style.width = 'auto';
                svg.style.height = 'auto';
                
                // Comprehensive scaling prevention for SVG
                svg.style.touchAction = 'manipulation';
                svg.style.webkitTouchCallout = 'none';
                svg.style.webkitUserSelect = 'none';
                svg.style.webkitTapHighlightColor = 'transparent';
                svg.style.pointerEvents = 'none';
                svg.style.webkitUserZoom = 'fixed';
                svg.style.mozUserZoom = 'fixed';
                svg.style.userZoom = 'fixed';
                svg.style.webkitTextSizeAdjust = 'none';
                svg.style.msTextSizeAdjust = 'none';
                svg.style.textSizeAdjust = 'none';
                
                // Prevent zoom events specifically on SVG
                svg.addEventListener('touchstart', function(e) {
                    if (e.touches.length > 1) e.preventDefault();
                }, { passive: false });
                
                svg.addEventListener('touchmove', function(e) {
                    if (e.touches.length > 1) e.preventDefault();
                }, { passive: false });
                
                svg.addEventListener('gesturestart', function(e) {
                    e.preventDefault();
                }, { passive: false });
                
                svg.addEventListener('gesturechange', function(e) {
                    e.preventDefault();
                }, { passive: false });
                
                svg.addEventListener('gestureend', function(e) {
                    e.preventDefault();
                }, { passive: false });
                
                // Force center the parent container
                const container = notationDiv.querySelector('.abcjs-container');
                if (container) {
                    container.style.display = 'flex';
                    container.style.justifyContent = 'center';
                    container.style.alignItems = 'center';
                    container.style.width = '100%';
                    
                    // Comprehensive scaling prevention for container
                    container.style.touchAction = 'manipulation';
                    container.style.webkitTouchCallout = 'none';
                    container.style.webkitUserSelect = 'none';
                    container.style.webkitTapHighlightColor = 'transparent';
                    container.style.webkitUserZoom = 'fixed';
                    container.style.mozUserZoom = 'fixed';
                    container.style.userZoom = 'fixed';
                    
                    // Prevent zoom events on container
                    container.addEventListener('touchstart', function(e) {
                        if (e.touches.length > 1) e.preventDefault();
                    }, { passive: false });
                    
                    container.addEventListener('touchmove', function(e) {
                        if (e.touches.length > 1) e.preventDefault();
                    }, { passive: false });
                }
                
                // Apply same prevention to the notation div itself
                notationDiv.style.touchAction = 'manipulation';
                notationDiv.style.webkitUserZoom = 'fixed';
                notationDiv.style.mozUserZoom = 'fixed';
                notationDiv.style.userZoom = 'fixed';
                
                notationDiv.addEventListener('touchstart', function(e) {
                    if (e.touches.length > 1) e.preventDefault();
                }, { passive: false });
                
                notationDiv.addEventListener('touchmove', function(e) {
                    if (e.touches.length > 1) e.preventDefault();
                }, { passive: false });
            }
        }, 100);
        
        console.log('ABC notation rendered successfully');
    } catch (error) {
        console.error('Error rendering ABC notation:', error);
        notationDiv.innerHTML = '<p>Error rendering musical notation</p>';
    }
}

function handleTogglePhrase() {
    console.log('handleTogglePhrase called');
    console.log('Current state - showing partial:', showingPartialPhrase);
    
    if (showingPartialPhrase) {
        // Switch to full phrase
        showingPartialPhrase = false;
        updatePhraseDisplay();
    } else {
        // Generate next phrase
        generateNextPhrase();
    }
}

function generateNextPhrase() {
    console.log('generateNextPhrase called');
    
    const maxAttempts = 10;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
        try {
            // Use the same key logic as initial generation
            let keyToUse = null;
            if (appState.mode === 'designate') {
                // For designate mode, keep using the same selected key
                keyToUse = appState.selectedKey;
                console.log('Using same selected key for next phrase:', keyToUse);
            } else {
                // For random mode, generate new random key
                keyToUse = null;
                console.log('Using new random key for next phrase');
            }
            
            // For random 7sus4 chord types, get a new phrase type with cycling
            let phraseTypeForGeneration = currentPhraseType;
            if (appState.phraseType === '7sus4' && appState.chordType === 'random') {
                phraseTypeForGeneration = getFinalPhraseType(true); // Use cycling for random 7sus4
                console.log('Updated phrase type for random 7sus4:', phraseTypeForGeneration);
            }
            
            // Generate new phrase data
            const newPhraseData = generatePhraseData(phraseTypeForGeneration, keyToUse);
            console.log('New phrase data:', newPhraseData);
            
            // Update current phrase data
            currentPhraseData = newPhraseData;
            
            // Reset to partial phrase view
            showingPartialPhrase = true;
            
            // Update display
            updatePhraseDisplay();
            
            // Success - exit the retry loop
            return;
            
        } catch (error) {
            console.error(`Attempt ${attempts + 1} failed to generate next phrase:`, error);
            attempts++;
            
            // If this was the last attempt, show error briefly
            if (attempts >= maxAttempts) {
                showError('Unable to generate phrase after multiple attempts. Please try again.');
                return;
            }
            
            // Continue to next attempt
        }
    }
}

// Old phrase generation functions removed - now handled by navigateToGenerator and updatePhraseDisplay

function getFinalPhraseType(useRandomCycling = false) {
    if (appState.phraseType === '7sus4') {
        // Include chord type for 7sus4 phrases
        const baseType = appState.length === 'short' ? '7sus4' : 'long_7sus4';
        if (appState.chordType && appState.chordType !== 'mixed') {
            if (appState.chordType === 'random' && useRandomCycling) {
                // Use the random cycler to get the next chord type (only when generating new phrases)
                if (!window.random_7sus4_cycler) {
                    console.error('random_7sus4_cycler not initialized');
                    // Fallback to a simple random chord type selection
                    const chordTypes = ['minor', 'dominant', 'half_dim', 'altered'];
                    const randomChordType = chordTypes[Math.floor(Math.random() * chordTypes.length)];
                    return `${baseType}_${randomChordType}`;
                }
                const cycleMappedType = window.random_7sus4_cycler.get_next_chord_type();
                console.log('Using cycled chord type for 7sus4:', cycleMappedType);
                return cycleMappedType.replace('7sus4', baseType);
            } else if (appState.chordType !== 'random') {
                return `${baseType}_${appState.chordType}`;
            }
        }
        return baseType;
    } else if (appState.phraseType === 'major') {
        return appState.length === 'short' ? 'major' : 'long_major';
    } else if (appState.phraseType === 'major_25') {
        return appState.length === 'short' ? 'short_25_major' : 'long_25_major';
    } else if (appState.phraseType === 'minor_25') {
        return appState.length === 'short' ? 'short_25_minor' : 'long_25_minor';
    } else {
        return appState.phraseType;
    }
}

function generatePhraseData(phraseType, selectedKey) {
    console.log('generatePhraseData called with:', { phraseType, selectedKey, chordType: appState.chordType });
    
    // Determine the key to use for generation (matching Python logic exactly)
    let effectiveKey;
    if (selectedKey) {
        // For designate mode, find the correct generation key
        if (phraseType.startsWith("7sus4") || phraseType.startsWith("long_7sus4")) {
            // Extract chord type from phrase type
            let chordType = appState.chordType;
            if (phraseType.startsWith("long_7sus4_")) {
                chordType = phraseType.replace("long_7sus4_", "");
            } else if (phraseType.startsWith("7sus4_")) {
                chordType = phraseType.replace("7sus4_", "");
            }
            effectiveKey = find_7sus4_generation_key(selectedKey, chordType);
        } else {
            effectiveKey = getDominantOrRelativeMajorKey(phraseType, selectedKey);
        }
        console.log('Using effective key for designate mode:', effectiveKey);
    } else {
        // For random mode, use random key generation
        effectiveKey = getRandomKey();
        console.log('Using random key for random mode:', effectiveKey);
    }
    
    // Map phrase type to base type for generation
    let basePhraseType = phraseType;
    if (phraseType.startsWith("7sus4_")) {
        basePhraseType = "7sus4";
    } else if (phraseType.startsWith("long_7sus4_")) {
        basePhraseType = "long_7sus4";
    }
    
    // Generate the phrase
    const phraseResult = generatePhrase(basePhraseType, effectiveKey, appState.chordType);
    console.log('Phrase result from generatePhrase:', phraseResult);
    
    // Check if phrase generation was successful
    if (!phraseResult || !phraseResult.phrase || !phraseResult.key) {
        console.error('Phrase generation failed or returned invalid result:', phraseResult);
        throw new Error('Failed to generate valid phrase');
    }
    
    // Get the key display text (matching Python logic exactly)
    const keyDisplay = getKeyDisplayText(phraseType, selectedKey, phraseResult.key);
    console.log('Key display text:', keyDisplay);
    
    const result = {
        phrase: phraseResult.phrase,
        keyDisplay: keyDisplay,
        generatedKey: phraseResult.key,
        selectedKey: selectedKey
    };
    
    console.log('Final generatePhraseData result:', result);
    return result;
}

function getKeyDisplayText(phraseType, selectedKey, generatedKey) {
    console.log('getKeyDisplayText called with:', { phraseType, selectedKey, generatedKey });
    
    // Exact implementation from Python phrase_generator_ui.py
    if (selectedKey) {
        // DESIGNATE MODE - use selected key for display
        if (phraseType.includes("25_major")) {
            return getMajor25ChordProgression(selectedKey);
        } else if (phraseType.includes("25_minor")) {
            return getMinor25ChordProgression(selectedKey);
        } else if (phraseType === "turnaround") {
            return getTurnaroundChordProgression(selectedKey);
        } else if (phraseType === "rhythm_changes_56") {
            return getRhythmChanges56ChordProgression(selectedKey);
        } else if (phraseType === "ii7_to_v7") {
            return getII7ToV7ChordProgression(selectedKey);
        } else if (phraseType.includes("major")) {
            return `in the key of ${selectedKey}`;
        } else if (phraseType === "7sus4" || phraseType === "long_7sus4") {
            return window.KEY_CHORD_MAP["7sus4"][selectedKey];
        } else if (phraseType.includes("7sus4_minor")) {
            return window.KEY_CHORD_MAP["7sus4_minor"][selectedKey];
        } else if (phraseType.includes("7sus4_dominant")) {
            return window.KEY_CHORD_MAP["7sus4_dominant"][selectedKey];
        } else if (phraseType.includes("7sus4_half_dim")) {
            return window.KEY_CHORD_MAP["7sus4_half_dim"][selectedKey];
        } else if (phraseType.includes("7sus4_altered")) {
            return window.KEY_CHORD_MAP["7sus4_altered"][selectedKey];
        } else {
            const chordMapKey = phraseType in window.KEY_CHORD_MAP ? phraseType : "major";
            return window.KEY_CHORD_MAP[chordMapKey][selectedKey];
        }
    } else {
        // RANDOM MODE - use generated key with proper mapping
        if (phraseType === "7sus4" || phraseType === "long_7sus4") {
            return window.KEY_CHORD_MAP["7sus4"][generatedKey];
        } else if (phraseType.includes("7sus4_minor")) {
            const targetKey = find_7sus4_target_key_for_display(generatedKey, "minor");
            return get_7sus4_chord_display(targetKey, "minor");
        } else if (phraseType.includes("7sus4_dominant")) {
            const targetKey = find_7sus4_target_key_for_display(generatedKey, "dominant");
            return get_7sus4_chord_display(targetKey, "dominant");
        } else if (phraseType.includes("7sus4_half_dim")) {
            const targetKey = find_7sus4_target_key_for_display(generatedKey, "half_dim");
            return get_7sus4_chord_display(targetKey, "half_dim");
        } else if (phraseType.includes("7sus4_altered")) {
            const targetKey = find_7sus4_target_key_for_display(generatedKey, "altered");
            return get_7sus4_chord_display(targetKey, "altered");
        } else if (phraseType.includes("25_major")) {
            // Map the generated key to the correct display key
            const displayKey = mapRandomKeyForDisplay(phraseType, generatedKey);
            return getMajor25ChordProgression(displayKey);
        } else if (phraseType.includes("25_minor")) {
            // Map the generated key to the correct display key
            const displayKey = mapRandomKeyForDisplay(phraseType, generatedKey);
            return getMinor25ChordProgression(displayKey);
        } else if (phraseType === "turnaround") {
            return getTurnaroundChordProgression(generatedKey);
        } else if (phraseType === "rhythm_changes_56") {
            return getRhythmChanges56ChordProgression(generatedKey);
        } else if (phraseType === "ii7_to_v7") {
            return getII7ToV7ChordProgression(generatedKey);
        } else {
            const chordMapKey = phraseType in window.KEY_CHORD_MAP ? phraseType : "major";
            return window.KEY_CHORD_MAP[chordMapKey][generatedKey];
        }
    }
}

// Old functions removed - now handled by updatePhraseDisplay and handleTogglePhrase

function getRandomKey() {
    // Use the random key cycler for proper cycling behavior
    if (!window.random_key_cycler) {
        console.error('random_key_cycler not initialized');
        // Fallback to a simple random key selection
        const keys = ["C", "G", "D", "A", "E", "B", "F#", "Db", "Ab", "Eb", "Bb", "F"];
        return keys[Math.floor(Math.random() * keys.length)];
    }
    return window.random_key_cycler.get_next_key();
}

function showError(message) {
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Add to container
    document.querySelector('.container').appendChild(errorDiv);
    
    // Remove after 3 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

// ABC notation functions moved to music-utils.js 

// Add missing functions from Python program

function getDominantOrRelativeMajorKey(phraseType, tonicKey) {
    if (!KEYS) {
        throw new Error(`KEYS object is undefined!`);
    }
    if (!(tonicKey in KEYS)) {
        throw new Error(`Invalid tonic key: ${tonicKey}. Available keys: ${Object.keys(KEYS).join(', ')}`);
    }
    
    const keySemitones = KEYS[tonicKey];
    
    if (phraseType.includes("25_major")) {
        // Map to dominant (5th above)
        const dominantSemitones = (keySemitones + 7) % 12;
        for (const [key, semitones] of Object.entries(KEYS)) {
            if (semitones === dominantSemitones) {
                return key;
            }
        }
    } else if (phraseType.includes("25_minor")) {
        // Map to relative major (3rd above)
        const relativeMajorSemitones = (keySemitones + 3) % 12;
        for (const [key, semitones] of Object.entries(KEYS)) {
            if (semitones === relativeMajorSemitones) {
                return key;
            }
        }
    }
    
    return tonicKey;
}

function getMajor25ChordProgression(key) {
    // Special cases with exact accidentals (from Python)
    if (key === "E") {
        return "F#m B7 E";
    } else if (key === "Gb" || key === "F#") {
        return "G#m C#7 F#";
    } else if (key === "B") {
        return "C#m F#7 B";
    }
    
    // For other keys, the progression is ii-V-I
    const keySemitones = KEYS[key];
    const iiSemitones = (keySemitones + 2) % 12;
    const vSemitones = (keySemitones + 7) % 12;
    
    let iiKey = null;
    let vKey = null;
    
    for (const [k, semitones] of Object.entries(KEYS)) {
        if (semitones === iiSemitones) iiKey = k;
        if (semitones === vSemitones) vKey = k;
    }
    
    if (iiKey && vKey) {
        return `${iiKey}m ${vKey}7 ${key}`;
    }
    return `in the key of ${key}`;
}

function getMinor25ChordProgression(key) {
    // Special cases with exact accidentals (from Python)
    if (key === "F") {
        return "Gø7 C7 Fm";
    } else if (key === "Ab") {
        return "Bbø7 Eb7 Abm";
    } else if (key === "B") {
        return "C#ø7 F#7 Bm";
    } else if (key === "F#") {
        return "Abø7 Db7 Gbm";  // Use Gb instead of F# to match flat notation
    }
    
    // For other keys, the progression is iiø7-V7-i
    const keySemitones = KEYS[key];
    const iiSemitones = (keySemitones + 2) % 12;
    const vSemitones = (keySemitones + 7) % 12;
    
    let iiKey = null;
    let vKey = null;
    
    for (const [k, semitones] of Object.entries(KEYS)) {
        if (semitones === iiSemitones) iiKey = k;
        if (semitones === vSemitones) vKey = k;
    }
    
    if (iiKey && vKey) {
        return `${iiKey}ø7 ${vKey}7 ${key}m`;
    }
    return `in the key of ${key}m`;
}

function getTurnaroundChordProgression(key) {
    // Special cases with exact accidentals (from Python)
    if (key === "Gb" || key === "F#") {
        return "Gb Eb7 Abm Db7";
    } else if (key === "B") {
        return "B G#7 C#m F#7";
    }
    
    // For other keys, calculate the chord progression I - VI7 - ii - V7
    const keySemitones = KEYS[key];
    const viSemitones = (keySemitones + 9) % 12;  // 9 semitones up from tonic
    const iiSemitones = (keySemitones + 2) % 12;  // 2 semitones up from tonic
    const vSemitones = (keySemitones + 7) % 12;   // 7 semitones up from tonic
    
    let viKey = null;
    let iiKey = null;
    let vKey = null;
    
    for (const [k, semitones] of Object.entries(KEYS)) {
        if (semitones === viSemitones) viKey = k;
        if (semitones === iiSemitones) iiKey = k;
        if (semitones === vSemitones) vKey = k;
    }
    
    if (viKey && iiKey && vKey) {
        return `${key} ${viKey}7 ${iiKey}m ${vKey}7`;
    }
    return `in the key of ${key}`;
}

function getRhythmChanges56ChordProgression(key) {
    // Special cases with exact accidentals (from Python)
    if (key === "Gb" || key === "F#") {
        return "F#7 - B7 Cdim";
    } else if (key === "B") {
        return "B7 - E7 Fdim";
    }
    
    // For other keys, calculate the chord progression I7 - IV7 #IVdim
    const keySemitones = KEYS[key];
    const ivSemitones = (keySemitones + 5) % 12;  // 5 semitones up from tonic (perfect fourth)
    const sharpIvSemitones = (keySemitones + 6) % 12;  // 6 semitones up from tonic (tritone)
    
    let ivKey = null;
    let sharpIvKey = null;
    
    for (const [k, semitones] of Object.entries(KEYS)) {
        if (semitones === ivSemitones) ivKey = k;
        if (semitones === sharpIvSemitones) sharpIvKey = k;
    }
    
    if (ivKey && sharpIvKey) {
        return `${key}7 - ${ivKey}7 ${sharpIvKey}dim`;
    }
    return `in the key of ${key}`;
}

function getII7ToV7ChordProgression(key) {
    // Special cases with exact accidentals (from Python)
    if (key === "Gb" || key === "F#") {
        return "Ab7 - Db7 -";
    } else if (key === "B") {
        return "C#7 - F#7 -";
    }
    
    // For other keys, calculate the chord progression ii7 - V7
    const keySemitones = KEYS[key];
    const iiSemitones = (keySemitones + 2) % 12;  // 2 semitones up from tonic
    const vSemitones = (keySemitones + 7) % 12;   // 7 semitones up from tonic
    
    let iiKey = null;
    let vKey = null;
    
    for (const [k, semitones] of Object.entries(KEYS)) {
        if (semitones === iiSemitones) iiKey = k;
        if (semitones === vSemitones) vKey = k;
    }
    
    if (iiKey && vKey) {
        return `${iiKey}7 - ${vKey}7 -`;
    }
    return `in the key of ${key}`;
}

function mapRandomKeyForDisplay(phraseType, generatedKey) {
    // This function maps from generation key back to display key for major/minor 25
    // Reverse the mapping done in getDominantOrRelativeMajorKey
    const generatedSemitones = KEYS[generatedKey];
    
    if (phraseType.includes("25_major")) {
        // Generated key is dominant, find the tonic (5th below)
        const tonicSemitones = (generatedSemitones - 7 + 12) % 12;
        for (const [key, semitones] of Object.entries(KEYS)) {
            if (semitones === tonicSemitones) {
                return key;
            }
        }
    } else if (phraseType.includes("25_minor")) {
        // Generated key is relative major, find the minor tonic (3rd below)
        const tonicSemitones = (generatedSemitones - 3 + 12) % 12;
        for (const [key, semitones] of Object.entries(KEYS)) {
            if (semitones === tonicSemitones) {
                return key;
            }
        }
    }
    
    return generatedKey;
} 