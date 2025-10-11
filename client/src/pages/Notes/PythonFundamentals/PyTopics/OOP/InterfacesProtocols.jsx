/* eslint-disable react/no-unescaped-entities */
import React from "react";
import CodeBlock from "../../../components/CodeBlock";

const InterfacesProtocols = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Python <span className="text-primary-600 dark:text-primary-400">Interfaces & Protocols</span>
      </h1>

      <p className="text-base text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
        Interfaces (using Protocols in Python) define a set of methods that a class must implement. Protocols allow structural subtyping without requiring inheritance from a base class.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">What is a Protocol?</h2>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-blue-700 dark:text-blue-300">
            A Protocol defines methods that a class should have. Any class that implements those methods is considered compliant, even without explicit inheritance.
          </p>
        </div>

        <CodeBlock code={`from typing import Protocol

class Vehicle(Protocol):
    def start(self) -> str:
        ...

class Car:
    def start(self) -> str:
        return "Car is starting"

def vehicle_start(v: Vehicle):
    print(v.start())

my_car = Car()
vehicle_start(my_car)  # Car is starting`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Why Use Protocols?</h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Enables **structural typing** (any class with required methods works)</li>
          <li>Provides a **formal interface** without inheritance</li>
          <li>Helps with **type hints** and static checking</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Multiple Method Protocol</h2>
        <CodeBlock code={`from typing import Protocol

class Worker(Protocol):
    def work(self) -> str:
        ...
    def report(self) -> str:
        ...

class Engineer:
    def work(self):
        return "Engineering tasks done"
    def report(self):
        return "Report submitted"

def perform_task(w: Worker):
    print(w.work())
    print(w.report())

eng = Engineer()
perform_task(eng)  
# Engineering tasks done
# Report submitted`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Protocols vs Abstract Classes</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
          <ul className="list-disc ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Abstract classes enforce inheritance and can provide method implementation</li>
            <li>Protocols are flexible: implement methods without inheriting</li>
            <li>Protocols are mainly used for **type checking** and interface enforcement</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Real-World Example: Payment System</h2>
        <CodeBlock code={`from typing import Protocol

class PaymentProcessor(Protocol):
    def pay(self, amount: float) -> str:
        ...

class PayPal:
    def pay(self, amount: float) -> str:
        return f"Paid {amount} via PayPal"

class Stripe:
    def pay(self, amount: float) -> str:
        return f"Paid {amount} via Stripe"

def make_payment(p: PaymentProcessor, amount: float):
    print(p.pay(amount))

paypal = PayPal()
stripe = Stripe()

make_payment(paypal, 100)  # Paid 100 via PayPal
make_payment(stripe, 200)  # Paid 200 via Stripe`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Duck Typing with Protocols</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Protocols work with **duck typing** — "If it walks like a duck and quacks like a duck, it is a duck."
        </p>

        <CodeBlock code={`from typing import Protocol

class Flyer(Protocol):
    def fly(self) -> str:
        ...

class Bird:
    def fly(self):
        return "Bird flying"

class Airplane:
    def fly(self):
        return "Airplane flying"

def let_it_fly(f: Flyer):
    print(f.fly())

let_it_fly(Bird())      # Bird flying
let_it_fly(Airplane())  # Airplane flying`} />
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Key Points to Remember</h2>
        <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>Protocols define the expected methods without inheritance</li>
          <li>Useful for **type hints** and **static analysis**</li>
          <li>Any class implementing required methods is compatible</li>
          <li>Supports **duck typing** style programming</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Practice Exercises</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <ol className="list-decimal ml-5 text-yellow-700 dark:text-yellow-300 space-y-2">
            <li>Create a Protocol <code>Notifier</code> with a <code>notify()</code> method and implement it in <code>EmailNotifier</code> and <code>SMSNotifier</code>.</li>
            <li>Create a Protocol <code>Serializer</code> with <code>serialize()</code> and <code>deserialize()</code> and implement it in <code>JsonSerializer</code> and <code>XmlSerializer</code>.</li>
            <li>Create a Protocol <code>Logger</code> with <code>log(message)</code> and implement it in two different classes.</li>
          </ol>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Summary</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
          <ul className="text-blue-800 dark:text-blue-300 space-y-2">
            <li>Protocols define method signatures without requiring inheritance</li>
            <li>Compatible with any class implementing the required methods</li>
            <li>Great for duck typing and static type checking</li>
            <li>Can be used as a flexible alternative to interfaces in Python</li>
            <li>Supports multiple methods and real-world scenarios like payments, logging, or notifications</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default InterfacesProtocols;
