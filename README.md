# Monitor Zero and Infinity Tool

This project provides a tool for monitoring zero (absence, null, baseline) and infinity (unbounded, excessive, maximum) in software engineering systems. It supports logging, alerting, and automated responses for zero and infinity events in APIs, databases, network systems, and application processes.


## Features
Detect and log zero and infinity events
Alert and trigger automated responses
Integration with Node.js, Python, REST APIs
Extensible plugin architecture
Clear documentation for engineering teams

## Random Stream Edge Cases

The random stream option intentionally generates many zero and infinity values for robust testing:
- 20% chance for 0
- 20% chance for Infinity
- 20% chance for -Infinity
- 20% chance for a very large number (1e15)
- 20% chance for a random integer (0–99)

This ensures frequent detection of edge cases and validates the monitoring logic. Adjust probabilities for more realistic production scenarios.

## Non-Deterministic Monitoring (Testing)

For demonstration purposes, the `monitorZero` function is currently non-deterministic: it randomly ignores some zero events (50% chance). This means that running the monitor twice on the same data can yield different results.

### What does this prove?
This non-deterministic behavior demonstrates:
- How randomness and probabilistic logic can affect monitoring outcomes.
- That repeated runs on identical data may produce different logs and alerts, highlighting the importance of deterministic monitoring for production systems.
- The risks of relying on non-deterministic detection, such as missing critical events or inconsistent reporting.

This feature is useful for testing robustness and understanding the impact of randomness, but should be removed or replaced with deterministic logic for production use.


# Monitor Zero Infinity

- Detect zero and infinity values
- Alert and log events
Zero and infinity values can cause errors, instability, or signal missing/invalid data. Monitoring them improves reliability and data integrity.

**Install:**
```sh
git clone <repo-url>
cd monitor-zero-infinity
npm install
```

**Run:**
```sh
npm start
```

## Example Usage
```js
const { monitorZero, monitorInfinity } = require('./src/index');
const values = [0, 42, Infinity, -Infinity, 1e15, 99];
values.forEach(v => {
	monitorZero(v, 'Example');
	monitorInfinity(v, 'Example');
});
```

## Input Requirements
- Array or file of numeric values (integers or floats)
- Edge cases: 0, Infinity, -Infinity, large numbers (e.g., 1e15)
- File input: whitespace-separated values

## Use Cases
- Monitoring sensor data
- Checking API responses
- Validating database queries
- Batch processing numeric files

## Future Features
- Advanced analytics
- Real-time dashboard
- Custom plugins

### Step-by-Step Integration Example
3. **Choose or create your input stream**
	- The input stream should be an array of numeric values, or a file containing whitespace-separated numbers.
	  ```js
	  const { monitorZero, monitorInfinity } = require('./src/index');
	  // Example: monitoring values from an API response
	  apiResponse.values.forEach(v => {
		 monitorZero(v, 'API Response');
		 monitorInfinity(v, 'API Response');
	  });
	  ```
	- Or monitor values from a file:
	  ```js
	  const fs = require('fs');
	  const content = fs.readFileSync('input.txt', 'utf8');
	  const values = content.split(/\s+/).map(Number).filter(v => !isNaN(v));
	  values.forEach(v => {
		 monitorZero(v, 'File Input');
		 monitorInfinity(v, 'File Input');
	  });
	  ```
5. **Run the tool**
	- Use `npm start` to run the interactive menu, or integrate the functions in your own Node.js app.
6. **Review output**
	- The tool logs zero/infinity events and provides a summary report.

### Input Stream Requirements
- The input stream should be an array or file of numeric values (integers or floats).
- Values can include edge cases: `0`, `Infinity`, `-Infinity`, very large numbers (e.g., `1e15`), and typical numbers.
- For file input, use whitespace (space, tab, newline) to separate values.
- The tool is designed to handle streams from APIs, sensors, databases, or files.

### Demands for Proper Functionality
- Node.js environment (version 14+ recommended)
- All dependencies installed via `npm install`
- Input values must be numeric or convertible to numbers
- For production, remove or adjust non-deterministic testing features
- Ensure the tool is called in the context where values are available (e.g., after receiving API data)

### Example Use Cases
- Monitoring sensor data for zero/infinity anomalies
- Checking API responses for invalid or extreme values
- Validating database query results for edge cases
- Batch processing files with numeric data for monitoring

## Future Features
- Advanced analytics for zero/infinity events
- Dashboard for real-time monitoring
- Custom plugins for new platforms

## License
MIT
