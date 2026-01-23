/**
 * Citizenship Logic - Main Loader (Refactored Architecture)
 * 
 * This file creates the window.CitizenshipLogic object by combining all modules.
 * Modules must be loaded in this order in HTML:
 *   1. citizenship-categories.js
 *   2. citizenship-documents.js
 *   3. citizenship-core.js
 *   4. citizenship-ui.js
 *   5. citizenship-logic-loader.js (this file)
 */

// Export unified API for backward compatibility
window.CitizenshipLogic = {
    // From categories module
    CitizenshipCategories,
    FOREIGN_DOCUMENT_NOTE,
    UNAVAILABLE_DOCUMENT_NOTE,
    US_DOCUMENT_SOURCES,
    
    // From documents module
    RequiredDocuments,
    DivorceRelatedDocuments,
    NameChangeDocuments,
    
    // From core module
    determineCitizenshipCategory,
    getRequiredDocuments,
    hasGreekParent,
    hasGreekAncestry,
    analyzeAncestryChain,
    checkIfParentCanApplyFirst,
    calculateOptimalPath,
    
    // From UI module
    formatDocumentsList,
    formatSingleDocument
};

console.log('✅ Citizenship Logic modules loaded successfully');

