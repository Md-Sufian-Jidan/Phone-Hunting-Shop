const loadPhone = async (searchText=13,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phone);
    displayPhones(phones,isShowAll)
}


const displayPhones = (phones,isShowAll) => {
    // console.log(phones);
    // 1. find the div or section where it will be paste
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    // phoneContainer.innerText = ``;
    phoneContainer.textContent = '';
    // show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)

    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
        // console.log(phones.length);
    }

    phones.forEach(phone => {
        // console.log(phone);
        //2. create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 shadow-xl py-2`;
        // 3. set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}!</h2>
                      <p>You can't afford this</p>
                      <div class="card-actions justify-center">
                        <button onclick='handleShowDetail("${phone.slug}");show_details_modal.showModal()' class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
                    // 4. append child
                    phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner
    toggleLoadSpinner(false);
}

// 
const handleShowDetail = async(id) => {
    console.log('Clicked ShowDetail',id)
    // console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =  await res.json();
    // console.log(data);
    const phone = data.data;
    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    console.log(phone);
    //show the modal
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const 



    show_details_modal.showModal();

}

// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
    // console.log(searchText);
}

// another handle search by me
// const handleSearch2 = ()=> {
//     // console.log('search click');
//     const inputField = document.getElementById('search-input');
//     const inputValue = inputField.value;
//     // console.log(inputValue);
//     loadPhone(inputValue);
// }

// another handle search by Jhankar Mahabub
// handle search recap
// const handleSearch3 = () => {
//     toggleLoadSpinner(true)
//     const input = document.getElementById('search-field2');
//     const inputValue = input.value;
//     // console.log(inputValue);
//     loadPhone(inputValue);
// };

const toggleLoadSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}



loadPhone()