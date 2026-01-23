/**
 * Citizenship Categories Module
 * Contains all citizenship category definitions and related constants
 * Based on Ν. 3284/2004 and amendments (updated 12/2/2025)
 */

const CitizenshipCategories = {
    BIRTH_GREEK_PARENT: {
        id: 'birth_greek_parent',
        name: 'Αυτοδίκαια με τη γέννηση - Τέκνο Έλληνα γονέα',
        article: 'Άρθρο 1, παρ. 1 Ν. 3284/2004',
        legalText: 'Το τέκνο Έλληνα ή Ελληνίδας αποκτά από τη γέννηση του την Ελληνική Ιθαγένεια.',
        description: 'Το τέκνο Έλληνα ή Ελληνίδας αποκτά από τη γέννηση του την Ελληνική Ιθαγένεια.',
        icon: '👶',
        cost: { min: 0, max: 30, currency: '€', description: 'Χωρίς παράβολο (μόνο έξοδα πιστοποιητικών)' },
        estimatedTime: '3-6 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_GREEK_FATHER_PRE1982: {
        id: 'birth_greek_father_pre1982',
        name: 'Με δήλωση - Τέκνο Έλληνα πατέρα (προ 18.7.1982)',
        article: 'Άρθρο 14 παρ. 2 Ν. 3284/2004',
        legalText: 'Το τέκνο που γεννήθηκε εντός του πολιτικού γάμου του Έλληνα με αλλοδαπή πριν από την 18.7.1982 μπορεί να αποκτήσει την Ελληνική ιθαγένεια με δήλωση.',
        description: 'Τέκνο Έλληνα πατέρα που γεννήθηκε πριν τις 18.7.1982 εντός γάμου με αλλοδαπή.',
        icon: '👨‍👧',
        cost: { min: 140, max: 240, currency: '€', description: 'Παράβολο + έξοδα πιστοποιητικών' },
        estimatedTime: '18 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_GREEK_MOTHER_PRE1984: {
        id: 'birth_greek_mother_pre1984',
        name: 'Με δήλωση - Τέκνο Ελληνίδας (προ 8.5.1984)',
        article: 'Άρθρο 14 παρ. 3 Ν. 3284/2004',
        legalText: 'Το τέκνο Ελληνίδας μητέρας που γεννήθηκε πριν από την 8.5.1984 μπορεί να αποκτήσει την Ελληνική ιθαγένεια με δήλωση.',
        description: 'Τέκνο Ελληνίδας μητέρας που γεννήθηκε πριν τις 8.5.1984.',
        icon: '👩‍👧',
        cost: { min: 140, max: 240, currency: '€', description: 'Παράβολο + έξοδα πιστοποιητικών' },
        estimatedTime: '18 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_IN_GREECE: {
        id: 'birth_in_greece',
        name: 'Αυτοδίκαια - Γέννηση στην Ελλάδα',
        article: 'Άρθρο 1, παρ. 2 Ν. 3284/2004',
        legalText: 'Την Ελληνική Ιθαγένεια αποκτά από τη γέννηση του όποιος γεννιέται σε ελληνικό έδαφος, εφόσον ένας από τους γονείς του έχει γεννηθεί στην Ελλάδα και κατοικεί μόνιμα στη Χώρα.',
        description: 'Γέννηση σε ελληνικό έδαφος με ειδικές προϋποθέσεις.',
        icon: '🏛️',
        cost: { min: 0, max: 50, currency: '€', description: 'Έξοδα πιστοποιητικών' },
        estimatedTime: '3-6 μήνες',
        source: 'mitos.gov.gr'
    },
    BIRTH_DECLARATORY: {
        id: 'birth_declaratory',
        name: 'Κτήση με έκδοση διαπιστωτικής απόφασης',
        article: 'Άρθρο 1 Ν. 3284/2004',
        legalText: 'Έκδοση διαπιστωτικής απόφασης για την κτήση της ελληνικής ιθαγένειας από τη γέννηση.',
        description: 'Διαπιστωτική απόφαση για κτήση ιθαγένειας από γέννηση.',
        icon: '📋',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο + έξοδα' },
        estimatedTime: '6-12 μήνες',
        source: 'mitos.gov.gr'
    },
    DECLARATION_BIRTH_SCHOOLING: {
        id: 'declaration_birth_schooling',
        name: 'Δήλωση-Αίτηση - Γέννηση & Φοίτηση στην Ελλάδα',
        article: 'Άρθρο 1Α, παρ. 1 Ν. 3284/2004 (όπως τροποποιήθηκε με Ν. 3838/2010)',
        legalText: 'Τέκνο αλλοδαπών που γεννιέται στην Ελλάδα θεμελιώνει δικαίωμα κτήσης της ελληνικής ιθαγένειας υπό τις προϋποθέσεις της εγγραφής στην Α\' τάξη ελληνικού σχολείου.',
        description: 'Τέκνο αλλοδαπών που γεννήθηκε στην Ελλάδα και φοίτησε σε ελληνικό σχολείο.',
        icon: '🎓',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο 100€ + έξοδα' },
        estimatedTime: '12-18 μήνες',
        source: 'mitos.gov.gr'
    },
    DECLARATION_SCHOOLING: {
        id: 'declaration_schooling',
        name: 'Δήλωση-Αίτηση - Φοίτηση στην Ελλάδα',
        article: 'Άρθρο 1Α, παρ. 2 Ν. 3284/2004 (όπως τροποποιήθηκε με Ν. 3838/2010)',
        legalText: 'Τέκνο αλλοδαπών που κατοικεί μόνιμα και νόμιμα στην Ελλάδα θεμελιώνει δικαίωμα κτήσης της ελληνικής ιθαγένειας με την επιτυχή παρακολούθηση έξι τουλάχιστον τάξεων ελληνικού σχολείου.',
        description: 'Τέκνο αλλοδαπών με εξαετή φοίτηση σε ελληνικό σχολείο.',
        icon: '📚',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο 100€ + έξοδα' },
        estimatedTime: '12-18 μήνες',
        source: 'mitos.gov.gr'
    },
    DECLARATION_UNIVERSITY: {
        id: 'declaration_university',
        name: 'Δήλωση-Αίτηση - Απόφοιτος ΑΕΙ/ΤΕΙ',
        article: 'Άρθρο 1Α, παρ. 2 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που έχει αποφοιτήσει από ελληνικό ΑΕΙ ή ΤΕΙ δικαιούται να αιτηθεί την ελληνική ιθαγένεια.',
        description: 'Απόφοιτος ελληνικού ΑΕΙ ή ΤΕΙ.',
        icon: '🎓',
        cost: { min: 100, max: 150, currency: '€', description: 'Παράβολο 100€ + έξοδα' },
        estimatedTime: '12-18 μήνες',
        source: 'mitos.gov.gr'
    },
    RECOGNITION: {
        id: 'recognition',
        name: 'Αναγνώριση από Έλληνα',
        article: 'Άρθρο 2 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που αναγνωρίζεται ως τέκνο Έλληνα πολίτη γίνεται Έλληνας από την αναγνώριση.',
        description: 'Αναγνώριση τέκνου από Έλληνα πολίτη.',
        icon: '👨‍👧',
        cost: { min: 50, max: 100, currency: '€', description: 'Έξοδα πιστοποιητικών' },
        estimatedTime: '6-12 μήνες',
        source: 'Ν. 3284/2004'
    },
    ADOPTION: {
        id: 'adoption',
        name: 'Υιοθεσία από Έλληνα',
        article: 'Άρθρο 3 Ν. 3284/2004',
        legalText: 'Ανήλικος αλλοδαπός που υιοθετείται από Έλληνα πολίτη γίνεται Έλληνας από την τέλεση της υιοθεσίας.',
        description: 'Υιοθεσία από Έλληνα πολίτη.',
        icon: '👨‍👩‍👧',
        cost: { min: 50, max: 100, currency: '€', description: 'Έξοδα πιστοποιητικών' },
        estimatedTime: '6-12 μήνες',
        source: 'Ν. 3284/2004'
    },
    NATURALIZATION_GENERAL: {
        id: 'naturalization_general',
        name: 'Πολιτογράφηση - Γενική',
        article: 'Άρθρα 5-9 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που διαμένει νόμιμα στην Ελλάδα για επτά (7) έτη μπορεί να πολιτογραφηθεί Έλληνας.',
        description: 'Αλλοδαπός με 7ετή νόμιμη διαμονή στην Ελλάδα.',
        icon: '📜',
        cost: { min: 550, max: 700, currency: '€', description: 'Παράβολο 550€ + Π.Ε.Γ.Π. 100€ + έξοδα' },
        estimatedTime: '24-36 μήνες',
        source: 'ypes.gr'
    },
    NATURALIZATION_OMOGENEIS: {
        id: 'naturalization_omogeneis',
        name: 'Πολιτογράφηση - Ομογενείς',
        article: 'Άρθρο 5, παρ. 2 Ν. 3284/2004',
        legalText: 'Ο χρόνος προηγούμενης νόμιμης διαμονής στην Ελλάδα μειώνεται σε τρία (3) έτη για ομογενείς αλλοδαπούς.',
        description: 'Ομογενείς με μειωμένες προϋποθέσεις.',
        icon: '🇬🇷',
        cost: { min: 700, max: 900, currency: '€', description: 'Παράβολο 700€ + Π.Ε.Γ.Π. 100€ + έξοδα' },
        estimatedTime: '18-24 μήνες',
        source: 'ypes.gr'
    },
    NATURALIZATION_SPOUSE: {
        id: 'naturalization_spouse',
        name: 'Πολιτογράφηση - Σύζυγος Έλληνα',
        article: 'Άρθρο 5, παρ. 2 Ν. 3284/2004',
        legalText: 'Ο χρόνος μειώνεται σε τρία (3) έτη για αλλοδαπούς που έχουν τέκνο με Έλληνα ή Ελληνίδα.',
        description: 'Σύζυγος Έλληνα πολίτη με τέκνο.',
        icon: '💍',
        cost: { min: 550, max: 700, currency: '€', description: 'Παράβολο 550€ + Π.Ε.Γ.Π. 100€ + έξοδα' },
        estimatedTime: '18-24 μήνες',
        source: 'ypes.gr'
    },
    NATURALIZATION_REFUGEE: {
        id: 'naturalization_refugee',
        name: 'Πολιτογράφηση - Πρόσφυγας/Ανιθαγενής',
        article: 'Άρθρο 5, παρ. 2 Ν. 3284/2004',
        legalText: 'Ο χρόνος μειώνεται σε τρία (3) έτη για αναγνωρισμένους πρόσφυγες και ανιθαγενείς.',
        description: 'Αναγνωρισμένος πρόσφυγας ή ανιθαγενής.',
        icon: '🏠',
        cost: { min: 550, max: 700, currency: '€', description: 'Παράβολο 550€ + έξοδα' },
        estimatedTime: '18-24 μήνες',
        source: 'ypes.gr'
    },
    REACQUISITION: {
        id: 'reacquisition',
        name: 'Επανάκτηση Ιθαγένειας',
        article: 'Άρθρο 4 Ν. 3284/2004',
        legalText: 'Όποιος απώλεσε την ελληνική ιθαγένεια μπορεί να την επανακτήσει με δήλωσή του.',
        description: 'Επανάκτηση ιθαγένειας που απωλέσθη.',
        icon: '🔄',
        cost: { min: 100, max: 200, currency: '€', description: 'Παράβολο + έξοδα' },
        estimatedTime: '6-12 μήνες',
        source: 'Ν. 3284/2004'
    },
    HONORARY: {
        id: 'honorary',
        name: 'Τιμητική Πολιτογράφηση',
        article: 'Άρθρο 12 Ν. 3284/2004',
        legalText: 'Αλλοδαπός που έχει προσφέρει εξαιρετικές υπηρεσίες στην Ελλάδα μπορεί να τιμηθεί με απονομή ιθαγένειας.',
        description: 'Τιμητική απονομή ιθαγένειας.',
        icon: '🏆',
        cost: { min: 0, max: 0, currency: '€', description: 'Χωρίς κόστος' },
        estimatedTime: 'Κατά περίπτωση',
        source: 'Ν. 3284/2004'
    },
    // Ειδική κατηγορία για μεταθανάτια αναγνώριση
    POSTHUMOUS_PARENT: {
        id: 'posthumous_parent',
        name: 'Μεταθανάτια Αναγνώριση Ιθαγένειας Γονέα',
        article: 'Άρθρο 1 & 14 Ν. 3284/2004',
        legalText: 'Δυνατότητα αναγνώρισης ιθαγένειας αποβιώσαντος προσώπου που είχε δικαίωμα στην ελληνική ιθαγένεια.',
        description: 'Μεταθανάτια απόκτηση ιθαγένειας για γονέα που δεν πρόλαβε να αιτηθεί.',
        icon: '🕊️',
        cost: { min: 150, max: 300, currency: '€', description: 'Παράβολο + έξοδα εγγράφων' },
        estimatedTime: '12-18 μήνες',
        source: 'Ν. 3284/2004'
    }
};

// Σημείωση για αλλοδαπά έγγραφα
const FOREIGN_DOCUMENT_NOTE = {
    title: '⚠️ Σημαντική Σημείωση για Αλλοδαπά Έγγραφα',
    description: 'Όλα τα έγγραφα που εκδίδονται από αλλοδαπές αρχές πρέπει να:',
    requirements: [
        'Είναι επίσημα μεταφρασμένα στην ελληνική γλώσσα από το Υπουργείο Εξωτερικών ή πιστοποιημένο μεταφραστή',
        'Φέρουν επικύρωση (notarization) από αρμόδια αρχή της χώρας έκδοσης',
        'Φέρουν σφραγίδα Apostille (Σύμβαση Χάγης 1961) ή προξενική θεώρηση για χώρες εκτός Σύμβασης'
    ],
    legalBasis: 'Άρθρο 6, παρ. 1 Ν. 3284/2004 & Κανονισμός (ΕΕ) 2016/1191'
};

// Σημείωση για έγγραφα που δεν μπορούν να εκδοθούν
const UNAVAILABLE_DOCUMENT_NOTE = {
    title: '📋 Αν ένα έγγραφο δεν μπορεί να βρεθεί',
    description: 'Σε περίπτωση που ένα απαιτούμενο έγγραφο δεν μπορεί να εκδοθεί (καταστροφή αρχείων, πόλεμος, φυσικές καταστροφές κλπ.), μπορούν να χρησιμοποιηθούν:',
    alternatives: [
        'Πιστοποιητικό αδυναμίας έκδοσης από την αρμόδια αρχή',
        'Ένορκη Βεβαίωση (Affidavit) από συγγενείς που γνωρίζουν τα γεγονότα',
        'Υπεύθυνη Δήλωση (Ν. 1599/1986) με εξήγηση της αδυναμίας',
        'Εναλλακτικά έγγραφα που αποδεικνύουν το ίδιο γεγονός (εκκλησιαστικά, κοιμητηριακά, νοσοκομειακά αρχεία)',
        'Μαρτυρίες συγγενών ή τρίτων με ένορκη βεβαίωση'
    ],
    process: 'Συνιστάται επικοινωνία με το αρμόδιο Προξενείο ή τη Διεύθυνση Ιθαγένειας για την αποδοχή εναλλακτικών εγγράφων πριν την υποβολή της αίτησης.',
    legalBasis: 'Κώδικας Διοικητικής Διαδικασίας, Ν. 2690/1999'
};

// Ειδικές οδηγίες για ΗΠΑ
const US_DOCUMENT_SOURCES = {
    title: '🇺🇸 Πηγές Εγγράφων στις ΗΠΑ',
    description: 'Για θανάτους ή γεγονότα που συνέβησαν στις ΗΠΑ, υπάρχουν πολλές πηγές:',
    deathCertificate: {
        title: 'Death Certificate',
        sources: [
            { name: 'State Vital Records Office', url: 'https://www.cdc.gov/nchs/w2w/index.htm', note: 'Κάθε πολιτεία έχει δικό της office - κύρια πηγή' },
            { name: 'County Clerk\'s Office', url: null, note: 'Τοπικά αρχεία, συχνά πιο γρήγορα' },
            { name: 'VitalChek.com', url: 'https://www.vitalchek.com', note: 'Online παραγγελία για πολλές πολιτείες' }
        ]
    },
    alternatives: {
        title: 'Εναλλακτικές Πηγές (αν δεν βρεθεί Death Certificate)',
        sources: [
            { name: 'Social Security Administration', note: 'Letter confirming death - αν είχε Social Security Number', url: 'https://www.ssa.gov' },
            { name: 'FindAGrave.com', note: 'Κοιμητηριακά αρχεία - δωρεάν αναζήτηση', url: 'https://www.findagrave.com' },
            { name: 'BillionGraves.com', note: 'Φωτογραφίες μνημάτων με στοιχεία', url: 'https://billiongraves.com' },
            { name: 'Ancestry.com / FamilySearch.org', note: 'Social Security Death Index (SSDI)', url: 'https://www.familysearch.org' },
            { name: 'Newspapers.com', note: 'Ιστορικές νεκρολογίες', url: 'https://www.newspapers.com' },
            { name: 'Greek Orthodox Archdiocese', note: 'Αρχεία ελληνορθόδοξων εκκλησιών', url: 'https://www.goarch.org' },
            { name: 'Funeral Home Records', note: 'Επικοινωνήστε με το γραφείο τελετών', url: null }
        ]
    },
    noRecordFound: {
        title: 'Αν δεν υπάρχει καταγεγραμμένος θάνατος',
        steps: [
            'Ζητήστε "Letter of No Record" από το State Vital Records Office',
            'Συντάξτε Affidavit (ένορκη βεβαίωση) με στοιχεία θανάτου από συγγενείς',
            'Συγκεντρώστε circumstantial evidence (εκκλησία, κοιμητήριο, εφημερίδες)',
            'Επικοινωνήστε με το Ελληνικό Προξενείο για καθοδήγηση'
        ]
    }
};

// Export for browser (window) and Node.js (module.exports)
if (typeof window !== 'undefined') {
    window.CitizenshipCategories = CitizenshipCategories;
    window.FOREIGN_DOCUMENT_NOTE = FOREIGN_DOCUMENT_NOTE;
    window.UNAVAILABLE_DOCUMENT_NOTE = UNAVAILABLE_DOCUMENT_NOTE;
    window.US_DOCUMENT_SOURCES = US_DOCUMENT_SOURCES;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CitizenshipCategories,
        FOREIGN_DOCUMENT_NOTE,
        UNAVAILABLE_DOCUMENT_NOTE,
        US_DOCUMENT_SOURCES
    };
}
