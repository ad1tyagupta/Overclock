const fs = require('fs');
const path = require('path');

// Process Sequence 1 (Hero)
const sourceDir1 = path.join(__dirname, 'source_assets/Hero Section');
const targetDir1 = path.join(__dirname, 'public/assets/sequence1');
processSequence(sourceDir1, targetDir1);

// Process Sequence 2 (Section 2)
const sourceDir2 = path.join(__dirname, 'source_assets/section 2');
const targetDir2 = path.join(__dirname, 'public/assets/sequence2');
processSequence(sourceDir2, targetDir2);

function processSequence(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    // Read files
    const files = fs.readdirSync(source).filter(f => f.endsWith('.webp'));
    files.sort();

    console.log(`Processing ${source} -> ${target}`);
    console.log(`Found ${files.length} frames.`);

    files.forEach((file, index) => {
        const srcPath = path.join(source, file);
        // 1-based index padding to 4 digits: frame_0001.webp
        const frameNum = String(index + 1).padStart(4, '0');
        const destName = `frame_${frameNum}.webp`;
        const destPath = path.join(target, destName);

        fs.copyFileSync(srcPath, destPath);
    });
}


console.log('Assets processed successfully.');
