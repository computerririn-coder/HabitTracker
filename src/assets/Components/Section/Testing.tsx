// @ts-nocheck
// DEBUGGING PRACTICE FILE

/*
INSTRUCTIONS:
1. Set breakpoint on line 23 (console.log("START"))
2. Click the button
3. Use these debugging buttons:
   - Step Over (⤵️) - Execute line, don't go inside functions
   - Step Into (⬇️) - Go inside the function
   - Step Out (⬆️) - Finish current function
   - Continue (▶️) - Run to end or next breakpoint
   - Stop (⏹️) - End debugging
*/


function addNumbers(a, b) {
  const sum = a + b; // Step INTO here to see this
  return sum;
}

function multiplyNumbers(x, y) {
  const product = x * z;
  return product;
}

function Testing() {
  const handleClick = () => {
    console.log('START'); // SET BREAKPOINT HERE (line 23)
    const initial = 5; // Step Over this
    const result = addNumbers(10, 20); // Step Into this
    const doubled = multiplyNumbers(result, 2); // Step Over this
    console.log('Result:', doubled); // Continue to here
    console.log('DONE');
  };

  return (
    <div>
      <h1>Debugging Practice</h1>
      <button onClick={handleClick}>Click to Debug</button>
      <p>Expected result: 60 (because 10+20=30, then 30*2=60)</p>
    </div>
  );
}

export default Testing;
