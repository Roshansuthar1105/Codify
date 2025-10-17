import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const nodeRoutesAndTitles = {
    // Node.js Home Page
    "/notes/nodejs": "Learn Node.js Development | Codify",

    // Introduction
    "/notes/nodejs/introduction-to-node.js": "Introduction to Node.js | Codify",
    "/notes/nodejs/node.js-installation": "Node.js Installation | Codify",
    "/notes/nodejs/node.js-environment-setup": "Node.js Environment Setup | Codify",

    // Node.js Basics
    "/notes/nodejs/modules-and-npm": "Node.js Modules and NPM | Codify",
    "/notes/nodejs/file-system": "Node.js File System | Codify",
    "/notes/nodejs/path-module": "Node.js Path Module | Codify",
    "/notes/nodejs/event-loop": "Node.js Event Loop | Codify",
    "/notes/nodejs/callbacks-promises-&-async": "Node.js Callbacks, Promises & Async | Codify",
    "/notes/nodejs/error-handling": "Node.js Error Handling | Codify",

    // Web Development
    "/notes/nodejs/http-module": "Node.js HTTP Module | Codify",
    "/notes/nodejs/express.js-basics": "Express.js Basics | Codify",
    "/notes/nodejs/middleware": "Node.js Middleware | Codify",
    "/notes/nodejs/routing": "Node.js Routing | Codify",
    "/notes/nodejs/template-engines": "Node.js Template Engines | Codify",
    "/notes/nodejs/restful-apis": "Node.js RESTful APIs | Codify",

    // Database Integration
    "/notes/nodejs/mongodb": "Node.js with MongoDB | Codify",
    "/notes/nodejs/mysql": "Node.js with MySQL | Codify",
    "/notes/nodejs/postgresql": "Node.js with PostgreSQL | Codify",
    "/notes/nodejs/odm-and-orm": "Node.js ODM and ORM | Codify",

    // Advanced Topics
    "/notes/nodejs/streams": "Node.js Streams | Codify",
    "/notes/nodejs/clustering": "Node.js Clustering | Codify",
    "/notes/nodejs/child-processes": "Node.js Child Processes | Codify",
    "/notes/nodejs/websockets": "Node.js WebSockets | Codify",
    "/notes/nodejs/authentication": "Node.js Authentication | Codify",
    "/notes/nodejs/security": "Node.js Security | Codify",

    // Node.js Tools & Standards
    "/notes/nodejs/package.json": "Node.js Package.json | Codify",
    "/notes/nodejs/npm-scripts": "Node.js NPM Scripts | Codify",
    "/notes/nodejs/testing-frameworks": "Node.js Testing Frameworks | Codify",
    "/notes/nodejs/debugging-tools": "Node.js Debugging Tools | Codify",
    "/notes/nodejs/process-management": "Node.js Process Management | Codify",
    "/notes/nodejs/deployment-strategies": "Node.js Deployment Strategies | Codify",
};

const NodeJSPageTitleManager = () => {
    const location = useLocation();

    useEffect(() => {
        const pageTitle = nodeRoutesAndTitles[location.pathname] || "Codify";
        document.title = pageTitle;
    }, [location.pathname]);

    return null;
};

export default NodeJSPageTitleManager;