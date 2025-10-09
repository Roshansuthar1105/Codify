import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const pyRoutesAndTitles = {
    // Python Home Page
    "/notes/python": "Learn Python Programming | Codify",

    // Introduction
    "/notes/python/introduction-to-python": "Introduction to Python | Codify",
    "/notes/python/python-installation": "Installing Python | Codify",
    "/notes/python/running-python-code": "Running Python Code | Codify",

   
   
   
    // Python Basics
    "/notes/python/variables-&-data-types": "Python Variables & Data Types | Codify",
    "/notes/python/operators": "Python Operators | Codify",
    "/notes/python/input-&-output": "Python Input & Output | Codify",
    "/notes/python/type-casting": "Python Type Casting | Codify",
    "/notes/python/string-formatting": "Python String Formatting | Codify",
    "/notes/python/conditional-statements": "Python Conditional Statements | Codify",
    "/notes/python/loops": "Python Loops | Codify",
    "/notes/python/functions": "Python Functions | Codify",

   
   
   
   
   // Data Structures
    "/notes/python/strings": "Python Strings | Codify",
    "/notes/python/lists": "Python Lists | Codify",
    "/notes/python/list-comprehension": "Python List Comprehension | Codify",
    "/notes/python/tuples-&-sets": "Python Tuples & Sets | Codify",
    "/notes/python/dictionaries": "Python Dictionaries | Codify",
    "/notes/python/nested-loops": "Python Nested Loops | Codify",
     "/notes/python/array": "Python Arrays | Codify",
    "/notes/python/stacks": "Python Stacks | Codify",
    "/notes/python/queues": "Python Queues | Codify",
    "/notes/python/linked-lists": "Python Linked Lists | Codify",

    // Intermediate Topics
    "notes/python/iterators-&-iterables": "Python Iterators & Iterables | Codify",
    "/notes/python/context-managers": "Python Context Managers | Codify",
    "notes/pyhton/closures": "Python Closures | Codify",

 
 
    // Advanced Topics
    "/notes/python/break-&-continue": "Python Break & Continue | Codify",
    "/notes/python/exception-handling": "Python Exception Handling | Codify",
    "/notes/python/modules-&-imports": "Python Modules & Imports | Codify",
    "/notes/python/file-handling": "Python File Handling | Codify",
    "/notes/python/lambda-functions": "Python Lambda Functions | Codify",
    "/notes/python/map-filter-reduce": "Python Map, Filter, Reduce | Codify",
    "/notes/python/built-in-functions": "Python Built-in Functions | Codify",
    "/notes/python/multithreading-&-multiprocessing": "Python Multithreading & Multiprocessing | Codify",
    "/notes/python/decorators-&-generators": "Python Decorators & Generators | Codify",
    
   
   
   
   
    // Object-Oriented Programming
    "/notes/python/classes-&-objects": "Python Classes & Objects | Codify",
    "/notes/python/inheritance": "Python Inheritance | Codify",
    "/notes/python/encapsulation": "Python Encapsulation | Codify",
    "/notes/python/polymorphism": "Python Polymorphism | Codify",
    "/notes/python/static-methods": "Python Static Methods | Codify",
    "/notes/python/magic-methods": "Python Magic Methods | Codify",
    "/notes/python/abstract-classes": "Python Abstract Classes | Codify",
    "/notes/python/interfaces-&-protocols": "Python Interfaces & Protocols | Codify",
    "/notes/python/properties-&-getters-setters": "Python Properties & Getters/Setters | Codify",
};

const PyPageTitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
        const pageTitle = pyRoutesAndTitles[location.pathname] || "Codify";
        document.title = pageTitle;
    }, [location.pathname]);

    return null;
};

export default PyPageTitleManager;