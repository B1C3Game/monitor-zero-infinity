// Entry point for Monitor Zero and Infinity Tool
console.log('Monitor Zero-Infinity App is starting...');
const readline = require('readline');
const fs = require('fs');

const monitorZero = (value, context = "") => {
  if (value === 0 || value === null || value === undefined) {
    // Introduce non-determinism: randomly ignore some zero events
    if (Math.random() < 0.5) {
      console.log(`[ZERO EVENT] ${context}: Value is zero/null/undefined.`);
      // Trigger alert or automated response here
      return true;
    } else {
      // Randomly ignore event
      return false;
    }
  }
  return false;
};

const monitorInfinity = (value, context = "") => {
  if (value === Infinity || value === -Infinity) {
    console.log(`[INFINITY EVENT] ${context}: Value is infinite.`);
    // Trigger alert or automated response here
    return true;
  }
  // Optionally monitor for excessive values
  if (typeof value === "number" && Math.abs(value) > 1e12) {
    console.log(`[INFINITY EVENT] ${context}: Value exceeds threshold (${value}).`);
    // Trigger alert or automated response here
    return true;
  }
  return false;
};


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function monitorValues(values, context) {
  let total = values.length;
  let triggered = 0;
  let finiteSum = 0;
  let finiteCount = 0;
  values.forEach(v => {
    const zeroEvent = monitorZero(v, context);
    const infinityEvent = monitorInfinity(v, context);
    if (zeroEvent || infinityEvent) triggered++;
    if (typeof v === 'number' && isFinite(v)) {
      finiteSum += v;
      finiteCount++;
    }
  });
  const average = finiteCount > 0 ? finiteSum / finiteCount : 0;
  // Print report
  console.log(`\n--- Monitoring Report ---`);
  console.log(`Source: ${context}`);
  console.log(`Total values evaluated: ${total}`);
  console.log(`Events triggered: ${triggered}`);
  console.log(`Total sum of finite values: ${finiteSum}`);
  console.log(`Average of finite values: ${average}`);
  console.log(`------------------------\n`);
  return { total, triggered, sum: finiteSum, average };
}

function randomStreamMonitor(count = 100) {
  function generateValues() {
    return Array.from({length: count}, () => {
      // Randomly generate values including edge cases
      const r = Math.random();
      if (r < 0.2) return 0;
      if (r < 0.4) return Infinity;
      if (r < 0.6) return -Infinity;
      if (r < 0.8) return 1e15;
      return Math.floor(Math.random() * 100);
    });
  }
  // Generate one stream and run twice
  const values = generateValues();
  const report1 = monitorValues(values, "Random Stream Run 1");
  const report2 = monitorValues(values, "Random Stream Run 2");
  // Comparison report
  console.log("\n--- Comparison Report ---");
  console.log(`Run 1: ${report1.triggered} events out of ${report1.total}`);
  console.log(`Run 2: ${report2.triggered} events out of ${report2.total}`);
  const diff = report2.triggered - report1.triggered;
  console.log(`Difference in events triggered: ${diff}`);
  console.log("-------------------------\n");
}

function fileMonitor(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const values = content.split(/\s+/).map(Number).filter(v => !isNaN(v));
    monitorValues(values, `File: ${filePath}`);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

function showMenu() {
  console.log('\nChoose a data source to monitor:');
  console.log('1. Example Array');
  console.log('2. Random Number Stream');
  console.log('3. File Input');
  rl.question('Enter choice (1-3): ', answer => {
    if (answer === '1') {
      monitorValues([0, null, undefined, 42, Infinity, -Infinity, 1e15], "Example Array");
      finish();
    } else if (answer === '2') {
      randomStreamMonitor();
      finish();
    } else if (answer === '3') {
      rl.question('Enter file path: ', filePath => {
        fileMonitor(filePath);
        finish();
      });
    } else {
      console.log('Invalid choice.');
      showMenu();
    }
  });
}

function finish() {
  rl.question('Type "r" to run again or "e" to exit: ', answer => {
    if (answer.trim().toLowerCase() === 'r') {
      showMenu();
    } else {
      rl.close();
    }
  });
}

showMenu();


module.exports = { monitorZero, monitorInfinity };
