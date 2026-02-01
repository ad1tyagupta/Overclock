const fs = require('fs');
const path = require('path');

// Configuration
const sequence1Dir = path.join(__dirname, 'source_assets/Hero Section');
const sequence2Dir = path.join(__dirname, 'source_assets/section 2');
const targetDir = path.join(__dirname, 'public/assets/merged_sequence');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Helper to get sorted webp files
const getFiles = (dir) => fs.readdirSync(dir).filter(f => f.endsWith('.webp')).sort();

const seq1Files = getFiles(sequence1Dir);
const seq2Files = getFiles(sequence2Dir);

console.log(`Sequence 1: ${seq1Files.length} frames`);
console.log(`Sequence 2: ${seq2Files.length} frames`);

let globalIndex = 1;

// Process Sequence 1 (Hero)
seq1Files.forEach(file => {
    const src = path.join(sequence1Dir, file);
    const destName = `frame_${String(globalIndex).padStart(4, '0')}.webp`;
    const dest = path.join(targetDir, destName);
    fs.copyFileSync(src, dest);
    globalIndex++;
});

// Process Sequence 2 (Camera)
seq2Files.forEach(file => {
    const src = path.join(sequence2Dir, file);
    const destName = `frame_${String(globalIndex).padStart(4, '0')}.webp`;
    const dest = path.join(targetDir, destName);
    fs.copyFileSync(src, dest);
    globalIndex++;
});

// Process Sequence 3 (Section 3)
const sequence3Dir = path.join(__dirname, 'source_assets/section 3');
const seq3Files = getFiles(sequence3Dir);
console.log(`Sequence 3: ${seq3Files.length} frames`);

seq3Files.forEach(file => {
    const src = path.join(sequence3Dir, file);
    const destName = `frame_${String(globalIndex).padStart(4, '0')}.webp`;
    const dest = path.join(targetDir, destName);
    fs.copyFileSync(src, dest);
    globalIndex++;
});

console.log(`Merged sequence created with ${globalIndex - 1} frames.`);
