# Bebop Practice Program - Web Application

A sophisticated web-based musical phrase generator that creates jazz-style bebop phrases using authentic harmonic progressions and chord types. This application helps jazz musicians practice improvisation by providing contextually appropriate melodic phrases.

## ✨ Features

### **Phrase Generation Modes**
- **Random Mode**: Generates phrases with random key cycling for varied practice
- **Designate Mode**: Choose specific keys for focused practice in particular tonalities

### **Comprehensive Phrase Types**
- **7sus4 Phrases**: Four chord type variations (Minor, Dominant, Half-Diminished, Altered)
- **Major Phrases**: Traditional major scale patterns (Short & Long versions)
- **ii-V Progressions**: Major and Minor ii-V patterns (Short & Long versions)
- **Turnaround Phrases**: Classic jazz turnaround patterns
- **Rhythm Changes**: Phrases for rhythm changes progressions (bars 5-6)
- **II7 to V7**: Specific dominant preparation phrases approaching from the double dominant

### **Interactive Features**
- **Partial/Full Display**: Start with structural notes, reveal complete phrases
- **ABC Notation**: Professional music notation rendering
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Touch Support**: Swipe gestures for mobile navigation
- **Keyboard Shortcuts**: Space bar and Enter key support

## 🚀 Quick Start

### **Option 1: Simple File Opening**
1. Download all files to a folder
2. Open `index.html` in a modern web browser

### **Option 2: Local Server (Recommended)**
```bash
# Navigate to the project directory
cd path/to/bebop-practice-program

# Start a local server (choose one):

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📖 How to Use

### **Getting Started**
1. **Choose Mode**: Select "Random" or "Designate" from the main menu
2. **Select Key** (Designate mode only): Choose your preferred key (C, G, D, A, E, B, F#, Db, Ab, Eb, Bb, F)
3. **Choose Phrase Type**: Pick from available phrase types
4. **Select Chord Type** (7sus4 only): Choose Minor, Dominant, ø7, Altered, or Random

### **Phrase Interaction**
- **Initial View**: Shows key structural notes of the phrase
- **"Show Full Phrase"**: Reveals the complete melodic line with all passing tones
- **"Generate Next Phrase"**: Creates a new phrase with the same settings
- **Return Arrow**: Navigate back to previous screens

### **Controls**
- **Mouse/Touch**: Click buttons or use swipe gestures
- **Keyboard Shortcuts**:
  - `Space`: Advance to next step
  - `Enter`: Generate new phrase
  - `Backspace`: Go back
  - `Escape`: Exit application

## 🎵 Phrase Types Explained

### **7sus4 Phrases**
Dominant 7sus4 chord progressions with four variations:
- **Minor**: Resolves to minor chords (e.g., "in the key of Gm")
- **Dominant**: Resolves to dominant 7th chords (e.g., "in the key of C7")
- **ø7**: Resolves to half-diminished chords (e.g., "in the key of Eø7")
- **Altered**: Resolves to altered dominant chords (e.g., "in the key of F#7Alt")

### **Major Phrases**
- **Short**: 9-note phrases in major keys
- **Long**: 17-note extended phrases with additional harmonic content

### **ii-V Progressions**
- **Major 25**: ii-V-I in major keys (e.g., "F#m B7 E")
- **Minor 25**: iiø7-V7-i in minor keys (e.g., "Gø7 C7 Fm")
- Both available in Short (9 notes) and Long (17 notes) versions

### **Turnaround**
Classic jazz turnaround progressions (I-VI7-ii-V7) in all keys

### **Rhythm Changes**
Phrases specifically designed for bars 5-6 of rhythm changes progressions

### **II7 to V7**
Transitional phrases moving from II7 to V7 chords, could be used to practice rhythm changes' bridge, or typical progressions like D7 to Dm in the key of C.

## ⚙️ Technical Details

### **Architecture**
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Music Notation**: ABC.js library for professional notation rendering
- **No Backend Required**: Fully client-side application

### **Key Files**
- `index.html`: Main application entry point
- `app.js`: Core application logic and UI management
- `data.js`: Musical data structures and chord mappings
- `phrase-generator.js`: Phrase generation algorithms
- `music-utils.js`: Musical utility functions and ABC notation
- `styles.css`: Responsive styling and layout

### **Features**
- **Intelligent Key Cycling**: Ensures all keys are used before repetition
- **Chord Type Cycling**: Randomized but complete coverage of all chord types
- **Phrase Validation**: Ensures generated phrases stay within practical playing range (F3-E5)
- **Error Handling**: Graceful fallbacks for edge cases
- **Memory Management**: Efficient phrase generation with minimal resource usage

## 🎯 Musical Accuracy

This application is based on authentic jazz pedagogy and bebop language:
- **Historically Accurate**: Patterns derived from classic bebop recordings
- **Contextually Appropriate**: Phrases fit their harmonic contexts
- **Range Conscious**: All phrases stay within comfortable instrumental ranges
- **Resolution Focused**: Proper voice leading and chord tone resolution

## 🖥️ Browser Compatibility

### **Fully Supported**
- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

### **Mobile Support**
- iOS Safari 14+
- Chrome Mobile 90+
- Android Browser (latest)

### **Requirements**
- JavaScript enabled
- Modern browser with ES6+ support
- Internet connection (for ABC.js CDN)

## 🎼 Educational Use

This tool is designed for:
- **Jazz Students**: Learning bebop vocabulary and harmonic patterns
- **Teachers**: Demonstrating phrase construction and harmonic relationships
- **Performers**: Practicing improvisation in various keys and contexts
- **Composers**: Studying traditional jazz melodic construction

## 🛠️ Development

### **Local Development Setup**
1. Clone or download the repository
2. Start a local HTTP server (required for proper module loading)
3. Open the application in your browser
4. Use browser developer tools for debugging

### **File Structure**
```
bebop-practice-program/
├── index.html          # Main HTML file
├── app.js             # Application logic
├── data.js            # Musical data
├── phrase-generator.js # Phrase algorithms
├── music-utils.js     # Music utilities
├── styles.css         # Styling
└── README.md         # This file
```

## 📞 Support & Contact

- **Created by**: tsy
- **Email**: tungsyauy@gmail.com
- **Version**: Web Application (2024)

## 📄 License

This project is provided for educational and musical purposes. The algorithms and musical content are based on traditional jazz pedagogy and bebop language study. 