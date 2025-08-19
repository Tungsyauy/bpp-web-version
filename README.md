# Bebop Practice Program

A comprehensive web-based application for generating and practicing bebop jazz phrases across various harmonic progressions and chord types. This program provides musicians with an extensive library of melodic patterns designed for jazz improvisation practice.

## Features

- **Interactive Web Interface**: Clean, responsive design optimized for both desktop and mobile devices
- **Professional Music Notation**: High-quality musical notation rendering using ABC.js
- **Comprehensive Phrase Library**: Extensive collection of bebop patterns covering various jazz progressions
- **Multiple Practice Modes**: Random generation or targeted practice by key and phrase type
- **Adaptive Display**: Show partial phrases (structural notes) or complete melodic lines
- **Cross-Platform Compatibility**: Works on desktop browsers, tablets, and mobile devices

## Quick Start

1. **Local Setup**:
   ```bash
   cd "bpp web version"
   python3 -m http.server 8000
   ```
   
2. **Access the Application**:
   Open your browser and navigate to `http://localhost:8000`

3. **Login**: 
   Use any username and password to access the application

## How to Use

### Practice Modes

**Random Mode**
- Automatically cycles through all keys and phrase types
- Provides varied practice experience
- Uses intelligent cycling to ensure balanced coverage

**Designate Mode**
- Choose specific keys for targeted practice
- Select particular phrase types and chord progressions
- Customize practice sessions to focus on specific areas

### Navigation Flow

1. **Choose Mode**: Select "Random" or "Designate" from the main menu
2. **Select Key** (Designate mode only): Choose your preferred key (C, G, D, A, E, B, F#, Db, Ab, Eb, Bb, F)
3. **Choose Phrase Type**: Pick from available phrase types
4. **Select Length**: Choose between Short and Long versions (where applicable)
5. **Select Chord Type** (7sus4 only): Choose Minor, Dominant, Half-Diminished, Altered, or Random

### Phrase Interaction

- **Initial View**: Shows key structural notes of the phrase
- **"Show Full"**: Reveals the complete melodic line with all passing tones
- **Return Arrow**: Navigate back to previous screens to generate new phrases

## Phrase Types

### 7sus4 Phrases
Dominant 7sus4 chord progressions with four harmonic contexts:
- **Minor**: Resolves to minor chords
- **Dominant**: Resolves to dominant 7th chords
- **Half-Diminished (ø7)**: Resolves to half-diminished chords
- **Altered**: Resolves to altered dominant chords

Available in both Short (9 notes) and Long (17 notes) versions.

### Major Phrases
- **Short**: 9-note phrases in major keys
- **Long**: 17-note extended phrases with additional harmonic content

### ii-V Progressions (25s)
**Major 25**: ii-V-I progressions in major keys
- Short version: 9 notes
- Long version: 17 notes

**Minor 25**: iiø7-V7-i progressions in minor keys
- Short version: 9 notes  
- Long version: 17 notes

**Backdoor 25**: bVII7-I progressions
- Short version: 9 notes
- Long version: 17 notes

**Tritone-sub 25**: Major and Minor options (implementation pending)
- Short version: 9 notes
- Long version: 17 notes

### IV to iv
Major IV to minor iv progressions available in:
- Short version: 9 notes
- Long version: 17 notes

### Turnaround
Classic jazz turnaround progressions (I-VI7-ii-V7) in all keys

### Rhythm Changes 5-6
Phrases specifically designed for bars 5-6 of rhythm changes progressions

### II7 to ii (ii7 to v7)
Transitional phrases moving from II7 to V7 chords, useful for rhythm changes bridges and typical progressions

### iii to biii°
Chromatic movement from iii to biii° (diminished) chords with sophisticated voice leading

### vi to II7b9
Advanced harmonic progression featuring the II7b9 alteration with specialized long cells for extended phrases

## Technical Architecture

### Frontend Technologies
- **HTML5**: Semantic markup with responsive design
- **CSS3**: Modern styling with flexbox/grid layouts
- **Vanilla JavaScript (ES6+)**: No external frameworks for maximum compatibility
- **ABC.js**: Professional music notation rendering library

### Core Components

**data.js**: Musical data structures and cell definitions
- Base musical cells for all phrase types
- Transposition utilities
- Key and chord mappings
- Automated cell filtering and organization

**phrase-generator.js**: Phrase generation algorithms
- Sophisticated algorithms for each phrase type
- Connectivity logic ensuring smooth voice leading
- Cyclic selection preventing repetition
- Advanced features like long cell integration and fair rotation

**music-utils.js**: Music theory utilities
- Note transposition functions
- Pitch class calculations
- ABC notation conversion
- Enharmonic handling

**app.js**: Application logic and user interface
- State management
- Event handling
- Screen navigation
- Notation rendering coordination

### Key Features

**Intelligent Cell Cycling**: Ensures all musical patterns are used before repetition
**Advanced Connectivity**: Automatic adjustment of phrase segments for smooth melodic flow
**Long Cell Integration**: Extended 9-note patterns for complex harmonic progressions
**Fair Rotation**: Balanced usage of all available musical materials
**Responsive Design**: Optimized for various screen sizes and orientations

## Musical Content

The application contains hundreds of carefully crafted musical cells organized by harmonic function:

- **BASE_CELLS**: Core bebop patterns for 7sus4 progressions
- **MAJOR_CELLS**: Patterns for major key contexts  
- **MINOR_B_CELLS** and **MINOR_C_CELLS**: Specialized minor key patterns
- **TURNAROUND_CELLS**: Classic jazz turnaround patterns
- **BIIICELLS**: Chromatic progression patterns
- **LONG_BIIICELLS**: Extended 9-note cells for complex progressions

All cells are automatically transposed to all 12 keys and filtered according to musical constraints.

## Development Notes

The codebase emphasizes:
- **Musical Accuracy**: All algorithms respect jazz theory and voice leading principles
- **Performance**: Efficient algorithms suitable for real-time generation
- **Maintainability**: Well-organized, documented code structure
- **Extensibility**: Easy addition of new phrase types and musical content

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Optimized for iOS Safari and Chrome Mobile

## Credits

**Developer**: tsy  
**Contact**: tungsyauy@gmail.com

## License

This project is for educational and practice purposes. All musical content is original or derived from public domain jazz theory principles. 