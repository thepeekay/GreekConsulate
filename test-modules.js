// Quick Node.js test to validate module loading
const fs = require('fs');
const vm = require('vm');

// Create a mock window object
global.window = global;

console.log('Loading modules...\n');

try {
    // Load law-texts (if needed)
    console.log('1. Loading categories...');
    const categories = fs.readFileSync('js/modules/citizenship-categories.js', 'utf8');
    vm.runInThisContext(categories);
    console.log('✅ CitizenshipCategories:', typeof CitizenshipCategories !== 'undefined' ? 'LOADED' : 'FAILED');
    console.log('   - Categories count:', Object.keys(CitizenshipCategories || {}).length);
    
    console.log('\n2. Loading documents...');
    const documents = fs.readFileSync('js/modules/citizenship-documents.js', 'utf8');
    vm.runInThisContext(documents);
    console.log('✅ RequiredDocuments:', typeof RequiredDocuments !== 'undefined' ? 'LOADED' : 'FAILED');
    console.log('   - Document sets:', Object.keys(RequiredDocuments || {}).length);
    
    console.log('\n3. Loading core logic...');
    const core = fs.readFileSync('js/modules/citizenship-core.js', 'utf8');
    vm.runInThisContext(core);
    console.log('✅ determineCitizenshipCategory:', typeof determineCitizenshipCategory !== 'undefined' ? 'LOADED' : 'FAILED');
    
    console.log('\n4. Loading UI...');
    const ui = fs.readFileSync('js/modules/citizenship-ui.js', 'utf8');
    vm.runInThisContext(ui);
    console.log('✅ formatDocumentsList:', typeof formatDocumentsList !== 'undefined' ? 'LOADED' : 'FAILED');
    
    console.log('\n5. Loading loader...');
    const loader = fs.readFileSync('js/modules/citizenship-logic-loader.js', 'utf8');
    vm.runInThisContext(loader);
    console.log('✅ window.CitizenshipLogic:', typeof window.CitizenshipLogic !== 'undefined' ? 'LOADED' : 'FAILED');
    
    if (window.CitizenshipLogic) {
        console.log('   - Available functions:', Object.keys(window.CitizenshipLogic).join(', '));
        
        console.log('\n6. Testing function call...');
        const result = window.CitizenshipLogic.determineCitizenshipCategory({
            fatherIsGreek: true,
            birthDate: '1990-01-01'
        });
        console.log('✅ Function call successful!');
        console.log('   - Results:', result.length, 'categories returned');
        console.log('   - First category:', result[0]?.category?.id || 'NONE');
    }
    
    console.log('\n✅ ALL MODULES LOADED SUCCESSFULLY!');
    
} catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
}

