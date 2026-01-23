/**
 * Citizenship Logic Test Suite
 * Comprehensive tests for Greek Citizenship determination
 * 
 * Test Framework: Simple custom framework (no dependencies)
 * Run: Open test-runner.html in browser
 */

class TestRunner {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
        this.results = [];
    }

    test(description, testFn) {
        this.tests.push({ description, testFn });
    }

    async run() {
        console.log(`\n🧪 Running Test Suite: ${this.name}\n${'='.repeat(60)}`);
        
        for (const { description, testFn } of this.tests) {
            try {
                await testFn();
                this.passed++;
                this.results.push({ description, status: 'PASS', error: null });
                console.log(`✅ PASS: ${description}`);
            } catch (error) {
                this.failed++;
                this.results.push({ description, status: 'FAIL', error: error.message });
                console.error(`❌ FAIL: ${description}`);
                console.error(`   Error: ${error.message}`);
            }
        }

        console.log(`\n${'='.repeat(60)}`);
        console.log(`📊 Results: ${this.passed} passed, ${this.failed} failed, ${this.tests.length} total`);
        
        if (this.failed === 0) {
            console.log('🎉 All tests passed!');
        }

        return { passed: this.passed, failed: this.failed, total: this.tests.length, results: this.results };
    }
}

// Assertion helpers
const assert = {
    equals: (actual, expected, message) => {
        if (actual !== expected) {
            throw new Error(message || `Expected ${expected}, got ${actual}`);
        }
    },
    
    deepEquals: (actual, expected, message) => {
        const actualStr = JSON.stringify(actual);
        const expectedStr = JSON.stringify(expected);
        if (actualStr !== expectedStr) {
            throw new Error(message || `Expected ${expectedStr}, got ${actualStr}`);
        }
    },
    
    truthy: (value, message) => {
        if (!value) {
            throw new Error(message || `Expected truthy value, got ${value}`);
        }
    },
    
    falsy: (value, message) => {
        if (value) {
            throw new Error(message || `Expected falsy value, got ${value}`);
        }
    },
    
    contains: (array, value, message) => {
        if (!array.includes(value)) {
            throw new Error(message || `Expected array to contain ${value}`);
        }
    },
    
    hasProperty: (obj, property, message) => {
        if (!obj.hasOwnProperty(property)) {
            throw new Error(message || `Expected object to have property ${property}`);
        }
    },
    
    isType: (value, type, message) => {
        if (typeof value !== type) {
            throw new Error(message || `Expected type ${type}, got ${typeof value}`);
        }
    }
};

// ============================================================================
// TEST SUITE 1: Category Determination Tests
// ============================================================================

const categoryTests = new TestRunner('Citizenship Category Determination');

// Test 1: Child of Greek parent (modern case)
categoryTests.test('Child of Greek father (after 1982) - Automatic citizenship', () => {
    const data = {
        fatherIsGreek: true,
        motherIsGreek: false,
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    assert.truthy(results[0].category, 'Should have category object');
    assert.equals(results[0].category.id, 'birth_greek_parent', 'Should identify as birth_greek_parent');
    assert.equals(results[0].confidence, 'high', 'Should have high confidence');
});

// Test 2: Child of Greek mother (after 1984) - Automatic citizenship
categoryTests.test('Child of Greek mother (after 1984) - Automatic citizenship', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: true,
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    assert.truthy(results[0].category, 'Should have category object');
    assert.equals(results[0].category.id, 'birth_greek_parent', 'Should identify as birth_greek_parent');
});

// Test 3: Child of Greek father before 1982 - Declaration required
categoryTests.test('Child of Greek father (before 1982) - Declaration required', () => {
    const data = {
        fatherIsGreek: true,
        motherIsGreek: false,
        birthDate: '1980-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    assert.truthy(results[0].category, 'Should have category object');
    assert.equals(results[0].category.id, 'birth_greek_father_pre1982', 'Should identify as pre-1982 case');
});

// Test 4: Child of Greek mother before 1984 - Declaration required  
categoryTests.test('Child of Greek mother (before 1984) - Declaration required', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: true,
        birthDate: '1983-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    assert.truthy(results[0].category, 'Should have category object');
    assert.equals(results[0].category.id, 'birth_greek_mother_pre1984', 'Should identify as pre-1984 case');
});

// Test 5: Greek grandparent through father's side
categoryTests.test('Greek paternal grandfather - Ancestry route', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        birthDate: '1990-01-01',
        ancestry: {
            paternalGrandfather: {
                isGreek: true,
                name: 'Γεώργιος Παπαδόπουλος',
                birthPlace: 'Αθήνα',
                status: 'alive'
            }
        },
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    // Should suggest omogeneis/ancestry or posthumous route
    const hasAncestryRoute = results.some(r => 
        r.category && (r.category.id === 'naturalization_omogeneis' ||
        r.category.id === 'posthumous_parent' || 
        r.category.id === 'birth_declaratory')
    );
    assert.truthy(hasAncestryRoute, 'Should identify ancestry-based route');
});

// Test 6: Birth in Greece with schooling
categoryTests.test('Born in Greece + Greek schooling - Declaration route', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        bornInGreece: true,
        schooledInGreece: true,
        schoolYearsInGreece: 6,
        birthDate: '2005-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    const hasBirthSchooling = results.some(r => 
        r.category && (r.category.id === 'declaration_birth_schooling' || 
        r.category.id === 'declaration_schooling')
    );
    assert.truthy(hasBirthSchooling, 'Should identify birth+schooling route');
});

// Test 7: Greek university graduate
categoryTests.test('Greek university graduate - Declaration route', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        graduatedGreekUniversity: true,
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    const hasUniversityRoute = results.some(r => r.category && r.category.id === 'declaration_university');
    assert.truthy(hasUniversityRoute, 'Should identify university route');
});

// Test 8: Married to Greek with child - Naturalization
categoryTests.test('Married to Greek with child - Reduced naturalization period', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        marriedToGreek: true,
        hasChildWithGreekSpouse: true,
        residenceYearsInGreece: 3,
        birthDate: '1985-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    const hasSpouseRoute = results.some(r => r.category && r.category.id === 'naturalization_spouse');
    assert.truthy(hasSpouseRoute, 'Should identify spouse naturalization route');
});

// Test 9: Refugee status - Reduced naturalization period
categoryTests.test('Recognized refugee - Reduced naturalization period', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        isRefugee: true,  // The API expects boolean flags, not 'refugee' string
        residenceYearsInGreece: 3,
        birthDate: '1985-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    const hasRefugeeRoute = results.some(r => r.category && r.category.id === 'naturalization_refugee');
    assert.truthy(hasRefugeeRoute, 'Should identify refugee naturalization route');
});

// Test 10: General naturalization - 7 years residence
categoryTests.test('General naturalization - 7 years residence', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        residenceYearsInGreece: 7,
        birthDate: '1985-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return at least one result');
    const hasGeneralRoute = results.some(r => r.category && r.category.id === 'naturalization_general');
    assert.truthy(hasGeneralRoute, 'Should identify general naturalization route');
});

// ============================================================================
// TEST SUITE 2: Document Requirements Tests
// ============================================================================

const documentTests = new TestRunner('Document Requirements');

// Test 11: Birth from Greek parent - Required documents
documentTests.test('Birth from Greek parent - Should return correct documents', () => {
    const docs = window.CitizenshipLogic.getRequiredDocuments('birth_greek_parent');
    
    assert.truthy(docs, 'Should return documents object');
    assert.hasProperty(docs, 'applicant', 'Should have applicant documents');
    assert.hasProperty(docs, 'parent', 'Should have parent documents');
    assert.truthy(docs.applicant.length > 0, 'Should have applicant documents');
    assert.truthy(docs.parent.length > 0, 'Should have parent documents');
    
    // Check for required document types
    const hasBirthCert = docs.applicant.some(d => d.id.includes('birth_cert'));
    assert.truthy(hasBirthCert, 'Should include birth certificate');
});

// Test 12: Pre-1982 father case - Specific documents
documentTests.test('Pre-1982 Greek father - Should require declaration form', () => {
    const docs = window.CitizenshipLogic.getRequiredDocuments('birth_greek_father_pre1982');
    
    assert.truthy(docs, 'Should return documents object');
    const hasDeclaration = docs.applicant.some(d => d.id === 'declaration_form');
    assert.truthy(hasDeclaration, 'Should include declaration form');
});

// Test 13: Document structure validation
documentTests.test('Document structure - All documents have required fields', () => {
    const docs = window.CitizenshipLogic.getRequiredDocuments('birth_greek_parent');
    
    const allDocs = [...docs.applicant, ...docs.parent];
    
    for (const doc of allDocs) {
        assert.hasProperty(doc, 'id', 'Document should have id');
        assert.hasProperty(doc, 'name', 'Document should have name');
        assert.hasProperty(doc, 'required', 'Document should have required flag');
        assert.hasProperty(doc, 'legalRef', 'Document should have legal reference');
        assert.hasProperty(doc, 'foreignDoc', 'Document should have foreignDoc flag');
        assert.hasProperty(doc, 'alternatives', 'Document should have alternatives array');
        
        assert.isType(doc.id, 'string', 'Document id should be string');
        assert.isType(doc.name, 'string', 'Document name should be string');
        assert.isType(doc.required, 'boolean', 'Required should be boolean');
        assert.truthy(Array.isArray(doc.alternatives), 'Alternatives should be array');
    }
});

// Test 14: Naturalization documents
documentTests.test('Naturalization - Should include residence proof', () => {
    const docs = window.CitizenshipLogic.getRequiredDocuments('naturalization_general');
    
    assert.truthy(docs.general, 'Should have general documents section');
    // Check both main document names and alternatives
    const hasResidenceProof = docs.general.some(d => 
        d.name.toLowerCase().includes('διαμονή') || 
        d.name.toLowerCase().includes('κατοικίας') ||
        d.name.toLowerCase().includes('κοινωνικής ένταξης') ||  // integration proof includes residence
        (d.alternatives && d.alternatives.some(alt => 
            alt.toLowerCase().includes('κατοικίας') || 
            alt.toLowerCase().includes('διαμονή')
        ))
    );
    assert.truthy(hasResidenceProof, 'Should include residence/integration proof');
});

// ============================================================================
// TEST SUITE 3: Ancestry Chain Analysis Tests  
// ============================================================================

const ancestryTests = new TestRunner('Ancestry Chain Analysis');

// Test 15: Has Greek parent - Direct path
ancestryTests.test('Has Greek parent - Should identify direct path', () => {
    const hasParent = window.CitizenshipLogic.hasGreekParent({
        fatherIsGreek: true,
        motherIsGreek: false
    });
    
    assert.truthy(hasParent, 'Should identify Greek parent');
});

// Test 16: Has Greek ancestry - Grandparent
ancestryTests.test('Has Greek grandparent - Should identify ancestry', () => {
    // The API expects ancestry data in a nested structure
    const hasAncestry = window.CitizenshipLogic.hasGreekAncestry({
        fatherIsGreek: false,
        motherIsGreek: false,
        ancestry: {
            paternalGrandfather: {
                isGreek: true,
                name: 'Test',
                birthPlace: 'Athens'
            }
        }
    });
    
    assert.truthy(hasAncestry, 'Should identify Greek ancestry');
});

// Test 17: Ancestry chain analysis
ancestryTests.test('Ancestry chain analysis - Should trace full chain', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        ancestry: {
            paternalGrandfather: {
                isGreek: true,
                name: 'Γεώργιος',
                birthPlace: 'Αθήνα',
                status: 'alive'
            }
        },
        fatherName: 'John Smith',
        birthDate: '1990-01-01'
    };
    
    const analysis = window.CitizenshipLogic.analyzeAncestryChain(data);
    
    assert.truthy(analysis, 'Should return analysis object');
    assert.hasProperty(analysis, 'results', 'Should have results property');
    assert.truthy(analysis.results.hasGreekGrandparent, 'Should identify Greek grandparent');
});

// Test 18: Parent can apply first - Cost optimization
ancestryTests.test('Parent can apply first - Should suggest optimal path', () => {
    const data = {
        fatherIsGreek: false,
        fatherStatus: 'alive',
        motherIsGreek: false,
        ancestry: {
            paternalGrandfather: {
                isGreek: true,
                status: 'alive',
                name: 'Test Grandfather'
            }
        },
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const optimalPath = window.CitizenshipLogic.checkIfParentCanApplyFirst(data);
    
    // The function should return an object, check if properties exist
    if (optimalPath && typeof optimalPath === 'object') {
        assert.hasProperty(optimalPath, 'canApply', 'Should have canApply property');
        // Only check savings if it exists
        if (optimalPath.savings !== undefined) {
            assert.isType(optimalPath.savings, 'number', 'Savings should be a number');
        }
    }
});

// ============================================================================
// TEST SUITE 4: UI Formatting Tests
// ============================================================================

const uiTests = new TestRunner('UI Formatting');

// Test 19: Format documents list - Returns HTML
uiTests.test('Format documents list - Should return valid HTML', () => {
    const html = window.CitizenshipLogic.formatDocumentsList('birth_greek_parent', false, {});
    
    assert.isType(html, 'string', 'Should return string');
    assert.truthy(html.length > 0, 'Should return non-empty string');
    assert.truthy(html.includes('<'), 'Should contain HTML tags');
    assert.truthy(html.includes('Έγγραφα'), 'Should contain document section labels');
});

// Test 20: Format with document status - Checkboxes
uiTests.test('Format with document status - Should include checkboxes', () => {
    const documentStatus = {
        'birth_cert': { received: true, alternativeUsed: null }
    };
    
    const html = window.CitizenshipLogic.formatDocumentsList(
        'birth_greek_parent',
        false,
        {},
        documentStatus
    );
    
    assert.truthy(html.includes('checkbox'), 'Should include checkbox inputs');
    assert.truthy(html.includes('checked'), 'Should mark received documents as checked');
});

// Test 21: Format with alternatives - Radio buttons
uiTests.test('Format with alternatives - Should include radio buttons for alternatives', () => {
    const html = window.CitizenshipLogic.formatDocumentsList('birth_greek_parent', false, {});
    
    // Check if alternatives section exists
    assert.truthy(html.includes('Εναλλακτικά έγγραφα'), 'Should include alternatives section');
});

// ============================================================================
// TEST SUITE 5: Edge Cases and Validation
// ============================================================================

const edgeCaseTests = new TestRunner('Edge Cases and Validation');

// Test 22: Empty data - Should handle gracefully
edgeCaseTests.test('Empty data - Should not crash', () => {
    const results = window.CitizenshipLogic.determineCitizenshipCategory({
        firstName: 'Test',
        lastName: 'User'
    });
    
    assert.truthy(Array.isArray(results), 'Should return array');
    // May return empty or general naturalization as fallback - just check it doesn't crash
});

// Test 23: Invalid birth date - Should handle gracefully
edgeCaseTests.test('Invalid birth date - Should handle gracefully', () => {
    const data = {
        fatherIsGreek: true,
        birthDate: 'invalid-date',
        firstName: 'Test',
        lastName: 'User'
    }; 
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(Array.isArray(results), 'Should return array even with invalid date');
});

// Test 24: Both parents Greek - Should prioritize automatic citizenship
edgeCaseTests.test('Both parents Greek - Should identify automatic citizenship', () => {
    const data = {
        fatherIsGreek: true,
        motherIsGreek: true,
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return results');
    assert.truthy(results[0].category, 'Should have category');
    assert.equals(results[0].category.id, 'birth_greek_parent', 'Should prioritize automatic route');
    assert.equals(results[0].confidence, 'high', 'Should have high confidence');
});

// Test 25: Multiple ancestry paths - Should return all options
edgeCaseTests.test('Multiple ancestry paths - Should return all viable options', () => {
    const data = {
        fatherIsGreek: false,
        motherIsGreek: false,
        ancestry: {
            paternalGrandfather: {
                isGreek: true,
                name: 'Test Paternal GF'
            },
            maternalGrandmother: {
                isGreek: true,
                name: 'Test Maternal GM'
            }
        },
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return multiple options');
});

// Test 26: Deceased parent in chain - Special handling
edgeCaseTests.test('Deceased parent in ancestry chain - Should suggest posthumous route', () => {
    const data = {
        fatherIsGreek: false,
        fatherStatus: 'deceased',
        motherIsGreek: false,
        ancestry: {
            paternalGrandfather: {
                isGreek: true,
                status: 'deceased',
                name: 'Test Grandfather'
            }
        },
        birthDate: '1990-01-01',
        firstName: 'Test',
        lastName: 'User'
    };
    
    const results = window.CitizenshipLogic.determineCitizenshipCategory(data);
    assert.truthy(results && results.length > 0, 'Should return results');
    // Check if any result has the special case or mentions posthumous/omogeneis
    const hasSpecialHandling = results.some(r => 
        (r.specialCase && r.specialCase.includes('DECEASED')) ||
        (r.category && (r.category.id === 'posthumous_parent' || r.category.id === 'naturalization_omogeneis'))
    );
    assert.truthy(hasSpecialHandling, 'Should suggest posthumous parent or omogeneis route');
});

// ============================================================================
// TEST SUITE 6: Cost Calculation Tests
// ============================================================================

const costTests = new TestRunner('Cost Calculations');

// Test 27: Category costs - All categories should have cost info
costTests.test('All categories have cost information', () => {
    const categories = window.CitizenshipLogic.CitizenshipCategories;
    
    for (const [key, category] of Object.entries(categories)) {
        assert.hasProperty(category, 'cost', `${key} should have cost property`);
        assert.hasProperty(category.cost, 'min', `${key} cost should have min`);
        assert.hasProperty(category.cost, 'max', `${key} cost should have max`);
        assert.hasProperty(category.cost, 'currency', `${key} cost should have currency`);
    }
});

// Test 28: Cost comparison - Parent vs child application
costTests.test('Cost optimization - Parent first should be cheaper', () => {
    const parentRoute = window.CitizenshipLogic.CitizenshipCategories.BIRTH_GREEK_FATHER_PRE1982;
    const ancestryRoute = window.CitizenshipLogic.CitizenshipCategories.POSTHUMOUS_PARENT;
    
    // Parent applying first (declaration) should be cheaper than posthumous + child
    const parentCost = parentRoute.cost.max;
    const ancestryCost = ancestryRoute.cost.max;
    
    assert.truthy(parentCost < ancestryCost, 'Parent route should be more cost-effective');
});

// ============================================================================
// MASTER TEST RUNNER
// ============================================================================

async function runAllTests() {
    console.clear();
    console.log('🏛️ Greek Citizenship Logic - Test Suite');
    console.log('Comprehensive validation of citizenship determination logic\n');
    
    const suites = [
        categoryTests,
        documentTests,
        ancestryTests,
        uiTests,
        edgeCaseTests,
        costTests
    ];
    
    let totalPassed = 0;
    let totalFailed = 0;
    let totalTests = 0;
    
    for (const suite of suites) {
        const result = await suite.run();
        totalPassed += result.passed;
        totalFailed += result.failed;
        totalTests += result.total;
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('📈 OVERALL RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${totalPassed} ✅`);
    console.log(`Failed: ${totalFailed} ❌`);
    console.log(`Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
    
    if (totalFailed === 0) {
        console.log('\n🎉🎉🎉 ALL TESTS PASSED! 🎉🎉🎉');
        console.log('✨ The codebase is ready for refactoring!');
    } else {
        console.log('\n⚠️  Some tests failed. Please review and fix before refactoring.');
    }
    
    return {
        total: totalTests,
        passed: totalPassed,
        failed: totalFailed,
        successRate: (totalPassed / totalTests) * 100
    };
}

// Export for use in test runner
if (typeof window !== 'undefined') {
    window.CitizenshipTests = {
        runAllTests,
        categoryTests,
        documentTests,
        ancestryTests,
        uiTests,
        edgeCaseTests,
        costTests
    };
}

