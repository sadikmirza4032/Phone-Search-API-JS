const loadPhone = async (searchText='iphone', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones)
    displayPhone(phones, isShowAll)

}

const displayPhone = (phones, isShowAll)=>{

    const PhoneContainer = document.getElementById('Phone-container')
// clear phone card and adding
PhoneContainer.textContent = '';
const showAllContainer = document.getElementById('show-all-container');
if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
}
else{
    showAllContainer.classList.add('hidden')
}
// console.log('is show', isShowAll)
if(!isShowAll){
    phones = phones.slice(0, 12);
}
    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                <img
                src="${phone.image}"
                alt="Shoes"
                class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions">
                <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>`

     PhoneContainer.appendChild(phoneCard)
            
    })
    toggleLoadingSpinner(false)
}

// handle Search button
const handleButton = (isShowAll) => {
    toggleLoadingSpinner(true)
const searchField = document.getElementById('search-field');
const searchText = searchField.value ;
 loadPhone(searchText, isShowAll);
}

//loading spinner
const toggleLoadingSpinner = (isLoading) =>{
    const LoadSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        LoadSpinner.classList.remove('hidden')
    }
    else{
        LoadSpinner.classList.add('hidden')
    }
}

// handle show all

const handleShowAll = (isShowAll) =>{
    handleButton(true);
}

const handleShowDetails = async (id) =>{
    console.log('show data', id);
const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
const phone = data.data;
showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    // console.log(phone)
 const phoneName = document.getElementById('show-detail-phone-name');
 phoneName.innerText = phone.name;
 


 const showDetailContainer = document.getElementById('show-detail-container')
 showDetailContainer.innerHTML=`
 <img class="" src="${phone.image}" alt="">
 <p><span>storage:</span>${phone?.mainFeatures?.storage}</p>
 <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
 <p><span>ChipSet:</span>${phone?.mainFeatures?.displaySize}</p>
 <p><span>Display Size:</span>${phone?.mainFeatures?.displaySize}</p>
 <p><span>Display Size:</span>${phone?.others?.GPS}</p>
 
 `
    // show the modal
    show_modal_detail.showModal();
}

loadPhone();