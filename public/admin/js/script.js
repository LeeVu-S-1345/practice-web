// Button status filter
buttonSatus = document.querySelectorAll('[button-status]');
if(buttonSatus.length > 0){
    let url = new URL(window.location.href);

    buttonSatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status');
            if(status){
                url.searchParams.set('status', status);
            }
            else{
                url.searchParams.delete('status');
            }
            window.location.href = url;
        });
    });
}
//End button status filter

// Search
const formSearch = document.querySelector('#form-search');
if(formSearch){
    let url = new URL(window.location.href);
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword){
            url.searchParams.set('keyword', keyword);
        }
        else{
            url.searchParams.delete('keyword');
        }
        window.location.href = url;
    });
}
// End Search

// Pagination
const buttonPagination = document.querySelectorAll('[button-pagination]');
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination');
            url.searchParams.set('page', page);
            window.location.href = url;
        });
    });
}
// End Pagination

// Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
    const closeAlert = showAlert.querySelector('[close-alert]');
    const time = parseInt(showAlert.getAttribute('data-time'));
    setTimeout(() => {
        // showAlert.style.display = 'none';
        showAlert.classList.add('alert-hidden');
    }, time);

    closeAlert.addEventListener("click", () =>{
        showAlert.classList.add('alert-hidden');
    });
}
// End show alert

// Upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (e) => {
        console.log(e);
        const file = e.target.files[0];
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    });
}
// End upload image