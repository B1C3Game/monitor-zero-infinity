# Monitor Zero and Infinity Tool

This project provides a tool for monitoring zero (absence, null, baseline), infinity (unbounded, excessive, maximum), and large numbers across different magnitudes in software engineering systems. It supports logging, alerting, and automated responses for zero, infinity, and unusually large numeric events in APIs, databases, network systems, and application processes.


## Features
Detect and log zero, infinity, and large number events across different magnitudes
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

For demonstration purposes, the `monitorZero` function is currently non-deterministic: it randomly ignores some zero events (50% chance). This means that running the monitor twice on the same data can yield different results. This feature illustrates how the outcome of monitoring can depend on the observer or the process, even when the underlying data set is identical.

### What does this prove?
This non-deterministic behavior demonstrates:
- How randomness and probabilistic logic can affect monitoring outcomes.
- That repeated runs on identical data may produce different logs and alerts, highlighting the importance of deterministic monitoring for production systems.
- The risks of relying on non-deterministic detection, such as missing critical events or inconsistent reporting.
- How the result of monitoring can vary depending on the observer or process, even with the same data set.

This feature is useful for testing robustness and understanding the impact of randomness and observer-dependence, but should be removed or replaced with deterministic logic for production use.


# Monitor Zero Infinity

Detect zero, infinity, and large numeric values across different magnitudes
Alert and log events
Zero, infinity, and unusually large values can cause errors, instability, or signal missing/invalid data. Monitoring them improves reliability and data integrity.

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

## Real-Life Action Examples

When the tool detects zero, infinity, or very large numbers, you can take actions such as:

- **Zero detected:**
  - Alert engineering teams about missing sensor data (e.g., temperature sensor returns 0, indicating a fault)
  - Automatically retry API calls if a response value is zero (e.g., payment amount is 0, trigger investigation)
  - Flag database records for review if critical fields are zero (e.g., inventory count is 0, initiate restocking)

- **Infinity detected:**
  - Log and alert when calculations return infinity (e.g., division by zero in financial models)
  - Block further processing if API returns infinity (e.g., risk score is infinite, halt transaction)
  - Notify data scientists about infinite values in machine learning datasets (e.g., model weights explode, trigger retraining)

- **Very large number detected:**
  - Alert when sensor readings exceed safe thresholds (e.g., pressure sensor returns 1e15, trigger emergency shutdown)
  - Automatically scale infrastructure if API returns unusually large values (e.g., user count spikes, auto-scale servers)
  - Flag database entries for anomaly detection (e.g., transaction amount is 1e15, trigger fraud investigation)

## Future Features
- Advanced analytics for zero/infinity events
- Dashboard for real-time monitoring
- Custom plugins for new platforms
- Multiple methods for starting automated responses based on alert type (e.g., trigger scripts, webhooks, API calls, messaging systems; integration with automation tools like Zapier, IFTTT, Jenkins, Slack, Microsoft Teams)
- Support for importing and monitoring streams of different types (e.g., numeric, text, JSON, CSV) and direct monitoring of API responses, including:
  - REST APIs (e.g., monitoring payment gateway responses for zero or infinite values in finance)
  - GraphQL APIs (e.g., checking query results for missing or extreme values in SaaS platforms)
  - WebSocket APIs (e.g., real-time sensor data monitoring in IoT)
  - SOAP APIs (e.g., validating legacy system responses in enterprise IT)
  - Real-world examples: alerting on zero sales in e-commerce, infinite values in risk scoring for insurance, large numbers in user activity for social media, missing data in healthcare APIs

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

## License
MIT
