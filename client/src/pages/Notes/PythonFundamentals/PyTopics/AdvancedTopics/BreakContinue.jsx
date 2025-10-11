/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

export default function BreakContinueDoc() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-blue-600 dark:text-blue-400">Break & Continue</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        In Python loops, the <strong>break</strong> and <strong>continue</strong> statements are used to control 
        the flow of execution. They allow you to skip certain iterations or exit a loop early, making your 
        programs more efficient and logical.
      </p>

      {/* ✅ Section 1 - Introduction */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What are Break and Continue?
        </h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            <strong>break</strong> — Immediately stops the loop and exits it.<br />
            <strong>continue</strong> — Skips the current iteration and moves to the next one.
          </p>
        </div>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>break</strong> is useful when a condition is met, and you no longer need to continue looping.</li>
          <li><strong>continue</strong> is useful when you want to skip specific cases without breaking the loop entirely.</li>
        </ul>
      </section>

      {/* ✅ Section 2 - Using Break Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          The Break Statement
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>break</code> statement is used to exit the loop completely, regardless of the loop condition. 
          Once <code>break</code> is executed, control moves to the first statement after the loop.
        </p>
        <CodeBlock
          code={`for num in range(1, 11):
    if num == 6:
        print("Breaking at:", num)
        break
    print(num)
print("Loop ended.")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: The loop runs from 1 to 10, but when <code>num == 6</code>, 
          the <code>break</code> statement ends the loop. So, numbers 1 to 5 are printed.
        </p>
      </section>

      {/* ✅ Section 3 - Using Continue Statement */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          The Continue Statement
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The <code>continue</code> statement skips the rest of the code inside the loop for the current iteration 
          and jumps to the next iteration of the loop.
        </p>
        <CodeBlock
          code={`for num in range(1, 6):
    if num == 3:
        continue
    print(num)
print("Loop completed.")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: When <code>num == 3</code>, the <code>continue</code> statement skips printing 3. 
          Hence, output is 1, 2, 4, and 5.
        </p>
      </section>

      {/* ✅ Section 4 - Practical Example */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Practical Example: Filtering Numbers
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Let's print only the odd numbers from 1 to 10, and stop the loop once we reach 9.
        </p>
        <CodeBlock
          code={`for num in range(1, 11):
    if num % 2 == 0:
        continue  # Skip even numbers
    if num == 9:
        break     # Stop before printing 9
    print("Odd number:", num)`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: Even numbers are skipped using <code>continue</code>, and the loop stops 
          completely before reaching 9 using <code>break</code>.
        </p>
      </section>

      {/* ✅ Section 5 - Nested Loops */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Break & Continue in Nested Loops
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Both statements only affect the innermost loop they are placed in. 
          The outer loop continues unless explicitly broken.
        </p>
        <CodeBlock
          code={`for i in range(1, 4):
    for j in range(1, 4):
        if j == 2:
            break
        print(f"i={i}, j={j}")`}
        />
        <p className="text-gray-700 dark:text-gray-300 mt-2">
          Explanation: The inner loop breaks when <code>j == 2</code>, 
          but the outer loop continues with the next <code>i</code> value.
        </p>
      </section>

      {/* ✅ Section 6 - Common Mistakes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Common Mistakes to Avoid
        </h2>
        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Placing <code>break</code> before other conditions may cause early loop exit.</li>
            <li>Using <code>continue</code> incorrectly might skip important logic.</li>
            <li>Remember: <code>break</code> and <code>continue</code> don’t work outside loops.</li>
          </ul>
        </div>
      </section>

      {/* ✅ Section 7 - Quick Exercises */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Quick Exercises
        </h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Write a loop that prints numbers 1–10 but stops at 7.</li>
            <li>Write a loop that skips all multiples of 3.</li>
            <li>Combine <code>break</code> and <code>continue</code> in one loop.</li>
            <li>Try using both in nested loops and observe behavior.</li>
          </ol>
        </div>
      </section>

      {/* ✅ Section 8 - Summary */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Summary
        </h2>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li><code>break</code> exits the loop completely.</li>
            <li><code>continue</code> skips the current iteration.</li>
            <li>They only affect the innermost loop they are in.</li>
            <li>Useful for optimizing loop control and improving readability.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
