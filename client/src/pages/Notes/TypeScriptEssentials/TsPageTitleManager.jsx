import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const tsRoutesAndTitles = {
    // TypeScript Home Page
    "/notes/typescript": "Master TypeScript Essentials | Codify",

    // Introduction
    "/notes/typescript/introduction": "TypeScript Introduction | Codify",
    "/notes/typescript/installation": "Installing TypeScript | Codify",
    "/notes/typescript/configuration": "TypeScript Configuration | Codify",

    // TypeScript Basics
    "/notes/typescript/what-is-typescript": "What is TypeScript? | Codify",
    "/notes/typescript/type-annotations": "Type Annotations in TypeScript | Codify",
    "/notes/typescript/basic-types": "Basic Types in TypeScript | Codify",
    "/notes/typescript/type-inference": "Type Inference in TypeScript | Codify",
    "/notes/typescript/type-assertions": "Type Assertions in TypeScript | Codify",

    // Advanced Types
    "/notes/typescript/union-types": "Union Types in TypeScript | Codify",
    "/notes/typescript/intersection-types": "Intersection Types in TypeScript | Codify",
    "/notes/typescript/literal-types": "Literal Types in TypeScript | Codify",
    "/notes/typescript/enums": "Enums in TypeScript | Codify",
    "/notes/typescript/generics": "Generics in TypeScript | Codify",
    "/notes/typescript/utility-types": "Utility Types in TypeScript | Codify",

    // Functions and Classes
    "/notes/typescript/function-types": "Function Types in TypeScript | Codify",
    "/notes/typescript/optional-parameters": "Optional Parameters in TypeScript | Codify",
    "/notes/typescript/default-parameters": "Default Parameters in TypeScript | Codify",
    "/notes/typescript/rest-parameters": "Rest Parameters in TypeScript | Codify",
    "/notes/typescript/class-types": "Class Types in TypeScript | Codify",
    "/notes/typescript/interfaces": "Interfaces in TypeScript | Codify",
    "/notes/typescript/abstract-classes": "Abstract Classes in TypeScript | Codify",

    // Modules and Namespaces
    "/notes/typescript/modules": "Modules in TypeScript | Codify",
    "/notes/typescript/namespaces": "Namespaces in TypeScript | Codify",
    "/notes/typescript/import-export": "Import and Export in TypeScript | Codify",
    "/notes/typescript/declaration-files": "Declaration Files in TypeScript | Codify",

    // Error Handling and Debugging
    "/notes/typescript/error-handling": "Error Handling in TypeScript | Codify",
    "/notes/typescript/type-guards": "Type Guards in TypeScript | Codify",
    "/notes/typescript/debugging": "Debugging TypeScript | Codify",
};

const PageTitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        //console.log(location.pathname)
        const pageTitle = tsRoutesAndTitles[location.pathname] || "Codify";
        document.title = pageTitle;
    }, [location]);

    return null;
};

export default PageTitleManager;
