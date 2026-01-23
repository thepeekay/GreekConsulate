// Run tests headlessly using Node.js
const fs = require('fs');
const vm = require('vm');

// Create a mock browser environment
global.window = global;
global.document = {
    querySelectorAll: () => [],
    getElementById: () => null,
    addEventListener: () => {}
};
global.console = console;

console.log('🧪 Loading modules and running tests...\n');

try {
    // Load all modules
    const categories = fs.readFileSync('js/modules/citizenship-categories.js', 'utf8');
    vm.runInThisContext(categories);
    
    const documents = fs.readFileSync('js/modules/citizenship-documents.js', 'utf8');
    vm.runInThisContext(documents);
    
    const core = fs.readFileSync('js/modules/citizenship-core.js', 'utf8');
    vm.runInThisContext(core);
    
    const ui = fs.readFileSync('js/modules/citizenship-ui.js', 'utf8');
    vm.runInThisContext(ui);
    
    const loader = fs.readFileSync('js/modules/citizenship-logic-loader.js', 'utf8');
    vm.runInThisContext(loader);
    
    console.log('✅ All modules loaded\n');
    
    // Load and run tests
    const tests = fs.readFileSync('js/tests/citizenship-tests.js', 'utf8');
    vm.runInThisContext(tests);
    
    console.log('\n📊 Test Summary:');
    console.log('   Total: 28 expected tests');
    console.log('   Check the test-runner.html in your browser for full results');
    
} catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error(error.stack);
    process.exit(1);
}

