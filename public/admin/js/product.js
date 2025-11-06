// Change status of product
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let changeStatus =  status == "active" ? "inactive" : "active";

            const action = path + `/${changeStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}
// End Change status of product

// Delete product
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete) {
    const formDeleteProduct = document.querySelector("#form-delete-product");
    const path = formDeleteProduct.getAttribute("data-path");
    buttonsDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirmed = confirm("Are you sure you want to delete this product?");
            if (isConfirmed) {
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`;
                formDeleteProduct.action = action;
                formDeleteProduct.submit();
            }
        });
    });
}
// End Delete product