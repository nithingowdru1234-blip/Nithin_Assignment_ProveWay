document.addEventListener('DOMContentLoaded', () => {
    // Select all box wrappers and radio buttons
    const boxWrappers = document.querySelectorAll('.box-wrapper');
    const radioButtons = document.querySelectorAll('input[name="bundle"]');

    /**
     * Handles the selection logic for a plan box.
     * @param {Element} selectedWrapper The box-wrapper element that was clicked/selected.
     */
    function selectPlan(selectedWrapper) {
        // 1. Remove 'active' class from all wrappers and plan contents
        boxWrappers.forEach(wrapper => {
            wrapper.classList.remove('active');
            const content = wrapper.querySelector('.plan-content');
            if (content) {
                content.classList.remove('active');
            }
        });

        // 2. Add 'active' class to the selected wrapper and its content
        selectedWrapper.classList.add('active');
        const selectedContent = selectedWrapper.querySelector('.plan-content');
        if (selectedContent) {
            selectedContent.classList.add('active');
        }

        // 3. Ensure the corresponding radio button is checked
        const radio = selectedWrapper.querySelector('input[type="radio"]');
        if (radio && !radio.checked) {
            radio.checked = true;
        }
    }

    // --- Event Listeners ---

    // 1. Listen for clicks on the entire box-wrapper area
    boxWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', (event) => {
            // Check if the click was directly on a select or option element
            // This prevents selecting the box when changing size/colour options
            if (event.target.tagName !== 'SELECT' && event.target.tagName !== 'OPTION') {
                selectPlan(wrapper);
            }
        });
    });

    // 2. Listen for changes on the radio buttons (handles clicks on the radio circle itself)
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (event) => {
            // Find the closest ancestor .box-wrapper element
            const selectedWrapper = event.target.closest('.box-wrapper');
            if (selectedWrapper) {
                selectPlan(selectedWrapper);
            }
        });
    });
    
    // Initial selection: Check which radio button is initially checked (Box 1 in HTML)
    // and apply the active styles. If no box is explicitly checked, the code 
    // implicitly selects the first one due to the HTML structure, but we'll 
    // run the check here for robustness.
    const initialCheckedRadio = document.querySelector('input[name="bundle"]:checked');
    if (initialCheckedRadio) {
        selectPlan(initialCheckedRadio.closest('.box-wrapper'));
    }
});